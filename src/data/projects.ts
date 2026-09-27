// Canonical project + evidence data.
// Career facts: resume. Technical metrics: current GitHub repositories (verified 2026-09-26).
// Every metric is VERIFIED (reproduced/counted) or SCOPED (valid within a stated boundary).

export type ClaimStatus = "verified" | "scoped" | "experimental";

export interface Evidence {
  value: string;
  label: string;
  status: ClaimStatus;
  scope?: string;
}

export interface Project {
  slug: string;
  tier: 1 | 2 | 3;
  room: string; // room code e.g. "07"
  roomName: string;
  accent: string; // hex
  title: string;
  category: string;
  question: string; // security question
  tagline: string;
  repo: string;
  stack: string[];
  problem: string;
  threat: string;
  control: string;
  architecture: string[];
  implementation: string;
  validation: string;
  limitations: string[];
  evidence: Evidence[];
}

export const projects: Project[] = [
  {
    slug: "mcp-agent-security-gateway",
    tier: 1,
    room: "07",
    roomName: "Agent Runtime Gateway",
    accent: "#3DD6E0",
    title: "MCP Agent Security Gateway",
    category: "AI agent & tool-call security",
    question: "What happens when an AI agent can call real tools?",
    tagline: "Capability is not permission.",
    repo: "https://github.com/poojakira/mcp-agent-security-gateway",
    stack: ["Python", "FastAPI", "MCP", "JSON-RPC", "Elastic/ECS"],
    problem:
      "LLM agents translate untrusted context into structured tools/call invocations. Once an agent can call tools, a manipulated prompt can drive file access, outbound requests, or process-execution intent. Model alignment does not inspect the resulting tool call at the point it becomes executable.",
    threat:
      "A malicious prompt author, compromised MCP server, or rogue agent produces manipulated tools/call requests that reach downstream tools without an inspection or authorization boundary.",
    control:
      "An inline application-layer gateway that inspects agent MCP tool calls before execution: parsing, argument normalization, capability/trust checks, content detectors, policy evaluation, and tamper-evident audit.",
    architecture: [
      "Agent / MCP client emits tools/call over JSON-RPC",
      "Parse & validate JSON-RPC (reject malformed / duplicate-key / deeply nested)",
      "Normalize obfuscated content (Unicode / zero-width / homoglyph / BiDi, Base64 / ROT13)",
      "Trust & capability checks (server registry / allow-list, shadow-server rejection)",
      "Content signals: 55 prompt-injection patterns, PII, exfiltration, process/egress",
      "Policy evaluation → allow / block (circuit-breaker path fails closed to DENY)",
      "Hash-chained audit + WAL + ECS-formatted telemetry to a local detection lab",
    ],
    implementation:
      "Python inline stdio proxy plus a FastAPI control plane. Enforcement semantics differ per integration path; the Python wrapper raises ToolBlocked when the control plane denies a call.",
    validation:
      "Reproduced locally on a clean environment (CPython 3.12.10): pytest reports 652 passed with 79% statement coverage. Detection assets counted from source.",
    limitations: [
      "Only traffic routed through the gateway can be inspected or blocked.",
      "Heuristic detection — no external false-positive/false-negative rate is measured.",
      "Enforcement is external; the integrating runtime must honor decisions, and semantics differ per path.",
      "Local test success is not operational reliability; no production deployment evidence.",
    ],
    evidence: [
      { value: "652", label: "Passing tests", status: "verified", scope: "Local run, CPython 3.12.10" },
      { value: "79%", label: "Statement coverage", status: "verified", scope: "4804 statements, 998 missed" },
      { value: "55", label: "Prompt-injection patterns", status: "verified" },
      { value: "9", label: "Elastic Security rules", status: "verified" },
      { value: "21", label: "Core SIEM tests", status: "verified" },
    ],
  },
  {
    slug: "aws-agent-identity-guard",
    tier: 2,
    room: "06",
    roomName: "Identity & Workload Trust Vault",
    accent: "#F5A623",
    title: "AWS Agent Identity Guard",
    category: "Cloud & identity security",
    question: "What happens when an AI agent receives cloud permissions?",
    tagline: "Identity is not authorization.",
    repo: "https://github.com/poojakira/aws-agent-identity-guard",
    stack: ["Python", "AWS IAM", "SARIF", "GitHub Code Scanning"],
    problem:
      "AI agents and tool executors assume IAM roles. An over-broad role turns a manipulated agent into real cloud actions: invoking Lambda, assuming roles, changing Bedrock/SageMaker control planes, reading secrets, or disabling CloudTrail. The risk exists at deploy time, before runtime monitoring sees a call.",
    threat:
      "A crafted or over-scoped IAM policy grants agent-specific escalation, identity-pivot, or audit-tampering capability that goes unnoticed until exploited.",
    control:
      "A static, non-executing IAM policy analyzer specialized for AI-agent roles: 25 deterministic rules across identity policies, trust policies, and permission-boundary presence, emitting CI-gating findings.",
    architecture: [
      "Parse IAM policy JSON (stdlib json.loads; reject duplicate keys / non-object)",
      "Identity rules AIG001–021: wildcards, iam:PassRole, privilege escalation, blast radius",
      "Trust-policy rules TP001–003: wildcard principal, ExternalId, SourceArn scoping",
      "Permission-boundary rule PB001 (live mode)",
      "Emit finding + severity + remediation as text / JSON / SARIF 2.1.0",
      "CI exit codes gate the merge via GitHub Code Scanning",
    ],
    implementation:
      "Zero-dependency static file scanning with an optional read-only live-account mode (boto3). No AWS calls in default mode.",
    validation:
      "Reproduced locally (Python 3.12): 235 passed, 3 skipped, all 25 rule IDs test-covered, including property-based parser fuzzing.",
    limitations: [
      "Static analysis only — no runtime enforcement.",
      "No semantic evaluation of Condition key values.",
      "Single-policy scope; no SCP or cross-policy interaction.",
      "Prefix-based action matching may miss new namespaces; false negatives accepted.",
    ],
    evidence: [
      { value: "25", label: "Deterministic rules", status: "verified" },
      { value: "235", label: "Passing tests", status: "verified", scope: "3 skipped; property-based fuzzing" },
      { value: "2.1.0", label: "SARIF output", status: "verified" },
      { value: "3", label: "Output formats (text/JSON/SARIF)", status: "verified" },
    ],
  },
  {
    slug: "hf-model-provenance-scanner",
    tier: 2,
    room: "02",
    roomName: "Model Intake & Provenance Vault",
    accent: "#7C4DFF",
    title: "HF Model Provenance Scanner",
    category: "AI model supply-chain security",
    question: "Can we trust the model artifact before loading it?",
    tagline: "Inspect before execution.",
    repo: "https://github.com/poojakira/hf-model-provenance-scanner",
    stack: ["Python", "Pickle/SafeTensors/GGUF/ONNX/Keras", "AST", "MITRE ATT&CK"],
    problem:
      "Loading a model can execute code. Pickle-based checkpoints run arbitrary opcodes on deserialize; Keras Lambda layers and ONNX custom ops load native code; typosquatted repos impersonate trusted ones. The danger is realized the moment an artifact is loaded, so inspection must happen before that.",
    threat:
      "A crafted model repository or artifact carries unsafe serialization, an impersonated identity, or a supply-chain payload that executes on load.",
    control:
      "A non-executing scanner: 150+ detection rules across 18 analyzers, combining custom pickle-opcode parsing with AST, taint, and symbolic-string analysis over five artifact formats, mapping findings to MITRE ATT&CK v19.",
    architecture: [
      "Enumerate model artifacts and repository metadata",
      "AST pattern matching (exec/eval/subprocess, SSL bypass, ctypes FFI)",
      "Taint + symbolic-string analysis (variable indirection; chr()/decode → exec)",
      "Binary format parsers: pickle opcodes, SafeTensors, GGUF, ONNX, Keras",
      "Provenance / impersonation checks (missing signature/SBOM, typosquat, token leak)",
      "Fail-loud on unanalyzable streams (HFS-096 INDETERMINATE ≥ HIGH); map to ATT&CK v19",
    ],
    implementation:
      "Static analysis only — dynamic execution is disabled. Findings carry ATT&CK v19 mappings and a completeness signal.",
    validation:
      "Committed red-team fixture suite: 33/33 fixtures detected with zero actionable findings on the benign fixtures.",
    limitations: [
      "Fixture-suite results are not a real-world detection rate on arbitrary models.",
      "No broad benign-model false-positive benchmark; missing provenance is a signal, not proof.",
      "Cannot detect weight-space neural backdoors or cross-file taint.",
    ],
    evidence: [
      { value: "150+", label: "Detection rules", status: "verified", scope: "across 18 analyzers" },
      { value: "5", label: "Artifact formats", status: "verified" },
      { value: "33/33", label: "Committed fixtures detected", status: "scoped", scope: "internal red-team fixtures, not real-world rate" },
      { value: "0", label: "Actionable FP on benign set", status: "scoped", scope: "4 committed benign samples" },
    ],
  },
  {
    slug: "llm-redteam-framework",
    tier: 3,
    room: "05",
    roomName: "LLM Red-Team Range",
    accent: "#FF5A5F",
    title: "LLM Red-Team Framework",
    category: "LLM security evaluation",
    question: "What happens when an attacker manipulates the model through language?",
    tagline: "In-distribution is not out-of-distribution.",
    repo: "https://github.com/poojakira/llm-redteam-framework",
    stack: ["Python", "FastAPI", "SARIF", "pytest"],
    problem:
      "A detector benchmarked only on its own attack templates can look near-perfect while failing on rephrased, out-of-distribution attacks. Reporting the in-distribution number alone overstates real defense.",
    threat:
      "An adversary rephrases known jailbreak/injection attacks into novel wording that evades a memorized detector.",
    control:
      "A reproducible framework that generates prompt attacks across six categories and evaluates an offline detector under a grouped in-distribution split and an out-of-distribution paraphrase split.",
    architecture: [
      "Attack taxonomy: direct override, role switching, context escape, indirect injection, obfuscation, multi-step",
      "Prompt mutation (paraphrase / obfuscate)",
      "Score with offline detector over the corpus",
      "Grouped template split (seed 42) → in-distribution headline F1",
      "OOD paraphrase benchmark → generalization gap",
      "Fail-closed HMAC auth, rate limiting, SARIF reporting",
    ],
    implementation:
      "Offline evaluation with fail-closed HMAC authentication and shadow/default evaluation modes.",
    validation:
      "Committed metrics: grouped-split F1 0.9714 vs OOD novel-phrasing F1 0.7188 — the ~25-point drop quantifies memorized surface structure. Suite reports 173 passed at 95.15% coverage.",
    limitations: [
      "OOD F1 0.72 shows much of the headline is template memorization.",
      "External InjectionBench/JailbreakBench fixtures retain canonical markers and are not a true OOD test.",
      "Offline detector; no live-model defense or real-world rate.",
    ],
    evidence: [
      { value: "0.9714", label: "Grouped-split F1", status: "scoped", scope: "synthetic grouped split, seed 42" },
      { value: "0.7188", label: "OOD novel-phrasing F1", status: "verified", scope: "generalization test (honest)" },
      { value: "173", label: "Passing tests", status: "verified", scope: "95.15% coverage" },
      { value: "6", label: "Attack categories", status: "verified" },
    ],
  },
  {
    slug: "dataset-poisoning-detector",
    tier: 3,
    room: "03",
    roomName: "Training Data Integrity Hall",
    accent: "#EA580C",
    title: "Dataset Poisoning Detector",
    category: "Training-data integrity",
    question: "Can the model stay trustworthy if its training data is compromised?",
    tagline: "Screening is not defense.",
    repo: "https://github.com/poojakira/dataset-poisoning-detector",
    stack: ["Python", "scikit-learn", "FastAPI", "Redis", "Prometheus"],
    problem:
      "Poisoned or corrupted samples enter training silently. A vendor feed drifts or a shared table gets bad rows, and precision quietly drops over retraining cycles because the pipeline never errors.",
    threat:
      "An attacker injects corrupted or mislabeled samples at the ingestion boundary (MITRE ATLAS AML.T0020).",
    control:
      "A statistical screening ensemble at the ingestion boundary with quarantine, plus a reproducible efficacy benchmark that quantifies where screening fails.",
    architecture: [
      "Ingest (batch / Kafka / REST) with Welford online statistics",
      "Z-score + IQR per-feature deviation and fencing",
      "Isolation Forest multivariate anomaly scoring (periodic refit)",
      "Spectral signatures for label-flip (within-class covariance)",
      "Majority-vote ensemble (flag when ≥ 2/3 agree)",
      "Quarantine (Redis/SQLite) + alerting + Prometheus metrics",
    ],
    implementation:
      "Eight implemented controls including drift detection and deduplication; the HTTP service fails closed until a trusted baseline is loaded.",
    validation:
      "Committed benchmark shows spectral label-flip F1 of 0.08 / 0.23 / 0.37 across 5/10/20% contamination — the tool documents its own weakness against label-only corruption.",
    limitations: [
      "Low recall on label-flip attacks (F1 0.08–0.37, measured).",
      "Feature-space methods are blind to subtle clean-label attacks.",
      "Synthetic benchmark is not representative of every real pipeline.",
    ],
    evidence: [
      { value: "8", label: "Implemented controls", status: "verified" },
      { value: "0.37", label: "Best spectral F1 (label-flip)", status: "scoped", scope: "@20% contamination, synthetic benchmark" },
      { value: "0.08", label: "Worst F1 @5%", status: "verified", scope: "shown honestly, not hidden" },
      { value: "139", label: "Test functions", status: "verified" },
    ],
  },
  {
    slug: "adversarial-ml-lab",
    tier: 3,
    room: "04",
    roomName: "Adversarial Model Test Chamber",
    accent: "#DB2777",
    title: "Adversarial ML Lab",
    category: "Model robustness",
    question: "Does the model stay reliable under adversarial manipulation?",
    tagline: "Measured is not projected.",
    repo: "https://github.com/poojakira/adversarial-ml-lab",
    stack: ["Python", "PyTorch", "CIFAR-10", "MITRE ATLAS"],
    problem:
      "Small L-infinity perturbations flip confident model predictions. Robustness claims are easy to fake via gradient masking or by pasting literature values as if measured.",
    threat:
      "A white-box adversary applies gradient-based perturbations within an epsilon budget to force misclassification.",
    control:
      "A gradient-attack evaluation harness (FGSM, PGD-L∞, PGD-L2, C&W-L2) that measures robustness collapse on real weights and keeps measured results separate from literature projections.",
    architecture: [
      "Load real model weights (measured, not projected)",
      "Baseline clean prediction",
      "FGSM (ε = 8/255) single-step attack",
      "PGD-L∞ / PGD-L2 iterative attacks with random start",
      "C&W-L2 optimization attack",
      "Record robust accuracy, seeded and timed; map to MITRE ATLAS AML.T0043",
    ],
    implementation:
      "Attacks implemented and measured on real weights; a literature-projection file is stored separately and clearly labeled, never presented as measured.",
    validation:
      "Committed measured run on a SmallCNN: 71.82% clean accuracy and 0% robust accuracy under PGD-L∞ at ε=8/255 (small CPU run, subset evaluation).",
    limitations: [
      "Measured run uses a small subset, not the full test set.",
      "White-box only; no black-box or transfer attacks.",
      "No certified-robustness or state-of-the-art claim.",
    ],
    evidence: [
      { value: "71.82%", label: "Clean accuracy", status: "scoped", scope: "SmallCNN, committed run" },
      { value: "0%", label: "Robust acc (PGD-L∞ ε=8/255)", status: "scoped", scope: "small CPU run, subset" },
      { value: "4", label: "Attack types", status: "verified", scope: "FGSM/PGD-L∞/PGD-L2/C&W" },
    ],
  },
];

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// Rooms in facility order (Trust architecture: model → data → adversarial → LLM → identity → agent → telemetry)
export const rooms = [
  { code: "01", name: "Mission Control", slug: null, accent: "#3DD6E0" },
  { code: "02", name: "Model Intake & Provenance Vault", slug: "hf-model-provenance-scanner", accent: "#7C4DFF" },
  { code: "03", name: "Training Data Integrity Hall", slug: "dataset-poisoning-detector", accent: "#EA580C" },
  { code: "04", name: "Adversarial Model Test Chamber", slug: "adversarial-ml-lab", accent: "#DB2777" },
  { code: "05", name: "LLM Red-Team Range", slug: "llm-redteam-framework", accent: "#FF5A5F" },
  { code: "06", name: "Identity & Workload Trust Vault", slug: "aws-agent-identity-guard", accent: "#F5A623" },
  { code: "07", name: "Agent Runtime Gateway", slug: "mcp-agent-security-gateway", accent: "#3DD6E0" },
  { code: "08", name: "Security Evidence Center", slug: null, accent: "#41D18A" },
] as const;

export const trustChain = [
  "MODEL", "DATA", "ROBUSTNESS", "LLM", "IDENTITY", "RUNTIME", "TOOLS", "TELEMETRY",
];
