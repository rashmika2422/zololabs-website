import type { HTMLAttributes } from "react";

type PointerGlowProps = HTMLAttributes<HTMLSpanElement> & { range?: number };

/** Place directly inside the section whose pointer motion should shift the light. */
export function PointerGlow({ className = "", range = 12, ...props }: PointerGlowProps) {
  return <span {...props} className={`pointer-glow ${className}`} aria-hidden="true"
    data-pointer-glow={Math.min(Math.abs(range), 16)} data-motion-visible="false" />;
}
