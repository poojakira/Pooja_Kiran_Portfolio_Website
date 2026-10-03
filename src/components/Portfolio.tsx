"use client";

import { useEffect } from "react";
import { resume, resumeHref, trustChain, type ProjectItem } from "@/data/resume";

const basePath = process.env.NODE_ENV === "production" ? "/Pooja_Kiran_Portfolio_Website" : "";
const asset = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

type Artifact = {
  poster: string;
  posterLink: string;
  file: string;
  commit: string;
  ci: string;
  ciLink: string;
  proof: string[];
  excerpt: string;
};

const artifacts: Record<ProjectItem["id"], Artifact> = {
  mcp: {
    poster: "https://raw.githubusercontent.com/poojakira/mcp-agent-security-gateway/main/poster/poster.png",
    posterLink: "https://github.com/poojakira/mcp-agent-security-gateway/blob/main/poster/poster_36x48.pdf",
    file: "src/mcp_monitor/detectors/prompt_injection.py",
    commit: "8427f9ec",
    ci: "CI 36783059917",
    ciLink: "https://github.com/poojakira/mcp-agent-security-gateway/actions/runs/36783059917",
    proof: ["718 passed", "82.46% coverage", "55 prompt-injection entries", "9 Elastic rules", "21 core SIEM tests"],
    excerpt: `Hybrid detector using:
1. Input normalization
2. FAST regex first-pass (< 1ms)
3. ML second-pass for ambiguous cases

Security-critical deployments fail closed by default.`,
  },
  iam: {
    poster: "https://raw.githubusercontent.com/poojakira/aws-agent-identity-guard/main/poster/poster.png",
    posterLink: "https://github.com/poojakira/aws-agent-identity-guard/blob/main/poster/poster_36x48.pdf",
    file: "src/aws_agent_identity_guard/scanner.py",
    commit: "c39ba67f",
    ci: "CI 36781556871",
    ciLink: "https://github.com/poojakira/aws-agent-identity-guard/actions/runs/36781556871",
    proof: ["238 collected", "235 passed", "3 skipped", "25 deterministic rules", "1.1460 ms/policy p95"],
    excerpt: `PRIVILEGE_ACTIONS = {
    "iam:CreateRole",
    "iam:PutRolePolicy",
    "iam:PassRole",
    "sts:AssumeRole",
    "iam:CreateAccessKey",
}`,
  },
  supply: {
    poster: "https://raw.githubusercontent.com/poojakira/hf-model-provenance-scanner/main/poster/poster.png",
    posterLink: "https://github.com/poojakira/hf-model-provenance-scanner/blob/main/poster/poster_36x48.pdf",
    file: "scanner/rules/definitions.py",
    commit: "4501739a",
    ci: "CI 36782472264",
    ciLink: "https://github.com/poojakira/hf-model-provenance-scanner/actions/runs/36782472264",
    proof: ["241 passed, 1 skipped", "75.81% coverage", "75% coverage gate", "Non-executing inspection"],
    excerpt: `"HFS-001": Rule(
    "powershell-subprocess",
    Severity.CRITICAL,
    "subprocess or shell execution...",
)

"HFS-003": Rule(
    "base64-decoded-payload-executes",
    Severity.CRITICAL,
)`,
  },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function useImmersiveMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const exhibits = Array.from(document.querySelectorAll<HTMLElement>("[data-exhibit]"));
    const hero = document.querySelector<HTMLElement>(".hero-stage");

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );

    reveals.forEach((node) => observer.observe(node));

    if (reduced.matches) {
      root.style.setProperty("--page-progress", "1");
      reveals.forEach((node) => node.classList.add("is-visible"));
      return () => observer.disconnect();
    }

    root.classList.add("motion-ready");
    let raf = 0;

    const render = () => {
      const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      root.style.setProperty("--page-progress", String(scrollY / max));

      if (hero) {
        const rect = hero.getBoundingClientRect();
        const p = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
        hero.style.setProperty("--hero-progress", p.toFixed(4));
      }

      exhibits.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = (center - innerHeight / 2) / Math.max(innerHeight, 1);
        const p = Math.min(Math.max(distance, -1.2), 1.2);
        section.style.setProperty("--exhibit-shift", p.toFixed(4));
      });

      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onPointer = (event: PointerEvent) => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      hero.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    render();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    hero?.addEventListener("pointermove", onPointer);

    return () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      hero?.removeEventListener("pointermove", onPointer);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("motion-ready");
    };
  }, []);
}

function Header() {
  return (
    <>
      <div className="page-progress" aria-hidden="true"><i /></div>
      <header className="site-header">
        <a className="brand" href="#home"><span>PK</span><strong>Pooja Kiran</strong></a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Capabilities</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-cta" href={resumeHref} target="_blank" rel="noreferrer">Resume <ArrowIcon /></a>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero-stage" id="home">
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-kicker" data-reveal>
        <span>Security Engineer</span>
        <span>Tempe, Arizona</span>
        <span>AI · Application · Identity</span>
      </div>

      <div className="hero-title" aria-label="Pooja Kiran">
        <span className="hero-line hero-line-one" data-reveal>POOJA</span>
        <span className="hero-line hero-line-two" data-reveal>KIRAN</span>
      </div>

      <figure className="hero-portrait" data-reveal>
        <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="900" />
        <figcaption>
          <span>Independent AI Security Researcher & Engineer</span>
          <strong>Aug. 2024 · Present</strong>
        </figcaption>
      </figure>

      <div className="hero-statement" data-reveal>
        <p>I engineer the boundary between intelligent software and the systems it is allowed to touch.</p>
        <div className="hero-actions">
          <a href="#work" className="pill pill-light">Enter selected work <ArrowIcon /></a>
          <a href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true"><i /><span>Scroll to enter</span></div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto">
      <div className="manifesto-index">01 / PRACTICE</div>
      <div className="manifesto-copy" data-reveal>
        <span>Security engineering becomes different when software can act.</span>
        <h2>Identity becomes a control plane. Tool calls become an execution boundary. Telemetry becomes evidence.</h2>
      </div>
      <div className="manifesto-aside" data-reveal>
        <p>My work focuses on making those boundaries explicit, testable, and reviewable before systems are trusted with real capabilities.</p>
        <div>
          <span>M.S. IT (Security), ASU</span>
          <strong>GPA 3.87 / 4.00</strong>
        </div>
      </div>
    </section>
  );
}

function ArchitectureRail({ steps }: { steps: readonly string[] }) {
  return (
    <div className="architecture-rail">
      {steps.map((step, index) => (
        <div key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}

function EvidenceSheet({ project, artifact }: { project: ProjectItem; artifact: Artifact }) {
  return (
    <div className="evidence-sheet">
      <div className="sheet-top">
        <span>VERIFIED_METRICS.md</span>
        <span>{artifact.commit}</span>
      </div>
      <div className="sheet-title">Repository evidence</div>
      <div className="sheet-metrics">
        {artifact.proof.map((item) => <div key={item}><i />{item}</div>)}
      </div>
      <p>{project.limitations}</p>
      <a href={artifact.ciLink} target="_blank" rel="noreferrer">{artifact.ci} ↗</a>
    </div>
  );
}

function SourceSheet({ artifact }: { artifact: Artifact }) {
  return (
    <div className="source-sheet">
      <div className="source-head">
        <span>{artifact.file}</span>
        <i>source excerpt</i>
      </div>
      <pre><code>{artifact.excerpt}</code></pre>
    </div>
  );
}

function ProjectExhibit({ project, index }: { project: ProjectItem; index: number }) {
  const artifact = artifacts[project.id];
  return (
    <article className={`project-exhibit exhibit-${project.id}`} id={project.id} data-exhibit>
      <div className="exhibit-intro">
        <div className="exhibit-number">0{index + 1}</div>
        <div data-reveal>
          <p>{project.label}</p>
          <h3>{project.name}</h3>
        </div>
        <div className="exhibit-meta" data-reveal>
          <time>{project.dates}</time>
          <span>{project.stack.join(" · ")}</span>
        </div>
      </div>

      <div className="exhibit-room">
        <div className="room-title" aria-hidden="true">{project.id === "mcp" ? "RUNTIME" : project.id === "iam" ? "IDENTITY" : "PROVENANCE"}</div>

        <a className="poster-object" href={artifact.posterLink} target="_blank" rel="noreferrer" data-reveal>
          <img src={artifact.poster} alt={`${project.name} research poster`} />
          <span>Open research poster ↗</span>
        </a>

        <div className="project-thesis" data-reveal>
          <span>Security problem</span>
          <p>{project.problem}</p>
          <span>Control</span>
          <strong>{project.solution}</strong>
          <a href={project.repository} target="_blank" rel="noreferrer">Inspect repository <ArrowIcon /></a>
        </div>

        <div className="artifact-stack" data-reveal>
          <EvidenceSheet project={project} artifact={artifact} />
          <SourceSheet artifact={artifact} />
        </div>
      </div>

      <div className="architecture-stage" data-reveal>
        <div className="architecture-heading">
          <span>CONTROL PATH</span>
          <p>From input to reviewable evidence</p>
        </div>
        <ArchitectureRail steps={project.architecture} />
      </div>

      <div className="implementation-strip" data-reveal>
        <span>Implemented</span>
        <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="work" id="work">
      <div className="work-heading" data-reveal>
        <span>02 / SELECTED WORK</span>
        <h2>Three systems. Three security boundaries. Every claim paired with evidence.</h2>
      </div>
      {resume.projects.map((project, index) => <ProjectExhibit key={project.id} project={project} index={index} />)}
    </section>
  );
}

function DecisionPath() {
  return (
    <section className="decision-section">
      <div className="decision-copy" data-reveal>
        <span>03 / SECURITY METHOD</span>
        <h2>The path from identity to evidence should be visible.</h2>
      </div>
      <div className="decision-path" data-reveal>
        {trustChain.map((item, index) => (
          <div key={item}>
            <i>{String(index + 1).padStart(2, "0")}</i>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="experience-heading" data-reveal>
        <span>04 / EXPERIENCE</span>
        <h2>Built across research, applied security analysis, and technical evaluation.</h2>
      </div>
      <div className="experience-wall">
        {resume.experience.map((item, index) => (
          <article key={item.role + item.dates} data-reveal>
            <div className="exp-no">0{index + 1}</div>
            <time>{item.dates}</time>
            <div>
              <h3>{item.role}{item.detail && <small>{item.detail}</small>}</h3>
              <p>{item.organization} · {item.location}</p>
              <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="capabilities" id="skills">
      <div className="capability-heading" data-reveal>
        <span>05 / CAPABILITIES</span>
        <h2>Security disciplines, not a keyword cloud.</h2>
      </div>
      <div className="capability-list">
        {resume.skillGroups.map((group, index) => (
          <article key={group.label} data-reveal>
            <div className="capability-no">0{index + 1}</div>
            <h3>{group.label}</h3>
            <p>{group.items.join(" · ")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="education">
      <div className="education-heading" data-reveal>
        <span>06 / FOUNDATION</span>
        <h2>Education and credentials.</h2>
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
        <article className="cert-card" data-reveal>
          <span>Credentials</span>
          {resume.certifications.map((cert) => <p key={cert}>{cert}</p>)}
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
      <div className="contact-copy" data-reveal>
        <span>07 / CONTACT</span>
        <h2>Build systems that can act.<br />Secure what they can do.</h2>
        <p>AI security · Application security · Cloud IAM · Security engineering</p>
      </div>
      <div className="contact-actions" data-reveal>
        <a className="contact-primary" href={`mailto:${resume.email}`}>Start a conversation <ArrowIcon /></a>
        <a href={resumeHref} target="_blank" rel="noreferrer">Resume ↗</a>
        <a href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
      </div>
      <div className="contact-meta" data-reveal>
        <span>{resume.email}</span>
        <span>{resume.phone}</span>
        <span>{resume.location}</span>
      </div>
    </section>
  );
}

export default function Portfolio() {
  useImmersiveMotion();

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <Work />
        <DecisionPath />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer>
        <span>© {new Date().getFullYear()} Pooja Kiran</span>
        <span>Security engineering portfolio · repository-backed evidence</span>
      </footer>
    </div>
  );
}
