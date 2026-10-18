import type { Metadata } from "next";
import VerticalHero from "@/components/VerticalHero";
import PageMotion from "@/components/motion/PageMotion";
import ScrubText from "@/components/motion/ScrubText";
import Altitude from "@/components/hospitality/Altitude";
import Chilgrove from "@/components/hospitality/Chilgrove";
import Offerings from "@/components/hospitality/Offerings";
import Marquee from "@/components/Marquee";
import NextVertical from "@/components/NextVertical";
import Footer from "@/components/Footer";
import { images, verticals } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sanctuary — Hospitality",
  description:
    "Talenmark Hospitality: premium resorts, luxury hotels and wellness retreats that blend with nature — beginning with Talenmark Chilgrove, 2,600 ft up in Vythiri, Wayanad.",
};

const [structure, sanctuary] = verticals;

export default function HospitalityPage() {
  return (
    <main className="bg-forest text-mist">
      <VerticalHero
        vertical={sanctuary}
        meta={[
          { label: "Vertical", value: "Talenmark Hospitality" },
          { label: "Signature", value: "Talenmark Chilgrove" },
          { label: "Setting", value: "Vythiri, Wayanad" },
          { label: "Altitude", value: "2,600 ft above sea level" },
        ]}
      >
        <div className="mist-layer mist-a" />
        <div className="mist-layer mist-b" />
      </VerticalHero>

      <PageMotion>
        <section className="relative overflow-hidden bg-forest px-5 pb-28 pt-28 md:px-8 md:pb-40 md:pt-44">
          <div className="mb-14 flex items-baseline justify-between md:mb-20">
            <span className="eyebrow text-mist/50" data-reveal="up">
              (01) A new vertical
            </span>
            <span className="eyebrow text-mist/50" data-reveal="up">
              Resorts · Hotels · Retreats
            </span>
          </div>
          <ScrubText
            dim={0.18}
            className="display max-w-[30ch] text-[2.5rem] leading-[1.02] md:indent-[18%] md:text-[5.2vw] md:leading-[0.98]"
            segments={[
              "Modern travellers seek experiences that rejuvenate the mind",
              { image: images.chilgroveVilla, position: "50% 45%" },
              "and soul — so we are building resorts, hotels and retreats that blend seamlessly",
              { image: images.chilgroveAerial, position: "70% 50%" },
              "with nature.",
            ]}
          />
        </section>

        <Altitude />
        <Chilgrove />
        <Offerings />

        <section className="bg-forest py-20 md:py-28">
          <Marquee
            words={["Mist", "Forest", "Stillness", "Restoration"]}
            className="display text-[18vw] italic leading-[1.05] text-mist/90 md:text-[11vw]"
            markColor="#a65236"
          />
        </section>

        <NextVertical vertical={structure} tone="forest" />
        <Footer />
      </PageMotion>
    </main>
  );
}
