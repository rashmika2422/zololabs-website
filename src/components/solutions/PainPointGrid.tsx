export type PainPoint = {
  title: string;
  description: string;
};

type PainPointGridProps = {
  painPoints: readonly PainPoint[];
  eyebrow?: string;
  headline?: string;
  id?: string;
};

export function PainPointGrid({
  painPoints,
  eyebrow = "What we hear",
  headline = "Problems worth solving",
  id = "pain-points",
}: PainPointGridProps) {
  if (painPoints.length === 0) {
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
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {painPoints.map((painPoint, index) => (
          <div
            key={painPoint.title}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-900/80"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
              {painPoint.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {painPoint.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
