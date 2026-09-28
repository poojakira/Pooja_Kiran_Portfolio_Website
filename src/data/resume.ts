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
  headline: "Security Engineer | Agentic AI Security | Cloud IAM",
  location: "Tempe, AZ",
  phone: "+1 480-776-7745",
  email: "pkiran1@asu.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/poojakiran",
    github: "https://github.com/poojakira",
    portfolio: "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website"
  },
  skillGroups: [
    { label: "Agentic & AI Security", items: ["MCP/JSON-RPC 2.0","Tool/Function-Call Security","Prompt Injection","Indirect Prompt Injection","RAG Security","LLM Red Teaming","Model Supply Chain Security","Adversarial ML"] },
    { label: "Application & Identity", items: ["Threat Modeling","Secure System Design","API Security","Capability-Based Authorization","Data Exfiltration Detection","AWS IAM","Workload Identity","Least Privilege","Trust Policies","Permission Boundaries"] },
    { label: "Engineering & DevSecOps", items: ["Python","Rust","C++","FastAPI","pytest","Hypothesis","GitHub Actions","CI/CD Security","SARIF 2.1.0","GitHub Code Scanning","CodeQL","Bandit","Trivy","pip-audit","Docker","Kubernetes"] },
    { label: "Detection & Observability", items: ["Elastic Security","ECS","SIEM","Prometheus","Security Telemetry","Tamper-Evident Audit Logging","Rate Limiting","MITRE ATLAS","OWASP LLM Top 10"] }
  ],
  experience: [
    {
      role: "Independent AI Security Researcher & Engineer",
      dates: "Aug 2024 - Present",
      organization: "Self-Directed Research | Self-employed",
      location: "Tempe, AZ",
      mode: "Remote",
      bullets: [
        "Built and evaluated security controls across agent runtime security, AWS IAM, LLM red teaming, model supply-chain security, training-data integrity, and adversarial ML.",
        "Engineered an MCP/JSON-RPC security gateway with 55 prompt-injection patterns and an AWS IAM analyzer with 25 deterministic rules covering agent tool calls, privilege escalation, trust-policy risk, and excessive permissions.",
        "Validated tooling with 659 passing MCP tests, 235 passing IAM tests, and 173 passing LLM security tests, supported by CI, SARIF, GitHub Code Scanning, and security telemetry."
      ]
    },
    {
      role: "Business & Compliance Lead",
      detail: "AEROSEC | Technology Innovation Lab Externship",
      dates: "Aug 2025 - Dec 2025",
      organization: "Honeywell Aerospace Technologies and Arizona State University",
      location: "Tempe, AZ",
      mode: "On-site",
      bullets: [
        "Led business, compliance, and third-party security work for AEROSEC, a proposed protection layer for airline Passenger Service System integrations.",
        "Developed a $120K first-year commercialization scenario and a five-year financial model covering revenue, operating costs, growth, and profitability; presented the case to ASU and Honeywell stakeholders."
      ]
    },
    {
      role: "Graduate Teaching Assistant",
      detail: "IT Grader",
      dates: "Jan 2025 - Oct 2025",
      organization: "Ira A. Fulton Schools of Engineering, Arizona State University | Part-time",
      location: "Mesa, AZ",
      mode: "On-site",
      bullets: [
        "Evaluated approximately 85 undergraduate web-development submissions per semester for implementation quality, debugging, code correctness, and assignment requirements.",
        "Assessed 52 graduate cybersecurity assignments covering security policies, compliance, risk analysis, and information-security controls; provided structured technical feedback with faculty."
      ]
    }
  ] satisfies ExperienceItem[],
  projects: [
    {
      name: "MCP Agent Security Gateway",
      stack: ["Python","FastAPI","MCP/JSON-RPC","Elastic Security"],
      dates: "Jul 2026 - Sep 2026",
      repository: "https://github.com/poojakira/mcp-agent-security-gateway",
      bullets: [
        "Built an inline gateway that inspects routed agent tool calls using 55 prompt-injection patterns, capability controls, PII/exfiltration signals, rate limiting, fail-closed behavior, and hash-chained audit logs.",
        "Validated 659 passing tests, 82% statement coverage, 9 Elastic Security rules, and 21 core SIEM tests."
      ],
      metrics: ["55 prompt-injection patterns","659 passing tests","82% statement coverage","9 Elastic Security rules","21 core SIEM tests"]
    },
    {
      name: "AWS Agent Identity Guard",
      stack: ["Python","AWS IAM","SARIF 2.1.0"],
      dates: "Aug 2026 - Sep 2026",
      repository: "https://github.com/poojakira/aws-agent-identity-guard",
      bullets: [
        "Built a static IAM analyzer with 25 deterministic rules covering wildcard access, iam:PassRole, sts:AssumeRole, privilege escalation, trust-policy risks, audit tampering, and permission boundaries.",
        "Added SARIF 2.1.0, GitHub Code Scanning compatibility, and CI exit-code enforcement; validated 235 passing tests."
      ],
      metrics: ["25 deterministic rules","235 passing tests","SARIF 2.1.0","GitHub Code Scanning"]
    },
    {
      name: "HF Model Provenance Scanner",
      stack: ["Python","SafeTensors","GGUF","ONNX","SARIF"],
      dates: "Jul 2026 - Sep 2026",
      repository: "https://github.com/poojakira/hf-model-provenance-scanner",
      bullets: [
        "Built a non-executing model supply-chain scanner using custom pickle-opcode analysis plus SafeTensors, GGUF, ONNX, Keras, AST/taint, provenance, and dependency checks.",
        "Detected 33/33 committed adversarial fixtures with 0 actionable findings across 4 benign samples, explicitly scoped to the internal regression suite."
      ],
      metrics: ["33/33 adversarial fixtures","0 actionable findings across 4 benign samples","Non-executing analysis"]
    }
  ] satisfies ProjectItem[],
  education: [
    { school: "Arizona State University", degree: "M.S., Information Technology (Security)", score: "GPA: 3.87/4.00", dates: "Aug 2024 - May 2026" },
    { school: "M. S. Ramaiah University of Applied Sciences", degree: "B.Tech., CSE", score: "CGPA: 8.44/10", dates: "Aug 2019 - Aug 2023" }
  ],
  certifications: [
    "AWS Academy: Cloud Architecting (Apr 2025)",
    "Cloud Security Foundations (Nov 2025)"
  ]
} as const;

export const resumeHref = "./Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf";
