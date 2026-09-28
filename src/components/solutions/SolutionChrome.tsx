import Link from "next/link";
import type { SolutionDetail as SolutionData } from "@/data/solutions";
import { groupByServiceType } from "./SolutionFeatureList";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

export function Breadcrumb({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition hover:text-cyan-400">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-600">
          /
        </li>
        <li>
          <Link href="/solutions" className="transition hover:text-cyan-400">
            Solutions
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-600">
          /
        </li>
        <li className="text-slate-200">{title}</li>
      </ol>
    </nav>
  );
}

export function HeroAside({ solution }: { solution: SolutionData }) {
  const groups = groupByServiceType(solution.customSolutions);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Service lines
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {groups.map((group) => (
          <li
            key={group.serviceType}
            className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400"
          >
            {group.serviceType}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-6 text-slate-400">
        {solution.industryProblems.length} bottlenecks and{" "}
        {solution.customSolutions.length} ways ZoloLabs has answered them.
      </p>
    </div>
  );
}

export function AdjacentNav({
  previous,
  next,
}: {
  previous?: SolutionData;
  next?: SolutionData;
}) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Other industries"
      className="grid gap-4 border-t border-slate-800 pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={`/solutions/${previous.slug}`}
          className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/80"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Previous
          </span>
          <span className="mt-3 block text-lg font-semibold tracking-tight text-white">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <Link
          href={`/solutions/${next.slug}`}
          className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-left transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/80 sm:text-right"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Next
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="mt-3 block text-lg font-semibold tracking-tight text-white">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
