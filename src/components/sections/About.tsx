import { ABOUT, PROFILE, TIMELINE, STORY } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

const KIND_LABEL: Record<string, string> = {
  education: "Education",
  publication: "Publication",
  award: "Award",
  credential: "Credential",
};

export default function About() {
  return (
    <section id="about" className="section-pad relative border-t border-white/[0.06]">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Calmer narrative */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="section-index">/ {STORY.about}</p>
              <h2 className="display mt-4 text-fluid-3xl text-chalk text-balance">
                {PROFILE.name}
              </h2>
              <p className="mt-3 font-mono text-fluid-sm text-signal">{PROFILE.role}</p>

              <div className="mt-8 space-y-5">
                {ABOUT.narrative.map((para) => (
                  <p key={para} className="body-lg text-mist">
                    {para}
                  </p>
                ))}
              </div>

              <blockquote className="mt-8 border-l-2 border-signal/50 pl-5">
                <p className="text-fluid-lg text-chalk text-balance">
                  &ldquo;{ABOUT.philosophy}&rdquo;
                </p>
              </blockquote>

              <div className="mt-8">
                <a
                  href="/Pooja_KIRAN_Security_Engineer.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded border border-signal/40 bg-signal/10 px-6 py-3 font-mono text-fluid-sm uppercase tracking-wider text-signal transition-colors hover:bg-signal/20"
                >
                  ↓ Download Résumé
                </a>
              </div>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <p className="mono-label">Background</p>
              <ol className="mt-6 space-y-0">
                {TIMELINE.map((item) => (
                  <li
                    key={item.title}
                    className="relative border-l border-white/[0.08] pb-8 pl-6 last:pb-0"
                  >
                    <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-signal/60 bg-void" />
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-fluid-sm text-signal">{item.period}</span>
                      <span className="font-mono text-fluid-xs uppercase tracking-wider text-ash">
                        {KIND_LABEL[item.kind]}
                      </span>
                    </div>
                    <p className="mt-1 text-fluid-lg text-chalk">{item.title}</p>
                    <p className="font-mono text-fluid-xs text-mist">{item.org}</p>
                    <p className="mt-1.5 body-base">{item.detail}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
