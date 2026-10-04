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
            <Reveal as="p" className="eyebrow">Featured work</Reveal>
            <h2 id="work-title" className="section-heading">
              <TextReveal>Real problems.</TextReveal>{" "}
              <TextReveal delay={100}>Working solutions.</TextReveal>
            </h2>
          </div>
          <Reveal delay={140}><Link href="/work" className="text-link">Explore Our Work<ArrowRightIcon /></Link></Reveal>
        </div>
        <MobileCarousel className="selected-work-carousel" label="Selected work">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured eager={index === 0} />)}
        </MobileCarousel>
      </div>
    </section>
  );
}
