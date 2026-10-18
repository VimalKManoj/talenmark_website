"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { images } from "@/lib/content";
import { Words } from "@/components/motion/Split";

const G = 560; // ground line

/** A keyhole (horseshoe) arch opening, centred on cx, standing on `bottom`. */
function keyhole(cx: number, bottom: number, w: number, h: number) {
  const half = w / 2;
  const r = half * 1.14;
  const rise = Math.sqrt(r * r - half * half);
  const spring = bottom - h + r + rise;
  return `M${cx - half} ${bottom}V${spring.toFixed(1)}A${r.toFixed(1)} ${r.toFixed(1)} 0 1 1 ${cx + half} ${spring.toFixed(1)}V${bottom}`;
}

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

function minaret(x: number) {
  return [
    `M${x - 14} 500V200H${x + 14}V500`,
    `M${x - 22} 200H${x + 22}V188H${x - 22}Z`,
    `M${x - 9} 188V132H${x + 9}V188`,
    `M${x - 16} 132H${x + 16}V124H${x - 16}Z`,
    circle(x, 104, 19),
    `M${x} 85V66`,
    circle(x, 62, 3.5),
  ];
}

function buildElevation() {
  const p: string[] = [];
  p.push(`M40 ${G}H1160`);
  p.push(`M110 ${G}V500H1090V${G}`);
  for (let x = 130; x <= 1030; x += 60) p.push(`M${x} ${G}V526Q${x + 20} 508 ${x + 40} 526V${G}`);

  // outer wings with arcades
  p.push("M150 500V380H300", "M900 380H1050V500");
  [182, 225, 268, 932, 975, 1018].forEach((cx) => p.push(keyhole(cx, 490, 30, 80)));

  // side blocks, windows and small domes
  p.push("M300 500V300H490", "M710 300H900V500");
  [350, 440, 760, 850].forEach((cx) => p.push(keyhole(cx, 480, 50, 140)));
  [395, 805].forEach((cx) => {
    p.push(`M${cx - 35} 300A35 35 0 0 1 ${cx + 35} 300`, `M${cx} 265V246`, circle(cx, 241, 4));
  });

  // central block, double keyhole portal, drum and dome
  p.push("M490 500V230H710V500");
  p.push(keyhole(600, 500, 132, 236), keyhole(600, 500, 108, 212));
  p.push("M545 230V212H655V230", "M545 212A55 55 0 0 1 655 212", "M600 157V130", circle(600, 123, 6));

  // minarets
  p.push(...minaret(130), ...minaret(1070));
  return p;
}

const elevation = buildElevation();
const columns = [
  { x: 150, l: "A" },
  { x: 300, l: "B" },
  { x: 490, l: "C" },
  { x: 710, l: "D" },
  { x: 900, l: "E" },
  { x: 1050, l: "F" },
];
const levels = [
  { y: G, l: "LVL 00" },
  { y: 500, l: "LVL 01" },
  { y: 230, l: "LVL 04" },
  { y: 104, l: "CROWN" },
];

export default function Elevation() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const readout = root.current!.querySelector<HTMLElement>(".el-readout")!;
      const state = { p: 0 };
      gsap.set(".el-path", { strokeDasharray: 1, strokeDashoffset: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.9 },
      });
      tl.to(".el-path", { strokeDashoffset: 0, stagger: { amount: 0.42 }, duration: 0.3 }, 0)
        .to(state, {
          p: 100,
          duration: 0.75,
          onUpdate: () => {
            readout.textContent = String(Math.round(state.p)).padStart(3, "0");
          },
        }, 0)
        .fromTo(".el-note", { opacity: 0 }, { opacity: 1, stagger: 0.03, duration: 0.12 }, 0.12)
        .fromTo(".el-photo", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.22, ease: "power2.inOut" }, 0.76)
        .fromTo(".el-photo-img", { scale: 1.2 }, { scale: 1, duration: 0.3 }, 0.76)
        .to(".el-svg", { color: "#f1ece3", opacity: 0.55, duration: 0.15 }, 0.82)
        .to(".el-note", { opacity: 0, duration: 0.1 }, 0.82)
        .fromTo(".el-caption", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.9)
        .to(".el-stage-label", { autoAlpha: 0, duration: 0.08 }, 0.9);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[340vh] bg-paper">
      <div className="blueprint sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-24 md:px-8 md:pb-8 md:pt-28">
        <div className="grid gap-4 md:grid-cols-12">
          <span className="eyebrow text-stone md:col-span-3">(02) From line to landmark</span>
          <h2 className="display text-4xl leading-[0.95] md:col-span-6 md:text-[4.2vw]" data-reveal="words">
            <Words text="Every landmark begins" /> <em className="italic"><Words text="as a single line." /></em>
          </h2>
          <p className="max-w-[34ch] text-[0.9rem] leading-relaxed text-ink-2 md:col-span-3">
            Contemporary design, drawn with deep respect for traditional architecture — then engineered with
            cutting-edge technology and delivered on time.
          </p>
        </div>

        <div className="relative mx-auto mt-6 flex w-full flex-1 items-center justify-center">
          <div
            className="relative"
            style={{ width: "min(100%, calc((100svh - 300px) * 1.935))", aspectRatio: "1200 / 620" }}
          >
            <div className="el-photo absolute inset-0 overflow-hidden rounded-[10px]">
              <div className="el-photo-img absolute inset-0">
                <Image
                  src={images.culturalCentre}
                  alt="The Cultural Centre, Markaz Knowledge City"
                  fill
                  sizes="(min-width: 768px) 80vw, 100vw"
                  className="object-cover object-[50%_75%]"
                />
              </div>
              <div className="absolute inset-0 bg-ink/30" />
            </div>

            <svg viewBox="0 0 1200 620" className="el-svg absolute inset-0 h-full w-full text-ink" fill="none">
              {/* grid bubbles + dashed column lines */}
              {columns.map((c) => (
                <g key={c.l} className="el-note">
                  <line x1={c.x} x2={c.x} y1={34} y2={G + 18} stroke="currentColor" strokeOpacity="0.28" strokeDasharray="3 7" />
                  <circle cx={c.x} cy={22} r={11} stroke="currentColor" strokeOpacity="0.6" />
                  <text x={c.x} y={26} textAnchor="middle" fontSize="11" fill="currentColor" className="font-mono">
                    {c.l}
                  </text>
                </g>
              ))}
              {/* level markers */}
              {levels.map((lv) => (
                <g key={lv.l} className="el-note">
                  <line x1={1100} x2={1180} y1={lv.y} y2={lv.y} stroke="currentColor" strokeOpacity="0.5" />
                  <path d={`M1104 ${lv.y - 9}h12l-6 9z`} fill="currentColor" fillOpacity="0.6" />
                  <text x={1122} y={lv.y - 4} fontSize="10" fill="currentColor" fillOpacity="0.7" className="font-mono">
                    {lv.l}
                  </text>
                </g>
              ))}
              <g className="el-note">
                <line x1={110} x2={1090} y1={596} y2={596} stroke="currentColor" strokeOpacity="0.5" />
                <path d="M110 589v14M1090 589v14M600 591v10" stroke="currentColor" strokeOpacity="0.5" />
                <text x={600} y={614} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.7" className="font-mono">
                  ELEVATION A — CULTURAL CENTRE
                </text>
              </g>
              {/* the building itself */}
              {elevation.map((d, i) => (
                <path key={i} d={d} pathLength={1} className="el-path" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              ))}
            </svg>

            <div className="el-caption invisible absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 text-bone md:p-7">
              <p className="display text-3xl md:text-5xl">
                India&apos;s biggest <em>Cultural Centre</em>
              </p>
              <span className="eyebrow text-bone/70">Markaz Knowledge City, Calicut</span>
            </div>
          </div>
        </div>

        <div className="el-stage-label mt-4 flex items-baseline justify-between">
          <span className="eyebrow text-stone">Sheet 01 / Elevation</span>
          <span className="eyebrow text-stone">
            Drawn <span className="el-readout nums">000</span>%
          </span>
        </div>
      </div>
    </section>
  );
}
