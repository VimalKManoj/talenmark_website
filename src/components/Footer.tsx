import { contact, verticals } from "@/lib/content";
import TransitionLink from "@/components/TransitionLink";
import Clock from "@/components/Clock";
import BackToTop from "@/components/BackToTop";
import { Words } from "@/components/motion/Split";

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink px-5 pt-28 text-bone md:px-8 md:pt-40">
      <div className="grid gap-12 md:grid-cols-12">
        <span className="eyebrow text-bone/45 md:col-span-3" data-reveal="up">
          (Get in touch)
        </span>
        <div className="md:col-span-9">
          <h2 className="display text-[13vw] leading-[0.9] md:text-[7.4vw]" data-reveal="words">
            <Words text="Let's build" /> <br />
            <em className="italic text-bone/80">
              <Words text="what lasts." />
            </em>
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="group mt-10 inline-flex items-center gap-4 text-xl md:text-3xl"
            data-reveal="up"
            data-cursor="Write"
          >
            <span className="link-underline">{contact.email}</span>
            <svg
              viewBox="0 0 16 16"
              className="h-5 w-5 -rotate-45 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M2 8h12M9 3l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-10 border-t border-bone/10 pt-10 text-[0.92rem] md:mt-32 md:grid-cols-12">
        <div className="col-span-2 md:col-span-3" data-reveal="up">
          <p className="eyebrow mb-4 text-bone/40">Head office</p>
          <p className="leading-relaxed text-bone/80">
            {contact.company}
            <br />
            {contact.address.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="md:col-span-3" data-reveal="up" data-delay="0.05">
          <p className="eyebrow mb-4 text-bone/40">Contact</p>
          <a href={contact.phoneHref} className="link-underline block w-fit text-bone/80">
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="link-underline mt-1 block w-fit text-bone/80">
            {contact.email}
          </a>
        </div>
        <div className="md:col-span-3" data-reveal="up" data-delay="0.1">
          <p className="eyebrow mb-4 text-bone/40">Verticals</p>
          {verticals.map((v) => (
            <TransitionLink key={v.slug} href={v.href} className="mb-1 flex w-fit items-baseline gap-2 text-bone/80">
              <span className="eyebrow text-bone/35">{v.index}</span>
              <span className="link-underline">{v.short}</span>
            </TransitionLink>
          ))}
        </div>
        <div className="md:col-span-3" data-reveal="up" data-delay="0.15">
          <p className="eyebrow mb-4 text-bone/40">Local time</p>
          <p className="display text-4xl text-bone/90">
            <Clock seconds />
          </p>
          <p className="eyebrow mt-2 text-bone/40">Calicut, IST (GMT+5:30)</p>
        </div>
      </div>

      <div className="mt-24 flex justify-between text-[14vw] font-bold leading-[0.8] tracking-tight text-bone md:mt-32 md:text-[15.2vw]" data-reveal="chars" aria-label="Talenmark">
        {Array.from("TALENMARK").map((ch, i) => (
          <span key={i} className="mask" aria-hidden="true">
            <span className="char inline-block">{ch}</span>
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t border-bone/10 py-6 text-[0.8rem] text-bone/45 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} {contact.company}</span>
        <span className="display text-base italic text-bone/60">Building the future, preserving the legacy.</span>
        <BackToTop />
      </div>
    </footer>
  );
}
