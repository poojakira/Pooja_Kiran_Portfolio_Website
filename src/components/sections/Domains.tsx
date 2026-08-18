import { domains, getProjectsByDomain } from "@/lib/content";

const domainIcons: Record<string, string> = {
  "agentic-ai": "🛡️",
  "llm-rag": "🔒",
  "mcp-tool": "⚡",
  iam: "🔑",
  "supply-chain": "🔗",
};

export default function Domains() {
  return (
    <section id="domains" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-plasma-cyan font-mono text-sm tracking-widest uppercase mb-3">
            Research Areas
          </p>
          <h2 className="text-fluid-4xl font-satoshi font-bold text-pure-light mb-4">
            Security Domains
          </h2>
          <p className="text-silver-haze text-fluid-base max-w-2xl mx-auto">
            Five critical attack surfaces in the AI ecosystem. Each domain
            represents a class of threats I actively research, exploit, and
            defend against.
          </p>
        </div>

        {/* Domain cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => {
            const projectCount = getProjectsByDomain(domain.id).length;
            return (
              <div
                key={domain.id}
                className="group relative p-6 rounded-2xl bg-graphite/50 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                {/* Color accent */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{ backgroundColor: domain.color }}
                  aria-hidden="true"
                />

                {/* Icon and title */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-2xl" aria-hidden="true">
                    {domainIcons[domain.id] || "🔐"}
                  </span>
                  <div>
                    <h3
                      className="font-satoshi font-semibold text-lg text-pure-light"
                      style={{ color: domain.color }}
                    >
                      {domain.name}
                    </h3>
                    <p className="text-xs text-whisper font-mono mt-1">
                      {projectCount} project{projectCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-silver-haze leading-relaxed">
                  {domain.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="mt-6 h-0.5 w-12 rounded-full opacity-40"
                  style={{ backgroundColor: domain.color }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        {/* Interconnection note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-whisper font-inter max-w-xl mx-auto">
            These domains are not isolated - a compromised model supply chain
            feeds poisoned outputs into RAG pipelines, which agents then execute
            through MCP channels with over-permissioned IAM roles. My work
            addresses the full chain.
          </p>
        </div>
      </div>
    </section>
  );
}
