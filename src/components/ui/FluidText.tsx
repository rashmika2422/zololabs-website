"use client";

import { motion, type Variants } from "motion/react";
import { useMotionPreference } from "./useMotionPreference";

export function FluidText({ text, className = "" }: { text: string, className?: string }) {
  const reducedMotion = useMotionPreference();
  const letters = Array.from(text);

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      filter: "blur(4px)",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        style={{ display: "inline-flex", flexWrap: "wrap", overflow: "visible" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span variants={child} key={index} className={className} style={{ display: "inline-block" }}>
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.span>
    </>
  );
}
