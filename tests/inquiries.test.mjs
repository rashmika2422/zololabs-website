import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const input = { name: "Alex Morgan", email: "alex@example.com", company: "Example", message: "We need help automating our customer booking process." };
const defaults = {
  SUPABASE_URL: "https://example.supabase.co", SUPABASE_SECRET_KEY: "sb_secret_test",
  RESEND_API_KEY: "re_test", INQUIRY_NOTIFICATION_FROM: "ZoloLabs <inquiries@example.com>", INQUIRY_NOTIFICATION_TO: "team@example.com",
};

// Compile with the project's TypeScript compiler; mock only framework boundaries
// and HTTP so no customer data or real notification is sent during tests.
function load(path, env, fetch, modules = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const testModule = { exports: {} };
  runInNewContext(compiled, {
    module: testModule, exports: testModule.exports,
    require: (name) => name === "server-only" ? {} : modules[name] ?? require(name),
    process: { env }, fetch, Headers, Response, URL, URLSearchParams, AbortSignal, Buffer,
    console: { error() {} },
  });
  return testModule.exports;
}

function fixture({ env = defaults, databaseFailure = false, notificationFailure = false } = {}) {
  const rows = new Map();
  const requests = [];
  const fetch = async (url, options = {}) => {
    requests.push({ url, ...options });
    if (!url.startsWith("https://example.supabase.co")) {
      return Response.json({}, { status: notificationFailure ? 503 : 200 });
    }
    if (databaseFailure) return Response.json({}, { status: 503 });
    const query = new URL(url).searchParams;
    if (options.method === "POST") {
      const row = { id: "47cd2dce-4490-4bda-969b-b246708538c1", created_at: new Date().toISOString(), notification_attempts: 0, ...JSON.parse(options.body) };
      rows.set(row.id, row);
      return Response.json([row], { status: 201 });
    }
    if (options.method === "PATCH") {
      const row = rows.get(query.get("id")?.slice(3));
      const matches = row && row.notification_status === query.get("notification_status")?.slice(3) && row.notification_attempts === Number(query.get("notification_attempts")?.slice(3));
      if (matches) Object.assign(row, JSON.parse(options.body));
      return Response.json(matches ? [row] : []);
    }
    return Response.json([...rows.values()].filter((row) => ["pending", "failed"].includes(row.notification_status) && row.notification_attempts < 5 && (!row.notification_next_attempt_at || Date.parse(row.notification_next_attempt_at) <= Date.now())));
  };
  return { api: load("src/lib/inquiries.ts", env, fetch), rows, requests, fetch, env };
}

function action(fixture) {
  const callbacks = [];
  const api = load("src/app/contact/actions.ts", fixture.env, fixture.fetch, {
    "@/lib/inquiries": fixture.api,
    "next/headers": { headers: async () => new Headers() },
    "next/server": { after: (callback) => callbacks.push(callback) },
  });
  const form = new FormData();
  Object.entries(input).forEach(([key, value]) => form.set(key, value));
  return { api, callbacks, form };
}

test("save before notification and reply directly to the customer", async () => {
  const f = fixture();
  const record = await f.api.saveInquiry(input);
  assert.equal(f.requests.length, 1);
  assert.equal(f.rows.get(record.id).notification_status, "pending");
  assert.equal(f.requests[0].headers.get("apikey"), "sb_secret_test");
  assert.equal(f.requests[0].headers.has("authorization"), false);
  await f.api.deliverInquiryNotification(record);
  assert.equal(f.rows.get(record.id).notification_status, "sent");
  const email = f.requests.find((request) => request.url === "https://api.resend.com/emails");
  assert.equal(JSON.parse(email.body).reply_to, input.email);
  assert.equal(email.headers["Idempotency-Key"], `inquiry/${record.id}`);
});

test("notification failure preserves the inquiry and the successful form response", async () => {
  const f = fixture({ notificationFailure: true });
  const a = action(f);
  const result = await a.api.sendEnquiry({ status: "idle", message: "" }, a.form);
  assert.equal(result.status, "success");
  assert.equal(f.rows.size, 1);
  assert.equal(a.callbacks.length, 1);
  await a.callbacks[0]();
  const row = [...f.rows.values()][0];
  assert.equal(row.message, input.message);
  assert.equal(row.notification_status, "failed");
  assert.equal(row.notification_error, "resend_http_503");
  assert.equal(row.notification_attempts, 1);
});

test("database failure does not send a notification or acknowledge receipt", async () => {
  const f = fixture({ databaseFailure: true });
  const a = action(f);
  const result = await a.api.sendEnquiry({ status: "idle", message: "" }, a.form);
  assert.equal(result.status, "error");
  assert.equal(a.callbacks.length, 0);
  assert.equal(f.requests.length, 1);
});

test("validation rejects oversized fields without truncation or network calls", async () => {
  const f = fixture();
  const a = action(f);
  a.form.set("message", "x".repeat(2001));
  const result = await a.api.sendEnquiry({ status: "idle", message: "" }, a.form);
  assert.equal(result.status, "error");
  assert.equal(f.requests.length, 0);
});

test("honeypot submissions do not enter storage or send notifications", async () => {
  const f = fixture();
  const a = action(f);
  a.form.set("website", "spam.example.com");
  assert.equal((await a.api.sendEnquiry({ status: "idle", message: "" }, a.form)).status, "success");
  assert.equal(f.requests.length, 0);
});

test("concurrent callbacks atomically claim a record and only send once", async () => {
  const f = fixture();
  const record = await f.api.saveInquiry(input);
  await Promise.all([f.api.deliverInquiryNotification(record), f.api.deliverInquiryNotification(record)]);
  assert.equal(f.requests.filter((request) => request.url === "https://api.resend.com/emails").length, 1);
});

test("storage-only setup saves without trying to send an email", async () => {
  const f = fixture({ env: { SUPABASE_URL: defaults.SUPABASE_URL, SUPABASE_SECRET_KEY: defaults.SUPABASE_SECRET_KEY } });
  const record = await f.api.saveInquiry(input);
  assert.equal(record.notification_status, "disabled");
  await f.api.deliverInquiryNotification(record);
  assert.equal(f.requests.length, 1);
});

test("existing webhook-only setup still accepts inquiries", async () => {
  const f = fixture({ env: { CONTACT_WEBHOOK_URL: "https://automation.example.com/inquiries" } });
  const a = action(f);
  assert.equal((await a.api.sendEnquiry({ status: "idle", message: "" }, a.form)).status, "success");
  assert.equal(f.requests.length, 1);
  assert.equal(a.callbacks.length, 0);
});

test("public Supabase keys cannot be used as server credentials", async () => {
  const f = fixture({ env: { ...defaults, SUPABASE_SECRET_KEY: "sb_publishable_test" } });
  await assert.rejects(f.api.saveInquiry(input), /supabase_server_key_required/);
  assert.equal(f.requests.length, 0);
});

test("failed notification retries keep the same idempotency key", async () => {
  const f = fixture({ notificationFailure: true });
  const record = await f.api.saveInquiry(input);
  await f.api.deliverInquiryNotification(record);
  f.rows.get(record.id).notification_next_attempt_at = new Date(Date.now() - 1000).toISOString();
  await f.api.retryInquiryNotifications();
  const emails = f.requests.filter((request) => request.url === "https://api.resend.com/emails");
  assert.equal(emails.length, 2);
  assert.equal(emails[0].headers["Idempotency-Key"], emails[1].headers["Idempotency-Key"]);
  assert.equal(f.rows.get(record.id).notification_attempts, 2);
});

test("retry route denies missing or wrong credentials without processing anything", async () => {
  let processed = 0;
  const endpoint = load("src/app/api/inquiries/retry/route.ts", { CRON_SECRET: "test-scheduler-secret" }, () => { throw new Error("unexpected network"); }, {
    "@/lib/inquiries": { retryInquiryNotifications: async () => { processed++; return 2; } },
  });
  const unauthorized = await endpoint.GET(new Request("https://example.com/api/inquiries/retry"));
  assert.equal(unauthorized.status, 401);
  assert.equal(processed, 0);
  const authorized = await endpoint.GET(new Request("https://example.com/api/inquiries/retry", { headers: { Authorization: "Bearer test-scheduler-secret" } }));
  assert.equal(authorized.status, 200);
  assert.equal(processed, 1);
});


test("backoff prevents a failed notification from being retried immediately", async () => {
  const f = fixture({ notificationFailure: true });
  const record = await f.api.saveInquiry(input);
  await f.api.deliverInquiryNotification(record);
  assert.equal(await f.api.retryInquiryNotifications(), 0);
  assert.equal(f.requests.filter((request) => request.url === "https://api.resend.com/emails").length, 1);
});

test("partial storage configuration fails instead of falling back to an unstored webhook", async () => {
  const f = fixture({ env: { SUPABASE_URL: defaults.SUPABASE_URL, CONTACT_WEBHOOK_URL: "https://automation.example.com/inquiries" } });
  const a = action(f);
  assert.equal((await a.api.sendEnquiry({ status: "idle", message: "" }, a.form)).status, "error");
  assert.equal(f.requests.length, 0);
});

test("records at the attempt limit do not trigger more notifications", async () => {
  const f = fixture();
  const record = await f.api.saveInquiry(input);
  const row = f.rows.get(record.id);
  row.notification_status = "processing";
  row.notification_attempts = 5;
  await f.api.deliverInquiryNotification({ ...row });
  assert.equal(row.notification_status, "failed");
  assert.equal(row.notification_error, "attempt_limit_reached");
  assert.equal(f.requests.filter((request) => request.url === "https://api.resend.com/emails").length, 0);
});


test("background scheduling failure still acknowledges a durably saved inquiry", async () => {
  const f = fixture();
  const api = load("src/app/contact/actions.ts", f.env, f.fetch, {
    "@/lib/inquiries": f.api,
    "next/headers": { headers: async () => new Headers() },
    "next/server": { after: () => { throw new Error("background work unavailable"); } },
  });
  const form = new FormData();
  Object.entries(input).forEach(([key, value]) => form.set(key, value));
  assert.equal((await api.sendEnquiry({ status: "idle", message: "" }, form)).status, "success");
  assert.equal([...f.rows.values()][0].notification_status, "pending");
});
