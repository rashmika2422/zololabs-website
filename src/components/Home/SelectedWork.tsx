import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <section id="work" className="featured-work-band" aria-labelledby="work-title">
      <div className="container selected-work section-space">
        <div className="home-section-header">
          <div>
            <Reveal as="p" className="eyebrow">Selected work</Reveal>
            <h2 id="work-title" className="section-heading">
              <TextReveal>Work built around</TextReveal>{" "}
              <TextReveal delay={100}>real problems and ideas.</TextReveal>
            </h2>
            <Reveal as="p" className="selected-work-lede" delay={140}>
              Client solutions and ZoloLabs experiments that explore better ways to design, build and experience digital products.
            </Reveal>
          </div>
          <Reveal delay={140}><Link href="/work" className="text-link">Explore Our Work<ArrowRightIcon /></Link></Reveal>
        </div>
        <MobileCarousel className="selected-work-carousel" label="Selected work" showCounter>
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} number={index + 1} featured />)}
        </MobileCarousel>
      </div>
    </section>
  );
}
