"use client";

import { useMotionPreference } from "@/components/ui/useMotionPreference";

import { motion, useMotionValue, useSpring } from "motion/react";
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
  "site-button relative isolate overflow-hidden inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-200";

/**
 * Each variant owns its own colour utilities in full. Variants are never mixed
 * with extra colour overrides, which keeps Tailwind from resolving two
 * conflicting utilities unpredictably.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent px-6 py-3 text-accent-ink hover:bg-accent-hover",
  secondary:
    "border border-line bg-surface px-6 py-3 text-heading hover:border-accent/50 hover:bg-raised",
  quiet: "px-1 py-1 text-brand hover:opacity-80",
  inverted: "bg-surface px-6 py-3 text-heading hover:bg-raised",
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

const MotionLink = motion.create(Link);

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  const reduced = useMotionPreference();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 24 });
  const sy = useSpring(y, { stiffness: 250, damping: 24 });
  return (
    <MotionLink
      href={href}
      className={buttonClass(variant, className)}
      style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
      onPointerMove={(event) => {
        if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - .5) * 4);
        y.set(((event.clientY - rect.top) / rect.height - .5) * 4);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
      whileTap={reduced === false ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {children}
    </MotionLink>
  );
}
