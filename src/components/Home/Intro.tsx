import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

export default function Intro() {
  return (
    <section id="intro" className="container home-intro section-space" aria-labelledby="intro-title">
      <Reveal as="p" className="eyebrow">The purpose behind the product</Reveal>
      <div className="intro-body">
        <h2 id="intro-title" className="section-heading">
          <TextReveal>Technology built around</TextReveal>
          {" "}<TextReveal delay={100}>real business problems.</TextReveal>
        </h2>
        <Reveal as="p" variant="fade-left" delay={160}>
          ZoloLabs combines product thinking, software engineering and thoughtful design to turn business challenges into reliable digital products.
        </Reveal>
      </div>
    </section>
  );
}
