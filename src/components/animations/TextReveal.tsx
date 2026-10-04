import { createElement, type HTMLAttributes } from "react";

type TextRevealProps = HTMLAttributes<HTMLElement> & {
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
  delay?: number;
  eager?: boolean;
};

/** Mask one natural text line; separate instances provide a restrained sequence. */
export function TextReveal({ children, as = "span", className = "", delay = 0,
  eager = false, ...props }: TextRevealProps) {
  return createElement(as, { ...props, className: `text-reveal-mask ${className}` },
    <span className="text-reveal-line" data-reveal="text-mask" data-reveal-delay={delay}
      data-reveal-eager={eager || undefined}>{children}</span>);
}
