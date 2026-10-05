import Image from "next/image";
import type { Project } from "@/data/projects";

type ProjectVisualProps = {
  project: Project;
  className?: string;
  eager?: boolean;
  editorial?: boolean;
};

export function ProjectVisual({ project, className = "", eager = false, editorial = false }: ProjectVisualProps) {
  return (
    <div className={`project-visual ${className}`}>
      {project.image ? (
        <div className="project-browser">
          <div className="project-browser-bar" aria-hidden="true">
            <span className="project-browser-dots"><i /><i /><i /></span>
            <span>{project.name}</span>
            <span>↗</span>
          </div>
          <div className="project-browser-screen" style={project.image.aspectRatio ? { aspectRatio: project.image.aspectRatio } : undefined}>
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              loading={eager ? "eager" : "lazy"}
              sizes={editorial
                ? "(max-width: 767px) 80vw, (max-width: 1279px) 52vw, 650px"
                : "(max-width: 767px) 85vw, (max-width: 1279px) 80vw, 1060px"}
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
