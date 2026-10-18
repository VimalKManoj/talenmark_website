"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const offerings = [
  {
    title: "Premium Resorts",
    text: "Resort estates of independent villas, set gently into their landscape — beginning with Chilgrove in Wayanad.",
    icon: "M8 52h48M12 52V34c0-9 7-16 16-16h0c9 0 16 7 16 16v18M44 52V40c0-6 4-10 9-10M20 52V40h12v12M28 18c0-6 4-10 10-10",
  },
  {
    title: "Luxury Hotels",
    text: "Hotels designed around calm and considered service — places that rejuvenate the mind and soul.",
    icon: "M8 56h48M18 56V10h28v46M24 18h4M36 18h4M24 26h4M36 26h4M24 34h4M36 34h4M28 56v-10h8v10",
  },
  {
    title: "Wellness Retreats",
    text: "Retreats for rest and renewal in harmony with nature, built around the rhythms of the hills.",
    icon: "M32 54C18 46 12 34 16 20c10 2 16 8 16 18 0-10 6-16 16-18 4 14-2 26-16 34zM32 38v16M10 58h44",
  },
];

/** Horizontal track driven by vertical scroll (stacks normally on small screens). */
export default function Offerings() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const section = root.current!;
        const track = section.querySelector<HTMLElement>(".off-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const size = () => {
          section.style.height = `${distance() + window.innerHeight}px`;
        };
        size();
        ScrollTrigger.addEventListener("refreshInit", size);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".off-card", section).forEach((card) => {
          gsap.from(card.querySelectorAll(".off-in"), {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            ease: "expo.out",
            duration: 1.2,
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 75%", once: true },
          });
          gsap.from(card.querySelectorAll(".off-icon path"), {
            strokeDashoffset: 1,
            ease: "power2.inOut",
            duration: 1.6,
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 75%", once: true },
          });
        });

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", size);
          section.style.height = "";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-forest text-mist">
      <div className="overflow-hidden md:sticky md:top-0 md:h-[100svh]">
        <div className="off-track flex h-full flex-col gap-6 px-5 py-24 md:w-max md:flex-row md:items-stretch md:gap-8 md:px-8 md:py-28">
          <div className="flex shrink-0 flex-col justify-between md:w-[38vw] md:pr-10">
            <span className="eyebrow text-mist/50">(04) What we&apos;re building</span>
            <div>
              <h2 className="display text-5xl leading-[0.95] md:text-[5.4vw]">
                Experiences, <br />
                <em className="italic text-mist/70">not only addresses.</em>
              </h2>
              <p className="mt-8 max-w-[40ch] text-[0.98rem] leading-relaxed text-mist/70">
                Modern travellers seek experiences that rejuvenate the mind and soul. Our hospitality vertical develops
                premium resorts, luxury hotels and wellness retreats that blend seamlessly with nature.
              </p>
            </div>
            <span className="eyebrow mt-10 hidden items-center gap-3 text-mist/50 md:flex">
              Scroll
              <svg viewBox="0 0 24 8" className="h-2 w-6" fill="none" stroke="currentColor">
                <path d="M0 4h22M18 1l4 3-4 3" />
              </svg>
            </span>
          </div>

          {offerings.map((o, i) => (
            <article
              key={o.title}
              className="off-card relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[22px] border border-mist/12 bg-moss/60 p-7 md:w-[30vw] md:p-10"
            >
              <div className="off-in flex items-start justify-between">
                <svg viewBox="0 0 64 64" className="off-icon h-16 w-16 text-sage" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={o.icon} pathLength={1} strokeDasharray={1} />
                </svg>
                <span className="display nums text-7xl text-mist/25">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="mt-24">
                <h3 className="off-in display text-4xl md:text-[3vw]">{o.title}</h3>
                <p className="off-in mt-5 max-w-[34ch] text-[0.95rem] leading-relaxed text-mist/70">{o.text}</p>
              </div>
            </article>
          ))}

          <div className="flex shrink-0 flex-col justify-end md:w-[34vw] md:pl-6">
            <p className="display text-4xl italic leading-[1.05] md:text-[3.4vw]">
              &ldquo;Sparing a thought for the generations yet to come.&rdquo;
            </p>
            <span className="eyebrow mt-6 text-mist/50">— The Talenmark mission</span>
          </div>
        </div>
      </div>
    </section>
  );
}
