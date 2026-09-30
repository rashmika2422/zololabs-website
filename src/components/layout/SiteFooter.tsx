import Link from "next/link";
import { industries } from "@/data/industries";
import { navLinks, siteName } from "@/data/site";

const industryLinks = industries.map((industry) => ({
  href: `/solutions#${industry.slug}`,
  label: industry.title,
}));

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-base font-semibold text-white">{siteName}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Custom software, AI automation, web applications and SaaS platforms,
            engineered for the way your business already runs.
          </p>
        </div>

        <nav aria-label="Industries">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
            Solutions
          </p>
          <ul className="mt-4 space-y-2">
            {industryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-300 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-300 transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p>Discovery before code. Documentation before handover.</p>
        </div>
      </div>
    </footer>
  );
}
