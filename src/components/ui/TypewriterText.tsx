"use client";

import { useEffect, useState } from "react";
import { useMotionPreference } from "./useMotionPreference";

export function TypewriterText({ text }: { text: string }) {
  const reducedMotion = useMotionPreference();
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (reducedMotion) return;
    const letters = Array.from(text);
    let count = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (document.hidden) {
        timer = setTimeout(tick, 500);
        return;
      }
      count += deleting ? -1 : 1;
      setVisibleText(letters.slice(0, count).join(""));
      let delay = deleting ? 35 : 85;
      if (count === letters.length) {
        deleting = true;
        delay = 3000;
      } else if (count === 0) {
        deleting = false;
        delay = 700;
      }
      timer = setTimeout(tick, delay);
    }
    timer = setTimeout(tick, 750);
    return () => clearTimeout(timer);
  }, [text, reducedMotion]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="typewriter-text">
        {/* Reserve the final text's width and line breaks to prevent layout shifts. */}
        <span className="typewriter-measure">{text}</span>
        <span className="typewriter-letters hero-heading-gradient">
          {reducedMotion ? text : visibleText}
          {!reducedMotion && <span className="typewriter-cursor" />}
        </span>
      </span>
    </>
  );
}
