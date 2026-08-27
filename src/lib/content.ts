// ============================================================================
// Guardian Protocol - Content Data Layer
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
  role: "Security Engineer",
  tagline: "I build and test security controls: detection engineering, security automation, cloud/IAM, and AI system security.",
  email: "pkiran1@asu.edu",
  linkedin: "https://linkedin.com/in/poojakiran",
  github: "https://github.com/poojakira",
  location: "Greater Phoenix Area, AZ",
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
    description: "Inline security proxy that inspects MCP agent-to-tool calls and returns allow/block/redact/quarantine decisions through a 5-layer pipeline. Includes 50+ prompt-injection rules, PII and exfiltration detection, hash-chained audit logging, and a detection-engineering lab that ships events to Elasticsearch (ECS) with correlation rules mapped to MITRE ATT&CK. 569 tests, 75% coverage.",
    domain: "mcp-tool",
    tags: ["Python", "FastAPI", "Kubernetes", "Elastic SIEM", "MITRE ATT&CK"],
    github: "https://github.com/poojakira/mcp-agent-security-gateway",
    featured: true,
  },
  {
    id: "aws-agent-identity-guard",
    title: "AWS Agent Identity Guard",
    description: "Static analyzer that detects dangerous IAM permission patterns in AI agent roles: wildcard grants, iam:PassRole misuse, audit-trail tampering, and multi-step credential-harvest and lateral-movement chains. Outputs SARIF and gates CI on critical/high findings. 25 rules, 166 tests.",
    domain: "iam",
    tags: ["Python", "AWS IAM", "SARIF", "Attack-Path Analysis", "CI Enforcement"],
    github: "https://github.com/poojakira/aws-agent-identity-guard",
    featured: true,
  },
  {
    id: "hf-model-provenance-scanner",
    title: "HF Model Provenance Scanner",
    description: "Supply-chain scanner for Hugging Face model repositories. Analyzes pickle opcodes, SafeTensors headers, GGUF, ONNX, and Keras files without downloading full weights. Detects malicious deserialization, typosquatting, and obfuscated code; generates CycloneDX 1.6 SBOMs mapped to MITRE ATT&CK v19.",
    domain: "supply-chain",
    tags: ["Python", "Supply Chain", "SBOM", "Static Analysis", "MITRE ATT&CK"],
    github: "https://github.com/poojakira/hf-model-provenance-scanner",
    featured: true,
  },
  {
    id: "llm-redteam-framework",
    title: "LLM Red-Team Framework",
    description: "Offline adversarial evaluation harness for prompt-injection detectors. Generates attack corpora across 6 categories mapped to OWASP LLM Top 10, and measures detector performance with grouped template splits that prevent data leakage (F1 = 0.97 on held-out templates, with honest reporting of degradation on novel phrasings). 84 tests, 94% coverage.",
    domain: "llm-rag",
    tags: ["Python", "scikit-learn", "Red Teaming", "OWASP LLM", "Detection Evaluation"],
    github: "https://github.com/poojakira/llm-redteam-framework",
    featured: true,
  },
  {
    id: "dataset-poisoning-detector",
    title: "Dataset Poisoning Detector",
    description: "Streaming anomaly detector for training-data pipelines (MITRE ATLAS AML.T0020). Ensemble of Z-score, IQR, and Isolation Forest with a quarantine-first workflow so flagged samples never enter training without review. Concept-drift detection distinguishes poisoning from natural distribution shift.",
    domain: "supply-chain",
    tags: ["Python", "Anomaly Detection", "Streaming", "MITRE ATLAS", "Prometheus"],
    github: "https://github.com/poojakira/dataset-poisoning-detector",
    featured: false,
  },
  {
    id: "adversarial-ml-lab",
    title: "Adversarial ML Lab",
    description: "Attack implementations (FGSM, PGD, C&W) with robustness benchmarking on CIFAR-10, mapped to MITRE ATLAS AML.T0043. Used to evaluate model resilience and validate detection baselines.",
    domain: "agentic-ai",
    tags: ["Python", "PyTorch", "Adversarial ML", "Robustness", "MITRE ATLAS"],
    github: "https://github.com/poojakira/adversarial-ml-lab",
    featured: false,
  },
];

// --- Experience ---

export const experience: Experience[] = [
  {
    id: "independent-researcher",
    role: "Independent Security Researcher & Engineer",
    organization: "Self-Directed Security Research (concurrent with M.S. program)",
    location: "Greater Phoenix Area, AZ",
    period: "Aug 2024 - Present",
    startDate: "2024-08",
    endDate: "present",
    description: [
      "Design and maintain 16 open-source security repositories spanning detection engineering, security enforcement, threat analysis, cloud IAM, AI agent security, model supply-chain security, and adversarial testing.",
      "Engineer detection pipelines that normalize security events, evaluate attacker behavior, correlate multi-stage activity, classify findings by severity, map findings to MITRE ATT&CK and MITRE ATLAS, and export SARIF for CI security workflows.",
      "Build automated security controls that make allow, block, redact, quarantine, and deny decisions with circuit breakers, rate limiting, tamper-evident audit logging, and explicit failure-mode handling.",
      "Validate security controls through automated unit, integration, failure-mode, and adversarial tests, including 569 tests for the MCP security gateway and 166 tests for the AWS IAM analyzer.",
    ],
    tags: ["Python", "FastAPI", "AWS IAM", "Kubernetes", "Elastic SIEM", "SARIF"],
  },
  {
    id: "aerosec-honeywell",
    role: "Business Compliance Lead & Market/Cost Analyst",
    organization: "ASU Technology Innovation Lab (Honeywell Aerospace partnership)",
    location: "Greater Phoenix Area, AZ",
    period: "Aug 2025 - Dec 2025",
    startDate: "2025-08",
    endDate: "2025-12",
    description: [
      "Evaluated cybersecurity product requirements against aerospace compliance frameworks and translated security risks into system-level architecture constraints.",
      "Conducted competitive and market analysis to evaluate security requirements, product capabilities, and implementation tradeoffs.",
    ],
    tags: ["Compliance", "Honeywell Aerospace", "Market Analysis", "Security Requirements"],
  },
  {
    id: "graduate-ta",
    role: "Graduate Teaching Assistant, IT Grader",
    organization: "Ira A. Fulton Schools of Engineering, Arizona State University",
    location: "Mesa, AZ",
    period: "Jan 2025 - Oct 2025",
    startDate: "2025-01",
    endDate: "2025-10",
    description: [
      "Assessed cloud security architectures, network defense configurations, and IAM implementations for 100+ students per semester.",
      "Provided structured technical feedback on security architecture, implementation quality, threat exposure, and defensive controls.",
    ],
    tags: ["Cloud Security", "Network Defense", "IAM", "Teaching"],
  },
];

// --- Education ---

export const education: Education[] = [
  {
    id: "ms-asu",
    degree: "Master of Science in Information Technology",
    institution: "Arizona State University",
    location: "Greater Phoenix Area, AZ",
    period: "2024 – 2026",
    startDate: "2024",
    endDate: "2026",
  },
  {
    id: "btech-ramaiah",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "M.S. Ramaiah University of Applied Sciences",
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
    title: "A Personalized E-Learning System Using Reinforcement Learning Through Satellite",
    venue: "IEEE INDICON 2023",
    year: 2023,
    url: "https://ieeexplore.ieee.org/document/10440852",
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
