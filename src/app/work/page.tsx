import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ArrowRightIcon } from "@/components/ui/icons";
import { projects } from "@/data/projects";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata(
  "Our Work",
  "Explore ZoloLabs projects, including the TeaCare Services business platform and Bloodline Studio demo.",
  "/work",
);

export default function WorkPage() {
  return (
    <div className="internal-page work-page">
      <PageHeader
        eyebrow="Selected work"
        title={<>Work built around<br /><span>real problems.</span></>}
        description="A closer look at the products we build, the challenges behind them and the engineering that brings them together."
      />
      <section className="container work-projects" aria-labelledby="work-projects-title">
        <Reveal className="work-index-label">
          <h2 id="work-projects-title">Selected projects</h2>
          <span>Client project + studio demo</span>
        </Reveal>
        <MobileCarousel className="selected-work-carousel" label="Our work">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} eager={index === 0} />)}
        </MobileCarousel>
      </section>
      <section className="internal-cta" aria-labelledby="work-cta-title">
        <Reveal className="container internal-cta-inner">
          <div><p className="eyebrow">Your next product</p><h2 id="work-cta-title">A real problem deserves<br />a thoughtful solution.</h2></div>
          <ButtonLink href="/contact">Start a Project <ArrowRightIcon /></ButtonLink>
        </Reveal>
      </section>
    </div>
  );
}
