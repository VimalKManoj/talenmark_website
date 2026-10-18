"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { images, redCrop } from "@/lib/content";
import { Words } from "@/components/motion/Split";

const items = [
  {
    index: "01",
    title: "Residential & Fine Living",
    text: "Luxury villas and premium apartments that promise a balanced, nourishing lifestyle — at prime locations across the city.",
    image: images.chilgroveVilla,
    style: { objectPosition: "50% 50%" },
  },
  {
    index: "02",
    title: "Commercial Spaces",
    text: "World-class business spaces and commercial hubs, tailored for a growing economy and a city emerging as an IT hub.",
    image: images.culturalCentre,
    style: { objectPosition: "50% 92%" },
  },
  {
    index: "03",
    title: "Landmark Developments",
    text: "Monumental projects, conceived and executed with care — most notably India's biggest Cultural Centre, at Markaz Knowledge City.",
    image: images.culturalCentreRed,
    style: redCrop,
  },
];

/** Three practices; on desktop a framed preview trails the cursor across the list. */
export default function Specialisations() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const preview = root.current!.querySelector<HTMLElement>(".sp-preview")!;
      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
      const xTo = gsap.quickTo(preview, "x", { duration: 0.8, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.8, ease: "power3" });
      const rTo = gsap.quickTo(preview, "rotation", { duration: 0.8, ease: "power3" });
      let lastX = 0;
      const list = root.current!.querySelector<HTMLElement>(".sp-list")!;
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
        lastX = e.clientX;
      };
      const enter = () => gsap.to(preview, { scale: 1, autoAlpha: 1, duration: 0.7, ease: "expo.out" });
      const leave = () => gsap.to(preview, { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "power3.out" });
      list.addEventListener("pointermove", move);
      list.addEventListener("pointerenter", enter);
      list.addEventListener("pointerleave", leave);
      return () => {
        list.removeEventListener("pointermove", move);
        list.removeEventListener("pointerenter", enter);
        list.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-paper px-5 py-28 md:px-8 md:py-40">
      <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12">
        <span className="eyebrow text-stone md:col-span-3" data-reveal="up">
          (03) What we build
        </span>
        <h2 className="display text-5xl md:col-span-8 md:text-[5vw]" data-reveal="words">
          <Words text="Three practices," /> <em className="italic"><Words text="one standard." /></em>
        </h2>
      </div>

      <ul className="sp-list border-t border-ink/15" onPointerLeave={() => setActive(null)}>
        {items.map((it, i) => (
          <li
            key={it.index}
            className="group border-b border-ink/15"
            onPointerEnter={() => setActive(i)}
            data-reveal="up"
            data-delay={i * 0.06}
          >
            <div className="grid items-baseline gap-4 py-8 md:grid-cols-12 md:py-12">
              <span className="eyebrow text-stone md:col-span-1">{it.index}</span>
              <h3 className="display text-[11vw] leading-[0.95] transition-[transform,color] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:italic group-hover:text-red md:col-span-7 md:text-[5.4vw]">
                {it.title}
              </h3>
              <p className="max-w-[40ch] text-[0.95rem] leading-relaxed text-ink-2 md:col-span-4">{it.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="sp-preview pointer-events-none invisible fixed left-0 top-0 z-30 hidden h-[300px] w-[240px] overflow-hidden rounded-[14px] md:block">
        {items.map((it, i) => (
          <div
            key={it.index}
            className="absolute inset-0 transition-[clip-path] duration-700 ease-[var(--ease-expo)]"
            style={{ clipPath: active === i ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          >
            <Image src={it.image} alt="" fill sizes="240px" className="object-cover" style={it.style} />
          </div>
        ))}
      </div>
    </section>
  );
}
