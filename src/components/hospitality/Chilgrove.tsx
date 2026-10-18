import Image from "next/image";
import { images } from "@/lib/content";
import { Chars, Words } from "@/components/motion/Split";

const facts = [
  ["Villas", "24 independent resort villas"],
  ["Standard", "Four-star facilities"],
  ["Altitude", "2,600 ft above sea level"],
  ["Setting", "Western Ghats — UNESCO World Heritage site"],
  ["Ecology", "Near one of the world's eight biodiversity hotspots"],
];

export default function Chilgrove() {
  return (
    <section className="relative overflow-hidden bg-mist px-5 py-28 text-forest md:px-8 md:py-40">
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-forest/55" data-reveal="up">
          (03) Signature project
        </span>
        <span className="eyebrow text-forest/55" data-reveal="up">
          Vythiri, Wayanad
        </span>
      </div>

      <h2 className="display mt-10 text-center text-[22vw] leading-[0.8] md:text-[17vw]" data-reveal="chars">
        <Chars text="Chilgrove" />
      </h2>
      <p className="display mt-8 text-center text-2xl italic text-forest/70 md:mt-10 md:text-3xl" data-reveal="up">
        Talenmark Chilgrove — four-star resort villas in the mist-clad hills
      </p>

      <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-12 md:gap-8">
        <figure className="relative aspect-[4/3] overflow-hidden rounded-[16px] md:col-span-5" data-reveal="clip">
          <div className="absolute inset-0" data-clip-media>
            <Image
              src={images.chilgroveVilla}
              alt="A Chilgrove villa: brick, timber screens and sweeping white shells"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="eyebrow absolute bottom-4 left-4 rounded-full bg-forest/40 px-3 py-1.5 text-mist backdrop-blur-md">
            Villa — brick, timber, shell
          </figcaption>
        </figure>

        <div className="flex flex-col justify-between gap-12 md:col-span-6 md:col-start-7">
          <p className="display text-3xl leading-[1.12] md:text-[2.5vw]" data-reveal="words">
            <Words text="A cluster of independent villas, set 2,600 feet above sea level amidst the mesmerising mist-clad hills of Vythiri." />
          </p>
          <dl className="border-t border-forest/15">
            {facts.map(([k, v], i) => (
              <div key={k} className="grid grid-cols-3 gap-4 border-b border-forest/15 py-4" data-reveal="up" data-delay={i * 0.05}>
                <dt className="eyebrow text-forest/50">{k}</dt>
                <dd className="col-span-2 text-[0.95rem]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <figure className="relative mt-20 h-[70svh] overflow-hidden rounded-[16px] md:mt-28" data-reveal="clip">
        <div className="absolute inset-x-0 -inset-y-[14%]" data-parallax="9">
          <div className="absolute inset-0" data-clip-media>
            <Image
              src={images.chilgroveAerial}
              alt="Chilgrove from above: villas, pool and forest"
              fill
              sizes="100vw"
              className="scale-[1.25] object-cover object-[30%_40%]"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 text-mist md:p-8">
          <span className="display text-3xl italic md:text-5xl">Sustainable, luxury eco-tourism.</span>
          <span className="eyebrow text-mist/70">Masterplan view</span>
        </figcaption>
      </figure>
    </section>
  );
}
