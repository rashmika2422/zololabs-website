"use client";

import { Children, createElement, useEffect, useRef, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";

type MobileCarouselProps = {
  as?: "div" | "ol" | "ul";
  children: ReactNode;
  className?: string;
  label: string;
  stagger?: number;
  trackRef?: RefObject<HTMLElement | null>;
  onActiveChange?: (index: number) => void;
  showCounter?: boolean;
};

export function MobileCarousel({
  as = "div",
  children,
  className = "",
  label,
  stagger,
  trackRef,
  onActiveChange,
  showCounter = false,
}: MobileCarouselProps) {
  const internalTrack = useRef<HTMLElement>(null);
  const track = trackRef ?? internalTrack;
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const element = track.current;
    if (!element || count < 2) return;

    const mobile = matchMedia("(max-width: 767px)");
    let current = -1;
    let frame = 0;
    const updateActive = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(element.children) as HTMLElement[];
        if (!mobile.matches) {
          slides.forEach(slide => { delete slide.dataset.carouselActive; });
          current = -1;
          return;
        }
        const padding = Number.parseFloat(getComputedStyle(element).scrollPaddingLeft) || 0;
        const trackLeft = element.getBoundingClientRect().left;
        const maxScroll = element.scrollWidth - element.clientWidth;
        let nextActive = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          // The last slide may stop at the track's end before reaching its ideal snap point.
          const snapOffset = Math.max(0, Math.min(maxScroll,
            slide.getBoundingClientRect().left - trackLeft + element.scrollLeft - padding));
          const distance = Math.abs(element.scrollLeft - snapOffset);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nextActive = index;
          }
        });

        slides.forEach((slide, index) => {
          slide.dataset.carouselActive = String(index === nextActive);
        });
        if (current !== nextActive) {
          current = nextActive;
          setActive(nextActive);
          onActiveChange?.(nextActive);
        }
      });
    };

    element.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    const resizeObserver = new ResizeObserver(updateActive);
    resizeObserver.observe(element);
    updateActive();

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      resizeObserver.disconnect();
    };
  }, [count, onActiveChange, track]);

  const scrollToSlide = (index: number) => {
    const element = track.current;
    const slide = element?.children[index] as HTMLElement | undefined;
    if (!element || !slide) return;

    const padding = Number.parseFloat(getComputedStyle(element).scrollPaddingLeft) || 0;
    const left = slide.getBoundingClientRect().left - element.getBoundingClientRect().left + element.scrollLeft - padding;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    element.scrollTo({ left, behavior });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget || !matchMedia("(max-width: 767px)").matches) return;
    const next = event.key === "ArrowRight" ? Math.min(count - 1, active + 1)
      : event.key === "ArrowLeft" ? Math.max(0, active - 1)
      : event.key === "Home" ? 0 : event.key === "End" ? count - 1 : null;
    if (next === null) return;
    event.preventDefault();
    scrollToSlide(next);
  };

  return (
    <div className="mobile-carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      {createElement(as, {
        ref: track,
        className: `mobile-carousel-track ${className}`.trim(),
        "data-stagger": stagger,
        tabIndex: 0,
        onKeyDown: handleKeyDown,
      }, children)}
      {count > 1 ? (
        <div className="mobile-carousel-pagination" aria-label={`${label} slides`}>
          {showCounter ? <span className="mobile-carousel-counter" aria-live="polite" aria-atomic="true">
            <span className="sr-only">Item </span>{String(active + 1).padStart(2, "0")}<span aria-hidden="true"> / </span><span className="sr-only"> of </span>{String(count).padStart(2, "0")}
          </span> : null}
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              type="button"
              className="mobile-carousel-dot"
              aria-label={`Show ${label.toLowerCase()} item ${index + 1}`}
              aria-pressed={active === index}
              onClick={() => scrollToSlide(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
