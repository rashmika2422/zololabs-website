import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PainPointGrid } from "@/components/solutions/PainPointGrid";
import { AdjacentNav, Breadcrumb, HeroAside } from "@/components/solutions/SolutionChrome";
import { SolutionCTA } from "@/components/solutions/SolutionCTA";
import { SolutionFeatureList } from "@/components/solutions/SolutionFeatureList";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import {
  getAdjacentSolutions,
  getSolution,
  solutions,
  splitHighlight,
} from "@/data/solutions";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-renders one static page per industry in src/data/solutions.ts:
 * "retail", "hospitality", "education" and "smes".
 */
export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return {
      title: "Solution not found · ZoloLabs",
    };
  }

  return {
    title: `${solution.title} Solutions · ZoloLabs`,
    description: solution.heroDescription,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  const { previous, next } = getAdjacentSolutions(solution.slug);
  const { before, match, after } = splitHighlight(
    solution.heroHeadline,
    solution.highlightWord,
  );

  return (
    <div className="relative min-h-full overflow-hidden bg-[#050814] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.16),transparent_60%)]"
      />

      <article className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
        <Breadcrumb title={solution.title} />

        {/* Hero — copy comes from src/data/solutions.ts */}
        <div className="mt-10">
          <SolutionsHero
            eyebrow={solution.eyebrow}
            headlineStart={before}
            highlight={match}
            headlineEnd={after}
            description={solution.heroDescription}
            aside={<HeroAside solution={solution} />}
          />
        </div>

        {/* Bottlenecks — the friction this industry already feels */}
        <div className="mt-16">
          <PainPointGrid
            id="industry-problems"
            eyebrow="Bottlenecks"
            headline={`Where ${solution.title} operations lose hours today`}
            painPoints={solution.industryProblems}
          />
        </div>

        {/* Architecture & deliverables — the custom software ZoloLabs builds */}
        <div className="mt-16">
          <SolutionFeatureList
            id="custom-solutions"
            eyebrow="Architecture & deliverables"
            headline={`Custom software we build for ${solution.title}`}
            offerings={solution.customSolutions}
          />
        </div>

        {/* CTA — books a discovery session */}
        <div className="mt-16">
          <SolutionCTA
            headline={solution.ctaText}
            description="Bring the process that breaks most often to a discovery session and we will map the current state, name the constraint, and scope the first slice we can ship for your team."
            primaryLabel="Book a discovery session"
            secondaryHref="/solutions"
            secondaryLabel="Compare other industries"
          />
        </div>

        <div className="mt-16">
          <AdjacentNav previous={previous} next={next} />
        </div>
      </article>
    </div>
  );
}
