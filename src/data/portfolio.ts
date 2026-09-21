/** Public portfolio content: supplied September 2026 résumé, not live test results. */
export const SITE_PATH = "/Pooja_Kiran_Portfolio_Website";
export const RESUME_URL = `${SITE_PATH}/Pooja_Kiran_Security_Engineer_Resume.pdf`;
export const PORTRAIT_URL = `${SITE_PATH}/pooja-kiran.png`;

export const profile = {
  name: "Pooja Kiran",
  title: "Security Engineer",
  email: "poojakiranbhardwaj@gmail.com",
  github: "https://github.com/poojakira",
  linkedin: "https://www.linkedin.com/in/poojakiran/",
  location: "Tempe, Arizona",
};

export const experience = [
  {
    period: "Jul 2024 - Present",
    role: "Independent AI Security Researcher & Engineer",
    organization: "Self-Directed Security Research",
    location: "Tempe, AZ",
    bullets: [
      "Owned the architecture and delivery of three open-source Python security systems addressing unsafe AI tool invocation, excessive agent privileges, and model artifacts from unverified sources, codifying 55 prompt-injection patterns and 25 IAM security rules.",
      "Drove end-to-end validation through 1,058 documented passing tests covering prompt-injection controls, IAM rule behavior, model-artifact inspection, parser edge cases, and adversarial scenarios.",
      "Integrated findings into automated engineering workflows through SARIF 2.1.0, GitHub Code Scanning, Elastic Security detections, SIEM validation, and CI enforcement gates.",
    ],
  },
  {
    period: "Jul 2025 - Nov 2025",
    role: "Business and Compliance Lead",
    organization: "AEROSEC Externship · ASU / Honeywell Aerospace Partnership",
    location: "Tempe, AZ",
    bullets: [
      "Directed business, security, and compliance planning for a $120K first-year passenger-service-system security scenario, translating third-party risk into deployment, operational readiness, and commercialization decisions.",
      "Owned a five-year financial and deployment model evaluating implementation cost, growth assumptions, and security trade-offs, identifying a scenario with approximately 12% cost savings.",
      "Presented security, compliance, financial, and deployment recommendations to ASU faculty and Honeywell mentors, supporting risk-informed project strategy.",
    ],
  },
  {
    period: "Dec 2024 - Sep 2025",
    role: "Graduate Teaching Assistant | IT Grader",
    organization: "Arizona State University",
    location: "Tempe, AZ",
    bullets: [
      "Managed technical assessment of approximately 85 undergraduate web programming submissions per term, identifying implementation defects and delivering structured, rubric-driven engineering feedback.",
      "Evaluated 52 graduate IT security assignments spanning cybersecurity policy, compliance, and security concepts while enforcing consistent assessment standards.",
      "Resolved grading inconsistencies with ASU faculty and communicated technical corrections across programming and cybersecurity coursework.",
    ],
  },
] as const;

export const projects = [
  {
    number: "01", category: "AI agent & tool security", title: "MCP Agent Security Gateway",
    period: "Jul 2026 - Present", repository: "mcp-agent-security-gateway",
    summary: "Inspect the tool call. Enforce the boundary.",
    description: "An inline MCP and JSON-RPC 2.0 gateway that inspects tool calls before downstream execution, creating a policy enforcement boundary between agent intent and privileged actions.",
    controls: "55 prompt-injection patterns, Unicode/Base64/ROT13 normalization, capability checks, PII and exfiltration signals, hash-chained audit logs, rate limiting, and security telemetry.",
    metrics: ["629 passing tests", "78.47% statement coverage", "9 Elastic rules"],
    evidence: "21 SIEM tests and end-to-end ELK event shipping with 0 Filebeat errors in the local Docker lab. Elastic Security rules are mapped to MITRE ATT&CK.",
    scope: "A research implementation, not a guarantee against all prompt injection. Heuristic detection can miss attacks or flag benign input; downstream integrations must honor inspection decisions.",
    stack: ["Python", "MCP", "JSON-RPC 2.0", "FastAPI", "Elastic Security"],
  },
  {
    number: "02", category: "Cloud & identity security", title: "AWS Agent Identity Guard",
    period: "Aug 2026 - Sep 2026", repository: "aws-agent-identity-guard",
    summary: "Find risky permissions before deployment.",
    description: "A static IAM policy analyzer for autonomous agents that surfaces excessive permissions, privilege-escalation paths, risky trust policies, audit tampering, and missing permission boundaries.",
    controls: "25 deterministic rules covering high-risk permissions, with JSON and SARIF 2.1.0 findings, GitHub Code Scanning annotations, and exit-code gates for high and critical conditions.",
    metrics: ["230 passing tests", "25 IAM rule IDs", "SARIF 2.1.0"],
    evidence: "Positive and negative cases, parser fuzzing, SARIF conformance, and failure-mode tests. CI performance gates target p95 under 10 ms per policy and more than 1,000 policies per second.",
    scope: "Static policy analysis, not runtime enforcement. Single-policy findings do not model all cross-policy or organization-level permission interactions.",
    stack: ["Python", "AWS IAM", "SARIF", "Hypothesis", "GitHub Code Scanning"],
  },
  {
    number: "03", category: "AI model supply-chain security", title: "HF Model Provenance Scanner",
    period: "Jul 2026 - Sep 2026", repository: "hf-model-provenance-scanner",
    summary: "Inspect the artifact before loading the model.",
    description: "A non-executing scanner that inspects untrusted repositories and model artifacts for provenance gaps, unsafe serialization, suspicious loaders, impersonation, and configuration anomalies.",
    controls: "Inspection across Python loaders, pickle bytecode, SafeTensors, GGUF, ONNX, dependency indicators, signatures, and SBOM evidence without executing untrusted artifacts.",
    metrics: ["199 passing tests", "12/12 core fixtures", "18/18 extended variants"],
    evidence: "Committed red-team fixture suites detected the documented core incident reproductions and extended variants, with 0 actionable false positives across 4 benign samples.",
    scope: "These results describe a small committed fixture set, not universal detection accuracy. Missing provenance is a risk signal, not proof that an artifact is malicious.",
    stack: ["Python", "Pickle analysis", "SafeTensors", "GGUF", "ONNX", "SBOM"],
  },
] as const;

export const skillGroups = [
  { title: "Security engineering", items: ["Security architecture", "Threat modeling", "Security automation", "Automated testing", "Vulnerability scanning", "Incident response runbooks"] },
  { title: "AI & agent security", items: ["MCP", "Prompt injection detection", "Secure tool invocation", "Capability enforcement", "PII leakage detection", "Data exfiltration detection"] },
  { title: "Cloud & identity", items: ["AWS IAM", "Least privilege", "iam:PassRole", "sts:AssumeRole", "Trust policies", "Permission boundaries", "CloudTrail"] },
  { title: "Detection & networks", items: ["Elastic Security", "SIEM", "MITRE ATT&CK", "Security telemetry", "Audit logging", "Network egress controls"] },
  { title: "Programming & platforms", items: ["Python", "Bash / Shell", "FastAPI", "REST APIs", "JSON-RPC 2.0", "Linux", "Docker"] },
  { title: "DevSecOps & supply chain", items: ["GitHub Actions", "SARIF 2.1.0", "CodeQL", "Bandit", "Trivy", "pip-audit", "Model provenance", "SBOM"] },
] as const;
