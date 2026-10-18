"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { images, redCrop } from "@/lib/content";
import TransitionLink from "@/components/TransitionLink";
import { Words } from "@/components/motion/Split";

const cards = [
  {
    index: "01",
    word: "Structure",
    title: "Real Estate, Construction & Township Development",
    href: "/real-estate",
    body: "An award-winning developer crafting spaces that carry elegance, novelty and contemporary design — while respecting traditional architecture.",
    list: [
      ["Residential & Fine Living", "Luxury villas & premium apartments"],
      ["Commercial Spaces", "Business hubs for a growing economy"],
      ["Landmark Developments", "India's biggest Cultural Centre"],
    ],
    image: images.culturalCentreRed,
    imageStyle: redCrop,
    caption: "Cultural Centre — Markaz Knowledge City",
    theme: "bg-sand text-ink",
    muted: "text-ink/55",
    rule: "border-ink/15",
  },
  {
    index: "02",
    word: "Sanctuary",
    title: "Hospitality",
    href: "/hospitality",
    body: "Premium resorts, luxury hotels and wellness retreats that rejuvenate the mind and soul — and blend seamlessly with nature.",
    list: [
      ["Talenmark Chilgrove", "Four-star resort villas, Wayanad"],
      ["2,600 ft above sea level", "Mist-clad hills of Vythiri"],
      ["Sustainable eco-tourism", "Along the Western Ghats"],
    ],
    image: images.chilgroveAerial,
    imageStyle: { objectPosition: "68% 50%" },
    caption: "Talenmark Chilgrove — Vythiri, Wayanad",
    theme: "bg-forest text-mist",
    muted: "text-mist/55",
    rule: "border-mist/15",
  },
];

/** Two full-height cards that stack over each other as you scroll. */
export default function VerticalStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".stack-card", root.current);
        items.forEach((card, i) => {
          const next = items[i + 1];
          if (!next) return;
          gsap.to(card.querySelector(".stack-inner"), {
            scale: 0.9,
            yPercent: -4,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
          gsap.to(card.querySelector(".stack-shade"), {
            opacity: 0.6,
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-bone">
      <div className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="grid gap-8 md:grid-cols-12">
          <span className="eyebrow text-stone md:col-span-3" data-reveal="up">
            (Our Verticals)
          </span>
          <h2 className="display text-5xl md:col-span-6 md:text-[5.2vw]" data-reveal="words">
            <Words text="Two worlds," /> <br />
            <em className="italic">
              <Words text="one ground." />
            </em>
          </h2>
          <p className="max-w-[34ch] self-end text-[0.95rem] leading-relaxed text-ink-2 md:col-span-3" data-reveal="up">
            From the city&apos;s landmarks to the mist of the Western Ghats, each vertical carries the same promise:
            build with integrity, and leave something lasting.
          </p>
        </div>
      </div>

      {cards.map((c) => (
        <div key={c.index} className="stack-card relative md:sticky md:top-0 md:h-[100svh]">
          <div className={`stack-inner relative h-full origin-top overflow-hidden rounded-t-[28px] ${c.theme}`}>
            <div className="grid h-full gap-10 px-5 py-14 md:grid-cols-12 md:gap-8 md:px-8 md:py-12">
              <div className="flex flex-col justify-between gap-12 md:col-span-6">
                <div className="flex items-start justify-between">
                  <span className="display nums text-[22vw] leading-[0.75] md:text-[11vw]">{c.index}</span>
                  <span className={`eyebrow mt-3 ${c.muted}`}>{c.word}</span>
                </div>
                <div>
                  <h3 className="display max-w-[16ch] text-4xl leading-[1] md:text-[3.6vw]">{c.title}</h3>
                  <p className={`mt-6 max-w-[46ch] text-[1rem] leading-relaxed ${c.muted}`}>{c.body}</p>
                  <ul className={`mt-10 border-t ${c.rule}`}>
                    {c.list.map(([a, b]) => (
                      <li key={a} className={`flex items-baseline justify-between gap-6 border-b py-3.5 ${c.rule}`}>
                        <span className="text-[0.95rem]">{a}</span>
                        <span className={`eyebrow text-right ${c.muted}`}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <TransitionLink
                    href={c.href}
                    className="group mt-10 inline-flex items-center gap-4 text-[0.95rem]"
                    data-cursor="Discover"
                  >
                    <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-current">
                      <span className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-red transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100" />
                      <svg viewBox="0 0 16 16" className="relative h-4 w-4 transition-colors group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M2 8h12M9 3l5 5-5 5" />
                      </svg>
                    </span>
                    <span className="link-underline">Discover {c.word}</span>
                  </TransitionLink>
                </div>
              </div>

              <div className="relative min-h-[60vh] overflow-hidden rounded-[18px] md:col-span-5 md:col-start-8 md:min-h-0">
                <div className="absolute inset-x-0 -inset-y-[12%]" data-parallax="8">
                  <Image
                    src={c.image}
                    alt={c.caption}
                    fill
                    sizes="(min-width: 768px) 90vw, 100vw"
                    className="object-cover"
                    style={c.imageStyle}
                  />
                </div>
                <span className="eyebrow absolute bottom-4 left-4 rounded-full bg-ink/40 px-3 py-1.5 text-bone backdrop-blur-md">
                  {c.caption}
                </span>
              </div>
            </div>
            <div className="stack-shade pointer-events-none absolute inset-0 bg-ink opacity-0" />
          </div>
        </div>
      ))}
    </section>
  );
}
