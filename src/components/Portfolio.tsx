"use client";

import { useEffect, useMemo, useState } from "react";
import { resume, resumeHref, secondaryWork, trustChain, type ProjectItem } from "@/data/resume";

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
  return (
    <header className="nav-shell">
      <a className="brand-lockup" href="#home" aria-label="Pooja Kiran home">
        <span className="brand-mark"><ShieldMark /></span>
        <span><strong>Pooja Kiran</strong><small>Security Engineer</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#research">Research</a>
        <a href="#about">About</a>
      </nav>
      <div className="nav-actions">
        <button className={mode === "recruiter" ? "view-toggle is-active" : "view-toggle"} onClick={() => setMode(mode === "recruiter" ? "explore" : "recruiter")}>
          <span className="view-dot" />
          {mode === "recruiter" ? "Explore View" : "Recruiter View"}
        </button>
        <a className="icon-link" href={resumeHref} target="_blank" rel="noreferrer" aria-label="Open resume">CV</a>
      </div>
    </header>
  );
}

function MonitorPanel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return <div className={`monitor-panel ${className}`}><div className="monitor-top"><span>{title}</span><i /><i /><i /></div>{children}</div>;
}

function HeroLab({ setMode }: { setMode: (mode: ViewMode) => void }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <section className="hero-lab" id="home" onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setPointer({ x: ((event.clientX - rect.left) / rect.width - .5) * 2, y: ((event.clientY - rect.top) / rect.height - .5) * 2 });
    }}>
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-copy">
        <p className="kicker">AI × SECURITY × TRUSTED SYSTEMS</p>
        <h1>Pooja Kiran</h1>
        <h2>I engineer <em>trust boundaries</em><br />for systems that can act.</h2>
        <p className="hero-summary">Security controls across agent runtime execution, cloud identity, model supply chains, training-data integrity, and detection engineering.</p>
        <div className="hero-actions">
          <a className="primary-action" href="#projects">Explore my work <ArrowIcon /></a>
          <button className="secondary-action" onClick={() => setMode("recruiter")}>Recruiter View</button>
        </div>
        <div className="hero-proof">
          <span><b>19</b> repositories</span>
          <span><b>4</b> flagship security systems</span>
          <span><b>3.87</b> ASU GPA</span>
        </div>
      </div>

      <div className="lab-stage" aria-label="Security research environment">
        <div className="portrait-wrap" style={{ transform: `translate3d(${pointer.x * -6}px,${pointer.y * -4}px,0)` }}>
          <div className="portrait-halo" />
          <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="900" />
          <div className="portrait-caption"><span>POOJA KIRAN</span><small>Security Engineer</small></div>
        </div>

        <div className="monitor-stack" style={{ transform: `translate3d(${pointer.x * 9}px,${pointer.y * 5}px,0)` }}>
          <MonitorPanel title="MCP / JSON-RPC AGENT FLOW" className="monitor-mcp">
            <div className="agent-flow">
              <span>Agent</span><i /><strong>Gateway</strong><i /><span>Tool</span>
            </div>
            <div className="check-stack"><b>✓ normalize</b><b>✓ capability</b><b>✓ policy</b><b className="blocked">× blocked request</b></div>
          </MonitorPanel>
          <MonitorPanel title="IAM AUTHORIZATION GRAPH" className="monitor-iam">
            <div className="iam-graph">
              <span className="iam-node n1">Agent role</span><span className="iam-node n2">PassRole</span><span className="iam-node n3">Target role</span><span className="iam-node n4">Resource</span>
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
        <div className="desk-light" aria-hidden="true" />
      </div>
      <div className="hero-scroll"><span>SCROLL TO INSPECT</span><i /></div>
    </section>
  );
}

function ProjectVisual({ project }: { project: ProjectItem }) {
  if (project.id === "mcp") return (
    <div className="project-visual gateway-visual" aria-hidden="true">
      <div className="visual-label">INLINE POLICY BOUNDARY</div>
      <div className="packet p1">tools/call</div><div className="packet p2">prompt signal</div>
      <div className="gateway-core"><ShieldMark /><span>MCP</span><small>POLICY ENGINE</small></div>
      <div className="boundary-ring r1" /><div className="boundary-ring r2" /><div className="boundary-ring r3" />
      <div className="decision allow">ALLOW</div><div className="decision block">BLOCK</div>
    </div>
  );
  if (project.id === "iam") return (
    <div className="project-visual identity-visual" aria-hidden="true">
      <div className="visual-label">AUTHORIZATION GRAPH</div>
      <svg viewBox="0 0 620 400"><path d="M100 200 260 90 490 145M100 200l170 115 220-170M260 90l10 225" /><path className="danger-edge" d="M100 200 260 90 490 145" /></svg>
      <span className="graph-node g1">Principal</span><span className="graph-node g2">PassRole</span><span className="graph-node g3">Target role</span><span className="graph-node g4">Resource</span>
      <div className="finding-chip">PRIVILEGE PATH</div>
    </div>
  );
  if (project.id === "supply") return (
    <div className="project-visual supply-visual" aria-hidden="true">
      <div className="visual-label">NON-EXECUTING INSPECTION</div>
      <div className="artifact-cube"><span>MODEL</span><i /></div>
      <div className="scan-plane" />
      <div className="artifact-list"><span>serialization</span><span>loader</span><span>provenance</span><span>dependencies</span></div>
      <div className="verified-stamp">INSPECT BEFORE TRUST</div>
    </div>
  );
  return (
    <div className="project-visual dataset-visual" aria-hidden="true">
      <div className="visual-label">TRAINING-DATA BOUNDARY</div>
      <div className="sample-field">{Array.from({ length: 30 }).map((_, i) => <i key={i} className={[7,18,24].includes(i) ? "risk-sample" : ""} />)}</div>
      <div className="dataset-pipe"><span>INGEST</span><b>SCREEN</b><strong>QUARANTINE</strong></div>
      <div className="baseline-line">trusted baseline</div>
    </div>
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
          <summary>Inspect architecture & evidence <ArrowIcon /></summary>
          <div className="detail-grid">
            <section><h4>Architecture</h4><ol>{project.architecture.map(step => <li key={step}>{step}</li>)}</ol></section>
            <section><h4>Validation</h4><p>{project.testing}</p></section>
            <section><h4>Boundary</h4><p>{project.limitations}</p></section>
            <section><h4>Implementation</h4><div className="tech-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div></section>
          </div>
        </details>
        <a className="repo-link" href={project.repository} target="_blank" rel="noreferrer">Repository evidence <ArrowIcon /></a>
      </div>
      <ProjectVisual project={project} />
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
      <div className="section-title"><p>EXPERIENCE</p><h2>Engineering controls.<br />Evaluating evidence.<br />Translating risk.</h2></div>
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
  return (
    <section className="research-section" id="research">
      <div className="section-title"><p>RESEARCH CHAMBER</p><h2>Systems work beyond the four flagship controls.</h2></div>
      <div className="research-grid">
        {secondaryWork.map((work, index) => <a href={work.repository} target="_blank" rel="noreferrer" className="research-object" key={work.title}>
          <span>0{index + 1}</span><div><small>{work.date}</small><h3>{work.title}</h3><p>{work.description}</p></div><ArrowIcon />
        </a>)}
        <article className="research-object research-object--aerosec">
          <span>04</span><div><small>Aug. 2025 - Dec. 2025</small><h3>AEROSEC / Honeywell x ASU</h3><p>Business and compliance analysis for an airline PSS protection layer, including a $120K first-year commercialization scenario and five-year financial model.</p></div>
        </article>
      </div>
    </section>
  );
}

function RecruiterView({ setMode }: { setMode: (mode: ViewMode) => void }) {
  return (
    <main className="recruiter-view" id="main">
      <section className="quick-hero" id="home">
        <div>
          <p className="kicker">SECURITY ENGINEER · TEMPE, AZ</p>
          <h1>Pooja Kiran</h1>
          <h2>{resume.positioning}</h2>
          <p>AI & agent security, cloud IAM, model supply-chain security, training-data integrity, and security observability. I build controls, test failure modes, and keep claims tied to evidence.</p>
          <div className="hero-actions"><a className="primary-action" href={resumeHref} target="_blank" rel="noreferrer">View résumé <ArrowIcon /></a><a className="secondary-link" href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a className="secondary-link" href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
        </div>
        <button className="explore-card" onClick={() => setMode("explore")}><span>EXPLORE MODE</span><strong>Enter the Trust Universe</strong><small>Interactive security architecture →</small></button>
      </section>

      <section className="quick-projects" id="projects">
        <div className="section-title"><p>SELECTED ENGINEERING</p><h2>Four boundaries. Four working security systems.</h2></div>
        <div className="project-card-grid">{resume.projects.map(project => <article className="quick-project" key={project.id}>
          <p>{project.label}</p><h3>{project.name}</h3><span>{project.dates}</span><p className="quick-problem">{project.solution}</p><EvidenceStrip project={project} /><div className="tech-list">{project.stack.slice(0,5).map(item => <span key={item}>{item}</span>)}</div><a href={project.repository} target="_blank" rel="noreferrer">Repository <ArrowIcon /></a>
        </article>)}</div>
      </section>
      <ExperienceSection />
      <SkillsAndEducation />
      <ResearchSection />
      <AboutContact />
    </main>
  );
}

function SkillsAndEducation() {
  return (
    <section className="skills-section" id="skills">
      <div className="section-title"><p>ENGINEERING STACK</p><h2>Controls need implementation depth.</h2></div>
      <div className="skills-grid">{resume.skillGroups.map(group => <article key={group.label}><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
      <div className="education-grid">
        {resume.education.map(edu => <article key={edu.school}><span>{edu.dates}</span><h3>{edu.school}</h3><p>{edu.degree}</p><strong>{edu.score}</strong></article>)}
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
      <p>I am interested in security systems where identity, authorization, runtime behavior, and evidence meet. The work I want to build makes powerful systems safer by making their decisions enforceable and inspectable.</p>
      <div className="closing-actions">
        <a href={resumeHref} target="_blank" rel="noreferrer">Résumé</a>
        <a href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href={`mailto:${resume.email}`}>Contact</a>
      </div>
      <div className="contact-line"><span>{resume.email}</span><span>{resume.phone}</span><span>{resume.location}</span></div>
    </section>
  );
}

function ExploreView({ setMode }: { setMode: (mode: ViewMode) => void }) {
  return (
    <main id="main" className="explore-view">
      <HeroLab setMode={setMode} />
      <section className="world-intro" id="projects">
        <p className="section-index">EXPLORE THE TRUST UNIVERSE</p>
        <h2>Security is the system between <em>capability</em> and <em>consequence.</em></h2>
        <p>Each environment below represents a control I built and the evidence that bounds what I can claim about it.</p>
        <div className="universe-map" aria-label="Four security worlds">{resume.projects.map((project, i) => <a href={`#${project.id}`} key={project.id}><span>0{i + 1}</span><strong>{project.label}</strong></a>)}</div>
      </section>
      <div className="project-worlds">{resume.projects.map((project, index) => <ProjectWorld project={project} index={index} key={project.id} />)}</div>
      <TrustCore />
      <ExperienceSection />
      <ResearchSection />
      <SkillsAndEducation />
      <AboutContact />
    </main>
  );
}

export default function Portfolio() {
  const [mode, setMode] = useState<ViewMode>("explore");

  useEffect(() => {
    document.documentElement.dataset.view = mode;
  }, [mode]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".project-world, .research-object, .experience-rail article, .quick-project");
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("is-visible", entry.isIntersecting));
    }, { threshold: .12 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [mode]);

  const navMode = useMemo(() => mode, [mode]);

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header mode={navMode} setMode={setMode} />
      {mode === "recruiter" ? <RecruiterView setMode={setMode} /> : <ExploreView setMode={setMode} />}
      <footer><span>© 2026 Pooja Kiran</span><span>Security engineering · evidence-backed</span></footer>
    </div>
  );
}
