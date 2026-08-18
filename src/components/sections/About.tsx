import { siteConfig, education, publications } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-plasma-cyan font-mono text-sm tracking-widest uppercase mb-3">
            Who I Am
          </p>
          <h2 className="text-fluid-4xl font-satoshi font-bold text-pure-light">
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Bio */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-fluid-base text-silver-haze leading-relaxed">
              I&apos;m an AI Security Researcher based in {siteConfig.location},
              pursuing my Master&apos;s in Information Technology at Arizona State
              University. My work sits at the intersection of machine learning and
              adversarial security - where I build the tools and frameworks that
              keep autonomous AI systems from being weaponized against their
              operators.
            </p>
            <p className="text-fluid-base text-silver-haze leading-relaxed">
              The rise of agentic AI has created attack surfaces that traditional
              security frameworks cannot address. Models that can reason, plan, and
              execute actions in the real world need a new class of guardrails -
              ones that understand intent, enforce boundaries, and fail safely
              under adversarial pressure.
            </p>
            <p className="text-fluid-base text-silver-haze leading-relaxed">
              That&apos;s what I build. From MCP protocol hardening to LLM red
              teaming, from model supply chain verification to least-privilege IAM
              for AI agents - every project in my portfolio addresses a specific
              trust boundary in the agentic AI stack.
            </p>

            {/* Philosophy callout */}
            <div className="mt-8 p-6 rounded-2xl border border-sentinel-violet/20 bg-sentinel-violet/5">
              <p className="text-sm font-mono text-sentinel-violet mb-2">
                {"//"} philosophy
              </p>
              <p className="text-pure-light font-inter italic leading-relaxed">
                &ldquo;Security is not a feature you bolt on after deployment.
                It&apos;s an architectural decision you make before the first line
                of code.&rdquo;
              </p>
            </div>
          </div>

          {/* Sidebar: Education & Publications */}
          <div className="lg:col-span-2 space-y-10">
            {/* Education */}
            <div>
              <h3 className="text-lg font-satoshi font-semibold text-pure-light mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-plasma-cyan"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-xl bg-graphite/50 border border-white/5"
                  >
                    <p className="font-semibold text-pure-light text-sm">
                      {edu.degree}
                    </p>
                    <p className="text-silver-haze text-sm mt-1">
                      {edu.institution}
                    </p>
                    <p className="text-whisper text-xs mt-1">
                      {edu.location} • {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div>
              <h3 className="text-lg font-satoshi font-semibold text-pure-light mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-secure-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Publications
              </h3>
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div
                    key={pub.id}
                    className="p-4 rounded-xl bg-graphite/50 border border-white/5"
                  >
                    <p className="font-semibold text-pure-light text-sm leading-snug">
                      {pub.title}
                    </p>
                    <p className="text-plasma-cyan text-xs mt-2">
                      {pub.venue} • {pub.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="p-4 rounded-xl bg-graphite/50 border border-white/5">
              <h3 className="text-sm font-mono text-amber-alert mb-3">
                {"//"} quick_facts
              </h3>
              <ul className="space-y-2 text-sm text-silver-haze">
                <li className="flex items-center gap-2">
                  <span className="text-secure-green">▸</span>
                  13 open-source security projects
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secure-green">▸</span>
                  5 AI security domains covered
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secure-green">▸</span>
                  IEEE INDICON 2023 published
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secure-green">▸</span>
                  AWS Cloud Security certified
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secure-green">▸</span>
                  ASU Technology Innovation Lab
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
