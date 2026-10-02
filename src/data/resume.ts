export type ExperienceItem = {
  role: string;
  detail?: string;
  dates: string;
  organization: string;
  location: string;
  bullets: string[];
};

export type ProjectItem = {
  id: string;
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
  headline: "Security Engineer | AI & Agent Security | Cloud IAM",
  location: "Tempe, AZ",
  phone: "+1 480-776-7745",
  email: "pkiran1@asu.edu",
  links: {
    linkedin: "https://www.linkedin.com/in/poojakiran",
    github: "https://github.com/poojakira",
    portfolio: "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website"
  },
  skillGroups: [
    { label: "Security Engineering", items: ["Agent Security", "MCP/JSON-RPC", "Application Security", "Threat Modeling", "Security Automation", "Detection Engineering"] },
    { label: "Cloud & Identity", items: ["AWS IAM", "Least Privilege", "Trust Policies", "Permission Boundaries", "Bedrock/SageMaker Permission Analysis"] },
    { label: "AI / ML Security", items: ["Prompt-Injection Detection", "LLM Red Teaming", "Model Supply-Chain Security", "Training-Data Integrity", "Adversarial ML"] },
    { label: "Engineering & Validation", items: ["Python", "FastAPI", "pytest", "Hypothesis", "GitHub Actions", "SARIF 2.1.0", "CodeQL", "Trivy", "Docker", "Elastic Security", "Prometheus"] }
  ],
  experience: [
    {
      role: "Independent AI Security Researcher & Engineer",
      dates: "Aug 2024 - Present",
      organization: "Self-Directed Research",
      location: "Tempe, AZ",
      bullets: [
        "Built and evaluated security controls across agent runtime enforcement, AWS IAM, LLM red teaming, model supply-chain analysis, training-data integrity, and adversarial ML with reproducible threat models and test evidence.",
        "Hardened 19 repositories with protected main branches, CI/security workflows, documentation checks, dependency and secret-scanning controls, and SARIF/Code Scanning integrations where supported.",
        "Integrated FastAPI, Docker, Elastic Security telemetry, multi-version Python CI, and evidence-backed runbooks/posters so security behavior and limitations remain reviewable."
      ]
    },
    {
      role: "Business & Compliance Lead",
      detail: "AEROSEC",
      dates: "Jul 2025 - Nov 2025",
      organization: "Honeywell Aerospace Technologies x Arizona State University",
      location: "Tempe, AZ",
      bullets: [
        "Led business/compliance analysis for a proposed airline Passenger Service System protection layer and built a $120K first-year commercialization scenario with a five-year financial model."
      ]
    },
    {
      role: "Graduate Teaching Assistant",
      detail: "IT Grader",
      dates: "Jan 2025 - Oct 2025",
      organization: "Ira A. Fulton Schools of Engineering, Arizona State University",
      location: "Mesa, AZ",
      bullets: [
        "Evaluated approximately 85 undergraduate web-development submissions per semester and 52 graduate cybersecurity assignments covering policy, compliance, risk analysis, and security controls."
      ]
    }
  ] satisfies ExperienceItem[],
  projects: [
    {
      id: "mcp",
      name: "MCP Agent Security Gateway",
      stack: ["Python", "FastAPI", "MCP/JSON-RPC", "Elastic Security"],
      dates: "Jul 2026 - Present",
      repository: "https://github.com/poojakira/mcp-agent-security-gateway",
      bullets: [
        "Built an inline MCP/JSON-RPC security gateway with prompt-injection, capability, PII/exfiltration, process, egress, rate-limit, and default-deny enforcement controls.",
        "Implemented 55 prompt-injection patterns, hash-chained audit evidence, ECS telemetry, and 9 Elastic Security rules.",
        "Verified 718 passing tests at 82.46% statement coverage, with the same suite green on Python 3.10-3.12."
      ],
      metrics: ["718 passing tests", "82.46% coverage", "55 prompt-injection patterns", "9 Elastic rules", "21 core SIEM tests"]
    },
    {
      id: "iam",
      name: "AWS Agent Identity Guard",
      stack: ["Python", "AWS IAM", "SARIF 2.1.0", "GitHub Code Scanning"],
      dates: "Aug 2026 - Sep 2026",
      repository: "https://github.com/poojakira/aws-agent-identity-guard",
      bullets: [
        "Built a static IAM analyzer with 25 deterministic rules for wildcard access, iam:PassRole, sts:AssumeRole, privilege escalation, risky trust policies, audit tampering, and permission boundaries.",
        "Emits text, JSON, and SARIF 2.1.0 with CI enforcement on critical/high findings and no runtime dependencies for local-file scans.",
        "Verified 238 collected tests with 235 passing and 3 credential-gated live-scan skips; positive/negative tests cover every emitted rule ID."
      ],
      metrics: ["25 deterministic rules", "235 passed / 3 skipped", "SARIF 2.1.0", "GitHub Code Scanning", "Static by default"]
    },
    {
      id: "supply",
      name: "HF Model Provenance Scanner",
      stack: ["Python", "SafeTensors", "GGUF", "ONNX", "Keras", "SARIF"],
      dates: "Jul 2026 - Sep 2026",
      repository: "https://github.com/poojakira/hf-model-provenance-scanner",
      bullets: [
        "Built a non-executing model supply-chain scanner combining pickle-opcode parsing, AST/taint/symbolic-string analysis, provenance checks, dependency risk, and binary-format inspection.",
        "Verified 241 passing tests, 1 platform-specific skip, 6 additional pytest subtests, and 75.81% statement coverage across Python 3.10-3.12 CI.",
        "Detected 33/33 committed adversarial fixtures with 0 actionable findings across 4 committed benign samples; results are explicitly fixture-scoped."
      ],
      metrics: ["241 passed / 1 skipped", "6 additional subtests", "75.81% coverage", "33/33 attack fixtures", "Non-executing analysis"]
    },
    {
      id: "dataset",
      name: "Dataset Poisoning Detector",
      stack: ["Python", "FastAPI", "Redis Streams", "Kafka", "Prometheus"],
      dates: "Jul 2026 - Present",
      repository: "https://github.com/poojakira/dataset-poisoning-detector",
      bullets: [
        "Built a training-data security pipeline combining statistical outlier checks, Isolation Forest, spectral and label-aware signals, quarantine, dead-letter routing, and streaming backpressure controls.",
        "Hardened API and streaming boundaries with fail-closed authentication, request-size limits, shared production rate limiting, trusted-baseline readiness, bounded scoring, and WebSocket abuse controls.",
        "Verified 199 passing tests at 90.88% statement coverage with a 90% CI/release gate."
      ],
      metrics: ["199 passing tests", "90.88% coverage", "90% CI gate", "Redis + Kafka paths", "Quarantine + DLQ"]
    }
  ] satisfies ProjectItem[],
  education: [
    { school: "Arizona State University", degree: "M.S., Information Technology (Security)", score: "GPA: 3.87/4.00", dates: "Aug 2024 - May 2026" },
    { school: "M. S. Ramaiah University of Applied Sciences", degree: "B.Tech., Computer Science & Engineering", score: "CGPA: 8.44/10", dates: "Aug 2019 - Aug 2023" }
  ],
  certifications: [
    "AWS Academy Graduate - Cloud Architecting (2025)",
    "AWS Academy Graduate - Cloud Security Foundations (2025)"
  ]
} as const;

export const supplementalProjects = {
  llm: {
    id: "llm",
    name: "LLM Red-Team Framework",
    stack: ["Python", "TF-IDF", "Logistic Regression", "FastAPI", "SARIF"],
    dates: "Jul 2026 - Sep 2026",
    repository: "https://github.com/poojakira/llm-redteam-framework",
    bullets: [
      "Built an offline prompt-injection evaluation harness across six attack categories with grouped-template and novel-phrasing OOD evaluation.",
      "Verified 176 collected tests with 175 passing, 1 skipped, and 94.30% statement coverage without live LLM API calls or GPU dependencies.",
      "Measured grouped-split F1 of 0.9714 versus novel-phrasing OOD F1 of 0.7188, exposing the detector's generalization gap."
    ],
    metrics: ["175 passed / 1 skipped", "94.30% coverage", "Grouped F1 0.9714", "OOD F1 0.7188", "Offline / no live LLM API"]
  },
  adversarial: {
    id: "adversarial",
    name: "Adversarial ML Lab",
    stack: ["Python", "PyTorch", "FGSM", "PGD", "C&W", "MITRE ATLAS"],
    dates: "2026",
    repository: "https://github.com/poojakira/adversarial-ml-lab",
    bullets: [
      "Built a robustness measurement harness for FGSM, PGD, and C&W attacks with structured evidence and MITRE ATLAS AML.T0043 mapping.",
      "Current main records 109 passing tests and 32.16% overall line coverage, with core attack modules at substantially higher coverage than the repository aggregate.",
      "Committed CIFAR-10 evidence measures 71.82% clean accuracy and 0.00% PGD-20 robust accuracy at epsilon 8/255 on the documented 1,024-sample attack subset."
    ],
    metrics: ["109 passing tests", "32.16% overall coverage", "FGSM / PGD / C&W", "71.82% clean", "0.00% PGD robust @ 8/255"]
  }
} satisfies Record<string, ProjectItem>;

export const resumeHref = "./Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf";
