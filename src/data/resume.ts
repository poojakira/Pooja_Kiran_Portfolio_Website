// Public profile content aligned to the owner-supplied TPM resume.
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
  caseStudy: string;
  review: string;
  architectureUrl: string;
  notebook: string;
  sourceCommit: string;
  verificationDate: string;
  releaseStatus: "PARTIAL";
};

export const resume = {
  name: "Pooja Kiran",
  headline: "Technical Program Manager | Security & AI Systems",
  positioning: "Technical Program Manager with 3+ years of full-time software engineering and technical program delivery experience, including 1 year as a TPM, and 1+ year of part-time technical experience. Led 3 cross-functional teams (12+ professionals) across software, cloud and API programs. M.S. in Information Technology (GPA 3.87/4.00), with hands-on security engineering and AI-agent security experience.",
  about: {
  "title": "Technical program delivery, security & AI systems",
  "paragraphs": [
    "Technical Program Manager with 3+ years of full-time software engineering and technical program delivery experience, including 1 year as a TPM, and 1+ year of part-time technical experience. Led 3 cross-functional teams (12+ professionals) across software, cloud and API programs. M.S. in Information Technology (GPA 3.87/4.00), with hands-on security engineering and AI-agent security experience."
  ]
},
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
  caseStudy: string;
  review: string;
  architectureUrl: string;
  notebook: string;
  sourceCommit: string;
  verificationDate: string;
  releaseStatus: "PARTIAL";
};

export const resume = {
  name: "Pooja Kiran",
  headline: "Software Engineer | Python Backend & API Integration | AI Agent Security",
  positioning: "I engineer Python APIs and software integrations, with a focus on authorization, reliable execution, and inspectable results.",
  about: {
    "title": "I make technical work inspectable.",
    "paragraphs": [
      "I like being able to show the request, the rule, the result, and the limits. That is the thread connecting my software projects with the way I review technical work and coordinate delivery.",
      "I hold an M.S. in Information Technology from Arizona State University. My experience spans IT grading at ASU, a short technical collaboration with Cerberus, the Honeywell Aerospace × ASU AEROSEC externship, and volunteer research.",
      "In my independent projects, I build Python tools and local interfaces for agent permissions, IAM policy reviews, model-artifact inspection, and synthetic event investigations. I publish the test evidence and make the remaining gaps explicit.",
      "I am interested in software development and Python or AI tooling roles that value careful implementation, useful feedback, and clear ownership."
    ]
  },
  location: "Tempe, AZ | Open to relocation / hybrid",
  phone: "+1 480-776-7745",
  email: "poojakiranbhardwaj@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/poojakiran",
    github: "https://github.com/poojakira",
    portfolio: "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website"
  },
  skillGroups: [
  {
    "label": "Program Management",
    "items": [
      "Roadmaps",
      "Agile",
      "Release planning",
      "Dependency tracking",
      "Stakeholder communication",
      "UAT"
    ]
  },
  {
    "label": "Security",
    "items": [
      "API security",
      "Threat modeling",
      "Policy enforcement",
      "Audit logging",
      "Security testing",
      "Incident investigation"
    ]
  },
  {
    "label": "Engineering",
    "items": [
      "Python",
      "SQL",
      "FastAPI",
      "REST",
      "MCP/JSON-RPC",
      "PostgreSQL",
      "React",
      "Docker",
      "GitHub Actions"
    ]
  }
],
  experience: [
  {
    "role": "Technical Collaborator",
    "dates": "Sep 2026 - Oct 2026",
    "organization": "Cerberus",
    "detail": "Technical collaboration",
    "location": "",
    "bullets": [
      "Established successful test-event ingestion through third-party technical collaboration, integrating MCP gateway telemetry with the Cerberus event schema and resolving connectivity issues.",
      "Verified source attribution across 3 authenticated identities and observed zero duplicate records during identical test-batch replays; documented validation scope."
    ]
  },
  {
    "role": "Graduate Teaching Assistant / IT Grader",
    "dates": "Jan 2025 - May 2026",
    "organization": "Arizona State University",
    "detail": "Student Worker III, part-time",
    "location": "Mesa, AZ",
    "bullets": [
      "Identified unsupported risk claims and evidence gaps in security compliance work for 53 students through rubric-based technical evaluation.",
      "Provided corrective technical feedback on configuration-management submissions for 101 students and web-programming submissions for 85 students."
    ]
  },
  {
    "role": "Technical Program Manager - Software & Security Delivery",
    "dates": "Aug 2023 - Jul 2024",
    "organization": "Vanguard Sourcing",
    "detail": "Full-time",
    "location": "India (remote)",
    "bullets": [
      "Led end-to-end program execution across 3 cross-functional teams (12+ engineering, QA and design professionals), coordinating software, cloud and API roadmaps, sprints and resources.",
      "Aligned US and India stakeholders on competing delivery priorities, program milestones and dependencies through Agile planning and program governance.",
      "Coordinated API security reviews, threat modeling and CI/CD release gates to integrate security controls into software delivery."
    ]
  },
  {
    "role": "Associate Technical Project Coordinator & Software Engineer",
    "dates": "Jan 2021 - Jul 2023",
    "organization": "Vanguard Sourcing",
    "detail": "Full-time",
    "location": "India (remote)",
    "bullets": [
      "Coordinated software releases through requirements gathering, sprint planning, UAT and release documentation; contributed to Python, SQL and REST API development.",
      "Supported cross-team handoffs by tracking dependencies and QA issues and maintaining project trackers and API validation checklists."
    ]
  }
] satisfies ExperienceItem[],
  volunteerExperience: [
  {
    "role": "Volunteer Research & Publication Collaborator",
    "dates": "Sep 2023 - Dec 2023",
    "organization": "M. S. Ramaiah University of Applied Sciences",
    "detail": "",
    "location": "Bengaluru, India",
    "bullets": [
      "First-authored an IEEE INDICON 2023 paper on personalized mathematics learning using Q-learning, with faculty coauthors.",
      "Documented adaptive question selection across 3 difficulty levels and analyzed reward trends across 3 learner scenarios with 10 episodes each."
    ]
  },
  {
    "role": "Volunteer Undergraduate R&D Contributor - AI & Software",
    "dates": "Aug 2022 - Aug 2023",
    "organization": "M. S. Ramaiah University of Applied Sciences",
    "detail": "",
    "location": "Bengaluru, India",
    "bullets": [
      "Independently developed adaptive mathematics-learning software for KSCST-funded project 46S_BE_5506, integrating question selection and learning feedback.",
      "Coordinated software integration, research documentation and milestones within a 3-student team; contributed separately to a CubeSat hardware model."
    ]
  }
] satisfies ExperienceItem[],
  projects: [
  {
    "id": "mcp",
    "label": "Agent → Tool Security",
    "name": "MCP Agent Security Gateway",
    "stack": [
      "Python",
      "FastAPI",
      "MCP/JSON-RPC"
    ],
    "dates": "2026 - Present",
    "problem": "AI-agent tool calls need deterministic authorization before forwarding.",
    "solution": "Fail-closed AI-agent security gateway for supported MCP/JSON-RPC paths.",
    "architecture": [
      "Tool call",
      "Deterministic policy",
      "Allow / block",
      "Supported forwarding path",
      "Audit evidence"
    ],
    "bullets": [
      "Built a fail-closed AI-agent security gateway that evaluates deterministic allow/block policies before forwarding tool calls on supported MCP/JSON-RPC paths.",
      "Established data-driven security benchmarks with 782 passing tests and 81.93% statement coverage in October 2026 hosted Linux CI; implemented 69 named prompt-injection signatures and capability and egress-policy checks.",
      "Enabled traceable security decisions through hash-chained audit logs, write-ahead logging and distributed tracing; maintained threat models and documented release limitations."
    ],
    "metrics": [
      "782 passing tests",
      "81.93% statement coverage",
      "69 named prompt-injection signatures"
    ],
    "testing": "October 2026 hosted Linux CI: 782 passing tests and 81.93% statement coverage.",
    "limitations": "Supported MCP/JSON-RPC paths; documented release limitations.",
    "repository": "https://github.com/poojakira/mcp-agent-security-gateway",
    "caseStudy": "https://github.com/poojakira/mcp-agent-security-gateway/blob/4f83f01a3ed8aca5639143fe2179afb0f864f46e/release-evidence/RELEASE_ASSESSMENT.md",
    "review": "https://github.com/poojakira/mcp-agent-security-gateway/pull/194",
    "architectureUrl": "https://github.com/poojakira/mcp-agent-security-gateway/blob/d2e7b6ea7c1a1f9cb0fb71f73d0a692d8fa0410c/docs/ARCHITECTURE.md",
    "notebook": "https://colab.research.google.com/github/poojakira/mcp-agent-security-gateway/blob/codex/local-workbench-20261116/notebooks/try_product.ipynb",
    "sourceCommit": "d2e7b6ea7c1a1f9cb0fb71f73d0a692d8fa0410c",
    "verificationDate": "2026-11-18",
    "releaseStatus": "PARTIAL",
    "history": "Owner & Technical Lead · 2026 - Present"
  },
  {
    "id": "automotive",
    "label": "Telemetry → Investigation",
    "name": "Aegis HealthSec",
    "stack": [
      "FastAPI",
      "React",
      "PostgreSQL"
    ],
    "dates": "2026 - Present",
    "problem": "Investigations need authenticated event ingestion, detection, correlation and analyst workflows.",
    "solution": "End-to-end investigation platform with controlled access and durable audit records.",
    "architecture": [
      "Authenticated event ingestion",
      "Rule-based detection",
      "Incident correlation",
      "Analyst workflow",
      "Durable audit records"
    ],
    "bullets": [
      "Built an end-to-end investigation platform connecting authenticated event ingestion, rule-based detection, incident correlation and analyst workflows.",
      "Implemented security controls for role-based access, organization-scoped queries, idempotent ingestion and durable audit records to support controlled investigations.",
      "Validated investigation workflows with 212 passing tests in October 2026 local/containerized runs, including real PostgreSQL integration and restart persistence."
    ],
    "metrics": [
      "212 passing tests",
      "Real PostgreSQL integration",
      "Restart persistence"
    ],
    "testing": "October 2026 local/containerized runs: 212 passing tests.",
    "limitations": "Validation scope: local/containerized investigation workflows.",
    "repository": "https://github.com/poojakira/attack-detection-engine",
    "caseStudy": "https://github.com/poojakira/attack-detection-engine/blob/875299dd6a7ed061df792d1150371c688383fc05/release-evidence/RELEASE_ASSESSMENT.md",
    "review": "https://github.com/poojakira/attack-detection-engine/pull/58",
    "architectureUrl": "https://github.com/poojakira/attack-detection-engine/blob/aa45efd2f9f7e229a0ae7b7f8d77adac18d96e83/docs/ARCHITECTURE.md",
    "notebook": "https://colab.research.google.com/github/poojakira/attack-detection-engine/blob/codex/local-workbench-20261116/notebooks/try_product.ipynb",
    "sourceCommit": "aa45efd2f9f7e229a0ae7b7f8d77adac18d96e83",
    "verificationDate": "2026-11-18",
    "releaseStatus": "PARTIAL",
    "history": "Owner & Technical Lead · 2026 - Present"
  }
] satisfies ProjectItem[],
  education: [
    { school: "Arizona State University", location: "Tempe, AZ, USA", degree: "M.S., Information Technology (Security)", score: "GPA: 3.87/4.00", dates: "May 2026" },
    { school: "M. S. Ramaiah University of Applied Sciences", location: "Bengaluru, KA, India", degree: "B.Tech., Computer Science & Engineering", score: "", dates: "Aug 2023" }
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
export const resumeDownloads = [{ title: "Technical Program Manager | Security & AI Systems", filename: "Pooja_Kiran_TPM_Resume.pdf", className: "role-option-engineering" }] as const;
