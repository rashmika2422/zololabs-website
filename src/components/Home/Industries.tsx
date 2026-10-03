import { MotionGroup, MotionItem } from "@/components/ui/Motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { industries } from "@/data/industries";

export default function Industries() {
  return (
    <Section
      id="industries"
      className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20"
    >
      <SectionHeading
        eyebrow="Industries"
        title="Software shaped around your industry."
        description="From daily operations to your next stage of growth, we build systems around the challenges your team knows best."
      />

      <MotionGroup as="ul"
        className="mt-10 grid gap-5 sm:grid-cols-2"
      >
        {industries.map((industry, index) => (
          <MotionItem as="li" interactive
            key={industry.slug}
            className="h-full"
          >
            <Link
              href={`/solutions#${industry.slug}`}
              className="group block h-full rounded-2xl"
            >
              <Card interactive className="industry-card h-full">
                <div className="mb-7 flex items-center justify-between">
                  <span className="rounded-lg border border-accent/15 bg-accent/5 px-3 py-2 text-xs font-semibold tracking-widest text-brand tabular-nums" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRightIcon className="h-5 w-5 text-brand transition-transform motion-safe:group-hover:-rotate-45" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-heading">
                  {industry.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                  {industry.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${industry.title} solutions`}>
                  {industry.builds.slice(0, 2).map((build) => (
                    <li key={build.title} className="rounded-md border border-line bg-ink/60 px-2.5 py-1.5 text-xs leading-5 text-muted">{build.title}</li>
                  ))}
                </ul>
                <span className="mt-7 border-t border-line pt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  Explore {industry.title}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          </MotionItem>
        ))}
      </MotionGroup>
    </Section>
  );
}
