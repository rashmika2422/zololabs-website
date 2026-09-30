"use client";

import type { ChangeEvent } from "react";
import { useActionState, useState } from "react";
import { initialContactState, sendEnquiry } from "@/app/contact/actions";
import { buttonClass } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/icons";
import { cx } from "@/components/ui/Section";

type Field = "name" | "email" | "company" | "message";

const EMPTY_FIELDS: Record<Field, string> = {
  name: "",
  email: "",
  company: "",
  message: "",
};

const LABEL_CLASS = "block text-sm font-medium text-slate-200";
const FIELD_CLASS =
  "mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-accent focus:outline-none";

type ContactFormProps = {
  contactEmail: string | null;
};

export function ContactForm({ contactEmail }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(
    sendEnquiry,
    initialContactState,
  );
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [showFormAgain, setShowFormAgain] = useState(false);

  function update(key: Field) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setFields((previous) => ({ ...previous, [key]: value }));
    };
  }

  if (state.status === "success" && !showFormAgain) {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 sm:p-8">
        <CheckIcon className="h-6 w-6 text-accent" />
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">
          Message sent
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{state.message}</p>
        <button
          type="button"
          onClick={() => {
            setFields(EMPTY_FIELDS);
            setShowFormAgain(true);
          }}
          className={buttonClass("secondary", "mt-6")}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={() => setShowFormAgain(false)}
      className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL_CLASS}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            value={fields.name}
            onChange={update("name")}
            className={FIELD_CLASS}
            placeholder="Alex Morgan"
          />
        </div>

        <div>
          <label htmlFor="email" className={LABEL_CLASS}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            value={fields.email}
            onChange={update("email")}
            className={FIELD_CLASS}
            placeholder="alex@company.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="company" className={LABEL_CLASS}>
          Company <span className="text-slate-500">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={120}
          autoComplete="organization"
          value={fields.company}
          onChange={update("company")}
          className={FIELD_CLASS}
          placeholder="Company name"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={LABEL_CLASS}>
          What should we look at?
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={2000}
          rows={6}
          value={fields.message}
          onChange={update("message")}
          className={cx(FIELD_CLASS, "resize-y")}
          placeholder="Describe the process that breaks most often, the tools you use today, and what you would like to change."
        />
      </div>

      {/* Honeypot: off-screen for people, tempting for bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" ? (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200"
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className={cx(
            buttonClass("primary"),
            isPending && "cursor-not-allowed opacity-60",
          )}
        >
          {isPending ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-slate-500">
          {contactEmail ? (
            <>
              Prefer email?{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-semibold text-accent transition-colors hover:text-cyan-300"
              >
                {contactEmail}
              </a>
            </>
          ) : (
            "We only use your details to reply to this enquiry."
          )}
        </p>
      </div>
    </form>
  );
}
