import { SYSTEM_CATEGORIES, STORY } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

export default function Systems() {
  return (
    <section id="systems" className="section-pad relative border-t border-white/[0.06]">
      <div className="container-editorial">
        <Reveal>
          <p className="section-index">/ {STORY.systems}</p>
          <h2 className="display mt-4 max-w-[16ch] text-fluid-3xl text-chalk text-balance">
            What I build
          </h2>
          <p className="mt-6 max-w-prose body-base">
            Four systems, one boundary problem: the point where an AI system stops
            predicting and starts acting on real infrastructure. Each category below
            is backed by shipped, tested, open-source code — not a topic list.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04] md:grid-cols-2">
          {SYSTEM_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 80} className="bg-graphite/60">
              <div className="group h-full p-8 transition-colors hover:bg-slate/60">
                <div className="flex items-baseline justify-between">
                  <span className="section-index">{cat.index}</span>
                  <span className="font-mono text-fluid-xs text-ash">
                    {cat.repos.length} repo{cat.repos.length > 1 ? "s" : ""}
                  </span>
                </div>
                <h3 className="mt-4 text-fluid-xl text-chalk">{cat.title}</h3>
                <p className="mt-3 body-base">{cat.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cat.repos.map((r) => (
                    <span
                      key={r}
                      className="rounded border border-white/[0.06] bg-void/60 px-2.5 py-1 font-mono text-fluid-xs text-mist"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
