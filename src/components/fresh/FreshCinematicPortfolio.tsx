"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  award,
  credentials,
  education,
  experience,
  profile,
  projects,
  publication,
  resumeSummary,
  RESUME_URL,
  PORTRAIT_URL,
  skillGroups,
} from "@/data/portfolio";

type Project = (typeof projects)[number];

function DecisionPath({ project, index }: { project: Project; index: number }) {
  const flows = [
    ["AGENT", "MCP REQUEST", "TRUST", "CAPABILITY", "INJECTION", "EGRESS", "DECISION"],
    ["WORKLOAD", "ROLE", "TRUST POLICY", "PERMISSIONS", "PRIVILEGE PATH", "SARIF", "CI GATE"],
    ["MODEL", "PROVENANCE", "CONFIG", "FORMAT", "ARTIFACT", "RISK SIGNAL", "VERDICT"],
  ];
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const flow = flows[index];

  useEffect(() => {
    if (!running) return;
    if (step >= flow.length - 1) {
      const done = window.setTimeout(() => setRunning(false), 650);
      return () => window.clearTimeout(done);
    }
    const timer = window.setTimeout(() => setStep((value) => value + 1), step < 0 ? 160 : 380);
    return () => window.clearTimeout(timer);
  }, [flow.length, running, step]);

  const run = () => {
    setStep(-1);
    setRunning(true);
  };

  return (
    <div className="fc-decision">
      <div className="fc-decision-top">
        <div>
          <small>INTERACTIVE CONTROL PATH</small>
          <strong>{project.summary}</strong>
        </div>
        <button type="button" onClick={run}>{running ? "RUNNING" : step >= 0 ? "REPLAY" : "RUN"}</button>
      </div>

      <div className="fc-decision-flow">
        {flow.map((label, flowIndex) => (
          <div key={label} className={flowIndex <= step ? "active" : ""}>
            <span>{String(flowIndex + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>

      <p>
        {step === flow.length - 1
          ? index === 0
            ? "The tool call reaches a policy decision before downstream execution and the result becomes security telemetry."
            : index === 1
              ? "The risky authorization path becomes a machine-readable finding before deployment."
              : "The artifact is inspected without execution so provenance and serialization risk can be reviewed before loading."
          : "Run the path to see where the security boundary is enforced."}
      </p>
    </div>
  );
}

export default function FreshCinematicPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const pointer = (event: PointerEvent) => {
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;
      root.style.setProperty("--px", (currentX * 20).toFixed(2) + "px");
      root.style.setProperty("--py", (currentY * 12).toFixed(2) + "px");
      root.style.setProperty("--px-near", (currentX * -30).toFixed(2) + "px");
      root.style.setProperty("--py-near", (currentY * -18).toFixed(2) + "px");
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", pointer, { passive: true });
    frame = requestAnimationFrame(animate);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = reduced
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) entry.target.classList.add("is-visible");
            });
          },
          { threshold: 0.12 },
        );

    if (observer) {
      root.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    }

    return () => {
      window.removeEventListener("pointermove", pointer);
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="fc-site">
      <div className="fc-grain" aria-hidden="true" />
      <div className="fc-pointer-light" aria-hidden="true" />

      <header className="fc-header">
        <a href="#home" className="fc-logo">POOJA KIRAN</a>

        <nav className={menuOpen ? "fc-nav open" : "fc-nav"} aria-label="Main navigation">
          <a href="#systems" onClick={() => setMenuOpen(false)}>Systems</a>
          <a href="#evidence" onClick={() => setMenuOpen(false)}>Evidence</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#profile" onClick={() => setMenuOpen(false)}>Profile</a>
        </nav>

        <div className="fc-header-actions">
          <a href={RESUME_URL} download className="fc-resume">Résumé <span>↗</span></a>
          <button type="button" className="fc-menu" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen}>Menu</button>
        </div>
      </header>

      <main>
        <section id="home" className="fc-hero">
          <div className="fc-hero-architecture" aria-hidden="true">
            <div className="fc-horizon" />
            <div className="fc-light-column" />
            <div className="fc-floor-lines" />
            <div className="fc-orbit o1" />
            <div className="fc-orbit o2" />
          </div>

          <div className="fc-hero-copy">
            <p className="fc-eyebrow"><i /> SECURITY ENGINEER · AI SECURITY · CLOUD IDENTITY</p>
            <h1>
              Security for systems
              <br />
              that can <em>act.</em>
            </h1>
            <p className="fc-hero-lead">
              I design security boundaries for AI agents, cloud identities and model supply chains —
              then prove those controls with adversarial testing, CI enforcement and detection telemetry.
            </p>

            <div className="fc-hero-actions">
              <a href="#systems" className="fc-button fc-button-primary">Explore the systems <span>→</span></a>
              <a href="#evidence" className="fc-button fc-button-ghost">Inspect evidence</a>
            </div>

            <div className="fc-hero-signals">
              <span>01 · AGENT EXECUTION</span>
              <span>02 · IDENTITY / IAM</span>
              <span>03 · MODEL PROVENANCE</span>
            </div>
          </div>

          <div className="fc-portrait-stage" aria-label="Portrait of Pooja Kiran">
            <div className="fc-portrait-glow" aria-hidden="true" />
            <div className="fc-portrait-frame">
              <Image
                src={PORTRAIT_URL}
                alt="Pooja Kiran"
                fill
                priority
                sizes="(max-width: 900px) 88vw, 42vw"
              />
              <div className="fc-portrait-grade" aria-hidden="true" />
              <div className="fc-scan-line" aria-hidden="true" />
            </div>

            <div className="fc-portrait-caption">
              <span>POOJA KIRAN</span>
              <strong>SECURITY ENGINEER</strong>
              <small>Tempe, Arizona · Open-source security engineering</small>
            </div>

            <div className="fc-portrait-index" aria-hidden="true">
              <span>PK / 26</span>
              <i />
              <small>TRUST BOUNDARY ENGINEERING</small>
            </div>
          </div>

          <div className="fc-hero-evidence">
            <div><small>OPEN-SOURCE SYSTEMS</small><strong>03</strong></div>
            <div><small>DOCUMENTED PASSING TESTS</small><strong>1,047</strong></div>
            <div><small>IAM RULE IDS</small><strong>25</strong></div>
          </div>

          <a href="#systems" className="fc-scroll"><span>ENTER</span><i /></a>
        </section>

        <section className="fc-reel" aria-label="Security focus areas">
          <div>
            <span>SECURITY ARCHITECTURE</span><i />
            <span>CONTROL DEVELOPMENT</span><i />
            <span>ADVERSARIAL VALIDATION</span><i />
            <span>DETECTION ENGINEERING</span><i />
            <span>AI SUPPLY CHAIN</span><i />
            <span>CLOUD IDENTITY</span>
          </div>
        </section>

        <section id="systems" className="fc-intro" data-reveal>
          <div className="fc-section-number">01</div>
          <div>
            <span className="fc-section-kicker">FLAGSHIP SECURITY SYSTEMS</span>
            <h2>Three systems. One security thesis.</h2>
          </div>
          <p>
            Every project addresses a different point where trust can fail: an agent taking action,
            an identity carrying excessive authority, or an untrusted model artifact entering a trusted environment.
          </p>
        </section>

        <section className="fc-project-reel">
          {projects.map((project, index) => (
            <article key={project.repository} className={"fc-project fc-project-" + (index + 1)} data-reveal>
              <div className="fc-project-backdrop" aria-hidden="true">
                <span className="fc-project-grid" />
                <span className="fc-project-beam b1" />
                <span className="fc-project-beam b2" />
                <span className="fc-project-node n1" />
                <span className="fc-project-node n2" />
                <span className="fc-project-node n3" />
              </div>

              <div className="fc-project-meta">
                <span>{project.number}</span>
                <small>{project.category}</small>
              </div>

              <div className="fc-project-copy">
                <p className="fc-section-kicker">{index === 0 ? "AGENT EXECUTION BOUNDARY" : index === 1 ? "CLOUD AUTHORIZATION BOUNDARY" : "MODEL TRUST BOUNDARY"}</p>
                <h2>{project.title}</h2>
                <blockquote>{project.summary}</blockquote>
                <p>{project.description}</p>

                <div className="fc-project-metrics">
                  {project.metrics.map((metric) => <span key={metric}>{metric}</span>)}
                </div>

                <div className="fc-project-links">
                  <a href={profile.github + "/" + project.repository} target="_blank" rel="noreferrer">Open repository ↗</a>
                  <a href="#evidence">View evidence ↓</a>
                </div>
              </div>

              <DecisionPath project={project} index={index} />
            </article>
          ))}
        </section>

        <section id="evidence" className="fc-evidence">
          <div className="fc-evidence-head" data-reveal>
            <span className="fc-section-number">02</span>
            <div>
              <span className="fc-section-kicker">ENGINEERING EVIDENCE</span>
              <h2>Proof before polish.</h2>
              <p>The visual layer stops here. This section is deliberately direct: control surface, validation and known limitations.</p>
            </div>
          </div>

          <div className="fc-evidence-grid">
            {projects.map((project) => (
              <article key={project.repository} data-reveal>
                <div className="fc-evidence-title">
                  <span>{project.number}</span>
                  <div><h3>{project.title}</h3><small>{project.period}</small></div>
                </div>
                <div className="fc-evidence-block"><small>CONTROL SURFACE</small><p>{project.controls}</p></div>
                <div className="fc-evidence-block"><small>VALIDATION</small><p>{project.evidence}</p></div>
                <div className="fc-evidence-block fc-limitation"><small>LIMITATION</small><p>{project.scope}</p></div>
                <div className="fc-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="fc-experience">
          <div className="fc-experience-head" data-reveal>
            <span className="fc-section-number">03</span>
            <div>
              <span className="fc-section-kicker">EXPERIENCE</span>
              <h2>Security engineering with operational context.</h2>
            </div>
          </div>

          <div className="fc-timeline">
            {experience.map((item, index) => (
              <article key={item.role} data-reveal>
                <div className="fc-timeline-index">0{index + 1}</div>
                <div className="fc-timeline-meta">
                  <span>{item.period}</span>
                  <small>{item.location}</small>
                </div>
                <div className="fc-timeline-copy">
                  <h3>{item.role}</h3>
                  <strong>{item.organization}</strong>
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="fc-capabilities">
          <div className="fc-capabilities-head" data-reveal>
            <span className="fc-section-number">04</span>
            <div>
              <span className="fc-section-kicker">CAPABILITIES</span>
              <h2>Across the execution path.</h2>
            </div>
          </div>
          <div className="fc-capability-grid">
            {skillGroups.map((group, index) => (
              <article key={group.title} data-reveal>
                <span>0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.items.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="profile" className="fc-profile">
          <div className="fc-profile-photo" data-reveal>
            <div className="fc-profile-photo-inner">
              <Image src={PORTRAIT_URL} alt="Pooja Kiran" fill sizes="(max-width: 850px) 100vw, 46vw" />
            </div>
          </div>

          <div className="fc-profile-copy" data-reveal>
            <span className="fc-section-kicker">PROFILE</span>
            <h2>Pooja Kiran</h2>
            <h3>Security Engineer</h3>
            <p>{resumeSummary}</p>

            <div className="fc-profile-links">
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={RESUME_URL} download>Résumé ↓</a>
            </div>

            <div className="fc-education">
              {education.map((item) => (
                <article key={item.degree}>
                  <span>{item.period}</span>
                  <h4>{item.degree}</h4>
                  <p>{item.school} · {item.location}{item.detail ? " · " + item.detail : ""}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fc-credentials">
          <div className="fc-credentials-column" data-reveal>
            <span className="fc-section-kicker">TRAINING & CREDENTIALS</span>
            {credentials.map((item) => <p key={item}>{item}</p>)}
          </div>
          <div className="fc-credentials-column" data-reveal>
            <span className="fc-section-kicker">PUBLICATION</span>
            <h3>{publication.title}</h3>
            <p>{publication.venue} · {publication.period}</p>
            <small>{publication.detail}</small>
          </div>
          <div className="fc-credentials-column" data-reveal>
            <span className="fc-section-kicker">AWARD & GRANT</span>
            <h3>{award.title}</h3>
            <p>{award.organization} · {award.period}</p>
            <small>{award.detail}</small>
          </div>
        </section>

        <footer className="fc-footer">
          <div className="fc-footer-copy">
            <span>SECURITY ENGINEERING · AI SECURITY · TRUST INFRASTRUCTURE</span>
            <h2>
              Build the control.
              <br />
              <em>Prove the trust.</em>
            </h2>
          </div>
          <div className="fc-footer-contact">
            <p>Open to security engineering opportunities in the United States.</p>
            <a href={"mailto:" + profile.email}>{profile.email}</a>
            <div>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
