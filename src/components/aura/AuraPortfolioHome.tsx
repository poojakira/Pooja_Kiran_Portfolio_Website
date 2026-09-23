"use client";

import { useState } from "react";
import TrustUniverseExperience from "@/components/trust-universe/TrustUniverseExperience";
import { profile, projects, RESUME_URL } from "@/data/portfolio";

export default function AuraPortfolioHome() {
  const [worldOpen, setWorldOpen] = useState(false);

  if (worldOpen) {
    return (
      <div className="aura-world-mode">
        <button
          type="button"
          className="aura-return-home"
          onClick={() => setWorldOpen(false)}
          aria-label="Return to portfolio home"
        >
          ← Portfolio
        </button>
        <TrustUniverseExperience />
      </div>
    );
  }

  return (
    <main className="aura-home-shell">
      <header className="aura-home-nav">
        <a href="#top" className="aura-home-mark" aria-label="Pooja Kiran home">
          <span>✦</span>
          <strong>POOJA KIRAN</strong>
        </a>

        <nav aria-label="Portfolio navigation">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>

        <button type="button" onClick={() => setWorldOpen(true)}>
          Enter Trust Universe
        </button>
      </header>

      <section id="top" className="aura-home-hero">
        <div className="aura-home-copy">
          <span className="aura-home-eyebrow">SECURITY ENGINEER · AI SYSTEMS · CLOUD IDENTITY</span>
          <h1>
            Intelligence can act.
            <br />
            <em>Trust has to be engineered.</em>
          </h1>
          <p>
            I build and test security controls across AI agents, identity, model provenance,
            runtime enforcement and detection — then make the evidence inspectable.
          </p>

          <div className="aura-home-actions">
            <button type="button" className="primary" onClick={() => setWorldOpen(true)}>
              Enter the Trust Universe
            </button>
            <a href={RESUME_URL} download className="secondary">
              View résumé
            </a>
          </div>
        </div>

        <div className="aura-home-visual" aria-hidden="true">
          <div className="aura-field aura-field-a" />
          <div className="aura-field aura-field-b" />
          <div className="aura-field aura-field-c" />
          <div className="aura-visual-grid" />
          <div className="aura-visual-label">
            <span>TRUST ARCHITECTURE</span>
            <strong>INTENT → AUTHORITY → EXECUTION → EVIDENCE</strong>
          </div>
        </div>

        <div className="aura-home-scrollcue" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </section>

      <section id="approach" className="aura-editorial-section aura-editorial-intro">
        <div className="aura-section-kicker">ABOUT THE WORK</div>
        <div className="aura-editorial-grid">
          <h2>
            Powerful enough
            <br />
            to move fast.
            <br />
            <span>Disciplined enough to prove it.</span>
          </h2>
          <div>
            <p>
              My work focuses on the infrastructure between intelligent systems and privileged
              actions: what may execute, which identity is authorized, what model artifact is
              trusted, and whether the resulting decision can be observed and tested.
            </p>
            <p>
              The visual experience is only the front door. Every important engineering claim
              resolves into source code, tests, CI evidence, explicit scope and limitations.
            </p>
          </div>
        </div>

        <div className="aura-principles">
          <article>
            <span>01</span>
            <strong>Capability is not permission.</strong>
            <p>Agent actions should cross an explicit policy boundary before execution.</p>
          </article>
          <article>
            <span>02</span>
            <strong>Authority is a graph.</strong>
            <p>Identity risk emerges through roles, trust, delegation and reachable resources.</p>
          </article>
          <article>
            <span>03</span>
            <strong>Evidence beats claims.</strong>
            <p>Security controls should survive tests, telemetry and technical scrutiny.</p>
          </article>
        </div>
      </section>

      <section id="work" className="aura-work-section">
        <div className="aura-work-heading">
          <span>SELECTED SYSTEMS</span>
          <h2>
            Serious systems.
            <br />
            Clear evidence.
          </h2>
          <p>
            Three flagship open-source security systems anchor the portfolio.
          </p>
        </div>

        <div className="aura-work-list">
          {projects.map((project, index) => (
            <article key={project.repository} className="aura-work-card">
              <div className="aura-work-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="aura-work-content">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="aura-work-metrics">
                  {project.metrics.slice(0, 3).map((metric) => (
                    <small key={metric}>{metric}</small>
                  ))}
                </div>
              </div>
              <a
                href={`${profile.github}/${project.repository}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} repository`}
              >
                ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="aura-universe-invite">
        <div className="aura-universe-copy">
          <span>INTERACTIVE EXPERIENCE</span>
          <h2>
            Don’t scroll through the architecture.
            <br />
            <em>Enter it.</em>
          </h2>
          <p>
            Trust District turns the same engineering story into a navigable research campus:
            Agent Security, Identity, Model Assurance, Runtime, Telemetry, Cloud and Evidence.
          </p>
          <button type="button" onClick={() => setWorldOpen(true)}>
            Enter Trust Universe
          </button>
        </div>

        <div className="aura-universe-preview" aria-hidden="true">
          <div className="aura-preview-horizon" />
          <div className="aura-preview-road" />
          <div className="aura-preview-structure one" />
          <div className="aura-preview-structure two" />
          <div className="aura-preview-structure three" />
          <div className="aura-preview-sun" />
          <span>TRUST DISTRICT / RESEARCH CAMPUS</span>
        </div>
      </section>

      <section className="aura-results-section">
        <div>
          <span>ENGINEERING SIGNAL</span>
          <h2>Built to be inspected.</h2>
        </div>
        <div className="aura-results-grid">
          <article><strong>629</strong><span>passing tests in MCP Agent Security Gateway</span></article>
          <article><strong>25</strong><span>deterministic AWS IAM rule IDs</span></article>
          <article><strong>199</strong><span>passing tests in model provenance scanner</span></article>
        </div>
      </section>

      <footer id="contact" className="aura-home-footer">
        <div>
          <span>AVAILABLE FOR SECURITY ENGINEERING OPPORTUNITIES</span>
          <h2>Build trust into the system before the system acts.</h2>
        </div>

        <div className="aura-footer-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={RESUME_URL} download>Résumé ↓</a>
        </div>
      </footer>
    </main>
  );
}
