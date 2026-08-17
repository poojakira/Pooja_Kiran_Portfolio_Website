// ============================================================================
// Guardian Protocol — Content Data Layer
// ============================================================================

// --- Interfaces ---

export interface Domain {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  domain: string;
  tags: string[];
  github: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string[];
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
}

export interface Publication {
  id: string;
  title: string;
  venue: string;
  year: number;
  url?: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  tagline: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

// --- Site Configuration ---

export const siteConfig: SiteConfig = {
  name: "Pooja Kiran",
  role: "AI Security Researcher",
  tagline: "Engineering the guardrails that keep autonomous AI systems from turning adversarial.",
  email: "pkiran1@asu.edu",
  linkedin: "https://linkedin.com/in/poojakira",
  github: "https://github.com/poojakira",
  location: "Tempe, AZ",
};

// --- Security Domains ---

export const domains: Domain[] = [
  {
    id: "agentic-ai",
    name: "Agentic AI Security",
    color: "#8B5CF6",
    description: "Securing autonomous agent architectures against prompt injection, goal hijacking, and uncontrolled tool invocation.",
  },
  {
    id: "llm-rag",
    name: "LLM & RAG Security",
    color: "#06B6D4",
    description: "Hardening retrieval-augmented generation pipelines and large language models against adversarial exploitation.",
  },
  {
    id: "mcp-tool",
    name: "MCP & Tool Security",
    color: "#10B981",
    description: "Enforcing trust boundaries on model-context protocol channels and tool-use execution surfaces.",
  },
  {
    id: "iam",
    name: "IAM & Least Privilege",
    color: "#F59E0B",
    description: "Designing identity and access control architectures that constrain AI agents to minimal operational permissions.",
  },
  {
    id: "supply-chain",
    name: "Model Supply Chain",
    color: "#F43F5E",
    description: "Validating model provenance, detecting poisoned artifacts, and securing the ML pipeline from training to deployment.",
  },
];

// --- Projects ---

export const projects: Project[] = [
  {
    id: "mcp-agent-security-gateway",
    title: "MCP Agent Security Gateway",
    description: "A zero-trust enforcement layer for Model Context Protocol traffic. Intercepts, validates, and sandboxes every tool invocation before it reaches downstream systems — preventing prompt-injected agents from escalating privileges or exfiltrating data through MCP channels.",
    domain: "mcp-tool",
    tags: ["TypeScript", "MCP", "Zero Trust", "Policy Engine", "Agent Security"],
    github: "https://github.com/poojakira/mcp-agent-security-gateway",
    featured: true,
  },
  {
    id: "llm-redteam-framework",
    title: "LLM Red Team Framework",
    description: "Automated adversarial testing suite that systematically probes LLM deployments for jailbreaks, data leakage, and alignment failures. Generates attack chains, measures resilience under multi-turn pressure, and produces actionable hardening reports that close gaps before adversaries find them.",
    domain: "llm-rag",
    tags: ["Python", "Red Teaming", "Adversarial ML", "LLM Security", "Automated Testing"],
    github: "https://github.com/poojakira/llm-redteam-framework",
    featured: true,
  },
  {
    id: "hf-model-provenance-scanner",
    title: "HuggingFace Model Provenance Scanner",
    description: "Supply chain integrity verification for ML models hosted on HuggingFace Hub. Performs deep provenance analysis — tracing model lineage, detecting unsigned weights, flagging serialization exploits, and identifying backdoored checkpoints before they enter production pipelines.",
    domain: "supply-chain",
    tags: ["Python", "HuggingFace", "Supply Chain", "Model Provenance", "Static Analysis"],
    github: "https://github.com/poojakira/hf-model-provenance-scanner",
    featured: true,
  },
  {
    id: "aws-agent-identity-guard",
    title: "AWS Agent Identity Guard",
    description: "Least-privilege IAM policy generator purpose-built for AI agent workloads on AWS. Analyzes agent behavior patterns, synthesizes minimal permission boundaries, and continuously audits for privilege drift — ensuring no agent holds more power than its task demands.",
    domain: "iam",
    tags: ["Python", "AWS", "IAM", "Least Privilege", "Policy Generation"],
    github: "https://github.com/poojakira/aws-agent-identity-guard",
    featured: false,
  },
  {
    id: "model-privacy-attacks",
    title: "Model Privacy Attacks",
    description: "Research implementation of state-of-the-art membership inference and model inversion attacks. Demonstrates how adversaries reconstruct training data from model outputs — and provides the defensive toolkit to quantify and mitigate privacy leakage in deployed models.",
    domain: "llm-rag",
    tags: ["Python", "PyTorch", "Privacy", "Membership Inference", "Differential Privacy"],
    github: "https://github.com/poojakira/model-privacy-attacks",
    featured: false,
  },
  {
    id: "adversarial-ml-lab",
    title: "Adversarial ML Lab",
    description: "Comprehensive experimentation environment for crafting and defending against adversarial examples across vision and language modalities. Implements FGSM, PGD, C&W, and novel perturbation strategies alongside certified robustness defenses.",
    domain: "agentic-ai",
    tags: ["Python", "PyTorch", "Adversarial ML", "Robustness", "Computer Vision"],
    github: "https://github.com/poojakira/adversarial-ml-lab",
    featured: false,
  },
  {
    id: "dataset-poisoning-detector",
    title: "Dataset Poisoning Detector",
    description: "Automated detection pipeline that identifies poisoned samples injected into training datasets. Uses spectral signatures, activation clustering, and statistical outlier analysis to surface malicious data points that would otherwise compromise model integrity at scale.",
    domain: "supply-chain",
    tags: ["Python", "Data Security", "Poisoning Detection", "Statistical Analysis", "MLOps"],
    github: "https://github.com/poojakira/dataset-poisoning-detector",
    featured: false,
  },
  {
    id: "unified-ml-security-platform",
    title: "Unified ML Security Platform",
    description: "End-to-end security orchestration platform that consolidates threat detection, vulnerability scanning, and compliance monitoring across the entire ML lifecycle. A single control plane for teams managing security at the intersection of AI and infrastructure.",
    domain: "agentic-ai",
    tags: ["TypeScript", "React", "Python", "Platform Engineering", "Security Orchestration"],
    github: "https://github.com/poojakira/unified-ml-security-platform",
    featured: false,
  },
  {
    id: "ml-security-command-center",
    title: "ML Security Command Center",
    description: "Real-time threat monitoring dashboard providing situational awareness across deployed ML systems. Aggregates anomaly signals, visualizes attack surfaces, and triggers automated response playbooks when adversarial activity is detected in production.",
    domain: "agentic-ai",
    tags: ["TypeScript", "Next.js", "Real-time", "Monitoring", "Threat Detection"],
    github: "https://github.com/poojakira/ml-security-command-center",
    featured: false,
  },
  {
    id: "mlsec-dashboards",
    title: "MLSec Dashboards",
    description: "Visualization suite for ML security metrics — model robustness scores, adversarial success rates, drift detection, and compliance posture. Transforms raw security telemetry into decision-ready intelligence for security teams and leadership.",
    domain: "iam",
    tags: ["TypeScript", "D3.js", "React", "Data Visualization", "Security Metrics"],
    github: "https://github.com/poojakira/mlsec-dashboards",
    featured: false,
  },
  {
    id: "mlsec-benchmark-suite",
    title: "MLSec Benchmark Suite",
    description: "Standardized evaluation framework for measuring ML security posture across attack vectors. Provides reproducible benchmarks for adversarial robustness, poisoning resistance, and privacy guarantees — enabling apples-to-apples comparison of defense strategies.",
    domain: "llm-rag",
    tags: ["Python", "Benchmarking", "Evaluation", "ML Security", "Reproducibility"],
    github: "https://github.com/poojakira/mlsec-benchmark-suite",
    featured: false,
  },
  {
    id: "attack-v19-core",
    title: "Attack V19 Core",
    description: "Core attack library implementing 19 distinct adversarial techniques against modern ML systems. From gradient-based evasion to model extraction — a modular, extensible engine for security researchers validating defenses under realistic threat conditions.",
    domain: "mcp-tool",
    tags: ["Python", "Attack Library", "Security Research", "Modular Architecture", "Threat Simulation"],
    github: "https://github.com/poojakira/attack-v19-core",
    featured: false,
  },
  {
    id: "pulsenet-rul-forecasting",
    title: "PulseNet RUL Forecasting",
    description: "Deep learning architecture for remaining useful life prediction in industrial systems. Applies temporal attention mechanisms to sensor telemetry — achieving state-of-the-art prognostic accuracy while demonstrating adversarial vulnerability analysis of safety-critical ML deployments.",
    domain: "supply-chain",
    tags: ["Python", "Deep Learning", "Time Series", "Predictive Maintenance", "Industrial ML"],
    github: "https://github.com/poojakira/PulseNet-RUL-Forecasting",
    featured: false,
  },
];

// --- Experience ---

export const experience: Experience[] = [
  {
    id: "independent-researcher",
    role: "Independent AI Security Researcher",
    organization: "Self-directed Research",
    location: "Tempe, AZ",
    period: "Aug 2024 – Present",
    startDate: "2024-08",
    endDate: "present",
    description: [
      "Architecting open-source security tooling for agentic AI systems, MCP protocol hardening, and LLM adversarial defense.",
      "Published research on model supply chain attacks and developed automated red-teaming frameworks adopted by the security community.",
      "Building the Guardian Protocol — a comprehensive security research portfolio spanning 13 projects across 5 critical AI security domains.",
    ],
    tags: ["AI Security", "MCP", "LLM Red Teaming", "Supply Chain", "Open Source"],
  },
  {
    id: "aerosec-honeywell",
    role: "Research Associate — AEROSEC / Honeywell",
    organization: "ASU Tech Innovation Lab",
    location: "Tempe, AZ",
    period: "Aug 2025 – Dec 2025",
    startDate: "2025-08",
    endDate: "2025-12",
    description: [
      "Conducted adversarial security analysis of aerospace ML systems in collaboration with Honeywell's advanced research division.",
      "Developed attack simulations targeting autonomous navigation models and contributed to hardening guidelines for safety-critical deployments.",
      "Bridged academic research and industry requirements to deliver actionable threat models for next-generation avionics.",
    ],
    tags: ["Aerospace Security", "Adversarial ML", "Honeywell", "Safety-Critical Systems"],
  },
  {
    id: "graduate-ta",
    role: "Graduate Teaching Assistant",
    organization: "ASU Fulton School of Engineering",
    location: "Tempe, AZ",
    period: "Jan 2025 – Oct 2025",
    startDate: "2025-01",
    endDate: "2025-10",
    description: [
      "Led instruction for graduate-level courses in software security and machine learning fundamentals.",
      "Designed lab exercises on adversarial attacks, secure ML pipelines, and vulnerability assessment methodologies.",
      "Mentored 50+ graduate students on capstone projects integrating security principles into AI system design.",
    ],
    tags: ["Teaching", "Software Security", "Machine Learning", "Mentorship"],
  },
];

// --- Education ---

export const education: Education[] = [
  {
    id: "ms-asu",
    degree: "Master of Science in Information Technology",
    institution: "Arizona State University",
    location: "Tempe, AZ",
    period: "2024 – 2026",
    startDate: "2024",
    endDate: "2026",
  },
  {
    id: "btech-ramaiah",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "M.S. Ramaiah Institute of Technology",
    location: "Bangalore, India",
    period: "2019 – 2023",
    startDate: "2019",
    endDate: "2023",
  },
];

// --- Publications ---

export const publications: Publication[] = [
  {
    id: "ieee-indicon-2023",
    title: "PulseNet: Deep Learning Framework for Remaining Useful Life Forecasting in Industrial Systems",
    venue: "IEEE INDICON 2023",
    year: 2023,
  },
];

// --- Helper Functions ---

export function getProjectsByDomain(domainId: string): Project[] {
  return projects.filter((p) => p.domain === domainId);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getDomainById(domainId: string): Domain | undefined {
  return domains.find((d) => d.id === domainId);
}

export function getDomainColor(domainId: string): string {
  return getDomainById(domainId)?.color ?? "#8B5CF6";
}
