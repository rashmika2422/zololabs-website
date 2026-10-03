import { ButtonLink } from "./Button";
import { ArrowRightIcon } from "./icons";

type ContactCTAProps = {
  headline?: string;
  description?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  id?: string;
};

/**
 * Closing call to action shared by the homepage and /solutions so both pages
 * end on the same, single conversion path.
 */
export function ContactCTA({
  headline = "Your next stage of growth starts with a conversation.",
  description = "Bring the workflow your current tools cannot handle. We will map the process, scope the build and show you what it costs before a line of code is written.",
  primaryLabel = "Book a discovery session",
  secondaryHref = "/solutions",
  secondaryLabel = "See what we build",
  id = "contact-cta",
}: ContactCTAProps) {
  return (
    <section
      aria-labelledby={id}
      className="contact-cta relative isolate overflow-hidden rounded-3xl border border-accent/25 px-6 py-12 sm:px-12 sm:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="relative">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          Next step
        </p>
        <h2
          id={id}
          className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-heading sm:text-4xl"
        >
          {headline}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href="/contact" variant="primary">
            {primaryLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={secondaryHref} variant="secondary">
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
