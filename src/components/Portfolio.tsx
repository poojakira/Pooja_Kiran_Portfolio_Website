import { resume, resumeHref, supplementalProjects, type ProjectItem } from "@/data/resume";

type EvidenceProject = Pick<ProjectItem, "name" | "stack" | "repository" | "bullets" | "metrics">;

type World = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  project?: EvidenceProject;
  visual: "gateway" | "identity" | "supply" | "llm" | "dataset" | "adversarial" | "siem" | "aerospace" | "evidence";
};

const worlds: World[] = [
  {
    id: "agent-security",
    number: "01",
    eyebrow: "Agent Runtime Security",
    title: "Tool calls cross a trust boundary.",
    description: "Inspect, authorize, log, and constrain agent actions before downstream tools execute.",
    project: resume.projects[0],
    visual: "gateway",
  },
  {
    id: "identity",
    number: "02",
    eyebrow: "Cloud Identity",
    title: "Permissions become attack paths.",
    description: "Turn IAM policy relationships into deterministic findings that reviewers and CI can act on.",
    project: resume.projects[1],
    visual: "identity",
  },
  {
    id: "model-supply-chain",
    number: "03",
    eyebrow: "Model Supply Chain",
    title: "Inspect artifacts without trusting them.",
    description: "Treat model repositories as software supply chains and analyze them without executing untrusted model code.",
    project: resume.projects[2],
    visual: "supply",
  },
  {
    id: "dataset-integrity",
    number: "04",
    eyebrow: "Training Data Integrity",
    title: "Secure the data-ingestion boundary.",
    description: "Detect suspicious samples, preserve evidence, and route risky data to quarantine instead of silently accepting it.",
    project: resume.projects[3],
    visual: "dataset",
  },
  {
    id: "llm-red-team",
    number: "05",
    eyebrow: "LLM Red Teaming",
    title: "Measure the generalization gap.",
    description: "Evaluate prompt-injection defenses on held-out and novel phrasing instead of trusting optimistic in-distribution scores.",
    project: supplementalProjects.llm,
    visual: "llm",
  },
  {
    id: "adversarial-ml",
    number: "06",
    eyebrow: "Adversarial ML",
    title: "Clean accuracy is not robust accuracy.",
    description: "Reproduce gradient-based attacks, measure the clean/robust gap, and keep the benchmark scope explicit.",
    project: supplementalProjects.adversarial,
    visual: "adversarial",
  },
  {
    id: "detection",
    number: "07",
    eyebrow: "Detection Engineering",
    title: "Prevention needs observable evidence.",
    description: "Security decisions become structured telemetry, audit evidence, SIEM detections, and reproducible regression tests.",
    visual: "siem",
  },
  {
    id: "aerosec",
    number: "08",
    eyebrow: "Aerospace Security Strategy",
    title: "Translate security into operating decisions.",
    description: "AEROSEC connected third-party system risk, compliance, funding, and commercialization tradeoffs for airline PSS integrations.",
    visual: "aerospace",
  },
  {
    id: "evidence",
    number: "09",
    eyebrow: "Reproducibility",
    title: "Claims should survive inspection.",
    description: "Metrics stay tied to committed tests, coverage gates, CI, runbooks, posters, limitations, and clean repository history.",
    visual: "evidence",
  },
];

function ProjectEvidence({ project }: { project: EvidenceProject }) {
  return (
    <div className="evidence-panel">
      <div className="metric-grid">
        {project.metrics.slice(0, 5).map((metric) => (
          <div className="metric" key={metric}>{metric}</div>
        ))}
      </div>
      <div className="project-copy">
        {project.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}
      </div>
      <div className="stack-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">Open repository ↗</a>
    </div>
  );
}

function SecurityVisual({ kind }: { kind: World["visual"] }) {
  if (kind === "gateway") {
    return <div className="scene scene--gateway">
      <div className="scene-label">MCP / JSON-RPC boundary</div>
      <div className="flow-line"><span>Agent</span><i>tools/call</i><strong>Gateway</strong><i>allow / block</i><span>Tool</span></div>
      <div className="console-lines"><b>normalize input</b><b>capability check</b><b>egress policy</b><b>audit evidence</b></div>
    </div>;
  }
  if (kind === "identity") {
    return <div className="scene scene--identity">
      <div className="scene-label">IAM relationship map</div>
      <div className="graph">
        <span className="node node--a">Agent role</span><span className="node node--b">PassRole</span><span className="node node--c">Target role</span><span className="node node--d">Resource</span>
      </div>
      <div className="risk-card">25 deterministic rule IDs · SARIF 2.1.0</div>
    </div>;
  }
  if (kind === "supply") {
    return <div className="scene scene--supply">
      <div className="scene-label">Artifact inspection bench</div>
      <div className="artifact-rack"><span>Pickle</span><span>SafeTensors</span><span>GGUF</span><span>ONNX</span><span>Keras</span></div>
      <div className="scan-beam">NON-EXECUTING ANALYSIS</div>
    </div>;
  }
  if (kind === "llm") {
    return <div className="scene scene--llm">
      <div className="scene-label">Prompt-injection evaluation</div>
      <div className="ood-grid">
        <div><span>Grouped split</span><strong>0.9714</strong><small>F1</small></div>
        <div className="ood-risk"><span>Novel phrasing</span><strong>0.7188</strong><small>OOD F1</small></div>
      </div>
      <div className="generalization-gap"><i /><span>generalization gap</span><i /></div>
    </div>;
  }
  if (kind === "dataset") {
    return <div className="scene scene--dataset">
      <div className="scene-label">Training-data ingestion</div>
      <div className="sample-grid">{Array.from({ length: 18 }).map((_, i) => <span className={i === 5 || i === 14 ? "is-risk" : ""} key={i} />)}</div>
      <div className="pipeline-row"><b>Screen</b><b>Score</b><b>Quarantine</b><b>Evidence</b></div>
    </div>;
  }
  if (kind === "adversarial") {
    return <div className="scene scene--adversarial">
      <div className="scene-label">Robustness evaluation</div>
      <div className="accuracy-compare">
        <div><span>Clean</span><strong>71.82%</strong><i style={{ width: "71.82%" }} /></div>
        <div className="robust-row"><span>PGD-20 @ 8/255</span><strong>0.00%</strong><i style={{ width: "1%" }} /></div>
      </div>
      <div className="attack-row"><span>FGSM</span><span>PGD</span><span>C&amp;W</span><span>AML.T0043</span></div>
    </div>;
  }
  if (kind === "siem") {
    return <div className="scene scene--siem">
      <div className="scene-label">Detection operations</div>
      <div className="siem-grid"><span>ECS events</span><span>9 Elastic rules</span><span>21 SIEM tests</span><span>Hash-chain audit</span></div>
      <div className="signal-bars">{[28, 52, 38, 74, 49, 88, 60, 94, 69].map((h, i) => <i style={{ height: `${h}%` }} key={i} />)}</div>
    </div>;
  }
  if (kind === "aerospace") {
    return <div className="scene scene--aerospace">
      <div className="scene-label">AEROSEC decision room</div>
      <div className="flight-route"><i /><strong>PSS</strong><i /><strong>API shield</strong><i /><strong>Airline</strong></div>
      <div className="decision-cards"><span>Third-party risk</span><span>Compliance</span><span>$120K year-one scenario</span></div>
    </div>;
  }
  return <div className="scene scene--evidence">
    <div className="scene-label">Evidence room</div>
    <div className="evidence-ledger"><span>19 PROTECTED MAINS</span><span>0 GITLEAKS FINDINGS</span><span>0 BROKEN DOC LINKS</span><span>CI GATES</span><span>RUNBOOKS</span><span>POSTERS</span></div>
    <div className="seal">VERIFIED · SCOPED · REPRODUCIBLE</div>
  </div>;
}

export default function Portfolio() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#home"><span>PK</span><strong>Pooja Kiran</strong></a>
        <nav aria-label="Primary navigation">
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#academics">Academics</a>
          <a href="#evidence">Evidence</a>
        </nav>
        <a className="header-resume" href={resumeHref} target="_blank" rel="noreferrer">Résumé ↗</a>
      </header>

      <main id="main">
        <section className="hero" id="home">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Security Engineering Portfolio</p>
              <h1>Pooja<br />Kiran</h1>
              <p className="hero-role">Security Engineer</p>
              <p className="hero-domains">AI & Agent Security · Application Security · Cloud IAM</p>
              <p className="hero-statement">I engineer trust boundaries for systems that can act.</p>
              <p className="hero-support">Security controls across agent runtime execution, cloud identity, LLM red teaming, model supply chains, training-data integrity, adversarial ML, and detection engineering.</p>
              <div className="actions">
                <a className="button button--primary" href="#projects">Enter the security worlds</a>
                <a className="button" href={resumeHref} target="_blank" rel="noreferrer">View résumé</a>
                <a className="button" href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              </div>
            </div>
            <div className="hero-system" aria-label="Security engineering evidence map">
              <div className="hero-system__title">CURRENT VERIFIED PROJECT EVIDENCE</div>
              <div className="hero-metrics">
                <div><strong>718</strong><span>MCP tests passed</span></div>
                <div><strong>235</strong><span>IAM tests passed</span></div>
                <div><strong>241</strong><span>HF scanner tests passed</span></div>
                <div><strong>199</strong><span>Dataset tests passed</span></div>
              </div>
              <div className="boundary-diagram"><span>Input</span><i /><strong>Control</strong><i /><span>Decision</span><i /><span>Evidence</span></div>
              <p>Repository-level counts are shown separately and are not presented as an efficacy metric. Final full-history Gitleaks verification returned zero findings across all 19 repositories.</p>
            </div>
          </div>
          <div className="hero-footer"><span>Tempe, Arizona</span><span>{resume.email}</span><span>{resume.phone}</span></div>
        </section>

        <section className="worlds-intro" id="projects">
          <p className="eyebrow">Nine security environments</p>
          <h2>Different systems. Different trust boundaries.</h2>
          <p>Each environment maps to current repository evidence or documented professional work. Metrics stay scoped to the test, fixture, benchmark, or business context that produced them.</p>
        </section>

        <div className="worlds">
          {worlds.map((world) => (
            <section className="world" id={world.id} key={world.id}>
              <div className="world-copy">
                <div className="world-number">{world.number}</div>
                <p className="eyebrow">{world.eyebrow}</p>
                <h2>{world.title}</h2>
                <p className="world-description">{world.description}</p>
                {world.project ? <ProjectEvidence project={world.project} /> : (
                  <div className="evidence-panel">
                    {world.visual === "siem" && <>
                      <div className="metric-grid"><div className="metric">9 Elastic Security rules</div><div className="metric">21 core SIEM tests</div><div className="metric">ECS telemetry</div><div className="metric">Hash-chained audit</div></div>
                      <p>Detection evidence is anchored in the MCP gateway repository and its local security-telemetry validation.</p>
                    </>}
                    {world.visual === "aerospace" && <>
                      <div className="metric-grid"><div className="metric">$120K year-one scenario</div><div className="metric">Five-year financial model</div><div className="metric">Third-party PSS risk</div></div>
                      <p>AEROSEC was an ASU x Honeywell externship project focused on business, compliance, and third-party system security strategy.</p>
                    </>}
                    {world.visual === "evidence" && <>
                      <div className="metric-grid"><div className="metric">19 protected main branches</div><div className="metric">0 final Gitleaks findings</div><div className="metric">0 broken relative Markdown links</div><div className="metric">10 poster verifications passed</div></div>
                      <p>README files, runbooks, tests, coverage gates, security scans, and conference-style posters are maintained as reviewable evidence. The final secret scan covers full Git history, not only the current worktree.</p>
                    </>}
                  </div>
                )}
              </div>
              <SecurityVisual kind={world.visual} />
            </section>
          ))}
        </div>

        <section className="experience" id="experience">
          <div className="section-heading"><p className="eyebrow">Experience</p><h2>Engineering, compliance, and technical evaluation.</h2></div>
          <div className="experience-list">
            {resume.experience.map((item, index) => (
              <article key={item.role + item.dates}>
                <span className="experience-index">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.role}{item.detail ? <small> · {item.detail}</small> : null}</h3><p>{item.organization} · {item.location}</p></div>
                <time>{item.dates}</time>
                <div className="experience-bullets">{item.bullets.map((bullet) => <p key={bullet}>{bullet}</p>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills">
          <div className="section-heading"><p className="eyebrow">Security expertise</p><h2>Built around controls, evidence, and failure modes.</h2></div>
          <div className="skills-grid">{resume.skillGroups.map((group) => <article key={group.label}><span>{group.label}</span><p>{group.items.join(" · ")}</p></article>)}</div>
        </section>

        <section className="academics" id="academics">
          <div className="section-heading"><p className="eyebrow">Academics & certifications</p><h2>Security engineering foundation.</h2></div>
          <div className="academic-grid">
            {resume.education.map((item) => <article key={item.school}><h3>{item.school}</h3><p>{item.degree}</p><span>{item.score} · {item.dates}</span></article>)}
          </div>
          <div className="certifications">{resume.certifications.map((cert) => <span key={cert}>{cert}</span>)}</div>
        </section>

        <section className="contact">
          <p className="eyebrow">Review the evidence</p>
          <h2>Security claims should be inspectable.</h2>
          <p>Open the repositories, read the runbooks, inspect the tests, or start with the one-page résumé.</p>
          <div className="actions">
            <a className="button button--primary" href={resumeHref} target="_blank" rel="noreferrer">Open résumé</a>
            <a className="button" href={resume.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a className="button" href={resume.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="button" href={`mailto:${resume.email}`}>Email</a>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>© 2026 Pooja Kiran</span><span>Security engineering · evidence-backed</span></footer>
    </div>
  );
}
