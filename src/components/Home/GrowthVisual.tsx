"use client";

import { useMotionPreference } from "@/components/ui/useMotionPreference";

import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

/** A visual explanation of a connected business, rather than customer metrics. */
export function GrowthVisual() {
  const reduced = useMotionPreference();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(tiltY, { stiffness: 160, damping: 24 });

  return (
    <motion.div
      style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY, transformPerspective: 1100 }}
      onPointerMove={(event) => {
        if (reduced !== false || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        tiltX.set(-((event.clientY - bounds.top) / bounds.height - .5) * 6);
        tiltY.set(((event.clientX - bounds.left) / bounds.width - .5) * 6);
      }}
      onPointerLeave={() => { tiltX.set(0); tiltY.set(0); }}
       className="growth-visual relative mx-auto w-full max-w-lg lg:mx-0" aria-label="Connect your tools, automate routine work, and scale your business">
      <div className="growth-visual-heading flex items-center justify-between gap-4">
        <span className="text-xs font-semibold tracking-[.16em] text-brand uppercase">Your next chapter</span>
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-brand">Built around you</span>
      </div>
      <div className="growth-map relative flex items-center justify-center py-12">
        <div aria-hidden="true" className="growth-orbit" />
        <div className="growth-brand relative flex h-28 w-28 items-center justify-center">
          <Image src="/branding/logos/zololabs-mark.png" alt="ZoloLabs" width={130} height={139} sizes="88px" className="h-22 w-auto" />
        </div>
        <span className="growth-chip growth-chip-top">AI & automation</span>
        <span className="growth-chip growth-chip-bottom">Custom software</span>
      </div>
      <h2 className="text-center text-2xl font-semibold tracking-tight text-heading">A smarter way to grow.</h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted">Less busywork. Better experiences. More possibilities.</p>
      <ol className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
        {[['01', 'Connect', 'Bring your tools together'], ['02', 'Automate', 'Give your team time back'], ['03', 'Scale', 'Build for what comes next']].map(([number, title, description]) => (
          <li key={title} className="growth-step rounded-2xl border border-line bg-surface/90 p-3 sm:p-4">
            <span className="text-xs font-semibold text-brand">{number}</span>
            <h3 className="mt-2 text-sm font-semibold text-heading">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-muted">{description}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center justify-between gap-2 border-t border-line pt-4 text-xs font-medium text-muted">
        <span className="inline-flex items-center gap-2"><CheckIcon className="h-3.5 w-3.5 text-brand" />Your business. Your workflow.</span>
        <ArrowRightIcon aria-hidden="true" className="h-4 w-4 text-brand" />
      </div>
    </motion.div>
  );
}
