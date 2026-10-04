"use client";

import { Children, createElement, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

type MobileCarouselProps = {
  as?: "div" | "ol" | "ul";
  children: ReactNode;
  className?: string;
  label: string;
  stagger?: number;
  trackRef?: RefObject<HTMLElement | null>;
  onActiveChange?: (index: number) => void;
};

export function MobileCarousel({
  as = "div",
  children,
  className = "",
  label,
  stagger,
  trackRef,
  onActiveChange,
}: MobileCarouselProps) {
  const internalTrack = useRef<HTMLElement>(null);
  const track = trackRef ?? internalTrack;
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const element = track.current;
    if (!element || count < 2) return;

    let frame = 0;
    const updateActive = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(element.children) as HTMLElement[];
        const padding = Number.parseFloat(getComputedStyle(element).scrollPaddingLeft) || 0;
        const snapPoint = element.getBoundingClientRect().left + padding;
        let nextActive = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          const distance = Math.abs(slide.getBoundingClientRect().left - snapPoint);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nextActive = index;
          }
        });

        slides.forEach((slide, index) => {
          slide.dataset.carouselActive = String(index === nextActive);
        });
        setActive(nextActive);
        onActiveChange?.(nextActive);
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

  return (
    <div className="mobile-carousel" role="region" aria-roledescription="carousel" aria-label={label}>
      {createElement(as, {
        ref: track,
        className: `mobile-carousel-track ${className}`.trim(),
        "data-stagger": stagger,
      }, children)}
      {count > 1 ? (
        <div className="mobile-carousel-pagination" aria-label={`${label} slides`}>
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