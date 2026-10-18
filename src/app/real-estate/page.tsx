import type { Metadata } from "next";
import VerticalHero from "@/components/VerticalHero";
import PageMotion from "@/components/motion/PageMotion";
import ScrubText from "@/components/motion/ScrubText";
import Elevation from "@/components/real-estate/Elevation";
import Specialisations from "@/components/real-estate/Specialisations";
import CulturalCentre from "@/components/real-estate/CulturalCentre";
import Principles from "@/components/real-estate/Principles";
import Awards from "@/components/Awards";
import NextVertical from "@/components/NextVertical";
import Footer from "@/components/Footer";
import { images, verticals } from "@/lib/content";

export const metadata: Metadata = {
  title: "Structure — Real Estate, Construction & Township Development",
  description:
    "Talenmark Builders: award-winning residences, commercial spaces and landmark developments in Calicut — including India's biggest Cultural Centre.",
};

const [structure, sanctuary] = verticals;

export default function RealEstatePage() {
  return (
    <main className="bg-paper">
      <VerticalHero
        vertical={structure}
        meta={[
          { label: "Practice", value: "Talenmark Builders" },
          { label: "Focus", value: "Residential · Commercial · Landmark" },
          { label: "Base", value: "Calicut, Kerala" },
          { label: "Standing", value: "Award-winning, RERA compliant" },
        ]}
      />
      <PageMotion>
        <section className="bg-paper px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-44">
          <div className="mb-14 flex items-baseline justify-between md:mb-20">
            <span className="eyebrow text-stone" data-reveal="up">
              (01) The practice
            </span>
            <span className="eyebrow text-stone" data-reveal="up">
              Since 2014
            </span>
          </div>
          <ScrubText
            className="display max-w-[30ch] text-[2.5rem] leading-[1.02] md:indent-[18%] md:text-[5.2vw] md:leading-[0.98]"
            segments={[
              "We craft spaces that carry elegance, novelty",
              { image: images.chilgroveVilla, position: "50% 45%" },
              "and contemporary design — while respecting the traditional architecture",
              { image: images.culturalCentre, position: "50% 60%" },
              "that shaped Kerala.",
            ]}
          />
          <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
            <p className="text-[1.02rem] leading-relaxed text-ink-2 md:col-span-4 md:col-start-6" data-reveal="up">
              Founded on trust, truthfulness, integrity and innovation, Talenmark began as a game-changer in the real
              estate and construction sector of Kerala — serving home buyers who seek everything from traditional
              styles to contemporary design.
            </p>
            <p className="text-[1.02rem] leading-relaxed text-ink-2 md:col-span-3" data-reveal="up" data-delay="0.1">
              Today our portfolio spans luxury villas, premium apartments, commercial hubs and township-scale
              developments — with India&apos;s biggest Cultural Centre among them.
            </p>
          </div>
        </section>
        <Elevation />
        <Specialisations />
        <CulturalCentre />
        <Principles />
        <Awards />
        <NextVertical vertical={sanctuary} />
        <Footer />
      </PageMotion>
    </main>
  );
}
