"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { processSteps } from "@/data/site";
import { useMotionPreference } from "@/components/ui/useMotionPreference";

function ProcessProgress({
  target,
  onActiveChange,
}: {
  target: RefObject<HTMLOListElement | null>;
  onActiveChange: (index: number) => void;
}) {
  const current = useRef(-1);
  const track = useRef<HTMLDivElement>(null);
  const geometry = useRef({ height: 0, points: [] as number[] });
  const lastTouch = useRef(Number.NEGATIVE_INFINITY);
  const lastPulse = useRef(Number.NEGATIVE_INFINITY);
  const lineProgress = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 55%", "end 55%"],
  });

  const update = useCallback((progress: number) => {
    const { height, points } = geometry.current;
    if (points.length < 2) return;
    const position = progress * height;
    const first = points[0];
    const last = points[points.length - 1];
    lineProgress.set(Math.max(0, Math.min(1, (position - first) / (last - first))));
    const index = points.reduce((nearest, point, candidate) =>
      Math.abs(point - position) < Math.abs(points[nearest] - position) ? candidate : nearest, 0);
    if (index !== current.current) {
      const previous = current.current;
      current.current = index;
      onActiveChange(index);
      const now = performance.now();
      // One short tick per adjacent step, only during an actual mobile touch scroll.
      if (previous >= 0 && Math.abs(index - previous) === 1
        && position >= first && position <= last
        && now - lastTouch.current < 1800 && now - lastPulse.current > 250
        && !document.hidden && navigator.userActivation?.hasBeenActive
        && matchMedia("(max-width: 767px) and (pointer: coarse)").matches
        && !matchMedia("(prefers-reduced-motion: reduce)").matches
        && typeof navigator.vibrate === "function") {
        lastPulse.current = now;
        try { navigator.vibrate(8); } catch { /* Visual feedback remains available. */ }
      }
    }
  }, [lineProgress, onActiveChange]);

  useMotionValueEvent(scrollYProgress, "change", update);

  useEffect(() => {
    const list = target.current;
    const rail = track.current;
    if (!list || !rail) return;
    const measure = () => {
      const bounds = list.getBoundingClientRect();
      const points = Array.from(list.querySelectorAll<HTMLElement>(".process-story-number"), number => {
        const marker = number.getBoundingClientRect();
        return marker.top + marker.height / 2 - bounds.top;
      });
      geometry.current = { height: bounds.height, points };
      if (points.length < 2) return;
      rail.style.top = `${list.offsetTop + points[0]}px`;
      rail.style.height = `${points[points.length - 1] - points[0]}px`;
      rail.style.bottom = "auto";
      update(scrollYProgress.get());
    };
    const touch = (event: TouchEvent) => {
      if (event.isTrusted) lastTouch.current = performance.now();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    Array.from(list.children).forEach(step => resize.observe(step));
    window.addEventListener("touchstart", touch, { passive: true });
    window.addEventListener("touchmove", touch, { passive: true });
    measure();
    return () => {
      resize.disconnect();
      window.removeEventListener("touchstart", touch);
      window.removeEventListener("touchmove", touch);
      rail.style.removeProperty("top");
      rail.style.removeProperty("height");
      rail.style.removeProperty("bottom");
    };
  }, [target, scrollYProgress, update]);

  return <div ref={track} className="process-story-track" aria-hidden="true">
    <motion.span className="process-story-progress" style={{ scaleY: lineProgress }} />
  </div>;
}

export function ProcessStory() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const motionEnabled = !useMotionPreference();

  return (
    <div className="process-story" data-story-motion={motionEnabled}>
      <div className="process-story-status" aria-hidden="true">
        <span>{motionEnabled ? <>Step <strong>{String(active + 1).padStart(2, "0")}</strong> / {String(processSteps.length).padStart(2, "0")}</> : `${String(processSteps.length).padStart(2, "0")} steps`}</span>
        <span className="process-story-status-title">{motionEnabled ? processSteps[active].title : "Idea to production"}</span>
      </div>
      {motionEnabled ? <ProcessProgress target={list} onActiveChange={setActive} />
        : <div className="process-story-track" aria-hidden="true" />}
      <ol ref={list} className="process-story-list">
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            className="process-story-step"
            data-state={!motionEnabled ? "complete" : index < active ? "complete" : index === active ? "current" : "upcoming"}
            aria-current={motionEnabled && index === active ? "step" : undefined}
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
