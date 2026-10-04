import { createElement, type HTMLAttributes } from "react";

type StaggerProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "ul" | "ol" | "dl" | "section";
  /** Milliseconds between the group's data-reveal descendants. */
  step?: number;
  delay?: number;
};

export function Stagger({ children, as = "div", step = 80, delay = 0, ...props }: StaggerProps) {
  return createElement(as, { ...props, "data-stagger": step, "data-stagger-delay": delay }, children);
}
