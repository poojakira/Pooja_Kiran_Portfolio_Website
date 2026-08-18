import { getDomainById } from "@/lib/content";

const showcaseProjects = [
  {
    id: "mcp-agent-security-gateway",
    title: "mcp-agent-security-gateway",
    subtitle: "Zero-Trust MCP Enforcement Layer",
    description:
      "Monitor MCP tool calls for prompt injection, PII leakage, shadow servers, and exfiltration patterns. Intercepts and sandboxes every tool invocation before it reaches downstream systems.",
    domain: "mcp-tool",
    tags: ["Python", "MCP", "Prompt Injection", "DLP", "AI Security"],
    github: "https://github.com/poojakira/mcp-agent-security-gateway",
    stars: 14,
    forks: 4,
  },
  {
    id: "llm-redteam-framework",
    title: "llm-redteam-framework",
    subtitle: "Adversarial LLM Testing Engine",
    description:
      "Generate adversarial prompts and evaluate an offline detector for LLM red-team experiments. Maps exactly how models break under multi-turn pressure so defenses can be precise.",
    domain: "llm-rag",
    tags: ["Python", "FastAPI", "Red Teaming", "Prompt Injection", "SARIF"],
    github: "https://github.com/poojakira/llm-redteam-framework",
    stars: 0,
    forks: 0,
  },
  {
    id: "hf-model-provenance-scanner",
    title: "hf-model-provenance-scanner",
    subtitle: "Model Supply Chain Integrity",
    description:
      "Scan Hugging Face model repos for provenance, impersonation, pickle-risk, and supply-chain signals. Verifies every artifact before it enters your pipeline.",
    domain: "supply-chain",
    tags: ["Python", "HuggingFace", "SARIF", "Ed25519", "MITRE ATLAS"],
    github: "https://github.com/poojakira/hf-model-provenance-scanner",
    stars: 0,
    forks: 0,
  },
  {
    id: "aws-agent-identity-guard",
    title: "aws-agent-identity-guard",
    subtitle: "IAM Guardrails for AI Agents",
    description:
      "Static IAM guardrails for agentic AI workloads on AWS. Ensures no agent holds more privilege than its task demands - scoped permissions, not inherited convenience.",
    domain: "iam",
    tags: ["Python", "AWS", "IAM", "Least Privilege"],
    github: "https://github.com/poojakira/aws-agent-identity-guard",
    stars: 0,
    forks: 0,
  },
  {
    id: "adversarial-ml-lab",
    title: "adversarial-ml-lab",
    subtitle: "Adversarial Robustness Benchmarks",
    description:
      "FGSM/PGD/C&W adversarial robustness benchmark harness for CIFAR-10 - maps to MITRE ATLAS AML.T0043. The offensive playbook that makes defenses real.",
    domain: "agentic-ai",
    tags: ["Python", "PyTorch", "ResNet", "CIFAR-10", "PGD"],
    github: "https://github.com/poojakira/adversarial-ml-lab",
    stars: 0,
    forks: 0,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-3">
            // PROJECTS
          </p>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            What I&apos;ve Built
          </h2>
          <p className="text-white/50 text-base max-w-xl">
            Production-grade security systems. Not concepts. Not proposals.
          </p>
        </div>

        {/* Project list - clean, monospace-named, vertical stack */}
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
                  {/* Left - name + description */}
                  <div className="flex-1 min-w-0">
                    {/* Repo name in monospace */}
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: domain?.color }}
                        aria-hidden="true"
                      />
                      <h3 className="font-mono text-base sm:text-lg text-white group-hover:text-violet-400 transition-colors truncate">
                        {project.title}
                      </h3>
                      {isHero && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-400/80 font-mono">
                          ★ {project.stars}
                        </span>
                      )}
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3 ml-5">
                      {project.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-white/55 leading-relaxed ml-5">
                      {project.description}
                    </p>
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
                      {project.tags.slice(0, 3).map((tag) => (
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
            view all repositories →
          </a>
        </div>
      </div>
    </section>
  );
}
