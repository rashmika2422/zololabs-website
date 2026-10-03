import { MotionGroup, MotionItem } from "@/components/ui/Motion";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassObject } from "@/components/ui/GlassObject";
import { services } from "@/data/site";

export default function Services() {
  return (
    <div className="services-band"><Section id="services" className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeading
        eyebrow="Services"
        title="The right expertise for your next move."
        description="Every engagement uses one or more of these service lines, and each one is scoped in writing before work starts."
      />

      <MotionGroup as="ul"
        className="service-bento mt-10 grid gap-5 sm:grid-cols-2"
      >
        {services.map((service, index) => (
          <MotionItem as="li" interactive
            key={service.name}
            className={`h-full service-item service-item-${index}`}
          >
            <Card interactive className="service-card flex h-full flex-col">
              <GlassObject name={["services/digital-network.png", "decorative/glass-orb.png", "services/technology-network-orb.png", "decorative/technology-ring.png"][index]} className="service-object" />
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight text-heading">
                  {service.name}
                </h3>
                <span className="rounded-lg bg-accent/5 px-3 py-2 text-xs font-semibold text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-brand">
                {service.summary}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {service.detail}
              </p>
            </Card>
          </MotionItem>
        ))}
      </MotionGroup>
    </Section></div>
  );
}

