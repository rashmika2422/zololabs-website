import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { PointerGlow } from "@/components/animations/PointerGlow";
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

export function ContactCTA({
  headline = "Have a product idea?",
  description = "Let’s turn it into something people can actually use.",
  primaryLabel = "Start a Project",
  secondaryHref = "/contact",
  secondaryLabel = "Contact ZoloLabs",
  id = "start-a-project",
}: ContactCTAProps) {
  return (
    <section className="contact-cta" aria-labelledby={id}>
      <PointerGlow className="cta-light" range={8} />
      <div className="container cta-inner">
        <div>
          <Reveal as="p" className="eyebrow">The next chapter</Reveal>
          <h2 id={id}><TextReveal delay={80}>{headline}</TextReveal></h2>
          <Reveal as="p" className="cta-description" delay={140}>{description}</Reveal>
        </div>
        <Reveal className="cta-actions" delay={210}>
          <ButtonLink href="/contact" variant="inverted">{primaryLabel}<ArrowRightIcon /></ButtonLink>
          <ButtonLink href={secondaryHref} variant="quiet">{secondaryLabel}<ArrowRightIcon /></ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
