import Link from "next/link";
import { ArrowRightIcon } from "./icons";

type SolutionCTAProps = {
  headline: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  id?: string;
  variant?: "panel" | "gradient";
};

export function SolutionCTA({
  headline,
  description,
  primaryHref = "/contact",
  primaryLabel = "Talk to ZoloLabs",
  secondaryHref,
  secondaryLabel,
  id = "solution-cta",
  variant = "panel",
}: SolutionCTAProps) {
  const isGradient = variant === "gradient";

  return (
    <section
      aria-labelledby={id}
      className={
        isGradient
          ? "relative isolate overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950 to-blue-950 px-6 py-12 sm:px-12"
          : "relative isolate overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-10 sm:px-10"
      }
    >
      <div
        aria-hidden="true"
        className={
          isGradient
            ? "pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
            : "pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl"
        }
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Next step
        </p>
        <h2
          id={id}
          className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white"
        >
          {headline}
        </h2>
        {description ? (
          <p
            className={
              isGradient
                ? "mt-4 max-w-2xl text-base leading-7 text-cyan-50/80"
                : "mt-4 max-w-2xl text-base leading-7 text-slate-400"
            }
          >
            {description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={primaryHref}
            className={
              isGradient
                ? "inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-50"
                : "inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-400"
            }
          >
            {primaryLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className={
                isGradient
                  ? "inline-flex items-center rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-white/10"
                  : "inline-flex items-center rounded-lg border border-cyan-500/40 px-6 py-3 font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10"
              }
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
