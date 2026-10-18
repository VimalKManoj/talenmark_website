import SplitHero from "@/components/home/SplitHero";
import Manifesto from "@/components/home/Manifesto";
import Facts from "@/components/home/Facts";
import VerticalStack from "@/components/home/VerticalStack";
import Landmark from "@/components/home/Landmark";
import PromiseSection from "@/components/home/Promise";
import Marquee from "@/components/Marquee";
import Awards from "@/components/Awards";
import Footer from "@/components/Footer";
import PageMotion from "@/components/motion/PageMotion";
import { values } from "@/lib/content";

export default function Home() {
  return (
    <main>
      <SplitHero />
      <PageMotion>
        <Manifesto />
        <Facts />
        <VerticalStack />
        <Landmark />
        <section className="bg-bone py-20 md:py-28">
          <p className="eyebrow mb-8 px-5 text-stone md:px-8">(What we stand on)</p>
          <Marquee words={values} className="display text-[18vw] italic leading-[1.05] text-ink md:text-[11vw]" />
        </section>
        <Awards />
        <PromiseSection />
        <Footer />
      </PageMotion>
    </main>
  );
}
