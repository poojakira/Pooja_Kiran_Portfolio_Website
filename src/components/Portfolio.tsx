"use client";

import { useEffect } from "react";
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

function useScrollExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      root.style.setProperty("--page-progress", "1");
      return;
    }

    root.classList.add("motion-ready");
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));

    let ticking = false;
    const updateScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      root.style.setProperty("--page-progress", progress.toFixed(4));

      const portraitShift = Math.min(window.scrollY * 0.055, 34);
      root.style.setProperty("--portrait-shift", `${portraitShift}px`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("motion-ready");
    };
  }, []);
}

function Header() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><i /></div>
      <header className="site-header">
        <a className="site-brand" href="#home" aria-label="Pooja Kiran home">
          <span className="brand-initials">PK</span>
          <span>
            <strong>{resume.name}</strong>
            <small>Security Engineer</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-resume" href={resumeHref} target="_blank" rel="noreferrer">
          Resume <ArrowIcon />
        </a>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">Security Engineer · Tempe, Arizona</p>
        <h1>{resume.name}</h1>
        <h2>Engineering security boundaries for systems that can act.</h2>
        <p className="hero-summary">
          Agent security, application security, cloud IAM, model supply-chain security, and evidence-driven controls built to be inspected, tested, and reviewed.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            Explore selected work <ArrowIcon />
          </a>
          <a className="button button-secondary" href={resumeHref} target="_blank" rel="noreferrer">
            View resume
          </a>
          <a className="text-link" href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="text-link" href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
        <div className="hero-facts" aria-label="Profile facts">
          <div><span>Focus</span><strong>AI & Security Engineering</strong></div>
          <div><span>Education</span><strong>M.S. IT (Security), ASU</strong></div>
          <div><span>GPA</span><strong>3.87 / 4.00</strong></div>
        </div>
      </div>

      <figure className="portrait-stage" data-reveal>
        <div className="portrait-media">
          <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="900" />
        </div>
        <figcaption>
          <div>
            <span>Current focus</span>
            <strong>Security controls for agent execution, identity, and AI supply chains.</strong>
          </div>
          <small>Real project metrics are paired with validation scope throughout the portfolio.</small>
        </figcaption>
      </figure>
    </section>
  );
}

function ProofBand() {
  return (
    <section className="proof-band" aria-label="Selected project evidence">
      <div className="proof-intro" data-reveal>
        <p className="eyebrow">Selected engineering evidence</p>
        <h2>Measured work, not decorative dashboards.</h2>
      </div>
      <div className="proof-grid">
        {resume.projects.map((project, index) => (
          <a href={`#${project.id}`} className="proof-item" key={project.id} data-reveal>
            <span>0{index + 1}</span>
            <strong>{project.metrics[0]}</strong>
            <p>{project.name}</p>
            <small>{project.label}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

function ArchitectureFlow({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="architecture-flow">
      {steps.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

function ProjectStory({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <article className="project-story" id={project.id}>
      <aside className="project-sticky" data-reveal>
        <div className="project-number">0{index + 1}</div>
        <p className="eyebrow">{project.label}</p>
        <h3>{project.name}</h3>
        <p className="project-lede">{project.solution}</p>
        <time>{project.dates}</time>
        <div className="stack-list" aria-label="Technology stack">
          {project.stack.map((item) => <span key={item}>{item}</span>)}
        </div>
        <a className="repo-link" href={project.repository} target="_blank" rel="noreferrer">
          Inspect repository <ArrowIcon />
        </a>
      </aside>

      <div className="project-chapters">
        <section className="story-card story-problem" data-reveal>
          <div className="story-index">01</div>
          <div>
            <span className="section-label">Security problem</span>
            <h4>What had to be controlled</h4>
            <p>{project.problem}</p>
          </div>
        </section>

        <section className="story-card story-architecture" data-reveal>
          <div className="story-index">02</div>
          <div>
            <span className="section-label">Architecture</span>
            <h4>How the decision path is structured</h4>
            <ArchitectureFlow steps={project.architecture} />
          </div>
        </section>

        <section className="story-card story-validation" data-reveal>
          <div className="story-index">03</div>
          <div>
            <span className="section-label">Validation</span>
            <h4>Evidence that can be checked</h4>
            <div className="metric-grid">
              {project.metrics.map((metric) => <strong key={metric}>{metric}</strong>)}
            </div>
            <p className="validation-note">{project.testing}</p>
          </div>
        </section>

        <section className="story-card story-engineering" data-reveal>
          <div className="story-index">04</div>
          <div>
            <span className="section-label">Engineering evidence</span>
            <h4>What was actually implemented</h4>
            <ul>
              {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        </section>

        <section className="story-card story-scope" data-reveal>
          <div className="story-index">05</div>
          <div>
            <span className="section-label">Scope boundary</span>
            <h4>What the evidence does and does not prove</h4>
            <p>{project.limitations}</p>
          </div>
        </section>
      </div>
    </article>
  );
}

function WorkSection() {
  return (
    <section className="work-section" id="work">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Selected work</p>
        <h2>Real engineering stories, designed for a human reader.</h2>
        <p>Scroll through the problem, architecture, validation, implementation evidence, and limits for each system.</p>
      </div>
      <div className="project-list">
        {resume.projects.map((project, index) => (
          <ProjectStory key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function MethodSection() {
  return (
    <section className="method-section">
      <div className="method-copy" data-reveal>
        <p className="eyebrow">Security decision path</p>
        <h2>Trust becomes reviewable when every decision has a boundary and an artifact.</h2>
      </div>
      <div className="method-flow" data-reveal>
        {trustChain.map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
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
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Experience</p>
        <h2>Security work developed across research, teaching, and applied analysis.</h2>
      </div>
      <div className="experience-list">
        {resume.experience.map((item, index) => (
          <article className="experience-item" key={item.role + item.dates} data-reveal>
            <div className="experience-marker"><span>0{index + 1}</span><i /></div>
            <div className="experience-date">
              <time>{item.dates}</time>
              <span>{item.location}</span>
            </div>
            <div className="experience-main">
              <h3>{item.role}{item.detail && <small>{item.detail}</small>}</h3>
              <p className="experience-org">{item.organization}</p>
              <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
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
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Technical capability</p>
        <h2>Tools matter when they support a security decision.</h2>
        <p>The stack is grouped by the kind of security work it enables, not by buzzword count.</p>
      </div>
      <div className="skills-grid">
        {resume.skillGroups.map((group, index) => (
          <article key={group.label} data-reveal>
            <span className="skill-index">0{index + 1}</span>
            <h3>{group.label}</h3>
            <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="education-section" id="education">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Education & credentials</p>
        <h2>Academic foundation with practical cloud-security training.</h2>
      </div>
      <div className="education-layout">
        <div className="education-list">
          {resume.education.map((item) => (
            <article key={item.school} data-reveal>
              <time>{item.dates}</time>
              <h3>{item.school}</h3>
              <p>{item.degree}</p>
              <span>{item.location}</span>
              <strong>{item.score}</strong>
            </article>
          ))}
        </div>
        <aside className="credentials-card" data-reveal>
          <span className="section-label">Credentials</span>
          {resume.certifications.map((certification) => <p key={certification}>{certification}</p>)}
        </aside>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div data-reveal>
        <p className="eyebrow">Contact</p>
        <h2>Open to security engineering conversations around AI systems, application security, and identity.</h2>
      </div>
      <div className="contact-panel" data-reveal>
        <a className="button button-primary" href={`mailto:${resume.email}`}>Email me <ArrowIcon /></a>
        <a className="button button-secondary" href={resumeHref} target="_blank" rel="noreferrer">View resume</a>
        <a className="text-link" href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a className="text-link" href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
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
  useScrollExperience();

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <ProofBand />
        <WorkSection />
        <MethodSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Pooja Kiran</span>
        <span>Security engineering portfolio · evidence first</span>
      </footer>
    </div>
  );
}
