export type UniverseWorldId =
  | "trust"
  | "agent"
  | "identity"
  | "model"
  | "runtime"
  | "telemetry"
  | "cloud"
  | "vault"
  | "nexus";

export type UniverseWorld = {
  id: UniverseWorldId;
  code: string;
  name: string;
  shortName: string;
  position: [number, number];
  route: string;
  thesis: string;
  problem: string;
  built: string;
  why: string;
  evidence: string[];
  limitation?: string;
  tone: "neutral" | "agent" | "identity" | "model" | "runtime" | "telemetry" | "cloud" | "vault" | "nexus";
};

export const universeWorlds: UniverseWorld[] = [
  {
    id: "trust",
    code: "00",
    name: "TRUST DISTRICT",
    shortName: "Trust District",
    position: [0, 0],
    route: "Central research district",
    thesis: "SECURING THE INFRASTRUCTURE BETWEEN INTELLIGENCE AND ACTION.",
    problem: "Modern intelligent systems cross many trust boundaries before a real action occurs.",
    built: "This district organizes Pooja's engineering work as one connected trust architecture instead of unrelated projects.",
    why: "It gives every visitor a physical and conceptual map of the security problems she works on.",
    evidence: ["Identity", "navigation", "world selection", "resume", "AI interface"],
    tone: "neutral",
  },
  {
    id: "agent",
    code: "01",
    name: "AGENT SECURITY",
    shortName: "Agent Security",
    position: [0, -34],
    route: "North compute corridor",
    thesis: "CAPABILITY IS NOT PERMISSION.",
    problem: "AI agents can invoke increasingly powerful external tools.",
    built: "An inline MCP / JSON-RPC gateway that inspects tool calls before downstream execution and applies policy, capability checks, prompt-injection signals and telemetry.",
    why: "The control sits at the point where model intent becomes a privileged action.",
    evidence: ["641 passing tests", "79.54% statement coverage", "55 injection patterns", "9 Elastic rules"],
    limitation: "Research implementation. Heuristic detection can miss attacks or flag benign input; only routed calls are governed.",
    tone: "agent",
  },
  {
    id: "identity",
    code: "02",
    name: "IDENTITY METROPOLIS",
    shortName: "Identity",
    position: [34, -8],
    route: "East authorization causeway",
    thesis: "AUTHORITY IS A GRAPH, NOT A BOOLEAN.",
    problem: "Cloud identities accumulate authority through policies, roles, trust relationships and delegation.",
    built: "A static AWS IAM analyzer for excessive permissions, risky trust, privilege paths, permission boundaries and agent identity risks.",
    why: "The blast radius of an autonomous system is shaped by what its identity can reach.",
    evidence: ["25 deterministic rule IDs", "230 passed / 3 skipped", "SARIF 2.1.0", "scoped CI performance gates"],
    limitation: "Static analysis; it does not model every organization-wide or runtime permission interaction.",
    tone: "identity",
  },
  {
    id: "model",
    code: "03",
    name: "MODEL PROVENANCE LAB",
    shortName: "Model Trust",
    position: [28, 28],
    route: "South-east clinical transit",
    thesis: "A MODEL IS SOFTWARE YOU DID NOT WRITE.",
    problem: "A model artifact can carry supply-chain risk before inference begins.",
    built: "A non-executing model provenance scanner for provenance gaps, unsafe serialization, suspicious loaders, impersonation and configuration anomalies.",
    why: "Trust must be established before an artifact is loaded into a trusted environment.",
    evidence: ["199 passed / 1 skipped", "12/12 core fixtures", "18/18 extended variants", "3/3 large-scale fixtures"],
    limitation: "Fixture-suite evidence is scoped and is not a universal model-security accuracy claim.",
    tone: "model",
  },
  {
    id: "runtime",
    code: "04",
    name: "RUNTIME FOUNDRY",
    shortName: "Runtime",
    position: [0, 42],
    route: "South industrial tunnel",
    thesis: "ISOLATION MUST SURVIVE EXECUTION.",
    problem: "Security assumptions change once code is running across processes, filesystems, networks and identities.",
    built: "A spatial engineering world for the runtime, container, service and hardening controls supported by Pooja's repositories.",
    why: "Runtime boundaries decide what a compromised or autonomous component can actually affect.",
    evidence: ["container hardening", "service identity", "network controls", "runtime policy"],
    limitation: "Gray-box concepts remain conservative until each public runtime claim is reconciled to repository evidence.",
    tone: "runtime",
  },
  {
    id: "telemetry",
    code: "05",
    name: "TELEMETRY ORBIT",
    shortName: "Telemetry",
    position: [-34, 26],
    route: "West uplink elevator",
    thesis: "OBSERVABILITY PRECEDES CONTROL.",
    problem: "Security controls are difficult to trust if their decisions and failures cannot be observed.",
    built: "A visualization of audit events, SIEM detections, network/host telemetry and correlation concepts backed by project evidence.",
    why: "Detection and response depend on seeing security-relevant state transitions quickly and clearly.",
    evidence: ["Elastic detections", "SIEM validation", "audit telemetry", "ATT&CK mapping where supported"],
    tone: "telemetry",
  },
  {
    id: "cloud",
    code: "06",
    name: "CLOUD FORTRESS",
    shortName: "Cloud",
    position: [-38, -12],
    route: "North-west infrastructure road",
    thesis: "INFRASTRUCTURE MUST MAKE AUTHORITY EXPLICIT.",
    problem: "Cloud infrastructure controls determine what workloads, networks and services can reach.",
    built: "A world for cloud identity, service boundaries, infrastructure policy and network controls supported by Pooja's work.",
    why: "Identity describes who may act; infrastructure determines what the environment permits.",
    evidence: ["AWS IAM", "least privilege", "CloudTrail concepts", "network egress controls"],
    tone: "cloud",
  },
  {
    id: "vault",
    code: "07",
    name: "ENGINEERING VAULT",
    shortName: "Engineering Vault",
    position: [-10, 17],
    route: "Secure district elevator",
    thesis: "SHOW THE EVIDENCE.",
    problem: "Visual spectacle is meaningless if engineering claims cannot be inspected.",
    built: "A direct evidence surface for source code, tests, CI, design decisions, assumptions, limitations and repository history.",
    why: "This is where the universe stops abstracting and proves what actually exists.",
    evidence: ["source", "tests", "CI", "metrics anchors", "limitations"],
    tone: "vault",
  },
  {
    id: "nexus",
    code: "08",
    name: "TRUST NEXUS",
    shortName: "Trust Nexus",
    position: [8, -58],
    route: "Cross-domain synthesis corridor",
    thesis: "THE MODEL IS NOT THE SYSTEM.",
    problem: "Trust fails when security is treated as one isolated control instead of an execution path.",
    built: "A synthesis of intent → agent → model → tool → identity → authorization → execution → telemetry → response.",
    why: "The final architecture shows how Pooja's strongest work connects across the complete trust path.",
    evidence: ["agent", "identity", "model", "runtime", "cloud", "telemetry", "evidence"],
    tone: "nexus",
  },
];

export const universeWorldMap = Object.fromEntries(
  universeWorlds.map((world) => [world.id, world]),
) as Record<UniverseWorldId, UniverseWorld>;

export const guidedRoute: UniverseWorldId[] = [
  "trust",
  "agent",
  "identity",
  "model",
  "vault",
  "nexus",
];
