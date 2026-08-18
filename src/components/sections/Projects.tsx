import { getDomainById } from "@/lib/content";

const showcaseProjects = [
  {
    id: "mcp-agent-security-gateway",
    title: "mcp-agent-security-gateway",
    subtitle: "Zero-Trust MCP Enforcement Layer",
    description:
      "5-layer decision pipeline with 50+ prompt-injection detection rules. JSON-RPC parsing, Unicode/homoglyph normalization, and real-time policy enforcement.",
    metrics: ["0.015ms latency", "50K benchmarks", "50+ rules", "14 stars"],
    domain: "mcp-tool",
    tags: ["Python", "FastAPI", "MCP"],
    github: "https://github.com/poojakira/mcp-agent-security-gateway",
  },
  {
    id: "hf-model-provenance-scanner",
    title: "hf-model-provenance-scanner",
    subtitle: "Model Supply Chain Integrity",
    description:
      "Taint engine and symbolic resolver covering 17 file formats. Deep opcode analysis for pickle Protocol 0-5, SafeTensors, GGUF parsing, and typosquat detection.",
    metrics: ["2 CVEs found", "17 formats", "100% detection", "0% false positives"],
    domain: "supply-chain",
    tags: ["Python", "SARIF", "MITRE ATLAS"],
    github: "https://github.com/poojakira/hf-model-provenance-scanner",
  },
  {
    id: "llm-redteam-framework",
    title: "llm-redteam-framework",
    subtitle: "Adversarial LLM Testing Engine",
    description:
      "Multi-category adversarial prompt generation and offline detector evaluation. Structured SARIF evidence output for guardrail validation and input/output filtering decisions.",
    metrics: ["MITRE ATLAS mapped", "SARIF output", "Multi-turn attacks"],
    domain: "llm-rag",
    tags: ["Python", "FastAPI", "Red Teaming"],
    github: "https://github.com/poojakira/llm-redteam-framework",
  },
  {
    id: "aws-agent-identity-guard",
    title: "aws-agent-identity-guard",
    subtitle: "IAM Guardrails for AI Agents",
    description:
      "25 deterministic rules covering wildcard permissions, privilege escalation, audit-trail tampering, and credential-harvest chains. CI merge gate with zero runtime dependencies.",
    metrics: ["25 IAM rules", "CI merge gate", "Zero dependencies"],
    domain: "iam",
    tags: ["Python", "AWS", "SARIF"],
    github: "https://github.com/poojakira/aws-agent-identity-guard",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">
            {"// PROJECTS"}
          </p>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            What I&apos;ve Built
          </h2>
          <p className="text-white/50 text-base max-w-xl">
            Benchmarked security systems with measurable results.
          </p>
        </div>

        {/* Key Results banner */}
        <div className="mb-10 p-5 rounded-xl bg-violet-500/5 border border-violet-500/20">
          <p className="text-xs font-mono text-violet-400/70 uppercase tracking-wider mb-3">Key Results</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xl font-bold text-white">2 CVEs</p>
              <p className="text-[11px] text-white/40">discovered in model artifacts</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">0.015ms</p>
              <p className="text-[11px] text-white/40">avg inspection latency</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">17 formats</p>
              <p className="text-[11px] text-white/40">covered by scanner</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-[11px] text-white/40">detection, 0% false positive</p>
            </div>
          </div>
        </div>

        {/* Project list */}
        <div className="space-y-4">
          {showcaseProjects.map((project, index) => {
            const domain = getDomainById(project.domain);
            const isHero = index === 0;

            return (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-6 sm:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                  isHero
                    ? "bg-white/[0.04] border-violet-500/30 hover:border-violet-500/50"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/15"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Repo name */}
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: domain?.color }}
                        aria-hidden="true"
                      />
                      <h3 className="font-mono text-base sm:text-lg text-white group-hover:text-violet-400 transition-colors truncate">
                        {project.title}
                      </h3>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3 ml-5">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-white/55 leading-relaxed ml-5 mb-3">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-2 ml-5">
                      {project.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400/90 font-mono border border-emerald-500/20"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right - tags + arrow */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-5">
                    <svg
                      className="w-4 h-4 text-white/20 group-hover:text-violet-400 transition-colors hidden sm:block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-10 ml-5">
          <a
            href="https://github.com/poojakira?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-violet-400 font-mono transition-colors"
          >
            view all 13 repositories →
          </a>
        </div>
      </div>
    </section>
  );
}
