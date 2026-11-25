"use client";

import { useEffect } from "react";
import { resume, resumeDownloads, type ProjectItem } from "@/data/resume";

const basePath = process.env.NODE_ENV === "production" ? "/Pooja_Kiran_Portfolio_Website" : "";
const asset = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

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
            <strong>TECHNICAL PROGRAM MANAGEMENT</strong>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href="#explore">Resumes</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
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
        <h1 className="hero-dual-heading">Technical Program Manager<span>Security &amp; AI Systems</span></h1>
        <p className="hero-role-line">Software Delivery · Security Engineering · AI Systems</p>
        <p className="hero-reference-subtitle">
          {resume.positioning}
        </p>
        <div className="hero-reference-actions">
          <a className="hero-primary" href="#work">View Security Projects <ArrowIcon /></a>
          <a className="hero-secondary" href="#explore">View Resumes <ArrowIcon /></a>
          <a className="hero-secondary" href="#contact">Contact Me</a>
        </div>
        <div className="hero-proof-strip" aria-label="Professional experience highlights">
          <div><strong>3+ years</strong><span>Full-time software engineering and technical program delivery</span></div>
          <div><strong>1 year</strong><span>Technical Program Manager</span></div>
          <div><strong>3 teams</strong><span>Cross-functional program execution</span></div>
          <div><strong>12+</strong><span>Engineering, QA and design professionals</span></div>
        </div>
      </div>

      <figure className="hero-photo-reference" data-reveal>
        <div className="hero-photo-frame">
          <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="1100" />
        </div>

      </figure>

    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-heading">
      <div className="about-intro" data-reveal>
        <p className="eyebrow">About me</p>
        <h2 id="about-heading">{resume.about.title}</h2>
      </div>
      <div className="about-copy" data-reveal>
        {resume.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section className="role-chooser" id="explore" aria-labelledby="role-chooser-title">
      <div className="role-chooser-intro" data-reveal>
        <p className="eyebrow">For recruiters &amp; hiring teams</p>
        <h2 id="role-chooser-title">Role-specific resumes</h2>
      </div>

      <div className="role-chooser-grid">
        {resumeDownloads.map(({ title, filename, className }) => (
          <article key={filename} className={`role-option ${className}`} data-reveal>
            <h3>{title}</h3>
            <a className="role-option-action" href={asset(filename)} target="_blank" rel="noopener noreferrer"
               aria-label={`View the ${title} resume PDF in a new tab`}>
              View Resume PDF <ArrowIcon />
            </a>
          </article>
        ))}
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
          <p className="project-history">{project.history}</p>
        </div>

        <div className="project-dual-proof">
          <section className="proof-panel proof-career" data-reveal>
            <span className="panel-label">Engineering challenge, action and result</span>
            <h4>What I built and what the evidence establishes</h4>
            <p>{project.solution}</p>
            <ul>
              {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </section>

          <section className="proof-panel proof-builder" data-reveal>
            <span className="panel-label">Architecture & verification</span>
            <h4>How the local workflow produces evidence</h4>
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
          <p>{project.testing}</p>
          <p>{project.limitations}</p>
          <div className="scope-actions">
            <a href={project.repository} target="_blank" rel="noreferrer">Inspect repository <ArrowIcon /></a>

          </div>

        </div>
      </div>
    </article>
  );
}

function WorkSection() {
  return (
    <section className="work-section" id="work">
      <div className="section-intro light" data-reveal>
        <p className="eyebrow">Independent engineering projects</p>
        <h2>MCP Agent Security Gateway &amp; Aegis HealthSec</h2>
      </div>
      <div className="project-list">
        {resume.projects.map((project, index) => (
          <ProjectScene project={project} index={index} key={project.id} />
        ))}
      </div>
    </section>
  );
}

function ExperienceSection({ volunteer = false }: { volunteer?: boolean }) {
  return (
    <section className="experience-section" id={volunteer ? "volunteer-research" : "experience"}>
      <div className="section-intro" data-reveal>
        <h2>{volunteer ? "Volunteer Research Experience" : "Professional Experience"}</h2>
      </div>
      <div className="experience-list">
        {(volunteer ? resume.volunteerExperience : resume.experience).map((item, index) => (
          <article className="experience-row" key={item.role + item.dates} data-reveal>
            <div className="experience-time">
              <span className="experience-index">{String(index + 1).padStart(2, "0")}</span>
              <time>{item.dates}</time>
              <span>{item.location}</span>
            </div>
            <div className="experience-main">
              <h3>{item.role}</h3>
              <p className="experience-org">{item.organization}</p>
              {item.detail && <p className="experience-detail">{item.detail}</p>}
              <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet.split(/(\*\*[^*]+\*\*)/g).map((segment, partIndex) => segment.startsWith("**") && segment.endsWith("**") ? <strong key={partIndex}>{segment.slice(2, -2)}</strong> : segment)}</li>)}</ul>
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
        <h2>Technical &amp; Program Management Skills</h2>
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
        <h2>Information technology, computer science foundations, and cloud training.</h2>
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
      </div>
    </section>
  );
}

function CredentialsSection() {
  return (
    <section className="academic-section" id="credentials">
      <div className="section-intro" data-reveal><h2>Certifications &amp; research award</h2></div>
      <div className="academic-credentials" data-reveal>
        {resume.certifications.map((cert) => <p key={cert}>{cert}</p>)}
        <p>KSCST 46th Series Sponsored Research Grant (2023).</p>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-copy recruiter-contact" data-reveal>
        <p className="eyebrow">Recruiting &amp; collaboration</p>
        <h2>Hiring a Technical Program Manager?</h2>
        <p>
          Technical program management, software and security delivery, and AI systems. Open to relocation and hybrid opportunities.
        </p>
      </div>
      <div className="contact-actions" data-reveal>
        <a className="button button-dark" href={`mailto:${resume.email}`}>Contact Pooja <ArrowIcon /></a>
        <a className="button button-light" href="#explore">View Resumes</a>
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
        <AboutSection />
        <ResumeSection />
        <WorkSection />
        <ExperienceSection />
        <ExperienceSection volunteer />
        <SkillsSection />
        <EducationSection />
        <CredentialsSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Pooja Kiran</span>
        <span>Technical Program Management × Security × AI Systems</span>
      </footer>
    </div>
  );
}
