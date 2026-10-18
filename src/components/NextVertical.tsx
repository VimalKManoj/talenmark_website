import Image from "next/image";
import type { Vertical } from "@/lib/content";
import TransitionLink from "@/components/TransitionLink";
import { Chars } from "@/components/motion/Split";

/** A closing doorway into the other vertical. The image window opens on hover. */
export default function NextVertical({ vertical: v, tone = "dark" }: { vertical: Vertical; tone?: "dark" | "forest" }) {
  return (
    <section className={`${tone === "forest" ? "bg-forest" : "bg-ink"} px-3 pb-3 pt-24 text-bone md:px-4 md:pb-4 md:pt-32`}>
      <div className="mb-10 flex items-baseline justify-between px-2 md:px-4">
        <span className="eyebrow text-bone/50" data-reveal="up">
          (Next vertical)
        </span>
        <span className="eyebrow text-bone/50" data-reveal="up">
          {v.index} / 02
        </span>
      </div>
      <TransitionLink
        href={v.href}
        className="group relative block h-[78svh] overflow-hidden rounded-[20px]"
        data-cursor="Enter"
        aria-label={`${v.word} — ${v.name}`}
      >
        <div className="absolute inset-0 transition-[clip-path] duration-[1400ms] ease-[var(--ease-expo)] [clip-path:inset(9%_7%_9%_7%_round_14px)] group-hover:[clip-path:inset(0%_0%_0%_0%_round_0px)]">
          <div className="absolute inset-0 scale-110 transition-transform duration-[1800ms] ease-[var(--ease-expo)] group-hover:scale-100">
            <Image src={v.image} alt={v.imageAlt} fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-ink/35" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <span className="eyebrow mb-6 text-bone/75">{v.name}</span>
          <span className="display text-[19vw] leading-[0.85] md:text-[13vw]" data-reveal="chars">
            <Chars text={v.word} />
          </span>
          <span className="display mt-6 text-2xl italic text-bone/85">{v.tagline}</span>
        </div>
      </TransitionLink>
    </section>
  );
}
