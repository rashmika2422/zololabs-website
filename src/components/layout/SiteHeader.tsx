"use client";

import { useMotionPreference } from "@/components/ui/useMotionPreference";

import { motion, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

  const header = useRef<HTMLElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });

  useEffect(() => {
    function updateScroll() {
      header.current?.setAttribute("data-scrolled", String(window.scrollY > 16));
    }
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event: KeyboardEvent) { if (event.key === "Escape") setIsOpen(false); }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header ref={header} className="site-header sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-accent to-light-blue" style={{ scaleX: reduced ? scrollYProgress : progress }} />
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6"
      >
        {/* Display the full wordmark directly on the navbar. */}
        <Link
          href="/"
          className="brand-logo flex shrink-0 items-center rounded-md py-1.5"
        >
          <Image
            src="/branding/logos/zololabs-wordmark.png"
            alt="ZoloLabs"
            width={480}
            height={139}
            sizes="(min-width: 640px) 138px, 124px"
            className="hidden h-10 w-auto sm:block"
          />
          <Image src="/branding/logos/zololabs-mark.png" alt="ZoloLabs" width={130} height={139} sizes="34px" className="h-9 w-auto sm:hidden" />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={cx(
                  "nav-link text-sm transition-colors hover:text-brand",
                  isActive(pathname, link.href) ? "text-brand" : "text-body",
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-body transition-colors hover:border-accent/50 hover:text-brand md:hidden"
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
        <div id="mobile-nav" className="mobile-menu border-t border-line bg-ink md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-2">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line/60 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={cx(
                    "block py-3.5 text-base transition-colors hover:text-brand",
                    isActive(pathname, link.href) ? "text-brand" : "text-body",
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
