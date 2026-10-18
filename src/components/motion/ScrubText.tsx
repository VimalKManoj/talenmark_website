"use client";

import { Fragment, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export type ScrubSegment = string | { image: StaticImageData; position?: string };

/**
 * A statement that "reads itself" as you scroll: words brighten one by one,
 * and inline image pills open up inside the sentence.
 */
export default function ScrubText({
  segments,
  className,
  dim = 0.14,
}: {
  segments: ScrubSegment[];
  className?: string;
  dim?: number;
}) {
  const root = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const words = root.current!.querySelectorAll(".sw");
      const pills = root.current!.querySelectorAll(".pill");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 82%", end: "bottom 50%", scrub: 0.6 },
      });
      tl.fromTo(words, { opacity: dim }, { opacity: 1, stagger: 0.08, ease: "none", duration: 0.4 }, 0);
      pills.forEach((pill) => {
        const at = Number(pill.getAttribute("data-at") ?? 0) * 0.08;
        tl.fromTo(pill, { width: "0em" }, { width: "1.9em", duration: 0.8, ease: "power2.out" }, at);
      });
    },
    { scope: root },
  );

  return (
    <p ref={root} className={className}>
      {tokenize(segments).map((t, i) =>
        t.kind === "pill" ? (
          <Fragment key={i}>
            <span
              className="pill relative mx-[0.12em] inline-block h-[0.72em] w-[1.9em] translate-y-[0.04em] overflow-hidden rounded-full align-baseline"
              data-at={t.at}
              aria-hidden="true"
            >
              <Image
                src={t.image}
                alt=""
                fill
                sizes="200px"
                className="object-cover"
                style={{ objectPosition: t.position ?? "50% 50%" }}
              />
            </span>{" "}
          </Fragment>
        ) : (
          <Fragment key={i}>
            <span className="sw">{t.word}</span>{" "}
          </Fragment>
        ),
      )}
    </p>
  );
}

type Token =
  | { kind: "word"; word: string }
  | { kind: "pill"; image: StaticImageData; position?: string; at: number };

function tokenize(segments: ScrubSegment[]): Token[] {
  const out: Token[] = [];
  let words = 0;
  for (const seg of segments) {
    if (typeof seg === "string") {
      for (const word of seg.trim().split(/\s+/)) {
        out.push({ kind: "word", word });
        words += 1;
      }
    } else {
      out.push({ kind: "pill", image: seg.image, position: seg.position, at: words });
    }
  }
  return out;
}
