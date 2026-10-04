export const projectTypes = [
  "Mobile or Web Application",
  "Business Platform",
  "Existing Product Improvement",
  "Other",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type ContactField = "name" | "company" | "email" | "phone" | "projectType" | "message";
export type ContactFields = Record<ContactField, string>;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;
export const MAX_DESCRIPTION_LENGTH = 1800;

/** Shared rules keep browser feedback and the server boundary consistent. */
export function validateContactFields(fields: ContactFields): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = fields.name.trim();
  const company = fields.company.trim();
  const email = fields.email.trim();
  const phone = fields.phone.trim();
  const message = fields.message.trim();

  if (name.length < 2 || name.length > 80) errors.name = "Enter your name (2–80 characters).";
  if (company.length < 2 || company.length > 120) errors.company = "Enter your company or organization (2–120 characters).";
  if (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email)) errors.email = "Enter an email address we can reply to.";
  if (phone && (phone.length > 40 || !/^\+?[0-9\s().-]+$/u.test(phone) || phone.replace(/\D/gu, "").length < 7 || phone.replace(/\D/gu, "").length > 15)) {
    errors.phone = "Enter a phone number with 7–15 digits, or leave it blank.";
  }
  if (!projectTypes.some((type) => type === fields.projectType)) errors.projectType = "Choose the project type that fits best.";
  if (message.length < 20 || message.length > MAX_DESCRIPTION_LENGTH) errors.message = "Describe your project in 20–1,800 characters.";
  return errors;
}

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: ContactFieldErrors;
};

export const initialContactState: ContactFormState = { status: "idle", message: "" };
