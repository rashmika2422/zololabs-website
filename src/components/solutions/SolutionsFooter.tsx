import Link from "next/link";
import { solutions } from "@/data/solutions";

/** Scoped to /solutions/* via src/app/solutions/layout.tsx. */
export function SolutionsFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[#050814] px-6 py-12 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="text-sm font-semibold text-white">ZoloLabs</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Custom software, AI automation, web applications, and SaaS
            platforms engineered for the way your business already runs.
          </p>
        </div>

        <nav aria-label="Industries">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Industries
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  {solution.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Explore
          </p>
          <ul className="mt-4 grid gap-2">
            <li>
              <Link
                href="/"
                className="text-sm text-slate-300 transition hover:text-cyan-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/solutions"
                className="text-sm text-slate-300 transition hover:text-cyan-300"
              >
                All solutions
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-slate-300 transition hover:text-cyan-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
