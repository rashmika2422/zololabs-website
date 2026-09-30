import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/ContactForm";
import { industries } from "@/data/industries";
import { processSteps } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with ZoloLabs. Bring the process your current tools cannot handle and we will map it, scope it and price it before any code is written.",
  alternates: { canonical: "/contact" },
};

const contactEmail = process.env.CONTACT_EMAIL?.trim() ?? null;

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          Contact
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">
          Tell us where off-the-shelf stops fitting.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          Bring the workflow your current tools cannot handle. We will map the
          process, name the constraint, and show you what a first release costs
          before a line of code is written.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ContactForm contactEmail={contactEmail} />

        <aside className="space-y-8">
          <div className="rounded-2xl border border-line bg-surface/70 p-6">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              What happens next
            </h2>
            <ol className="mt-5 space-y-5">
              {processSteps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold text-accent tabular-nums">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-slate-400">
                      {step.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-line bg-surface/70 p-6">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              Already know your industry?
            </h2>
            <ul className="mt-4 space-y-2">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/solutions#${industry.slug}`}
                    className="text-sm text-slate-300 transition-colors hover:text-accent"
                  >
                    {industry.title} — {industry.summary}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm leading-6 text-slate-400">
            Pressed for time? The assistant in the bottom corner answers the
            obvious questions straight away, and hands you back to a person when
            it cannot.
          </p>
        </aside>
      </div>
    </div>
  );
}
