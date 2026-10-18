import type Lenis from "lenis";

/**
 * Tiny module-level store shared by the loader, page transitions and
 * page entrances. It lives outside React so effects can read it
 * synchronously during the same commit that mounts a new page.
 */

export type NavMode = "initial" | "curtain" | "expand" | "pop";

let introReady = false;
const listeners = new Set<() => void>();
let navMode: NavMode = "initial";
let lenis: Lenis | null = null;

export function markIntroReady() {
  if (introReady) return;
  introReady = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Runs `fn` once the first-load intro has finished (immediately if it already has). */
export function onIntroReady(fn: () => void) {
  if (introReady) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export const getNavMode = () => navMode;
export const setNavMode = (mode: NavMode) => {
  navMode = mode;
};

/** Seconds a page should wait before its entrance, given how we arrived. */
export function entryDelay() {
  switch (navMode) {
    case "curtain":
      return 0.45;
    case "expand":
      return 0.05;
    case "pop":
      return 0;
    default:
      return 0.15;
  }
}

export const getLenis = () => lenis;
export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
