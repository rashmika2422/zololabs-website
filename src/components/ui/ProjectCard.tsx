import Link from "next/link";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import type { Project } from "@/data/projects";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProjectVisual } from "./ProjectVisual";

type ProjectCardProps = {
  project: Project;
  number: number;
  variant?: "light" | "dark";
  featured?: boolean;
  eager?: boolean;
};

export function ProjectCard({
  project,
  number,
  variant = "light",
  featured = false,
  eager = false,
}: ProjectCardProps) {
  const projectVisual = (
    <>
      <ProjectVisual project={project} eager={eager} editorial />
      <span className="project-visual-arrow" aria-hidden="true"><ArrowRightIcon /></span>
      <span className="project-image-caption" aria-hidden="true">{project.caseStudyPath ? "View Project" : "Explore Demo"} <span>↗</span></span>
    </>
  );

  return (
    <article
      className={`project-card project-card-${variant}${featured ? " project-card-featured" : ""}`}
      aria-labelledby={`project-${project.slug}-title`}
    >
      <Reveal className="project-card-label" duration={550}>
        <span className="project-number" aria-hidden="true">{String(number).padStart(2, "0")}</span>
        <span className="project-source">{project.sourceLabel}</span>
      </Reveal>
      <div className="project-card-media">
        <Parallax amount={18}>
          <Reveal variant="image-mask" delay={80} duration={950}>
            {project.caseStudyPath ? (
              <Link href={project.caseStudyPath} className="project-card-image-link" aria-label={`View the ${project.name} case study`}>
                {projectVisual}
              </Link>
            ) : project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-card-image-link" aria-label={`View the ${project.name} demo (opens in a new tab)`}>
                {projectVisual}
              </a>
            ) : (
              <div className="project-card-image-link">{projectVisual}</div>
            )}
          </Reveal>
        </Parallax>
      </div>
      <div className="project-card-content">
        <Reveal className="project-card-intro" delay={200}>
          <p className="eyebrow">{project.category}</p>
          <h3 id={`project-${project.slug}-title`}><TextReveal delay={220}>{project.name}</TextReveal></h3>
          <p className="project-card-industry">{project.industry}</p>
        </Reveal>
        <Reveal className="project-card-description" delay={280}>
          <p>{project.description}</p>
          {project.demoNote ? <p className="project-demo-note">{project.demoNote}</p> : null}
          {!featured ? (
            <dl className="project-card-details">
              <div><dt>Challenge</dt><dd>{project.challenge}</dd></div>
              <div><dt>Solution</dt><dd>{project.solution}</dd></div>
            </dl>
          ) : null}
          {project.technologies.length > 0 ? (
            <ul className="technology-list" aria-label="Project technologies">
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          ) : null}
          <Reveal className="project-card-actions" delay={260}>
            {project.caseStudyPath ? (
              <Link href={project.caseStudyPath} className={buttonClass("primary")} aria-label={`View Case Study: ${project.name}`}>
                View Case Study <ArrowRightIcon />
              </Link>
            ) : project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")} aria-label={`Explore Live Demo: ${project.name} (opens in a new tab)`}>
                Explore Live Demo <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            {project.caseStudyPath && project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")} aria-label={`Visit Live Site: ${project.name} (opens in a new tab)`}>
                Visit Live Site <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </Reveal>
        </Reveal>
      </div>
    </article>
  );
}
