"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { resume, resumeHref } from "@/data/resume";
import type { UniverseWorld } from "@/components/TrustScene";

const TrustScene = dynamic(() => import("@/components/TrustScene"), { ssr: false });

type EvidenceKey = "mcp" | "iam" | "supply" | "telemetry" | "research" | null;

const WORLD_ORDER: UniverseWorld[] = ["home", "agent", "identity", "supply", "telemetry", "research"];

const WORLD_META: Record<UniverseWorld, { label: string; short: string }> = {
  home: { label: "Command Lab", short: "Home" },
  agent: { label: "Agent Security Control Plane", short: "Agent" },
  identity: { label: "Identity Vault", short: "Identity" },
  supply: { label: "Model Supply Chain Lab", short: "Supply Chain" },
  telemetry: { label: "Security Telemetry Grid", short: "Telemetry" },
  research: { label: "Research Chamber", short: "Research" },
};

function useReducedMotion() {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setValue(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return value;
}

function useLiteExperience() {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 820px)");
    const sync = () => setValue(query.matches || (navigator.hardwareConcurrency ?? 8) <= 4);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return value;
}

function useWebGL() {
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setAvailable(Boolean(gl));
    } catch {
      setAvailable(false);
    }
  }, []);
  return available;
}

function scrollToWorld(world: UniverseWorld) {
  document.getElementById(`world-${world}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function EvidenceDrawer({ selected, onClose }: { selected: EvidenceKey; onClose: () => void }) {
  const project = selected === "mcp" ? resume.projects[0] : selected === "iam" ? resume.projects[1] : selected === "supply" ? resume.projects[2] : null;

  const content = useMemo(() => {
    if (project) {
      return {
        eyebrow: "Project evidence",
        title: project.name,
        stack: project.stack,
        bullets: project.bullets,
        metrics: project.metrics,
        repository: project.repository,
      };
    }
    if (selected === "telemetry") {
      return {
        eyebrow: "Cross-system evidence",
        title: "Detection & observability",
        stack: ["Elastic Security", "ECS", "SIEM", "Prometheus", "Security Telemetry", "Tamper-Evident Audit Logging", "Rate Limiting"],
        bullets: [
          "The résumé connects prevention and observability through CI, SARIF, GitHub Code Scanning, security telemetry, hash-chained audit logs, 9 Elastic Security rules, and 21 core SIEM tests.",
          "This environment visualizes those résumé-listed capabilities as a shared telemetry layer rather than claiming a separate production system."
        ],
        metrics: ["9 Elastic Security rules", "21 core SIEM tests", "Security telemetry", "Tamper-evident audit logging"],
        repository: resume.projects[0].repository,
      };
    }
    if (selected === "research") {
      return {
        eyebrow: "Résumé-backed scope",
        title: "Independent AI security research",
        stack: ["Agent runtime security", "AWS IAM", "LLM red teaming", "Model supply-chain security", "Training-data integrity", "Adversarial ML"],
        bullets: [
          resume.experience[0].bullets[0],
          resume.experience[1].bullets[0],
          resume.experience[1].bullets[1],
        ],
        metrics: ["707 passing MCP tests", "235 passing IAM tests", "173 passing LLM security tests", "$120K first-year commercialization scenario"],
        repository: resume.links.github,
      };
    }
    return null;
  }, [project, selected]);

  if (!selected || !content) return null;

  return (
    <aside className="evidence-drawer" aria-label="Evidence details">
      <div className="drawer-top">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close evidence panel">×</button>
      </div>

      <div className="drawer-stack">{content.stack.map((item) => <span key={item}>{item}</span>)}</div>

      <div className="drawer-flow" aria-label="Résumé-backed engineering flow">
        {selected === "mcp" && ["Tool call", "Security checks", "Allow / block", "Audit + telemetry"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
        {selected === "iam" && ["IAM input", "25 rules", "SARIF", "Code scanning"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
        {selected === "supply" && ["Model artifact", "Non-executing analysis", "Provenance + format checks", "Finding"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
        {selected === "telemetry" && ["Control decision", "Structured telemetry", "Detection", "Evidence"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
        {selected === "research" && ["Question", "Control", "Validation", "Evidence"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
      </div>

      <div className="drawer-copy">
        {content.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}
      </div>

      <div className="drawer-metrics">{content.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>

      <a className="button button--primary" href={content.repository} target="_blank" rel="noreferrer">
        Open evidence source ↗
      </a>
    </aside>
  );
}

function RecruiterView({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="recruiter-shell">
      <header className="recruiter-hero">
        <div>
          <p className="eyebrow">Recruiter view · résumé-sourced</p>
          <h1>{resume.name}</h1>
          <p className="recruiter-headline">{resume.headline}</p>
          <p className="recruiter-positioning">Security controls across agents, cloud identity, model supply chains, application security, and observability.</p>
          <p className="muted">{resume.location} · {resume.email} · {resume.phone}</p>
        </div>
        <div className="recruiter-actions">
          <a className="button button--primary" href={resumeHref} target="_blank" rel="noreferrer">View résumé</a>
          <a className="button" href={resumeHref} download>Download résumé</a>
          <button className="button" type="button" onClick={onExplore}>Explore universe</button>
        </div>
      </header>

      <main className="recruiter-main">
        <section>
          <p className="eyebrow">Engineering evidence</p>
          <div className="metric-strip">
            <div><strong>659</strong><span>passing MCP tests</span></div>
            <div><strong>82%</strong><span>statement coverage</span></div>
            <div><strong>235</strong><span>passing IAM tests</span></div>
            <div><strong>173</strong><span>passing LLM security tests</span></div>
          </div>
        </section>

        <section>
          <div className="section-heading"><p className="eyebrow">Selected engineering work</p><h2>Three systems. Three security boundaries.</h2></div>
          <div className="recruiter-projects">
            {resume.projects.map((project) => (
              <article className="recruiter-card" key={project.name}>
                <div className="card-topline"><h3>{project.name}</h3><span>{project.dates}</span></div>
                <p className="stack">{project.stack.join(" · ")}</p>
                {project.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}
                <div className="metric-tags">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">Repository ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="section-heading"><p className="eyebrow">Experience</p><h2>Engineering, compliance, and technical evaluation</h2></div>
          <div className="timeline">
            {resume.experience.map((item) => (
              <article className="timeline-item" key={item.role + item.dates}>
                <div className="timeline-date">{item.dates}</div>
                <div>
                  <h3>{item.role}{item.detail ? <span> · {item.detail}</span> : null}</h3>
                  <p className="muted">{item.organization} · {item.location}{item.mode ? ` · ${item.mode}` : ""}</p>
                  {item.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="section-heading"><p className="eyebrow">Security expertise</p><h2>Technical stack</h2></div>
          <div className="skills-grid">
            {resume.skillGroups.map((group) => <article className="skill-block" key={group.label}><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></article>)}
          </div>
        </section>

        <section>
          <div className="section-heading"><p className="eyebrow">Education & certifications</p><h2>Academic foundation</h2></div>
          <div className="education-grid">
            {resume.education.map((item) => <article key={item.school}><h3>{item.school}</h3><p>{item.degree}</p><p className="muted">{item.score} · {item.dates}</p></article>)}
          </div>
          <div className="cert-row">{resume.certifications.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <footer className="recruiter-footer">
          <div><strong>{resume.name}</strong><p>{resume.headline}</p></div>
          <nav aria-label="Profile links">
            <a href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={`mailto:${resume.email}`}>Email</a>
            <a href={resumeHref} target="_blank" rel="noreferrer">Résumé</a>
          </nav>
        </footer>
      </main>
    </div>
  );
}

function WorldChapter({
  world,
  index,
  title,
  kicker,
  description,
  evidence,
  side = "left",
}: {
  world: UniverseWorld;
  index: string;
  title: string;
  kicker: string;
  description: string;
  evidence: Exclude<EvidenceKey, null>;
  side?: "left" | "right";
}) {
  return (
    <section className={`world-chapter world-chapter--${side}`} id={`world-${world}`} data-world={world}>
      <div className="world-copy">
        <span className="world-index">{index}</span>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
        <p className="world-description">{description}</p>
        <div className="chapter-actions">
          <button className="button button--primary" type="button" data-evidence={evidence}>Inspect evidence</button>
          {world === "agent" && <a className="text-link" href={resume.projects[0].repository} target="_blank" rel="noreferrer">Repository ↗</a>}
          {world === "identity" && <a className="text-link" href={resume.projects[1].repository} target="_blank" rel="noreferrer">Repository ↗</a>}
          {world === "supply" && <a className="text-link" href={resume.projects[2].repository} target="_blank" rel="noreferrer">Repository ↗</a>}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [mode, setMode] = useState<"explore" | "recruiter">("explore");
  const [world, setWorld] = useState<UniverseWorld>("home");
  const [evidence, setEvidence] = useState<EvidenceKey>(null);
  const [cameraProgress, setCameraProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const lite = useLiteExperience();
  const webgl = useWebGL();

  useEffect(() => {
    if (mode !== "explore") return;

    const updateCamera = () => {
      const finalWorld = document.getElementById("world-research");
      if (!finalWorld) return;
      const max = Math.max(1, finalWorld.offsetTop + finalWorld.offsetHeight - window.innerHeight);
      setCameraProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };

    updateCamera();
    window.addEventListener("scroll", updateCamera, { passive: true });
    window.addEventListener("resize", updateCamera);
    return () => {
      window.removeEventListener("scroll", updateCamera);
      window.removeEventListener("resize", updateCamera);
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "explore") return;

    const sections = WORLD_ORDER
      .map((item) => document.getElementById(`world-${item}`))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const next = visible?.target.getAttribute("data-world") as UniverseWorld | null;
      if (next) setWorld(next);
    }, { threshold: [0.28, 0.5, 0.72] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [mode]);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const key = target.closest<HTMLElement>("[data-evidence]")?.dataset.evidence as EvidenceKey | undefined;
      if (key) setEvidence(key);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (mode === "recruiter") return <RecruiterView onExplore={() => setMode("explore")} />;

  return (
    <div className="explore-shell">
      <a className="skip-link" href="#explore-main">Skip to content</a>

      <header className="universe-topbar">
        <button className="brand-button" type="button" onClick={() => scrollToWorld("home")}>
          <span className="brand-mark">PK</span>
          <span>{resume.name}</span>
        </button>

        <div className="world-status" aria-live="polite">
          <span>{String(WORLD_ORDER.indexOf(world) + 1).padStart(2, "0")}</span>
          <strong>{WORLD_META[world].label}</strong>
        </div>

        <div className="top-actions">
          <a href={resumeHref} target="_blank" rel="noreferrer">Résumé</a>
          <button type="button" onClick={() => setMode("recruiter")}>Recruiter view</button>
        </div>
      </header>

      <nav className="world-nav" aria-label="Trust universe navigation">
        {WORLD_ORDER.map((item, index) => (
          <button
            key={item}
            type="button"
            className={item === world ? "is-active" : ""}
            onClick={() => scrollToWorld(item)}
            aria-label={`Go to ${WORLD_META[item].label}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{WORLD_META[item].short}</strong>
          </button>
        ))}
      </nav>

      <div className="universe-stage" aria-hidden="true">
        <div className="static-lab-backdrop" />
        {webgl && <TrustScene progress={cameraProgress} reducedMotion={reducedMotion} lite={lite} />}
        <div className="cinematic-vignette" />
        <div className="environment-label environment-label--left">{world === "home" ? "TRUST BOUNDARY" : WORLD_META[world].label.toUpperCase()}</div>
        <div className="environment-label environment-label--right">EVIDENCE / CONTROL / DECISION</div>
      </div>

      <main id="explore-main" className="universe-story">
        <section className="opening-scene" id="world-home" data-world="home">
          <div className="hero-copy">
            <p className="eyebrow">Security engineering portfolio</p>
            <h1>{resume.name}</h1>
            <p className="hero-role">Security Engineer</p>
            <p className="hero-domains">AI · Application · Cloud · Identity</p>
            <p className="hero-statement">I engineer trust boundaries for systems that can act.</p>
            <p className="hero-support">Building security controls across agents, identity, model supply chains and cloud infrastructure.</p>
            <div className="hero-actions">
              <button className="button button--primary" type="button" onClick={() => scrollToWorld("agent")}>Enter the trust universe</button>
              <button className="button" type="button" onClick={() => setMode("recruiter")}>Recruiter view</button>
            </div>
          </div>

          <div className="monitor-caption monitor-caption--a">
            <span>MCP / JSON-RPC</span><strong>tool-call boundary</strong>
          </div>
          <div className="monitor-caption monitor-caption--b">
            <span>AWS IAM</span><strong>identity relationships</strong>
          </div>
          <div className="monitor-caption monitor-caption--c">
            <span>Supply chain</span><strong>artifact inspection</strong>
          </div>

          <div className="opening-proof">
            <div><strong>659</strong><span>passing MCP tests</span></div>
            <div><strong>235</strong><span>passing IAM tests</span></div>
            <div><strong>173</strong><span>passing LLM security tests</span></div>
          </div>
        </section>

        <WorldChapter
          world="agent"
          index="01"
          kicker="Agent security control plane"
          title="Capability is not execution."
          description="The MCP Agent Security Gateway sits at the agent-to-tool boundary, inspecting routed tool calls with prompt-injection patterns, capability controls, PII/exfiltration signals, rate limiting, fail-closed behavior, and hash-chained audit logs."
          evidence="mcp"
          side="left"
        />

        <WorldChapter
          world="identity"
          index="02"
          kicker="Identity vault"
          title="Permission needs a path."
          description="AWS Agent Identity Guard turns IAM risk into an inspectable authorization graph: wildcard access, iam:PassRole, sts:AssumeRole, privilege escalation, trust-policy risk, audit tampering, and permission boundaries."
          evidence="iam"
          side="right"
        />

        <WorldChapter
          world="supply"
          index="03"
          kicker="Model supply chain lab"
          title="Inspect before execution."
          description="The HF Model Provenance Scanner analyzes model artifacts without blindly executing them, combining custom pickle-opcode analysis with SafeTensors, GGUF, ONNX, Keras, AST/taint, provenance, and dependency checks."
          evidence="supply"
          side="left"
        />

        <WorldChapter
          world="telemetry"
          index="04"
          kicker="Security telemetry grid"
          title="A decision should leave evidence."
          description="The résumé connects controls to observability through security telemetry, tamper-evident audit logging, Elastic Security rules, SIEM tests, SARIF, and GitHub Code Scanning."
          evidence="telemetry"
          side="right"
        />

        <WorldChapter
          world="research"
          index="05"
          kicker="Research chamber"
          title="Build. Validate. Explain."
          description="Independent security research spans agent runtime security, AWS IAM, LLM red teaming, model supply-chain security, training-data integrity, and adversarial ML, with AEROSEC extending that work into business, compliance, and third-party security."
          evidence="research"
          side="left"
        />

        <section className="trust-core">
          <div className="trust-core-copy">
            <p className="eyebrow">Trust core</p>
            <h2>Trust is a chain of enforceable decisions.</h2>
            <div className="trust-chain" aria-label="Trust chain">
              {["Identity", "Capability", "Authorization", "Execution", "Telemetry", "Evidence"].map((item, index) => (
                <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className="resume-experience" id="experience">
          <div className="experience-intro">
            <p className="eyebrow">Experience</p>
            <h2>Security work across engineering, compliance, and technical evaluation.</h2>
          </div>
          <div className="experience-ledger">
            {resume.experience.map((item, index) => (
              <article key={item.role + item.dates}>
                <span className="ledger-index">0{index + 1}</span>
                <div>
                  <h3>{item.role}</h3>
                  {item.detail && <p className="experience-detail">{item.detail}</p>}
                  <p className="muted">{item.organization} · {item.location}{item.mode ? ` · ${item.mode}` : ""}</p>
                </div>
                <strong className="ledger-date">{item.dates}</strong>
                <div className="ledger-copy">{item.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="expertise-zone" id="skills">
          <div className="section-heading"><p className="eyebrow">Technical skills</p><h2>Four layers of the security stack.</h2></div>
          <div className="expertise-grid">
            {resume.skillGroups.map((group, index) => (
              <article key={group.label}>
                <span>0{index + 1}</span>
                <h3>{group.label}</h3>
                <p>{group.items.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="education-zone" id="education">
          <div className="section-heading"><p className="eyebrow">Education & certifications</p><h2>Foundation</h2></div>
          <div className="education-ledger">
            {resume.education.map((item) => (
              <article key={item.school}>
                <div><h3>{item.school}</h3><p>{item.degree}</p></div>
                <div><strong>{item.score}</strong><span>{item.dates}</span></div>
              </article>
            ))}
          </div>
          <div className="cert-row">{resume.certifications.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="closing-scene" id="contact">
          <div>
            <p className="eyebrow">Return to quiet</p>
            <h2>Systems become autonomous.<br />Trust still has to be engineered.</h2>
            <p>{resume.name} · {resume.headline}</p>
            <div className="closing-actions">
              <a className="button button--primary" href={`mailto:${resume.email}`}>Email</a>
              <a className="button" href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="button" href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="button" href={resumeHref} target="_blank" rel="noreferrer">View résumé ↗</a>
              <a className="button" href={resumeHref} download>Download résumé</a>
            </div>
          </div>
        </section>
      </main>

      <EvidenceDrawer selected={evidence} onClose={() => setEvidence(null)} />
    </div>
  );
}
