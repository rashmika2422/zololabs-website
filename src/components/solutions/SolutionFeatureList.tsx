import { serviceTypes } from "@/data/solutions";
import type { CustomSolution } from "@/data/solutions";

type SolutionFeatureListProps = {
  offerings: readonly CustomSolution[];
  eyebrow?: string;
  headline?: string;
  id?: string;
};

export function groupByServiceType(offerings: readonly CustomSolution[]) {
  return serviceTypes
    .map((serviceType) => ({
      serviceType,
      items: offerings.filter(
        (offering) => offering.serviceType === serviceType,
      ),
    }))
    .filter((group) => group.items.length > 0);
}

export function SolutionFeatureList({
  offerings,
  eyebrow = "What we build",
  headline = "Custom solutions",
  id = "custom-solutions",
}: SolutionFeatureListProps) {
  const groups = groupByServiceType(offerings);

  if (groups.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby={id}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
      >
        {headline}
      </h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {groups.map((group) => (
          <div key={group.serviceType} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-400">
                {group.serviceType}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-slate-800" />
            </div>
            {group.items.map((offering) => (
              <article
                key={offering.title}
                className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/80"
              >
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {offering.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {offering.description}
                </p>
                <ul className="mt-6 grid flex-1 gap-2">
                  {offering.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400"
                      />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
