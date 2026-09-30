import Link from "next/link";
import { Card, ServiceTag } from "@/components/ui/Card";
import { CheckIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { getIndustryServices } from "@/data/industries";
import type { Industry } from "@/data/industries";

type IndustrySectionProps = {
  industry: Industry;
  index: number;
};

/**
 * One industry block: the bottlenecks on the left, the systems we build on the
 * right. Keeps the three-problem / three-build structure identical for every
 * industry so the page stays skimmable.
 */
export function IndustrySection({ industry, index }: IndustrySectionProps) {
  const serviceTags = getIndustryServices(industry);
  const headingId = `${industry.slug}-heading`;

  return (
    <Section
      id={industry.slug}
      className="border-t border-line pt-14 first:border-t-0 first:pt-0"
    >
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        {String(index + 1).padStart(2, "0")} — {industry.title}
      </p>

      <h2
        id={headingId}
        className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
      >
        Software we build for {industry.title}
      </h2>

      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
        <span className="text-slate-300">{industry.summary}</span>{" "}
        {industry.intro}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {serviceTags.map((serviceType) => (
          <li key={serviceType}>
            <ServiceTag>{serviceType}</ServiceTag>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-8">
        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            Where the hours go
          </h3>
          <ol className="mt-5 space-y-6 border-l border-line pl-5">
            {industry.problems.map((problem, problemIndex) => (
              <li key={problem.title}>
                <p className="text-xs text-slate-500 tabular-nums">
                  {String(problemIndex + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-base font-semibold tracking-tight text-white">
                  {problem.title}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  {problem.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            What we build
          </h3>
          <ul className="mt-5 space-y-4">
            {industry.builds.map((build) => (
              <li key={build.title}>
                <Card interactive className="h-full">
                  <ServiceTag>{build.serviceType}</ServiceTag>
                  <h4 className="mt-4 text-base font-semibold tracking-tight text-white">
                    {build.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {build.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {build.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex gap-2.5 text-sm leading-6 text-slate-300"
                      >
                        <CheckIcon className="mt-1.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm">
            <Link
              href="/contact"
              className="font-semibold text-accent transition-colors hover:text-cyan-300"
            >
              Talk to us about {industry.title.toLowerCase()} →
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
