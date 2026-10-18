import Image from "next/image";
import { images, redCrop } from "@/lib/content";
import { Words } from "@/components/motion/Split";

const spec = [
  ["Typology", "Cultural Centre"],
  ["Setting", "Markaz Knowledge City"],
  ["Location", "Kaithapoyil, Calicut"],
  ["Coordinates", "11.48° N, 75.94° E"],
  ["Ambition", "India's biggest of its kind"],
];

export default function CulturalCentre() {
  return (
    <section className="relative bg-ink px-5 py-28 text-bone md:px-8 md:py-40">
      <div className="grid gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <span className="eyebrow text-bone/45" data-reveal="up">
              (04) Featured landmark
            </span>
            <h2 className="display mt-6 text-5xl leading-[0.95] md:text-[4.8vw]" data-reveal="words">
              <Words text="Bridging past" /> <br />
              <em className="italic text-bone/75">
                <Words text="with present," />
              </em>{" "}
              <br />
              <Words text="for the future." />
            </h2>
            <p className="mt-8 max-w-[44ch] text-[1rem] leading-relaxed text-bone/70" data-reveal="up">
              In the heart of Markaz Knowledge City, Talenmark Builders is creating India&apos;s biggest Cultural Centre
              of its kind — intended to attract the world with its architectural beauty and its core values.
            </p>
            <dl className="mt-12 border-t border-bone/10">
              {spec.map(([k, v], i) => (
                <div key={k} className="flex justify-between gap-6 border-b border-bone/10 py-3.5" data-reveal="up" data-delay={i * 0.05}>
                  <dt className="eyebrow text-bone/45">{k}</dt>
                  <dd className="text-right text-[0.92rem] text-bone/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:col-span-6 md:col-start-7 md:gap-8">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[14px]" data-reveal="clip">
            <div className="absolute inset-x-0 -inset-y-[10%]" data-parallax="7">
              <div className="absolute inset-0" data-clip-media>
                <Image
                  src={images.culturalCentreRed}
                  alt="Courtyard arches of the Cultural Centre"
                  fill
                  sizes="(min-width: 768px) 90vw, 100vw"
                  className="object-cover"
                  style={redCrop}
                />
              </div>
            </div>
            <figcaption className="eyebrow absolute bottom-4 left-4 rounded-full bg-ink/40 px-3 py-1.5 backdrop-blur-md">
              Courtyard — study
            </figcaption>
          </figure>
          <figure className="relative ml-auto aspect-[16/10] w-[78%] overflow-hidden rounded-[14px]" data-reveal="clip">
            <div className="absolute inset-0" data-clip-media>
              <Image
                src={images.culturalCentre}
                alt="Main elevation of the Cultural Centre"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
            <figcaption className="eyebrow absolute bottom-4 left-4 rounded-full bg-ink/40 px-3 py-1.5 backdrop-blur-md">
              Main elevation
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
