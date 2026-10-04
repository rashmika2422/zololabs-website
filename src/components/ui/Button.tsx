import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "./Section";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "inverted" | "outlineLight";
export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cx("site-button", `button-${variant}`, className);
}
/** Links stay server rendered; restrained interactions come from CSS. */
export function ButtonLink({ href, children, variant = "primary", className }: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return <Link href={href} className={buttonClass(variant, className)}>{children}</Link>;
}
