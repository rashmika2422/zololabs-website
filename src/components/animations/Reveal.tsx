import { createElement, type HTMLAttributes } from "react";

export type RevealVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "image-mask";
type RevealTag = "div" | "section" | "article" | "p" | "span" | "h1" | "h2" | "h3" | "li" | "ul" | "ol" | "dl";

export type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealTag;
  variant?: RevealVariant;
  /** Milliseconds. */
  delay?: number;
  duration?: number;
  eager?: boolean;
};

/** Server-rendered markers share the observer in SiteExperience. */
export function Reveal({ children, as = "div", variant = "fade-up", delay = 0, duration,
  eager = false, ...props }: RevealProps) {
  return createElement(as, {
    ...props,
    "data-reveal": variant,
    "data-reveal-delay": delay,
    "data-reveal-duration": duration,
    "data-reveal-eager": eager || undefined,
  }, children);
}
