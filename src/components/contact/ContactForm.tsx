"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendEnquiry } from "@/app/contact/actions";
import {
  initialContactState, MAX_DESCRIPTION_LENGTH, projectTypes, validateContactFields,
  type ContactField, type ContactFieldErrors, type ContactFields, type ContactFormState,
} from "@/app/contact/state";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

const EMPTY_FIELDS: ContactFields = { name: "", company: "", email: "", phone: "", projectType: "", message: "" };
type ContactFormProps = { contactEmail: string | null };

export function ContactForm({ contactEmail }: ContactFormProps) {
  const [version, setVersion] = useState(0);
  return <ContactSubmission key={version} contactEmail={contactEmail} onRestart={() => setVersion((previous) => previous + 1)} />;
}

function ContactSubmission({ contactEmail, onRestart }: ContactFormProps & { onRestart: () => void }) {
  const [state, formAction, isPending] = useActionState(
    async (previous: ContactFormState, formData: FormData): Promise<ContactFormState> => {
      try {
        return await sendEnquiry(previous, formData);
      } catch {
        return { status: "error", message: "Your message could not be sent. Check your connection and try again." };
      }
    }, initialContactState,
  );
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors>({});
  const [editedFields, setEditedFields] = useState<Partial<Record<ContactField, boolean>>>({});
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  function fieldError(field: ContactField) {
    return clientErrors[field] ?? (!editedFields[field] ? state.fieldErrors?.[field] : undefined);
  }

  function fieldAttributes(field: ContactField) {
    return {
      id: field, name: field, value: fields[field], onChange: update(field),
      "aria-invalid": fieldError(field) ? true : undefined,
      "aria-describedby": fieldError(field) ? `${field}-error` : undefined,
      className: "contact-input",
    };
  }

  function update(field: ContactField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target;
      setFields((previous) => ({ ...previous, [field]: value }));
      setEditedFields((previous) => ({ ...previous, [field]: true }));
      setClientErrors((previous) => {
        const next = { ...previous };
        delete next[field];
        return next;
      });
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const errors = validateContactFields(fields);
    setClientErrors(errors);
    setEditedFields({});
    const invalidField = Object.keys(errors)[0] as ContactField | undefined;
    if (invalidField) {
      event.preventDefault();
      const element = event.currentTarget.elements.namedItem(invalidField);
      if (element instanceof HTMLElement) element.focus();
    }
  }

  function errorMessage(field: ContactField) {
    const error = fieldError(field);
    return error ? <p id={`${field}-error`} className="contact-field-error">{error}</p> : null;
  }

  if (state.status === "success") {
    return (
      <div ref={successRef} className="contact-success" tabIndex={-1} role="status">
        <span className="contact-success-icon"><CheckIcon /></span>
        <p className="eyebrow">Conversation started</p>
        <h2>Thanks for reaching out.</h2>
        <p>{state.message}</p>
        <button type="button" onClick={onRestart} className={buttonClass("secondary")}>Send another message</button>
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} noValidate className="contact-form" aria-busy={isPending}>
      <div className="contact-form-heading">
        <h2>Tell us what you have in mind.</h2>
        <p>All fields are required unless marked optional.</p>
      </div>

      <fieldset disabled={isPending} className="contact-fields">
        <legend className="sr-only">Your contact details and project</legend>
        <div className="contact-field-grid">
          <div className="contact-field">
            <label htmlFor="name">Name</label>
            <input {...fieldAttributes("name")} type="text" required minLength={2} maxLength={80} autoComplete="name" placeholder="Your name" />
            {errorMessage("name")}
          </div>
          <div className="contact-field">
            <label htmlFor="company">Company / Organization</label>
            <input {...fieldAttributes("company")} type="text" required minLength={2} maxLength={120} autoComplete="organization" placeholder="Your organization" />
            {errorMessage("company")}
          </div>
          <div className="contact-field">
            <label htmlFor="email">Email</label>
            <input {...fieldAttributes("email")} type="email" required maxLength={120} autoComplete="email" placeholder="you@company.com" />
            {errorMessage("email")}
          </div>
          <div className="contact-field">
            <label htmlFor="phone">Phone <span>(optional)</span></label>
            <input {...fieldAttributes("phone")} type="tel" maxLength={40} autoComplete="tel" placeholder="Include your country code" />
            {errorMessage("phone")}
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="projectType">Project Type</label>
          <select {...fieldAttributes("projectType")} required>
            <option value="" disabled>Select a project type</option>
            {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {errorMessage("projectType")}
        </div>

        <div className="contact-field">
          <label htmlFor="message">Project description</label>
          <textarea
            {...fieldAttributes("message")}
            required minLength={20} maxLength={MAX_DESCRIPTION_LENGTH} rows={6}
            placeholder="What are you looking to build or improve? Tell us about your users, the challenge and what a useful outcome looks like."
            aria-describedby={[fieldError("message") ? "message-error" : "", "message-hint"].filter(Boolean).join(" ")}
          />
          <p id="message-hint" className="contact-field-hint">A little context goes a long way. 20–1,800 characters.</p>
          {errorMessage("message")}
        </div>

        <div aria-hidden="true" className="contact-honeypot">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </fieldset>

      {state.status === "error" && !isPending ? <p role="alert" className="contact-form-error">{state.message}</p> : null}

      <div className="contact-form-submit">
        <button type="submit" disabled={isPending} className={buttonClass("primary")}>
          {isPending ? <span className="contact-loading-indicator" aria-hidden="true" /> : null}
          <span key={isPending ? "pending" : "ready"} className="contact-submit-label">{isPending ? "Sending your message…" : "Start the Conversation"}</span>
          {!isPending ? <ArrowRightIcon /> : null}
        </button>
        <p role="status" aria-live="polite" className="sr-only">{isPending ? "Sending your message. Please wait." : ""}</p>
        <p className="contact-privacy">We only use your details to respond to your inquiry.</p>
      </div>

      {contactEmail ? <p className="contact-email">Prefer email? <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p> : null}
    </form>
  );
}
