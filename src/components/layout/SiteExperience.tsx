"use client";

import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import "@/components/animations/animations.css";
import "@/components/ui/mobile-carousel.css";

/** Keeps page content server-rendered while sharing motion behavior. */
export function SiteExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)");
    const targets = new Set<HTMLElement>();
    const entered = new Set<HTMLElement>();
    const effects = new Map<HTMLElement, Set<HTMLElement>>();
    const visibleEffects = new Set<HTMLElement>();
    const pointerCleanup: (() => void)[] = [];
    let scrollFrame = 0;

    function reveal(element: HTMLElement, animate = true) {
      element.classList.remove("reveal-pending");
      if (animate && !preference.matches) element.classList.add("reveal-entered");
      else element.classList.remove("reveal-entered");
      entered.add(element);
      observer.unobserve(element);
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement, entry.boundingClientRect.top >= 0);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

    const motionEnabled = () => !preference.matches && !document.hidden;
    const continuousEnabled = () => desktop.matches && motionEnabled();
    const effectEnabled = (element: HTMLElement) => continuousEnabled()
      || (motionEnabled() && element.dataset.motionMobile === "true");

    function updateParallax() {
      scrollFrame = 0;
      if (!motionEnabled()) return;
      for (const element of visibleEffects) {
        if (element.dataset.parallax === undefined) continue;
        const bounds = element.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1,
          (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / ((window.innerHeight + bounds.height) / 2)));
        const amount = Math.min(Number(element.dataset.parallax) || 0, 24) * (desktop.matches ? 1 : .4);
        element.style.setProperty("--parallax-y", `${(progress * -amount).toFixed(2)}px`);
      }
    }

    function scheduleParallax() {
      if (!scrollFrame && motionEnabled() && visibleEffects.size) {
        scrollFrame = window.requestAnimationFrame(updateParallax);
      }
    }

    const visibilityObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        for (const element of effects.get(entry.target as HTMLElement) ?? []) {
          const visible = entry.isIntersecting && effectEnabled(element);
          element.dataset.motionVisible = String(visible);
          if (visible) visibleEffects.add(element);
          else visibleEffects.delete(element);
        }
      }
      scheduleParallax();
    });

    function arm(element: HTMLElement) {
      if (entered.has(element)) return;
      if (preference.matches) { reveal(element, false); return; }
      const group = element.closest<HTMLElement>("[data-stagger]");
      const groupItems = group ? Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]"))
        .filter((item) => item.closest("[data-stagger]") === group) : [];
      const item = element.closest("li");
      const siblings = item?.parentElement?.children;
      const index = group ? groupItems.indexOf(element) : element.dataset.revealOrder !== undefined
        ? Number(element.dataset.revealOrder) : siblings && item ? Array.from(siblings).indexOf(item) : 0;
      const delay = Number(element.dataset.revealDelay) || 0;
      const stagger = group ? (Number(group.dataset.stagger) || 0) : 65;
      const groupDelay = Number(group?.dataset.staggerDelay) || 0;
      element.style.setProperty("--reveal-delay", `${Math.max(0, Math.min(delay + groupDelay + Math.max(0, index) * stagger, 600))}ms`);
      if (element.dataset.revealDuration) {
        element.style.setProperty("--reveal-duration", `${Math.max(150, Math.min(Number(element.dataset.revealDuration) || 720, 1200))}ms`);
      }
      const bounds = element.getBoundingClientRect();
      // Already-visible content never waits for an observer or becomes concealed.
      if (bounds.top < 0) reveal(element, false);
      else if (bounds.top < window.innerHeight && bounds.left < window.innerWidth && bounds.right > 0) reveal(element);
      else {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    }

    function registerEffect(element: HTMLElement) {
      const owner = element.dataset.pointerGlow !== undefined ? element.parentElement : element;
      if (!owner) return;
      const members = effects.get(owner) ?? new Set<HTMLElement>();
      if (members.has(element)) return;
      members.add(element);
      effects.set(owner, members);
      visibilityObserver.observe(owner);

      if (element.dataset.pointerGlow === undefined) return;
      let pointerFrame = 0;
      let pointerX = 0;
      let pointerY = 0;
      const move = (event: PointerEvent) => {
        if (!continuousEnabled() || !visibleEffects.has(element) || event.pointerType !== "mouse") return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (pointerFrame) return;
        pointerFrame = window.requestAnimationFrame(() => {
          pointerFrame = 0;
          if (!continuousEnabled() || !visibleEffects.has(element)) return;
          const bounds = owner.getBoundingClientRect();
          const range = Math.min(Number(element.dataset.pointerGlow) || 0, 16);
          const x = Math.max(-1, Math.min(1, (pointerX - bounds.left) / bounds.width * 2 - 1));
          const y = Math.max(-1, Math.min(1, (pointerY - bounds.top) / bounds.height * 2 - 1));
          element.style.setProperty("--pointer-x", `${(x * range).toFixed(2)}px`);
          element.style.setProperty("--pointer-y", `${(y * range).toFixed(2)}px`);
        });
      };
      const reset = () => {
        window.cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        element.style.removeProperty("--pointer-x");
        element.style.removeProperty("--pointer-y");
      };
      owner.addEventListener("pointermove", move, { passive: true });
      owner.addEventListener("pointerleave", reset);
      pointerCleanup.push(() => {
        reset();
        owner.removeEventListener("pointermove", move);
        owner.removeEventListener("pointerleave", reset);
      });
    }

    function scan() {
      for (const element of container!.querySelectorAll<HTMLElement>("main [data-reveal]")) {
        if (targets.has(element) || element.closest("[data-motion-group]")) continue;
        targets.add(element);
        arm(element);
      }
      for (const element of container!.querySelectorAll<HTMLElement>("[data-parallax], [data-pointer-glow]")) {
        registerEffect(element);
      }
    }

    function configure() {
      observer.disconnect();
      for (const element of targets) {
        if (preference.matches) {
          element.classList.remove("reveal-pending", "reveal-entered");
          reveal(element, false);
        } else arm(element);
      }
      visibilityObserver.disconnect();
      visibleEffects.clear();
      for (const [owner, members] of effects) {
        for (const element of members) {
          element.dataset.motionVisible = "false";
          if (!continuousEnabled()) {
            element.style.removeProperty("--parallax-y");
            element.style.removeProperty("--pointer-x");
            element.style.removeProperty("--pointer-y");
          }
        }
        if (Array.from(members).some(effectEnabled)) visibilityObserver.observe(owner);
      }
    }

    const focus = (event: FocusEvent) => {
      let element = (event.target as HTMLElement).closest<HTMLElement>(".reveal-pending, .reveal-entered");
      while (element && container!.contains(element)) {
        reveal(element, false);
        element = element.parentElement?.closest<HTMLElement>(".reveal-pending, .reveal-entered") ?? null;
      }
    };
    const finish = (event: AnimationEvent) => {
      const element = event.target;
      if (element instanceof HTMLElement && targets.has(element) && event.animationName.startsWith("reveal-")) {
        element.classList.remove("reveal-entered");
      }
    };
    // Include content arriving through navigation or a form-state update.
    const mutations = new MutationObserver(scan);
    scan();
    mutations.observe(container, { childList: true, subtree: true });
    preference.addEventListener("change", configure);
    desktop.addEventListener("change", configure);
    document.addEventListener("visibilitychange", configure);
    container.addEventListener("focusin", focus);
    container.addEventListener("animationend", finish);
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax, { passive: true });
    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
      mutations.disconnect();
      window.cancelAnimationFrame(scrollFrame);
      preference.removeEventListener("change", configure);
      desktop.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", configure);
      container.removeEventListener("focusin", focus);
      container.removeEventListener("animationend", finish);
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      pointerCleanup.forEach((cleanup) => cleanup());
      targets.forEach((element) => element.classList.remove("reveal-pending", "reveal-entered"));
      effects.forEach((members) => members.forEach((element) => {
        element.dataset.motionVisible = "false";
        element.style.removeProperty("--parallax-y");
      }));
    };
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
    <div ref={root} className="site-shell">
      {children}
    </div>
    </MotionConfig>
  );
}
