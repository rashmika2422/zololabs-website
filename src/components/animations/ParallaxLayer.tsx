"use client";
import { motion, useMotionValue, useSpring, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { useMotionPreference } from "@/components/ui/useMotionPreference";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
const query = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const subscribe = (callback: () => void) => { const media = window.matchMedia(query); media.addEventListener("change", callback); return () => media.removeEventListener("change", callback); };
export function ParallaxLayer({ children, className, scroll = false, glow = false }: { children: ReactNode; className?: string; scroll?: boolean; glow?: boolean }) {
  const reduced = useMotionPreference();
  const desktop = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
  const enabled = !reduced && desktop;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0), px = useMotionValue(50), py = useMotionValue(50);
  const sx = useSpring(x, { stiffness: 70, damping: 24 });
  const sy = useSpring(y, { stiffness: 70, damping: 24 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${px}% ${py}%, rgba(50,181,255,.12), transparent 55%)`;
  return <motion.div ref={ref} className={className} style={{ x: enabled ? sx : 0, y: enabled ? (scroll ? scrollY : sy) : 0 }} onPointerMove={(event) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width, ny = (event.clientY - rect.top) / rect.height;
    x.set((nx - .5) * 24); y.set((ny - .5) * 24); px.set(nx * 100); py.set(ny * 100);
  }} onPointerLeave={() => { x.set(0); y.set(0); }}>
    {glow && enabled && <motion.div aria-hidden="true" className="pointer-glow" style={{ background: spotlight }} />}
    {children}
  </motion.div>;
}
