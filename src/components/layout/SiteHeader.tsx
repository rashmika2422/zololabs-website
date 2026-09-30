"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { buttonClass } from "@/components/ui/Button";
import { cx } from "@/components/ui/Section";
import { navLinks } from "@/data/site";

/** Only path links get an active state; in-page anchors never do. */
function isActive(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * One header for the whole site. Replaces the previous pair of nav bars
 * (one for the homepage, one for /solutions) which drifted apart over time.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6"
      >
        {/* The wordmark is dark-on-transparent, so it sits on a light plate to
            stay legible against the ink header background. */}
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-xl bg-white px-2.5 py-1.5"
        >
          <Image
            src="/branding/logo.png"
            alt="ZoloLabs"
            width={480}
            height={139}
            sizes="120px"
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={cx(
                  "text-sm transition-colors hover:text-accent",
                  isActive(pathname, link.href) ? "text-accent" : "text-slate-300",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <Link
              href="/contact"
              className={buttonClass("primary", "px-5 py-2.5")}
            >
              Start a project
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-slate-200 transition-colors hover:border-accent/50 hover:text-accent md:hidden"
          >
            {isOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div id="mobile-nav" className="border-t border-line bg-ink md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-2">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line/60 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={cx(
                    "block py-3.5 text-base transition-colors hover:text-accent",
                    isActive(pathname, link.href) ? "text-accent" : "text-slate-200",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={buttonClass("primary", "w-full")}
              >
                Start a project
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
