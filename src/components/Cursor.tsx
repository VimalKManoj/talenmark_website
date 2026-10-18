"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * A label bubble that replaces the pointer over anything marked
 * with data-cursor="Label". Fine pointers only.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const reset = useRef<() => void>(() => {});
  const pathname = usePathname();

  // the element under the pointer is gone after a route change
  useEffect(() => reset.current(), [pathname]);

  useGSAP(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = root.current!;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    let active: Element | null = null;
    let last = { x: -100, y: -100 };

    const update = (target: Element | null) => {
      if (target === active) return;
      active = target;
      if (target) {
        text.current!.textContent = target.getAttribute("data-cursor");
        gsap.to(el, { scale: 1, autoAlpha: 1, duration: 0.6, ease: "expo.out" });
      } else {
        gsap.to(el, { scale: 0, autoAlpha: 0, duration: 0.4, ease: "power3.out" });
      }
    };
    const move = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      xTo(e.clientX);
      yTo(e.clientY);
      update((e.target as Element | null)?.closest?.("[data-cursor]") ?? null);
    };
    // content slides under a still pointer while scrolling, so re-check what's beneath it
    const onScroll = () =>
      update(document.elementFromPoint(last.x, last.y)?.closest("[data-cursor]") ?? null);
    const leave = () => {
      active = null;
      gsap.to(el, { scale: 0, autoAlpha: 0, duration: 0.3 });
    };
    reset.current = leave;

    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, autoAlpha: 0 });
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  });

  return (
    <div
      ref={root}
      className="pointer-events-none invisible fixed left-0 top-0 z-[100] flex h-24 w-24 items-center justify-center rounded-full bg-red text-white"
      aria-hidden="true"
    >
      <span ref={text} className="eyebrow" />
    </div>
  );
}
