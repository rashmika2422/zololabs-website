"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { solutions } from "@/data/solutions";

/**
 * Scoped to /solutions/* via src/app/solutions/layout.tsx so the homepage
 * markup stays byte-for-byte unchanged. Uses real routes rather than the
 * homepage's in-page hash links, which do not exist on these pages.
 */
export function SolutionsNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-blue-400/15 bg-[#081426]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[420px] bg-gradient-to-r from-blue-300/25 via-cyan-300/10 to-transparent"
      />

      <nav
        aria-label="Solutions"
        className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-6 py-5"
      >
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/branding/logo01.png"
            alt="ZoloLabs"
            width={180}
            height={50}
            priority
            className="h-auto w-40"
          />
        </Link>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <li>
            <Link
              href="/solutions"
              aria-current={pathname === "/solutions" ? "page" : undefined}
              className="text-sm text-slate-200 transition hover:text-cyan-300"
            >
              All solutions
            </Link>
          </li>
          {solutions.map((solution) => (
            <li key={solution.slug}>
              <Link
                href={`/solutions/${solution.slug}`}
                aria-current={
                  pathname === `/solutions/${solution.slug}` ? "page" : undefined
                }
                className="text-sm text-slate-200 transition hover:text-cyan-300"
              >
                {solution.title}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="shrink-0 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Book a discovery session
        </Link>
      </nav>
    </header>
  );
}
