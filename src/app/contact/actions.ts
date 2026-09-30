"use server";

import { headers } from "next/headers";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const LIMITS = { name: 80, email: 120, company: 120, message: 2_000 } as const;
const MIN_MESSAGE = 20;
const DELIVERY_TIMEOUT_MS = 10_000;

/**
 * Best-effort per-IP throttle. Serverless instances each keep their own map, so
 * this is friction for casual spam rather than a security boundary.
 */
const RATE_LIMIT = { windowMs: 10 * 60_000, max: 5 };
const submissions = new Map<string, number[]>();

async function rateLimited(): Promise<boolean> {
  const headerList = await headers();
  const key =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter(
    (time) => now - time < RATE_LIMIT.windowMs,
  );

  if (recent.length >= RATE_LIMIT.max) {
    submissions.set(key, recent);
    return true;
  }

  recent.push(now);
  submissions.set(key, recent);

  if (submissions.size > 2_000) {
    for (const [storedKey, times] of submissions) {
      if (times.every((time) => now - time >= RATE_LIMIT.windowMs)) {
        submissions.delete(storedKey);
      }
    }
  }

  return false;
}

function readField(formData: FormData, key: string, limit: number): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

/**
 * Receives the enquiry form. Delivery is pluggable: set CONTACT_WEBHOOK_URL to
 * any endpoint that accepts a JSON POST (Formspree, Make, n8n, Slack, your own
 * API). With no endpoint configured the action says so plainly instead of
 * pretending the message was delivered.
 */
export async function sendEnquiry(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = readField(formData, "name", LIMITS.name);
  const email = readField(formData, "email", LIMITS.email);
  const company = readField(formData, "company", LIMITS.company);
  const message = readField(formData, "message", LIMITS.message);

  // Honeypot: hidden from people, irresistible to bots.
  if (readField(formData, "website", 100)) {
    return {
      status: "success",
      message: "Thanks — your message is with the team.",
    };
  }

  if (name.length < 2) {
    return { status: "error", message: "Please tell us your name." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return {
      status: "error",
      message: "Please enter an email address we can reply to.",
    };
  }

  if (message.length < MIN_MESSAGE) {
    return {
      status: "error",
      message: `Please add a little more detail (at least ${MIN_MESSAGE} characters) so we can prepare for the call.`,
    };
  }

  if (await rateLimited()) {
    return {
      status: "error",
      message:
        "That is a few messages in a short window. Please try again shortly, or email us directly.",
    };
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL?.trim();
  const contactEmail = process.env.CONTACT_EMAIL?.trim();

  if (!endpoint) {
    return {
      status: "error",
      message: contactEmail
        ? `Our form relay is not connected yet, so nothing was sent. Email ${contactEmail} and we will pick it up straight away.`
        : "Our form relay is not connected yet, so nothing was sent. Ask the assistant in the corner and we will pick it up straight away.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company,
        message,
        source: "zololabs.com/contact",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`relay responded ${response.status}`);
    }

    return {
      status: "success",
      message:
        "Thanks — your message is with the team. We reply within one business day.",
    };
  } catch (error) {
    console.error(`[contact] delivery failed: ${String(error)}`);

    return {
      status: "error",
      message: contactEmail
        ? `We could not send that. Please try again, or email ${contactEmail}.`
        : "We could not send that. Please try again, or ask the assistant in the corner.",
    };
  }
}
