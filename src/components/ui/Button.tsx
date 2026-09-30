import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "./Section";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "quiet"
  | "inverted"
  | "outlineLight";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-200";

/**
 * Each variant owns its own colour utilities in full. Variants are never mixed
 * with extra colour overrides, which keeps Tailwind from resolving two
 * conflicting utilities unpredictably.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent px-6 py-3 text-ink hover:bg-cyan-300",
  secondary:
    "border border-line bg-white/5 px-6 py-3 text-white hover:border-accent/50 hover:bg-white/10",
  quiet: "px-1 py-1 text-accent hover:text-cyan-300",
  inverted: "bg-white px-6 py-3 text-ink hover:bg-cyan-50",
  outlineLight:
    "border border-white/30 px-6 py-3 text-white hover:border-white/60 hover:bg-white/10",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  className?: string,
): string {
  return cx(BASE, VARIANTS[variant], className);
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
