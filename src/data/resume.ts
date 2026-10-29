// Recruiter-facing project links point to actual evidence; unmerged features use explicit branch or PR references.
export type ExperienceItem = {
  role: string;
  detail?: string;
  dates: string;
  organization: string;
  location: string;
  bullets: string[];
};

export type ProjectItem = {
  id: "mcp" | "iam" | "supply" | "automotive";
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
  sourceFile: "Pooja_Kiran_Security_Engineer_Resume.pdf",
  leadershipResumeFile: "Pooja_Kiran_Engineering_Manager_Resume.pdf",
  name: "Pooja Kiran",
  headline: "Security Engineering | Technical Leadership | AI & Product Security",
  positioning: "I build security controls, coordinate teams, and translate technical risks into decisions.",
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
      "role": "Independent AI Security Researcher & Engineer",
      "dates": "Aug 2024 – Present",
      "organization": "Self-Directed Research",
      "location": "Tempe, AZ",
      "bullets": [
        "Built the **MCP Agent Security Gateway** with **Python, FastAPI, and MCP/JSON-RPC** to guard against unauthorized AI-agent actions, prompt injection, and sensitive-data exposure; implemented **69 detection signatures**, **default-deny authorization**, and **9 Elastic Security rules**, supported by **782 passing tests** and **81.93% statement coverage** in a documented CI run.",
        "Worked directly with an **early-stage security startup founder** to integrate **privacy-preserving identity telemetry** into the MCP gateway; delivered authenticated client paths for **3 identities** and secured **independent verification of event attribution**, helping clarify **customer-onboarding requirements and deployment limitations**.",
        "Developed **open-source security tools** to identify excessive **AWS IAM permissions**, assess **AI model supply-chain risks**, and investigate security events; implemented **25 IAM analysis rules** and validated **244 identity-security tests** and **296 attack-detection tests**, delivering reproducible findings and documented controls for developers and security teams."
      ]
    },
    {
      "role": "Business & Compliance Lead",
      "detail": "Technology Innovation Lab Externship",
      "dates": "Aug 2025 – Dec 2025",
      "organization": "Honeywell Aerospace × Arizona State University | Technology Innovation Lab Externship",
      "location": "Tempe, AZ",
      "bullets": [
        "Assigned responsibilities to **three remote peer project leads** during designated AEROSEC lab phases; reviewed technical, customer-research, and prototype work, tracked deliverables, and reported to mentors to keep the **four-member team** aligned on project decisions.",
        "Interviewed **4 of 12 industry participants** and coordinated findings with research and technical teammates; translated aviation security risks into proposed requirements for **API authorization**, **encryption**, **audit logging**, and **vendor-risk management**.",
        "Led business and financial planning, **compared 4 commercial security solutions**, and developed a **proposed $120,000 first-year budget** with a **12-month operating plan**; presented market, security-risk, and financial assumptions across **3 pitches to Honeywell evaluators** to support feasibility decisions."
      ]
    },
    {
      "role": "Graduate Teaching Assistant | IT Grader",
      "dates": "Jan 2025 – Oct 2025",
      "organization": "Arizona State University | Ira A. Fulton Schools of Engineering",
      "location": "Tempe, AZ",
      "bullets": [
        "Reviewed code, milestones, and final projects for approximately **85 undergraduate students per semester**; provided **rubric-based technical feedback** to help students correct web application defects and meet project requirements.",
        "Evaluated **52 graduate cybersecurity assignments** covering **risk assessment**, **security compliance**, **infrastructure security**, and **configuration management**; identified gaps in technical reasoning and explained corrections against course criteria.",
        "Coordinated **grading and student communication** with instructors, addressed technical questions and grading disputes, and escalated exceptions to maintain **consistent assessment and timely feedback** across courses."
      ]
    }
  ] satisfies ExperienceItem[],
  projects: [
    {
      id: "mcp",
      label: "Agent → Tool Security",
      name: "MCP Agent Security Gateway",
      stack: ["Python", "FastAPI", "MCP/JSON-RPC 2.0", "Elastic Security"],
      dates: "Oct 2025 - Oct 2026",
      repository: "https://github.com/poojakira/mcp-agent-security-gateway",
      caseStudy: "https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/APPSEC_CASE_STUDY.md",
      demo: "https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/RECRUITER_DEMO_60S.md",
      problem: "Agent tool calls cross an execution boundary where authorization, content risk, egress policy, rate limits, and audit evidence need to be enforced before downstream execution.",
      solution: "A default-deny MCP/JSON-RPC gateway that validates capabilities, inspects prompt-injection and PII/exfiltration signals, applies anti-SSRF controls and rate limiting, and records tamper-evident audit evidence.",
      architecture: ["Agent tool call", "Capability authorization", "PII and exfiltration checks", "Anti-SSRF and rate limits", "Fail-closed enforcement", "Audit and telemetry"],
      bullets: [
        "Engineered a default-deny agent-to-tool gateway with capability checks, request inspection, anti-SSRF egress rules, and rate limits.",
        "Implemented 69 named prompt-injection signatures, PII/exfiltration signals, hash-chained auditing, and nine Elastic Security rule records.",
        "Built automated regression coverage for gateway controls and SIEM integration; the Python 3.12 suite passed 782 tests with 81.93% statement coverage."
      ],
      metrics: ["782 tests in cited Python 3.12 CI", "81.93% coverage, same CI run", "69 prompt-injection patterns", "9 Elastic rules", "21 core SIEM tests"],
      testing: "The October 10, 2026 Python 3.12 CI run 38012954359 passed 782 tests at 81.93% statement coverage, with 9 Elastic rules and 21 core SIEM tests.",
      limitations: "The evidence supports implemented controls and bounded test results. It does not claim customer deployment, enterprise adoption, or universal prevention.",
      history: "Project work: Oct 2025 to Oct 2026. CI figures are from a specific October 2026 Python 3.12 run, not operational detection effectiveness."
    },
    {
      id: "iam",
      label: "Identity → Authority Security",
      name: "AWS Agent Identity Guard",
      stack: ["Python", "AWS IAM", "SARIF 2.1.0"],
      dates: "Apr 2025 - Oct 2026",
      repository: "https://github.com/poojakira/aws-agent-identity-guard",
      problem: "Agent and workload identities can become over-privileged through wildcard grants, iam:PassRole, sts:AssumeRole, weak trust policies, privilege-escalation paths, and missing permission boundaries.",
      solution: "A static IAM analyzer with 25 deterministic rules and text, JSON, and SARIF 2.1.0 outputs for CI and GitHub Code Scanning.",
      architecture: ["IAM policy", "25 deterministic rules", "Finding evidence", "Text / JSON / SARIF", "GitHub Code Scanning", "Code review"],
      bullets: [
        "Built a static workload-identity analyzer for dangerous grants, escalation paths, trust-policy weaknesses, and missing permission boundaries.",
        "Implemented 25 deterministic rules for wildcard access, iam:PassRole, sts:AssumeRole, and trust policies; emitted CI-readable SARIF findings.",
        "Tested IAM policy analysis through CI, with 244 passing tests; three live-AWS checks were skipped because they required credentials."
      ],
      metrics: ["25 deterministic rules", "244 passed / 3 skipped", "SARIF 2.1.0", "GitHub Code Scanning"],
      testing: "The cited 2026 repository verification snapshot reports 247 collected, 244 passed, and 3 credential-dependent live-scan tests skipped.",
      limitations: "The evidence supports deterministic static-policy analysis. It does not claim complete effective-permission evaluation, production latency, or runtime authorization guarantees.",
      history: "Project work: Apr 2025 to Oct 2026. Static policy analysis does not establish live AWS authorization outcomes."
    },
    {
      id: "supply",
      label: "Artifact → Runtime Security",
      name: "HF Model Provenance Scanner",
      stack: ["Python", "SafeTensors", "GGUF", "ONNX", "Keras"],
      dates: "Nov 2024 - Oct 2026",
      repository: "https://github.com/poojakira/hf-model-provenance-scanner",
      problem: "Untrusted model repositories and artifacts can carry serialization, loader, dependency, provenance, and obfuscation risk before a model is loaded.",
      solution: "A non-executing scanner that inspects untrusted repositories and artifacts without importing or running their code.",
      architecture: ["Repository or artifact", "Non-executing inspection", "Pickle and AST/taint checks", "Dependency and provenance checks", "Obfuscation and format checks", "Findings"],
      bullets: [
        "Built non-executing model artifact scanning for pickle-derived, SafeTensors, GGUF, ONNX, and Keras formats.",
        "Combined serialization, AST/taint, provenance, and dependency checks; flagged 33 of 33 committed adversarial test fixtures.",
        "Tested model artifact inspection in CI: 260 tests passed with 75.67% statement coverage."
      ],
      metrics: ["260 passed / 1 skipped", "75.67% coverage", "33/33 committed adversarial fixtures", "0 actionable / 4 committed benign samples", "Non-executing inspection"],
      testing: "The cited 2026 repository verification snapshot reports 260 passed, 1 skipped at 75.67% statement coverage, 33/33 committed adversarial fixtures detected, and 0 actionable findings across 4 committed benign samples.",
      limitations: "The fixture results are bounded regression evidence; the benign result covers only four committed samples. Neither is a universal detection or false-positive rate.",
      history: "Project work: Nov 2024 to Oct 2026. Committed regression fixtures are bounded tests, not population-level malware detection evidence."
    }
    ,
    {
      id: "automotive",
      label: "Telemetry → Investigation",
      name: "Attack Detection Engine | Aegis HealthSec",
      stack: ["Python", "FastAPI", "PostgreSQL", "React / TypeScript", "Docker", "MITRE ATT&CK v19"],
      dates: "Aug 2026 - Oct 2026",
      repository: "https://github.com/poojakira/attack-detection-engine",
      caseStudy: "https://github.com/poojakira/attack-detection-engine/blob/feat/milestone-c-platform/MILESTONE_C_FINAL_REPORT.md",
      problem: "Security teams need more than isolated alerts: related events must become explainable, durable incidents that authorized analysts can investigate and resolve.",
      solution: "Extended an ATT&CK-oriented detection engine and offline CAN/firmware/ARM analysis with healthcare access rules, deterministic correlation, PostgreSQL persistence, a FastAPI investigation service and a React SOC console. These extensions remain on open, unmerged feature branches.",
      architecture: ["Synthetic clinical access telemetry", "Normalize and validate", "Rule-based detection", "Evidence-based correlation", "PostgreSQL incident record", "Authenticated analyst review and audit"],
      bullets: [
        "Built offline automotive CAN/CAN-FD and firmware/ARM ELF32 lab analysis alongside the existing ATT&CK-oriented detection pipeline.",
        "Added clinical-access detection on a development branch; MIMIC-IV Demo supplies de-identified clinical context, while all access events are synthetic.",
        "Developed an authenticated investigation workflow that ingests events, correlates findings, persists incidents, and records analyst resolution and audit actions; demonstrated using real PostgreSQL and Docker in controlled tests."
      ],
      metrics: ["212 local tests: Milestone C, Oct 27 2026", "280 local tests reported: Milestone D", "Hosted CI blocked; PRs unmerged", "FHIR R4 AuditEvent connector: PR #50 (unmerged) · 296 local tests reported"],
      testing: "Milestone C's October 27, 2026 report documents 212 passing Python 3.12.3 tests, PostgreSQL integration and a controlled Docker end-to-end scenario. Milestone D reports 280 local tests after hardening. These are separate historical snapshots, not additive totals; hosted CI is disabled.",
      limitations: "The investigation platform and hardening are currently on unmerged development branches. Healthcare events and incidents in the demonstration are synthetic; MIMIC-IV Demo does not supply audit logs or access authorization. FHIR R4 AuditEvent ingestion is published for review in unmerged PR #50, with 296 local tests reported for Milestone E; hosted CI remains blocked and live hospital ingestion is not claimed. No hospital deployment, HIPAA certification, production readiness, or real-world detection-rate claim.",
      history: "Initial ARM/CAN work was verified on main in October 2026 (68 local tests); the newer investigation and security-hardening evidence belongs to separate, unmerged October 27 development branches."
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
export const resumeHref = "./Pooja_Kiran_Security_Engineer_Resume.pdf";
export const managerResumeHref = "./Pooja_Kiran_Engineering_Manager_Resume.pdf";

