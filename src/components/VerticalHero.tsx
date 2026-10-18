"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { entryDelay, getNavMode, onIntroReady } from "@/lib/stage";
import type { Vertical } from "@/lib/content";
import { Chars } from "@/components/motion/Split";
import { heroShade } from "@/components/home/SplitHero";

/**
 * Full-bleed hero for a vertical. Its image sits exactly where the home
 * hero's expanded half ends, so arriving from the split feels continuous.
 */
export default function VerticalHero({
  vertical: v,
  meta,
  children,
}: {
  vertical: Vertical;
  meta: { label: string; value: string }[];
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const right = v.align === "right";

  useGSAP(
    () => {
      const expand = getNavMode() === "expand";
      gsap.set(".char", { yPercent: 115 });
      gsap.set(".vh-fade", { autoAlpha: 0, y: 16 });
      gsap.set(".vh-rule", { scaleX: 0 });
      if (!expand) gsap.set(".vh-img", { scale: 1.25 });

      const tl = gsap.timeline({ paused: true });
      tl.to(".char", { yPercent: 0, stagger: 0.05, duration: 1.6 }, 0)
        .to(".vh-fade", { autoAlpha: 1, y: 0, stagger: 0.06, duration: 1.2 }, 0.35)
        .to(".vh-rule", { scaleX: 1, duration: 1.6, ease: "expo.inOut" }, 0.2);
      if (!expand) tl.to(".vh-img", { scale: 1, duration: 2.4 }, 0);
      const off = onIntroReady(() => tl.delay(entryDelay()).restart(true));

      // drift away on scroll
      gsap.to(".vh-scroll", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".vh-content", {
        yPercent: -18,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      return off;
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[100svh] w-full overflow-hidden bg-ink text-bone">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[100svh] w-screen -translate-x-1/2 -translate-y-1/2">
        <div className="vh-scroll absolute inset-0">
          <div className="absolute -inset-8">
            <div className="vh-img absolute inset-0">
              <Image
                src={v.image}
                alt={v.imageAlt}
                fill
                sizes="100vw"
                quality={85}
                preload
                placeholder="blur"
                data-preload
                className="object-cover"
              />
            </div>
          </div>
        </div>
        {children}
        <div className={`absolute inset-0 ${heroShade}`} />
      </div>

      <div
        className={`vh-content relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-20 md:px-10 md:pb-10 md:pt-28 ${
          right ? "items-end text-right" : "items-start"
        }`}
      >
        <div className={`vh-fade flex items-baseline gap-3 ${right ? "flex-row-reverse" : ""}`}>
          <span className="eyebrow text-bone/55">({v.index})</span>
          <span className="eyebrow max-w-[30ch] text-bone/85">{v.name}</span>
        </div>

        <div className={`flex w-full flex-col ${right ? "items-end" : "items-start"}`}>
          <h1 className="display whitespace-nowrap text-[17vw] leading-[0.82] md:text-[8.4vw]">
            <Chars text={v.word} />
          </h1>
          <div className={`mt-4 flex items-center gap-5 md:mt-6 ${right ? "flex-row-reverse" : ""}`}>
            <span className="vh-fade display text-xl italic text-bone/90 md:text-[1.7rem]">{v.tagline}</span>
          </div>

          <div className="vh-rule mt-10 h-px w-full origin-left bg-bone/25" />
          <dl className="mt-5 grid w-full grid-cols-2 gap-5 text-left md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="vh-fade">
                <dt className="eyebrow text-bone/50">{m.label}</dt>
                <dd className="mt-1.5 text-[0.92rem] text-bone/90">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
