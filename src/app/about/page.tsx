import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger } from "@/components/animations/Stagger";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { buildPageMetadata } from "@/lib/metadata";
import { siteName } from "@/data/site";

export const metadata = buildPageMetadata(
  `About ${siteName}`,
  "Learn about ZoloLabs, a Sri Lankan software development team building modern web applications, mobile applications, business platforms and custom digital solutions.",
  "/about",
);

const principles = [
  { title: "Understand before building.", description: "We begin with the business, its users and the problem. A clear understanding gives the product a useful direction." },
  { title: "Think like a product team.", description: "Thoughtful design and sound engineering belong together. We make decisions around how a product will be used and maintained." },
  { title: "Build quality into the process.", description: "Testing, review and controlled deployment are part of the work. We care about how the product performs beyond its first release." },
] as const;

export default function AboutPage() {
  return (
    <div className="internal-page about-page">
      <PageHeader
        eyebrow="About ZoloLabs"
        title={<>Building useful technology around <span>real business problems.</span></>}
        description="ZoloLabs is a software engineering company focused on developing mobile and web applications and custom business platforms."
      />

      <section className="container about-intro" aria-labelledby="about-approach-title">
        <Reveal className="about-intro-label" variant="scale"><p className="eyebrow">Our approach</p><span className="about-monogram" aria-hidden="true">Z<span>↗</span></span></Reveal>
        <Reveal className="about-intro-copy" delay={90}>
          <h2 id="about-approach-title">Good engineering begins<br />with a useful question.</h2>
          <p>We combine product thinking, modern software engineering and thoughtful design to turn ideas and operational challenges into reliable digital products.</p>
          <p>Our approach begins with understanding the problem—not choosing the technology. We then design, develop, test and deploy the solution around the needs of the business and its users.</p>
          <Link href="/solutions" className="text-link">Explore what we build <ArrowRightIcon /></Link>
        </Reveal>
      </section>

      <section className="about-principles" aria-labelledby="about-principles-title">
        <div className="container">
          <Reveal className="case-section-heading"><p className="eyebrow">How we think</p><h2 id="about-principles-title">A considered approach.<br />From problem to product.</h2></Reveal>
          <Stagger className="about-principles-grid" step={90}>
            {principles.map((principle, index) => (
              <article key={principle.title} data-reveal><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container about-future" aria-labelledby="about-future-title">
        <Reveal><p className="eyebrow">Focused today. Looking ahead.</p><h2 id="about-future-title">The same principles.<br />New possibilities.</h2></Reveal>
          <Reveal delay={90}><p>Today, our focus is clear: mobile and web applications, and business platforms.</p><p>As ZoloLabs grows, our mission is to expand beyond software into intelligent connected technologies while maintaining the same engineering-first approach.</p></Reveal>
      </section>

      <section className="internal-cta" aria-labelledby="about-cta-title">
        <Reveal className="container internal-cta-inner">
          <div><p className="eyebrow">Start with the problem</p><h2 id="about-cta-title">Let&apos;s build something<br />that makes a difference.</h2></div>
          <ButtonLink href="/contact">Start a Project <ArrowRightIcon /></ButtonLink>
        </Reveal>
      </section>
    </div>
  );
}
