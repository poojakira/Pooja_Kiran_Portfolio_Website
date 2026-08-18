import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-plasma-cyan font-mono text-sm tracking-widest uppercase mb-3">
            Background
          </p>
          <h2 className="text-fluid-4xl font-satoshi font-bold text-pure-light mb-4">
            Experience
          </h2>
          <p className="text-silver-haze text-fluid-base max-w-2xl">
            From independent research to industry collaboration - the path that
            shaped my understanding of real-world AI security threats.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sentinel-violet/50 via-plasma-cyan/30 to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div key={exp.id} className="relative pl-12 md:pl-20">
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 md:left-6.5 top-1 w-3 h-3 rounded-full border-2 border-sentinel-violet bg-deep-space"
                  aria-hidden="true"
                />

                {/* Card */}
                <div className="p-6 rounded-2xl bg-graphite/40 border border-white/5">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-satoshi font-semibold text-lg text-pure-light">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-plasma-cyan">
                        {exp.organization}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-whisper font-mono flex-shrink-0">
                      <span>{exp.location}</span>
                      <span className="text-white/20">•</span>
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description bullets */}
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-silver-haze leading-relaxed"
                      >
                        <span className="text-secure-green mt-1 flex-shrink-0">
                          ▸
                        </span>
                        {desc}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-white/5 text-silver-haze/80 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connector to next - only show if not last */}
                {index < experience.length - 1 && (
                  <div
                    className="absolute left-3.5 md:left-7.5 top-4 h-full w-px"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
