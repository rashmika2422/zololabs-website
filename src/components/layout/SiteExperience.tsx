"use client";

import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

/** Keeps page content server-rendered while sharing theme and motion behavior. */
export function SiteExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = root.current;
    if (!container || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Observe entrances once; content stays visible before JS or if motion is off.
    const targets = Array.from(container.querySelectorAll<HTMLElement>(
      "main header, main .panel, main .contact-cta, main [data-reveal]",
    )).filter((element) => !element.closest("[data-motion-group]"));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.classList.remove("reveal-pending");
        element.classList.add("reveal-entered");
        observer.unobserve(element);
      }
    }, { threshold: 0.08 });

    function configure() {
      observer.disconnect();
      targets.forEach((element) => {
        element.classList.remove("reveal-pending", "reveal-entered");
        if (preference.matches) return;
        const item = element.closest("li");
        const siblings = item?.parentElement?.children;
        const index = element.dataset.revealOrder !== undefined
          ? Number(element.dataset.revealOrder)
          : siblings && item ? Array.from(siblings).indexOf(item) : 0;
        element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 100}ms`);
        // Only conceal content below the viewport; deep links remain readable.
        if (element.getBoundingClientRect().top >= window.innerHeight) {
          element.classList.add("reveal-pending");
        }
        observer.observe(element);
      });
    }
    const main = container.querySelector("main");
    const entrance = !preference.matches ? main?.animate([{ opacity: .8, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, easing: "ease-out" }) : undefined;
    configure();
    preference.addEventListener("change", configure);
    return () => {
      entrance?.cancel();
      observer.disconnect();
      preference.removeEventListener("change", configure);
      targets.forEach((element) => element.classList.remove("reveal-pending", "reveal-entered"));
    };
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
    <div ref={root} data-theme="light"
      className="site-shell flex min-h-dvh flex-col bg-ink text-body">
      {pathname !== "/" && <AmbientBackground variant="light" />}
      {children}
    </div>
    </MotionConfig>
  );
}
