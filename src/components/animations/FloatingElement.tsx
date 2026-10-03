"use client";
import { useAnimate, useInView } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useMotionPreference } from "@/components/ui/useMotionPreference";

/** Keep server content visible, then enhance it with a single entrance. */
export function FloatingElement({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const visible = useInView(scope, { once: true, amount: .15 });
  const reduced = useMotionPreference();
  useEffect(() => {
    if (!visible || reduced) return;
    const element = scope.current;
    const controls = animate(element, { opacity: [0, 1], scale: [.9, 1], rotate: [4, 0], x: [50, 0] }, { duration: .8, delay, type: "spring", bounce: .12 });
    return () => { controls.stop(); element.style.removeProperty("transform"); element.style.removeProperty("opacity"); };
  }, [visible, reduced, animate, scope, delay]);
  return <div ref={scope} className={className}>{children}</div>;
}
