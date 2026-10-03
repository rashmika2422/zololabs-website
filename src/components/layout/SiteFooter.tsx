import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import { navLinks, siteName } from "@/data/site";

const industryLinks = industries.map((industry) => ({
  href: `/solutions#${industry.slug}`,
  label: industry.title,
}));

export function SiteFooter() {
  return (
    <footer className="site-footer relative isolate overflow-hidden border-t border-line">
      <Image src="/branding/decorative/glass-orb.png" alt="" width={300} height={265} sizes="300px" className="footer-object pointer-events-none absolute -right-24 -bottom-24" />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="footer-logo inline-flex rounded-xl bg-white/95 p-3"><Image src="/branding/logos/zololabs-wordmark.png" alt={siteName} width={480} height={139} sizes="150px" className="h-auto w-[150px]" /></Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            Custom software, AI automation, web applications and SaaS platforms,
            engineered for the way your business already runs.
          </p>
        </div>

        <nav aria-label="Industries">
          <p className="text-xs font-semibold tracking-[0.2em] text-subtle uppercase">
            Solutions
          </p>
          <ul className="mt-4 space-y-2">
            {industryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-body transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="text-xs font-semibold tracking-[0.2em] text-subtle uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-body transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <p>Discovery before code. Documentation before handover.</p>
        </div>
      </div>
    </footer>
  );
}
