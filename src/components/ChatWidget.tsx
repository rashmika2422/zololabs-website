"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

const GREETING =
  "Hi! ZoloLabs builds mobile and web applications, plus business platforms. What would you like to build or improve?";

const QUICK_REPLIES = [
  "Do you work with small businesses?",
  "What business platforms do you build?",
  "How much does a project cost?",
];

let counter = 0;
function nextId(): string {
  counter += 1;
  return `m${counter}`;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "end" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Abort any in-flight request if the widget unmounts.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;

      const userMessage: ChatMessage = { id: nextId(), role: "user", content: text };
      // The API owns the system prompt; the local greeting is UI-only.
      const history = [...messages, userMessage].filter((m) => m.id !== "greeting");

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setError(null);
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
          signal: controller.signal,
        });

        const data: unknown = await res.json().catch(() => null);
        const reply =
          typeof data === "object" && data !== null
            ? (data as { reply?: unknown }).reply
            : undefined;
        const failure =
          typeof data === "object" && data !== null
            ? (data as { error?: unknown }).error
            : undefined;

        if (typeof reply === "string" && reply) {
          setMessages((prev) => [
            ...prev,
            { id: nextId(), role: "assistant", content: reply },
          ]);
        } else {
          setError(
            typeof failure === "string" && failure
              ? failure
              : "Sorry, I could not reach the assistant. Please try again.",
          );
        }
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === "AbortError") return;
        setError("Network error. Please check your connection and try again.");
      } finally {
        abortRef.current = null;
        setLoading(false);
      }
    },
    [loading, messages],
  );


  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={false}
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-ink shadow-lg transition hover:bg-accent-hover motion-safe:hover:-translate-y-0.5"
        >
          <ChatIcon className="h-4 w-4" />
          Chat with us
        </button>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat with ZoloLabs"
          className="chat-panel flex h-[min(480px,calc(100dvh-2rem))] w-[calc(100vw-3rem)] max-w-96 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-line bg-ink p-4">
            <div>
              <p className="text-sm font-medium text-heading">ZoloLabs assistant</p>
              <p className="text-xs text-muted">
                {loading ? "Typing…" : "Usually replies instantly"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded p-1 text-lg font-bold text-muted transition hover:text-heading"
            >
              ✕
            </button>
          </div>

          <div
            className="flex-1 space-y-3 overflow-y-auto p-4"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-wrap break-words rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent font-medium text-accent-ink"
                      : "bg-raised text-body"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {!loading &&
              messages.length === 1 &&
              QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => void sendMessage(reply)}
                  className="block w-full rounded-xl border border-line px-3.5 py-2 text-left text-sm text-body transition hover:border-accent/50 hover:bg-raised"
                >
                  {reply}
                </button>
              ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-raised px-3 py-2 text-xs italic text-muted">
                  Typing…
                </div>
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-xl bg-amber-500/10 px-3.5 py-2 text-sm text-warning">
                {error}
              </p>
            )}

            <div ref={endRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(input);
            }}
            className="flex gap-2 border-t border-line bg-ink p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Message
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question…"
              maxLength={2000}
              autoComplete="off"
              className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-heading placeholder:text-subtle focus:border-accent focus-visible:outline-2 focus-visible:outline-brand"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-accent-ink transition hover:bg-accent-hover disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M17 9.5c0 3.038-3.134 5.5-7 5.5-.79 0-1.55-.09-2.26-.26L4 16l.9-2.7C3.72 12.36 3 11.02 3 9.5 3 6.462 6.134 4 10 4s7 2.462 7 5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
