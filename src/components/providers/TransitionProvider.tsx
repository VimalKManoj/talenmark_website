"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { getLenis, setNavMode } from "@/lib/stage";
import { pageLabels } from "@/lib/content";
import { LogoMark } from "@/components/Logo";

type NavigateOptions = { mode?: "curtain" | "expand" };

type Ctx = {
  navigate: (href: string, opts?: NavigateOptions) => void;
};

const TransitionContext = createContext<Ctx>({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

/**
 * Page transitions: two ink panels close in from opposite edges (the same
 * split as the hero), the route changes behind them, then they part again.
 */
export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);
  const [label, setLabel] = useState("Talenmark");

  useEffect(() => {
    const onPop = () => setNavMode("pop");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const reveal = useCallback(() => {
    const el = curtain.current;
    if (!el) return;
    const [a, b] = el.querySelectorAll<HTMLElement>(".curtain-panel");
    gsap
      .timeline({
        delay: 0.15,
        onComplete: () => {
          gsap.set(el, { autoAlpha: 0 });
          busy.current = false;
        },
      })
      .to(el.querySelectorAll(".curtain-content"), { yPercent: -30, autoAlpha: 0, duration: 0.5, ease: "power3.in" })
      .to(a, { yPercent: 101, duration: 1, ease: "expo.inOut" }, 0.15)
      .to(b, { yPercent: -101, duration: 1, ease: "expo.inOut" }, 0.2);
  }, []);

  // The new route has committed: open the curtain.
  useEffect(() => {
    if (pending.current && pending.current === pathname) {
      pending.current = null;
      reveal();
    }
  }, [pathname, reveal]);

  const navigate = useCallback(
    (href: string, opts: NavigateOptions = {}) => {
      const target = href.split("#")[0] || "/";
      if (target === pathname) {
        getLenis()?.scrollTo(0, { duration: 1.4 });
        return;
      }
      if (busy.current) return;

      if (opts.mode === "expand") {
        setNavMode("expand");
        router.push(href);
        return;
      }

      busy.current = true;
      setNavMode("curtain");
      setLabel(pageLabels[target] ?? "Talenmark");
      const el = curtain.current!;
      const [a, b] = el.querySelectorAll<HTMLElement>(".curtain-panel");
      gsap
        .timeline({
          onComplete: () => {
            pending.current = target;
            router.push(href);
            // Never leave the curtain closed if the route resolves somewhere unexpected.
            window.setTimeout(() => {
              if (pending.current === target) {
                pending.current = null;
                reveal();
              }
            }, 8000);
          },
        })
        .set(el, { autoAlpha: 1 })
        .fromTo(a, { yPercent: -101 }, { yPercent: 0, duration: 0.9, ease: "expo.inOut" }, 0)
        .fromTo(b, { yPercent: 101 }, { yPercent: 0, duration: 0.9, ease: "expo.inOut" }, 0.05)
        .fromTo(
          el.querySelectorAll(".curtain-content"),
          { yPercent: 40, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" },
          0.55,
        );
    },
    [pathname, router, reveal],
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtain}
        className="pointer-events-none invisible fixed inset-0 z-[80] opacity-0"
        aria-hidden="true"
      >
        <div className="curtain-panel absolute inset-y-0 left-0 w-1/2 bg-ink" />
        <div className="curtain-panel absolute inset-y-0 right-0 w-1/2 bg-ink" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-bone/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-bone">
          <div className="curtain-content">
            <LogoMark className="h-10 w-10" />
          </div>
          <div className="curtain-content display text-6xl italic md:text-8xl">{label}</div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
