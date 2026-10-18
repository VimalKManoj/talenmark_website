"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Nested, gently irregular rings — a stylised contour map of a hilltop. */
function contour(cx: number, cy: number, r: number, seed: number) {
  const pts = 140;
  let d = "";
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const n =
      Math.sin(a * 3 + seed) * 0.09 +
      Math.sin(a * 5 + seed * 1.7) * 0.045 +
      Math.sin(a * 2 - seed * 0.6) * 0.11 +
      Math.cos(a * 7 + seed * 0.3) * 0.02;
    const rr = r * (1 + n);
    const x = cx + Math.cos(a) * rr * 1.35;
    const y = cy + Math.sin(a) * rr * 0.82;
    d += `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `${d}Z`;
}

const rings = Array.from({ length: 16 }, (_, i) => contour(1080, 430, 26 + i * 34, 1.2 + i * 0.11));
const ringsB = Array.from({ length: 6 }, (_, i) => contour(240, 820, 20 + i * 30, 4 + i * 0.2));
const ticks = Array.from({ length: 14 }, (_, i) => i * 200);

export default function Altitude() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const num = root.current!.querySelector<HTMLElement>(".alt-num")!;
      const state = { ft: 0 };
      gsap.set(".alt-ring", { strokeDasharray: 1, strokeDashoffset: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      tl.to(".alt-ring", { strokeDashoffset: 0, stagger: { amount: 0.5, from: "end" }, duration: 0.4 }, 0)
        .to(
          state,
          {
            ft: 2600,
            duration: 0.85,
            ease: "power1.inOut",
            onUpdate: () => {
              num.textContent = Math.round(state.ft).toLocaleString("en-IN");
            },
          },
          0,
        )
        .fromTo(".alt-marker", { bottom: "0%" }, { bottom: "100%", duration: 0.85, ease: "power1.inOut" }, 0)
        .fromTo(".alt-cloud", { xPercent: -10, opacity: 0 }, { xPercent: 10, opacity: 1, duration: 1 }, 0)
        .fromTo(".alt-end", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.12 }, 0.82);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[300vh] bg-forest text-mist">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full text-sage"
          fill="none"
          aria-hidden="true"
        >
          {[...rings, ...ringsB].map((d, i) => (
            <path
              key={i}
              d={d}
              pathLength={1}
              className="alt-ring"
              stroke="currentColor"
              strokeOpacity={i < rings.length ? 0.16 + (i % 4 === 0 ? 0.18 : 0) : 0.14}
              strokeWidth={i % 4 === 0 ? 1.4 : 1}
            />
          ))}
        </svg>
        <div className="alt-cloud pointer-events-none absolute inset-0">
          <div className="mist-layer mist-a" />
          <div className="mist-layer mist-c" />
        </div>

        <div className="relative grid h-full grid-cols-12 px-5 pb-8 pt-24 md:px-8 md:pb-10 md:pt-28">
          {/* altimeter */}
          <div className="relative col-span-2 hidden md:block">
            <div className="absolute inset-x-0 bottom-3 top-14">
              <div className="absolute inset-y-0 left-0 w-px bg-mist/15" />
              {ticks.map((t) => {
                const major = t % 1000 === 0 || t === 2600;
                return (
                  <div
                    key={t}
                    className="absolute left-0 flex translate-y-1/2 items-center gap-2"
                    style={{ bottom: `${(t / 2600) * 100}%` }}
                  >
                    <span className={`h-px ${major ? "w-6 bg-mist/60" : "w-3 bg-mist/25"}`} />
                    {major && <span className="eyebrow text-mist/45">{t.toLocaleString("en-IN")}</span>}
                  </div>
                );
              })}
              <div className="alt-marker absolute left-0 flex -translate-x-[3px] translate-y-1/2 items-center gap-2">
                <span className="h-[7px] w-[7px] rounded-full bg-red" />
                <span className="h-px w-3 bg-red" />
              </div>
            </div>
          </div>

          <div className="col-span-12 flex flex-col justify-between md:col-span-10">
            <div className="flex items-baseline justify-between">
              <span className="eyebrow text-mist/50">(02) Altitude</span>
              <span className="eyebrow text-mist/50">Vythiri, Wayanad — 11.55° N, 76.04° E</span>
            </div>

            <div>
              <div className="display nums flex items-baseline gap-4 leading-[0.8]">
                <span className="alt-num text-[30vw] md:text-[21vw]">0</span>
                <span className="text-[8vw] italic text-mist/60 md:text-[5vw]">ft</span>
              </div>
              <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-10">
                <p className="alt-end display text-3xl italic md:col-span-5 md:text-[2.8vw] md:leading-[1.05]">
                  Above sea level, where the Western Ghats meet the clouds.
                </p>
                <p className="alt-end max-w-[40ch] text-[0.95rem] leading-relaxed text-mist/70 md:col-span-4 md:col-start-7">
                  Placed along the Western Ghats — a UNESCO World Heritage site — and close to one of the world&apos;s
                  eight biodiversity hotspots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
