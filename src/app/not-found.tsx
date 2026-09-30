import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
        That page does not exist
      </h1>
      <p className="mt-4 text-base leading-7 text-slate-400">
        The link may be out of date. Start from the homepage, or jump straight to
        what we build.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/solutions" variant="secondary">
          View solutions
        </ButtonLink>
      </div>
    </div>
  );
}
