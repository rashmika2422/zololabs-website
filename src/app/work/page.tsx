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
  "Explore TeaCare Services client work, the Ceylon Heritage Gems luxury e-commerce concept and the Bloodline Studio demo.",
  "/work",
);

export default function WorkPage() {
  return (
    <div className="internal-page work-page">
      <PageHeader
        eyebrow="Selected work"
        title={<>Work built around<br /><span>real problems and ideas.</span></>}
        description="Client solutions and ZoloLabs experiments that explore better ways to design, build and experience digital products."
      />
      <section className="container work-projects" aria-labelledby="work-projects-title">
        <Reveal className="work-index-label">
          <h2 id="work-projects-title">Selected projects</h2>
          <span>01 client project · 02 studio demos</span>
        </Reveal>
        <MobileCarousel className="selected-work-carousel" label="Our work" showCounter>
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} number={index + 1} eager={index === 0} />)}
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
