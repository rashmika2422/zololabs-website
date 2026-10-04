"use client";

import { useRef, useState, useSyncExternalStore, type RefObject } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { principles } from "@/data/site";

const STORY_MOTION_QUERY = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";

function subscribeStoryMotion(callback: () => void) {
  const media = window.matchMedia(STORY_MOTION_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** Mobile and reduced-motion readers receive a static, fully visible sequence. */
export function useDesktopStoryMotion() {
  return useSyncExternalStore(
    subscribeStoryMotion,
    () => window.matchMedia(STORY_MOTION_QUERY).matches,
    () => false,
  );
}

function PrincipleProgress({
  target,
  onActiveChange,
}: {
  target: RefObject<HTMLOListElement | null>;
  onActiveChange: (index: number) => void;
}) {
  const current = useRef(-1);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 58%", "end 58%"],
  });

  useMotionValueEvent(scrollYProgress, "change", progress => {
    const index = Math.min(principles.length - 1, Math.floor(progress * principles.length));
    if (index !== current.current) {
      current.current = index;
      onActiveChange(index);
    }
  });

  return null;
}

export function PrincipleStory() {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const motionEnabled = useDesktopStoryMotion();

  return (
    <>
      {motionEnabled && <PrincipleProgress target={list} onActiveChange={setActive} />}
      <MobileCarousel as="ol" label="Why ZoloLabs principles" className="principle-story" trackRef={list} onActiveChange={setActive}>
        {principles.map((principle, index) => (
          <li
            className="principle-story-row"
            key={principle.title}
            data-active={index === active}
          >
            <div className="principle-story-content" data-reveal="fade-up">
              <span className="principle-story-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </div>
          </li>
        ))}
      </MobileCarousel>
    </>
  );
}
