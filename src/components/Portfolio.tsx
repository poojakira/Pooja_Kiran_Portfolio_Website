"use client";

import { useEffect } from "react";
import { resume, resumeHref, trustChain, type ProjectItem } from "@/data/resume";

const basePath = process.env.NODE_ENV === "production" ? "/Pooja_Kiran_Portfolio_Website" : "";
const asset = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

type Artifact = {
  room: string;
  roomNo: string;
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
    room: "Runtime Control Room",
    roomNo: "01",
    poster: asset("mcp-poster.png"),
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
    room: "Identity Archive",
    roomNo: "02",
    poster: asset("iam-poster.png"),
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
    room: "Model Inspection Lab",
    roomNo: "03",
    poster: asset("provenance-poster.png"),
    posterLink: "https://github.com/poojakira/hf-model-provenance-scanner/blob/main/poster/poster_36x48.pdf",
    file: "scanner/rules/definitions.py",
    commit: "4501739a",
    ci: "CI 36782472264",
    ciLink: "https://github.com/poojakira/hf-model-provenance-scanner/actions/runs/36782472264",
    proof: ["241 passed, 1 skipped", "75.81% coverage", "75% coverage gate", "Non-executing inspection"],
    excerpt: `"HFS-001": Rule(
    "powershell-subprocess",
    Severity.CRITICAL,
)

"HFS-003": Rule(
    "base64-decoded-payload-executes",
    Severity.CRITICAL,
)`,
  },
};

const journey = [
  ["home", "Lobby"],
  ["mcp", "Runtime"],
  ["iam", "Identity"],
  ["supply", "Provenance"],
  ["experience", "Career"],
  ["contact", "Contact"],
] as const;

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

function useWorldMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const worlds = Array.from(document.querySelectorAll<HTMLElement>("[data-world]"));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const navItems = Array.from(document.querySelectorAll<HTMLAnchorElement>(".world-nav a"));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    reveals.forEach((el) => revealObserver.observe(el));

    if (reduced.matches) {
      root.style.setProperty("--page-progress", "1");
      reveals.forEach((el) => el.classList.add("is-visible"));
      return () => revealObserver.disconnect();
    }

    root.classList.add("motion-ready");
    let raf = 0;

    const render = () => {
      const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
      root.style.setProperty("--page-progress", (scrollY / max).toFixed(4));

      let active = "home";
      let best = Number.POSITIVE_INFINITY;

      worlds.forEach((world) => {
        const rect = world.getBoundingClientRect();
        const travel = Math.max(rect.height - innerHeight, 1);
        const p = Math.min(Math.max(-rect.top / travel, 0), 1);
        const centerDistance = Math.abs(rect.top + rect.height / 2 - innerHeight / 2);

        world.style.setProperty("--p", p.toFixed(4));
        world.style.setProperty("--camera-y", `${(-18 + p * 36).toFixed(2)}px`);
        world.style.setProperty("--camera-scale", (0.97 + p * 0.055).toFixed(4));
        world.style.setProperty("--back-x", `${((p - 0.5) * -32).toFixed(2)}px`);
        world.style.setProperty("--mid-x", `${((p - 0.5) * 52).toFixed(2)}px`);
        world.style.setProperty("--front-x", `${((p - 0.5) * -76).toFixed(2)}px`);
        world.style.setProperty("--door-open", Math.max((p - 0.72) / 0.28, 0).toFixed(4));

        if (centerDistance < best) {
          best = centerDistance;
          active = world.id;
        }
      });

      navItems.forEach((item) => item.dataset.active = item.getAttribute("href") === `#${active}` ? "true" : "false");
      raf = 0;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(render); };
    const onPointer = (event: PointerEvent) => {
      root.style.setProperty("--mx", `${(event.clientX / innerWidth).toFixed(4)}`);
      root.style.setProperty("--my", `${(event.clientY / innerHeight).toFixed(4)}`);
    };

    render();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      revealObserver.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      removeEventListener("pointermove", onPointer);
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
        <a href="#home" className="brand"><span>PK</span><strong>{resume.name}</strong></a>
        <div className="header-center">Security Engineer · AI · Application · Identity</div>
        <a href={resumeHref} target="_blank" rel="noreferrer" className="header-resume">Resume <ArrowIcon /></a>
      </header>
      <nav className="world-nav" aria-label="Portfolio worlds">
        {journey.map(([id, label], index) => (
          <a href={`#${id}`} key={id} data-active={index === 0 ? "true" : "false"}>
            <i>{String(index + 1).padStart(2, "0")}</i><span>{label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}

function RoomArchitecture({ tone }: { tone: string }) {
  return (
    <div className={`room-architecture ${tone}`} aria-hidden="true">
      <div className="room-ceiling"><i /><i /><i /></div>
      <div className="room-back-wall" />
      <div className="room-side room-side-left" />
      <div className="room-side room-side-right" />
      <div className="room-floor" />
      <div className="room-light-pool" />
    </div>
  );
}

function Doorway({ label }: { label: string }) {
  return (
    <div className="exit-door" aria-hidden="true">
      <div className="door-frame"><span>{label}</span><i /></div>
      <div className="door-light" />
    </div>
  );
}

function LobbyWorld() {
  return (
    <section className="world-shell world-lobby" id="home" data-world>
      <div className="world-viewport">
        <RoomArchitecture tone="tone-lobby" />

        <div className="lobby-plaque depth-mid" data-reveal>
          <span>POOJA KIRAN</span>
          <h1>Security engineering for software that can act.</h1>
          <p>I build controls around agent execution, cloud identity, application boundaries, and model supply chains, with evidence that can be inspected and reproduced.</p>
          <div>
            <a href="#mcp">Enter the work <ArrowIcon /></a>
            <a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>

        <figure className="portrait-installation depth-front" data-reveal>
          <div className="portrait-light" />
          <img src={asset("pooja-portrait.webp")} alt="Pooja Kiran" width="900" height="900" />
          <figcaption>
            <span>Independent AI Security Researcher & Engineer</span>
            <strong>Aug. 2024 · Present</strong>
          </figcaption>
        </figure>

        <aside className="lobby-index depth-back" data-reveal>
          <span>FIELD NOTES</span>
          <dl>
            <div><dt>Location</dt><dd>{resume.location}</dd></div>
            <div><dt>Graduate study</dt><dd>M.S. IT (Security), ASU</dd></div>
            <div><dt>GPA</dt><dd>3.87 / 4.00</dd></div>
            <div><dt>Practice</dt><dd>AI Security · AppSec · IAM</dd></div>
          </dl>
        </aside>

        <div className="world-caption"><span>WORLD 00</span><strong>Human / Practice</strong></div>
        <Doorway label="Runtime Control Room" />
      </div>
    </section>
  );
}

function ArtifactPoster({ artifact, project }: { artifact: Artifact; project: ProjectItem }) {
  return (
    <a className="wall-poster depth-back" href={artifact.posterLink} target="_blank" rel="noreferrer" data-reveal>
      <div className="poster-lamp" />
      <img src={artifact.poster} alt={`${project.name} research poster`} />
      <span>Research poster · open ↗</span>
    </a>
  );
}

function EvidenceGlass({ artifact, project }: { artifact: Artifact; project: ProjectItem }) {
  return (
    <aside className="evidence-glass depth-front" data-reveal>
      <header><span>VERIFIED_METRICS.md</span><i>{artifact.commit}</i></header>
      <h4>Evidence</h4>
      <div className="evidence-list">
        {artifact.proof.map((item) => <div key={item}><i />{item}</div>)}
      </div>
      <p>{project.limitations}</p>
      <a href={artifact.ciLink} target="_blank" rel="noreferrer">{artifact.ci} ↗</a>
    </aside>
  );
}

function CodeDesk({ artifact }: { artifact: Artifact }) {
  return (
    <div className="code-desk depth-mid" data-reveal>
      <div className="monitor">
        <div className="monitor-bar"><span>{artifact.file}</span><i>source</i></div>
        <pre><code>{artifact.excerpt}</code></pre>
      </div>
      <div className="desk-surface" />
    </div>
  );
}

function FlowRail({ project }: { project: ProjectItem }) {
  return (
    <div className="flow-rail depth-front" data-reveal>
      {project.architecture.map((step, index) => (
        <div key={step}>
          <i>{String(index + 1).padStart(2, "0")}</i>
          <strong>{step}</strong>
          {index < project.architecture.length - 1 && <span />}
        </div>
      ))}
    </div>
  );
}

function ProjectWorld({ project, nextLabel }: { project: ProjectItem; nextLabel: string }) {
  const artifact = artifacts[project.id];
  const tone = project.id === "mcp" ? "tone-runtime" : project.id === "iam" ? "tone-identity" : "tone-lab";

  return (
    <section className={`world-shell project-world world-${project.id}`} id={project.id} data-world>
      <div className="world-viewport">
        <RoomArchitecture tone={tone} />

        <div className="world-title depth-back" data-reveal>
          <span>WORLD {artifact.roomNo}</span>
          <h2>{artifact.room}</h2>
          <p>{project.label}</p>
        </div>

        <div className="world-thesis depth-mid" data-reveal>
          <span>SECURITY PROBLEM</span>
          <h3>{project.name}</h3>
          <p>{project.problem}</p>
          <strong>{project.solution}</strong>
          <div className="world-links">
            <a href={project.repository} target="_blank" rel="noreferrer">Repository <ArrowIcon /></a>
            <time>{project.dates}</time>
          </div>
        </div>

        <ArtifactPoster artifact={artifact} project={project} />
        <CodeDesk artifact={artifact} />
        <EvidenceGlass artifact={artifact} project={project} />
        <FlowRail project={project} />

        <div className="implementation-drawer depth-mid" data-reveal>
          <span>IMPLEMENTED</span>
          <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </div>

        <div className="world-caption"><span>SECURITY WORLD</span><strong>{artifact.room}</strong></div>
        <Doorway label={nextLabel} />
      </div>
    </section>
  );
}

function CareerWorld() {
  return (
    <section className="world-shell world-career" id="experience" data-world>
      <div className="world-viewport">
        <RoomArchitecture tone="tone-career" />

        <div className="career-title depth-back" data-reveal>
          <span>WORLD 04</span>
          <h2>Career Archive</h2>
          <p>Research, applied security analysis, teaching, and technical evaluation.</p>
        </div>

        <div className="career-wall depth-mid">
          {resume.experience.map((item, index) => (
            <article key={item.role + item.dates} data-reveal>
              <div className="career-no">{String(index + 1).padStart(2, "0")}</div>
              <time>{item.dates}</time>
              <h3>{item.role}{item.detail && <small>{item.detail}</small>}</h3>
              <p>{item.organization} · {item.location}</p>
              <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </article>
          ))}
        </div>

        <div className="skill-shelf depth-front" data-reveal>
          <span>CAPABILITY SHELF</span>
          <div>
            {resume.skillGroups.map((group) => (
              <section key={group.label}>
                <h3>{group.label}</h3>
                <p>{group.items.join(" · ")}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="education-plaque depth-front" data-reveal>
          {resume.education.map((item) => (
            <div key={item.school}>
              <time>{item.dates}</time><strong>{item.school}</strong><span>{item.degree} · {item.score}</span>
            </div>
          ))}
          <div className="cert-line">{resume.certifications.join("  ·  ")}</div>
        </div>

        <div className="world-caption"><span>WORLD 04</span><strong>Career / Foundation</strong></div>
        <Doorway label="Contact" />
      </div>
    </section>
  );
}

function ContactWorld() {
  return (
    <section className="world-shell world-contact" id="contact" data-world>
      <div className="world-viewport">
        <RoomArchitecture tone="tone-contact" />

        <div className="contact-window depth-back" aria-hidden="true">
          <i /><i /><i />
        </div>

        <div className="contact-table depth-mid" data-reveal>
          <span>WORLD 05 · CONTACT</span>
          <h2>Build systems that can act.<br />Secure what they can do.</h2>
          <p>AI security · Application security · Cloud IAM · Security engineering</p>
          <div>
            <a className="contact-primary" href={`mailto:${resume.email}`}>Start a conversation <ArrowIcon /></a>
            <a href={resumeHref} target="_blank" rel="noreferrer">Resume ↗</a>
            <a href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        <div className="contact-address depth-front" data-reveal>
          <span>{resume.email}</span>
          <span>{resume.phone}</span>
          <span>{resume.location}</span>
        </div>

        <div className="world-caption"><span>WORLD 05</span><strong>Open / Contact</strong></div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  useWorldMotion();

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <LobbyWorld />
        <section id="work" aria-label="Selected security engineering worlds">
          <ProjectWorld project={resume.projects[0]} nextLabel="Identity Archive" />
          <ProjectWorld project={resume.projects[1]} nextLabel="Model Inspection Lab" />
          <ProjectWorld project={resume.projects[2]} nextLabel="Career Archive" />
        </section>
        <CareerWorld />
        <ContactWorld />
      </main>
      <footer>
        <span>© {new Date().getFullYear()} Pooja Kiran</span>
        <span>Security engineering portfolio · repository-backed evidence</span>
      </footer>
    </div>
  );
}
