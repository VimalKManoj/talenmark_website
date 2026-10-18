"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { LogoMark } from "@/components/Logo";

/** An endless row of words that speeds up (and reverses) with scroll velocity. */
export default function Marquee({
  words,
  className,
  markColor,
}: {
  words: string[];
  className?: string;
  markColor?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = root.current!.querySelector(".mq-track")!;
      const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      loop.totalTime(38 * 200); // head start so scrolling up can run it backwards

      let dir = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v !== 0) dir = v > 0 ? 1 : -1;
          const boost = 1 + Math.min(Math.abs(v) / 350, 6);
          gsap.to(loop, { timeScale: dir * boost, duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: "power2.out" });
          gsap.to(track, { skewX: gsap.utils.clamp(-8, 8, -v / 220), duration: 0.5, overwrite: "auto" });
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  const row = (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-[0.35em]">{w}</span>
          <LogoMark className="h-[0.32em] w-[0.32em] shrink-0" color={markColor} />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className={`overflow-hidden ${className ?? ""}`} aria-label={words.join(", ")}>
      <div className="mq-track flex w-max will-change-transform" aria-hidden="true">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
