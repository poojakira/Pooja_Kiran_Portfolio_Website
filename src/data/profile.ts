// Canonical profile data. Source of truth: Pooja_Kiran_Bharadwaj_Resume.pdf
// Career facts from resume; do not substitute stale content.

export const profile = {
  name: "Pooja Kiran",
  fullName: "Pooja Kiran Bharadwaj",
  title: "Security Engineer",
  positioning: "Security Engineer · AI Security · Application Security · Cloud & IAM Security",
  location: "Tempe, AZ",
  email: "poojakiranbhardwaj@gmail.com",
  phone: "+1 480-776-7745",
  github: "https://github.com/poojakira",
  linkedin: "https://linkedin.com/in/poojakiran",
  resume: "/Pooja_Kiran_Security_Engineer_Resume.pdf",
  photo: "/pooja-kiran.png",
  // Summary (from resume, verbatim intent)
  summary:
    "Security engineer who builds and validates controls for AI agents, cloud identities, and model supply chains. Hands-on work spans MCP/JSON-RPC agent security, prompt-injection detection, AWS IAM analysis, and adversarial ML, backed by reproducible tests, CI, and SARIF telemetry.",
  hook: "AI becomes a different security problem when it can act.",
  subhook:
    "I build security controls for AI agents, identities, applications, data, and model artifacts.",
} as const;

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  bullets: string[];
}

// From Pooja_Kiran_Bharadwaj_Resume.pdf
export const experience: ExperienceItem[] = [
  {
    role: "Independent AI Security Researcher & Engineer",
    organization: "Self-Directed Security Research",
    location: "Tempe, AZ",
    period: "Aug 2024 – Present",
    bullets: [
      "Designed and validated security controls across six areas: agent runtime security, cloud IAM, LLM red teaming, model supply-chain security, training-data integrity, and adversarial ML.",
      "Engineered an MCP/JSON-RPC security gateway with 55 prompt-injection patterns and an AWS IAM analyzer with 25 deterministic rules covering iam:PassRole, privilege escalation, trust-policy weaknesses, and audit tampering.",
      "Backed every claim with reproducible evidence: 652 gateway tests (79% coverage), 235 IAM analyzer tests, and 173 LLM security tests, wired to CI, SARIF output, and audit telemetry.",
    ],
  },
  {
    role: "Business & Compliance Lead, AEROSEC",
    organization: "Honeywell Aerospace Technologies × Arizona State University",
    location: "Tempe, AZ",
    period: "Aug 2025 – Dec 2025",
    bullets: [
      "Led compliance and third-party security strategy for AEROSEC, a proposed protection layer addressing operational and security risk across airline Passenger Service System integrations.",
      "Developed a $120K first-year commercialization scenario and a five-year financial model, then presented the security and business case to ASU and Honeywell stakeholders.",
    ],
  },
  {
    role: "Graduate Teaching Assistant, IT Grader",
    organization: "Ira A. Fulton Schools of Engineering, Arizona State University",
    location: "Mesa, AZ",
    period: "Jan 2025 – Oct 2025",
    bullets: [
      "Evaluated roughly 85 undergraduate web-development submissions per semester and 52 graduate assignments on IT security policy, secure coding, and risk analysis, delivering targeted technical feedback with faculty.",
    ],
  },
];

export const education = [
  {
    school: "Arizona State University",
    degree: "Master of Science in Information Technology (Security)",
    detail: "GPA 3.87 / 4.00",
    location: "Tempe, AZ",
    period: "May 2026",
  },
  {
    school: "M. S. Ramaiah University of Applied Sciences",
    degree: "B.Tech in Computer Science & Engineering",
    detail: "CGPA 8.44 / 10",
    location: "Bengaluru, India",
    period: "Aug 2023",
  },
];

export const certifications = [
  "AWS Academy: Cloud Security Foundations (Nov 2025)",
  "AWS Academy: Cloud Architecting (Apr 2025)",
];

export const publication = {
  title: "A Personalized E-Learning System Using Reinforcement Learning Through Satellite",
  venue: "IEEE INDICON 2023",
};

export const skillGroups = [
  {
    title: "AI / Application Security",
    items: ["AI/LLM Security", "Application Security", "Threat Modeling", "Agent Security", "Prompt Injection", "AI Red Teaming", "Model Supply-Chain Security"],
  },
  {
    title: "Cloud / Identity",
    items: ["AWS IAM", "Least Privilege", "iam:PassRole", "sts:AssumeRole", "Trust Policies", "Permission Boundaries"],
  },
  {
    title: "Engineering",
    items: ["Python", "FastAPI", "REST", "JSON-RPC", "pytest", "Docker", "Kubernetes", "Git"],
  },
  {
    title: "Security Automation & Telemetry",
    items: ["SARIF 2.1.0", "GitHub Code Scanning", "CodeQL", "Elastic Security / ECS", "SIEM", "Prometheus", "Audit Logging"],
  },
];
