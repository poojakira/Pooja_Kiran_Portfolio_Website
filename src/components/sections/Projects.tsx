import { projects, getDomainById } from "@/lib/content";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-plasma-cyan font-mono text-sm tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-fluid-4xl font-satoshi font-bold text-pure-light mb-4">
            Projects
          </h2>
          <p className="text-silver-haze text-fluid-base max-w-2xl">
            13 open-source security tools, frameworks, and research
            implementations. Each project targets a specific threat vector in the
            AI security landscape.
          </p>
        </div>

        {/* Featured projects */}
        <div className="mb-16">
          <h3 className="text-sm font-mono text-sentinel-violet uppercase tracking-widest mb-6">
            {"//"} Featured
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {featured.map((project) => {
              const domain = getDomainById(project.domain);
              return (
                <a
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-6 rounded-2xl bg-graphite/60 border border-sentinel-violet/20 hover:border-sentinel-violet/40 transition-all duration-300"
                >
                  {/* Domain badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: domain?.color }}
                      aria-hidden="true"
                    />
                    <span className="text-xs font-mono text-whisper">
                      {domain?.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-satoshi font-semibold text-lg text-pure-light mb-3 group-hover:text-sentinel-violet transition-colors">
                    {project.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-silver-haze leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md bg-white/5 text-silver-haze border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* GitHub link indicator */}
                  <div className="flex items-center gap-2 text-xs text-whisper group-hover:text-plasma-cyan transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>View on GitHub →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Other projects */}
        <div>
          <h3 className="text-sm font-mono text-plasma-cyan uppercase tracking-widest mb-6">
            {"//"} All Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {other.map((project) => {
              const domain = getDomainById(project.domain);
              return (
                <a
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-xl bg-graphite/30 border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  {/* Domain indicator + title */}
                  <div className="flex items-start gap-3 mb-2">
                    <span
                      className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: domain?.color }}
                      aria-hidden="true"
                    />
                    <h4 className="font-satoshi font-medium text-pure-light text-sm group-hover:text-plasma-cyan transition-colors">
                      {project.title}
                    </h4>
                  </div>

                  {/* Short description */}
                  <p className="text-xs text-whisper leading-relaxed ml-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 ml-5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-silver-haze/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
