import type { ReactNode } from "react";

type SolutionsHeroProps = {
  eyebrow: string;
  headlineStart: string;
  highlight?: string;
  headlineEnd?: string;
  description: string;
  aside?: ReactNode;
};

export function SolutionsHero({
  eyebrow,
  headlineStart,
  highlight,
  headlineEnd,
  description,
  aside,
}: SolutionsHeroProps) {
  return (
    <header className="relative isolate overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 px-6 py-12 sm:px-10 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-16 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        className={
          aside
            ? "relative grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end"
            : "relative"
        }
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {headlineStart}
            {highlight ? (
              <span className="text-cyan-400">{highlight}</span>
            ) : null}
            {headlineEnd}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            {description}
          </p>
        </div>
        {aside ? <div className="lg:pb-2">{aside}</div> : null}
      </div>
    </header>
  );
}
