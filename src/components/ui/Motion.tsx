"use client";

import { useMotionPreference } from "@/components/ui/useMotionPreference";

import { createElement, useEffect, type ReactNode } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";

type MotionProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl";
};

/** Animate after hydration so server-rendered content is always readable. */
export function MotionGroup({ children, className, as = "div" }: MotionProps) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const inView = useInView(scope, { once: true, amount: 0.08 });
  const reduced = useMotionPreference();

  useEffect(() => {
    if (!inView || reduced !== false || !scope.current) return;
    const root = scope.current;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-enter]"))
      .filter((item) => item.closest("[data-motion-group]") === root);
    const targets = items.length ? items : [root];
    const controls = animate(targets, {
      opacity: [0, 1], y: [32, 0],
    }, { type: "spring", bounce: 0.18, duration: 0.85, delay: stagger(.1) });
    return () => {
      controls.stop();
      targets.forEach((item) => {
        item.style.removeProperty("opacity");
        item.style.removeProperty("transform");
        item.style.removeProperty("filter");
      });
    };
  }, [inView, reduced, animate, scope]);

  return createElement(as, { ref: scope, className, "data-motion-group": "" }, children);
}

const elements = { div: motion.div, li: motion.li, p: motion.p, h1: motion.h1, dl: motion.dl };

export function MotionItem({ children, className, as = "div", interactive = false, contentClassName = "h-full" }: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof elements;
  interactive?: boolean;
  contentClassName?: string;
}) {
  const reduced = useMotionPreference();
  const Element = elements[as];
  return (
    <Element className={className}
      whileHover={interactive && reduced === false ? { y: -6, scale: 1.012 } : undefined}
      whileTap={interactive && reduced === false ? { scale: .995 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}>
      {as === "p" || as === "h1"
        ? <span data-motion-enter className="block">{children}</span>
        : <div data-motion-enter className={contentClassName}>{children}</div>}
    </Element>
  );
}
