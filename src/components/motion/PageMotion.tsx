"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Declarative scroll reveals for everything inside it:
 *   data-reveal="up"     fade + rise
 *   data-reveal="words"  masked words (.word) rise in a stagger
 *   data-reveal="chars"  masked chars (.char) rise in a stagger
 *   data-reveal="clip"   wipe up, with the inner [data-clip-media] settling from a zoom
 *   data-reveal="line"   hairline draws left to right
 *   data-parallax="12"   yPercent drift while its parent crosses the viewport
 *   data-delay="0.2"     optional extra delay (seconds)
 */
export default function PageMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      q("[data-reveal]").forEach((el) => {
        const type = el.getAttribute("data-reveal");
        const at = Number(el.getAttribute("data-delay") ?? 0);
        const tl = gsap.timeline({ paused: true });
        let start = "top 88%";

        switch (type) {
          case "up":
            tl.from(el, { y: 48, autoAlpha: 0, duration: 1.4 }, at);
            break;
          case "words":
            tl.from(el.querySelectorAll(".word"), { yPercent: 110, stagger: 0.035, duration: 1.3 }, at);
            break;
          case "chars":
            tl.from(el.querySelectorAll(".char"), { yPercent: 115, stagger: 0.03, duration: 1.4 }, at);
            break;
          case "clip": {
            start = "top 85%";
            tl.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
              at,
            );
            const media = el.querySelector("[data-clip-media]");
            if (media) tl.from(media, { scale: 1.35, duration: 2.2, ease: "expo.out" }, at + 0.2);
            break;
          }
          case "line":
            start = "top 94%";
            tl.from(el, { scaleX: 0, transformOrigin: "0% 50%", duration: 1.6, ease: "expo.inOut" }, at);
            break;
          default:
            return;
        }
        ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => tl.play() });
      });

      q("[data-parallax]").forEach((el) => {
        const amount = Number(el.getAttribute("data-parallax") ?? 10);
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
