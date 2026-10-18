"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { entryDelay, onIntroReady } from "@/lib/stage";
import { healthcare, verticals } from "@/lib/content";
import { Chars } from "@/components/motion/Split";
import { usePageTransition } from "@/components/providers/TransitionProvider";

/** Overlay shared with VerticalHero so the hand-off between pages is seamless. */
export const heroShade = "bg-gradient-to-b from-ink/45 via-ink/5 to-ink/70";

type Pane = {
  key: string;
  index: string;
  word: string;
  name: string;
  tagline: string;
  blurb: string;
  align: "left" | "center" | "right";
  href?: string;
  image?: StaticImageData;
  imageAlt?: string;
  status?: string;
};

const [structure, sanctuary] = verticals;
const panes: Pane[] = [
  { ...structure, key: structure.slug, align: "left" },
  { ...sanctuary, key: sanctuary.slug, align: "center" },
  { ...healthcare, key: healthcare.slug, align: "right" },
];

const EVEN = 100 / 3;
const alignClass = {
  left: { box: "items-start text-left", row: "", origin: "origin-bottom-left" },
  center: { box: "items-center text-center", row: "justify-center", origin: "origin-bottom" },
  right: { box: "items-end text-right", row: "flex-row-reverse", origin: "origin-bottom-right" },
};

export default function SplitHero() {
  const root = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();
  const goRef = useRef<(i: number) => void>(() => {});

  useGSAP(
    () => {
      const rowEl = row.current!;
      const proxy = { w0: EVEN, w1: EVEN, w2: EVEN };
      const apply = () => {
        const s = root.current!.style;
        s.setProperty("--w0", proxy.w0.toFixed(3));
        s.setProperty("--w1", proxy.w1.toFixed(3));
        s.setProperty("--w2", proxy.w2.toFixed(3));
      };
      const widths = (focus: number | null, on: number, off: number) =>
        focus === null
          ? { w0: EVEN, w1: EVEN, w2: EVEN }
          : { w0: focus === 0 ? on : off, w1: focus === 1 ? on : off, w2: focus === 2 ? on : off };

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
      if (canHover) gsap.set(details, { autoAlpha: 0, y: 14 });

      // ---- entrance
      const intro = gsap.timeline({ paused: true, onComplete: () => void (locked = false) });
      intro
        .to(imgs, { scale: 1, duration: 2.4, ease: "expo.out", stagger: 0.08 }, 0)
        .to(".hero-seam", { scale: 1, duration: 1.8, ease: "expo.inOut", stagger: 0.1 }, 0.1);
      titles.forEach((t, i) => intro.to(t, { yPercent: 0, stagger: 0.045, duration: 1.5 }, 0.35 + i * 0.1));
      intro.to(".hero-fade", { autoAlpha: 1, y: 0, stagger: 0.04, duration: 1.2 }, 0.75);
      const off = onIntroReady(() => intro.delay(entryDelay()).restart(true));

      // ---- hover: the hovered world takes more of the screen
      const focus = (i: number | null) => {
        if (locked || !canHover) return;
        gsap.to(proxy, { ...widths(i, 46, 27), duration: 1.3, ease: "expo.out", onUpdate: apply, overwrite: true });
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
            scale: away ? 0.84 : 1,
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
        const href = panes[i].href;
        if (locked || !href) return;
        if (window.scrollY > 24) {
          navigate(href);
          return;
        }
        locked = true;
        const others = halves.flatMap((_, j) => (j === i ? [] : Array.from(content[j])));
        gsap
          .timeline({ onComplete: () => navigate(href, { mode: "expand" }) })
          .to(proxy, { ...widths(i, 100, 0), duration: 1.25, ease: "expo.inOut", onUpdate: apply, overwrite: true }, 0)
          .to(titles[i], { yPercent: -115, stagger: 0.03, duration: 0.75, ease: "expo.in", overwrite: true }, 0)
          .to([...details[i], ...others], { autoAlpha: 0, duration: 0.45, overwrite: true }, 0)
          .to(halves[i].querySelectorAll(".hero-fade"), { autoAlpha: 0, duration: 0.45 }, 0)
          .to(".hero-seam", { autoAlpha: 0, duration: 0.4 }, 0)
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
      <h1 className="sr-only">
        Talenmark Group — Real Estate, Construction &amp; Township Development; Hospitality; and Healthcare
      </h1>
      <div ref={row} className="flex h-full w-full flex-col md:flex-row">
        {panes.map((p, i) => {
          const a = alignClass[p.align];
          const inner = (
            <>
              <div className="half-media pointer-events-none absolute left-1/2 top-1/2 h-[100svh] w-screen -translate-x-1/2 -translate-y-1/2">
                <div className="half-scroll absolute inset-0">
                  <div className="half-shift absolute -inset-8">
                    <div className="half-img absolute inset-0">
                      {p.image && (
                        <Image
                          src={p.image}
                          alt={p.imageAlt ?? ""}
                          fill
                          sizes="100vw"
                          quality={85}
                          preload
                          placeholder="blur"
                          data-preload
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className={`absolute inset-0 ${heroShade}`} />
                <div className="half-dim absolute inset-0 bg-ink opacity-0" />
              </div>

              <div
                className={`half-content relative z-10 flex h-full flex-col justify-between px-5 pb-5 md:px-8 md:pb-10 md:pt-28 ${
                  i === 0 ? "pt-20" : "pt-5"
                } ${a.box}`}
              >
                <div className={`hero-fade flex items-baseline gap-3 ${a.row}`}>
                  <span className="eyebrow text-bone/55">({p.index})</span>
                  <span className="eyebrow max-w-[26ch] text-bone/85">{p.name}</span>
                </div>

                <div className={`flex flex-col ${a.box}`}>
                  <p className="half-detail mb-6 hidden max-w-[34ch] text-[0.92rem] leading-relaxed text-bone/85 [text-shadow:0_1px_14px_rgb(0_0_0/0.55)] md:block">
                    {p.blurb}
                  </p>
                  <h2 className={`half-title display whitespace-nowrap text-[15vw] leading-[0.82] md:text-[6vw] ${a.origin}`}>
                    <Chars text={p.word} />
                  </h2>
                  <div className={`mt-3 flex items-center gap-4 md:mt-5 ${a.row}`}>
                    <span className="hero-fade display text-lg italic text-bone/90 md:text-[1.45rem]">{p.tagline}</span>
                    <span className="half-detail eyebrow flex items-center gap-2 rounded-full border border-bone/35 px-4 py-2 backdrop-blur-sm">
                      {p.href ? (
                        <>
                          Explore
                          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.4">
                            <path d="M2 8h12M9 3l5 5-5 5" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tide" />
                          {p.status}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </>
          );

          const cls = `half pane-${i} relative block shrink-0 overflow-hidden`;
          return p.href ? (
            <Link
              key={p.key}
              href={p.href}
              onNavigate={(e) => {
                e.preventDefault();
                goRef.current(i);
              }}
              data-cursor="Enter"
              className={cls}
              aria-label={`${p.word} — ${p.name}`}
            >
              {inner}
            </Link>
          ) : (
            <div key={p.key} data-cursor="Soon" className={cls} aria-label={`${p.word} — ${p.name}, ${p.status}`}>
              {inner}
            </div>
          );
        })}
      </div>

      {/* the seams between the three worlds */}
      {["seam-1", "seam-2"].map((s, i) => (
        <div key={s} className={`${s} pointer-events-none absolute z-20`} aria-hidden="true">
          <div className="hero-seam absolute inset-0 bg-bone/40" />
          <div className="absolute inset-0 hidden overflow-hidden md:block">
            <div
              className="seam-pulse h-[10%] w-px bg-gradient-to-b from-transparent via-bone to-transparent"
              style={{ animationDelay: `${i * 1.4}s` }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
