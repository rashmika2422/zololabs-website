import Link from "next/link";
import { getSolutionIndex } from "@/data/solutions";
import type { SolutionDetail } from "@/data/solutions";
import { ArrowRightIcon } from "./icons";

type SolutionCardProps = {
  solution: SolutionDetail;
  painPoint?: string;
};

export function SolutionCard({ solution, painPoint }: SolutionCardProps) {
  const index = getSolutionIndex(solution.slug);
  const label = index >= 0 ? String(index + 1).padStart(2, "0") : "00";
  const keyPainPoint = painPoint ?? solution.industryProblems[0]?.title;
  const keyFix = solution.customSolutions[0]?.title;

  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/80"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">
          {label}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {solution.eyebrow}
        </span>
      </div>
      <h3 className="mt-8 text-2xl font-bold tracking-tight text-white">
        {solution.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
        {solution.heroDescription}
      </p>
      {keyPainPoint ? (
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Key pain point solved
          </p>
          <p className="mt-2 text-sm font-medium text-slate-200">
            {keyPainPoint}
          </p>
          {keyFix ? (
            <p className="mt-1 text-xs leading-5 text-cyan-400">
              Resolved with {keyFix.toLowerCase()}
            </p>
          ) : null}
        </div>
      ) : null}
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
        Explore {solution.title}
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
