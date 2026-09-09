import { FLAGSHIP_PROJECTS } from "@/data/projects";
import { STORY } from "@/data/content";
import FlagshipProject from "./FlagshipProject";
import Reveal from "@/components/ui/Reveal";

export default function Flagships() {
  return (
    <section id="work" className="section-pad relative border-t border-white/[0.06]">
      <div className="container-editorial">
        <Reveal>
          <p className="section-index">/ {STORY.projects}</p>
          <h2 className="display mt-4 max-w-[20ch] text-fluid-3xl text-chalk text-balance">
            Three flagship systems, guarding three different boundaries.
          </h2>
          <p className="mt-6 max-w-prose body-base">
            Each takes a real, unsolved problem in agentic AI security, builds a
            working control, tests it, and states plainly what it does and does not
            do. Explore the architecture, the threat model, and the evidence.
          </p>
        </Reveal>

        <div className="mt-6">
          {FLAGSHIP_PROJECTS.map((project, i) => (
            <FlagshipProject key={project.repository} project={project} order={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
