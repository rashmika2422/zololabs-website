import Link from "next/link";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { Stagger } from "@/components/animations/Stagger";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { ArrowRightIcon } from "@/components/ui/icons";
import { teaCareProject as project } from "@/data/projects";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata(
  "TeaCare Services Website Project",
  "See how ZoloLabs designed and developed the TeaCare Services digital platform using modern web technologies.",
  "/work/teacare",
);

export default function TeaCarePage() {
  return (
    <div className="internal-page case-study-page">
      <PageHeader
        eyebrow="Business platform / TeaCare Services"
        title={<>A clearer path from<br /><span>discovery to conversation.</span></>}
        description={project.description}
      >
        {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>Visit Live Site <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a> : null}
        <Link href="/work" className="text-link">All work <ArrowRightIcon /></Link>
      </PageHeader>

      <div className="container">
        <div className="case-study-visual project-card-media">
          <Parallax amount={18}>
            <Reveal variant="image-mask" duration={950} delay={100}><ProjectVisual project={project} eager /></Reveal>
          </Parallax>
        </div>
        <Stagger as="dl" className="case-study-facts" step={75}>
          <div data-reveal><dt>Project</dt><dd>{project.name}</dd></div>
          <div data-reveal><dt>Industry</dt><dd>{project.industry}</dd></div>
          <div data-reveal><dt>Product type</dt><dd>{project.category}</dd></div>
        </Stagger>

        <section className="case-study-overview" aria-labelledby="case-overview-title">
          <Reveal><p className="eyebrow">The thinking behind the product</p><h2 id="case-overview-title">Make the next<br />step simpler.</h2></Reveal>
          <Reveal className="case-study-problem" delay={90}>
            <div><h3>The challenge</h3><p>{project.challenge}</p></div>
            <div><h3>The solution</h3><p>{project.solution}</p></div>
          </Reveal>
        </section>

        <section className="case-study-capabilities" aria-labelledby="case-capabilities-title">
          <Reveal className="case-section-heading"><p className="eyebrow">The experience</p><h2 id="case-capabilities-title">Three connected moments.</h2></Reveal>
          <Stagger className="case-capability-grid" step={90}>
            {project.capabilities.map((capability, index) => (
              <article key={capability.title} data-reveal>
                <span className="case-capability-number">0{index + 1}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </Stagger>
        </section>

        <Reveal as="section" className="case-study-stack" aria-labelledby="case-stack-title">
          <div><p className="eyebrow">Engineering foundation</p><h2 id="case-stack-title">Built to connect.</h2></div>
          <ul className="technology-list" aria-label="Project technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        </Reveal>
      </div>

      <section className="internal-cta" aria-labelledby="case-cta-title">
        <Reveal className="container internal-cta-inner">
          <div><p className="eyebrow">Let&apos;s build something useful</p><h2 id="case-cta-title">What could work better<br />in your business?</h2></div>
          <ButtonLink href="/contact">Start a Project <ArrowRightIcon /></ButtonLink>
        </Reveal>
      </section>
    </div>
  );
}
