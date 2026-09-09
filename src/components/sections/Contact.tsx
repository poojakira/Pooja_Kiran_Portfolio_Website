import { PROFILE, OPEN_TO, STORY } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative border-t border-white/[0.06]">
      <div className="container-editorial">
        <Reveal>
          <p className="section-index">/ {STORY.contact}</p>
          <h2 className="display mt-4 max-w-[16ch] text-fluid-4xl text-chalk text-balance">
            Let&apos;s build the boundary before something crosses it.
          </h2>
          <p className="mt-6 max-w-prose body-lg">
            I&apos;m looking for teams working where AI systems, software systems, and
            security boundaries intersect.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2">
            {OPEN_TO.map((role) => (
              <span
                key={role}
                className="rounded-full border border-white/[0.08] px-4 py-1.5 font-mono text-fluid-xs uppercase tracking-wider text-mist"
              >
                {role}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded border border-signal/40 bg-signal/10 px-6 py-3 font-mono text-fluid-sm uppercase tracking-wider text-signal transition-colors hover:bg-signal/20"
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-fluid-sm uppercase tracking-wider text-mist transition-colors hover:text-chalk"
            >
              LinkedIn ↗
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-fluid-sm uppercase tracking-wider text-mist transition-colors hover:text-chalk"
            >
              GitHub ↗
            </a>
            <a
              href="/Pooja_KIRAN_Security_Engineer.pdf"
              download
              className="font-mono text-fluid-sm uppercase tracking-wider text-mist transition-colors hover:text-chalk"
            >
              ↓ Résumé
            </a>
          </div>
          <p className="mt-8 font-mono text-fluid-xs text-ash">
            {PROFILE.location} · {PROFILE.availability}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
