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
  leadershipResumeFile: "Pooja_Kiran_Software_Engineer_Resume.pdf",
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
          "detail": "Security integration collaboration",
          "location": "Remote",
          "bullets": [
              "**Integrated MCP gateway telemetry** with the Cerberus event schema, configuring test-event delivery and troubleshooting connectivity to complete successful transfers.",
              "**Validated test-event delivery for 3 authenticated gateway identities**, confirming accurate attribution to their registered identities.",
              "**Verified 3 persistent identity configurations** and duplicate-batch safety, confirming that replaying the same test batch created **no duplicate records**."
          ]
      },
      {
          "role": "IT Grader",
          "dates": "Jan 2025 – May 2026",
          "organization": "Arizona State University",
          "detail": "Information technology and security coursework",
          "location": "Tempe, AZ",
          "bullets": [
              "**Reviewed security-compliance submissions for 53 students** in IFT 483/543, documenting risk and evidence gaps through rubric-based feedback.",
              "**Evaluated configuration-management coursework for 101 students** in IFT 380, identifying technical issues against instructor-defined criteria.",
              "**Assessed web-programming assignments for 85 students** in IFT 301, reviewing code and project milestones and providing corrective feedback."
          ]
      },
      {
          "role": "Business & Compliance Lead",
          "dates": "Aug 2025 – Dec 2025",
          "organization": "Honeywell Aerospace × ASU Technology Innovation Lab",
          "detail": "AEROSEC industry externship",
          "location": "Tempe, AZ",
          "bullets": [
              "**Converted findings from 4 of 12 industry interviews** into proposed API authorization, encryption, audit-logging, and vendor-risk requirements for AEROSEC.",
              "**Coordinated 3 remote peer leads** across technical, market, and prototype work during a leadership rotation, tracking deliverables and communicating progress to mentors.",
              "**Compared 4 security platforms and delivered 3 evaluator pitches**, informing a proposed 12-month implementation plan."
          ]
      },
      {
          "role": "Volunteer Research & Publication Collaborator",
          "dates": "Sep 2023 – Dec 2023",
          "organization": "M. S. Ramaiah University of Applied Sciences",
          "detail": "Volunteer research | IEEE INDICON 2023 publication",
          "location": "Bengaluru, India",
          "bullets": [
              "**Led manuscript preparation as first-listed of 3 authors** for a Q-learning research paper published in the proceedings of **IEEE INDICON 2023**.",
              "**Documented personalized mathematics quizzes with 3 difficulty levels**, incorporating adaptive question selection and reward-based feedback.",
              "**Analyzed 3 learner scenarios across 10 episodes each**, communicating Q-value changes and reward trends in conference research materials."
          ]
      },
      {
          "role": "Volunteer Undergraduate Research & Development Contributor – AI & Software Engineering",
          "dates": "Aug 2022 – Aug 2023",
          "organization": "M. S. Ramaiah University of Applied Sciences",
          "detail": "Supervised by Dr. Jayahar Sivasubramanian | Volunteer research",
          "location": "Bengaluru, India",
          "bullets": [
              "**Independently developed a mathematics-learning application and adaptive AI tutoring functionality** for satellite-supported education research.",
              "**Contributed educational software to KSCST-funded project 46S_BE_5506**, one of **1,494 funded proposals from 5,961** statewide submissions.",
              "**Integrated learning software and coordinated research documentation and milestones** within a **3-student team**; CubeSat hardware development was collaborative."
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
              "Enabled inspectable tool-permission reviews, verified by 834 passing candidate regression tests and 81.80% statement coverage, by connecting a local request editor to the actual policy engine, proxy and disposable tool server.",
              "Made permission changes observable by rerunning the same write request with the guard enabled and disabled, comparing actual receipts and tool-side state instead of relying on a decision badge.",
              "Preserved uncertainty in exported evidence with NOT_INVOKED, confirmed success/failure and UNKNOWN outcomes; documented remaining protocol, identity and containment gaps."
          ],
          "metrics": [
              "834 passed · 0 skipped",
              "81.80% statement coverage",
              "Actual guarded/unguarded execution",
              "PARTIAL · reviewed candidate"
          ],
          "testing": "November 18, 2026 verification: 834 passed, 0 skipped, 0 failures/errors; 81.80446084185813% local statement coverage at the unchanged 77% gate. Actual browser, installed-wheel and hosted workbench acceptance checks passed at the linked candidate SHA.",
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
              "Made proposed IAM changes reviewable, verified by 272 passing candidate tests and 77.15% statement coverage, by connecting a browser editor to the actual identity/trust scanners and statement-level evidence.",
              "Enabled a bounded before/after review by rescanning edited policies and exporting SARIF 2.1.0 results validated against the official schema in acceptance tests.",
              "Separated 24 static checks from the additional live-context boundary check; retained 3 absent legacy rules-module skips and explicit UNKNOWN effective-permission conclusions."
          ],
          "metrics": [
              "272 passed · 3 legacy-module skips",
              "77.15% statement coverage",
              "24 static checks · SARIF 2.1.0",
              "PARTIAL · no AWS credentials"
          ],
          "testing": "November 18, 2026 verification: 272 passed, 3 skipped, 0 failures/errors; 77.14791851195749% local statement coverage. The skips concern the absent legacy TestRulesModule, not credential-dependent AWS checks. Browser review, official SARIF validation and hosted studio acceptance passed at the linked candidate SHA.",
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
          "testing": "November 18, 2026 verification: 317 individual tests passed, 3 skipped, 0 failures/errors; 6 native subtests passed separately; 76.08318890814559% local statement coverage at the unchanged 75% gate. The archive records actual binary-file browser comparison. GitHub reports successful CI and Production Gate runs at the linked candidate SHA. Independent closing security review remains BLOCKED.",
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
          "testing": "November 18, 2026 verification: 332 passed, 0 skipped, 0 failures/errors; 82.47183565275017% local line coverage at the unchanged 53% gate. Nine browser observations and seven installed-wheel/restart checks passed separately. The archived hosted CI run is queued/NOT VERIFIED.",
          "limitations": "Synthetic inputs only. This is offline batch investigation, not continuous monitoring, complete FHIR conformance, proof of malicious access or HIPAA approval. Hard parser/detector process isolation, production privacy/recovery/load approval and current hosted acceptance remain incomplete.",
          "repository": "https://github.com/poojakira/attack-detection-engine",
          "caseStudy": "https://github.com/poojakira/attack-detection-engine/blob/875299dd6a7ed061df792d1150371c688383fc05/release-evidence/RELEASE_ASSESSMENT.md",
          "review": "https://github.com/poojakira/attack-detection-engine/pull/58",
          "architectureUrl": "https://github.com/poojakira/attack-detection-engine/blob/aa45efd2f9f7e229a0ae7b7f8d77adac18d96e83/docs/ARCHITECTURE.md",
          "notebook": "https://colab.research.google.com/github/poojakira/attack-detection-engine/blob/codex/local-workbench-20261116/notebooks/try_product.ipynb",
          "sourceCommit": "aa45efd2f9f7e229a0ae7b7f8d77adac18d96e83",
          "verificationDate": "2026-11-18",
          "releaseStatus": "PARTIAL",
          "history": "Original project period: Aug 2026 - Oct 2026. Verification snapshot: November 18, 2026, archived candidate aa45efd2f9f7. See the draft PR for the current review head."
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
export const managerResumeHref = `./${resume.leadershipResumeFile}`;

