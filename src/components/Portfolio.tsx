"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { resume, resumeHref, trustChain, type ProjectItem } from "@/data/resume";

import dynamic from "next/dynamic";
import WorldInspector, { TelemetryWorld } from "./WorldInspector";
const TrustScene = dynamic(() => import("./TrustScene"), { ssr: false });

type ViewMode = "explore" | "recruiter";

const basePath = process.env.NODE_ENV === "production" ? "/Pooja_Kiran_Portfolio_Website" : "";
const asset = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

function ShieldMark() {
  return <svg viewBox="0 0 32 36" aria-hidden="true"><path d="M16 2 28 7v9c0 8-4.8 14-12 18C8.8 30 4 24 4 16V7l12-5Z" /><path d="m10 18 4 4 8-9" /></svg>;
}

function Header({ mode, setMode }: { mode: ViewMode; setMode: (mode: ViewMode) => void }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const links = ["Home", "Explore", "Projects", "Experience", "Research", "About", "Contact"];
  const navigation = () => links.map(label => <a key={label} href={`#${label === "Explore" ? "projects" : label.toLowerCase()}`} onClick={() => { setOpen(false); if (label === "Explore" && mode !== "explore") setMode("explore"); }}>{label}</a>);
  return <header className="nav-shell" onKeyDown={event => { if (event.key === "Escape" && open) { setOpen(false); menuButton.current?.focus(); } }}>
    <a className="brand-lockup" href="#home" aria-label="Pooja Kiran home"><span className="brand-mark"><ShieldMark /></span><span><strong>{resume.name}</strong><small>Security Engineer</small></span></a>
    <nav className="desktop-nav" aria-label="Primary">{navigation()}</nav>
    <div className="nav-actions">
      <button className={mode === "recruiter" ? "view-toggle is-active" : "view-toggle"} onClick={() => setMode(mode === "recruiter" ? "explore" : "recruiter")}><span className="view-dot" />{mode === "recruiter" ? "Explore View" : "Recruiter View"}</button>
      <a className="icon-link" href={resumeHref} target="_blank" rel="noreferrer" aria-label="Open resume">CV</a>
      <button ref={menuButton} className="mobile-menu-button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>Menu</button>
    </div>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile primary" hidden={!open}>{navigation()}<a href={resumeHref}>Resume</a><a href={resume.links.github} target="_blank" rel="noreferrer">GitHub</a><a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></nav>
  </header>;
}

function MonitorPanel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return <div className={`monitor-panel ${className}`}><div className="monitor-top"><span>{title}</span><i /><i /><i /></div>{children}</div>;
}

function HeroLab({ setMode }: { setMode: (mode: ViewMode) => void }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const motionAllowed = useRef(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)");
    const update = () => { motionAllowed.current = !preference.matches; setPointer({ x: 0, y: 0 }); };
    update(); preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return (
    <section className="hero-lab" id="home" onPointerMove={(event) => {
      if (!motionAllowed.current) return;
      const rect = event.currentTarget.getBoundingClientRect();
      setPointer({ x: ((event.clientX - rect.left) / rect.width - .5) * 2, y: ((event.clientY - rect.top) / rect.height - .5) * 2 });
    }}>
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-copy">
        <p className="kicker">SECURITY ENGINEER · AGENT SECURITY · APPLICATION SECURITY · CLOUD IAM</p>
        <h1>Pooja Kiran</h1>
        <h2>I engineer <em>trust boundaries</em><br />for systems that can act.</h2>
        <p className="hero-summary">Security controls across agent runtime execution, cloud identity, model supply chains, and evidence-backed detection.</p>
        <div className="hero-actions">
          <a className="primary-action" href="#projects">Explore the trust universe <ArrowIcon /></a>
          <button className="secondary-action" onClick={() => setMode("recruiter")}>Recruiter View</button>
        </div>
        <div className="hero-proof" aria-label="Resume-backed engineering evidence">
          {resume.projects.map(project => <span key={project.id}><b>{project.metrics.find(metric => metric.includes("passing tests"))?.split(" ")[0]}</b>{project.id === "mcp" ? "Gateway" : project.id === "iam" ? "IAM analyzer" : "Provenance"} tests in resume</span>)}
        </div>
      </div>

      <div className="lab-stage" aria-label="Security research command environment">
        <div className="portrait-wrap" style={{ transform: `translate3d(${pointer.x * -5}px,${pointer.y * -3}px,0)` }}>
          <div className="portrait-halo" />
          <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="900" />
          <div className="portrait-caption"><span>POOJA KIRAN</span><small>Security Engineer</small></div>
        </div>

        <div className="monitor-stack" style={{ transform: `translate3d(${pointer.x * 8}px,${pointer.y * 4}px,0)` }}>
          <MonitorPanel title="MCP / JSON-RPC EXECUTION BOUNDARY" className="monitor-mcp">
            <div className="agent-flow"><span>Agent</span><i /><strong>Gateway</strong><i /><span>Tool</span></div>
            <div className="check-stack"><b>inspect</b><b>capability</b><b>policy</b><b className="blocked">blocked request</b></div>
          </MonitorPanel>
          <MonitorPanel title="IAM AUTHORIZATION GRAPH" className="monitor-iam">
            <div className="iam-graph">
              <span className="iam-node n1">Principal</span><span className="iam-node n2">PassRole</span><span className="iam-node n3">Target role</span><span className="iam-node n4">Resource</span>
              <svg viewBox="0 0 400 190" aria-hidden="true"><path d="M78 95 170 45 318 95M78 95l92 52 148-52" /><path className="risk-path" d="M170 45 318 95" /></svg>
            </div>
          </MonitorPanel>
          <MonitorPanel title="MODEL PROVENANCE INSPECTION" className="monitor-model">
            <div className="artifact-flow"><span>Repo</span><i>→</i><span>Static parse</span><i>→</i><span>Evidence</span></div>
            <div className="format-pills"><b>Pickle</b><b>SafeTensors</b><b>GGUF</b><b>ONNX</b></div>
          </MonitorPanel>
          <MonitorPanel title="SECURITY TELEMETRY" className="monitor-telemetry">
            <div className="telemetry-bars">{[26,43,37,70,49,82,57,92,66,78,48,86].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>
            <div className="telemetry-row"><span>policy.allow</span><span>audit.append</span><span className="risk-text">policy.block</span></div>
          </MonitorPanel>
        </div>
      </div>
      <div className="hero-scroll"><span>SCROLL TO INSPECT</span><i /></div>
    </section>
  );
}

function EvidenceStrip({ project }: { project: ProjectItem }) {
  return <div className="evidence-strip">{project.metrics.map(metric => <span key={metric}>{metric}</span>)}</div>;
}

function ProjectWorld({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <article className="project-world" id={project.id}>
      <div className="world-copy">
        <div className="world-meta"><span>WORLD {String(index + 1).padStart(2, "0")}</span><span>{project.dates}</span></div>
        <p className="world-label">{project.label}</p>
        <h3>{project.name}</h3>
        <p className="world-problem">{project.problem}</p>
        <div className="world-solution"><span>CONTROL</span><p>{project.solution}</p></div>
        <EvidenceStrip project={project} />
        <details className="technical-details">
          <summary>Inspect architecture and evidence <ArrowIcon /></summary>
          <div className="detail-grid">
            <section><h4>Architecture</h4><ol>{project.architecture.map(step => <li key={step}>{step}</li>)}</ol></section>
            <section><h4>Resume evidence</h4>{project.bullets.map(bullet => <p key={bullet}>{bullet}</p>)}</section>
            <section><h4>Validation</h4><p>{project.testing}</p></section>
            <section><h4>Boundary</h4><p>{project.limitations}</p></section>
            <section><h4>Implementation</h4><div className="tech-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div></section>
          </div>
        </details>
        <a className="repo-link" href={project.repository} target="_blank" rel="noreferrer">Repository evidence <ArrowIcon /></a>
      </div>
      <WorldInspector project={project} />
    </article>
  );
}

function TrustCore() {
  return (
    <section className="trust-core" id="trust-core">
      <div className="trust-orbit" aria-hidden="true"><i /><i /><i /></div>
      <p className="section-index">TRUST CORE</p>
      <h2>Trust is not a feature.<br /><em>It is a chain of enforceable decisions.</em></h2>
      <div className="trust-chain">{trustChain.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < trustChain.length - 1 && <i />}</div>)}</div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-title"><p>EXPERIENCE</p><h2>Engineering controls. Evaluating evidence. Translating risk.</h2></div>
      <div className="experience-rail">
        {resume.experience.map((item, index) => <article key={item.role + item.dates}>
          <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
          <div className="experience-heading"><h3>{item.role}{item.detail && <small> / {item.detail}</small>}</h3><p>{item.organization} · {item.location}</p></div>
          <time>{item.dates}</time>
          <div className="experience-copy">{item.bullets.map(bullet => <p key={bullet}>{bullet}</p>)}</div>
        </article>)}
      </div>
    </section>
  );
}

function ResearchSection() {
  const independent = resume.experience[0];
  return (
    <section className="research-section" id="research">
      <div className="section-title"><p>WORLD 05 · RESEARCH CHAMBER</p><h2>A progression from resource control to identity and agent security.</h2></div>
      <div className="research-grid">
        {independent.bullets.map((bullet, index) => (
          <article className="research-object" key={bullet}>
            <span>0{index + 1}</span>
            <div><small>{independent.dates}</small><h3>{index === 0 ? "Resource control" : index === 1 ? "Cloud identity" : "AI and agent security"}</h3><details><summary>Inspect the work</summary><p>{bullet}</p></details></div>
          </article>
        ))}
        <article className="research-object research-object--aerosec">
          <span>04</span><div><small>{resume.experience[1].dates}</small><h3>AEROSEC / Honeywell x ASU</h3><details><summary>Inspect the analysis</summary><p>{resume.experience[1].bullets[0]}</p></details></div>
        </article>
      </div>
    </section>
  );
}

function SkillsAndEducation() {
  return (
    <section className="skills-section" id="skills">
      <div className="section-title"><p>ENGINEERING STACK</p><h2>Controls need implementation depth.</h2></div>
      <div className="skills-grid">{resume.skillGroups.map(group => <article key={group.label}><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
      <div className="education-grid">
        {resume.education.map(edu => <article key={edu.school}><span>{edu.dates}</span><h3>{edu.school}</h3><p>{edu.location}</p><p>{edu.degree}</p><strong>{edu.score}</strong></article>)}
        <article><span>CREDENTIALS</span><h3>AWS Academy</h3><p>{resume.certifications.join(" · ")}</p></article>
      </div>
    </section>
  );
}

function AboutContact() {
  return (
    <section className="closing" id="about">
      <p className="section-index">CLOSING BOUNDARY</p>
      <h2>Systems become autonomous.<br /><em>Trust still has to be engineered.</em></h2>
      <p>The work here centers on runtime enforcement, cloud identity, model supply-chain inspection, and evidence that makes security decisions reviewable.</p>
      <div className="closing-actions" id="contact">
        <a href={resumeHref} target="_blank" rel="noreferrer">View resume</a>
        <a href={resumeHref} download>Download resume</a>
        <a href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={`mailto:${resume.email}`}>Contact</a>
      </div>
      <div className="contact-line"><span>{resume.email}</span><span>{resume.phone}</span><span>{resume.location}</span></div>
    </section>
  );
}

function RecruiterView({ setMode }: { setMode: (mode: ViewMode) => void }) {
  return (
    <main className="recruiter-view" id="main" tabIndex={-1}>
      <section className="quick-hero" id="home">
        <div>
          <p className="kicker">SECURITY ENGINEER · TEMPE, AZ</p>
          <h1>Pooja Kiran</h1>
          <h2>{resume.positioning}</h2>
          <p>Agent security, application security, cloud IAM, and model supply-chain security.</p>
          <div className="hero-actions">
            <a className="primary-action" href={resumeHref} target="_blank" rel="noreferrer">View resume <ArrowIcon /></a>
            <a className="secondary-link" href={resumeHref} download>Download resume</a>
            <a className="secondary-link" href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="secondary-link" href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <button className="explore-card" onClick={() => setMode("explore")}><span>EXPLORE MODE</span><strong>Enter the Trust Universe</strong><small>Inspect the security boundaries and their evidence →</small></button>
      </section>

      <section className="quick-projects" id="projects">
        <div className="section-title"><p>SELECTED ENGINEERING</p><h2>Three systems. Three trust boundaries.</h2></div>
        <div className="project-card-grid">{resume.projects.map(project => <article className="quick-project" key={project.id}>
          <p>{project.label}</p><h3>{project.name}</h3><span>{project.dates}</span><p className="quick-problem">{project.solution}</p><EvidenceStrip project={project} /><details className="technical-details"><summary>Engineering evidence</summary><div className="detail-grid"><section><h4>Implementation and results</h4>{project.bullets.map(bullet => <p key={bullet}>{bullet}</p>)}</section><section><h4>Scope</h4><p>{project.limitations}</p></section></div></details><div className="tech-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div><a href={project.repository} target="_blank" rel="noreferrer">Repository <ArrowIcon /></a>
        </article>)}</div>
      </section>
      <ExperienceSection />
      <ResearchSection />
      <SkillsAndEducation />
      <AboutContact />
    </main>
  );
}

function ExploreView({ setMode }: { setMode: (mode: ViewMode) => void }) {
  const [sceneEnabled, setSceneEnabled] = useState(false);
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setSceneEnabled(new URLSearchParams(location.search).get("view") !== "recruiter" && !matchMedia("(max-width: 760px)").matches && !connection?.saveData);
  }, []);
  return (
    <main id="main" className="explore-view" tabIndex={-1}>
      <div className="scene-stage">{sceneEnabled && <TrustScene />}</div>
      <HeroLab setMode={setMode} />
      <section className="world-intro" id="projects">
        <p className="section-index">EXPLORE THE TRUST UNIVERSE</p>
        <h2>Security is the system between <em>capability</em> and <em>consequence.</em></h2>
        <p>Follow an agent request, inspect an identity relationship, or examine a model artifact. Explore the controls and the evidence behind them.</p>
        <div className="universe-map" aria-label="Security environments">{resume.projects.map((project, i) => <a href={`#${project.id}`} key={project.id}><span>0{i + 1}</span><strong>{project.label}</strong></a>)}<a href="#telemetry"><span>04</span><strong>Security Telemetry Grid</strong></a><a href="#research"><span>05</span><strong>Research Chamber</strong></a></div>
      </section>
      <div className="project-worlds">{resume.projects.map((project, index) => <ProjectWorld project={project} index={index} key={project.id} />)}</div>
      <TelemetryWorld />
      <TrustCore />
      <ExperienceSection />
      <ResearchSection />
      <SkillsAndEducation />
      <AboutContact />
    </main>
  );
}

export default function Portfolio() {
  const [mode, updateMode] = useState<ViewMode>("explore");
  const shouldFocus = useRef(false);
  const setMode = useCallback((next: ViewMode) => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", next); url.hash = "home";
    window.history.pushState({}, "", url);
    shouldFocus.current = true;
    updateMode(next);
  }, []);
  useEffect(() => {
    const restore = () => updateMode(new URLSearchParams(window.location.search).get("view") === "recruiter" ? "recruiter" : "explore");
    restore(); window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.view = mode;
    if (shouldFocus.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main")?.focus({ preventScroll: true });
      shouldFocus.current = false;
    }
  }, [mode]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".project-world,.experience-rail article,.research-object,.quick-project"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(node => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.14 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [mode]);

  const current = mode === "recruiter" ? <RecruiterView setMode={setMode} /> : <ExploreView setMode={setMode} />;

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header mode={mode} setMode={setMode} />
      {current}
      <footer><span>POOJA KIRAN · SECURITY ENGINEER</span><span>Resume-backed portfolio evidence</span></footer>
    </div>
  );
}

