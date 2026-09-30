import type { Metadata } from "next";
import { IndustryNav } from "@/components/solutions/IndustryNav";
import { IndustrySection } from "@/components/solutions/IndustrySection";
import { ButtonLink } from "@/components/ui/Button";
import { ContactCTA } from "@/components/ui/ContactCTA";
import { ArrowRightIcon } from "@/components/ui/icons";
import { industries, serviceTypes } from "@/data/industries";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Custom software, AI automation, web applications and SaaS platforms for retail, hospitality, education and growing SMEs — scoped to your process and priced for an SME budget.",
  alternates: { canonical: "/solutions" },
};

/**
 * One page, four anchorable industries. This replaces the previous
 * /solutions/[slug] route set (four near-identical pages) with a single
 * document that is easier to scan and cheaper to load.
 */
export default function SolutionsPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="glow-top pointer-events-none absolute inset-x-0 top-0 h-[28rem]"
        />

        <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-12 sm:pt-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Solutions
          </p>

          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl">
            Software engineered to fit{" "}
            <span className="text-accent">your industry</span>, not the other
            way around.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Off-the-shelf platforms arrive bloated, priced per seat for companies
            far bigger than yours, and shaped around a process you do not run. We
            build the opposite: focused software mapped to how your business
            already works, scoped to an SME budget, and released in stages.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact">
              Book a discovery session
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <span className="text-sm text-slate-400">
              Four practice areas, or ask the assistant anything.
            </span>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {serviceTypes.map((serviceType) => (
              <li
                key={serviceType}
                className="rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase"
              >
                {serviceType}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <IndustryNav />

      <div className="mx-auto w-full max-w-6xl space-y-16 px-6 py-14">
        {industries.map((industry, index) => (
          <IndustrySection
            key={industry.slug}
            industry={industry}
            index={index}
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-20">
        <ContactCTA
          headline="Tell us which bottleneck costs you the most."
          description="Bring the process your current tools cannot handle. We will map the current state, name the constraint, and scope the first slice we can ship for your team."
          secondaryLabel="Back to services"
          secondaryHref="/#services"
        />
      </div>
    </>
  );
}

