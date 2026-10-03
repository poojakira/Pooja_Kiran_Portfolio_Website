"use client";

import { useEffect } from "react";
import { resume, resumeHref, trustChain, type ProjectItem } from "@/data/resume";

const basePath = process.env.NODE_ENV === "production" ? "/Pooja_Kiran_Portfolio_Website" : "";
const asset = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

const projectPosters: Record<ProjectItem["id"], string> = {
  mcp: asset("mcp-poster.png"),
  iam: asset("iam-poster.png"),
  supply: asset("provenance-poster.png"),
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function useImmersiveScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));

    if (!reduced) root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealNodes.forEach((node) => observer.observe(node));

    let raf = 0;
    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--page-progress", String(Math.min(Math.max(window.scrollY / max, 0), 1)));
      root.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.08, 70)}px`);

      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const travel = Math.max(rect.height - window.innerHeight, 1);
        const p = Math.min(Math.max(-rect.top / travel, 0), 1);
        scene.style.setProperty("--scene-progress", String(p));
        scene.style.setProperty("--scene-x", `${(0.5 - p) * 32}px`);
        scene.style.setProperty("--scene-y", `${(p - 0.5) * 30}px`);
      });
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      root.classList.remove("motion-ready");
    };
  }, []);
}

function Header() {
  return (
    <>
      <div className="page-progress" aria-hidden="true"><span /></div>
      <header className="site-header hero-header">
        <a className="brand" href="#home" aria-label="Pooja Kiran home">
          <span className="brand-mark">PK</span>
          <span>
            <strong>AI SECURITY</strong>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#home">About</a>
          <a href="#experience">Work</a>
          <a href="#work">Research</a>
          <a href="#experience">Teaching</a>
          <a href="#work">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="resume-pill hero-talk" href={`mailto:${resume.email}`}>
          Let&apos;s Talk
        </a>
      </header>
    </>
  );
}

function Hero() {
  const capabilities = [
    "AI Security",
    "Cloud Security",
    "Model Supply Chain",
    "Open Source",
    "Teaching",
  ];

  return (
    <section className="hero hero-reference" id="home">
      <div className="office-world" aria-hidden="true">
        <div className="office-window office-window-a" />
        <div className="office-window office-window-b" />
        <div className="office-city">
          <i /><i /><i /><i /><i /><i />
        </div>
        <div className="office-glow" />
        <div className="office-plant office-plant-left" />
        <div className="office-plant office-plant-right" />
        <div className="office-desk" />
      </div>

      <div className="hero-copy-reference" data-reveal>
        <p className="hero-overline">PORTFOLIO</p>
        <h1>AI Security<br />Engineer</h1>
        <p className="hero-reference-subtitle">
          Engineering security controls for AI agents, cloud identities, and model supply chains.
        </p>
        <div className="hero-reference-actions">
          <a className="hero-primary" href="#work">View My Work <ArrowIcon /></a>
          <a className="hero-secondary" href={resumeHref} target="_blank" rel="noreferrer">
            Download CV
          </a>
        </div>
      </div>

      <figure className="hero-photo-reference" data-reveal>
        <div className="hero-photo-frame">
          <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="1100" />
        </div>
        <figcaption className="hero-signature-quote">
          <span>“I want to build systems people can trust, and prove why they should.”</span>
          <strong>— Pooja Kiran</strong>
        </figcaption>
      </figure>

      <div className="hero-capability-strip" data-reveal>
        {capabilities.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}

function DualPaths() {
  return (
    <section className="dual-paths" id="paths">
      <div className="section-intro path-intro" data-reveal>
        <p className="eyebrow">Engineering depth. Builder mindset.</p>
        <h2>I approach security from two angles: build the control well, then understand how it becomes useful.</h2>
      </div>

      <div className="path-grid">
        <article className="path-card career-card" data-reveal>
          <div className="path-topline">
            <span className="path-number">01</span>
            <span className="path-label">SECURITY ENGINEERING</span>
          </div>
          <h3>Technical work that can be inspected, tested, and reviewed.</h3>
          <p>
            I build security controls at the boundaries where AI agents, identities, APIs, and model artifacts become
            security decisions, then back that work with tests, CI evidence, telemetry, and reproducible validation.
          </p>
          <div className="path-evidence" aria-label="Security engineering focus areas">
            <span>Agent & AI Security</span>
            <span>Application Security</span>
            <span>Cloud IAM</span>
            <span>Security Automation</span>
          </div>
          <a href={resumeHref} target="_blank" rel="noreferrer">View engineering resume <ArrowIcon /></a>
        </article>

        <article className="path-card builder-card" id="builder" data-reveal>
          <div className="path-topline">
            <span className="path-number">02</span>
            <span className="path-label">BUILDER & PRODUCT THINKING</span>
          </div>
          <h3>Taking a security problem from idea to something people can evaluate and use.</h3>
          <p>
            Alongside implementation, I work on problem framing, validation, adoption thinking, and how security evidence
            is communicated. In AEROSEC, that included business and compliance analysis plus a five-year financial model
            presented to ASU and Honeywell stakeholders.
          </p>
          <div className="path-evidence" aria-label="Builder focus areas">
            <span>Problem Framing</span>
            <span>Validation</span>
            <span>Adoption Thinking</span>
            <span>Business & Compliance</span>
          </div>
          <a href="#work">Explore the projects <ArrowIcon /></a>
        </article>
      </div>
    </section>
  );
}

function ProjectScene({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <article className="project-scene" id={project.id} data-scene>
      <div className="project-stage">
        <div className="project-title-block" data-reveal>
          <p className="eyebrow">Selected build {String(index + 1).padStart(2, "0")}</p>
          <h3>{project.name}</h3>
          <p>{project.problem}</p>
          <div className="project-stack">
            {project.stack.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="poster-object" data-reveal>
          <div className="poster-frame">
            <img src={projectPosters[project.id]} alt={`${project.name} research poster`} />
          </div>
          <span className="poster-caption">Repository-backed project artifact</span>
        </div>

        <div className="project-dual-proof">
          <section className="proof-panel proof-career" data-reveal>
            <span className="panel-label">Career proof</span>
            <h4>What an engineering team can evaluate</h4>
            <ul>
              {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </section>

          <section className="proof-panel proof-builder" data-reveal>
            <span className="panel-label">Builder proof</span>
            <h4>How the work moves from problem to usable system</h4>
            <div className="builder-sequence">
              {project.architecture.map((step, stepIndex) => (
                <div key={step}>
                  <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="metrics-strip" data-reveal>
          {project.metrics.map((metric) => <strong key={metric}>{metric}</strong>)}
        </div>

        <div className="scope-line" data-reveal>
          <span>Evidence boundary</span>
          <p>{project.limitations}</p>
          <a href={project.repository} target="_blank" rel="noreferrer">Inspect repository <ArrowIcon /></a>
        </div>
      </div>
    </article>
  );
}

function WorkSection() {
  return (
    <section className="work-section" id="work">
      <div className="section-intro light" data-reveal>
        <p className="eyebrow">Projects as physical evidence</p>
        <h2>Each project has two readings: engineering depth and builder potential.</h2>
      </div>
      <div className="project-list">
        {resume.projects.map((project, index) => (
          <ProjectScene project={project} index={index} key={project.id} />
        ))}
      </div>
    </section>
  );
}

function DecisionPath() {
  return (
    <section className="decision-section">
      <div className="decision-copy" data-reveal>
        <p className="eyebrow">How I think</p>
        <h2>Security is a chain of decisions, not a decorative layer.</h2>
        <p>
          Whether I am thinking as an engineer or as a builder, I keep the same spine: identity, authority, execution,
          telemetry, and evidence.
        </p>
      </div>
      <div className="decision-track" data-reveal>
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
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Professional & applied experience</p>
        <h2>Engineering depth on one side. Business context on the other.</h2>
      </div>
      <div className="experience-list">
        {resume.experience.map((item, index) => (
          <article className="experience-row" key={item.role + item.dates} data-reveal>
            <div className="experience-index">0{index + 1}</div>
            <div className="experience-time">
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
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Capabilities</p>
        <h2>Technical depth for the job. Systems thinking for the build.</h2>
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
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Education & credentials</p>
        <h2>Formal security education, computer science foundations, and cloud training.</h2>
      </div>
      <div className="education-grid">
        {resume.education.map((item) => (
          <article key={item.school} data-reveal>
            <time>{item.dates}</time>
            <h3>{item.school}</h3>
            <p>{item.degree}</p>
            <span>{item.location}</span>
            <strong>{item.score}</strong>
          </article>
        ))}
        <aside data-reveal>
          <span className="panel-label">Credentials</span>
          {resume.certifications.map((cert) => <p key={cert}>{cert}</p>)}
        </aside>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy contact-quote" data-reveal>
        <p className="eyebrow">A principle I build by</p>
        <blockquote>“Ambition matters. Evidence decides what lasts.”</blockquote>
        <cite>— Pooja Kiran</cite>
      </div>
      <div className="contact-actions" data-reveal>
        <a className="button button-dark" href={`mailto:${resume.email}`}>Email me <ArrowIcon /></a>
        <a className="button button-light" href={resumeHref} target="_blank" rel="noreferrer">Resume</a>
        <a href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <div>
          <span>{resume.email}</span>
          <span>{resume.phone}</span>
          <span>{resume.location}</span>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  useImmersiveScroll();

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <DualPaths />
        <WorkSection />
        <DecisionPath />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Pooja Kiran</span>
        <span>Security Engineering × Builder Portfolio</span>
      </footer>
    </div>
  );
}
