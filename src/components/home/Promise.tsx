import { Words } from "@/components/motion/Split";
import { LogoMark } from "@/components/Logo";

export default function PromiseSection() {
  return (
    <section className="relative overflow-hidden bg-bone px-5 py-32 md:px-8 md:py-48">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center">
        <div data-reveal="up">
          <LogoMark className="h-10 w-10" />
        </div>
        <span className="eyebrow mt-8 text-stone" data-reveal="up" data-delay="0.05">
          (The Talenmark Promise)
        </span>
        <h2 className="display mt-10 text-[2.7rem] leading-[1.02] md:text-[4.8vw]" data-reveal="words">
          <Words text="We don't just build structures or businesses —" />{" "}
          <em className="italic text-red">
            <Words text="we build lasting relationships." />
          </em>
        </h2>
        <p className="mt-10 max-w-[52ch] text-[1rem] leading-relaxed text-ink-2" data-reveal="up">
          As we grow into new horizons — hospitality today, healthcare next — our philosophy is unchanged: deliver
          excellence, foster sustainable growth, and create spaces, physical and experiential, that leave a lasting
          positive impact.
        </p>
      </div>
    </section>
  );
}
