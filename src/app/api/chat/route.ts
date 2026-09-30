import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/chatSystemPrompt";

/**
 * Upstream endpoint. The override exists so the route can be exercised against
 * a local mock in tests; in production it is unset and DeepSeek is used.
 */
const DEEPSEEK_URL =
  process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com/chat/completions";
const MODEL = "deepseek-chat";

/** Only these roles may be supplied by the client. */
const ALLOWED_ROLES = new Set(["user", "assistant"]);

const MAX_MESSAGES = 24;
const MAX_CONTENT_LENGTH = 2000;
const HISTORY_WINDOW = 12;
const REQUEST_TIMEOUT_MS = 30_000;

/**
 * Per-IP throttle. Best-effort only: in-memory state is not shared across
 * serverless instances, so treat this as friction for casual abuse rather than
 * a hard security boundary.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 20 };
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT.windowMs,
  );

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 5_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(k);
    }
  }

  return false;
}

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

type CleanMessage = { role: "user" | "assistant"; content: string };

/**
 * Validates and sanitises the client-supplied history. Anything that is not a
 * well-formed user/assistant string is dropped, which is what stops a caller
 * from smuggling in a `system` message and overriding our instructions.
 */
function sanitiseMessages(input: unknown): CleanMessage[] {
  if (!Array.isArray(input)) return [];

  const cleaned: CleanMessage[] = [];

  for (const entry of input.slice(-MAX_MESSAGES)) {
    if (typeof entry !== "object" || entry === null) continue;

    const { role, content } = entry as { role?: unknown; content?: unknown };

    if (typeof role !== "string" || !ALLOWED_ROLES.has(role)) continue;
    if (typeof content !== "string") continue;

    const trimmed = content.trim();
    if (!trimmed) continue;

    cleaned.push({
      role: role as "user" | "assistant",
      content: trimmed.slice(0, MAX_CONTENT_LENGTH),
    });
  }

  // History must end with a user turn for the model to have something to answer.
  if (cleaned.length === 0 || cleaned[cleaned.length - 1]!.role !== "user") {
    cleaned.push({ role: "user", content: "Hello" });
  }

  return cleaned.slice(-HISTORY_WINDOW);
}

function extractReply(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null;

  const choices = (data as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) return null;

  const message = (choices[0] as { message?: unknown }).message;
  if (typeof message !== "object" || message === null) return null;

  const content = (message as { content?: unknown }).content;
  return typeof content === "string" && content.trim() ? content.trim() : null;
}

export async function POST(req: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    // Logged server-side only; the client just needs to know it is unavailable.
    console.error("[chat] DEEPSEEK_API_KEY is not set");
    return NextResponse.json(
      { error: "The assistant is not configured yet. Please contact us directly." },
      { status: 503 },
    );
  }

  if (rateLimited(clientKey(req))) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment and try again." },
      { status: 429 },
    );
  }

  let messages: CleanMessage[];

  try {
    const body: unknown = await req.json();
    messages = sanitiseMessages(
      typeof body === "object" && body !== null
        ? (body as { messages?: unknown }).messages
        : undefined,
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (messages.length === 0) {
    return NextResponse.json(
      { error: "Please send at least one message." },
      { status: 400 },
    );
  }

  try {
    const upstream = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages,
        ],
        temperature: 0.6,
        max_tokens: 800,
        stream: false,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!upstream.ok) {
      // Upstream body can contain sensitive detail, so log it, never return it.
      const detail = await upstream.text().catch(() => "");
      console.error(`[chat] DeepSeek ${upstream.status}: ${detail.slice(0, 500)}`);

      return NextResponse.json(
        {
          error:
            upstream.status === 429
              ? "The assistant is busy right now. Please try again shortly."
              : "The assistant is unavailable right now. Please try again.",
        },
        { status: upstream.status === 429 ? 429 : 502 },
      );
    }

    const data: unknown = await upstream.json();
    const reply = extractReply(data);

    if (!reply) {
      console.error("[chat] DeepSeek returned no usable content");
      return NextResponse.json(
        { error: "The assistant could not respond. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const isTimeout =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");

    console.error(`[chat] request failed: ${String(error)}`);

    return NextResponse.json(
      {
        error: isTimeout
          ? "The assistant took too long to respond. Please try again."
          : "The assistant is unavailable right now. Please try again.",
      },
      { status: isTimeout ? 504 : 502 },
    );
  }
}

