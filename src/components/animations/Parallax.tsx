import { createElement, type HTMLAttributes } from "react";

type ParallaxProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "figure" | "span";
  /** Maximum travel in pixels in either direction; bounded at 24. */
  amount?: number;
};

/** Keep this outside a Reveal or another transformed visual. */
export function Parallax({ children, as = "div", className = "", amount = 20, ...props }: ParallaxProps) {
  return createElement(as, { ...props, className: `parallax-layer ${className}`,
    "data-parallax": Math.min(Math.abs(amount), 24), "data-motion-mobile": "true" }, children);
}
