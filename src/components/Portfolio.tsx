"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { resume, resumeHref } from "@/data/resume";

const TrustScene = dynamic(() => import("@/components/TrustScene"), { ssr: false });

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function ProjectWorld({ index }: { index: number }) {
  const project = resume.projects[index];
  const labels = [
    ["REQUEST", "CAPABILITY", "POLICY", "ALLOW / BLOCK"],
    ["IDENTITY", "TRUST", "PERMISSION", "BOUNDARY"],
    ["ARTIFACT", "PROVENANCE", "ANALYSIS", "FINDING"]
  ][index];

  return (
    <section className="world" id={index === 0 ? "projects" : undefined} aria-labelledby={`world-${index}`}>
      <div className="world-visual" aria-hidden="true">
        <div className="boundary-frame">
          {labels.map((label, labelIndex) => (
            <div className={`boundary-node boundary-node--${labelIndex + 1}`} key={label}>
              <span>{String(labelIndex + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
            </div>
          ))}
          <div className="boundary-line boundary-line--a" />
          <div className="boundary-line boundary-line--b" />
          <div className="boundary-line boundary-line--c" />
        </div>
      </div>
      <div className="world-copy">
        <p className="eyebrow">System {String(index + 1).padStart(2, "0")} · résumé evidence</p>
        <h2 id={`world-${index}`}>{project.name}</h2>
        <p className="stack">{project.stack.join(" · ")}</p>
        {project.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}
        <div className="metric-tags">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
        <a className="button button--primary" href={project.repository} target="_blank" rel="noreferrer">Inspect repository ↗</a>
      </div>
    </section>
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
          <p className="muted">{resume.location} · {resume.email} · {resume.phone}</p>
        </div>
        <div className="recruiter-actions">
          <a className="button button--primary" href={resumeHref} target="_blank" rel="noreferrer">View résumé</a>
          <a className="button" href={resumeHref} download>Download résumé</a>
          <button className="button" type="button" onClick={onExplore}>Explore mode</button>
        </div>
      </header>

      <main className="recruiter-main">
        <section>
          <div className="section-heading"><p className="eyebrow">Evidence at a glance</p><h2>Selected engineering evidence</h2></div>
          <div className="metric-strip">
            <div><strong>659</strong><span>passing MCP tests</span></div>
            <div><strong>82%</strong><span>statement coverage</span></div>
            <div><strong>235</strong><span>passing IAM tests</span></div>
            <div><strong>173</strong><span>passing LLM security tests</span></div>
          </div>
        </section>

        <section>
          <div className="section-heading"><p className="eyebrow">Selected projects</p><h2>Security engineering work</h2></div>
          <div className="recruiter-projects">
            {resume.projects.map((project) => (
              <article className="recruiter-card" key={project.name}>
                <div className="card-topline"><h3>{project.name}</h3><span>{project.dates}</span></div>
                <p className="stack">{project.stack.join(" · ")}</p>
                <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                <div className="metric-tags">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">Open repository ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="section-heading"><p className="eyebrow">Experience</p><h2>Roles and scope</h2></div>
          <div className="timeline">
            {resume.experience.map((item) => (
              <article className="timeline-item" key={item.role + item.dates}>
                <div className="timeline-date">{item.dates}</div>
                <div>
                  <h3>{item.role}{item.detail ? <span> · {item.detail}</span> : null}</h3>
                  <p className="muted">{item.organization} · {item.location}{item.mode ? ` · ${item.mode}` : ""}</p>
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="section-heading"><p className="eyebrow">Technical skills</p><h2>Security and engineering stack</h2></div>
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

export default function Portfolio() {
  const [mode, setMode] = useState<"explore" | "recruiter">("explore");
  const reducedMotion = useReducedMotion();

  if (mode === "recruiter") return <RecruiterView onExplore={() => setMode("explore")} />;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Pooja Kiran home"><span className="brand-mark">PK</span><span>{resume.name}</span></a>
        <nav className="desktop-nav" aria-label="Primary">
          <a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#skills">Skills</a><a href="#education">Education</a>
          <a href={resumeHref} target="_blank" rel="noreferrer">Résumé</a>
        </nav>
        <button className="mode-switch" type="button" onClick={() => setMode("recruiter")}>Recruiter view</button>
      </header>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="scene-fallback" aria-hidden="true" />
          <TrustScene reducedMotion={reducedMotion} />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Security engineering · résumé-sourced</p>
            <h1>{resume.name}</h1>
            <p className="hero-title">Security Engineer</p>
            <p className="hero-subtitle">Agentic AI Security · Cloud IAM</p>
            <p className="hero-summary">Security controls across agent tool calls, cloud identity, model supply chains, application security, and detection engineering.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#projects">Explore work</a>
              <button className="button" type="button" onClick={() => setMode("recruiter")}>Quick recruiter view</button>
              <a className="button button--ghost" href={resumeHref} target="_blank" rel="noreferrer">View résumé ↗</a>
            </div>
            <div className="hero-proof" aria-label="Selected resume metrics">
              <div><strong>659</strong><span>passing MCP tests</span></div>
              <div><strong>235</strong><span>passing IAM tests</span></div>
              <div><strong>173</strong><span>passing LLM security tests</span></div>
            </div>
          </div>
          <div className="scroll-cue" aria-hidden="true"><span />Scroll to inspect</div>
        </section>

        <section className="trust-strip" aria-label="Security domains">
          <span>Agent runtime security</span><span>AWS IAM</span><span>LLM red teaming</span><span>Model supply-chain security</span><span>Detection & observability</span>
        </section>

        <ProjectWorld index={0} />
        <ProjectWorld index={1} />
        <ProjectWorld index={2} />

        <section className="experience-section" id="experience" aria-labelledby="experience-heading">
          <div className="section-heading section-heading--wide"><p className="eyebrow">Experience</p><h2 id="experience-heading">Engineering, compliance, and technical evaluation</h2></div>
          <div className="experience-rail">
            {resume.experience.map((item, index) => (
              <article className="experience-card" key={item.role + item.dates}>
                <div className="experience-index">{String(index + 1).padStart(2, "0")}</div>
                <div className="card-topline"><h3>{item.role}</h3><span>{item.dates}</span></div>
                {item.detail ? <p className="experience-detail">{item.detail}</p> : null}
                <p className="muted">{item.organization}</p><p className="muted">{item.location}{item.mode ? ` · ${item.mode}` : ""}</p>
                <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" id="skills" aria-labelledby="skills-heading">
          <div className="section-heading section-heading--wide"><p className="eyebrow">Technical skills</p><h2 id="skills-heading">Security systems, identity, engineering, and observability</h2></div>
          <div className="skill-matrix">
            {resume.skillGroups.map((group, index) => (
              <article className="skill-panel" key={group.label}><span className="skill-index">0{index + 1}</span><h3>{group.label}</h3><div className="skill-cloud">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>
            ))}
          </div>
        </section>

        <section className="education-section" id="education" aria-labelledby="education-heading">
          <div className="section-heading"><p className="eyebrow">Education & certifications</p><h2 id="education-heading">Academic foundation</h2></div>
          <div className="education-stack">
            {resume.education.map((item) => (
              <article key={item.school}><div><h3>{item.school}</h3><p>{item.degree}</p></div><div className="education-meta"><strong>{item.score}</strong><span>{item.dates}</span></div></article>
            ))}
          </div>
          <div className="cert-row">{resume.certifications.map((item) => <span key={item}>{item}</span>)}</div>
        </section>

        <section className="closing" id="contact">
          <div className="closing-grid" aria-hidden="true" />
          <div className="closing-copy">
            <p className="eyebrow">Contact</p><h2>{resume.name}</h2><p>{resume.headline}</p><p className="muted">{resume.location}</p>
            <div className="closing-actions">
              <a className="button button--primary" href={`mailto:${resume.email}`}>Email</a>
              <a className="button" href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="button" href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a className="button" href={resumeHref} download>Download résumé</a>
            </div>
            <p className="source-note">Portfolio content source: {resume.sourceFile}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
