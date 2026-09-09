import type { PortfolioProject } from "@/data/projects";
import ArchitectureFlow from "@/components/three/ArchitectureFlow";
import Reveal from "@/components/ui/Reveal";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-white/[0.08] pl-4">
      <p className="font-mono text-fluid-lg text-chalk">{value}</p>
      <p className="mono-label mt-1">{label}</p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mono-label text-signal">{title}</p>
      <div className="mt-2 body-base text-mist">{children}</div>
    </div>
  );
}

export default function FlagshipProject({
  project,
  order,
}: {
  project: PortfolioProject;
  order: number;
}) {
  const stats: { label: string; value: string }[] = [];
  if (project.stars !== undefined) stats.push({ label: "stars", value: `${project.stars}` });
  if (project.forks !== undefined) stats.push({ label: "forks", value: `${project.forks}` });
  // Pull one headline evidence number when available.
  const evidenceHead = project.evidence[0];

  return (
    <article className="border-t border-white/[0.06] py-20 md:py-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: identity + big type */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="section-index">
                LEVEL 01 · FLAGSHIP {String(order).padStart(2, "0")}
              </span>
            </div>
            <p className="eyebrow mt-6">{project.category}</p>
            <h3 className="display mt-3 text-fluid-4xl text-chalk text-balance">
              {project.title}
            </h3>
            <p className="mt-5 body-lg text-mist">{project.tagline}</p>

            {stats.length > 0 && (
              <div className="mt-8 flex gap-8">
                {stats.map((s) => (
                  <Stat key={s.label} label={s.label} value={s.value} />
                ))}
                <div className="border-l border-white/[0.08] pl-4">
                  <p className="font-mono text-fluid-sm text-chalk">{project.language}</p>
                  <p className="mono-label mt-1">{project.status}</p>
                </div>
              </div>
            )}

            {/* Architecture visualization */}
            <div className="mt-10 rounded-xl border border-white/[0.06] bg-graphite/50 p-6">
              <p className="mono-label mb-3">Control flow</p>
              <ArchitectureFlow flow={project.flow} />
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded border border-white/10 px-5 py-3 font-mono text-fluid-sm uppercase tracking-wider text-chalk transition-colors hover:border-signal/50 hover:text-signal"
            >
              View repository ↗
            </a>
          </Reveal>
        </div>

        {/* Right: the teaching content */}
        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Block title="Problem">{project.problem}</Block>
              <Block title="System">{project.system}</Block>
            </div>

            <div className="mt-8">
              <Block title="Architecture">{project.architecture}</Block>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="mono-label text-signal">Threat model</p>
                <ul className="mt-3 space-y-2">
                  {project.threatModel.map((tItem) => (
                    <li key={tItem} className="flex gap-2.5 body-base">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-block" />
                      {tItem}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mono-label text-signal">Controls</p>
                <ul className="mt-3 space-y-2">
                  {project.controls.map((c) => (
                    <li key={c} className="flex gap-2.5 body-base">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-allow" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-white/[0.06] bg-ink/60 p-6">
              <p className="mono-label text-signal">Evidence (committed to the repo)</p>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {project.evidence.map((e) => (
                  <li key={e} className="flex gap-2.5 body-base">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-signal" />
                    {e}
                  </li>
                ))}
              </ul>
              {evidenceHead && (
                <p className="mt-4 border-t border-white/[0.06] pt-4 font-mono text-fluid-xs text-ash">
                  Frameworks: {project.frameworks.join(" · ")}
                </p>
              )}
            </div>

            <details className="mt-6 group">
              <summary className="cursor-pointer font-mono text-fluid-xs uppercase tracking-wider text-ash transition-colors hover:text-mist">
                Honest limitations →
              </summary>
              <ul className="mt-3 space-y-2">
                {project.limitations.map((l) => (
                  <li key={l} className="flex gap-2.5 body-base text-ash">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-warn" />
                    {l}
                  </li>
                ))}
              </ul>
            </details>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
