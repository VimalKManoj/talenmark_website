import { awards } from "@/lib/content";
import { Words } from "@/components/motion/Split";

export default function Awards({ tone = "light" }: { tone?: "light" | "forest" }) {
  const t =
    tone === "forest"
      ? { bg: "bg-forest text-mist", muted: "text-mist/50", rule: "border-mist/15", fill: "bg-mist", hover: "group-hover:text-forest" }
      : { bg: "bg-bone text-ink", muted: "text-stone", rule: "border-ink/15", fill: "bg-ink", hover: "group-hover:text-bone" };

  return (
    <section className={`${t.bg} px-5 py-28 md:px-8 md:py-40`}>
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className={`eyebrow ${t.muted}`} data-reveal="up">
            (Recognition)
          </span>
          <h2 className="display mt-6 text-5xl md:text-[4.6vw]" data-reveal="words">
            <Words text="Built on" /> <em className="italic"><Words text="merit." /></em>
          </h2>
          <p className={`mt-6 max-w-[34ch] text-[0.95rem] leading-relaxed ${t.muted}`} data-reveal="up">
            Our pursuit of excellence and timely delivery has won the hearts of our customers — and the industry&apos;s
            attention.
          </p>
        </div>

        <ul className={`border-t ${t.rule} md:col-span-7 md:col-start-6`}>
          {awards.map((a, i) => (
            <li key={a.title} className={`group relative overflow-hidden border-b ${t.rule}`} data-reveal="up" data-delay={i * 0.06}>
              <span
                className={`absolute inset-0 origin-bottom scale-y-0 ${t.fill} transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100`}
              />
              <div
                className={`relative grid grid-cols-12 items-baseline gap-4 px-1 py-6 transition-[color,padding] duration-700 ease-[var(--ease-expo)] group-hover:px-5 md:py-8 ${t.hover}`}
              >
                <span className="eyebrow col-span-3 opacity-60 md:col-span-2">{a.year}</span>
                <span className="display col-span-9 text-3xl leading-tight md:col-span-6 md:text-[2.6vw]">{a.title}</span>
                <span className="eyebrow col-span-9 col-start-4 opacity-60 md:col-span-4 md:col-start-auto md:text-right">
                  {a.by}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
