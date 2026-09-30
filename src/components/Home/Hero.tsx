import { ButtonLink } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { proofPoints } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="glow-top pointer-events-none absolute inset-x-0 top-0 h-[32rem]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
          Software studio for growing businesses
        </p>

        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight text-balance text-white sm:text-6xl">
          We build software for{" "}
          <span className="bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-transparent">
            ideas that deserve to scale.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          ZoloLabs designs and develops modern web platforms, SaaS products,
          AI-powered solutions and custom software for ambitious businesses.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <ButtonLink href="/contact">
            Start a project
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/solutions" variant="secondary">
            See what we build
          </ButtonLink>
        </div>

        <dl className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
          {proofPoints.map((point) => (
            <div key={point.label}>
              <dt className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                {point.value}
              </dt>
              <dd className="mt-2 text-sm text-slate-300">{point.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
