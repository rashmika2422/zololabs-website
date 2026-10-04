import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectVisualProps = {
  project: Project;
  className?: string;
  eager?: boolean;
};

export function ProjectVisual({ project, className = "", eager = false }: ProjectVisualProps) {
  return (
    <div className={`project-visual ${className}`}>
      {project.image ? (
        <div className="project-browser">
          <div className="project-browser-bar" aria-hidden="true">
            <span className="project-browser-dots"><i /><i /><i /></span>
            <span>{project.name}</span>
            <span>↗</span>
          </div>
          <div className="project-browser-screen">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              loading={eager ? "eager" : "lazy"}
              sizes="(max-width: 767px) 90vw, (max-width: 1279px) 80vw, 1060px"
              className="project-photo"
            />
          </div>
        </div>
      ) : (
        <div className="project-visual-placeholder">
          <span>{project.category}</span>
          <p>{project.name}</p>
        </div>
      )}
    </div>
  );
}
