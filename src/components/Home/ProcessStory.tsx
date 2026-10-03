"use client";
import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useMotionPreference } from "@/components/ui/useMotionPreference";
const steps = [
  { title: "Idea", copy: "We map your workflow and find the real bottleneck. Discovery comes before code." },
  { title: "Design", copy: "We agree the experience, scope, price, and delivery plan in writing." },
  { title: "Build", copy: "We deliver in stages, with room for your team to review and shape the product." },
  { title: "Launch", copy: "We document, train, and hand over. You own the system and your data." },
];
export function ProcessStory({ visual }: { visual: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", value => setActive(Math.min(3, Math.floor(value * 4))));
  return <div ref={ref} className="process-story"><ol>{steps.map((step, index) => <li key={step.title} className="story-step" data-active={active === index}><span className="text-xs tracking-widest text-brand">0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>)}</ol><div className="story-sticky"><motion.div animate={reduced ? { rotate: 0, y: 0 } : { rotate: active * 3 - 4.5, y: active * -8, scale: .96 + active * .013, opacity: .7 + active * .1 }} transition={{ type: "spring", stiffness: 70, damping: 25 }}>{visual}</motion.div><p className="text-center text-xs tracking-[.25em] text-brand uppercase">{steps[active].title} → possibility in motion</p></div></div>;
}
