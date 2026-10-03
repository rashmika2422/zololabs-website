"use client";

import { useMotionTemplate, useMotionValue, useSpring, motion } from "motion/react";
import type { ReactNode } from "react";
import { useMotionPreference } from "./useMotionPreference";
import { cx } from "./Section";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Renders the hover treatment used by clickable cards. */
  interactive?: boolean;
};

/** The single panel style used across every page. */
export function Card({ children, className, interactive = false }: CardProps) {
  const reduced = useMotionPreference();
  const tiltX = useMotionValue(0), tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 24 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(8, 102, 237, 0.16), transparent 80%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    tiltX.set(-((clientY - top) / height - .5) * 4);
    tiltY.set(((clientX - left) / width - .5) * 4);
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 900 }}
      onMouseLeave={() => { tiltX.set(0); tiltY.set(0); }}
      onMouseMove={interactive ? handleMouseMove : undefined}
      className={cx(
        "group panel relative overflow-hidden rounded-2xl border border-line bg-surface/70 p-6 sm:p-7",
        interactive &&
          "panel-interactive hover:border-accent/40 hover:bg-raised",
        className,
      )}
    >
      {interactive && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: spotlight,
          }}
        />
      )}
      <div className="relative z-10 flex h-full flex-1 flex-col">{children}</div>
    </motion.div>
  );
}

type ServiceTagProps = {
  children: ReactNode;
};

/** Small label identifying the service line a build belongs to. */
export function ServiceTag({ children }: ServiceTagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-brand uppercase">
      {children}
    </span>
  );
}
