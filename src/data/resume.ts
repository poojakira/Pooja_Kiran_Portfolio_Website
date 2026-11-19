// Project outcomes cite exact reviewed candidates and immutable test evidence; all four release decisions remain PARTIAL.
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
  sourceFile: "Pooja_Kiran_Software_Engineer_Resume.pdf",
  name: "Pooja Kiran",
  headline: "Software Engineer | AI Agents & Application Security",
  positioning: "I build inspectable AI-agent and application-security software, from authorization controls and IAM analysis to reproducible investigation workflows.",
  about: {
    "title": "I make technical work inspectable.",
    "paragraphs": [
      "I build security software where an engineering claim can be traced to an actual request, policy decision, execution receipt, test result, and documented limitation. My projects span MCP agent-tool authorization, AWS IAM policy analysis, model-artifact inspection, and investigation APIs.",
      "I hold an M.S. in Information Technology from Arizona State University. My professional and research experience includes a part-time IT Grader appointment at ASU, a short Cerberus telemetry integration collaboration, the Honeywell Aerospace × ASU academic externship, and supervised undergraduate research.",
      "I use Python, FastAPI, React, PostgreSQL, Docker, and test automation where relevant. Four reviewed project candidates have published regression results and immutable evidence; all remain partial and are not represented as production deployments.",
      "I am targeting software engineering roles involving AI agents, application security, authorization, and security-focused developer tooling."
    ]
  },
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
          "role": "Technical Collaborator",
          "dates": "Sep 29 – Oct 9, 2026",
          "organization": "Cerberus",
          "detail": "Short-term technical collaboration",
          "location": "Remote",
          "bullets": [
              "**Connected MCP gateway telemetry** to the Cerberus event schema, configuring delivery and resolving connectivity issues until test events transferred successfully.",
              "**Verified event attribution for 3 authenticated gateway identities** across persistent configurations, making test records traceable to their source.",
              "**Replayed identical event batches** and observed **no duplicate records** in the tested Cerberus ingestion path; exactly-once execution was not established."
          ]
      },
      {
          "role": "IT Grader",
          "dates": "Jan 2025 – May 2026",
          "organization": "Arizona State University",
          "detail": "Paid part-time appointment | Student Worker III – IT Grader",
          "location": "Tempe, AZ",
          "bullets": [
              "**Evaluated security-compliance work for 53 students** in IFT 483/543, identifying unsupported risk assertions and missing evidence through rubric-based technical feedback.",
              "**Reviewed configuration-management submissions for 101 students** in IFT 380, pinpointing configuration errors and explaining corrections against instructor-defined criteria.",
              "**Inspected web-programming code and milestones for 85 students** in IFT 301, documenting implementation gaps and actionable feedback."
          ]
      },
      {
          "role": "Business & Compliance Lead",
          "dates": "Aug 2025 – Dec 2025",
          "organization": "Honeywell Aerospace × ASU Technology Innovation Lab",
          "detail": "AEROSEC academic externship",
          "location": "Tempe, AZ",
          "bullets": [
              "**Translated findings from 4 industry interviews** into proposed API authorization, encryption, audit-logging, and vendor-risk requirements for AEROSEC.",
              "**Coordinated 3 peer leads** across technical, market, and prototype workstreams during a leadership rotation, tracking dependencies and briefing mentors on deliverables.",
              "**Compared 4 security platforms** against proposed controls and presented **3 evaluator pitches**, informing a staged **12-month implementation proposal**."
          ]
      },
      {
          "role": "Volunteer Research & Publication Collaborator",
          "dates": "Sep 2023 – Dec 2023",
          "organization": "M. S. Ramaiah University of Applied Sciences",
          "detail": "Volunteer research | IEEE INDICON 2023 publication",
          "location": "Bengaluru, India",
          "bullets": [
              "**Authored the Q-learning research manuscript** published at **IEEE INDICON 2023**, documenting an adaptive mathematics-learning approach with faculty coauthors.",
              "**Explained the adaptive-learning design across 3 quiz difficulty levels**, detailing Q-learning question selection and reward feedback.",
              "**Analyzed Q-value updates and reward trends across 3 learner scenarios and 10 episodes each**, translating experimental behavior into conference findings."
          ]
      },
      {
          "role": "Volunteer Undergraduate Research & Development Contributor – AI & Software Engineering",
          "dates": "Aug 2022 – Aug 2023",
          "organization": "M. S. Ramaiah University of Applied Sciences",
          "detail": "Supervised by Dr. Jayahar Sivasubramanian | Volunteer research",
          "location": "Bengaluru, India",
          "bullets": [
              "**Independently built the mathematics-learning application and adaptive tutoring functionality**, turning personalized-learning requirements into working educational software.",
              "**Integrated question-selection and learning-feedback functionality** into educational software for **KSCST-funded project 46S_BE_5506**.",
              "**Coordinated software integration, research documentation, and milestones** within a **3-student team**, collaborating separately on the CubeSat hardware model."
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
              "MCP/JSON-RPC 2.0",
              "Policy engine",
              "Browser workbench"
          ],
          "dates": "Oct 2025 - Oct 2026",
          "problem": "Agent developers need to distinguish a policy decision from an action that actually ran when reviewing tool permissions.",
          "solution": "A local browser workbench sends bounded requests through the canonical policy engine and stdio proxy to a fixed first-party server in a disposable workspace, then exposes receipts, state and execution outcomes.",
          "architecture": [
              "Local request editor",
              "Loopback input boundary",
              "PolicyEngine and StdioMCPProxy",
              "Fixed first-party tool child",
              "Tool receipts and state comparison",
              "Execution report with provenance"
          ],
          "bullets": [
              "Engineered an MCP authorization workbench routing local requests through the actual policy engine and stdio proxy to a disposable first-party server, making execution receipts and tool-side state inspectable.",
              "Compared guarded and unguarded write requests against actual tool-side outcomes; the reviewed candidate recorded 834 passing tests and 81.80% statement coverage.",
              "Preserved uncertainty in exported evidence with NOT_INVOKED, confirmed success/failure and UNKNOWN outcomes; documented remaining protocol, identity and containment gaps."
          ],
          "metrics": [
              "834 passed · 0 skipped",
              "81.80% statement coverage",
              "Actual guarded/unguarded execution",
              "PARTIAL · reviewed candidate"
          ],
          "testing": "November 18, 2026 verification: 834 passed, 0 skipped, 0 failures/errors; 81.80446084185813% local statement coverage at the unchanged 77% gate. Actual browser, installed-wheel and current hosted acceptance checks passed for the linked candidate.",
          "limitations": "Fixed first-party fixture execution is not OS isolation for arbitrary servers. Complete MCP conformance, credential lifecycle, response PII filtering and durable external-effect reconciliation remain missing or unverified. No production or public-service approval.",
          "repository": "https://github.com/poojakira/mcp-agent-security-gateway",
          "caseStudy": "https://github.com/poojakira/mcp-agent-security-gateway/blob/4f83f01a3ed8aca5639143fe2179afb0f864f46e/release-evidence/RELEASE_ASSESSMENT.md",
          "review": "https://github.com/poojakira/mcp-agent-security-gateway/pull/194",
          "architectureUrl": "https://github.com/poojakira/mcp-agent-security-gateway/blob/d2e7b6ea7c1a1f9cb0fb71f73d0a692d8fa0410c/docs/ARCHITECTURE.md",
          "notebook": "https://colab.research.google.com/github/poojakira/mcp-agent-security-gateway/blob/codex/local-workbench-20261116/notebooks/try_product.ipynb",
          "sourceCommit": "d2e7b6ea7c1a1f9cb0fb71f73d0a692d8fa0410c",
          "verificationDate": "2026-11-18",
          "releaseStatus": "PARTIAL",
          "history": "Original project period: Oct 2025 - Oct 2026. Verification snapshot: November 18, 2026, reviewed candidate d2e7b6ea7c1a; main is unchanged."
      },
      {
          "id": "iam",
          "label": "Identity → Authority Security",
          "name": "AWS Agent Identity Guard",
          "stack": [
              "Python",
              "IAM policy analysis",
              "SARIF 2.1.0",
              "Browser studio"
          ],
          "dates": "Apr 2025 - Oct 2026",
          "problem": "Cloud reviewers need evidence for a proposed IAM change without treating a static pattern match as proof of effective access or exploitability.",
          "solution": "A local permission-review studio analyzes supplied identity and optional trust-policy JSON, links findings to exact statements, shows a before/after delta and exports a schema-validated SARIF review without AWS credentials.",
          "architecture": [
              "Supplied identity/trust JSON",
              "Strict bounded parsing",
              "24 static checks",
              "Exact statement evidence",
              "Edit and compare findings",
              "SARIF and human review export"
          ],
          "bullets": [
              "Implemented a credential-free IAM review workflow parsing supplied identity and trust-policy JSON, mapping 24 static checks to statements, and rescanning edited policies.",
              "Exported schema-validated SARIF 2.1.0 evidence for before/after reviews; the reviewed candidate recorded 272 passing tests and 77.15% statement coverage.",
              "Separated 24 static checks from the additional live-context boundary check; retained 3 absent legacy rules-module skips and explicit UNKNOWN effective-permission conclusions."
          ],
          "metrics": [
              "272 passed · 3 legacy-module skips",
              "77.15% statement coverage",
              "24 static checks · SARIF 2.1.0",
              "PARTIAL · no AWS credentials"
          ],
          "testing": "November 18, 2026 verification: 272 passed, 3 skipped, 0 failures/errors; 77.14791851195749% local statement coverage. The skips concern the absent legacy TestRulesModule, not credential-dependent AWS checks. Browser review, official SARIF validation and current hosted acceptance passed for the linked candidate.",
          "limitations": "Static findings are review signals, not proven exploit paths or effective-permission decisions. Complete Deny/SCP/boundary/session/resource-policy evaluation, live AWS context and authenticated public hosting remain missing or unverified.",
          "repository": "https://github.com/poojakira/aws-agent-identity-guard",
          "caseStudy": "https://github.com/poojakira/aws-agent-identity-guard/blob/a396433a4070a0ddc68aa83f9b1093e87fc3224f/release-evidence/RELEASE_ASSESSMENT.md",
          "review": "https://github.com/poojakira/aws-agent-identity-guard/pull/75",
          "architectureUrl": "https://github.com/poojakira/aws-agent-identity-guard/blob/abe1c0a1e5953b18eae762a5c41f400ff677adb2/docs/ARCHITECTURE.md",
          "notebook": "https://colab.research.google.com/github/poojakira/aws-agent-identity-guard/blob/codex/local-workbench-20261116/notebooks/try_product.ipynb",
          "sourceCommit": "abe1c0a1e5953b18eae762a5c41f400ff677adb2",
          "verificationDate": "2026-11-18",
          "releaseStatus": "PARTIAL",
          "history": "Original project period: Apr 2025 - Oct 2026. Verification snapshot: November 18, 2026, reviewed candidate abe1c0a1e595; main is unchanged."
      },
      {
          "id": "supply",
          "label": "Artifact → Runtime Security",
          "name": "HF Model Provenance Scanner | AI Model Trust Inspector",
          "stack": [
              "Python",
              "SafeTensors / GGUF",
              "Static artifact inspection",
              "Bounded Linux worker"
          ],
          "dates": "Nov 2024 - Oct 2026",
          "problem": "ML reviewers need to compare supported artifacts and inspect suspicious structures before loading a model, while keeping unknown publisher and behavioral properties visible.",
          "solution": "A local browser inspector passes one or two bounded artifacts to the actual sealed static worker, compares file, metadata and structure hashes, and exports findings without executing or deserializing model code.",
          "architecture": [
              "One or two local artifacts",
              "Upload and format bounds",
              "Sealed static worker",
              "Hashes, metadata and structures",
              "Side-by-side comparison",
              "Checksummed findings and limits"
          ],
          "bullets": [
              "Made supported model artifacts comparable without model loading, verified by 317 passing candidate tests and 76.08% statement coverage, by connecting a local browser inspector to the sealed static worker.",
              "Demonstrated actual SafeTensors comparison with identical files, changed weights and changed metadata, verifying real hashes, structure differences and downloaded report checksums.",
              "Reported 3 skips and 6 passing native subtests separately from the 317-test total; kept independent closing security review BLOCKED and avoided model-safety or field-detection claims."
          ],
          "metrics": [
              "317 passed · 3 skipped",
              "6 separate native subtests passed",
              "76.08% statement coverage",
              "PARTIAL · independent closure BLOCKED"
          ],
          "testing": "November 18, 2026 verification: 317 individual tests passed, 3 skipped, 0 failures/errors; 6 native subtests passed separately; 76.08318890814559% local statement coverage at the unchanged 75% gate. Actual binary-file browser comparison and current hosted acceptance passed. Independent closing security review remains BLOCKED.",
          "limitations": "Static inspection does not establish publisher identity, training lineage, semantic equivalence, behavioral safety or absence of backdoors. Large artifacts, full GGUF payload validation and hostile public hosting remain unsupported or unverified. Independent closing security review is BLOCKED.",
          "repository": "https://github.com/poojakira/hf-model-provenance-scanner",
          "caseStudy": "https://github.com/poojakira/hf-model-provenance-scanner/blob/ed25d66b72e374f86e2975930b0ed83b9acf3c09/release-evidence/RELEASE_ASSESSMENT.md",
          "review": "https://github.com/poojakira/hf-model-provenance-scanner/pull/103",
          "architectureUrl": "https://github.com/poojakira/hf-model-provenance-scanner/blob/ab26ad5cd6fe28ae1b0986e20da46be9ebb2f27a/docs/ARCHITECTURE.md",
          "notebook": "https://colab.research.google.com/github/poojakira/hf-model-provenance-scanner/blob/codex/local-workbench-20261116/notebooks/try_product.ipynb",
          "sourceCommit": "ab26ad5cd6fe28ae1b0986e20da46be9ebb2f27a",
          "verificationDate": "2026-11-18",
          "releaseStatus": "PARTIAL",
          "history": "Original project period: Nov 2024 - Oct 2026. Verification snapshot: November 18, 2026, reviewed candidate ab26ad5cd6fe; main is unchanged."
      },
      {
          "id": "automotive",
          "label": "Telemetry → Investigation",
          "name": "Attack Detection Engine | Aegis HealthSec",
          "stack": [
              "Python / FastAPI",
              "FHIR AuditEvent subset",
              "PostgreSQL",
              "React / TypeScript"
          ],
          "dates": "Aug 2026 - Oct 2026",
          "problem": "Analysts need to inspect why a rule fired, challenge its threshold and retain reproducible evidence for the same clinical-access dataset.",
          "solution": "A local React/FastAPI workbench ingests bounded synthetic FHIR AuditEvent data, runs the actual detector and correlation engine, persists cases and run evidence in PostgreSQL, then supports threshold changes, reruns and report export.",
          "architecture": [
              "Synthetic FHIR AuditEvent JSON",
              "Bounded normalization",
              "Clinical detector and correlation",
              "PostgreSQL cases and run evidence",
              "Same-dataset threshold challenge",
              "Reload and checksummed export"
          ],
          "bullets": [
              "Delivered a reproducible investigation workflow, verified by 332 passing candidate tests and 82.47% line coverage, by connecting React and authenticated FastAPI to the canonical clinical detector, correlation engine and PostgreSQL.",
              "Made rule decisions challengeable by rerunning the same 30-event synthetic dataset: a threshold change from 25 to 40 removed the observed bulk-access finding, with retained run evidence and checksum-verified export.",
              "Verified saved-case reload and actual API restart through an installed wheel; kept hosted CI unverified and distinguished batch investigation from continuous monitoring or real hospital validation."
          ],
          "metrics": [
              "332 passed · 0 skipped",
              "82.47% line coverage",
              "Persisted same-dataset rerun evidence",
              "PARTIAL · hosted CI NOT VERIFIED"
          ],
          "testing": "November 18, 2026 verification: 332 passed, 0 skipped, 0 failures/errors; 82.47183565275017% local line coverage at the unchanged 53% gate. Nine browser observations and seven installed-wheel/restart checks passed separately. The recorded current hosted CI run is queued/NOT VERIFIED.",
          "limitations": "Synthetic inputs only. This is offline batch investigation, not continuous monitoring, complete FHIR conformance, proof of malicious access or HIPAA approval. Hard parser/detector process isolation, production privacy/recovery/load approval and current hosted acceptance remain incomplete.",
          "repository": "https://github.com/poojakira/attack-detection-engine",
          "caseStudy": "https://github.com/poojakira/attack-detection-engine/blob/875299dd6a7ed061df792d1150371c688383fc05/release-evidence/RELEASE_ASSESSMENT.md",
          "review": "https://github.com/poojakira/attack-detection-engine/pull/58",
          "architectureUrl": "https://github.com/poojakira/attack-detection-engine/blob/aa45efd2f9f7e229a0ae7b7f8d77adac18d96e83/docs/ARCHITECTURE.md",
          "notebook": "https://colab.research.google.com/github/poojakira/attack-detection-engine/blob/codex/local-workbench-20261116/notebooks/try_product.ipynb",
          "sourceCommit": "aa45efd2f9f7e229a0ae7b7f8d77adac18d96e83",
          "verificationDate": "2026-11-18",
          "releaseStatus": "PARTIAL",
          "history": "Original project period: Aug 2026 - Oct 2026. Verification snapshot: November 18, 2026, reviewed candidate aa45efd2f9f7; main is unchanged."
      }
  ] satisfies ProjectItem[],
  education: [
    { school: "Arizona State University", location: "Tempe, AZ, USA", degree: "M.S., Information Technology", score: "GPA: 3.87/4.00", dates: "Aug. 2024 - May 2026" },
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
export const resumeHref = `./${resume.sourceFile}`;

