"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TrustUniverseExperience from "@/components/trust-universe/TrustUniverseExperience";
import {
  experience,
  profile,
  projects,
  RESUME_URL,
  SITE_PATH,
  skillGroups,
} from "@/data/portfolio";

const focusAreas = [
  {
    number: "01",
    title: "Agent Security",
    subtitle: "Control what AI is allowed to do.",
    copy: "Inline inspection, capability enforcement, prompt-injection detection, auditability, rate limits, and security telemetry at the point where agent intent becomes action.",
    signal: "629 tests · 55 patterns · 9 Elastic rules",
    icon: "◉",
    visualPosition: "18% 50%",
  },
  {
    number: "02",
    title: "Identity & Authorization",
    subtitle: "Make authority explicit.",
    copy: "Cloud IAM analysis for privilege paths, trust relationships, excessive permissions, permission boundaries, agent identity and machine-readable security findings.",
    signal: "25 rule IDs · 230 tests · SARIF 2.1.0",
    icon: "◇",
    visualPosition: "54% 36%",
  },
  {
    number: "03",
    title: "Model Assurance",
    subtitle: "Inspect the artifact before it runs.",
    copy: "Non-executing inspection of model provenance, serialization risk, suspicious loaders, impersonation indicators, dependency evidence and supply-chain metadata.",
    signal: "199 tests · 12/12 core · 18/18 variants",
    icon: "⌬",
    visualPosition: "72% 20%",
  },
  {
    number: "04",
    title: "Engineering Evidence",
    subtitle: "Turn security into something inspectable.",
    copy: "Source, tests, CI, SIEM rules, SARIF findings, limitations, architecture decisions and scoped performance gates that can survive technical review.",
    signal: "1,058 documented passing tests across flagships",
    icon: "▣",
    visualPosition: "88% 48%",
  },
] as const;

const HERO_IMAGE = `${SITE_PATH}/trust-universe-hero.webp`;

export default function CinematicSecurityPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [universeOpen, setUniverseOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroImage = HERO_IMAGE;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const renderPointer = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      root.style.setProperty("--cursor-x", currentX.toFixed(4));
      root.style.setProperty("--cursor-y", currentY.toFixed(4));
      root.style.setProperty("--stage-ry", `${(currentX * 3.2).toFixed(3)}deg`);
      root.style.setProperty("--stage-rx", `${(currentY * -2).toFixed(3)}deg`);
      root.style.setProperty("--grid-x", `${(currentX * 10).toFixed(2)}px`);
      root.style.setProperty("--grid-y", `${(currentY * 7).toFixed(2)}px`);
      root.style.setProperty("--map-x", `${(currentX * 14).toFixed(2)}px`);
      root.style.setProperty("--map-y", `${(currentY * 9).toFixed(2)}px`);
      root.style.setProperty("--console-left-x", `${(currentX * -9).toFixed(2)}px`);
      root.style.setProperty("--console-left-y", `${(currentY * -5).toFixed(2)}px`);
      root.style.setProperty("--console-right-x", `${(currentX * 8).toFixed(2)}px`);
      root.style.setProperty("--console-right-y", `${(currentY * 4).toFixed(2)}px`);
      root.style.setProperty("--desk-x", `${(currentX * 7).toFixed(2)}px`);
      root.style.setProperty("--desk-y", `${(currentY * 4).toFixed(2)}px`);
      root.style.setProperty("--portrait-x", `${(currentX * -12).toFixed(2)}px`);
      root.style.setProperty("--portrait-y", `${(currentY * -7).toFixed(2)}px`);
      root.style.setProperty("--portrait-ry", `${(currentX * -1.8).toFixed(3)}deg`);
      root.style.setProperty("--eye-x", `${(currentX * 5.2).toFixed(2)}px`);
      root.style.setProperty("--eye-y", `${(currentY * 2.1).toFixed(2)}px`);
      root.style.setProperty("--hero-photo-x", `${(currentX * 4.2).toFixed(2)}px`);
      root.style.setProperty("--hero-photo-y", `${(currentY * 2.8).toFixed(2)}px`);
      frame = requestAnimationFrame(renderPointer);
    };

    const onPointer = (event: PointerEvent) => {
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
      root.style.setProperty("--mouse-left", `${event.clientX}px`);
      root.style.setProperty("--mouse-top", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    if (!reduced.matches) frame = requestAnimationFrame(renderPointer);

    if (!reduced.matches) {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 46, filter: "blur(7px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 87%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".cyber-focus-card").forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 55, rotateX: 8, transformPerspective: 1200 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              delay: index * 0.05,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            },
          );
        });

        gsap.to(".cyber-hero-stage", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".cyber-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(".cyber-map-wrap", {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: ".cyber-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }, root);

      return () => {
        ctx.revert();
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onPointer);
      };
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  if (universeOpen) {
    return (
      <div className="cyber-universe-layer">
        <button
          type="button"
          className="cyber-universe-back"
          onClick={() => setUniverseOpen(false)}
        >
          ← Return to portfolio
        </button>
        <TrustUniverseExperience />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="cyber-portfolio">
      <div className="cyber-cursor-glow" aria-hidden="true" />

      <header className="cyber-header">
        <a href="#top" className="cyber-brand">
          <strong>POOJA KIRAN</strong>
        </a>

        <nav className={menuOpen ? "cyber-nav open" : "cyber-nav"} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>Approach</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Research</a>
          <a href="https://www.linkedin.com/in/poojakiran/recent-activity/all/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Writing</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="cyber-header-actions">
          <button type="button" className="cyber-universe-button" onClick={() => setUniverseOpen(true)}>
            Enter Trust Universe <span>↗</span>
          </button>
          <button
            type="button"
            className="cyber-menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
          >
            Menu
          </button>
        </div>
      </header>

      <main>
        <section id="top" className="cyber-hero">
          <div className="cyber-hero-grid">
            <div className="cyber-hero-copy">
              <p className="cyber-kicker">SECURITY ENGINEER / AI SYSTEMS / TRUST INFRASTRUCTURE</p>
              <h1>
                Intelligence can act.
                <br />
                Trust has to be <em>engineered.</em>
              </h1>
              <p className="cyber-hero-summary">
                I design and build security controls for the AI era — from agent execution and
                cloud identity to model provenance, detection, runtime enforcement, and evidence-driven engineering.
              </p>

              <div className="cyber-hero-actions">
                <button type="button" className="cyber-primary" onClick={() => setUniverseOpen(true)}>
                  Enter the Trust Universe <span>→</span>
                </button>
                <a className="cyber-secondary" href={RESUME_URL} download>
                  View résumé <span>↗</span>
                </a>
              </div>

              <div className="cyber-hero-principles" aria-label="Security principles">
                <span>SAFER AI</span>
                <i />
                <span>STRONGER IDENTITY</span>
                <i />
                <span>VERIFIABLE SYSTEMS</span>
              </div>

              <button
                type="button"
                className="cyber-explore-cue"
                onClick={() => document.querySelector("#approach")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="cyber-orbit-icon"><i /><i /><i /></span>
                <span>
                  <small>EXPLORE THE</small>
                  <strong>CYBER UNIVERSE</strong>
                  <em>CURSOR-REACTIVE EXPERIENCE</em>
                </span>
                <b>↘</b>
              </button>
            </div>

            <div className="cyber-hero-stage" aria-label="Pooja Kiran in a realistic cybersecurity command center">
              <div className="cyber-stage-frame cyber-stage-photo">
                {heroImage ? (
                  <img
                    className="cyber-command-image"
                    src={heroImage}
                    alt="Pooja Kiran seated in a cinematic cybersecurity operations center with global security maps and monitoring displays"
                  />
                ) : (
                  <div className="cyber-command-loading" aria-hidden="true">
                    <span />
                    <small>SECURE OPERATIONS ENVIRONMENT</small>
                  </div>
                )}
                <div className="cyber-command-shade" aria-hidden="true" />
                <div className="cyber-world-hotspots" aria-label="Trust Universe districts">
                  <button type="button" className="hotspot-agent" onClick={() => setUniverseOpen(true)}><span>01</span><strong>AGENT CITY</strong><small>MCP / AI SYSTEMS</small></button>
                  <button type="button" className="hotspot-model" onClick={() => setUniverseOpen(true)}><span>03</span><strong>MODEL LAB</strong><small>SUPPLY-CHAIN SECURITY</small></button>
                  <button type="button" className="hotspot-identity" onClick={() => setUniverseOpen(true)}><span>02</span><strong>IDENTITY</strong><small>AWS IAM</small></button>
                  <button type="button" className="hotspot-soc" onClick={() => setUniverseOpen(true)}><span>05</span><strong>SOC</strong><small>DETECTION / RESPONSE</small></button>
                  <button type="button" className="hotspot-real" onClick={() => setUniverseOpen(true)}><span>07</span><strong>REAL WORLD</strong><small>AVIATION / SYSTEMS</small></button>
                </div>
                <aside className="cyber-live-panel" aria-label="Validated engineering evidence">
                  <span>VALIDATED ENGINEERING</span>
                  <div><small>MCP TESTS</small><strong>629</strong></div>
                  <div><small>IAM RULE IDS</small><strong>25</strong></div>
                  <div><small>PROVENANCE TESTS</small><strong>199</strong></div>
                </aside>
                {heroImage && (
                  <>
                    <span className="cyber-eye cyber-eye-left" aria-hidden="true"><i /></span>
                    <span className="cyber-eye cyber-eye-right" aria-hidden="true"><i /></span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="cyber-hero-status" aria-hidden="true">
            <span>AGENT SECURITY</span>
            <span>IDENTITY</span>
            <span>MODEL TRUST</span>
            <span>DETECTION</span>
            <span>RUNTIME</span>
            <span>CLOUD</span>
          </div>
        </section>

        <section id="approach" className="cyber-section cyber-focus-section">
          <div className="cyber-section-head" data-reveal>
            <div>
              <span>AREAS OF FOCUS</span>
              <h2>Building trust for intelligent systems.</h2>
            </div>
            <p>
              From agents to infrastructure, I work at the intersection of security, identity,
              and AI — translating trust boundaries into enforceable controls and inspectable evidence.
            </p>
          </div>

          <div className="cyber-focus-grid">
            {focusAreas.map((area) => (
              <article
                key={area.number}
                className="cyber-focus-card"
                style={
                  heroImage
                    ? ({
                        "--focus-image": `url("${heroImage}")`,
                        "--focus-position": area.visualPosition,
                      } as CSSProperties)
                    : undefined
                }
              >
                <div className="cyber-focus-top">
                  <span className="cyber-focus-icon">{area.icon}</span>
                  <small>{area.number}</small>
                </div>
                <h3>{area.title}</h3>
                <strong>{area.subtitle}</strong>
                <p>{area.copy}</p>
                <div className="cyber-focus-signal">{area.signal}</div>
                <a className="cyber-focus-link" href="#work">Learn more <span>→</span></a>
              </article>
            ))}
          </div>
        </section>

        <section id="evidence" className="cyber-evidence-strip" data-reveal>
          <article><strong>629</strong><span>MCP passing tests</span></article>
          <article><strong>25</strong><span>deterministic IAM rule IDs</span></article>
          <article><strong>199</strong><span>provenance scanner passing tests</span></article>
          <article><strong>1,058</strong><span>documented passing tests across the three flagships</span></article>
        </section>

        <section id="work" className="cyber-section cyber-work-section">
          <div className="cyber-section-head dark" data-reveal>
            <div>
              <span>SELECTED SYSTEMS</span>
              <h2>Built to be inspected.</h2>
            </div>
            <p>
              Each flagship is open source and scoped conservatively: architecture, controls,
              validation evidence, limitations, and source are all visible.
            </p>
          </div>

          <div className="cyber-projects">
            {projects.map((project) => (
              <article key={project.repository} className="cyber-project" data-reveal>
                <div className="cyber-project-number">{project.number}</div>
                <div className="cyber-project-main">
                  <div className="cyber-project-heading">
                    <div>
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                    </div>
                    <a
                      href={`${profile.github}/${project.repository}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repository ↗
                    </a>
                  </div>
                  <p className="cyber-project-summary">{project.summary}</p>
                  <p className="cyber-project-description">{project.description}</p>

                  <div className="cyber-project-metrics">
                    {project.metrics.map((metric) => <span key={metric}>{metric}</span>)}
                  </div>

                  <div className="cyber-project-details">
                    <div><small>CONTROL SURFACE</small><p>{project.controls}</p></div>
                    <div><small>VALIDATION</small><p>{project.evidence}</p></div>
                    <div><small>LIMITATION</small><p>{project.scope}</p></div>
                  </div>

                  <div className="cyber-project-stack">
                    {project.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="cyber-section cyber-experience-section">
          <div className="cyber-section-head" data-reveal>
            <div>
              <span>EXPERIENCE</span>
              <h2>Security work, research, and operational context.</h2>
            </div>
            <p>
              Engineering depth matters most when it can be communicated across technical,
              research, compliance, and leadership audiences.
            </p>
          </div>

          <div className="cyber-experience-list">
            {experience.map((item) => (
              <article key={item.role} className="cyber-experience-row" data-reveal>
                <div className="cyber-experience-meta">
                  <span>{item.period}</span>
                  <small>{item.location}</small>
                </div>
                <div>
                  <h3>{item.role}</h3>
                  <p className="cyber-org">{item.organization}</p>
                  <ul>
                    {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cyber-section cyber-capability-section">
          <div className="cyber-section-head" data-reveal>
            <div>
              <span>ENGINEERING CAPABILITY</span>
              <h2>Security across the execution path.</h2>
            </div>
            <p>
              The stack is intentionally broad because AI security crosses application,
              identity, cloud, detection, runtime, and software-delivery boundaries.
            </p>
          </div>

          <div className="cyber-skill-grid">
            {skillGroups.map((group) => (
              <article key={group.title} data-reveal>
                <strong>{group.title}</strong>
                <p>{group.items.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cyber-universe-cta">
          <div data-reveal>
            <span>INTERACTIVE SECURITY ARCHITECTURE</span>
            <h2>Don’t just read the trust model. Enter it.</h2>
            <p>
              Explore the Trust District as a spatial security architecture: Agent Security,
              Identity, Model Assurance, Runtime, Telemetry, Cloud Infrastructure, Evidence, and Systems Review.
            </p>
            <button type="button" onClick={() => setUniverseOpen(true)}>
              Enter Trust Universe <span>→</span>
            </button>
          </div>
          <div className="cyber-universe-preview" aria-hidden="true">
            <div className="cyber-preview-sky" />
            <div className="cyber-preview-horizon" />
            <div className="cyber-preview-road" />
            <div className="cyber-preview-building b1" />
            <div className="cyber-preview-building b2" />
            <div className="cyber-preview-building b3" />
            <span>TRUST DISTRICT / RESEARCH CAMPUS</span>
          </div>
        </section>

        <footer id="contact" className="cyber-footer">
          <div>
            <span>SECURITY ENGINEERING · UNITED STATES</span>
            <h2>Build trust into the system before the system acts.</h2>
            <p>
              Tempe, Arizona · Open to U.S. relocation · F-1 OPT work authorization · Future sponsorship required.
            </p>
          </div>

          <div className="cyber-footer-links">
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
