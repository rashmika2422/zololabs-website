import "server-only";

export type InquiryInput = { name: string; email: string; company: string; message: string };
export type InquiryRecord = InquiryInput & {
  id: string;
  created_at: string;
  source: string;
  notification_channel: "email" | "webhook" | "none";
  notification_status: "pending" | "processing" | "sent" | "failed" | "disabled";
  notification_attempts: number;
};

const TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 5;

/** Error codes are safe to log: upstream responses can contain private data. */
class InquiryError extends Error {}

export function validateInquiry(input: InquiryInput): string | null {
  if (input.name.length < 2 || input.name.length > 80) return "Please enter a name between 2 and 80 characters.";
  if (input.email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(input.email)) return "Please enter an email address we can reply to.";
  if (input.company.length > 120) return "Please keep the company name within 120 characters.";
  if (input.message.length < 20 || input.message.length > 2000) return "Please enter a message between 20 and 2,000 characters.";
  return null;
}

export function hasInquiryStorage(): boolean {
  return Boolean(process.env.SUPABASE_URL?.trim() || process.env.SUPABASE_SECRET_KEY?.trim());
}

async function database(query: string, init: RequestInit = {}): Promise<Response> {
  const base = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!base || !key) throw new InquiryError("supabase_configuration_missing");
  if (!key.startsWith("sb_secret_") && !key.startsWith("eyJ")) throw new InquiryError("supabase_server_key_required");
  const url = new URL(base);
  if (url.protocol !== "https:") throw new InquiryError("supabase_https_required");
  const requestHeaders = new Headers(init.headers);
  requestHeaders.set("apikey", key);
  // Legacy service_role JWTs need Bearer auth; new secret keys use apikey only.
  if (key.startsWith("eyJ")) requestHeaders.set("Authorization", `Bearer ${key}`);
  requestHeaders.set("Content-Type", "application/json");
  const response = await fetch(`${url.origin}/rest/v1/inquiries${query ? `?${query}` : ""}`, {
    ...init, headers: requestHeaders, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new InquiryError(`supabase_http_${response.status}`);
  return response;
}

function notificationChannel(): InquiryRecord["notification_channel"] {
  if (process.env.RESEND_API_KEY?.trim() || process.env.INQUIRY_NOTIFICATION_TO?.trim() || process.env.INQUIRY_NOTIFICATION_FROM?.trim()) return "email";
  return process.env.CONTACT_WEBHOOK_URL?.trim() ? "webhook" : "none";
}

export async function saveInquiry(input: InquiryInput): Promise<InquiryRecord> {
  const invalid = validateInquiry(input);
  if (invalid) throw new InquiryError("inquiry_validation_failed");
  const channel = notificationChannel();
  const response = await database("", {
    method: "POST", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ ...input, company: input.company || null, source: "website/contact", notification_channel: channel, notification_status: channel === "none" ? "disabled" : "pending" }),
  });
  const records: InquiryRecord[] = await response.json();
  if (!records[0]?.id) throw new InquiryError("supabase_insert_response_invalid");
  return records[0];
}

export async function sendInquiryWebhook(input: InquiryInput, record?: InquiryRecord): Promise<void> {
  const endpoint = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!endpoint) throw new InquiryError("webhook_configuration_missing");
  const response = await fetch(endpoint, {
    method: "POST", headers: { "Content-Type": "application/json", ...(record ? { "Idempotency-Key": `inquiry/${record.id}` } : {}) },
    body: JSON.stringify({ ...input, ...(record ? { inquiryId: record.id } : {}), source: "zololabs.com/contact", submittedAt: record?.created_at ?? new Date().toISOString() }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new InquiryError(`webhook_http_${response.status}`);
}

async function sendInquiryEmail(record: InquiryRecord): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.INQUIRY_NOTIFICATION_FROM?.trim();
  const to = process.env.INQUIRY_NOTIFICATION_TO?.split(",").map((address) => address.trim()).filter(Boolean);
  if (!key || !from || !to?.length) throw new InquiryError("email_configuration_missing");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `inquiry/${record.id}` },
    body: JSON.stringify({
      from, to, reply_to: record.email,
      subject: "New ZoloLabs website inquiry",
      text: [`Inquiry: ${record.id}`, `Received: ${record.created_at}`, `Name: ${record.name}`, `Email: ${record.email}`, `Company: ${record.company || "Not provided"}`, "", record.message, "", "Reply to this email to contact the customer."].join("\n"),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new InquiryError(`resend_http_${response.status}`);
}

/** Claim atomically so a background callback and a retry job cannot both send. */
export async function deliverInquiryNotification(record: InquiryRecord): Promise<void> {
  if (record.notification_status === "sent" || record.notification_status === "disabled") return;
  const query = new URLSearchParams({ id: `eq.${record.id}`, notification_status: `eq.${record.notification_status}`, notification_attempts: `eq.${record.notification_attempts}` });
  const now = new Date().toISOString();
  if (record.notification_attempts >= MAX_ATTEMPTS) {
    await database(query.toString(), { method: "PATCH", body: JSON.stringify({ notification_status: "failed", notification_error: "attempt_limit_reached" }) });
    return;
  }
  const claim = await database(query.toString(), {
    method: "PATCH", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ notification_status: "processing", notification_started_at: now, notification_attempts: record.notification_attempts + 1 }),
  });
  const claimed: InquiryRecord[] = await claim.json();
  if (!claimed[0]) return;
  const attempt = claimed[0].notification_attempts;
  const outcome: Record<string, string | null> = {};
  try {
    if (record.notification_channel === "email") await sendInquiryEmail(record);
    else if (record.notification_channel === "webhook") await sendInquiryWebhook(record, record);
    else throw new InquiryError("notification_channel_disabled");
    outcome.notification_status = "sent";
    outcome.notification_sent_at = new Date().toISOString();
    outcome.notification_error = null;
  } catch (error) {
    outcome.notification_status = "failed";
    outcome.notification_error = error instanceof InquiryError ? error.message : "notification_request_failed";
    outcome.notification_next_attempt_at = new Date(Date.now() + Math.min(60, 2 ** attempt) * 60_000).toISOString();
  }
  const updateQuery = new URLSearchParams({ id: `eq.${record.id}`, notification_status: "eq.processing", notification_attempts: `eq.${attempt}` });
  await database(updateQuery.toString(), { method: "PATCH", body: JSON.stringify(outcome) });
}

/** Called only by the authenticated retry endpoint, never by site visitors. */
export async function retryInquiryNotifications(): Promise<number> {
  const started = Date.now();
  const now = new Date().toISOString();
  const stale = new Date(Date.now() - 5 * 60_000).toISOString();
  const query = new URLSearchParams({
    or: `(and(notification_status.in.(pending,failed),notification_attempts.lt.${MAX_ATTEMPTS},notification_next_attempt_at.lte.${now}),and(notification_status.eq.processing,notification_started_at.lte.${stale}))`,
    order: "created_at.asc", limit: "4",
  });
  const response = await database(query.toString());
  const records: InquiryRecord[] = await response.json();
  let processed = 0;
  for (const record of records) {
    // Leave room for the last claim/send/update within a 60-second invocation.
    if (Date.now() - started > 20_000) break;
    await deliverInquiryNotification(record);
    processed += 1;
  }
  return processed;
}
