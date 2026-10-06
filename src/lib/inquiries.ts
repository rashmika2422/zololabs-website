import "server-only";

export type InquiryInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  message: string;
};

export type InquiryRecord = InquiryInput & {
  id: string;
  created_at: string;
  source: string;
  notification_channel: "email" | "webhook" | "none";
  notification_status:
    | "pending"
    | "processing"
    | "sent"
    | "failed"
    | "disabled";
  notification_attempts: number;
};

const TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 5;

/** Error codes are safe to log: upstream responses can contain private data. */
class InquiryError extends Error {}

export function validateInquiry(input: InquiryInput): string | null {
  if (input.name.length < 2 || input.name.length > 80)
    return "Please enter a name between 2 and 80 characters.";

  if (
    input.email.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(input.email)
  )
    return "Please enter an email address we can reply to.";

  if (input.company.length > 120)
    return "Please keep the company name within 120 characters.";

  if (input.message.length < 20 || input.message.length > 2000)
    return "Please enter a message between 20 and 2,000 characters.";

  if (input.phone.length > 30)
    return "Please enter a valid phone number.";

  if (!input.projectType || input.projectType.length > 100)
    return "Please select a valid project type.";

  return null;
}

export function hasInquiryStorage(): boolean {
  return Boolean(
    process.env.SUPABASE_URL?.trim() ||
      process.env.SUPABASE_SECRET_KEY?.trim(),
  );
}

async function database(
  query: string,
  init: RequestInit = {},
): Promise<Response> {
  const base = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!base || !key)
    throw new InquiryError("supabase_configuration_missing");

  if (!key.startsWith("sb_secret_") && !key.startsWith("eyJ"))
    throw new InquiryError("supabase_server_key_required");

  const url = new URL(base);

  if (url.protocol !== "https:")
    throw new InquiryError("supabase_https_required");

  const requestHeaders = new Headers(init.headers);

  requestHeaders.set("apikey", key);

  // Legacy service_role JWTs need Bearer auth; new secret keys use apikey only.
  if (key.startsWith("eyJ"))
    requestHeaders.set("Authorization", `Bearer ${key}`);

  requestHeaders.set("Content-Type", "application/json");

  const response = await fetch(
    `${url.origin}/rest/v1/inquiries${query ? `?${query}` : ""}`,
    {
      ...init,
      headers: requestHeaders,
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );

  if (!response.ok)
    throw new InquiryError(`supabase_http_${response.status}`);

  return response;
}

function notificationChannel(): InquiryRecord["notification_channel"] {
  if (
    process.env.RESEND_API_KEY?.trim() ||
    process.env.INQUIRY_NOTIFICATION_TO?.trim() ||
    process.env.INQUIRY_NOTIFICATION_FROM?.trim()
  )
    return "email";

  return process.env.CONTACT_WEBHOOK_URL?.trim()
    ? "webhook"
    : "none";
}

export async function saveInquiry(
  input: InquiryInput,
): Promise<InquiryRecord> {
  const invalid = validateInquiry(input);

  if (invalid) {
    throw new InquiryError("inquiry_validation_failed");
  }

  const channel = notificationChannel();

  const response = await database("", {
    method: "POST",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      company: input.company || null,
      phone: input.phone || null,
      project_type: input.projectType,
      message: input.message,
      source: "website/contact",
      notification_channel: channel,
      notification_status:
        channel === "none" ? "disabled" : "pending",
    }),
  });

  const records = await response.json();

  const record = records[0];

  if (!record?.id) {
    throw new InquiryError("supabase_insert_response_invalid");
  }

  return {
    ...record,
    company: record.company ?? "",
    phone: record.phone ?? "",
    projectType: record.project_type,
  };
}

export async function sendInquiryWebhook(
  input: InquiryInput,
  record?: InquiryRecord,
): Promise<void> {
  const endpoint = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!endpoint)
    throw new InquiryError("webhook_configuration_missing");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(record
        ? { "Idempotency-Key": `inquiry/${record.id}` }
        : {}),
    },
    body: JSON.stringify({
      ...input,
      ...(record ? { inquiryId: record.id } : {}),
      source: "zololabssolutions.com/contact",
      submittedAt:
        record?.created_at ?? new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok)
    throw new InquiryError(`webhook_http_${response.status}`);
}

async function sendInquiryEmail(
  record: InquiryRecord,
): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.INQUIRY_NOTIFICATION_FROM?.trim();

  const to = process.env.INQUIRY_NOTIFICATION_TO
    ?.split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!key || !from || !to?.length)
    throw new InquiryError("email_configuration_missing");

  /*
   * Supabase returns the database column as project_type when records
   * are fetched directly during retry processing. Newly saved records
   * are already mapped to projectType.
   */
  const databaseRecord = record as InquiryRecord & {
    project_type?: string;
  };

  const projectType =
    record.projectType ||
    databaseRecord.project_type ||
    "Not specified";

  const phone = record.phone || "";
  const phoneHref = phone.replace(/[^\d+]/g, "");

  /*
   * Escape customer-controlled values before placing them into
   * the HTML email.
   */
  const escapeHtml = (value: string): string =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const safeName = escapeHtml(record.name);
  const safeEmail = escapeHtml(record.email);
  const safePhone = escapeHtml(
    record.phone || "Not provided",
  );
  const safeCompany = escapeHtml(
    record.company || "Not provided",
  );
  const safeProjectType = escapeHtml(projectType);
  const safeMessage = escapeHtml(record.message).replace(
    /\n/g,
    "<br />",
  );

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `inquiry/${record.id}`,
      },

      body: JSON.stringify({
        from,
        to,

        /*
         * Pressing Reply in Gmail goes directly to the customer.
         */
        reply_to: record.email,

        /*
         * Important information is visible directly from
         * the Gmail inbox preview.
         */
        subject: `New Inquiry • ${projectType} • ${record.name}`,

        /*
         * Plain-text fallback.
         */
        text: [
          "NEW ZOLOLABS WEBSITE INQUIRY",
          "",
          `Name: ${record.name}`,
          `Project Type: ${projectType}`,
          "",
          "CONTACT DETAILS",
          `Email: ${record.email}`,
          `Mobile: ${record.phone || "Not provided"}`,
          `Company: ${record.company || "Not provided"}`,
          "",
          "CUSTOMER MESSAGE",
          record.message,
          "",
          `Inquiry ID: ${record.id}`,
          `Received: ${record.created_at}`,
          "",
          "Reply to this email to contact the customer.",
        ].join("\n"),

        /*
         * Professional HTML notification email.
         */
        html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#f4f7fb;
      font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
      color:#142033;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="background:#f4f7fb;"
    >
      <tr>
        <td align="center" style="padding:32px 16px;">

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              max-width:620px;
              background:#ffffff;
              border:1px solid #e5eaf1;
              border-radius:16px;
              overflow:hidden;
            "
          >

            <!-- HEADER -->
            <tr>
              <td
                style="
                  background:#0d1729;
                  padding:28px 32px;
                "
              >
                <div
                  style="
                    margin-bottom:10px;
                    font-size:11px;
                    font-weight:700;
                    letter-spacing:1.8px;
                    color:#74a7ff;
                  "
                >
                  NEW PROJECT INQUIRY
                </div>

                <div
                  style="
                    margin:0;
                    font-size:26px;
                    line-height:1.25;
                    font-weight:700;
                    color:#ffffff;
                  "
                >
                  ${safeName}
                </div>

                <div
                  style="
                    margin-top:7px;
                    font-size:14px;
                    line-height:1.5;
                    color:#b8c3d5;
                  "
                >
                  ${safeProjectType}
                </div>
              </td>
            </tr>


            <!-- MAIN CONTENT -->
            <tr>
              <td style="padding:30px 32px;">

                <!-- CONTACT TITLE -->
                <div
                  style="
                    margin-bottom:12px;
                    font-size:10px;
                    font-weight:700;
                    letter-spacing:1.4px;
                    color:#7b8798;
                  "
                >
                  CONTACT DETAILS
                </div>

                <!-- CONTACT TABLE -->
                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    width:100%;
                    border-collapse:collapse;
                    font-size:14px;
                  "
                >

                  <tr>
                    <td
                      style="
                        width:100px;
                        padding:11px 0;
                        color:#7b8798;
                        border-bottom:1px solid #edf1f5;
                      "
                    >
                      Email
                    </td>

                    <td
                      style="
                        padding:11px 0;
                        font-weight:600;
                        border-bottom:1px solid #edf1f5;
                      "
                    >
                      <a
                        href="mailto:${safeEmail}"
                        style="
                          color:#2563eb;
                          text-decoration:none;
                        "
                      >
                        ${safeEmail}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:11px 0;
                        color:#7b8798;
                        border-bottom:1px solid #edf1f5;
                      "
                    >
                      Mobile
                    </td>

                    <td
                      style="
                        padding:11px 0;
                        font-weight:600;
                        border-bottom:1px solid #edf1f5;
                      "
                    >
                      ${
                        phone
                          ? `
                            <a
                              href="tel:${phoneHref}"
                              style="
                                color:#2563eb;
                                text-decoration:none;
                              "
                            >
                              ${safePhone}
                            </a>
                          `
                          : "Not provided"
                      }
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:11px 0;
                        color:#7b8798;
                      "
                    >
                      Company
                    </td>

                    <td
                      style="
                        padding:11px 0;
                        font-weight:600;
                      "
                    >
                      ${safeCompany}
                    </td>
                  </tr>

                </table>


                <!-- PROJECT -->
                <div
                  style="
                    margin-top:30px;
                    margin-bottom:12px;
                    font-size:10px;
                    font-weight:700;
                    letter-spacing:1.4px;
                    color:#7b8798;
                  "
                >
                  PROJECT TYPE
                </div>

                <div
                  style="
                    display:inline-block;
                    padding:8px 12px;
                    background:#eef4ff;
                    border-radius:7px;
                    color:#2457b8;
                    font-size:13px;
                    font-weight:700;
                  "
                >
                  ${safeProjectType}
                </div>


                <!-- MESSAGE -->
                <div
                  style="
                    margin-top:30px;
                    margin-bottom:12px;
                    font-size:10px;
                    font-weight:700;
                    letter-spacing:1.4px;
                    color:#7b8798;
                  "
                >
                  CUSTOMER MESSAGE
                </div>

                <div
                  style="
                    padding:18px 20px;
                    background:#f7f9fc;
                    border-left:4px solid #2563eb;
                    border-radius:8px;
                    font-size:14px;
                    line-height:1.7;
                    color:#293548;
                  "
                >
                  ${safeMessage}
                </div>


                <!-- ACTION BUTTONS -->
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="margin-top:28px;"
                >
                  <tr>
                    <td style="padding-right:10px;">
                      <a
                        href="mailto:${safeEmail}"
                        style="
                          display:inline-block;
                          padding:12px 18px;
                          background:#2563eb;
                          border-radius:8px;
                          color:#ffffff;
                          font-size:13px;
                          font-weight:700;
                          text-decoration:none;
                        "
                      >
                        Reply by Email
                      </a>
                    </td>

                    ${
                      phone
                        ? `
                          <td>
                            <a
                              href="tel:${phoneHref}"
                              style="
                                display:inline-block;
                                padding:12px 18px;
                                background:#0d1729;
                                border-radius:8px;
                                color:#ffffff;
                                font-size:13px;
                                font-weight:700;
                                text-decoration:none;
                              "
                            >
                              Call Customer
                            </a>
                          </td>
                        `
                        : ""
                    }
                  </tr>
                </table>

              </td>
            </tr>


            <!-- FOOTER -->
            <tr>
              <td
                style="
                  padding:17px 32px;
                  background:#f8fafc;
                  border-top:1px solid #edf1f5;
                "
              >
                <div
                  style="
                    font-size:11px;
                    line-height:1.6;
                    color:#8b96a7;
                  "
                >
                  ZoloLabs Website Inquiry
                  <br />
                  Inquiry ID: ${escapeHtml(record.id)}
                  <br />
                  Received: ${escapeHtml(record.created_at)}
                </div>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
</html>
        `,
      }),

      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );

  if (!response.ok)
    throw new InquiryError(
      `resend_http_${response.status}`,
    );
}

/** Claim atomically so a background callback and a retry job cannot both send. */
export async function deliverInquiryNotification(
  record: InquiryRecord,
): Promise<void> {
  if (
    record.notification_status === "sent" ||
    record.notification_status === "disabled"
  )
    return;

  const query = new URLSearchParams({
    id: `eq.${record.id}`,
    notification_status: `eq.${record.notification_status}`,
    notification_attempts: `eq.${record.notification_attempts}`,
  });

  const now = new Date().toISOString();

  if (record.notification_attempts >= MAX_ATTEMPTS) {
    await database(query.toString(), {
      method: "PATCH",
      body: JSON.stringify({
        notification_status: "failed",
        notification_error: "attempt_limit_reached",
      }),
    });

    return;
  }

  const claim = await database(query.toString(), {
    method: "PATCH",
    headers: {
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      notification_status: "processing",
      notification_started_at: now,
      notification_attempts:
        record.notification_attempts + 1,
    }),
  });

  const claimed: InquiryRecord[] = await claim.json();

  if (!claimed[0]) return;

  const attempt = claimed[0].notification_attempts;

  const outcome: Record<string, string | null> = {};

  try {
    if (record.notification_channel === "email")
      await sendInquiryEmail(record);
    else if (record.notification_channel === "webhook")
      await sendInquiryWebhook(record, record);
    else
      throw new InquiryError(
        "notification_channel_disabled",
      );

    outcome.notification_status = "sent";
    outcome.notification_sent_at =
      new Date().toISOString();
    outcome.notification_error = null;
  } catch (error) {
    outcome.notification_status = "failed";
    outcome.notification_error =
      error instanceof InquiryError
        ? error.message
        : "notification_request_failed";

    outcome.notification_next_attempt_at = new Date(
      Date.now() +
        Math.min(60, 2 ** attempt) * 60_000,
    ).toISOString();
  }

  const updateQuery = new URLSearchParams({
    id: `eq.${record.id}`,
    notification_status: "eq.processing",
    notification_attempts: `eq.${attempt}`,
  });

  await database(updateQuery.toString(), {
    method: "PATCH",
    body: JSON.stringify(outcome),
  });
}

/** Called only by the authenticated retry endpoint, never by site visitors. */
export async function retryInquiryNotifications(): Promise<number> {
  const started = Date.now();
  const now = new Date().toISOString();
  const stale = new Date(
    Date.now() - 5 * 60_000,
  ).toISOString();

  const query = new URLSearchParams({
    or: `(and(notification_status.in.(pending,failed),notification_attempts.lt.${MAX_ATTEMPTS},notification_next_attempt_at.lte.${now}),and(notification_status.eq.processing,notification_started_at.lte.${stale}))`,
    order: "created_at.asc",
    limit: "4",
  });

  const response = await database(query.toString());

  const records: InquiryRecord[] =
    await response.json();

  let processed = 0;

  for (const record of records) {
    // Leave room for the last claim/send/update within a 60-second invocation.
    if (Date.now() - started > 20_000) break;

    await deliverInquiryNotification(record);
    processed += 1;
  }

  return processed;
}