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
  headline: "Security Engineer | AI & Agent Security | Cloud IAM",
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
    { label: "Agent & AI Security", items: ["MCP/JSON-RPC 2.0", "Tool/Function-Call Security", "Prompt Injection", "LLM Red Teaming", "Model Supply-Chain Security", "Training-Data Integrity", "Adversarial ML"] },
    { label: "Cloud, Identity & AppSec", items: ["AWS IAM", "Least Privilege", "Trust Policies", "Permission Boundaries", "Threat Modeling", "API Security", "Capability-Based Authorization", "Data Exfiltration Detection"] },
    { label: "Engineering & DevSecOps", items: ["Python", "Rust", "C++", "FastAPI", "pytest", "Hypothesis", "GitHub Actions", "SARIF 2.1.0", "CodeQL", "Bandit", "Trivy", "pip-audit", "Docker"] },
    { label: "Detection & Observability", items: ["Elastic Security", "ECS", "SIEM", "Prometheus", "Security Telemetry", "Tamper-Evident Audit Logging", "MITRE ATT&CK", "MITRE ATLAS"] }
  ],
  experience: [
    {
      role: "Independent AI Security Researcher & Engineer",
      dates: "Aug. 2024 - Present",
      organization: "Self-Directed Research",
      location: "Tempe, AZ",
      bullets: [
        "Built and evaluated security controls across agent runtime enforcement, AWS IAM, model supply-chain security, LLM red teaming, training-data integrity, and adversarial ML across 19 repositories, with threat models, reproducible tests, and evidence-backed security claims.",
        "Standardized engineering and security verification with GitHub Actions, SARIF/Code Scanning, CodeQL, Bandit, Trivy, dependency and secret scanning, Docker, Elastic Security, Prometheus, and documented runbooks covering controls, failure modes, and limitations."
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
        "Evaluated approximately 85 undergraduate web-development submissions per semester and 52 graduate cybersecurity assignments covering policy, compliance, risk analysis, and security controls."
      ]
    }
  ] satisfies ExperienceItem[],
  projects: [
    {
      id: "mcp",
      label: "Agent Runtime Security",
      name: "MCP Agent Security Gateway",
      stack: ["Python", "FastAPI", "MCP/JSON-RPC 2.0", "Elastic Security", "Docker"],
      dates: "Jul. 2026 - Present",
      repository: "https://github.com/poojakira/mcp-agent-security-gateway",
      problem: "Autonomous agents can turn a permitted tool interface into an execution boundary. Tool calls need authorization, inspection, egress policy, and evidence before downstream execution.",
      solution: "An inline MCP/JSON-RPC gateway that normalizes requests and applies capability checks, prompt-injection signals, PII/exfiltration controls, anti-SSRF policy, rate limiting, and default-deny enforcement.",
      architecture: ["Agent request", "Normalize", "Capability policy", "Content & egress checks", "Allow / block", "Telemetry & audit"],
      bullets: [
        "Engineered an inline security gateway that inspects AI-agent tool calls before execution using default-deny authorization, capability validation, 55 prompt-injection patterns, PII/exfiltration signals, anti-SSRF egress controls, rate limiting, fail-closed enforcement, and tamper-evident audit evidence.",
        "Validated 718 automated tests at 82.46% statement coverage across Python 3.10-3.12 at the cited verification snapshot, including tests proving denied calls never reach downstream transport; implemented 9 Elastic Security rules and 21 core SIEM tests."
      ],
      metrics: ["718 tests", "82.46% coverage", "55 injection patterns", "9 Elastic rules", "21 core SIEM tests"],
      testing: "Snapshot metrics are anchored in VERIFIED_METRICS.md and CI evidence. Fail-closed tests assert denied calls never reach the downstream transport.",
      limitations: "The repository demonstrates implemented controls and local/CI validation. It does not claim broad enterprise deployment or universal prompt-injection prevention."
    },
    {
      id: "iam",
      label: "Agent Identity & Least Privilege",
      name: "AWS Agent Identity Guard",
      stack: ["Python", "AWS IAM", "SARIF 2.1.0", "GitHub Code Scanning"],
      dates: "Aug. 2026 - Sep. 2026",
      repository: "https://github.com/poojakira/aws-agent-identity-guard",
      problem: "Agent and workload identities can inherit dangerous permissions through wildcard access, role passing, trust relationships, and privilege-escalation paths.",
      solution: "A static IAM analyzer with deterministic security rules and CI-native SARIF output for reviewable, repeatable identity findings.",
      architecture: ["IAM policy", "Parse & normalize", "25 deterministic rules", "Severity & evidence", "SARIF / JSON / text", "CI gate"],
      bullets: [
        "Built a static IAM security analyzer with 25 deterministic rules covering wildcard permissions, iam:PassRole, sts:AssumeRole, privilege escalation, weak trust policies, audit tampering, and missing permission boundaries for AI-agent and workload identities.",
        "Verified 235 passing tests with 3 credential-gated skips and integrated text, JSON, and SARIF 2.1.0 CI enforcement; a 500-policy synthetic CI benchmark measured 1.146 ms p95 and 1,846 policies/sec."
      ],
      metrics: ["25 deterministic rules", "235 passed", "3 credential-gated skips", "1.146 ms p95 synthetic", "1,846 policies/sec synthetic"],
      testing: "Positive and negative tests cover emitted rule IDs, parser behavior, failure modes, and credential-gated live-scan paths.",
      limitations: "Latency and throughput figures are synthetic CI measurements, not production-service SLOs. Static analysis cannot observe every runtime authorization context."
    },
    {
      id: "supply",
      label: "AI Model Supply Chain",
      name: "HF Model Provenance Scanner",
      stack: ["Python", "SafeTensors", "GGUF", "ONNX", "Keras", "SARIF", "CycloneDX"],
      dates: "Jul. 2026 - Sep. 2026",
      repository: "https://github.com/poojakira/hf-model-provenance-scanner",
      problem: "Model repositories can contain executable loaders, unsafe serialization, dependency risk, provenance gaps, and obfuscation before a model is ever trusted or loaded.",
      solution: "A non-executing scanner that inspects source, metadata, dependencies, serialization formats, and provenance signals without importing untrusted model repository code.",
      architecture: ["Repository / artifact", "Immutable revision", "Static & binary parsers", "Provenance checks", "Normalized findings", "SARIF / AIBOM / baseline"],
      bullets: [
        "Developed a non-executing AI model supply-chain scanner using pickle-opcode inspection, AST/taint and symbolic-string analysis, dependency and provenance checks, obfuscation detection, and binary inspection across SafeTensors, GGUF, ONNX, Keras, and pickle-derived artifacts.",
        "Verified 241 passing tests at 75.81% statement coverage; detected 33/33 committed adversarial fixtures with 0 actionable findings across 4 committed benign samples, with SARIF output, temporal baselines, and CycloneDX AI Bill of Materials generation."
      ],
      metrics: ["241 passing tests", "75.81% coverage", "33/33 committed attack fixtures", "0 actionable / 4 benign fixtures", "Non-executing default path"],
      testing: "The committed red-team suite pins attack and benign fixture counts, with multi-version CI and evidence files separating current metrics from historical snapshots.",
      limitations: "Fixture results are regression evidence, not a universal detection rate. Missing provenance is a risk signal, not proof of compromise."
    },
    {
      id: "dataset",
      label: "Training-Data Integrity",
      name: "Dataset Poisoning Detector",
      stack: ["Python", "FastAPI", "Kafka", "Redis", "Prometheus", "scikit-learn"],
      dates: "Jul. 2026 - Present",
      repository: "https://github.com/poojakira/dataset-poisoning-detector",
      problem: "Training pipelines need a defensible boundary for suspicious samples, label anomalies, drift, duplicate content, and poisoned data before those samples enter trusted datasets.",
      solution: "A batch and streaming screening pipeline combining statistical, isolation, spectral, label-aware, drift, deduplication, quarantine, and evidence paths.",
      architecture: ["Ingest", "Validate", "Multi-signal scoring", "Drift / label checks", "Quarantine / DLQ", "Prometheus evidence"],
      bullets: [
        "Built a training-data integrity pipeline combining Z-score, IQR, Isolation Forest, ensemble voting, spectral and label-aware analysis, drift detection, deduplication, quarantine, Kafka streaming, and fail-closed trusted-baseline readiness.",
        "Verified 199 passing tests at 90.88% statement coverage with a 90% CI gate; cross-class label-flip screening measured 0.55 / 0.60 / 0.70 F1 at 5% / 10% / 20% poisoning in the committed benchmark."
      ],
      metrics: ["199 passing tests", "90.88% coverage", "90% CI gate", "0.55 / 0.60 / 0.70 F1", "Kafka + Redis paths"],
      testing: "Tests cover API, streaming, readiness, rate limiting, error handling, Redis/Kafka paths, and committed poisoning benchmarks.",
      limitations: "Benchmark results are dataset- and attack-specific. The project does not claim a universal poisoning detector or production throughput figure."
    }
  ] satisfies ProjectItem[],
  education: [
    { school: "Arizona State University", degree: "M.S., Information Technology (Security)", score: "GPA: 3.87/4.00", dates: "Aug. 2024 - May 2026" },
    { school: "M. S. Ramaiah University of Applied Sciences", degree: "B.Tech., Computer Science & Engineering", score: "CGPA: 8.44/10", dates: "Aug. 2019 - Aug. 2023" }
  ],
  certifications: [
    "AWS Academy Graduate - Cloud Architecting",
    "AWS Academy Graduate - Cloud Security Foundations"
  ]
} as const;

export const secondaryWork = [
  {
    title: "OS Resource Management Simulator → Resource Control Plane",
    date: "Dec. 2024 - Oct. 2026",
    description: "A Fall 2024 Flask/Docker resource-allocation lab evolved into a PostgreSQL-backed lease service with atomic acquisition, expiring leases, idempotency, role-based API access, audit history, metrics, migrations, and concurrency validation.",
    repository: "https://github.com/poojakira/OS-Resource-Management-Simulator-Dockerized-Flask-Application-"
  },
  {
    title: "LLM Red-Team Framework",
    date: "Jul. 2026 - Oct. 2026",
    description: "Offline prompt-injection evaluation with grouped-template and novel-phrasing OOD measurement, designed to expose generalization gaps instead of presenting only optimistic in-distribution results.",
    repository: "https://github.com/poojakira/llm-redteam-framework"
  },
  {
    title: "Adversarial ML Lab",
    date: "Jul. 2026 - Sep. 2026",
    description: "Reproducible FGSM, PGD, and C&W robustness measurement with MITRE ATLAS mapping and committed CIFAR-10 attack evidence.",
    repository: "https://github.com/poojakira/adversarial-ml-lab"
  }
] as const;

export const trustChain = ["IDENTITY", "CAPABILITY", "AUTHORIZATION", "EXECUTION", "TELEMETRY", "EVIDENCE"] as const;

export const resumeHref = "./Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf";
