"use client";

import { useEffect, useRef, useState } from "react";
import TrustUniverseExperience from "@/components/trust-universe/TrustUniverseExperience";
import { PORTRAIT_URL, RESUME_URL, profile, projects, experience, skillGroups } from "@/data/portfolio";

const focusCards = [
  {
    n: "01",
    icon: "◉",
    title: "Agent Security",
    copy: "Secure autonomous and agentic systems with guardrails, tool controls, prompt-injection detection, runtime protection, and auditability.",
    metric: "Learn more",
    visual: "agent",
  },
  {
    n: "02",
    icon: "◇",
    title: "Identity & Authorization",
    copy: "Design and validate identity systems across cloud and AI with fine-grained authorization, least privilege, trust relationships, and policy analysis.",
    metric: "Learn more",
    visual: "identity",
  },
  {
    n: "03",
    icon: "⌬",
    title: "Model Assurance",
    copy: "Establish provenance, integrity, and supply-chain evidence for modern AI models before artifacts are trusted or executed.",
    metric: "Learn more",
    visual: "model",
  },
  {
    n: "04",
    icon: "▣",
    title: "Engineering Evidence",
    copy: "Turn security into measurable outcomes with automated testing, CI validation, SIEM detections, SARIF findings, and explicit limitations.",
    metric: "Learn more",
    visual: "evidence",
  },
] as const;

export default function ExactSketchPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [universeOpen, setUniverseOpen] = useState(false);

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
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };

    const tick = () => {
      x += (tx - x) * 0.085;
      y += (ty - y) * 0.085;
      root.style.setProperty("--eye-x", `${(x * 5.4).toFixed(2)}px`);
      root.style.setProperty("--eye-y", `${(y * 3.2).toFixed(2)}px`);
      root.style.setProperty("--portrait-x", `${(x * -9).toFixed(2)}px`);
      root.style.setProperty("--portrait-y", `${(y * -5).toFixed(2)}px`);
      root.style.setProperty("--map-x", `${(x * 11).toFixed(2)}px`);
      root.style.setProperty("--map-y", `${(y * 6).toFixed(2)}px`);
      root.style.setProperty("--panel-x", `${(x * 6).toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (universeOpen) {
    return (
      <div className="sketch-universe">
        <button className="sketch-universe-back" onClick={() => setUniverseOpen(false)}>← Portfolio</button>
        <TrustUniverseExperience />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="sketch-site">
      <div className="sketch-cursor" aria-hidden="true" />

      <header className="sketch-header">
        <a className="sketch-logo" href="#top">POOJA KIRAN</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#research">Research</a>
          <a href="https://www.linkedin.com/in/poojakiran/recent-activity/all/" target="_blank" rel="noreferrer">Writing</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <button onClick={() => setUniverseOpen(true)}>Enter Trust Universe <span>→</span></button>
      </header>

      <main>
        <section id="top" className="sketch-hero">
          <div className="sketch-hero-bg" aria-hidden="true">
            <div className="sketch-city-grid" />
            <div className="sketch-city-lights" />
          </div>

          <div className="sketch-hero-copy">
            <p className="sketch-kicker">SECURITY ENGINEER / AI SYSTEMS / TRUST INFRASTRUCTURE</p>
            <h1>
              Intelligence can act.
              <br />
              Trust has to be
              <br />
              <em>engineered.</em>
            </h1>
            <p className="sketch-summary">
              I design and build security for the AI era — from agent security and cloud identity
              to model provenance, runtime enforcement, and evidence-driven security engineering.
            </p>

            <div className="sketch-actions">
              <button onClick={() => setUniverseOpen(true)}>Enter the Trust Universe <span>→</span></button>
              <a href={RESUME_URL} download>▤&nbsp;&nbsp; View Résumé</a>
            </div>

            <div className="sketch-principles">
              <span>SAFER AI</span><i />
              <span>STRONGER IDENTITY</span><i />
              <span>VERIFIABLE SYSTEMS</span>
            </div>

            <button className="sketch-explore" onClick={() => document.querySelector("#approach")?.scrollIntoView({behavior:"smooth"})}>
              <div className="sketch-orb"><i /><i /><i /></div>
              <div>
                <small>EXPLORE THE</small>
                <strong>CYBER UNIVERSE</strong>
                <span>A CURSOR-REACTIVE EXPERIENCE</span>
              </div>
              <b>→</b>
            </button>
          </div>

          <div className="sketch-command" aria-label="Cybersecurity command center">
            <div className="sketch-map-wall">
              <div className="sketch-map-grid" />
              <svg viewBox="0 0 800 420" aria-hidden="true">
                <path className="sketch-world" d="M70 130l50-28 43 9 21 28 42 4 25 31-9 28-40 14-29-11-26 21-33-3-17-29-31-16 5-28zm188-7 30-27 43 7 25 23 31 1 23 35-12 29-36 7-16 27-38-14-17-24-35-14-4-27zm174 24 30-24 47-6 28 14 10 25 34 7 17 29-15 29-31 4-13 24-35 7-27-24-34 2-19-23 7-31zm178-24 31-18 41 11 17 25 31 8 14 29-18 23-34-4-20 20-38-5-19-29-31-10-5-28z" />
                <path className="sketch-arc a" d="M155 178 Q338 10 530 175" />
                <path className="sketch-arc b" d="M242 214 Q446 56 650 179" />
                <path className="sketch-arc c" d="M165 211 Q403 344 628 223" />
                {[ [155,178],[242,214],[330,154],[530,175],[585,160],[650,179],[628,223] ].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="4" />)}
              </svg>
            </div>

            <div className="sketch-left-stack">
              <div><span>◉</span><p>GLOBAL THREAT<br/>INTELLIGENCE</p></div>
              <div><span>◈</span><p>AI SYSTEMS<br/>SECURITY</p></div>
              <div><span>◇</span><p>IDENTITY & ACCESS</p></div>
              <div><span>◌</span><p>MODEL MONITORING</p></div>
              <div><span>▣</span><p>CLOUD<br/>INFRASTRUCTURE</p></div>
              <div><span>⌁</span><p>RUNTIME<br/>ENFORCEMENT</p></div>
            </div>

            <div className="sketch-right-metrics">
              <div><small>FLAGSHIP SYSTEMS</small><strong>03</strong></div>
              <div><small>MCP PASSING TESTS</small><strong>629</strong></div>
              <div><small>IAM RULE IDs</small><strong>25</strong></div>
              <div><small>PROVENANCE TESTS</small><strong>199</strong></div>
            </div>

            <div className="sketch-monitor-row" aria-hidden="true">
              <div className="sketch-monitor m1"><i/><i/><i/></div>
              <div className="sketch-monitor m2"><i/><i/><i/><i/></div>
              <div className="sketch-monitor m3"><i/><i/><i/></div>
            </div>

            <figure className="sketch-person">
              <img src={PORTRAIT_URL} alt="Pooja Kiran, Security Engineer" />
              <span className="sketch-eye sketch-eye-left"><i /></span>
              <span className="sketch-eye sketch-eye-right"><i /></span>
            </figure>

            <div className="sketch-desk" aria-hidden="true">
              <div className="sketch-laptop"><span>SECURE<br/>INTELLIGENT<br/>VERIFIABLE</span></div>
              <div className="sketch-mug">TRUST<br/>FUELS<br/>PROGRESS</div>
              <div className="sketch-books"><i>AI SAFETY</i><i>CLOUD SECURITY</i><i>TRUST INFRASTRUCTURE</i></div>
            </div>

            <blockquote>“Security isn’t a feature.<br/>It’s a foundation for what’s next.”<small>— POOJA KIRAN</small></blockquote>
          </div>
        </section>

        <section id="approach" className="sketch-focus">
          <div className="sketch-focus-head">
            <div>
              <span>AREAS OF FOCUS</span>
              <h2>Building Trust for Intelligent Systems</h2>
            </div>
            <div className="sketch-focus-line" />
            <p>From agents to infrastructure, I work at the intersection of security, identity, and AI to build systems people can trust.</p>
          </div>

          <div className="sketch-card-grid">
            {focusCards.map((card) => (
              <article className={`sketch-card ${card.visual}`} key={card.n}>
                <span className="sketch-card-number">{card.n}</span>
                <div className="sketch-card-visual" aria-hidden="true">
                  <div className="sketch-card-glow" />
                  <div className="sketch-card-shape" />
                </div>
                <div className="sketch-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <a className="sketch-card-link" href="#work">{card.metric} <b>→</b></a>
              </article>
            ))}
          </div>

          <div className="sketch-metric-strip">
            <article><div className="sketch-metric-icon">⌁</div><strong>629</strong><span><b>PASSING TESTS</b>MCP Agent Security Gateway</span></article>
            <article><div className="sketch-metric-icon">⚙</div><strong>25</strong><span><b>IAM RULE IDS</b>Deterministic policy checks</span></article>
            <article><div className="sketch-metric-icon">◉</div><strong>199</strong><span><b>PROVENANCE TESTS</b>Model integrity validation</span></article>
            <article><div className="sketch-metric-icon">◎</div><strong>1,058</strong><span><b>PASSING TESTS</b>Across the three flagships</span></article>
          </div>
        </section>

        <section id="work" className="sketch-work">
          <div className="sketch-section-title">
            <span>SELECTED SYSTEMS</span>
            <h2>Engineering evidence behind the visual story.</h2>
          </div>
          <div className="sketch-project-list">
            {projects.map((project) => (
              <article key={project.repository}>
                <div>
                  <span>{project.number} / {project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="sketch-project-metrics">{project.metrics.slice(0,3).map(metric=><small key={metric}>{metric}</small>)}</div>
                <a href={`${profile.github}/${project.repository}`} target="_blank" rel="noreferrer">View repository ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="sketch-evidence">
          <div className="sketch-section-title">
            <span>ENGINEERING CAPABILITY</span>
            <h2>Security across the execution path.</h2>
          </div>
          <div className="sketch-skill-grid">
            {skillGroups.map(group => <article key={group.title}><strong>{group.title}</strong><p>{group.items.join(" · ")}</p></article>)}
          </div>
        </section>

        <section id="about" className="sketch-about">
          <div className="sketch-section-title">
            <span>EXPERIENCE</span>
            <h2>Research, engineering, and operational context.</h2>
          </div>
          {experience.map(item => (
            <article key={item.role}>
              <div><span>{item.period}</span><small>{item.location}</small></div>
              <div><h3>{item.role}</h3><p>{item.organization}</p><ul>{item.bullets.map(b=><li key={b}>{b}</li>)}</ul></div>
            </article>
          ))}
        </section>

        <footer id="contact" className="sketch-footer">
          <div><span>SECURITY ENGINEERING / UNITED STATES</span><h2>Build trust before the system acts.</h2></div>
          <div>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={RESUME_URL} download>Résumé ↓</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
