"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { buttonClass } from "@/components/ui/Button";
import { navLinks } from "@/data/site";
import "./navigation.css";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
export function SiteHeader() {
  const pathname = usePathname();
  return <HeaderNavigation key={pathname} pathname={pathname} />;
}

function HeaderNavigation({ pathname }: { pathname: string }) {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const isOpen = openPath === pathname;
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const originalOverflow = useRef<string | null>(null);
  const inertSiblings = useRef<{ element: HTMLElement; inert: boolean }[]>([]);
  const progress = useMotionValue(0);

  const releasePage = useCallback(() => {
    if (originalOverflow.current !== null) {
      document.body.style.overflow = originalOverflow.current;
      originalOverflow.current = null;
    }
    for (const { element, inert } of inertSiblings.current) {
      if (inert) element.setAttribute("inert", "");
      else element.removeAttribute("inert");
    }
    inertSiblings.current = [];
  }, []);

  const closeMenu = useCallback((restoreFocus = false) => {
    if (!isOpen) return;
    // The exiting panel stops receiving input immediately, while its paint fades.
    menu.current?.setAttribute("inert", "");
    releasePage();
    setOpenPath(null);
    setIsClosing(true);
    if (restoreFocus) toggle.current?.focus();
  }, [isOpen, releasePage]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      header.current?.setAttribute("data-scrolled", String(window.scrollY > 24));
      const range = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0);
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = window.requestAnimationFrame(update);
    };
    update();
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [progress]);

  useEffect(() => {
    if (!isClosing) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 300;
    const timeout = window.setTimeout(() => setIsClosing(false), duration);
    return () => window.clearTimeout(timeout);
  }, [isClosing]);

  useEffect(() => {
    if (!isOpen) return;
    originalOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const siblings = header.current?.parentElement?.children ?? [];
    inertSiblings.current = Array.from(siblings)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== header.current)
      .map((element) => ({ element, inert: element.inert }));
    for (const { element } of inertSiblings.current) element.setAttribute("inert", "");
    const media = window.matchMedia("(min-width: 901px)");
    const close = () => closeMenu();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
      if (event.key !== "Tab") return;
      const links = Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
      const first = toggle.current;
      const last = links.at(-1);
      if (event.shiftKey && document.activeElement === first && last) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last && first) {
        event.preventDefault(); first.focus();
      } else if (first && document.activeElement !== first && !menu.current?.contains(document.activeElement)) {
        event.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", keyboard);
    window.addEventListener("popstate", close);
    window.addEventListener("hashchange", close);
    media.addEventListener("change", close);
    return () => {
      releasePage();
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("popstate", close);
      window.removeEventListener("hashchange", close);
      media.removeEventListener("change", close);
    };
  }, [isOpen, closeMenu, releasePage]);

  return (
    <header ref={header} className="site-header" data-menu-open={isOpen}>
      <motion.div className="page-scroll-progress" aria-hidden="true" style={{ scaleX: progress }} />
      <nav aria-label="Primary" className="container header-inner">
        <Link href="/" className="brand-logo" aria-label="ZoloLabs home" onClick={() => closeMenu()}>
          <Image src="/branding/logos/zololabs-wordmark.png" alt="ZoloLabs" width={480} height={139} sizes="148px" preload />
        </Link>
        <ul className="desktop-nav">{navLinks.map(link => <li key={link.href}>
          <Link href={link.href} className="nav-link" aria-current={isActive(pathname, link.href) ? "page" : undefined}>{link.label}</Link>
        </li>)}</ul>
        <Link href="/contact" className={buttonClass("primary", "header-cta")}>Start a Project <ArrowRightIcon /></Link>
        <button ref={toggle} className="menu-toggle" type="button" aria-controls="mobile-nav" aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"} onClick={() => {
            if (isOpen) closeMenu(true);
            else { setIsClosing(false); setOpenPath(pathname); }
          }}>
          <span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span>
        </button>
      </nav>
      {(isOpen || isClosing) && <div ref={menu} id="mobile-nav" className="mobile-menu"
        data-state={isOpen ? "open" : "closing"} inert={!isOpen} aria-hidden={!isOpen}
        onTransitionEnd={(event) => {
          if (event.target === event.currentTarget && event.propertyName === "opacity" && !isOpen) setIsClosing(false);
        }}>
        <nav className="container" aria-label="Mobile">
          <p className="eyebrow">Explore ZoloLabs</p>
          <ul>{navLinks.map((link, index) => <li key={link.href} style={{ "--menu-order": index } as CSSProperties}>
            <Link href={link.href} aria-current={isActive(pathname, link.href) ? "page" : undefined} onClick={() => closeMenu(true)}>
              <span className="menu-number" aria-hidden="true">0{index + 1}</span>{link.label}<ArrowRightIcon />
            </Link>
          </li>)}</ul>
          <Link href="/contact" className={buttonClass("primary", "mobile-menu-cta")} onClick={() => closeMenu(true)}>Start a Project <ArrowRightIcon /></Link>
          <p className="mobile-menu-note">Mobile and web applications. Business platforms.<br />Built around your business.</p>
        </nav>
      </div>}
    </header>
  );
}
