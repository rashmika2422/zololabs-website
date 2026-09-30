import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/data/site";

export default function Services() {
  return (
    <Section id="services" className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Services"
        title="Four ways we build"
        description="Every engagement uses one or more of these service lines, and each one is scoped in writing before work starts."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {services.map((service, index) => (
          <li key={service.name} className="h-full">
            <Card interactive className="flex h-full flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {service.name}
                </h3>
                <span className="text-xs text-slate-500 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-accent">
                {service.summary}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {service.detail}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

