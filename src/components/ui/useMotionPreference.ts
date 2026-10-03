"use client";

import { useSyncExternalStore } from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const preference = window.matchMedia(MOTION_QUERY);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return true;
}

/** Keep SSR and hydration identical; enable motion after reading the browser preference. */
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
