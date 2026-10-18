import { Words } from "@/components/motion/Split";

const principles = [
  {
    title: "Contemporary, rooted",
    text: "Contemporary design that respects traditional architecture — spaces with elegance and novelty in equal measure.",
  },
  {
    title: "Responsible by nature",
    text: "We use natural resources responsibly and create eco-friendly ecosystems, sparing a thought for generations to come.",
  },
  {
    title: "Engineered forward",
    text: "Cutting-edge technologies across design and construction, and a team of dynamic professionals behind every site.",
  },
  {
    title: "Delivered on time",
    text: "A customer-centric approach and timely delivery that have won us many admirers — and the industry's recognition.",
  },
];

export default function Principles() {
  return (
    <section className="bg-paper px-5 py-28 md:px-8 md:py-40">
      <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12">
        <span className="eyebrow text-stone md:col-span-3" data-reveal="up">
          (05) How we work
        </span>
        <h2 className="display text-5xl md:col-span-8 md:text-[5vw]" data-reveal="words">
          <Words text="Trust is the" /> <em className="italic"><Words text="first foundation." /></em>
        </h2>
      </div>
      <div className="grid gap-12 md:grid-cols-4 md:gap-8">
        {principles.map((p, i) => (
          <div key={p.title}>
            <div className="h-px w-full bg-ink/20" data-reveal="line" data-delay={i * 0.1} />
            <div className="pt-6" data-reveal="up" data-delay={0.2 + i * 0.08}>
              <span className="display nums text-6xl text-red/90">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display mt-8 text-3xl">{p.title}</h3>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
