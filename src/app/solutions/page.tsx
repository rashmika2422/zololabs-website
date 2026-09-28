import type { Metadata } from "next";
import { SolutionCard } from "@/components/solutions/SolutionCard";
import { SolutionCTA } from "@/components/solutions/SolutionCTA";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions · ZoloLabs",
  description:
    "Custom software, AI automation, web applications, and SaaS platforms engineered for retail, hospitality, education, and growing SMEs — scoped to your process and priced for an SME budget.",
};

const HERO_EYEBROW = "ENGINEERED FOR SMALL & MEDIUM ENTERPRISES";
const HERO_HEADLINE_START = "Software engineered to fit your ";
const HERO_HIGHLIGHT = "industry";
const HERO_HEADLINE_END = ", not the other way around.";
const HERO_DESCRIPTION =
  "Off-the-shelf platforms arrive bloated with features you will never switch on, priced per seat for companies far bigger than yours, and shaped around a process that is not the one you run. ZoloLabs builds the opposite: focused software mapped to how your business already works, scoped to an SME budget, and released in stages so it scales with you instead of ahead of you.";

const CTA_HEADLINE = "Tell us where off-the-shelf stops fitting.";
const CTA_DESCRIPTION =
  "Bring us the workflow your current tools cannot handle. We will map the process, scope the build, and show you what it costs before a line of code is written.";

export default function SolutionsPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050814] px-6 py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.16),transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <SolutionsHero
          eyebrow={HERO_EYEBROW}
          headlineStart={HERO_HEADLINE_START}
          highlight={HERO_HIGHLIGHT}
          headlineEnd={HERO_HEADLINE_END}
          description={HERO_DESCRIPTION}
        />
      </div>

      <section
        aria-label="Industries we engineer for"
        className="relative mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"
      >
        {solutions.map((solution) => (
          <SolutionCard key={solution.slug} solution={solution} />
        ))}
      </section>

      <div className="relative mx-auto mt-16 w-full max-w-6xl">
        <SolutionCTA
          id="solutions-cta"
          variant="gradient"
          headline={CTA_HEADLINE}
          description={CTA_DESCRIPTION}
        />
      </div>
    </main>
  );
}
