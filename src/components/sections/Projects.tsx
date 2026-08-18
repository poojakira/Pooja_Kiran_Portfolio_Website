import { getDomainById } from "@/lib/content";

const showcaseProjects = [
  {
    id: "mcp-agent-security-gateway",
    title: "MCP Agent Security Gateway",
    description:
      "A zero-trust enforcement layer that intercepts, validates, and sandboxes every tool invocation before it reaches downstream systems. Prevents prompt-injected agents from escalating privileges or exfiltrating data through MCP channels.",
    domain: "mcp-tool",
    tags: ["TypeScript", "MCP", "Zero Trust", "Policy Engine"],
    github: "https://github.com/poojakira/mcp-agent-security-gateway",
  },
  {
    id: "llm-redteam-framework",
    title: "LLM Red-Team Framework",
    description:
      "Automated adversarial testing engine that stress-tests large language models under real-world attack conditions. Maps exactly how they break — jailbreaks, data leakage, alignment failures — so defenses can be precise, not guesswork.",
    domain: "llm-rag",
    tags: ["Python", "Red Teaming", "Adversarial ML", "LLM Security"],
    github: "https://github.com/poojakira/llm-redteam-framework",
  },
  {
    id: "hf-model-provenance-scanner",
    title: "HuggingFace Model Provenance Scanner",
    description:
      "Performs integrity verification on every model artifact before it enters a pipeline. Traces lineage, detects unsigned weights, flags serialization exploits, and identifies backdoored checkpoints across the Hugging Face ecosystem.",
    domain: "supply-chain",
    tags: ["Python", "HuggingFace", "Supply Chain", "Static Analysis"],
    github: "https://github.com/poojakira/hf-model-provenance-scanner",
  },
  {
    id: "aws-agent-identity-guard",
    title: "AWS Agent Identity Guard",
    description:
      "Enforces least privilege across non-human identities. Analyzes agent behavior patterns, synthesizes minimal permission boundaries, and audits for privilege drift — because an agent's permissions should be scoped to its task, not inherited from a developer's convenience.",
    domain: "iam",
    tags: ["Python", "AWS", "IAM", "Least Privilege"],
    github: "https://github.com/poojakira/aws-agent-identity-guard",
  },
  {
    id: "adversarial-ml-lab",
    title: "Adversarial ML Lab",
    description:
      "Comprehensive experimentation environment for crafting and defending against adversarial examples. Implements FGSM, PGD, C&W, and novel perturbation strategies alongside certified robustness defenses — the offensive playbook that makes defenses real.",
    domain: "agentic-ai",
    tags: ["Python", "PyTorch", "Adversarial ML", "Robustness"],
    github: "https://github.com/poojakira/adversarial-ml-lab",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            What I&apos;ve Built
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            Purpose-built security systems targeting specific trust boundaries in
            the agentic AI stack. Not concepts. Working infrastructure.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {showcaseProjects.map((project, index) => {
            const domain = getDomainById(project.domain);
            const isFirst = index === 0;

            return (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isFirst
                    ? "md:col-span-2 bg-white/[0.03] border-violet-500/30 hover:border-violet-500/50"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                }`}
                style={{
                  borderLeftWidth: "3px",
                  borderLeftColor: domain?.color ?? "#8B5CF6",
                }}
              >
                {/* Domain badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: domain?.color }}
                      aria-hidden="true"
                    />
                    <span className="text-xs font-mono text-white/50">
                      {domain?.name}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors"
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
                </div>

                {/* Title */}
                <h3
                  className={`font-bold text-white mb-3 group-hover:text-violet-400 transition-colors ${
                    isFirst ? "text-2xl" : "text-xl"
                  }`}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-white/60 leading-relaxed mb-5 ${
                    isFirst ? "text-base" : "text-sm"
                  }`}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover glow effect for featured */}
                {isFirst && (
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(139,92,246,0.05) 0%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/poojakira?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-violet-400 font-mono transition-colors"
          >
            View all 13 projects on GitHub
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
