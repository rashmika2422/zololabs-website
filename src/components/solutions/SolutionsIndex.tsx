import { solutions } from "@/data/solutions";
import { PainPointGrid } from "./PainPointGrid";
import type { PainPoint } from "./PainPointGrid";
import { SolutionCard } from "./SolutionCard";
import { SolutionCTA } from "./SolutionCTA";
import { SolutionsHero } from "./SolutionsHero";

const signals: [string, string][] = [
  ["04", "Industries served"],
  ["Bespoke", "Built to your process"],
  ["One stack", "Data through to interface"],
  ["Handover", "Your team owns it"],
];

const smeBottlenecks: PainPoint[] = [
  {
    title: "Disconnected Systems",
    description:
      "POS, accounts, stock, and the website each keep their own version of the truth, so nobody can answer a simple question without exporting three reports.",
  },
  {
    title: "Manual Re-entry",
    description:
      "The same order, invoice, or job sheet is typed into a second and third system by hand, and every retype is a fresh chance to get the numbers wrong.",
  },
  {
    title: "High Enterprise Software Costs",
    description:
      "Enterprise suites are priced and scoped for companies ten times your size, while the tools you can afford cannot model how you actually operate.",
  },
];

export function SolutionsIndex() {
  return (
    <div className="relative min-h-full overflow-hidden bg-[#050814] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.14),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 py-16 sm:px-8 sm:py-24">
        <SolutionsHero
          eyebrow="Solutions"
          headlineStart="Built for the industries "
          highlight="we work in"
          headlineEnd="."
          description="Retail, hospitality, education, and general SMEs. Every engagement starts from the constraints of the industry — not a template — and ends with systems your team runs itself."
        />

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 sm:grid-cols-4">
          {signals.map(([value, label]) => (
            <div key={label} className="bg-[#050814] px-5 py-5">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {label}
              </dt>
              <dd className="mt-2 text-lg font-semibold tracking-tight text-white">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-16">
          <PainPointGrid
            id="sme-bottlenecks"
            eyebrow="Common bottlenecks"
            headline="Where SME systems stall"
            painPoints={smeBottlenecks}
          />
        </div>

        <section aria-labelledby="industries" className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Choose your industry
          </p>
          <h2
            id="industries"
            className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
          >
            Choose the problem. We bring the system.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {solutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </div>
        </section>

        <div className="mt-16">
          <SolutionCTA
            headline="Start with the constraint, not the technology."
            description="Every engagement begins with the decision the system has to support, the data that already exists, and the failure that would actually hurt. From there we scope a first slice your team can ship and extend."
          />
        </div>
      </div>
    </div>
  );
}
