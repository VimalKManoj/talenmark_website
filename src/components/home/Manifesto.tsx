import ScrubText from "@/components/motion/ScrubText";
import { Words } from "@/components/motion/Split";
import { images } from "@/lib/content";

export default function Manifesto() {
  return (
    <section id="about" className="relative bg-bone px-5 pb-28 pt-28 md:px-8 md:pb-40 md:pt-44">
      <div className="mb-14 flex items-baseline justify-between md:mb-20">
        <span className="eyebrow text-stone" data-reveal="up">
          (About the Group)
        </span>
        <span className="eyebrow text-stone" data-reveal="up" data-delay="0.1">
          11.25° N — 75.78° E
        </span>
      </div>

      <ScrubText
        className="display max-w-[30ch] text-[2.6rem] leading-[1.02] md:indent-[18%] md:text-[5.4vw] md:leading-[0.98]"
        segments={[
          "Founded in Calicut in 2014,",
          { image: images.culturalCentre, position: "50% 70%" },
          "Talenmark began as a game-changer in Kerala's real estate. Today the group shapes landmarks and retreats",
          { image: images.chilgroveVilla, position: "50% 40%" },
          "across South India — bridging the past with the present to build a sustainable, prosperous future.",
        ]}
      />

      <div className="mt-24 grid gap-14 md:mt-36 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <div className="h-px w-full bg-ink/15" data-reveal="line" />
          <p className="eyebrow mt-4 text-stone" data-reveal="up">
            Our ethos
          </p>
        </div>
        <div className="md:col-span-4 md:col-start-6">
          <div className="h-px w-full bg-ink/15" data-reveal="line" />
          <h3 className="display mt-6 text-4xl md:text-5xl" data-reveal="words">
            <Words text="Vision" />
          </h3>
          <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-ink-2" data-reveal="up" data-delay="0.1">
            To be a globally recognised leader across diverse sectors — creating sustainable, innovative and
            world-class solutions that elevate the quality of life for the communities we serve.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-10">
          <div className="h-px w-full bg-ink/15" data-reveal="line" />
          <h3 className="display mt-6 text-4xl md:text-5xl" data-reveal="words">
            <Words text="Mission" />
          </h3>
          <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-ink-2" data-reveal="up" data-delay="0.15">
            To use natural resources responsibly, adopt cutting-edge technologies and create eco-friendly
            ecosystems — sparing a thought for the generations yet to come.
          </p>
        </div>
      </div>
    </section>
  );
}
