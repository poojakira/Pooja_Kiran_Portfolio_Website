"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RESUME_URL, profile } from "@/data/portfolio";
import type { TravelMode, TrustPhase, TrustWorldId } from "@/components/trust-universe/TrustUniverseCanvas";

type EntryMode = "guided" | "free";
type IntroStage = "boot" | "verified" | "ready" | "entered";

type World = {
  id: TrustWorldId;
  code: string;
  name: string;
  short: string;
  place: string;
  thesis: string;
  problem: string;
  control: string;
  why: string;
  evidence: string[];
  limitation?: string;
  incident?: {
    title: string;
    path: string[];
    result: string;
  };
  repo?: string;
};

const WORLDS: World[] = [
  {
    id: "core",
    code: "00",
    name: "THE TRUST CORE",
    short: "Trust Core",
    place: "Glass command center · Central skyline",
    thesis: "EVERY SYSTEM DEPENDS ON TRUST.",
    problem: "Autonomous software crosses tool, identity, model, runtime, infrastructure, and observability boundaries before one real-world action completes.",
    control: "The Trust Core makes those boundaries visible as one connected security architecture instead of isolated portfolio pages.",
    why: "The visitor sees the system first, then the security layer, then the engineering evidence.",
    evidence: ["One connected world", "Guided and free exploration", "Evidence-first project rooms", "Accessible text experience"],
  },
  {
    id: "agent",
    code: "01",
    name: "AGENT CITY",
    short: "Agent City",
    place: "Autonomous services district",
    thesis: "CAPABILITY IS NOT PERMISSION.",
    problem: "An AI agent can turn a model decision into a tool call that touches APIs, files, processes, networks, databases, and cloud services.",
    control: "MCP Agent Security Gateway inspects MCP / JSON-RPC tool calls before execution using server trust, capability checks, prompt-injection signals, semantic intent, process-spawn checks, network-egress policy, and auditable decisions.",
    why: "The boundary that matters is the point where intent becomes action.",
    evidence: ["629 passing tests in the current validated suite", "50+ prompt-injection detection patterns", "Elastic / SIEM detection content", "Hash-chained audit evidence"],
    limitation: "Research implementation. Heuristic detection can miss malicious input or flag benign input, and only traffic routed through the control is governed.",
    repo: "mcp-agent-security-gateway",
    incident: {
      title: "Compromised agent requests a dangerous tool action",
      path: ["AI AGENT", "MCP REQUEST", "SERVER TRUST", "CAPABILITY", "INTENT", "INJECTION", "PROCESS", "EGRESS", "BLOCK"],
      result: "The action is intercepted before downstream execution and the decision becomes security telemetry.",
    },
  },
  {
    id: "identity",
    code: "02",
    name: "IDENTITY DISTRICT",
    short: "Identity",
    place: "Cloud authorization towers",
    thesis: "IDENTITY IS NOT AUTHORIZATION.",
    problem: "A valid workload identity can still carry excessive or dangerous authority through wildcards, role assumption, iam:PassRole, weak trust, and broad service permissions.",
    control: "AWS Agent Identity Guard performs deterministic static IAM analysis before deployment and emits CI-ready findings including SARIF.",
    why: "For autonomous workloads, blast radius is defined by the authority attached to identity.",
    evidence: ["25 deterministic IAM rule IDs", "230 passing tests in the validated suite", "SARIF 2.1.0 output", "CI policy gates and scoped performance checks"],
    limitation: "Static analysis does not model every organization-wide or runtime permission interaction.",
    repo: "aws-agent-identity-guard",
    incident: {
      title: "AI workload requests a privilege path",
      path: ["WORKLOAD", "ROLE", "TRUST POLICY", "PERMISSIONS", "iam:PassRole", "SECOND ROLE", "SENSITIVE SERVICE", "REMEDIATE"],
      result: "The privilege path is surfaced before deployment and can be reduced toward least privilege.",
    },
  },
  {
    id: "model",
    code: "03",
    name: "MODEL SUPPLY-CHAIN LAB",
    short: "Model Lab",
    place: "Isolated research campus",
    thesis: "A MODEL IS SOFTWARE YOU DID NOT WRITE.",
    problem: "Model artifacts and repositories can carry provenance, impersonation, unsafe serialization, dependency, and supply-chain risk before inference begins.",
    control: "HF Model Provenance Scanner performs non-executing static inspection across supported model and configuration formats, then produces structured findings and evidence.",
    why: "Trust should be established before an artifact is loaded into a trusted environment.",
    evidence: ["199 passing tests in the current validated suite", "Committed red-team fixtures", "Pickle / SafeTensors / GGUF / ONNX / Keras paths", "Provenance and impersonation checks"],
    limitation: "Fixture-suite detection is scoped evidence, not a universal accuracy claim for every model or attack.",
    repo: "hf-model-provenance-scanner",
    incident: {
      title: "Untrusted model artifact enters the inspection pipeline",
      path: ["MODEL", "PROVENANCE", "REPOSITORY", "CONFIG", "DEPENDENCIES", "FORMAT", "RISK SIGNAL", "QUARANTINE"],
      result: "Risk signals are surfaced before loading and the artifact can be quarantined for review.",
    },
  },
  {
    id: "adversarial",
    code: "04",
    name: "ADVERSARIAL TESTING FACILITY",
    short: "Red Team Lab",
    place: "Underground validation facility",
    thesis: "GOOD SECURITY TESTING MEASURES WHERE THE SYSTEM FAILS.",
    problem: "A detector that only succeeds on familiar attack templates can create false confidence.",
    control: "The LLM red-team work uses adversarial categories, normalization, regression data, grouped splitting, held-out evaluation, and novel-phrasing evaluation to measure generalization.",
    why: "Security evidence is more credible when failures, false positives, and generalization gaps are visible.",
    evidence: ["Prompt-injection categories", "TF-IDF + logistic regression baseline", "Grouped template splitting", "Held-out and novel-phrasing evaluation"],
    incident: {
      title: "Visitor launches an adversarial prompt",
      path: ["ATTACK", "NORMALIZE", "FEATURES", "DETECT", "CLASSIFY", "POLICY", "LOG", "RESULT"],
      result: "The result records both success and failure instead of hiding the difficult cases.",
    },
  },
  {
    id: "soc",
    code: "05",
    name: "SECURITY OPERATIONS CENTER",
    short: "SOC",
    place: "Enterprise detection floor",
    thesis: "OBSERVABILITY PRECEDES RESPONSE.",
    problem: "A security decision that cannot be reconstructed is difficult to investigate, validate, or improve.",
    control: "Security telemetry, audit events, Elastic / SIEM detections, correlations, and attack simulations turn control decisions into evidence analysts can inspect.",
    why: "This connects a workload event to an analyst without pretending every screen is a threat map.",
    evidence: ["Elastic Security content", "ECS-oriented telemetry", "Audit logging", "Detection and event-correlation work"],
    incident: {
      title: "Agent City event reaches the SOC",
      path: ["WORKLOAD", "TELEMETRY", "ELASTIC / SIEM", "DETECTION", "CORRELATION", "ALERT", "INVESTIGATE", "RESPOND"],
      result: "The visitor can see one event travel from source control to analyst context.",
    },
  },
  {
    id: "cloud",
    code: "06",
    name: "CLOUD & INFRASTRUCTURE DISTRICT",
    short: "Infrastructure",
    place: "Data-center and service corridor",
    thesis: "INFRASTRUCTURE MUST MAKE AUTHORITY EXPLICIT.",
    problem: "Workloads inherit risk from service identity, network reachability, deployment configuration, runtime posture, and CI/CD decisions.",
    control: "The district spatializes AWS, containers, Kubernetes, Terraform, GitHub Actions, service identity, network egress, least privilege, and code-scanning concepts supported by the projects.",
    why: "Cloud security becomes easier to understand when topology, identity, and enforcement are visible in the same physical system.",
    evidence: ["AWS IAM", "Docker and Kubernetes artifacts", "Terraform examples", "GitHub Actions security checks"],
    limitation: "The universe describes documented engineering controls; it does not claim unverified enterprise production scale.",
  },
  {
    id: "real",
    code: "07",
    name: "REAL-WORLD IMPACT ZONE",
    short: "Real World",
    place: "Airport and critical-service corridor",
    thesis: "TRUST HAS CONSEQUENCES.",
    problem: "Cybersecurity protects systems people rely on, not abstract code in isolation.",
    control: "AEROSEC / aviation compliance work becomes the bridge from one API request to booking systems, operations, aircraft, passengers, businesses, and infrastructure.",
    why: "The story zooms out from one technical control to the real operational environment that depends on secure software.",
    evidence: ["Third-party system risk", "Aviation security / compliance context", "Operational-readiness perspective", "Business and commercialization analysis"],
    limitation: "This section shows the operational context of the project and does not present simulated incidents as real-world deployments.",
    incident: {
      title: "One third-party API request crosses an operational chain",
      path: ["API REQUEST", "APPLICATION", "SERVICE SYSTEM", "AIRPORT", "AIRCRAFT", "OPERATIONS", "PASSENGERS", "BUSINESS"],
      result: "The impact view shows why security architecture matters beyond the codebase.",
    },
  },
  {
    id: "vault",
    code: "08",
    name: "ENGINEERING VAULT",
    short: "Engineering Vault",
    place: "Secure technical archive",
    thesis: "SHOW EVIDENCE. DO NOT MAKE MARKETING CLAIMS.",
    problem: "Cinematic storytelling is meaningless if technical reviewers cannot inspect the implementation and its limits.",
    control: "Each evidence room exposes the problem, threat model, architecture, design decisions, implementation, tests, results, limitations, gaps, future work, and repository.",
    why: "Recruiters can understand the system quickly while engineers can drill into what actually exists.",
    evidence: ["Architecture", "Tests and CI", "Security controls", "Known limitations and repository links"],
  },
  {
    id: "observatory",
    code: "09",
    name: "THE OBSERVATORY",
    short: "Observatory",
    place: "Sunrise above the universe",
    thesis: "SECURITY ISN'T THE DESTINATION. TRUST IS.",
    problem: "The final scene should connect the engineering work back to the person building it.",
    control: "A quiet human ending: Pooja Kiran, Security Engineer, focused on controls for autonomous software systems, cloud identities, model supply chains, adversarial validation, and security telemetry.",
    why: "The experience ends with a clear identity and direct paths to the résumé, GitHub, LinkedIn, and contact.",
    evidence: ["Résumé", "GitHub", "LinkedIn", "Project repositories"],
  },
];

const WORLD_MAP = Object.fromEntries(WORLDS.map((world) => [world.id, world])) as Record<TrustWorldId, World>;
const GUIDED_ROUTE: TrustWorldId[] = ["core", "agent", "identity", "model", "adversarial", "soc", "cloud", "real", "vault", "observatory"];
const PHASES: TrustPhase[] = ["normal", "threat", "analysis", "control", "recovery"];

export default function TrustUniverseExperience() {
  const [intro, setIntro] = useState<IntroStage>("boot");
  const [mode, setMode] = useState<EntryMode>("free");
  const [currentWorld, setCurrentWorld] = useState<TrustWorldId>("core");
  const [destination, setDestination] = useState<TrustWorldId | null>(null);
  const [guidedIndex, setGuidedIndex] = useState(0);
  const [phase, setPhase] = useState<TrustPhase>("normal");
  const [mapOpen, setMapOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const [quality, setQuality] = useState<"balanced" | "lite">("balanced");
  const [travelMode, setTravelMode] = useState<TravelMode>("foot");
  const [isTraveling, setIsTraveling] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const movementKeys = useRef<Record<string, boolean>>({});
  const movementState = useRef({ forward: 0, side: 0, progress: 0, strafe: 0, last: 0 });
  const timers = useRef<number[]>([]);
  const travelTimer = useRef<number | null>(null);
  const wheelLocked = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const world = WORLD_MAP[currentWorld];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const onMove = (event: PointerEvent) => {
      tx = event.clientX / window.innerWidth - 0.5;
      ty = event.clientY / window.innerHeight - 0.5;
    };
    const tick = (time: number) => {
      x += (tx - x) * 0.045;
      y += (ty - y) * 0.045;

      const walking = (isTraveling || isMoving) && travelMode === "foot" && !reduceMotion;
      const driving = (isTraveling || isMoving) && travelMode === "vehicle" && !reduceMotion;
      const gait = walking ? Math.sin(time * 0.018) : 0;
      const footfall = walking ? Math.abs(Math.sin(time * 0.009)) : 0;
      const breath = !walking && !driving && !reduceMotion ? Math.sin(time * 0.00125) : 0;
      const driveFloat = driving ? Math.sin(time * 0.005) : 0;

      const humanY = gait * 1.9 + breath * 0.45 + driveFloat * 0.35;
      const humanRoll = walking ? gait * 0.13 : driveFloat * 0.035;
      const forwardScale = walking ? 1.075 + footfall * 0.018 : driving ? 1.105 : 1.075;

      root.style.setProperty("--look-x", `${(x * 22).toFixed(2)}px`);
      root.style.setProperty("--look-y", `${(y * 13).toFixed(2)}px`);
      root.style.setProperty("--photo-x", `${(x * 17).toFixed(2)}px`);
      root.style.setProperty("--photo-y", `${(y * 9 + humanY).toFixed(2)}px`);
      root.style.setProperty("--near-x", `${(x * -34).toFixed(2)}px`);
      root.style.setProperty("--near-y", `${(y * -17 - humanY * 1.4).toFixed(2)}px`);
      root.style.setProperty("--glass-x", `${(x * -9).toFixed(2)}px`);
      root.style.setProperty("--glass-y", `${(y * -5).toFixed(2)}px`);
      root.style.setProperty("--human-roll", `${humanRoll.toFixed(3)}deg`);
      root.style.setProperty("--human-scale", forwardScale.toFixed(4));

      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [isMoving, isTraveling, reduceMotion, travelMode]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lite = window.innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 4;
    setReduceMotion(reduced);
    if (lite) setQuality("lite");

    const ids = [
      window.setTimeout(() => setIntro("verified"), reduced ? 100 : 850),
      window.setTimeout(() => setIntro("ready"), reduced ? 180 : 1750),
    ];
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  const clearIncidentTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearIncidentTimers();
      if (travelTimer.current) window.clearTimeout(travelTimer.current);
    };
  }, [clearIncidentTimers]);

  const runIncident = useCallback(() => {
    clearIncidentTimers();
    setPhase("threat");
    if (reduceMotion) {
      setPhase("control");
      return;
    }
    const steps: Array<[TrustPhase, number]> = [
      ["analysis", 1250],
      ["control", 2800],
      ["recovery", 4450],
      ["normal", 6100],
    ];
    timers.current = steps.map(([next, delay]) => window.setTimeout(() => setPhase(next), delay));
  }, [clearIncidentTimers, reduceMotion]);

  const enterWorld = useCallback((id: TrustWorldId) => {
    setCurrentWorld(id);
    setDestination(null);
    setPhase("normal");
    const index = GUIDED_ROUTE.indexOf(id);
    if (index >= 0) setGuidedIndex(index);
    if (mode === "guided" && WORLD_MAP[id].incident) {
      window.setTimeout(runIncident, reduceMotion ? 50 : 800);
    }
  }, [mode, reduceMotion, runIncident]);

  const travelTo = useCallback((id: TrustWorldId) => {
    if (id === currentWorld || isTraveling) {
      if (id === currentWorld) enterWorld(id);
      return;
    }

    if (travelTimer.current) window.clearTimeout(travelTimer.current);
    setDestination(id);
    setIsTraveling(true);
    setMapOpen(false);
    setEvidenceOpen(false);

    const duration = reduceMotion ? 40 : travelMode === "vehicle" ? 1050 : 1900;
    travelTimer.current = window.setTimeout(() => {
      enterWorld(id);
      setIsTraveling(false);
      travelTimer.current = null;
    }, duration);
  }, [currentWorld, enterWorld, isTraveling, reduceMotion, travelMode]);

  const start = (nextMode: EntryMode) => {
    setMode(nextMode);
    setIntro("entered");
    setCurrentWorld("core");
    setGuidedIndex(0);
    setPhase("normal");
  };

  const nextWorld = useCallback(() => {
    const next = Math.min(GUIDED_ROUTE.length - 1, guidedIndex + 1);
    if (next !== guidedIndex) travelTo(GUIDED_ROUTE[next]);
  }, [guidedIndex, travelTo]);

  const previousWorld = useCallback(() => {
    const next = Math.max(0, guidedIndex - 1);
    if (next !== guidedIndex) travelTo(GUIDED_ROUTE[next]);
  }, [guidedIndex, travelTo]);


  useEffect(() => {
    if (intro !== "entered" || mode !== "free" || mapOpen || evidenceOpen || accessOpen) {
      movementKeys.current = {};
      setIsMoving(false);
      return;
    }

    const movement = movementState.current;
    movement.last = performance.now();
    let raf = 0;
    let movingFlag = false;

    const onDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d", "shift", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        movementKeys.current[key] = true;
        if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
          event.preventDefault();
        }
      }
    };
    const onUp = (event: KeyboardEvent) => {
      movementKeys.current[event.key.toLowerCase()] = false;
    };
    const onBlur = () => {
      movementKeys.current = {};
    };

    const tick = (time: number) => {
      const root = rootRef.current;
      if (!root) return;
      const dt = Math.min(0.04, Math.max(0.001, (time - movement.last) / 1000));
      movement.last = time;

      const keys = movementKeys.current;
      const forwardTarget =
        (keys.w || keys.arrowup ? 1 : 0) -
        (keys.s || keys.arrowdown ? 1 : 0);
      const sideTarget =
        (keys.d || keys.arrowright ? 1 : 0) -
        (keys.a || keys.arrowleft ? 1 : 0);
      const boost = keys.shift ? (travelMode === "vehicle" ? 1.35 : 1.65) : 1;
      const response = Math.min(1, dt * 8.5);

      movement.forward += (forwardTarget - movement.forward) * response;
      movement.side += (sideTarget - movement.side) * response;

      const active = Math.abs(movement.forward) > 0.035 || Math.abs(movement.side) > 0.035;
      if (active !== movingFlag) {
        movingFlag = active;
        setIsMoving(active);
      }

      const pace = travelMode === "vehicle" ? 2.35 : 1;
      movement.progress += movement.forward * dt * boost * pace;
      movement.strafe += movement.side * dt * 22 * boost;
      movement.strafe *= Math.pow(0.985, dt * 60);
      movement.strafe = Math.max(-34, Math.min(34, movement.strafe));

      const depth = Math.max(-1.4, Math.min(1.4, movement.progress));
      const stride = Math.sin(time * (travelMode === "vehicle" ? 0.004 : 0.0125)) *
        Math.min(1, Math.abs(movement.forward) + Math.abs(movement.side));
      const walkScale = 1.075 + Math.max(-0.012, Math.min(0.046, depth * 0.028)) +
        (travelMode === "vehicle" && active ? 0.018 : 0);

      root.style.setProperty("--walk-strafe", `${movement.strafe.toFixed(2)}px`);
      root.style.setProperty("--walk-strafe-near", `${(-movement.strafe * 1.7).toFixed(2)}px`);
      root.style.setProperty("--walk-bob", `${(reduceMotion ? 0 : stride * 1.45).toFixed(2)}px`);
      root.style.setProperty("--walk-bob-near", `${(reduceMotion ? 0 : stride * -2.1).toFixed(2)}px`);
      root.style.setProperty("--walk-scale", walkScale.toFixed(4));
      root.style.setProperty("--walk-ground", `${(depth * 22).toFixed(2)}px`);

      if (!isTraveling && movement.progress > 1.55) {
        movement.progress = 0;
        movement.strafe *= 0.35;
        const next = (guidedIndex + 1) % GUIDED_ROUTE.length;
        travelTo(GUIDED_ROUTE[next]);
      } else if (!isTraveling && movement.progress < -1.55) {
        movement.progress = 0;
        movement.strafe *= 0.35;
        const previous = (guidedIndex - 1 + GUIDED_ROUTE.length) % GUIDED_ROUTE.length;
        travelTo(GUIDED_ROUTE[previous]);
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("keydown", onDown, { passive: false });
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
      cancelAnimationFrame(raf);
      movementKeys.current = {};
      setIsMoving(false);
    };
  }, [accessOpen, evidenceOpen, guidedIndex, intro, isTraveling, mapOpen, mode, reduceMotion, travelMode, travelTo]);

  useEffect(() => {
    if (intro !== "entered" || mode !== "guided" || mapOpen || evidenceOpen || accessOpen) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 18 || wheelLocked.current || isTraveling) return;
      event.preventDefault();
      wheelLocked.current = true;
      if (event.deltaY > 0) nextWorld();
      else previousWorld();
      window.setTimeout(() => {
        wheelLocked.current = false;
      }, reduceMotion ? 180 : 900);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [accessOpen, evidenceOpen, intro, isTraveling, mapOpen, mode, nextWorld, previousWorld, reduceMotion]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (event.key === "Escape") {
        setMapOpen(false);
        setEvidenceOpen(false);
        setAccessOpen(false);
      }
      if (intro !== "entered" || mapOpen || evidenceOpen || accessOpen || isTraveling) return;
      if (event.repeat && ["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(key)) return;
      if (key === "m") setMapOpen((value) => !value);
      if (key === "i") setEvidenceOpen((value) => !value);
      if (key === "v") setTravelMode((value) => value === "foot" ? "vehicle" : "foot");
      if (key === "e") {
        if (WORLD_MAP[currentWorld].incident) runIncident();
        else setEvidenceOpen(true);
      }
      if (mode === "guided" && (event.key === "ArrowRight" || event.key === "ArrowDown")) nextWorld();
      if (mode === "guided" && (event.key === "ArrowLeft" || event.key === "ArrowUp")) previousWorld();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [accessOpen, currentWorld, evidenceOpen, intro, isTraveling, mapOpen, mode, nextWorld, previousWorld, runIncident]);

  const phaseIndex = PHASES.indexOf(phase);
  const progress = useMemo(() => ((guidedIndex + 1) / GUIDED_ROUTE.length) * 100, [guidedIndex]);

  if (textMode) {
    return (
      <main className={"tu2-text-mode" + (highContrast ? " high-contrast" : "")}>
        <header>
          <div>
            <span>POOJA KIRAN · SECURITY ENGINEER</span>
            <h1>TRUST UNIVERSE — TEXT EXPERIENCE</h1>
          </div>
          <button onClick={() => setTextMode(false)}>Return to cinematic experience</button>
        </header>
        <p className="tu2-text-lead">Cybersecurity creates trust. Trust allows autonomous technology to operate safely. This portfolio connects the systems I build across agents, identity, model provenance, adversarial testing, detection, infrastructure, and real-world operations.</p>
        <div className="tu2-text-worlds">
          {WORLDS.map((item) => (
            <article key={item.id}>
              <span>{item.code}</span>
              <h2>{item.name}</h2>
              <strong>{item.thesis}</strong>
              <p>{item.problem}</p>
              <p>{item.control}</p>
              <ul>{item.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul>
              {item.limitation && <small>LIMITATION · {item.limitation}</small>}
              {item.repo && <a href={profile.github + "/" + item.repo} target="_blank" rel="noreferrer">View repository ↗</a>}
            </article>
          ))}
        </div>
      </main>
    );
  }

  return (
    <div ref={rootRef} className={"tu2-root tu2-world-" + currentWorld + " tu2-mode-" + travelMode + " tu2-explore-" + mode + (isMoving ? " tu2-human-moving" : "") + (destination ? " tu2-traveling" : "") + (highContrast ? " tu2-high-contrast" : "")}>
      <div className="tu2-photo-world" aria-hidden="true">
        <div className="tu2-photo-depth" />
        <div className="tu2-near-depth" />
        <div className="tu2-ground-depth" />
      </div>
      {destination && (
        <div className={"tu2-arrival-preview tu2-world-" + destination} aria-hidden="true">
          <div />
        </div>
      )}
      <div className="tu2-security-atmosphere" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <div className={"tu2-travel-transition" + (isTraveling ? " active" : "")} aria-hidden="true">
        <span>{travelMode === "vehicle" ? "AUTONOMOUS TRANSIT" : "MOVING THROUGH TRUST UNIVERSE"}</span>
        <strong>{destination ? WORLD_MAP[destination].name : ""}</strong>
        <i />
      </div>
      <div className="tu2-film-grain" aria-hidden="true" />
      <div className="tu2-vignette" aria-hidden="true" />

      {intro !== "entered" && (
        <section className={"tu2-intro tu2-intro-" + intro} aria-label="Trust Universe opening">
          <div className="tu2-intro-shade" />
          <div className="tu2-boot-sequence" aria-live="polite">
            <span className={intro === "boot" ? "active" : "done"}>INITIALIZING TRUST ENVIRONMENT</span>
            <span className={intro === "verified" ? "active" : intro === "ready" ? "done" : ""}>IDENTITY VERIFIED</span>
          </div>
          <div className="tu2-smart-glass">
            <div className="tu2-glass-index">TRUST CORE / OBSERVATION LEVEL 72</div>
            <h1>POOJA KIRAN</h1>
            <h2>SECURITY ENGINEER <i /> AI SECURITY <i /> SECURITY ARCHITECTURE</h2>
            <p>I BUILD SECURITY SYSTEMS FOR A WORLD WHERE SOFTWARE CAN ACT ON ITS OWN.</p>
            <div className="tu2-entry-actions">
              <button onClick={() => start("guided")} disabled={intro !== "ready"}>
                <small>CURATED CINEMATIC ROUTE</small>
                <strong>ENTER EXPERIENCE</strong>
                <span>→</span>
              </button>
              <button onClick={() => start("free")} disabled={intro !== "ready"}>
                <small>CHOOSE ANY DISTRICT</small>
                <strong>EXPLORE FREELY</strong>
                <span>↗</span>
              </button>
            </div>
          </div>
          <div className="tu2-intro-footer">
            <span>80% physical world · 20% security visualization</span>
            <button onClick={() => setAccessOpen(true)}>Accessibility</button>
          </div>
        </section>
      )}

      {intro === "entered" && (
        <>
          <header className="tu2-hud">
            <div className="tu2-brand">
              <strong>TRUST UNIVERSE</strong>
              <span>POOJA KIRAN · SECURITY ENGINEER</span>
            </div>
            <div className="tu2-location">
              <small>CURRENT LOCATION</small>
              <strong>{world.name}</strong>
            </div>
            <nav>
              <button onClick={() => setMapOpen(true)}>MAP <kbd>M</kbd></button>
              <button onClick={() => setMode((value) => value === "guided" ? "free" : "guided")}>{mode === "guided" ? "GUIDED" : "FREE"}</button>
              <button onClick={() => setEvidenceOpen(true)}>EVIDENCE <kbd>E</kbd></button>
              <button onClick={() => setAccessOpen(true)}>ACCESSIBILITY</button>
            </nav>
          </header>

          <aside className="tu2-story">
            <div className="tu2-story-code">{world.code}</div>
            <div>
              <span>{world.place}</span>
              <h1>{world.name}</h1>
              <blockquote>{world.thesis}</blockquote>
              <p>{world.why}</p>
            </div>
          </aside>

          <aside className="tu2-system-state">
            <span>SYSTEM STATE</span>
            <div className="tu2-phase-row">
              {PHASES.map((item, index) => (
                <i key={item} className={index <= phaseIndex ? "active" : ""} />
              ))}
            </div>
            <strong>{phase === "normal" ? "NORMAL" : phase.toUpperCase()}</strong>
          </aside>

          {world.incident && (
            <section className={"tu2-incident tu2-phase-" + phase}>
              <div className="tu2-incident-head">
                <div>
                  <span>LIVE SECURITY SCENARIO</span>
                  <strong>{world.incident.title}</strong>
                </div>
                <button onClick={runIncident}>{phase === "normal" ? "RUN INCIDENT" : "REPLAY"}</button>
              </div>
              <div className="tu2-decision-path">
                {world.incident.path.map((step, index) => (
                  <div key={step} className={phase !== "normal" && index <= Math.min(world.incident!.path.length - 1, phaseIndex * 2 + 1) ? "active" : ""}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
              <p>{world.incident.result}</p>
            </section>
          )}

          <div className="tu2-controls">
            <button onClick={() => setMapOpen(true)}><span>⌘</span><strong>WORLD MAP</strong></button>
            <button onClick={() => setEvidenceOpen(true)}><span>◎</span><strong>INSPECT SYSTEM</strong></button>
            {world.incident && <button onClick={runIncident}><span>⚑</span><strong>RUN SCENARIO</strong></button>}
          </div>

          {mode === "free" && (
            <>
              <div className="tu2-reticle" aria-hidden="true"><i /><span>W / S WALK · A / D STRAFE · MOUSE LOOK · SHIFT FASTER · E INTERACT</span></div>
              <div className="tu2-free-nav" aria-label="Free exploration controls">
                <button onClick={previousWorld} disabled={isTraveling}><span>S</span><strong>WALK BACK</strong></button>
                <button
                  className="primary"
                  onClick={() => world.incident ? runIncident() : setEvidenceOpen(true)}
                  disabled={isTraveling}
                >
                  <span>E</span><strong>{world.incident ? "INTERACT / RUN SCENARIO" : "ENTER / INSPECT"}</strong>
                </button>
                <button onClick={nextWorld} disabled={isTraveling}><span>W</span><strong>WALK FORWARD</strong></button>
                <button onClick={() => setTravelMode((value) => value === "foot" ? "vehicle" : "foot")} disabled={isTraveling}>
                  <span>V</span><strong>{travelMode === "vehicle" ? "DRIVING" : "WALKING"}</strong>
                </button>
              </div>
              <div className="tu2-wayfinding">
                {[1, 2, -1].map((offset, slot) => {
                  const index = (guidedIndex + offset + GUIDED_ROUTE.length) % GUIDED_ROUTE.length;
                  const target = WORLD_MAP[GUIDED_ROUTE[index]];
                  return (
                    <button key={target.id} className={"slot-" + slot} onClick={() => travelTo(target.id)} disabled={isTraveling}>
                      <span>{target.code}</span>
                      <strong>{target.short}</strong>
                      <small>{travelMode === "vehicle" ? "DRIVE" : "WALK"} →</small>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {mode === "guided" && (
            <div className="tu2-guided">
              <div className="tu2-guided-track"><i style={{ width: progress + "%" }} /></div>
              <button onClick={previousWorld} disabled={guidedIndex === 0}>←</button>
              <div>
                <span>GUIDED EXPERIENCE</span>
                <strong>{guidedIndex + 1} / {GUIDED_ROUTE.length}</strong>
                <small>Scroll to move through the world</small>
              </div>
              <button onClick={nextWorld} disabled={guidedIndex === GUIDED_ROUTE.length - 1}>→</button>
            </div>
          )}

          {currentWorld === "observatory" && (
            <section className="tu2-finale">
              <span>THE OBSERVATORY · SUNRISE SEQUENCE</span>
              <h2>SECURITY ISN&apos;T THE DESTINATION.<br /><em>TRUST IS.</em></h2>
              <p>POOJA KIRAN · SECURITY ENGINEER · AI SECURITY · SECURITY ARCHITECTURE</p>
              <div>
                <button onClick={() => travelTo("vault")}>VIEW ENGINEERING EVIDENCE</button>
                <a href={RESUME_URL} download>VIEW RÉSUMÉ</a>
                <a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
              </div>
            </section>
          )}
        </>
      )}

      {mapOpen && (
        <section className="tu2-map" role="dialog" aria-modal="true" aria-label="Trust Universe map">
          <div className="tu2-map-head">
            <div><span>DIEGETIC NAVIGATION</span><h2>TRUST UNIVERSE</h2><p>One connected physical world. Choose a destination.</p></div>
            <button onClick={() => setMapOpen(false)}>CLOSE ×</button>
          </div>
          <div className="tu2-map-grid">
            {WORLDS.map((item) => (
              <button key={item.id} className={item.id === currentWorld ? "current" : ""} onClick={() => travelTo(item.id)}>
                <span>{item.code}</span>
                <strong>{item.short}</strong>
                <small>{item.place}</small>
                <i>{item.id === currentWorld ? "YOU ARE HERE" : "TRAVEL →"}</i>
              </button>
            ))}
          </div>
        </section>
      )}

      {evidenceOpen && (
        <section className="tu2-evidence" role="dialog" aria-modal="true" aria-label={world.name + " engineering evidence"}>
          <div className="tu2-evidence-head">
            <div><span>{world.code} · ENGINEERING EVIDENCE</span><h2>{world.name}</h2></div>
            <button onClick={() => setEvidenceOpen(false)}>CLOSE ×</button>
          </div>
          <div className="tu2-evidence-grid">
            <article><small>PROBLEM</small><p>{world.problem}</p></article>
            <article><small>CONTROL / SYSTEM</small><p>{world.control}</p></article>
            <article><small>WHY IT MATTERS</small><p>{world.why}</p></article>
            <article><small>EVIDENCE</small><ul>{world.evidence.map((item) => <li key={item}>{item}</li>)}</ul></article>
            {world.limitation && <article className="wide"><small>KNOWN LIMITATION</small><p>{world.limitation}</p></article>}
          </div>
          <div className="tu2-evidence-actions">
            {world.repo && <a href={profile.github + "/" + world.repo} target="_blank" rel="noreferrer">OPEN SOURCE REPOSITORY ↗</a>}
            <button onClick={() => { setEvidenceOpen(false); travelTo("vault"); }}>GO TO ENGINEERING VAULT →</button>
          </div>
        </section>
      )}

      {accessOpen && (
        <section className="tu2-access" role="dialog" aria-modal="true" aria-label="Accessibility and performance settings">
          <div><span>EXPERIENCE SETTINGS</span><h2>Accessibility & performance</h2></div>
          <label><input type="checkbox" checked={reduceMotion} onChange={(event) => setReduceMotion(event.target.checked)} /><span>Reduce motion</span></label>
          <label><input type="checkbox" checked={highContrast} onChange={(event) => setHighContrast(event.target.checked)} /><span>High contrast</span></label>
          <label><input type="checkbox" checked={quality === "lite"} onChange={(event) => setQuality(event.target.checked ? "lite" : "balanced")} /><span>Reduced graphics</span></label>
          <button onClick={() => { setTextMode(true); setAccessOpen(false); }}>OPEN TEXT EXPERIENCE</button>
          <button onClick={() => setAccessOpen(false)}>DONE</button>
        </section>
      )}
    </div>
  );
}
