import { timingSafeEqual } from "node:crypto";
import { retryInquiryNotifications } from "@/lib/inquiries";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return Response.json({ error: "Retry scheduler is not configured." }, { status: 503 });
  const actual = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return Response.json({ processed: await retryInquiryNotifications() });
  } catch {
    console.error("[contact] notification retry failed");
    return Response.json({ error: "Notification retry failed." }, { status: 502 });
  }
}
