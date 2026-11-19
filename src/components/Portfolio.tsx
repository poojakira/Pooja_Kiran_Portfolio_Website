"use client";

import { useEffect } from "react";
import { resume, resumeHref, managerResumeHref, trustChain, type ProjectItem } from "@/data/resume";

const basePath = process.env.NODE_ENV === "production" ? "/Pooja_Kiran_Portfolio_Website" : "";
const asset = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

const projectPosters: Record<ProjectItem["id"], string> = {
  mcp: asset("mcp-poster.png"),
  iam: asset("iam-poster.png"),
  supply: asset("provenance-poster.png"),
  automotive: "",
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
            <strong>SOFTWARE &amp; PROJECTS</strong>
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
        <h1 className="hero-dual-heading">Software Developer<span>Python, AI &amp; Security Projects</span></h1>
        <p className="hero-role-line">Python &amp; AI Projects · Security Tooling · Technical Collaboration</p>
        <p className="hero-reference-subtitle">
          {resume.positioning}
        </p>
        <div className="hero-reference-actions">
          <a className="hero-primary" href="#work">View Security Projects <ArrowIcon /></a>
          <a className="hero-secondary" href="#explore">Choose a Resume <ArrowIcon /></a>
          <a className="hero-secondary" href="#contact">Contact Me</a>
        </div>
        <div className="hero-proof-strip" aria-label="Four security trust boundaries with repository-backed proof">
          <div><strong>Agent → Tool</strong><span>834 passing tests · actual tool-side evidence</span></div>
          <div><strong>Identity → Authority</strong><span>272 passing tests · static IAM change review</span></div>
          <div><strong>Artifact → Runtime</strong><span>317 passing tests · bounded artifact comparison</span></div>
          <div><strong>Telemetry → Investigation</strong><span>332 passing tests · persisted synthetic investigations</span></div>
          <small>November 2026 reviewed-candidate test evidence. All four release decisions remain PARTIAL.</small>
        </div>
      </div>

      <figure className="hero-photo-reference" data-reveal>
        <div className="hero-photo-frame">
          <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="1100" />
        </div>
        <figcaption className="hero-signature-quote">
          <span>“AI becomes a different security problem when it can act.”</span>
          <strong>— Pooja Kiran</strong>
        </figcaption>
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

function ExploreExperience() {
  return (
    <section className="role-chooser" id="explore" aria-labelledby="role-chooser-title">
      <div className="role-chooser-intro" data-reveal>
        <div>
          <p className="eyebrow">For recruiters &amp; hiring teams</p>
          <h2 id="role-chooser-title">Explore My Experience</h2>
        </div>
        <p>
          Two software developer resumes with different emphasis: technical projects or experience and collaboration.
          My projects and full experience are available to everyone below.
        </p>
      </div>

      <div className="role-chooser-grid">
        <article className="role-option role-option-engineering" data-reveal>
          <div className="role-option-top">
            <span className="role-option-index" aria-hidden="true">01</span>
            <span className="role-option-category">Build &amp; Validate</span>
          </div>
          <h3>Software Developer: Technical Projects</h3>
          <p>
            For roles focused on Python development, AI tooling, application interfaces,
            software testing, and projects involving security.
          </p>
          <ul aria-label="Software development highlights">
            <li>MCP execution workbench with 834 passing tests</li>
            <li>IAM change review with 24 static checks</li>
            <li>Model-artifact comparison and persisted investigation workflows</li>
          </ul>
          <a className="role-option-action" href={resumeHref} target="_blank" rel="noopener noreferrer"
             aria-label="View Software Developer technical resume PDF in a new tab">
            View Technical Resume <ArrowIcon />
          </a>
        </article>

        <article className="role-option role-option-leadership" data-reveal>
          <div className="role-option-top">
            <span className="role-option-index" aria-hidden="true">02</span>
            <span className="role-option-category">Experience &amp; Collaboration</span>
          </div>
          <h3>Software Developer: Experience &amp; Collaboration</h3>
          <p>
            A software developer profile emphasizing technical collaboration, IT assessment,
            academic research, and the AEROSEC externship alongside independent projects.
          </p>
          <ul aria-label="Software developer experience highlights">
            <li>Telemetry integration and test-event validation with Cerberus</li>
            <li>IT grading at ASU and adaptive-learning software research</li>
            <li>Peer collaboration and requirements work during the AEROSEC externship</li>
          </ul>
          <a className="role-option-action" href={managerResumeHref} target="_blank" rel="noopener noreferrer"
             aria-label="View Software Developer experience resume PDF in a new tab">
            View Experience Resume <ArrowIcon />
          </a>
        </article>
      </div>
      <p className="role-chooser-note">Both resumes reflect the same experience, tailored to different hiring priorities.</p>
    </section>
  );
}

function LeadershipHighlights() {
  return (
    <section className="leadership-highlights" aria-labelledby="leadership-highlights-heading">
      <div className="leadership-highlights-intro" data-reveal>
        <p className="eyebrow">AEROSEC externship</p>
        <h2 id="leadership-highlights-heading">Coordinating work and explaining decisions.</h2>
      </div>
      <div className="leadership-highlights-grid">
        <article data-reveal>
          <span className="leadership-highlight-number">03</span>
          <h3>Remote peer leads</h3>
          <p>Coordinated three remote peer leads during an AEROSEC leadership rotation, reviewing deliverables and reporting progress to mentors.</p>
        </article>
        <article data-reveal>
          <span className="leadership-highlight-number">03</span>
          <h3>Evaluator pitches</h3>
          <p>Presented proposed AEROSEC work in three evaluator pitches, communicating security requirements and planning assumptions.</p>
        </article>
        <article data-reveal>
          <span className="leadership-highlight-number">04</span>
          <h3>Platforms compared</h3>
          <p>Compared four security platforms and contributed to a proposed 12-month implementation plan.</p>
        </article>
      </div>
      <a className="leadership-highlights-link" href="#experience">Read the full experience <ArrowIcon /></a>
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

        <div className="poster-object" data-reveal>
          <div className="poster-frame">
            {projectPosters[project.id] ? <img src={projectPosters[project.id]} alt={`${project.name} historical October 2026 evidence poster`} /> : <div className="automotive-evidence-poster" role="img" aria-label="Diagram of the local synthetic investigation workflow"><strong>TELEMETRY → EVIDENCE</strong><span>IMPORT · INSPECT · CHALLENGE · RERUN</span><small>Reviewed local candidate · synthetic FHIR subset · PostgreSQL evidence · hosted CI unverified</small></div>}
          </div>
          <span className="poster-caption">{project.id === "automotive" ? "Local investigation illustration · synthetic inputs" : "Historical October 2026 poster · current results below"}</span>
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
            {project.caseStudy && <a href={project.caseStudy} target="_blank" rel="noreferrer">Read technical evidence <ArrowIcon /></a>}
            <a href={project.review} target="_blank" rel="noreferrer">Reviewed candidate</a>
            <a href={project.architectureUrl} target="_blank" rel="noreferrer">Detailed architecture</a>
            <a href={project.notebook} target="_blank" rel="noreferrer">Try the guided notebook</a>
          </div>
          <p>Notebook cells ran locally from fresh public checkouts; hosted Colab execution remains unverified. Choose the free CPU runtime. The portfolio itself presents illustrations and evidence links.</p>
        </div>
      </div>
    </article>
  );
}

function WorkSection() {
  return (
    <section className="work-section" id="work">
      <div className="section-intro light" data-reveal>
        <p className="eyebrow">Four security trust boundaries</p>
        <h2>Agent → Tool. Identity → Authority. Artifact → Runtime. Telemetry → Investigation.</h2>
      </div>
      <div className="project-list">
        {resume.projects.map((project, index) => (
          <ProjectScene project={project} index={index} key={project.id} />
        ))}
      </div>
    </section>
  );
}

function InvestigationCaseStudy() {
  const project = resume.projects.find(project => project.id === "automotive")!;
  const phases = [
    ["01 · Import", "Supply bounded synthetic FHIR AuditEvent JSON to the authenticated local API; unsupported or missing semantics stay explicit."],
    ["02 · Detect", "The canonical clinical detector evaluates the imported events using the case's allowed threshold."],
    ["03 · Correlate", "Findings group by organization, identity or resource fallback, and a fixed time bucket; grouping is not proof of malicious intent."],
    ["04 · Persist", "PostgreSQL retains the case, dataset and immutable run reports for later inspection."],
    ["05 · Challenge", "Review source and normalized evidence, change the threshold and rerun the same retained dataset."],
    ["06 · Compare", "Inspect the findings delta, reload the saved case and export a checksummed report with explicit uncertainty."]
  ] as const;
  return (
    <section className="investigation-case-study" id="investigation-case-study" aria-labelledby="investigation-heading">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Engineering case study · reviewed local candidate</p>
        <h2 id="investigation-heading">Investigate, challenge the rule, and reinvestigate.</h2>
        <p>To make a rule's conclusion reviewable, I connected synthetic event import, canonical detection and correlation, persisted run evidence, and a same-dataset threshold comparison. This illustration explains the actual local workflow.</p>
      </div>
      <div className="investigation-flow" aria-label="Six stages in the security investigation pipeline" data-reveal>
        {phases.map(([name, detail]) => <article key={name}><h3>{name}</h3><p>{detail}</p></article>)}
      </div>
      <div className="investigation-verification" data-reveal>
        <p><strong>Measured result:</strong> {project.testing}</p>
        <p><strong>Data and release boundary:</strong> {project.limitations}</p>
        <nav aria-label="Investigation platform engineering evidence">
          <a href={project.review} target="_blank" rel="noreferrer">Review PR #58</a>
          <a href={project.caseStudy} target="_blank" rel="noreferrer">Exact-source verification report</a>
          <a href={project.architectureUrl} target="_blank" rel="noreferrer">Detailed architecture</a>
        </nav>
      </div>
    </section>
  );
}

function SecurityReviewCaseStudy() {
  const project = resume.projects.find(project => project.id === "mcp")!;
  const controls = [
    ["Local operator boundary", "Loopback binding and exact Host/Origin checks constrain the browser workbench to its documented local operator."],
    ["Authorization", "PolicyEngine and StdioMCPProxy evaluate permitted tools before invoking the fixed first-party fixture."],
    ["Constrained target", "Each run uses a disposable workspace; an operator cannot select a server executable, host path or outbound destination."],
    ["Failure visibility", "Timeout, crash and denied-operation checks preserve explicit non-invocation, failure and UNKNOWN outcomes."],
    ["Execution evidence", "Receipts and tool-side state distinguish a local decision from an action observed at the first-party target."],
    ["Remaining controls", "Arbitrary-server OS containment, complete MCP conformance, credential lifecycle and external-effect reconciliation remain incomplete."]
  ] as const;
  return (
    <section className="security-review-section" id="security-review">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Application security case study</p>
        <h2>Reviewing a bounded agent-to-tool execution path.</h2>
        <p>To make authorization claims inspectable, I connected the actual policy and proxy code to a fixed test server and checked receipts, state changes, negative paths and exported uncertainty.</p>
      </div>
      <div className="security-review-grid" data-reveal>
        {controls.map(([title, detail]) => <article key={title}><h3>{title}</h3><p>{detail}</p></article>)}
      </div>
      <div className="security-review-outcome" data-reveal>
        <div><span className="panel-label">Assessment boundary</span><p>{project.testing} These are bounded repository checks; current-source independent adversarial closure and production deployment approval are not established.</p></div>
        <a className="button button-dark" href={project.caseStudy} target="_blank" rel="noreferrer">Read the source-scoped review</a>
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
        <h2>Experience</h2>
      </div>
      <div className="experience-list">
        {resume.experience.map((item, index) => (
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
        <h2>Security depth across runtime, identity, application security, and detection.</h2>
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
      </div>
    </section>
  );
}

function AcademicParticipationSection() {
  const item = resume.academicParticipation;

  return (
    <section className="academic-section" id="academic-participation">
      <div className="section-intro" data-reveal>
        <p className="eyebrow">Academic &amp; AI participation</p>
        <h2>Generative AI learning, clearly separated from professional experience.</h2>
      </div>
      <div className="academic-layout">
        <article className="academic-card" data-reveal>
          <span className="panel-label">{item.role} · {item.dates}</span>
          <h3>{item.title}</h3>
          <p className="academic-org">{item.organization}</p>
          <p>{item.description}</p>
          <p className="academic-scope"><strong>Participation scope:</strong> {item.scope}</p>
          <div className="academic-tags" aria-label="Academic participation focus areas">
            {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </article>
        <aside className="academic-credentials" data-reveal>
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
      <div className="contact-copy recruiter-contact" data-reveal>
        <p className="eyebrow">Recruiting &amp; collaboration</p>
        <h2>Hiring a Software Developer?</h2>
        <p>
          I&apos;m interested in U.S.-based software development and Python or AI tooling roles
          that bring careful implementation, testing, and clear communication together.
        </p>
      </div>
      <div className="contact-actions" data-reveal>
        <a className="button button-dark" href={`mailto:${resume.email}`}>Contact Pooja <ArrowIcon /></a>
        <a className="button button-light" href={resumeHref} target="_blank" rel="noreferrer">Software Developer: Technical Resume</a>
        <a className="button button-light" href={managerResumeHref} target="_blank" rel="noreferrer">Software Developer: Experience Resume</a>
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
        <ExploreExperience />
        <LeadershipHighlights />
        <WorkSection />
        <InvestigationCaseStudy />
        <SecurityReviewCaseStudy />
        <DecisionPath />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <AcademicParticipationSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Pooja Kiran</span>
        <span>Software Development × AI Projects × Technical Collaboration</span>
      </footer>
    </div>
  );
}
