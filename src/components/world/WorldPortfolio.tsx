"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { experience, profile, projects, RESUME_URL, SITE_PATH, skillGroups } from "@/data/portfolio";

type WorldId = "agent" | "identity" | "model" | "adversarial" | "soc" | "real";

type World = {
  id: WorldId;
  number: string;
  eyebrow: string;
  title: string;
  location: string;
  thesis: string;
  copy: string;
  flow: string[];
  outcome: string;
  proof: string[];
  tone: string;
};

const HERO_IMAGE = `${SITE_PATH}/trust-universe-hero.webp`;
const PORTRAIT_IMAGE = `${SITE_PATH}/pooja-kiran.png`;
const VEHICLE_IMAGE = `${SITE_PATH}/models/trust-grand-tourer-preview.png`;

const worlds: World[] = [
  {
    id: "agent",
    number: "01",
    eyebrow: "AGENT SECURITY",
    title: "Agent City",
    location: "Autonomous services district",
    thesis: "Capability is not permission.",
    copy: "An AI system can reason correctly and still make a dangerous tool call. This world visualizes the control boundary between model intent and privileged action.",
    flow: ["AI AGENT", "MCP REQUEST", "SERVER TRUST", "CAPABILITY", "INJECTION", "EGRESS", "BLOCK"],
    outcome: "The request is inspected before downstream execution and the security decision becomes audit evidence.",
    proof: ["641 passing tests", "55 prompt-injection patterns", "9 Elastic rules"],
    tone: "blue",
  },
  {
    id: "identity",
    number: "02",
    eyebrow: "CLOUD IDENTITY",
    title: "Identity Tower",
    location: "Authorization district",
    thesis: "Identity is not authorization.",
    copy: "A valid workload identity can still carry dangerous authority. The district turns roles, trust policies and privilege paths into something you can see spatially.",
    flow: ["WORKLOAD", "ROLE", "TRUST", "PERMISSIONS", "iam:PassRole", "SECOND ROLE", "REMEDIATE"],
    outcome: "Privilege paths are surfaced before deployment so access can be reduced toward least privilege.",
    proof: ["25 deterministic rule IDs", "230 passing tests", "SARIF 2.1.0"],
    tone: "steel",
  },
  {
    id: "model",
    number: "03",
    eyebrow: "MODEL SUPPLY CHAIN",
    title: "Model Lab",
    location: "Isolated research facility",
    thesis: "Inspect the artifact before you trust it.",
    copy: "Models arrive as software artifacts with provenance, serialization and dependency risk. This world treats every model as something that must earn trust before loading.",
    flow: ["MODEL", "PROVENANCE", "REPOSITORY", "CONFIG", "FORMAT", "RISK", "QUARANTINE"],
    outcome: "Risk signals are surfaced without executing untrusted artifacts, preserving an inspect-before-load boundary.",
    proof: ["199 passing tests", "12/12 core fixtures", "18/18 extended variants"],
    tone: "ice",
  },
  {
    id: "adversarial",
    number: "04",
    eyebrow: "ADVERSARIAL VALIDATION",
    title: "Red-Team Facility",
    location: "Underground validation level",
    thesis: "Good testing measures where the system fails.",
    copy: "A security detector that only succeeds on familiar prompts creates false confidence. Here the visitor can watch an adversarial input move through normalization, detection and policy.",
    flow: ["ATTACK", "NORMALIZE", "FEATURES", "DETECT", "CLASSIFY", "POLICY", "RESULT"],
    outcome: "The system records both successes and misses instead of presenting a perfect-looking but misleading demo.",
    proof: ["Prompt-injection categories", "Grouped splitting", "Novel-phrasing evaluation"],
    tone: "red",
  },
  {
    id: "soc",
    number: "05",
    eyebrow: "DETECTION & RESPONSE",
    title: "Security Operations",
    location: "Enterprise SOC",
    thesis: "Observability precedes response.",
    copy: "A control decision is only useful if it can be reconstructed. Events from the other worlds arrive here as telemetry, detections, alerts and investigation context.",
    flow: ["WORKLOAD", "TELEMETRY", "ELASTIC", "DETECTION", "CORRELATE", "ALERT", "RESPOND"],
    outcome: "The visitor can follow one security event from the workload boundary to an analyst-facing detection.",
    proof: ["Elastic Security", "ECS-oriented telemetry", "Audit logging"],
    tone: "cyan",
  },
  {
    id: "real",
    number: "06",
    eyebrow: "REAL-WORLD IMPACT",
    title: "The Systems Outside the Screen",
    location: "Aviation and critical-service corridor",
    thesis: "Trust has consequences.",
    copy: "The final world zooms out. One API, identity or third-party decision can sit inside a much larger operational chain involving services, airports, aircraft, people and businesses.",
    flow: ["API", "APPLICATION", "SERVICE", "AIRPORT", "AIRCRAFT", "OPERATIONS", "PEOPLE"],
    outcome: "The portfolio ends the technical story by showing why secure software matters beyond the codebase.",
    proof: ["Third-party risk", "Operational readiness", "Aviation compliance context"],
    tone: "gold",
  },
];

function SecurityFlow({ world }: { world: World }) {
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (active >= world.flow.length - 1) {
      const done = window.setTimeout(() => setRunning(false), 650);
      return () => window.clearTimeout(done);
    }
    const timer = window.setTimeout(() => setActive((value) => value + 1), active < 0 ? 180 : 420);
    return () => window.clearTimeout(timer);
  }, [active, running, world.flow.length]);

  const run = () => {
    setActive(-1);
    setRunning(true);
  };

  return (
    <div className="rw-scenario">
      <div className="rw-scenario-head">
        <div>
          <small>LIVE SECURITY SCENARIO</small>
          <strong>{world.thesis}</strong>
        </div>
        <button type="button" onClick={run}>{running ? "RUNNING" : active >= 0 ? "REPLAY" : "RUN"}</button>
      </div>
      <div className="rw-flow" aria-label={world.title + " security decision path"}>
        {world.flow.map((step, index) => (
          <div key={step} className={index <= active ? "active" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <p>{active === world.flow.length - 1 ? world.outcome : "Run the scenario to watch the security boundary respond."}</p>
    </div>
  );
}

export default function WorldPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeWorld, setActiveWorld] = useState<WorldId>("agent");
  const [menuOpen, setMenuOpen] = useState(false);

  const activeIndex = useMemo(() => worlds.findIndex((world) => world.id === activeWorld), [activeWorld]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onPointer = (event: PointerEvent) => {
      tx = event.clientX / window.innerWidth - 0.5;
      ty = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const tick = () => {
      x += (tx - x) * 0.055;
      y += (ty - y) * 0.055;
      root.style.setProperty("--parallax-x", `${(x * 22).toFixed(2)}px`);
      root.style.setProperty("--parallax-y", `${(y * 13).toFixed(2)}px`);
      root.style.setProperty("--parallax-near-x", `${(x * -32).toFixed(2)}px`);
      root.style.setProperty("--parallax-near-y", `${(y * -17).toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-world-id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target) setActiveWorld(visible.target.getAttribute("data-world-id") as WorldId);
      },
      { threshold: [0.28, 0.45, 0.65] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="rw-site">
      <header className="rw-header">
        <a href="#home" className="rw-wordmark">POOJA KIRAN</a>
        <nav className={menuOpen ? "rw-nav open" : "rw-nav"} aria-label="Portfolio navigation">
          <a href="#worlds" onClick={() => setMenuOpen(false)}>Trust Universe</a>
          <a href="#vault" onClick={() => setMenuOpen(false)}>Engineering</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="rw-header-actions">
          <a className="rw-resume-link" href={RESUME_URL} download>Résumé <span>↗</span></a>
          <button type="button" className="rw-menu" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen}>Menu</button>
        </div>
      </header>

      <main>
        <section id="home" className="rw-hero">
          <div className="rw-hero-image" aria-hidden="true">
            <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" />
          </div>
          <div className="rw-hero-shade" />
          <div className="rw-hero-light" aria-hidden="true" />

          <div className="rw-hero-copy">
            <p className="rw-kicker"><span /> SECURITY ENGINEER · AI SECURITY · TRUST INFRASTRUCTURE</p>
            <h1>
              I engineer the boundary
              <br />
              between <em>intelligence</em>
              <br />
              and <em>action.</em>
            </h1>
            <p>
              Security systems for AI agents, cloud identities, model supply chains,
              adversarial validation and detection — presented as one connected real-world trust architecture.
            </p>
            <div className="rw-hero-actions">
              <a className="rw-primary" href="#worlds">Enter the Trust Universe <span>→</span></a>
              <a className="rw-secondary" href="#vault">Inspect engineering evidence</a>
            </div>
          </div>

          <div className="rw-hero-identity">
            <span>POOJA KIRAN</span>
            <strong>SECURITY ENGINEER</strong>
            <small>Building controls for systems that can act on their own.</small>
          </div>

          <div className="rw-hero-status" aria-label="Portfolio evidence summary">
            <div><small>FLAGSHIP SYSTEMS</small><strong>03</strong></div>
            <div><small>DOCUMENTED PASSING TESTS</small><strong>1,070</strong></div>
            <div><small>IAM RULE IDS</small><strong>25</strong></div>
          </div>

          <a className="rw-scroll-cue" href="#worlds"><span>SCROLL TO ENTER</span><i /></a>
        </section>

        <section id="worlds" className="rw-world-index">
          <div className="rw-world-index-copy">
            <span>THE TRUST UNIVERSE</span>
            <h2>One world. Six security boundaries.</h2>
            <p>Each district represents a real security problem from the engineering work — not a decorative planet or fictional technology.</p>
          </div>
          <div className="rw-world-rail">
            {worlds.map((world, index) => (
              <a key={world.id} href={"#" + world.id} className={activeIndex === index ? "active" : ""}>
                <span>{world.number}</span>
                <strong>{world.title}</strong>
                <small>{world.eyebrow}</small>
              </a>
            ))}
          </div>
        </section>

        <div className="rw-worlds">
          {worlds.map((world, index) => (
            <section
              id={world.id}
              key={world.id}
              data-world-id={world.id}
              className={`rw-world rw-world-${world.tone} rw-world-${index + 1}`}
            >
              <div className="rw-world-image" aria-hidden="true">
                <Image src={HERO_IMAGE} alt="" fill sizes="100vw" />
              </div>
              <div className="rw-world-environment" aria-hidden="true">
                <span className="rw-traffic t1" />
                <span className="rw-traffic t2" />
                <span className="rw-traffic t3" />
                <span className="rw-grid-plane" />
              </div>

              <div className="rw-world-number">{world.number}</div>

              <div className="rw-world-copy">
                <span>{world.eyebrow} · {world.location}</span>
                <h2>{world.title}</h2>
                <blockquote>{world.thesis}</blockquote>
                <p>{world.copy}</p>
                <div className="rw-world-proof">
                  {world.proof.map((item) => <small key={item}>{item}</small>)}
                </div>
              </div>

              <SecurityFlow world={world} />
            </section>
          ))}
        </div>

        <section className="rw-transit" aria-label="Transition to engineering evidence">
          <div className="rw-transit-visual">
            <Image src={VEHICLE_IMAGE} alt="" fill sizes="50vw" />
          </div>
          <div>
            <span>LEAVE THE CINEMATIC LAYER</span>
            <h2>Now inspect what actually exists.</h2>
            <p>The visual story ends here. The Engineering Vault is deliberately plain: implementation, tests, limitations and source.</p>
            <a href="#vault">Enter Engineering Vault <span>→</span></a>
          </div>
        </section>

        <section id="vault" className="rw-vault">
          <div className="rw-vault-head">
            <span>ENGINEERING VAULT</span>
            <h2>Evidence before marketing.</h2>
            <p>Three flagship systems. Every claim stays scoped to what the repositories and validation artifacts support.</p>
          </div>

          <div className="rw-vault-projects">
            {projects.map((project) => (
              <article key={project.repository} className="rw-project">
                <div className="rw-project-index">
                  <span>{project.number}</span>
                  <small>{project.category}</small>
                </div>
                <div className="rw-project-body">
                  <div className="rw-project-title">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <a href={`${profile.github}/${project.repository}`} target="_blank" rel="noreferrer">Repository ↗</a>
                  </div>
                  <p className="rw-project-description">{project.description}</p>
                  <div className="rw-project-metrics">
                    {project.metrics.map((metric) => <span key={metric}>{metric}</span>)}
                  </div>
                  <div className="rw-project-evidence">
                    <div><small>CONTROL SURFACE</small><p>{project.controls}</p></div>
                    <div><small>VALIDATION</small><p>{project.evidence}</p></div>
                    <div><small>LIMITATION</small><p>{project.scope}</p></div>
                  </div>
                  <div className="rw-project-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="rw-experience">
          <div className="rw-section-label">EXPERIENCE</div>
          <div className="rw-experience-main">
            <div className="rw-experience-intro">
              <h2>Engineering, research and operational context.</h2>
              <p>The work spans hands-on security engineering, aviation/compliance analysis and technical evaluation.</p>
            </div>
            <div className="rw-timeline">
              {experience.map((item) => (
                <article key={item.role}>
                  <div className="rw-time-meta"><span>{item.period}</span><small>{item.location}</small></div>
                  <div>
                    <h3>{item.role}</h3>
                    <strong>{item.organization}</strong>
                    <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rw-capabilities">
          <div className="rw-section-label">CAPABILITIES</div>
          <div className="rw-capability-grid">
            {skillGroups.map((group) => (
              <article key={group.title}>
                <span>{String(skillGroups.findIndex((item) => item.title === group.title) + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <p>{group.items.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="rw-about">
          <div className="rw-about-image">
            <Image src={PORTRAIT_IMAGE} alt="Portrait of Pooja Kiran" fill sizes="(max-width: 800px) 100vw, 42vw" />
          </div>
          <div className="rw-about-copy">
            <span>THE PERSON BEHIND THE SYSTEMS</span>
            <h2>Pooja Kiran</h2>
            <h3>Security Engineer</h3>
            <p>
              I focus on building and validating security controls for increasingly autonomous software systems:
              the agents that invoke tools, the identities that carry authority, the artifacts that enter trusted
              environments, and the telemetry that makes security decisions inspectable.
            </p>
            <div className="rw-about-links">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={RESUME_URL} download>Résumé ↓</a>
            </div>
          </div>
        </section>

        <footer className="rw-footer">
          <div>
            <span>SECURITY ISN&apos;T THE DESTINATION.</span>
            <h2>Trust is.</h2>
          </div>
          <div className="rw-footer-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <p>Security engineering · AI security · cloud identity · model assurance</p>
          </div>
        </footer>
      </main>
    </div>
  );
}