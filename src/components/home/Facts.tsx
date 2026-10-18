"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const facts = [
  { value: 2014, format: (n: number) => String(Math.round(n)), unit: "", label: "Founded in Calicut, Kerala" },
  {
    value: 2600,
    format: (n: number) => Math.round(n).toLocaleString("en-IN"),
    unit: "ft",
    label: "Chilgrove, above sea level",
  },
  { value: 24, format: (n: number) => String(Math.round(n)), unit: "", label: "Independent four-star resort villas" },
  { value: 1, format: (n: number) => `Nº ${Math.round(n)}`, unit: "", label: "India's biggest Cultural Centre of its kind" },
];

/** Four numbers from the group's story, counting up as they arrive. */
export default function Facts() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".fact", root.current);
      items.forEach((item, i) => {
        const num = item.querySelector<HTMLElement>(".fact-num")!;
        const f = facts[i];
        const from = f.value === 2014 ? 1990 : 0;
        const state = { v: from };
        num.textContent = f.format(from);
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(state, {
              v: f.value,
              duration: 2.2,
              delay: i * 0.12,
              ease: "expo.out",
              onUpdate: () => {
                num.textContent = f.format(state.v);
              },
            }),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-bone px-5 pb-28 md:px-8 md:pb-40">
      <div className="grid grid-cols-2 border-t border-ink/15 md:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={f.label}
            className={`fact flex flex-col justify-between gap-10 border-b border-ink/15 py-8 md:border-b-0 md:py-10 ${
              i % 2 === 0 ? "pr-4" : "pl-4"
            } ${i > 0 ? "md:border-l md:pl-6" : "md:pr-6"} ${i % 2 === 1 ? "border-l md:border-l" : ""}`}
            data-reveal="up"
            data-delay={i * 0.08}
          >
            <span className="eyebrow text-stone">({String(i + 1).padStart(2, "0")})</span>
            <div>
              <div className="display nums flex items-baseline gap-2 text-[15vw] leading-none md:text-[6.4vw]">
                <span className="fact-num">{f.format(f.value)}</span>
                {f.unit && <span className="text-[0.35em] italic text-stone">{f.unit}</span>}
              </div>
              <p className="mt-3 max-w-[22ch] text-sm leading-snug text-ink-2">{f.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
