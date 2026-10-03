"use client";

import { resume, resumeHref, trustChain, type ProjectItem } from "@/data/resume";

const basePath = process.env.NODE_ENV === "production" ? "/Pooja_Kiran_Portfolio_Website" : "";
const asset = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="site-brand" href="#home" aria-label="Pooja Kiran home">
        <span className="brand-initials">PK</span>
        <span>
          <strong>{resume.name}</strong>
          <small>Security Engineer</small>
        </span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="header-resume" href={resumeHref} target="_blank" rel="noreferrer">
        Resume <ArrowIcon />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Security Engineer · Agent Security · Application Security · Cloud IAM</p>
        <h1>{resume.name}</h1>
        <h2>Security engineering for AI agents, cloud identities, and model supply chains.</h2>
        <p className="hero-summary">
          I build security controls that make authorization, runtime decisions, telemetry, and evidence inspectable before systems are trusted to act.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            View selected work <ArrowIcon />
          </a>
          <a className="button button-secondary" href={resumeHref} target="_blank" rel="noreferrer">
            View resume
          </a>
          <a className="text-link" href={resume.links.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="text-link" href={resume.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
        <div className="hero-meta" aria-label="Profile details">
          <span>{resume.location}</span>
          <span>M.S. Information Technology (Security), ASU</span>
          <span>GPA 3.87/4.00</span>
        </div>
      </div>

      <div className="portrait-card">
        <div className="portrait-frame">
          <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="900" />
        </div>
        <div className="portrait-caption">
          <div>
            <span>Current focus</span>
            <strong>AI security systems with verifiable engineering evidence</strong>
          </div>
          <p>Project metrics are drawn from resume and repository validation evidence, with scope limits stated alongside each case study.</p>
        </div>
      </div>
    </section>
  );
}

function EvidenceOverview() {
  return (
    <section className="evidence-overview" aria-label="Selected engineering evidence">
      <div className="evidence-heading">
        <p className="eyebrow">Selected evidence</p>
        <p>Repository-backed validation metrics from selected security engineering projects.</p>
      </div>
      <div className="evidence-grid">
        {resume.projects.map((project) => (
          <a className="evidence-card" href={`#${project.id}`} key={project.id}>
            <span>{project.label}</span>
            <strong>{project.metrics[0]}</strong>
            <small>{project.name}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

function ArchitectureFlow({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="architecture-flow" aria-label="Architecture flow">
      {steps.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

function ProjectCaseStudy({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <article className="project-case" id={project.id}>
      <header className="project-header">
        <div>
          <p className="eyebrow">Case study {String(index + 1).padStart(2, "0")} · {project.label}</p>
          <h3>{project.name}</h3>
        </div>
        <time>{project.dates}</time>
      </header>

      <div className="project-intro">
        <div>
          <span className="section-label">Security problem</span>
          <p>{project.problem}</p>
        </div>
        <div>
          <span className="section-label">Control design</span>
          <p>{project.solution}</p>
        </div>
      </div>

      <div className="project-architecture">
        <div className="subhead">
          <span className="section-label">Architecture</span>
          <small>From input to reviewable evidence</small>
        </div>
        <ArchitectureFlow steps={project.architecture} />
      </div>

      <div className="project-evidence">
        <div className="metric-panel">
          <span className="section-label">Validation</span>
          <div className="metric-grid">
            {project.metrics.map((metric) => (
              <div key={metric}>
                <strong>{metric}</strong>
              </div>
            ))}
          </div>
          <p>{project.testing}</p>
        </div>

        <div className="engineering-panel">
          <span className="section-label">Engineering evidence</span>
          <ul>
            {project.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="project-footer">
        <div>
          <span className="section-label">Scope boundary</span>
          <p>{project.limitations}</p>
        </div>
        <div className="stack-list" aria-label="Technology stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a className="repo-link" href={project.repository} target="_blank" rel="noreferrer">
          Inspect repository <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function WorkSection() {
  return (
    <section className="work-section" id="work">
      <div className="section-heading">
        <p className="eyebrow">Selected engineering</p>
        <h2>Security work presented with architecture, evidence, and scope.</h2>
        <p>
          Each project shows the security problem, implemented control boundary, validation evidence, and the limits of what the evidence proves.
        </p>
      </div>
      <div className="project-list">
        {resume.projects.map((project, index) => (
          <ProjectCaseStudy project={project} index={index} key={project.id} />
        ))}
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="method-section" aria-label="Security engineering method">
      <div className="section-heading compact">
        <p className="eyebrow">Security decision path</p>
        <h2>Controls are strongest when the decision path is explicit.</h2>
      </div>
      <div className="method-flow">
        {trustChain.map((item, index) => (
          <div key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-heading">
        <p className="eyebrow">Experience</p>
        <h2>Engineering, evaluation, and security analysis.</h2>
      </div>
      <div className="experience-list">
        {resume.experience.map((item) => (
          <article className="experience-item" key={item.role + item.dates}>
            <div className="experience-date">
              <time>{item.dates}</time>
              <span>{item.location}</span>
            </div>
            <div className="experience-main">
              <h3>
                {item.role}
                {item.detail && <small>{item.detail}</small>}
              </h3>
              <p className="experience-org">{item.organization}</p>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <div className="section-heading">
        <p className="eyebrow">Technical skills</p>
        <h2>Security depth across AI, identity, application, and delivery layers.</h2>
      </div>
      <div className="skills-grid">
        {resume.skillGroups.map((group) => (
          <article key={group.label}>
            <h3>{group.label}</h3>
            <div>
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="education-section" id="education">
      <div className="section-heading compact">
        <p className="eyebrow">Education & credentials</p>
        <h2>Academic foundation and cloud security training.</h2>
      </div>
      <div className="education-layout">
        <div className="education-list">
          {resume.education.map((item) => (
            <article key={item.school}>
              <time>{item.dates}</time>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
              <span>{item.location}</span>
              <strong>{item.score}</strong>
            </article>
          ))}
        </div>
        <aside className="credentials-card">
          <span className="section-label">Credentials</span>
          {resume.certifications.map((certification) => (
            <p key={certification}>{certification}</p>
          ))}
        </aside>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Interested in security engineering work around AI systems, identity, or application security?</h2>
      </div>
      <div className="contact-panel">
        <a className="button button-primary" href={`mailto:${resume.email}`}>
          Email me <ArrowIcon />
        </a>
        <a className="button button-secondary" href={resumeHref} target="_blank" rel="noreferrer">
          View resume
        </a>
        <a className="text-link" href={resume.links.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a className="text-link" href={resume.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <div className="contact-details">
          <span>{resume.email}</span>
          <span>{resume.phone}</span>
          <span>{resume.location}</span>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <EvidenceOverview />
        <WorkSection />
        <MethodSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Pooja Kiran</span>
        <span>Security engineering portfolio · resume-backed evidence</span>
      </footer>
    </div>
  );
}
