import Link from "next/link";
import { industries } from "@/data/industries";

/**
 * Sits directly under the sticky header and keeps every industry one tap away,
 * which is what lets four separate detail pages collapse into one.
 */
export function IndustryNav() {
  return (
    <nav
      aria-label="Jump to an industry"
      className="sticky top-16 z-40 border-y border-line bg-ink/90 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-6 py-3">
        <span className="hidden shrink-0 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase sm:block">
          Jump to
        </span>

        <ul className="flex flex-1 items-center gap-2 overflow-x-auto">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <Link
                href={`#${industry.slug}`}
                className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm whitespace-nowrap text-slate-300 transition-colors hover:border-accent/50 hover:text-accent"
              >
                {industry.title}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden shrink-0 text-sm font-semibold text-accent transition-colors hover:text-cyan-300 sm:inline"
        >
          Book a session
        </Link>
      </div>
    </nav>
  );
}
