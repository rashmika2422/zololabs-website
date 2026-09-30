import type { ReactNode } from "react";
import { cx } from "./Section";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Renders the hover treatment used by clickable cards. */
  interactive?: boolean;
};

/** The single panel style used across every page. */
export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-line bg-surface/70 p-6 sm:p-7",
        interactive &&
          "transition-colors duration-300 hover:border-accent/40 hover:bg-raised",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ServiceTagProps = {
  children: ReactNode;
};

/** Small label identifying the service line a build belongs to. */
export function ServiceTag({ children }: ServiceTagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-accent uppercase">
      {children}
    </span>
  );
}
