"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, markIntroReady, prefersReducedMotion } from "@/lib/stage";
import { LogoMark } from "@/components/Logo";

function waitForImages() {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>("img[data-preload]"));
  return Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
    ),
  );
}

/**
 * First-load loader. Counts to 100 while fonts and hero images arrive,
 * then splits down the middle — the same seam the home hero is built on.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      window.scrollTo(0, 0);
      const reduce = prefersReducedMotion();
      const count = root.current!.querySelector<HTMLElement>(".loader-count")!;
      const progress = { v: 0 };
      const render = () => {
        count.textContent = String(Math.round(progress.v)).padStart(3, "0");
      };

      const assetsReady = Promise.race([
        Promise.all([document.fonts.ready, waitForImages()]),
        new Promise((r) => setTimeout(r, 5000)),
      ]);

      const finish = () => {
        markIntroReady();
        document.documentElement.classList.remove("is-loading");
        getLenis()?.start();
      };

      const tl = gsap.timeline();
      tl.from(".loader-mark", { scale: 0, rotate: -120, duration: 1.4, ease: "expo.out" }, 0)
        .from(".loader-letter", { yPercent: 110, stagger: 0.045, duration: 1.1, ease: "expo.out" }, 0.15)
        .from(".loader-meta", { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.9 }, 0.3)
        .from(".loader-seam", { scaleY: 0, duration: reduce ? 0.3 : 2.4, ease: "power2.inOut" }, 0)
        .to(progress, { v: 86, duration: reduce ? 0.3 : 2, ease: "power2.inOut", onUpdate: render }, 0)
        .add(() => {
          tl.pause();
          assetsReady.then(() => tl.resume());
        })
        .to(progress, { v: 100, duration: 0.5, ease: "power1.out", onUpdate: render })
        .to(".loader-content", { yPercent: -60, autoAlpha: 0, duration: 0.7, ease: "power3.in", stagger: 0.03 }, "+=0.15")
        .add(finish, "-=0.1")
        .to(".loader-panel-a", { yPercent: -101, duration: 1.4, ease: "expo.inOut" }, "<")
        .to(".loader-panel-b", { yPercent: 101, duration: 1.4, ease: "expo.inOut" }, "<0.06")
        .to(".loader-seam", { autoAlpha: 0, duration: 0.4 }, "<0.5")
        .add(() => setGone(true));
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[90] text-bone" aria-hidden="true">
      <div className="loader-panel-a absolute inset-x-0 top-0 h-1/2 bg-ink md:inset-x-auto md:inset-y-0 md:left-0 md:h-full md:w-1/2" />
      <div className="loader-panel-b absolute inset-x-0 bottom-0 h-1/2 bg-ink md:inset-x-auto md:inset-y-0 md:right-0 md:h-full md:w-1/2" />
      {/* the seam grows outward from a gap around the mark */}
      <div className="loader-seam absolute left-1/2 top-0 hidden h-[calc(50%-150px)] w-px origin-bottom bg-bone/25 md:block" />
      <div className="loader-seam absolute bottom-0 left-1/2 hidden h-[calc(50%-150px)] w-px origin-top bg-bone/25 md:block" />

      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
        <div className="flex justify-between gap-4">
          <span className="loader-content loader-meta eyebrow max-w-[14ch] text-bone/60 md:max-w-none">
            Real Estate · Construction · Township
          </span>
          <span className="loader-content loader-meta eyebrow max-w-[14ch] text-right text-bone/60 md:max-w-none">
            Hospitality · Resorts · Retreats
          </span>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="loader-content">
            <LogoMark className="loader-mark h-14 w-14 md:h-16 md:w-16" />
          </div>
          <div className="loader-content mask text-sm font-semibold tracking-[0.5em] md:text-base">
            {Array.from("TALENMARK").map((l, i) => (
              <span key={i} className="loader-letter inline-block">
                {l}
              </span>
            ))}
          </div>
          <p className="loader-content loader-meta display text-xl italic text-bone/70 md:text-2xl">
            Building the future, preserving the legacy.
          </p>
        </div>

        <div className="flex items-end justify-between">
          <span className="loader-content loader-meta eyebrow text-bone/60">
            Calicut, India
            <br />
            Est. 2014
          </span>
          <span className="loader-content loader-count display nums text-[22vw] leading-[0.8] md:text-[10vw]">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
