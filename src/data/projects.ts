// ============================================================================
// PORTFOLIO TRUTH TABLE
// ----------------------------------------------------------------------------
// Every field below is grounded in the actual GitHub repositories at
// github.com/poojakira, verified by reading each README and repo structure.
// No production usage, customers, revenue, scale, or impact is claimed.
// Scores (0-10) are an internal editorial ranking used only to drive the
// visual hierarchy of the site. They are NOT presented as external metrics.
// ============================================================================

export type Tier = "S" | "A" | "B";

export type SystemCategory =
  | "Agent & Tool Security"
  | "AI Supply-Chain Security"
  | "Cloud & Identity Security"
  | "ML Security & Red-Teaming";

export type ArchitectureFlow = {
  /** Ordered stages of the system's data / control flow. */
  nodes: string[];
  /** Which stage index is the security boundary the project defends. */
  boundaryIndex: number;
};

export type PortfolioProject = {
  repository: string;
  url: string;
  title: string;
  category: SystemCategory;
  tier: Tier;
  status: string; // as described by the repo itself
  language: string;

  // Internal editorial ranking (0-10). Drives layout weight only.
  technicalDepth: number;
  securityRelevance: number;
  aiRelevance: number;
  originality: number;
  implementationQuality: number;
  portfolioValue: number;

  /** One-line positioning. */
  tagline: string;

  /** The real problem the project addresses. */
  problem: string;
  /** What was actually built (verified from source structure + README). */
  system: string;
  /** How it works, at an architectural level. */
  architecture: string;
  /** Threats the system reasons about. */
  threatModel: string[];
  /** Controls / mechanisms actually implemented. */
  controls: string[];
  /** Verifiable evidence committed in the repository. */
  evidence: string[];
  /** Honest limitations the repo itself documents. */
  limitations: string[];

  /** Flow used to render the project-specific 3D/graph visualization. */
  flow: ArchitectureFlow;

  /** Repo signals (only what GitHub actually shows). */
  stars?: number;
  forks?: number;

  /** Frameworks the work maps threats against. */
  frameworks: string[];
};

export const FLAGSHIP_PROJECTS: PortfolioProject[] = [
  {
    repository: "mcp-agent-security-gateway",
    url: "https://github.com/poojakira/mcp-agent-security-gateway",
    title: "MCP Agent Security Gateway",
    category: "Agent & Tool Security",
    tier: "S",
    status: "Oct 2025 – Sep 2026 · Active · open source",
    language: "Python · MCP · JSON-RPC 2.0 · FastAPI · Docker · Kubernetes · Elastic/SIEM",
    stars: 17,
    forks: 5,
    technicalDepth: 9,
    securityRelevance: 10,
    aiRelevance: 10,
    originality: 9,
    implementationQuality: 9,
    portfolioValue: 10,
    tagline: "Security controls for the moment an AI agent stops talking and starts acting.",
    problem:
      "A traditional LLM turns a prompt into text. An agentic system turns a decision into an action: it calls MCP tools, reads files, hits APIs, touches databases and cloud services. Once an agent can act, prompt filtering is no longer the whole security boundary.",
    system:
      "An inline gateway that sits on the agent-to-tool boundary. It ships three real runtime surfaces: an inline MCP stdio proxy, a FastAPI real-time control plane, and a separate HTTP inspection service. It inspects MCP tools/call requests over JSON-RPC 2.0 and makes explicit allow / block / redact / quarantine decisions before an action executes.",
    architecture:
      "A composable five-layer decision pipeline: (1) server registry / trust, (2) inline tool-call policy, (3) process-spawn intent evaluation, (4) semantic intent analysis, (5) network egress policy. Decisions are recorded to a SHA-256 hash-chained, tamper-evident audit log with write-ahead logging, tracing, and Prometheus-style metrics.",
    threatModel: [
      "Prompt injection inside tool-call arguments",
      "PII / sensitive-data leakage through tool calls",
      "Shadow or unregistered MCP servers",
      "Exfiltration patterns (hidden BCC, oversized payloads, raw-IP destinations)",
      "Capability drift / tool-manifest tampering",
    ],
    controls: [
      "50+ prompt-injection rule patterns with Unicode / homoglyph / Base64 / ROT13 normalization",
      "Server trust + capability boundary checks",
      "Circuit breakers that fail closed to DENY",
      "Rate limiting, shadow mode, API-key auth",
      "Hash-chained audit log + WAL for reconstructable decisions",
    ],
    evidence: [
      "622 automated tests at 78% coverage (verified at tagged commit)",
      "Integrated 9 Elastic detection rules, 6 Atomic Red Team-style attack simulations, and 21 SIEM tests for detection and security-event validation",
      "CI across Python 3.10/3.11/3.12 with Ruff, Pyright, Bandit, pip-audit, CodeQL, Trivy, Grype, SBOM",
      "Docker multi-stage build + Kubernetes deployment templates",
      "Detection-engineering lab: ECS formatter, correlation engine, Elastic rules mapped to MITRE ATT&CK",
    ],
    limitations: [
      "Enforcement is external — the gateway returns decisions, the runtime must honor them",
      "Detection is heuristic (false positives / negatives possible)",
      "No OS-level syscall hooking; egress policy is advisory, not a packet firewall",
    ],
    flow: {
      nodes: ["Agent", "Gateway", "Policy", "MCP Server", "Tool"],
      boundaryIndex: 1,
    },
    frameworks: ["OWASP LLM Top 10", "MITRE ATT&CK", "MITRE ATLAS"],
  },
  {
    repository: "aws-agent-identity-guard",
    url: "https://github.com/poojakira/aws-agent-identity-guard",
    title: "AWS Agent Identity Guard",
    category: "Cloud & Identity Security",
    tier: "S",
    status: "Apr 2025 – Sep 2025 · Active · open source",
    language: "Python · AWS IAM · SARIF 2.1.0 · GitHub Code Scanning · Hypothesis",
    forks: 1,
    technicalDepth: 8,
    securityRelevance: 9,
    aiRelevance: 8,
    originality: 9,
    implementationQuality: 9,
    portfolioValue: 9,
    tagline: "A valid identity can still hide an attack path. Static IAM guardrails for agent roles.",
    problem:
      "AI agents and tool executors turn overbroad cloud permissions into real actions: invoking Lambdas, assuming roles, changing Bedrock/SageMaker control planes, reading secrets, disabling audit trails. Most IAM tooling is not agent-aware and runs too late.",
    system:
      "A static IAM linter that reviews policy JSON before deployment. It runs 25 deterministic checks across identity policies, trust policies, and permission-boundary presence — with zero runtime dependencies and no AWS calls in default mode.",
    architecture:
      "Each policy statement is evaluated against agent-specific risk rules (wildcards, iam:PassRole without PassedToService, privilege management, audit tampering, credential-harvest + lateral-movement chains). Findings emit as text, JSON, or SARIF with CI-ready exit codes; an optional boto3 mode scans live account roles.",
    threatModel: [
      "Privilege escalation via iam:PassRole",
      "Audit-trail tampering (CloudTrail / GuardDuty / Config)",
      "Wildcard blast radius and unscoped tool execution",
      "Weak cross-account trust (missing ExternalId / SourceArn)",
      "Credential-harvest + metadata + lateral-movement chains",
    ],
    controls: [
      "25 deterministic rules incl. trust-policy and permission-boundary checks",
      "SARIF output for GitHub Code Scanning + PR merge gate",
      "Deterministic exit codes (0 clean / 1 findings / 2 input error)",
      "Runs offline — no credentials, no cloud calls",
    ],
    evidence: [
      "All 25 rule IDs verified through positive/negative tests, parser edge cases, Hypothesis fuzz testing, failure-mode tests, and SARIF validation; 230 passed tests",
      "Failure-mode tests + verification metadata pinned to a commit",
      "CI performance gate (p95 < 10ms, >1000 policies/sec)",
      "Terraform + integration examples committed",
    ],
    limitations: [
      "Static analysis only — no runtime deny enforcement",
      "Single-policy scope; cross-policy / SCP interactions not modeled",
      "Presence-of-condition checks, not semantic sufficiency of values",
    ],
    flow: {
      nodes: ["Agent", "Identity", "Permissions", "Resource"],
      boundaryIndex: 1,
    },
    frameworks: ["AWS IAM", "SARIF", "Least Privilege"],
  },
  {
    repository: "hf-model-provenance-scanner",
    url: "https://github.com/poojakira/hf-model-provenance-scanner",
    title: "HF Model Provenance Scanner",
    category: "AI Supply-Chain Security",
    tier: "S",
    status: "Nov 2024 – Mar 2025 · Active · open source",
    language: "Python · Pickle · SafeTensors · GGUF · ONNX · MITRE ATT&CK v19",
    technicalDepth: 8,
    securityRelevance: 9,
    aiRelevance: 9,
    originality: 8,
    implementationQuality: 8,
    portfolioValue: 9,
    tagline: "We approved the model — but can we prove it is the trusted one?",
    problem:
      "Teams load model weights from public hubs without verifying where they came from. Pickle exploits, typosquatted repos, obfuscated payloads, and modified model cards can execute code or smuggle in a compromised artifact before a single inference runs.",
    system:
      "A pre-load supply-chain scanner for Hugging Face model repositories. It inspects file headers and metadata across Python, config/dependency files, pickle-derived files, SafeTensors, GGUF, ONNX, and Keras paths — flagging provenance, impersonation, and pickle-risk signals.",
    architecture:
      "Findings are mapped to MITRE ATT&CK v19 with a structured schema (tactic, technique, sub-technique, confidence, data sources). It exports an ATT&CK Navigator layer, produces SARIF, and includes ed25519 model-signing and a runtime torch.load() interception hook.",
    threatModel: [
      "Pickle deserialization → code execution",
      "Typosquatted / impersonated model repos",
      "Unsigned model weights (missing provenance)",
      "Modified model cards / trojanized tokenizers",
      "Model-weight exfiltration & dependency confusion",
    ],
    controls: [
      "Header-level inspection without downloading full weights",
      "ed25519 signing + provenance / SBOM marker checks",
      "MITRE ATT&CK v19 mapping + Navigator layer export",
      "SARIF output and CI action",
    ],
    evidence: [
      "Validated detection against 33 committed red-team fixtures: 12 documented incident reproductions, 18 extended attack variants, and 3 large-scale fixtures — achieving 33/33 detection with reproducible fixture-level evidence",
      "ATT&CK v19 mapping tables with confidence scoring",
      "Integration + end-to-end tests committed",
      "Explicit evidence-boundary table in the README",
    ],
    limitations: [
      "Missing evidence is a risk signal, not proof of compromise",
      "Format support does not imply complete attack coverage",
      "No published false-positive or latency benchmark claimed",
    ],
    flow: {
      nodes: ["Model Repo", "Scanner", "Provenance", "Verified Load"],
      boundaryIndex: 1,
    },
    frameworks: ["MITRE ATT&CK v19", "MITRE ATLAS", "SARIF", "ed25519"],
  },
];

export const SUPPORTING_PROJECTS: PortfolioProject[] = [
  {
    repository: "llm-redteam-framework",
    url: "https://github.com/poojakira/llm-redteam-framework",
    title: "LLM Red-Team Framework",
    category: "ML Security & Red-Teaming",
    tier: "A",
    status: "Jul 2024 – Oct 2024 · Active · open source",
    language: "Python · TF-IDF · Logistic Regression · FastAPI · SARIF · GitHub Actions",
    technicalDepth: 8,
    securityRelevance: 8,
    aiRelevance: 9,
    originality: 8,
    implementationQuality: 9,
    portfolioValue: 8,
    tagline: "Measure a prompt-injection detector honestly — against inputs it has never seen.",
    problem:
      "Teams ship prompt-injection detectors they have never stress-tested. Random train/test splits leak template structure and produce dishonest F1 scores.",
    system:
      "An offline evaluation harness. It generates adversarial corpora across six attack categories (OWASP LLM01/06/07), trains a TF-IDF + Logistic Regression baseline, and measures held-out performance with grouped template splits that prevent leakage.",
    architecture:
      "Generators → detectors → SARIF output, with a FastAPI /scan service, grouped/random eval modes, and MITRE ATT&CK v19 + OWASP mappings. Runs fully offline for air-gapped CI.",
    threatModel: [
      "Prompt injection (direct override, role switch, context escape)",
      "Indirect injection via RAG / documents",
      "Obfuscation and multi-step escalation",
    ],
    controls: [
      "Grouped-split methodology to prevent template leakage",
      "SARIF output + CI merge gate",
      "Rate limiting, API-key auth, model integrity checksum",
    ],
    evidence: [
      "168 tests, 96% coverage",
      "F1 = 0.97 on grouped held-out templates; F1 = 0.83 on novel-phrasing out-of-distribution evaluation — quantifying the generalization gap",
      "Throughput gate (~1,400 prompts/sec)",
    ],
    limitations: [
      "TF-IDF captures lexical patterns, not semantic intent",
      "Cannot detect truly novel attacks absent from templates",
      "Partial OWASP coverage",
    ],
    flow: {
      nodes: ["Corpus", "Detector", "Grouped Eval", "SARIF"],
      boundaryIndex: 1,
    },
    frameworks: ["OWASP LLM Top 10", "MITRE ATT&CK v19", "SARIF"],
  },
  {
    repository: "model-privacy-attacks",
    url: "https://github.com/poojakira/model-privacy-attacks",
    title: "Model Privacy Attacks",
    category: "ML Security & Red-Teaming",
    tier: "A",
    status: "Active · open source",
    language: "Python",
    technicalDepth: 8,
    securityRelevance: 8,
    aiRelevance: 8,
    originality: 7,
    implementationQuality: 8,
    portfolioValue: 8,
    tagline: "How much does your model reveal about its training data — and does the defense actually work?",
    problem:
      "Teams deploy models trained on sensitive data without measuring whether an attacker can tell if a record was in the training set.",
    system:
      "A library that runs membership-inference (direct + shadow), model inversion, and DP-SGD defenses, then reports an AUC and maps results to EU AI Act and NIST AI RMF.",
    architecture:
      "Data prep → attack modules → defense modules → JSON compliance report, with a one-call assessment API for OpenML datasets and a privacy-budget calculator.",
    threatModel: [
      "Membership inference (black-box + shadow)",
      "Model inversion (gradient reconstruction)",
      "Model extraction",
    ],
    controls: [
      "DP-SGD, output perturbation, label smoothing, early stopping",
      "Risk tiers keyed to MIA AUC thresholds",
      "Compliance report generator",
    ],
    evidence: [
      "Key finding: privacy leakage tracks the generalization gap (14% gap → AUC 0.625; <3% → ~0.50)",
      "pytest suite + CI + security scanning",
      "Honest, conservative 4-shadow-model results",
    ],
    limitations: [
      "Approximate privacy accountant — not for regulatory claims",
      "Tabular focus; LLM MIA module less mature",
      "Aggregate leakage, not per-sample",
    ],
    flow: {
      nodes: ["Data", "Model", "Attack", "Defense", "Report"],
      boundaryIndex: 2,
    },
    frameworks: ["EU AI Act", "NIST AI RMF", "MITRE ATLAS"],
  },
  {
    repository: "dataset-poisoning-detector",
    url: "https://github.com/poojakira/dataset-poisoning-detector",
    title: "Dataset Poisoning Detector",
    category: "ML Security & Red-Teaming",
    tier: "A",
    status: "Active · open source",
    language: "Python",
    technicalDepth: 7,
    securityRelevance: 7,
    aiRelevance: 7,
    originality: 6,
    implementationQuality: 8,
    portfolioValue: 7,
    tagline: "A first-pass filter at the training-data ingestion boundary — with honest benchmarks.",
    problem:
      "Slow data corruption — drifting vendor feeds, bad features in shared tables — quietly degrades models across retraining cycles because the pipeline never errors out.",
    system:
      "A streaming ensemble (Z-score, IQR, Isolation Forest, spectral signatures) that scores incoming samples and quarantines suspicious ones, with Kafka, Prometheus, Grafana, and Docker wiring.",
    architecture:
      "Ingestion (Welford online stats) → ensemble majority vote → quarantine + alerting + monitoring. Spectral signatures handle label-flip cases feature-space methods cannot.",
    threatModel: [
      "Feature-outlier injection & distribution shift",
      "Label-flip poisoning",
      "Replay / duplication attacks",
    ],
    controls: [
      "Baseline isolation (flagged samples never update stats)",
      "Concept-drift detection (ADWIN + Page-Hinkley)",
      "Quarantine-first architecture, Bloom-filter dedup",
    ],
    evidence: [
      "~12,400 samples/sec streaming throughput (p99 0.31ms)",
      "Honest 0.53–0.56 AUC on CIFAR-10 label-flip — stated as near chance",
      "MITRE ATLAS AML.T0020 mapping",
    ],
    limitations: [
      "Feature-space methods cannot catch clean-label poisoning",
      "Per-feature independence assumption",
      "Single-threaded scoring",
    ],
    flow: {
      nodes: ["Data Stream", "Detector", "Quarantine", "Monitoring"],
      boundaryIndex: 1,
    },
    frameworks: ["MITRE ATLAS", "Prometheus"],
  },
  {
    repository: "adversarial-ml-lab",
    url: "https://github.com/poojakira/adversarial-ml-lab",
    title: "Adversarial ML Lab",
    category: "ML Security & Red-Teaming",
    tier: "A",
    status: "Active · open source",
    language: "Python",
    technicalDepth: 7,
    securityRelevance: 7,
    aiRelevance: 8,
    originality: 6,
    implementationQuality: 7,
    portfolioValue: 7,
    tagline: "Turn 'the model is 93% accurate' into a robustness number you can gate CI on.",
    problem:
      "Clean test accuracy is a peacetime metric. An imperceptible perturbation can drop a ResNet from 93% to single digits while the dashboard stays green.",
    system:
      "A measurement harness implementing FGSM, PGD, and C&W attacks against CIFAR-10 classifiers, emitting structured JSON reports mapped to MITRE ATLAS AML.T0043.",
    architecture:
      "Clean eval → attack generation → robust eval per epsilon → ATLAS enrichment → JSON report → CI gate that fails below a robustness threshold.",
    threatModel: [
      "White-box gradient attacks (FGSM / PGD / C&W)",
      "Perturbation within an Lp norm budget",
    ],
    controls: [
      "CI robustness gate (PGD robust acc ≥ 30% at eps=8/255)",
      "RobustBench baseline comparison",
      "Adversarial-training reference script",
    ],
    evidence: [
      "73 tests (~29% coverage; 15% CI floor)",
      "Per-epsilon degradation curves in JSON",
      "MITRE ATLAS AML.T0043 mapping",
    ],
    limitations: [
      "Measurement, not defense",
      "CIFAR-10 and known attacks only",
      "No adaptive-attack (AutoAttack) evaluation yet",
    ],
    flow: {
      nodes: ["Model", "Attack", "Robust Eval", "CI Gate"],
      boundaryIndex: 2,
    },
    frameworks: ["MITRE ATLAS", "PyTorch"],
  },
  {
    repository: "mlsec-benchmark-suite",
    url: "https://github.com/poojakira/mlsec-benchmark-suite",
    title: "ML Security Benchmark Suite",
    category: "ML Security & Red-Teaming",
    tier: "A",
    status: "Jan 2024 – Mar 2024 · Active · open source",
    language: "Python · Pytest · JSON Schema · GitHub Actions",
    technicalDepth: 7,
    securityRelevance: 7,
    aiRelevance: 7,
    originality: 7,
    implementationQuality: 8,
    portfolioValue: 7,
    tagline: "Cross-project regression harness that detects interface and behavioral regressions across security tools.",
    problem:
      "Security tooling built across separate repos drifts: interfaces change, behavioral contracts break silently, and there is no shared baseline to detect regressions early.",
    system:
      "A cross-project ML security regression harness using typed adapters, versioned fixtures, declarative contracts, and shared JSON Schema to detect interface and behavioral regressions across security tools.",
    architecture:
      "4 security-tool adapters (IAM analysis, model scanning, prompt-injection detection, dataset-poisoning analysis) → structured results → automated schema validation → CI gate.",
    threatModel: [
      "Interface regression across security tool boundaries",
      "Behavioral drift in detection logic",
      "Schema / contract violations in security findings",
    ],
    controls: [
      "Typed adapters with versioned fixtures",
      "Declarative contracts + JSON Schema validation",
      "CI merge gate on regression failures",
    ],
    evidence: [
      "67 test functions across 8 test modules",
      "HF-scanner run over 3 known-bad and 2 known-good committed fixtures: precision=1.0, recall=1.0, F1=1.0 (scoped strictly to that fixture set)",
    ],
    limitations: [
      "Fixture-scoped results only — not a claim of production accuracy",
      "4-adapter coverage; other tools not yet integrated",
    ],
    flow: {
      nodes: ["Adapters", "Fixtures", "Schema Validation", "CI Gate"],
      boundaryIndex: 2,
    },
    frameworks: ["JSON Schema", "pytest", "GitHub Actions"],
  },
];

// TIER B — Engineering archive. Real work, secondary prominence.
export type ArchiveProject = {
  repository: string;
  url: string;
  title: string;
  description: string;
  category: SystemCategory | "Foundations";
  language: string;
  status: string;
};

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    repository: "attack-v19-core",
    url: "https://github.com/poojakira/attack-v19-core",
    title: "ATT&CK v19 Core",
    description:
      "MITRE ATT&CK v19 data models and technique lookup for Python — the shared mapping foundation reused across the security scanners (revocation maps, v18→v19 migration).",
    category: "Foundations",
    language: "Python",
    status: "Active",
  },
  {
    repository: "PulseNet-RUL-Forecasting",
    url: "https://github.com/poojakira/PulseNet-RUL-Forecasting",
    title: "PulseNet RUL Forecasting",
    description:
      "NASA C-MAPSS remaining-useful-life forecasting with adversarial sensor-input checks, STRIDE threat model, RBAC, SARIF, and secure MLOps controls.",
    category: "ML Security & Red-Teaming",
    language: "Python",
    status: "Archived",
  },
];

export const ALL_FLAGSHIP_AND_SUPPORTING = [
  ...FLAGSHIP_PROJECTS,
  ...SUPPORTING_PROJECTS,
];
