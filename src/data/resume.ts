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
        "Mapped agent-to-tool, cloud IAM, and model supply-chain threats to enforceable controls, static checks, and repeatable regression tests.",
        "Automated Python regression and GitHub Actions validation across 3 self-directed security projects; dated CI evidence includes 752 gateway tests, 25 IAM rule IDs, and 260 model-scanner tests."
      ]
    },
    {
      role: "Business & Compliance Lead",
      detail: "AEROSEC",
      dates: "Aug. 2025 - Dec. 2025",
      organization: "Honeywell Aerospace Technologies x Arizona State University",
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
      label: "Agent â†’ Tool Security",
      name: "MCP Agent Security Gateway",
      stack: ["Python", "FastAPI", "MCP/JSON-RPC 2.0", "Elastic Security"],
      dates: "Oct. 2025 - Sep. 2026",
      repository: "https://github.com/poojakira/mcp-agent-security-gateway",
      caseStudy: "https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/APPSEC_CASE_STUDY.md",
      demo: "https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/RECRUITER_DEMO_60S.md",
      problem: "Agent tool calls cross an execution boundary where authorization, content risk, egress policy, rate limits, and audit evidence need to be enforced before downstream execution.",
      solution: "A default-deny MCP/JSON-RPC gateway that validates capabilities, inspects prompt-injection and PII/exfiltration signals, applies anti-SSRF controls and rate limiting, and records tamper-evident audit evidence.",
      architecture: ["Agent tool call", "Capability authorization", "PII and exfiltration checks", "Anti-SSRF and rate limits", "Fail-closed enforcement", "Audit and telemetry"],
      bullets: [
        "Built a default-deny MCP/JSON-RPC 2.0 gateway with 5 pre-execution controls: capability authorization, prompt-injection inspection, PII/exfiltration checks, anti-SSRF egress policy, and rate limiting.",
        "Expanded the injection-pattern collection from 55 in an earlier verified snapshot to 69 in current source code, with tamper-evident policy-decision audit logging.",
        "Cited Docker CI: 752 passing tests; earlier CI snapshot: 81.91% statement coverage, plus 9 Elastic rules and 21 core SIEM tests."
      ],
      metrics: ["752 tests in cited Docker CI", "81.91% earlier coverage", "69 prompt-injection patterns", "9 Elastic rules", "21 core SIEM tests"],
      testing: "A cited October 2026 Docker CI run passed 752 tests; a separate earlier CI snapshot measured 81.91% statement coverage, with 9 Elastic rules and 21 core SIEM tests.",
      limitations: "The evidence supports implemented controls and bounded test results. It does not claim customer deployment, enterprise adoption, or universal prevention.",
      history: "Candidate-reported development period: Oct. 2025 - Sep. 2026. Public GitHub history begins Jul. 2026; the cited verification reflects later 2026 repository snapshots, not necessarily the latest commit."
    },
    {
      id: "iam",
      label: "Identity â†’ Authority Security",
      name: "AWS Agent Identity Guard",
      stack: ["Python", "AWS IAM", "SARIF 2.1.0"],
      dates: "Apr. 2025 - Sep. 2025",
      repository: "https://github.com/poojakira/aws-agent-identity-guard",
      problem: "Agent and workload identities can become over-privileged through wildcard grants, iam:PassRole, sts:AssumeRole, weak trust policies, privilege-escalation paths, and missing permission boundaries.",
      solution: "A static IAM analyzer with 25 deterministic rules and text, JSON, and SARIF 2.1.0 outputs for CI and GitHub Code Scanning.",
      architecture: ["IAM policy", "25 deterministic rules", "Finding evidence", "Text / JSON / SARIF", "GitHub Code Scanning", "Code review"],
      bullets: [
        "Built an IAM static analyzer with 25 deterministic rules covering wildcard grants, iam:PassRole, sts:AssumeRole, privilege escalation, trust-policy weaknesses, audit tampering, and permission boundaries.",
        "Produced 3 finding formats (text, JSON, SARIF 2.1.0), integrating SARIF with GitHub Code Scanning for reviewable IAM policy risks.",
        "Verified 2026 CI snapshot: 247 collected, 244 passed, and 3 credential-dependent live-scan tests skipped."
      ],
      metrics: ["25 deterministic rules", "244 passed / 3 skipped", "SARIF 2.1.0", "GitHub Code Scanning"],
      testing: "The cited 2026 repository verification snapshot reports 247 collected, 244 passed, and 3 credential-dependent live-scan tests skipped.",
      limitations: "The evidence supports deterministic static-policy analysis. It does not claim complete effective-permission evaluation, production latency, or runtime authorization guarantees.",
      history: "Candidate-reported development period: Apr. 2025 - Sep. 2025. Public GitHub history begins Aug. 2026; the cited verification reflects later 2026 repository snapshots, not necessarily the latest commit."
    },
    {
      id: "supply",
      label: "Artifact â†’ Runtime Security",
      name: "HF Model Provenance Scanner",
      stack: ["Python", "SafeTensors", "GGUF", "ONNX", "Keras"],
      dates: "Nov. 2024 - Mar. 2025",
      repository: "https://github.com/poojakira/hf-model-provenance-scanner",
      problem: "Untrusted model repositories and artifacts can carry serialization, loader, dependency, provenance, and obfuscation risk before a model is loaded.",
      solution: "A non-executing scanner that inspects untrusted repositories and artifacts without importing or running their code.",
      architecture: ["Repository or artifact", "Non-executing inspection", "Pickle and AST/taint checks", "Dependency and provenance checks", "Obfuscation and format checks", "Findings"],
      bullets: [
        "Engineered non-executing inspection across 5 model artifact families: SafeTensors, GGUF, ONNX, Keras, and pickle-derived files; avoided running untrusted model code by default.",
        "Combined pickle-opcode, AST/taint, provenance/dependency, and obfuscation checks; detected 33/33 committed adversarial fixtures (12 incident recreations, 18 variants, 3 large-scale cases).",
        "Verified 2026 CI snapshot: 260 passed, 1 skipped, and 75.67% statement coverage; fixture detection separately evaluated."
      ],
      metrics: ["260 passed / 1 skipped", "75.67% coverage", "33/33 committed adversarial fixtures", "0 actionable / 4 committed benign samples", "Non-executing inspection"],
      testing: "The cited 2026 repository verification snapshot reports 260 passed, 1 skipped at 75.67% statement coverage, 33/33 committed adversarial fixtures detected, and 0 actionable findings across 4 committed benign samples.",
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
    organization: "Arizona State University Â· Principled Innovation-Infused Learning Engineering",
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

