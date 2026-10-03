export type ExperienceItem = {
  role: string;
  detail?: string;
  dates: string;
  organization: string;
  location: string;
  bullets: string[];
};

export type ProjectItem = {
  id: "mcp" | "iam" | "supply";
  name: string;
  label: string;
  stack: string[];
  dates: string;
  repository: string;
  problem: string;
  solution: string;
  architecture: string[];
  bullets: string[];
  metrics: string[];
  testing: string;
  limitations: string;
};

export const resume = {
  sourceFile: "Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf",
  name: "Pooja Kiran",
  headline: "Security Engineer | Agent Security | Application Security | Cloud IAM",
  positioning: "I engineer trust boundaries for systems that can act.",
  location: "Tempe, AZ",
  phone: "+1 480-776-7745",
  email: "pkiran1@asu.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/poojakiran",
    github: "https://github.com/poojakira",
    portfolio: "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website"
  },
  skillGroups: [
    {
      label: "Agent & AI Security",
      items: ["MCP/JSON-RPC 2.0", "Tool/Function-Call Security", "Prompt Injection", "LLM Red Teaming", "Model Supply-Chain Security", "Training-Data Integrity", "Adversarial ML"]
    },
    {
      label: "Cloud & Application Security",
      items: ["AWS IAM", "Least Privilege", "Trust Policies", "Permission Boundaries", "Threat Modeling", "API Security", "Capability-Based Authorization", "Data Exfiltration Detection"]
    },
    {
      label: "Engineering & Detection",
      items: ["Python", "Rust", "C++", "FastAPI", "pytest", "Hypothesis", "GitHub Actions", "SARIF 2.1.0", "CodeQL", "Docker", "Kubernetes", "Elastic Security", "Prometheus"]
    }
  ],
  experience: [
    {
      role: "Independent AI Security Researcher & Engineer",
      dates: "Aug. 2024 - Present",
      organization: "Self-Directed Research",
      location: "Tempe, AZ",
      bullets: [
        "Built the OS Resource Management Simulator in Flask and Docker, then evolved it into a PostgreSQL-backed lease service with atomic acquisition, expiring leases, idempotent retries, role-based API access, audit history, metrics, and concurrency validation.",
        "Expanded into cloud and identity security by applying AWS IAM, least-privilege access, policy evaluation, and CloudTrail-backed auditability, building the foundation for later identity and authorization tooling.",
        "Extended the work into AI and agent security, engineering controls for runtime tool calls, IAM analysis, model provenance, and training-data integrity while standardizing evidence through CI, SARIF/Code Scanning, Elastic Security, Prometheus, Docker, and reproducible tests."
      ]
    },
    {
      role: "Business & Compliance Lead",
      detail: "AEROSEC",
      dates: "Aug. 2025 - Dec. 2025",
      organization: "Honeywell Aerospace Technologies x Arizona State University",
      location: "Tempe, AZ",
      bullets: [
        "Led business/compliance analysis for a proposed airline PSS protection layer and built a $120K first-year commercialization scenario with a five-year financial model presented to ASU and Honeywell stakeholders."
      ]
    },
    {
      role: "Graduate Teaching Assistant",
      detail: "IT Grader",
      dates: "Jan. 2025 - Oct. 2025",
      organization: "Ira A. Fulton Schools of Engineering, Arizona State University",
      location: "Mesa, AZ",
      bullets: [
        "Evaluated approximately 85 undergraduate web-development submissions per semester and 52 graduate cybersecurity assignments, giving evidence-based feedback on security controls, policy, compliance, risk analysis, and implementation quality."
      ]
    }
  ] satisfies ExperienceItem[],
  projects: [
    {
      id: "mcp",
      label: "Agent Security Control Plane",
      name: "MCP Agent Security Gateway",
      stack: ["Python", "FastAPI", "MCP/JSON-RPC 2.0", "Elastic Security"],
      dates: "Jul. 2026 - Present",
      repository: "https://github.com/poojakira/mcp-agent-security-gateway",
      problem: "Agent tool calls cross an execution boundary where authorization, content risk, egress policy, rate limits, and audit evidence need to be enforced before downstream execution.",
      solution: "A default-deny MCP/JSON-RPC gateway that validates capabilities, inspects prompt-injection and PII/exfiltration signals, applies anti-SSRF controls and rate limiting, and records tamper-evident audit evidence.",
      architecture: ["Agent request", "Normalize", "Capability authorization", "Content and egress checks", "Allow or block", "Audit and telemetry"],
      bullets: [
        "Secured the agent-to-tool execution boundary by engineering a default-deny MCP/JSON-RPC gateway with capability authorization, PII/exfiltration checks, anti-SSRF controls, rate limiting, and fail-closed enforcement before downstream execution.",
        "Expanded runtime detection with 55 prompt-injection patterns and tamper-evident audit logging, producing reviewable security telemetry for policy decisions and incident analysis.",
        "Validated the gateway with 718 passing tests at 82.46% coverage, including denied-call enforcement, and implemented 9 Elastic rules with 21 SIEM tests."
      ],
      metrics: ["718 passing tests", "82.46% coverage", "55 prompt-injection patterns", "9 Elastic rules", "21 SIEM tests"],
      testing: "The resume reports 718 passing tests at 82.46% coverage, including denied-call enforcement, plus 9 Elastic rules and 21 SIEM tests.",
      limitations: "The resume supports implemented controls and test evidence. It does not claim customer deployment, enterprise adoption, or universal prevention."
    },
    {
      id: "iam",
      label: "Identity Vault",
      name: "AWS Agent Identity Guard",
      stack: ["Python", "AWS IAM", "SARIF 2.1.0"],
      dates: "Aug. 2026 - Sep. 2026",
      repository: "https://github.com/poojakira/aws-agent-identity-guard",
      problem: "Agent and workload identities can become over-privileged through wildcard grants, iam:PassRole, sts:AssumeRole, weak trust policies, privilege-escalation paths, and missing permission boundaries.",
      solution: "A static IAM analyzer with 25 deterministic rules and text, JSON, and SARIF 2.1.0 outputs for CI and GitHub Code Scanning.",
      architecture: ["IAM policy", "Parse and normalize", "25 deterministic rules", "Finding evidence", "Text / JSON / SARIF", "Code review"],
      bullets: [
        "Reduced over-privileged agent and workload identity risk by building a static IAM analyzer with 25 deterministic rules covering wildcard grants, iam:PassRole, sts:AssumeRole, privilege escalation, trust-policy weaknesses, audit tampering, and permission boundaries.",
        "Made IAM findings reviewable in CI by emitting text, JSON, and SARIF 2.1.0 results into GitHub Code Scanning, turning policy weaknesses into actionable code-review evidence.",
        "Verified rule behavior and failure paths with 235 passing tests, while keeping credential-dependent live-scan checks isolated from deterministic static-analysis coverage."
      ],
      metrics: ["25 deterministic rules", "235 passing tests", "SARIF 2.1.0", "GitHub Code Scanning"],
      testing: "The resume reports 235 passing tests covering rule behavior and failure paths while isolating credential-dependent live-scan checks.",
      limitations: "The resume supports deterministic static-analysis behavior. It does not provide production latency, throughput, or runtime authorization guarantees."
    },
    {
      id: "supply",
      label: "Model Supply Chain Lab",
      name: "HF Model Provenance Scanner",
      stack: ["Python", "SafeTensors", "GGUF", "ONNX", "Keras"],
      dates: "Jul. 2026 - Sep. 2026",
      repository: "https://github.com/poojakira/hf-model-provenance-scanner",
      problem: "Untrusted model repositories and artifacts can carry serialization, loader, dependency, provenance, and obfuscation risk before a model is loaded.",
      solution: "A non-executing scanner that inspects untrusted repositories and artifacts without importing or running their code.",
      architecture: ["Repository or artifact", "Static inspection", "Serialization checks", "Dependency and provenance checks", "Normalized findings", "Evidence"],
      bullets: [
        "Reduced model supply-chain exposure by developing a non-executing scanner that inspects untrusted repositories and artifacts without importing or running their code.",
        "Combined pickle-opcode, AST/taint, dependency/provenance, obfuscation, and binary-format checks to surface risky behavior across SafeTensors, GGUF, ONNX, Keras, and pickle-derived artifacts.",
        "Verified 241 passing tests at 75.81% coverage, detected 33/33 committed adversarial fixtures, and recorded 0 actionable findings across 4 committed benign samples."
      ],
      metrics: ["241 passing tests", "75.81% coverage", "33/33 adversarial fixtures", "0 actionable / 4 benign samples", "Non-executing inspection"],
      testing: "The resume reports 241 passing tests at 75.81% coverage, 33/33 committed adversarial fixtures detected, and 0 actionable findings across 4 committed benign samples.",
      limitations: "The fixture results are bounded test evidence. They are not a universal model-malware detection rate."
    }
  ] satisfies ProjectItem[],
  education: [
    { school: "Arizona State University", location: "Tempe, AZ", degree: "M.S., Information Technology (Security)", score: "GPA: 3.87/4.00", dates: "Aug. 2024 - May 2026" },
    { school: "M. S. Ramaiah University of Applied Sciences", location: "Bengaluru, India", degree: "B.Tech., Computer Science & Engineering", score: "CGPA: 8.44/10", dates: "Aug. 2019 - Aug. 2023" }
  ],
  certifications: [
    "AWS Academy Graduate - Cloud Architecting (Apr. 2025)",
    "AWS Academy Graduate - Cloud Security Foundations (Nov. 2025)"
  ]
} as const;

export const trustChain = ["IDENTITY", "CAPABILITY", "AUTHORIZATION", "EXECUTION", "TELEMETRY", "EVIDENCE"] as const;
export const resumeHref = "./Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf";

