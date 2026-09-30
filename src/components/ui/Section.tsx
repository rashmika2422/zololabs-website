import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Page section with a consistent vertical rhythm and anchor offset. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cx("scroll-mt-10", className)}>
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  /** Anchor id applied to the heading so sections stay addressable. */
  id?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <header className={cx(isCentered && "text-center", className)}>
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cx(
          "mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl",
          isCentered && "mx-auto max-w-3xl",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cx(
            "mt-4 max-w-2xl text-base leading-7 text-slate-400",
            isCentered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

/** Joins conditional class names without pulling in a dependency. */
export function cx(...values: (string | false | null | undefined)[]): string {
  return values.filter(Boolean).join(" ");
}
