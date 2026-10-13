// Recruiter-facing evidence links intentionally resolve to canonical main-branch artifacts.
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
  history: string;
  caseStudy?: string;
  demo?: string;
};

export const resume = {
  sourceFile: "Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf",
  name: "Pooja Kiran",
  headline: "Security Engineer | AI & Agent Security | Application Security | Cloud IAM Security | Model Supply-Chain Security",
  positioning: "I secure the trust boundaries where AI systems gain authority and take action.",
  location: "Tempe, AZ, USA",
  phone: "+1 480-776-7745",
  email: "poojakiranbhardwaj@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/poojakiran",
    github: "https://github.com/poojakira",
    portfolio: "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website"
  },
  skillGroups: [
    {
      label: "AI & Agent Security",
      items: ["MCP/JSON-RPC 2.0", "Tool/Function-Call Security", "Prompt Injection", "LLM Red Teaming", "Model Supply-Chain Security"]
    },
    {
      label: "Identity & Application Security",
      items: ["Cloud IAM Security", "AWS IAM", "Least Privilege", "Trust Policies", "Permission Boundaries", "Capability-Based Authorization", "Threat Modeling", "API Security"]
    },
    {
      label: "Security Engineering & DevSecOps",
      items: ["Python", "FastAPI", "pytest", "GitHub Actions", "CI/CD Security", "SARIF 2.1.0", "GitHub Code Scanning", "Docker"]
    },
    {
      label: "Detection & Observability",
      items: ["Elastic Security", "ECS", "SIEM", "Prometheus", "Tamper-Evident Audit Logging", "MITRE ATLAS"]
    }
  ],
  experience: [
    {
      role: "Independent AI Security Researcher & Engineer",
      dates: "Aug. 2024 - Present",
      organization: "Self-Directed Research",
      location: "Tempe, AZ, USA",
      bullets: [
        "Implemented MCP inspection controls, offline IAM checks, and non-executing model-artifact analysis across three self-directed repositories.",
        "Automated pytest and GitHub Actions checks for malformed inputs, policy failures, and adversarial artifact fixtures; documented reproducible evidence and remaining security limits."
      ]
    },
    {
      role: "Business & Compliance Lead",
      detail: "AEROSEC (academic externship)",
      dates: "Aug. 2025 - Dec. 2025",
      organization: "Honeywell Aerospace Technologies × Arizona State University (academic externship)",
      location: "Tempe, AZ, USA",
      bullets: [
        "Developed compliance and commercialization analysis for a proposed airline PSS security layer, including a $120K first-year commercialization scenario with a five-year financial model presented to ASU and Honeywell stakeholders."
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
      label: "Agent → Tool Security",
      name: "MCP Agent Security Gateway",
      stack: ["Python", "FastAPI", "MCP/JSON-RPC 2.0", "Elastic Security"],
      dates: "Oct. 2025 - Sep. 2026",
      repository: "https://github.com/poojakira/mcp-agent-security-gateway",
      caseStudy: "https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/APPSEC_CASE_STUDY.md",
      demo: "https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/RECRUITER_DEMO_60S.md",
      problem: "Agent tool calls cross an execution boundary where authorization, content risk, egress policy, rate limits, and audit evidence need to be enforced before downstream execution.",
      solution: "MCP inspection and policy components for tool/server authorization, injection and PII signals, egress checks, rate limiting and hash-chained audit evidence; enforcement differs across integration paths.",
      architecture: ["Agent tool call", "Capability authorization", "PII and exfiltration checks", "Anti-SSRF and rate limits", "Fail-closed enforcement", "Audit and telemetry"],
      bullets: [
        "Implemented tool/server allowlists, egress policies, injection and PII inspection, rate limits, and hash-chained audit logging across supported gateway paths.",
        "Maintained 69 injection-pattern entries and 9 Elastic rule records, with 21 core SIEM tests; controls vary by integration path.",
        "October 10, 2026 UTC Python 3.12 CI: 782 passed at 81.93% statement coverage in the same run."
      ],
      metrics: ["782 tests in cited Python 3.12 CI", "81.93% coverage, same CI run", "69 dated injection-pattern entries", "9 Elastic rules", "21 core SIEM tests"],
      testing: "Run 38012954359 at b6d7122ab6f008bd24fa3fcff933618e051aaae1, initiated October 10, 2026 UTC, passed 782 tests at 81.93% statement coverage. Source inventories separately establish 9 Elastic rule records and 21 core SIEM test functions.",
      limitations: "Controls vary by integration path. HTTP inspection callers must honor returned decisions; the stdio path is not a universal five-control pipeline. Dated tests do not establish production deployment, adoption or universal prevention.",
      history: "Candidate-reported development period: Oct. 2025 - Sep. 2026. Public GitHub history begins Jul. 2026; the cited verification reflects later 2026 repository snapshots, not necessarily the latest commit."
    },
    {
      id: "iam",
      label: "Identity → Authority Security",
      name: "AWS Agent Identity Guard",
      stack: ["Python", "AWS IAM", "SARIF 2.1.0"],
      dates: "Apr. 2025 - Sep. 2025",
      repository: "https://github.com/poojakira/aws-agent-identity-guard",
      problem: "Agent and workload identities can become over-privileged through wildcard grants, iam:PassRole, sts:AssumeRole, weak trust policies, privilege-escalation paths, and missing permission boundaries.",
      solution: "An IAM analyzer with 24 offline policy/trust rules plus a permission-boundary check for optional role metadata, and text, JSON, and SARIF 2.1.0 findings.",
      architecture: ["IAM policy", "Policy/trust and optional role checks", "Finding evidence", "Text / JSON / SARIF", "GitHub Code Scanning", "Code review"],
      bullets: [
        "Implemented 24 offline policy/trust rules plus a permission-boundary check for optional role metadata, covering wildcard grants, PassRole, AssumeRole, and escalation risks.",
        "Produced text, JSON, and SARIF 2.1.0 findings for policy review and GitHub Code Scanning; static analysis does not establish complete effective permissions.",
        "October 10, 2026 UTC CI: 247 collected, 244 passed, 3 skipped; skips are disabled separate-rule-API tests."
      ],
      metrics: ["24 offline rules + 1 role-metadata check", "244 passed / 3 skipped", "SARIF 2.1.0", "GitHub Code Scanning"],
      testing: "Run 38009457205 at bc35752dbfd72a7ce80eb1ad992bc6bc656d70fe, initiated October 10, 2026 UTC, reports 247 collected, 244 passed and 3 disabled separate-rule-API tests skipped.",
      limitations: "The evidence supports deterministic static-policy analysis. It does not claim complete effective-permission evaluation, production latency, or runtime authorization guarantees.",
      history: "Candidate-reported development period: Apr. 2025 - Sep. 2025. Public GitHub history begins Aug. 2026; the cited verification reflects later 2026 repository snapshots, not necessarily the latest commit."
    },
    {
      id: "supply",
      label: "Artifact → Runtime Security",
      name: "HF Model Provenance Scanner",
      stack: ["Python", "SafeTensors", "GGUF", "ONNX", "Keras"],
      dates: "Nov. 2024 - Mar. 2025",
      repository: "https://github.com/poojakira/hf-model-provenance-scanner",
      problem: "Untrusted model repositories and artifacts can carry serialization, loader, dependency, provenance, and obfuscation risk before a model is loaded.",
      solution: "A non-executing scanner that inspects untrusted repositories and artifacts without importing or running their code.",
      architecture: ["Repository or artifact", "Non-executing inspection", "Pickle and AST/taint checks", "Dependency and provenance checks", "Obfuscation and format checks", "Findings"],
      bullets: [
        "Built static, non-executing inspection for SafeTensors, GGUF, ONNX, Keras, and pickle-derived artifacts, plus Python-loader and dependency checks.",
        "Detected 33/33 committed adversarial fixtures, with 0 actionable findings on 4 committed benign samples; these are bounded fixture results.",
        "October 9, 2026 UTC Python 3.12 CI: 260 passed, 1 skipped with 75.67% statement coverage."
      ],
      metrics: ["260 passed / 1 skipped", "75.67% coverage", "33/33 committed adversarial fixtures", "0 actionable / 4 committed benign samples", "Non-executing inspection"],
      testing: "Run 38002138828 at 2f937ba51f31c678e43a064e95d6939e3feb9226, initiated October 9, 2026 UTC, reports 260 passed, 1 skipped and 75.67% statement coverage. Separate guarded static-fixture checks reproduced 33/33 adversarial detections and 0 actionable findings across 4 benign samples.",
      limitations: "The fixture results are bounded regression evidence; the benign result covers only four committed samples. Neither is a universal detection or false-positive rate.",
      history: "Candidate-reported development period: Nov. 2024 - Mar. 2025. Public GitHub history begins Jul. 2026; the cited verification reflects later 2026 repository snapshots, not necessarily the latest commit."
    }
  ] satisfies ProjectItem[],
  education: [
    { school: "Arizona State University", location: "Tempe, AZ, USA", degree: "M.S., Information Technology (Security)", score: "GPA: 3.87/4.00", dates: "Aug. 2024 - May 2026" },
    { school: "M. S. Ramaiah University of Applied Sciences", location: "Bengaluru, KA, India", degree: "B.Tech., Computer Science & Engineering", score: "CGPA: 8.44/10", dates: "Aug. 2019 - Aug. 2023" }
  ],
  academicParticipation: {
    title: "Generative AI Learning Assistant Initiative",
    role: "Student Participant",
    dates: "2025",
    organization: "Arizona State University · Principled Innovation-Infused Learning Engineering",
    description: "Participated in an ASU Principled Innovation-infused Learning Engineering initiative involving a Generative AI learning assistant designed to support personalized education.",
    scope: "Educational participation; separate from professional employment, internship, and research-service appointments.",
    tags: ["Generative AI", "Learning Engineering", "Personalized Education"]
  },
  certifications: [
    "AWS Academy Graduate - Cloud Architecting (Apr. 2025)",
    "AWS Academy Graduate - Cloud Security Foundations (Nov. 2025)"
  ]
} as const;

export const trustChain = ["IDENTITY", "CAPABILITY", "AUTHORIZATION", "EXECUTION", "TELEMETRY", "EVIDENCE"] as const;
export const resumeHref = "./Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf";

