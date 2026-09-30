export type ExperienceItem = {
  role: string;
  detail?: string;
  dates: string;
  organization: string;
  location: string;
  mode?: string;
  bullets: string[];
};

export type ProjectItem = {
  name: string;
  stack: string[];
  dates: string;
  repository: string;
  bullets: string[];
  metrics: string[];
};

export const resume = {
  sourceFile: "Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf",
  name: "Pooja Kiran",
  headline: "Security Engineer | Agent Security | Cloud IAM",
  location: "Tempe, AZ",
  phone: "+1 480-776-7745",
  email: "pkiran1@asu.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/poojakiran",
    github: "https://github.com/poojakira",
    portfolio: "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website"
  },
  skillGroups: [
    { label: "Languages", items: ["Python", "Rust", "C++"] },
    { label: "Security", items: ["Agent Runtime Security", "MCP/JSON-RPC", "Policy Enforcement", "Prompt Injection", "Threat Modeling", "AWS IAM", "Workload Identity", "Least Privilege", "LLM Red Teaming", "Model Supply-Chain Security"] },
    { label: "Tooling", items: ["FastAPI", "pytest", "Hypothesis", "GitHub Actions", "SARIF 2.1.0", "CodeQL", "Bandit", "Trivy", "Docker", "Kubernetes", "Elastic Security", "Prometheus"] }
  ],
  experience: [
    {
      role: "Independent AI Security Researcher & Engineer",
      dates: "Aug 2024 - Present",
      organization: "Self-Directed Research",
      location: "Tempe, AZ",
      bullets: [
        "Built and evaluated security tooling for agent runtimes, AWS IAM, LLM red teaming, model supply chains, training-data integrity, and adversarial ML.",
        "Implemented CI-backed Python, Rust, and C++ controls with SARIF, GitHub Code Scanning, Elastic Security telemetry, and Docker; current baselines include 707 MCP, 235 IAM, and 211 model-scanner tests."
      ]
    },
    {
      role: "Business & Compliance Lead",
      detail: "AEROSEC",
      dates: "Aug 2025 - Dec 2025",
      organization: "Honeywell Aerospace Technologies and Arizona State University",
      location: "Tempe, AZ",
      bullets: [
        "Led business, compliance, and third-party security analysis for AEROSEC, a proposed protection layer for airline Passenger Service System integrations.",
        "Built a $120K first-year commercialization scenario and five-year financial model covering revenue, operating costs, growth, and profitability; presented the case to ASU and Honeywell stakeholders."
      ]
    },
    {
      role: "Graduate Teaching Assistant",
      detail: "IT Grader",
      dates: "Jan 2025 - Oct 2025",
      organization: "Ira A. Fulton Schools of Engineering, Arizona State University",
      location: "Mesa, AZ",
      bullets: [
        "Evaluated approximately 85 undergraduate web-development submissions per semester and 52 graduate cybersecurity assignments covering security policy, compliance, risk analysis, and information-security controls."
      ]
    }
  ] satisfies ExperienceItem[],
  projects: [
    {
      name: "MCP Agent Security Gateway",
      stack: ["Python", "FastAPI", "MCP/JSON-RPC", "Elastic Security"],
      dates: "Jul 2026 - Sep 2026",
      repository: "https://github.com/poojakira/mcp-agent-security-gateway",
      bullets: [
        "Built an inline agent-security gateway with 55 prompt-injection patterns, capability checks, PII/exfiltration signals, rate limiting, fail-closed behavior, and hash-chained audit logs.",
        "Validated 707 passing tests at 82.85% statement coverage, 9 Elastic Security rules, and 21 core SIEM tests; the same suite is green on Python 3.10, 3.11, and 3.12."
      ],
      metrics: ["55 prompt-injection patterns", "707 passing tests", "82.85% statement coverage", "9 Elastic Security rules", "21 core SIEM tests"]
    },
    {
      name: "AWS Agent Identity Guard",
      stack: ["Python", "AWS IAM", "SARIF 2.1.0"],
      dates: "Aug 2026 - Sep 2026",
      repository: "https://github.com/poojakira/aws-agent-identity-guard",
      bullets: [
        "Built a static IAM analyzer with 25 deterministic rules for wildcard access, iam:PassRole, sts:AssumeRole, privilege escalation, trust-policy risk, audit tampering, and permission boundaries.",
        "Added SARIF 2.1.0, GitHub Code Scanning, and CI exit enforcement; current main validates 235 passing tests with 3 credential-gated live-scan skips."
      ],
      metrics: ["25 deterministic rules", "235 passing tests", "3 credential-gated live-scan skips", "SARIF 2.1.0", "GitHub Code Scanning"]
    },
    {
      name: "HF Model Provenance Scanner",
      stack: ["Python", "SafeTensors", "GGUF", "ONNX", "SARIF"],
      dates: "Jul 2026 - Sep 2026",
      repository: "https://github.com/poojakira/hf-model-provenance-scanner",
      bullets: [
        "Built a non-executing model supply-chain scanner using pickle-opcode analysis plus SafeTensors, GGUF, ONNX, Keras, AST/taint, provenance, and dependency checks.",
        "Validated 211 passing tests at 66.90% statement coverage and detected 33/33 committed adversarial fixtures with 0 actionable findings across 4 committed benign samples."
      ],
      metrics: ["211 passing tests", "66.90% statement coverage", "33/33 committed adversarial fixtures", "0 actionable findings across 4 committed benign samples"]
    }
  ] satisfies ProjectItem[],
  education: [
    { school: "Arizona State University", degree: "M.S., Information Technology (Security)", score: "GPA: 3.87/4.00", dates: "Aug 2024 - May 2026" },
    { school: "M. S. Ramaiah University of Applied Sciences", degree: "B.Tech., Computer Science and Engineering", score: "CGPA: 8.44/10", dates: "Aug 2019 - Aug 2023" }
  ],
  certifications: [
    "AWS Academy Cloud Architecting",
    "AWS Academy Cloud Security Foundations"
  ]
} as const;

export const resumeHref = "./Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf";
