// ============================================================================
// SITE CONTENT — verified profile facts only.
// Sources: resume + github.com/poojakira profile + repositories.
// No fabricated experience, employers, revenue, or scale.
// ============================================================================

import type { SystemCategory } from "./projects";

export const PROFILE = {
  name: "Pooja Kiran",
  handle: "poojakira",
  role: "Security Engineer",
  roleDetail: "AI Security | Security Architecture",
  focus: "Agentic AI · MCP & Tool Security · AWS IAM · Model Supply-Chain · Detection Engineering",
  location: "Tempe, AZ",
  phone: "+1 4807767745",
  availability: "F-1 OPT · Available now",
  github: "https://github.com/poojakira",
  linkedin: "https://linkedin.com/in/poojakiran",
  email: "pkiran1@asu.edu",
  website: "poojakira.github.io/Pooja_Kiran_Portfolio_Website",
} as const;

// The hero positioning — drawn from the verified profile + repository theses.
export const HERO = {
  eyebrow: "Security Engineering",
  // The through-line that every flagship repo actually argues.
  statement:
    "AI stops being a prediction problem and becomes a security problem the moment it can act.",
  subline:
    "An agent that calls tools, assumes IAM roles, and loads model weights isn't answering questions anymore — it's making privileged decisions on your infrastructure. I build the open-source controls that guard that boundary.",
  principles: [
    { left: "Capability", right: "Permission", repo: "MCP Gateway" },
    { left: "Permission", right: "Provenance", repo: "Provenance Scanner" },
    { left: "Identity", right: "Authorization", repo: "Identity Guard" },
  ],
} as const;

export type CategoryInfo = {
  key: SystemCategory;
  index: string;
  title: string;
  description: string;
  repos: string[];
};

// Only categories genuinely supported by the audited repositories.
export const SYSTEM_CATEGORIES: CategoryInfo[] = [
  {
    key: "Agent & Tool Security",
    index: "01",
    title: "Agent & Tool Security",
    description:
      "Inspection, policy, and audit on the boundary where an AI agent invokes real tools over MCP — deciding whether an action should execute, not just whether a prompt looks safe.",
    repos: ["mcp-agent-security-gateway"],
  },
  {
    key: "Cloud & Identity Security",
    index: "02",
    title: "Cloud & Identity Security",
    description:
      "Least-privilege guardrails for the IAM roles that agentic workloads assume — catching privilege escalation and audit tampering before deployment.",
    repos: ["aws-agent-identity-guard"],
  },
  {
    key: "AI Supply-Chain Security",
    index: "03",
    title: "AI Supply-Chain Security",
    description:
      "Provenance and integrity for model artifacts — proving a downloaded model is the trusted one before its weights ever load.",
    repos: ["hf-model-provenance-scanner"],
  },
  {
    key: "ML Security & Red-Teaming",
    index: "04",
    title: "ML Security & Red-Teaming",
    description:
      "Honest, reproducible measurement of how models fail — prompt injection, privacy leakage, data poisoning, and adversarial robustness, each mapped to standard threat frameworks.",
    repos: [
      "llm-redteam-framework",
      "model-privacy-attacks",
      "dataset-poisoning-detector",
      "adversarial-ml-lab",
    ],
  },
];

export const ABOUT = {
  summary:
    "Security Engineer with 2+ years of hands-on experience in AI security, detection engineering, and cloud security. Focused on designing security controls and validation frameworks for agentic AI, MCP toolchains, AWS IAM, LLM applications, and model supply-chain risks, with emphasis on secure system design, access control, data-flow constraints, and adversarial testing. Developed and validated deterministic security harnesses including 50+ MCP detection rules, 25 AWS IAM security rules, and hundreds of automated security tests.",
  narrative: [
    "I design and ship open-source security tooling that guards the boundaries where AI agents, tools, identities, data, and model artifacts meet. Not slideware — working, tested, reproducible tools.",
    "These are research and portfolio projects: functional, tested, and open-source, but not hardened for enterprise scale. I'm deliberate about stating what each one does and does not do — the honest limitations are written into every repository.",
  ],
  philosophy:
    "Security should govern what an AI system is allowed to do, not only what it is allowed to say.",
} as const;

// ============================================================================
// SKILLS
// ============================================================================

export const SKILLS = {
  securityArchitecture: [
    "Secure system design",
    "Security architecture",
    "Security controls",
    "Threat modeling",
    "Systems design",
    "Access control",
    "Authorization",
    "Least privilege",
    "Policy enforcement",
    "Runtime security",
    "Network-egress controls",
    "Data exfiltration detection",
  ],
  aiSecurity: [
    "Agentic AI",
    "AI agent security",
    "MCP security",
    "Prompt-injection detection",
    "LLM security evaluation",
    "Model supply-chain security",
    "Data-poisoning detection",
    "Adversarial testing",
    "Validation frameworks",
  ],
  detectionObservability: [
    "Detection engineering",
    "SIEM",
    "Elastic Security",
    "ECS",
    "Security telemetry",
    "Audit logging",
    "Attack simulation",
    "Monitoring",
  ],
  cloudInfra: [
    "AWS IAM",
    "Kubernetes",
    "Docker",
    "Terraform",
    "GitHub Actions",
    "Elasticsearch",
    "Kibana",
    "Filebeat",
  ],
  languagesTooling: [
    "Python",
    "FastAPI",
    "scikit-learn",
    "pytest",
    "Hypothesis",
    "CodeQL",
    "SARIF 2.1.0",
    "JSON Schema",
    "Bandit",
    "Trivy",
    "pip-audit",
    "Dependabot",
    "Ruff",
  ],
} as const;

// ============================================================================
// EXPERIENCE
// ============================================================================

export type ExperienceItem = {
  title: string;
  org: string;
  orgDetail?: string;
  period: string;
  location?: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Independent AI Security Researcher & Engineer",
    org: "Self-Directed Research",
    period: "Aug 2024 – Present",
    bullets: [
      "Architected and developed AI security tooling across MCP, AWS IAM, and LLM red teaming, translating attack paths into deterministic security controls and automated validation workflows.",
      "Engineered 50+ MCP prompt-injection rules and 25 AWS IAM security rules covering AI-agent tool-call and cloud-identity attack surfaces.",
      "Validated security tooling with 622 MCP tests and 168 LLM security tests through automated regression testing and coverage-driven validation.",
    ],
  },
  {
    title: "Business & Compliance Lead | AEROSEC",
    org: "Technology Innovation Lab Externship",
    orgDetail: "Honeywell Aerospace Technologies × Arizona State University",
    period: "Aug 2025 – Dec 2025",
    location: "Tempe, AZ, USA",
    bullets: [
      "Led business and compliance strategy for AEROSEC, focusing on third-party system security, compliance, and commercialization readiness.",
      "Developed a funding model that secured $120K in year-one commercialization funding.",
      "Created a 5-year financial projection modeling growth, costs, and profitability to support commercialization planning.",
    ],
  },
  {
    title: "Graduate Teaching Assistant – IT Grader",
    org: "Arizona State University",
    period: "Jan 2025 – Oct 2025",
    location: "Tempe, AZ, USA",
    bullets: [
      "Evaluated 85 undergraduate web-development submissions per semester against technical requirements, security concepts, and implementation quality.",
      "Assessed 52 graduate-level IT-security assignments using rubric-based evaluation of security policies and cybersecurity concepts.",
      "Collaborated with faculty to provide technical feedback supporting students' secure coding practices.",
    ],
  },
];

// ============================================================================
// TIMELINE (Education, Publications, Certifications, Awards)
// ============================================================================

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  detail: string;
  kind: "education" | "publication" | "award" | "credential";
};

export const TIMELINE: TimelineItem[] = [
  {
    period: "Aug 2024 – May 2026",
    title: "M.S., Information Technology",
    org: "Arizona State University · Tempe, AZ",
    detail: "GPA: 3.87/4.00",
    kind: "education",
  },
  {
    period: "Aug 2019 – Aug 2023",
    title: "B.E., Computer Science & Engineering",
    org: "Ramaiah University of Applied Sciences · Bangalore, KA, IN",
    detail: "GPA: 8.44/10",
    kind: "education",
  },
  {
    period: "2025",
    title: "AWS Academy Graduate – Cloud Security Foundations",
    org: "AWS Academy",
    detail: "Cloud security fundamentals certification.",
    kind: "credential",
  },
  {
    period: "2025",
    title: "AWS Academy Graduate – Cloud Architecting",
    org: "AWS Academy",
    detail: "Cloud architecture certification.",
    kind: "credential",
  },
  {
    period: "2023/2024",
    title: "Published — IEEE INDICON 2023",
    org: "IEEE",
    detail:
      "A Personalized E-Learning System Using Reinforcement Learning Through Satellite. Document ID: 10440852",
    kind: "publication",
  },
  {
    period: "—",
    title: "KSCST Research Grant",
    org: "46th Series Student Project Programme",
    detail: "Research grant recipient.",
    kind: "award",
  },
];

export const OPEN_TO = [
  "AI Security",
  "AI/ML Security",
  "Product Security for AI",
  "Security Research Engineering",
];

// Scroll-story section labels.
export const STORY = {
  hero: "Who builds the system?",
  systems: "What is inside it?",
  projects: "What did I build?",
  lab: "Can you interact with it?",
  research: "How do I think?",
  about: "Who is the engineer?",
  contact: "What should we build next?",
} as const;
