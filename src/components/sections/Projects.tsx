import { getDomainById } from "@/lib/content";

const showcaseProjects = [
  {
    id: "mcp-agent-security-gateway",
    title: "mcp-agent-security-gateway",
    subtitle: "Inline MCP Security Proxy + Detection Lab",
    description:
      "Inline stdio proxy that inspects MCP agent-to-tool calls through a 5-layer decision pipeline (server trust, tool-call policy, process-spawn analysis, semantic intent, network egress) and returns allow/block/redact/quarantine decisions. Includes SHA-256 hash-chained audit logging, circuit breakers, rate limiting, shadow mode, and a detection-engineering lab that ships events to Elasticsearch (ECS) with correlation rules.",
    metrics: ["569 tests", "75% coverage", "50+ injection rules", "Elastic SIEM + correlation"],
    highlights: [
      "Unicode/homoglyph normalization and Base64/ROT13 decode before matching",
      "6 correlation rules + 9 Elastic detection rules mapped to MITRE ATT&CK",
      "6 Atomic Red Team style attack simulations; validated against a docker-compose ELK stack",
      "CI: CodeQL, Trivy, Grype, Bandit, pip-audit, Syft SBOM",
    ],
    domain: "mcp-tool",
    tags: ["Python", "FastAPI", "Kubernetes", "Elastic SIEM", "SARIF"],
    github: "https://github.com/poojakira/mcp-agent-security-gateway",
  },
  {
    id: "aws-agent-identity-guard",
    title: "aws-agent-identity-guard",
    subtitle: "Static IAM Analyzer for AI Agent Roles",
    description:
      "Detects dangerous IAM permission patterns in AI agent roles: wildcard grants, iam:PassRole misuse, privilege-management actions, audit-trail tampering, and multi-step credential-harvest and lateral-movement chains. Outputs Text, JSON, and SARIF, and gates CI on critical/high findings via GitHub Code Scanning.",
    metrics: ["25 rules", "166 tests", "SARIF + CI gate", "Attack-path analysis"],
    highlights: [
      "Multi-step attack-path detection catches escalation single-rule scanners miss",
      "Optional read-only live-account scan via boto3",
      "Zero runtime dependencies for local policy scanning",
    ],
    domain: "iam",
    tags: ["Python", "AWS IAM", "SARIF", "Terraform"],
    github: "https://github.com/poojakira/aws-agent-identity-guard",
  },
  {
    id: "hf-model-provenance-scanner",
    title: "hf-model-provenance-scanner",
    subtitle: "Model Supply-Chain Scanner",
    description:
      "Analyzes pickle opcodes, SafeTensors headers, GGUF structures, ONNX, and Keras files without downloading full model weights. Detects malicious deserialization, typosquatting, and obfuscated code, and generates CycloneDX 1.6 SBOMs. All findings mapped to MITRE ATT&CK v19.",
    metrics: ["Header-only scanning", "CycloneDX 1.6 SBOM", "MITRE ATT&CK v19"],
    highlights: [
      "Temporal baseline diffing for rug-pull detection",
      "Levenshtein-based typosquat detection and multi-layer obfuscation decode",
      "Documented evidence boundaries: no universal detection-rate claims",
    ],
    domain: "supply-chain",
    tags: ["Python", "SARIF", "SBOM", "MITRE ATT&CK"],
    github: "https://github.com/poojakira/hf-model-provenance-scanner",
  },
  {
    id: "llm-redteam-framework",
    title: "llm-redteam-framework",
    subtitle: "Adversarial Detector Evaluation Harness",
    description:
      "Offline harness that generates prompt-injection attack corpora across 6 categories mapped to the OWASP LLM Top 10 and measures detector performance with grouped template splits that prevent data leakage. Reports F1 = 0.97 on held-out templates alongside honest degradation on novel phrasings.",
    metrics: ["84 tests", "94% coverage", "6 OWASP LLM categories", "F1 = 0.97 (held-out)"],
    highlights: [
      "Grouped splitting prevents template leakage for honest evaluation",
      "FastAPI /scan endpoint with rate limiting and API-key auth",
      "SARIF output integrates with GitHub Code Scanning",
    ],
    domain: "llm-rag",
    tags: ["Python", "scikit-learn", "FastAPI", "SARIF"],
    github: "https://github.com/poojakira/llm-redteam-framework",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-plasma-cyan font-mono text-xs tracking-[0.3em] uppercase mb-3">
            {"// PROJECTS"}
          </p>
          <h2
            className="font-bold text-pure-light mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            What I&apos;ve Built
          </h2>
          <p className="text-silver-haze text-base max-w-xl">
            Tested, CI-verified security systems with reproducible evidence and documented limitations.
          </p>
        </div>

        {/* Project list */}
        <div className="space-y-5">
          {showcaseProjects.map((project, index) => {
            const domain = getDomainById(project.domain);
            const isHero = index <= 1;

            return (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-6 sm:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 ${
                  isHero
                    ? "bg-white/[0.04] border-sentinel-violet/30 hover:border-sentinel-violet/50"
                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/15"
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: domain?.color }}
                      aria-hidden="true"
                    />
                    <h3 className="font-mono text-base sm:text-lg text-pure-light group-hover:text-sentinel-violet transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-sentinel-violet transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                {/* Subtitle */}
                <p className="text-xs font-mono text-white/30 uppercase tracking-wider mb-3 ml-5">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-silver-haze leading-relaxed ml-5 mb-4">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2 ml-5 mb-3">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-secure-green/10 text-secure-green/90 font-mono border border-secure-green/20"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                {isHero && (
                  <div className="ml-5 mt-3 pt-3 border-t border-white/5">
                    <ul className="space-y-1">
                      {project.highlights.map((h) => (
                        <li key={h} className="text-[12px] text-white/35 flex items-start gap-2">
                          <span className="text-sentinel-violet/60 mt-0.5">+</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 ml-5 mt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/30 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
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
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-sentinel-violet font-mono transition-colors"
          >
            view all 16 repositories &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
