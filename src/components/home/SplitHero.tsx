"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { entryDelay, onIntroReady } from "@/lib/stage";
import { verticals } from "@/lib/content";
import { Chars } from "@/components/motion/Split";
import { LogoMark } from "@/components/Logo";
import { usePageTransition } from "@/components/providers/TransitionProvider";

/** Overlay shared with VerticalHero so the hand-off between pages is seamless. */
export const heroShade = "bg-gradient-to-b from-ink/45 via-ink/5 to-ink/70";

export default function SplitHero() {
  const root = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();
  const goRef = useRef<(i: number) => void>(() => {});

  useGSAP(
    () => {
      const rowEl = row.current!;
      const proxy = { split: 50 };
      const apply = () => root.current!.style.setProperty("--split", proxy.split.toFixed(3));
      const halves = gsap.utils.toArray<HTMLElement>(".half", root.current);
      const pick = (sel: string) => halves.map((h) => h.querySelectorAll<HTMLElement>(sel));
      const imgs = pick(".half-img");
      const shifts = pick(".half-shift");
      const dims = pick(".half-dim");
      const details = pick(".half-detail");
      const titles = pick(".char");
      const titleBoxes = pick(".half-title");
      const content = pick(".half-content");
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let locked = true;

      // ---- resting state, hidden under the loader / curtain
      gsap.set(imgs, { scale: 1.28 });
      gsap.set(".char", { yPercent: 115 });
      gsap.set(".hero-fade", { autoAlpha: 0, y: 14 });
      gsap.set(".hero-seam", { scale: 0 });
      gsap.set(".hero-badge", { scale: 0, rotate: -120 });
      if (canHover) gsap.set(details, { autoAlpha: 0, y: 14 });

      // ---- entrance
      const intro = gsap.timeline({ paused: true, onComplete: () => void (locked = false) });
      intro
        .to(imgs, { scale: 1, duration: 2.4, ease: "expo.out" }, 0)
        .to(".hero-seam", { scale: 1, duration: 1.8, ease: "expo.inOut" }, 0.1)
        .to(titles[0], { yPercent: 0, stagger: 0.045, duration: 1.5 }, 0.35)
        .to(titles[1], { yPercent: 0, stagger: 0.045, duration: 1.5 }, 0.45)
        .to(".hero-fade", { autoAlpha: 1, y: 0, stagger: 0.05, duration: 1.2 }, 0.7)
        .to(".hero-badge", { scale: 1, rotate: 0, duration: 1.6 }, 0.8);
      const off = onIntroReady(() => intro.delay(entryDelay()).restart(true));

      // ---- hover: the hovered world takes more of the screen
      const focus = (i: number | null) => {
        if (locked || !canHover) return;
        const target = i === null ? 50 : i === 0 ? 58 : 42;
        gsap.to(proxy, { split: target, duration: 1.3, ease: "expo.out", onUpdate: apply, overwrite: true });
        halves.forEach((_, j) => {
          const on = i === j;
          const away = i !== null && !on;
          gsap.to(imgs[j], { scale: on ? 1.05 : 1, duration: 2.4, ease: "expo.out", overwrite: "auto" });
          gsap.to(dims[j], { opacity: away ? 0.55 : 0, duration: 1, ease: "power2.out", overwrite: "auto" });
          gsap.to(details[j], {
            autoAlpha: on ? 1 : 0,
            y: on ? 0 : 14,
            stagger: on ? 0.06 : 0,
            duration: on ? 1 : 0.4,
            ease: on ? "expo.out" : "power2.out",
            overwrite: "auto",
          });
          gsap.to(titleBoxes[j], {
            scale: away ? 0.86 : 1,
            opacity: away ? 0.55 : 1,
            duration: 1.2,
            ease: "expo.out",
            overwrite: "auto",
          });
        });
      };
      const enters = halves.map((h, i) => {
        const fn = () => focus(i);
        h.addEventListener("mouseenter", fn);
        return fn;
      });
      const leave = () => focus(null);
      rowEl.addEventListener("mouseleave", leave);

      // ---- pointer parallax
      const xTo = shifts.map((s) => gsap.quickTo(s, "x", { duration: 1.4, ease: "power3" }));
      const yTo = shifts.map((s) => gsap.quickTo(s, "y", { duration: 1.4, ease: "power3" }));
      const onMove = (e: PointerEvent) => {
        if (locked) return;
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        xTo.forEach((fn) => fn(nx * -28));
        yTo.forEach((fn) => fn(ny * -18));
      };
      if (canHover) root.current!.addEventListener("pointermove", onMove);

      // ---- leaving on scroll
      gsap.to(".half-scroll", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.flatMap((n) => Array.from(n)), {
        yPercent: -14,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
      });

      // ---- click: the chosen world fills the screen, then becomes its own page
      goRef.current = (i: number) => {
        const href = verticals[i].href;
        if (locked) return;
        if (window.scrollY > 24) {
          navigate(href);
          return;
        }
        locked = true;
        const other = 1 - i;
        gsap
          .timeline({ onComplete: () => navigate(href, { mode: "expand" }) })
          .to(proxy, { split: i === 0 ? 100 : 0, duration: 1.25, ease: "expo.inOut", onUpdate: apply, overwrite: true }, 0)
          .to(titles[i], { yPercent: -115, stagger: 0.03, duration: 0.75, ease: "expo.in", overwrite: true }, 0)
          .to([...details[i], ...content[other]], { autoAlpha: 0, duration: 0.45, overwrite: true }, 0)
          .to(halves[i].querySelectorAll(".hero-fade"), { autoAlpha: 0, duration: 0.45 }, 0)
          .to([".hero-badge", ".hero-seam"], { autoAlpha: 0, duration: 0.4 }, 0)
          .to(dims[i], { opacity: 0, duration: 0.5, overwrite: true }, 0)
          .to(shifts, { x: 0, y: 0, duration: 1.1, ease: "expo.inOut", overwrite: true }, 0)
          .to(imgs[i], { scale: 1, duration: 1.25, ease: "expo.inOut", overwrite: true }, 0);
      };

      const rootEl = root.current!;
      return () => {
        off();
        rootEl.removeEventListener("pointermove", onMove);
        rowEl.removeEventListener("mouseleave", leave);
        halves.forEach((h, i) => h.removeEventListener("mouseenter", enters[i]));
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="split-row relative h-[100svh] w-full overflow-hidden bg-ink text-bone">
      <h1 className="sr-only">Talenmark Group — Real Estate, Construction &amp; Township Development, and Hospitality</h1>
      <div ref={row} className="flex h-full w-full flex-col md:flex-row">
        {verticals.map((v, i) => (
          <Link
            key={v.slug}
            href={v.href}
            onNavigate={(e) => {
              e.preventDefault();
              goRef.current(i);
            }}
            data-cursor="Enter"
            className={`half ${i === 0 ? "split-a" : "split-b"} relative block shrink-0 overflow-hidden`}
            aria-label={`${v.word} — ${v.name}`}
          >
            <div className="half-media pointer-events-none absolute left-1/2 top-1/2 h-[100svh] w-screen -translate-x-1/2 -translate-y-1/2">
              <div className="half-scroll absolute inset-0">
                <div className="half-shift absolute -inset-8">
                  <div className="half-img absolute inset-0">
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
              <div className={`absolute inset-0 ${heroShade}`} />
              <div className="half-dim absolute inset-0 bg-ink opacity-0" />
            </div>

            <div
              className={`half-content relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-20 md:px-10 md:pb-10 md:pt-28 ${
                v.align === "right" ? "items-end text-right" : "items-start"
              }`}
            >
              <div className={`hero-fade flex items-baseline gap-3 ${v.align === "right" ? "flex-row-reverse" : ""}`}>
                <span className="eyebrow text-bone/55">({v.index})</span>
                <span className="eyebrow max-w-[30ch] text-bone/85">{v.name}</span>
              </div>

              <div className={`flex flex-col ${v.align === "right" ? "items-end" : "items-start"}`}>
                <p className="half-detail mb-6 hidden max-w-[36ch] text-[0.95rem] leading-relaxed text-bone/80 md:block">
                  {v.blurb}
                </p>
                <h2
                  className={`half-title display whitespace-nowrap text-[17vw] leading-[0.82] md:text-[8.4vw] ${
                    v.align === "right" ? "origin-bottom-right" : "origin-bottom-left"
                  }`}
                >
                  <Chars text={v.word} />
                </h2>
                <div className={`mt-4 flex items-center gap-5 md:mt-6 ${v.align === "right" ? "flex-row-reverse" : ""}`}>
                  <span className="hero-fade display text-xl italic text-bone/90 md:text-[1.7rem]">{v.tagline}</span>
                  <span className="half-detail eyebrow flex items-center gap-2 rounded-full border border-bone/35 px-4 py-2 backdrop-blur-sm">
                    Explore
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M2 8h12M9 3l5 5-5 5" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* the seam between the two worlds */}
      <div className="split-seam pointer-events-none absolute z-20" aria-hidden="true">
        <div className="hero-seam absolute inset-0 bg-bone/45" />
        <div className="absolute inset-0 hidden overflow-hidden md:block">
          <div className="seam-pulse h-[10%] w-px bg-gradient-to-b from-transparent via-bone to-transparent" />
        </div>
        <div className="hero-badge absolute left-1/2 top-1/2 hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 md:block">
          <div className="absolute inset-0 rounded-full border border-bone/20 bg-ink/25 backdrop-blur-md" />
          <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 h-full w-full text-bone/80">
            <defs>
              <path id="ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
            </defs>
            <text className="eyebrow" style={{ fontSize: 7.4 }} fill="currentColor">
              <textPath href="#ring" textLength={287} lengthAdjust="spacing">
                TALENMARK GROUP · EST. 2014 · CALICUT · INDIA ·
              </textPath>
            </text>
          </svg>
          <LogoMark className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" />
        </div>
      </div>
    </section>
  );
}
