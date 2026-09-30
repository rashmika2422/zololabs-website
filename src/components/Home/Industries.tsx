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
        title="Built for the industries we work in"
        description="Four practice areas. Each one lists the bottlenecks we hear most and the systems we build to answer them."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {industries.map((industry) => (
          <li key={industry.slug} className="h-full">
            <Link
              href={`/solutions#${industry.slug}`}
              className="group block h-full rounded-2xl"
            >
              <Card interactive className="flex h-full flex-col">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {industry.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">
                  {industry.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Explore {industry.title}
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
