"use client";

import { useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { processSteps } from "@/data/site";

const PROCESS_MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

function subscribeProcessMotion(callback: () => void) {
  const media = window.matchMedia(PROCESS_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function useProcessStoryMotion() {
  return useSyncExternalStore(
    subscribeProcessMotion,
    () => window.matchMedia(PROCESS_MOTION_QUERY).matches,
    () => false,
  );
}

function ProcessProgress({
  target,
  onActiveChange,
}: {
  target: RefObject<HTMLOListElement | null>;
  onActiveChange: (index: number) => void;
}) {
  const current = useRef(-1);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 62%", "end 62%"],
  });

  useMotionValueEvent(scrollYProgress, "change", progress => {
    const index = Math.min(processSteps.length - 1, Math.floor(progress * (processSteps.length - 1) + 0.35));
    if (index !== current.current) {
      current.current = index;
      onActiveChange(index);
    }
  });

  return <motion.span className="process-story-progress" style={{ scaleY: scrollYProgress }} />;
}

export function ProcessStory() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const motionEnabled = useProcessStoryMotion();

  return (
    <div className="process-story" data-story-motion={motionEnabled}>
      <div className="process-story-track" aria-hidden="true">
        {motionEnabled && <ProcessProgress target={list} onActiveChange={setActive} />}
      </div>
      <ol ref={list} className="process-story-list">
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            className="process-story-step"
            data-state={!motionEnabled ? "complete" : index < active ? "complete" : index === active ? "current" : "upcoming"}
          >
            <span className="process-story-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="process-story-content" data-reveal="fade-up">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
