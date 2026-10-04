import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <header className={`page-header ${className}`}>
      <div className="container">
        <Reveal as="p" className="eyebrow" duration={550} eager>{eyebrow}</Reveal>
        <h1 className="page-title"><TextReveal delay={65} eager>{title}</TextReveal></h1>
        <Reveal as="p" className="page-lede" delay={150} duration={650} eager>{description}</Reveal>
        {children ? <Reveal className="page-header-actions" delay={220} eager>{children}</Reveal> : null}
      </div>
    </header>
  );
}
