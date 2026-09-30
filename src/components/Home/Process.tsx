import { Section, SectionHeading } from "@/components/ui/Section";
import { processSteps } from "@/data/site";

export default function Process() {
  return (
    <Section id="process" className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Process"
        title="How an engagement runs"
        description="Three steps, and you can stop after any of them. Nothing gets built until the scope and the price are agreed in writing."
      />

      <ol className="mt-10 grid gap-5 sm:grid-cols-3">
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-7"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-semibold text-accent tabular-nums">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

