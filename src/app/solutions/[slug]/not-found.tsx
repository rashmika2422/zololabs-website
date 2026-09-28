import Link from "next/link";

export default function SolutionNotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-[#050814] px-6 py-24 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
        Solution not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-slate-400">
        That practice area does not exist. Browse the solutions we do ship.
      </p>
      <Link
        href="/solutions"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-cyan-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
      >
        View solutions
      </Link>
    </div>
  );
}
