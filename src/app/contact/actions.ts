"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import type { ContactFormState } from "./state";
import {
  deliverInquiryNotification,
  hasInquiryStorage,
  saveInquiry,
  sendInquiryWebhook,
  validateInquiry,
} from "@/lib/inquiries";

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

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Validate first, persist in Supabase, then notify after acknowledging receipt. */
export async function sendEnquiry(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const inquiry = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    company: readField(formData, "company"),
    message: readField(formData, "message"),
  };

  // Honeypot: hidden from people, irresistible to bots.
  if (readField(formData, "website")) {
    return {
      status: "success",
      message: "Thanks — your message is with the team.",
    };
  }

  const validationError = validateInquiry(inquiry);
  if (validationError) return { status: "error", message: validationError };

  if (await rateLimited()) {
    return {
      status: "error",
      message:
        "That is a few messages in a short window. Please try again shortly, or email us directly.",
    };
  }

  const contactEmail = process.env.CONTACT_EMAIL?.trim();
  try {
    if (hasInquiryStorage()) {
      const record = await saveInquiry(inquiry);
      if (record.notification_channel !== "none") {
        try {
          after(async () => {
            try {
              await deliverInquiryNotification(record);
            } catch {
              // The durable pending record can be recovered by the retry job.
              console.error("[contact] notification processing failed; retry needed");
            }
          });
        } catch {
          // Receipt is already durable even if the host cannot schedule work.
          console.error("[contact] notification scheduling failed; retry needed");
        }
      }
    } else {
      // Preserve previously configured webhook-only installations.
      await sendInquiryWebhook(inquiry);
    }
    return {
      status: "success",
      message: "Thanks — we have received your inquiry. We reply within one business day.",
    };
  } catch {
    console.error("[contact] inquiry could not be accepted");
    return {
      status: "error",
      message: contactEmail
        ? `We could not receive that. Please try again, or email ${contactEmail}.`
        : "We could not receive that. Please try again shortly.",
    };
  }
}
