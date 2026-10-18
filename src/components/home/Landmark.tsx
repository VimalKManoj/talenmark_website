"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/content";

/**
 * A pinned moment for the Cultural Centre: a small window onto the
 * building opens to full bleed while the headline parts around it.
 */
export default function Landmark() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      tl.fromTo(
        ".lm-frame",
        { clipPath: mobile ? "inset(34% 18% 34% 18% round 14px)" : "inset(31% 37% 31% 37% round 14px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
        0,
      )
        .fromTo(".lm-img", { scale: 1.7 }, { scale: 1, duration: 1 }, 0)
        .to(".lm-left", { xPercent: -70, opacity: 0, duration: 0.7 }, 0)
        .to(".lm-right", { xPercent: 70, opacity: 0, duration: 0.7 }, 0)
        .to(".lm-top", { opacity: 0, y: -20, duration: 0.3 }, 0)
        .fromTo(".lm-caption > *", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.3 }, 0.78)
        .to({}, { duration: 0.15 });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[280vh] bg-bone">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="lm-frame absolute inset-0 will-change-[clip-path]">
          <div className="lm-img absolute inset-0 origin-[50%_62%]">
            <Image
              src={images.culturalCentre}
              alt="India's biggest Cultural Centre, by Talenmark, at Markaz Knowledge City"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        </div>

        <div className="lm-top absolute inset-x-0 top-24 flex justify-between px-5 md:top-28 md:px-8">
          <span className="eyebrow text-stone">(Landmark)</span>
          <span className="eyebrow text-stone">Kaithapoyil, Calicut</span>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <h2 className="display flex w-full justify-between px-5 text-[13vw] leading-none text-ink md:px-8 md:text-[8.5vw]">
            <span className="lm-left">Bridging</span>
            <span className="lm-right italic">the past</span>
          </h2>
        </div>

        <div className="lm-caption absolute inset-x-0 bottom-0 grid gap-6 px-5 pb-8 text-bone md:grid-cols-12 md:px-8 md:pb-12">
          <span className="eyebrow text-bone/70 md:col-span-3">(Landmark Development)</span>
          <h3 className="display text-5xl leading-[0.95] md:col-span-6 md:text-[5vw]">
            India&apos;s biggest
            <br />
            <em>Cultural Centre</em>
          </h3>
          <div className="self-end md:col-span-3">
            <p className="text-[0.95rem] leading-relaxed text-bone/80">
              In the heart of Markaz Knowledge City — designed to draw the world with its architectural beauty and
              core values. Bridging past with present, for the future.
            </p>
            <p className="eyebrow mt-4 text-bone/55">11.48° N — 75.94° E</p>
          </div>
        </div>
      </div>
    </section>
  );
}
