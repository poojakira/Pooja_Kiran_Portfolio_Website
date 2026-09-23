import { experience, profile, projects, RESUME_URL, skillGroups } from "@/data/portfolio";
import InteractivePortfolioHero from "@/components/sections/InteractivePortfolioHero";
import PortfolioMotion from "@/components/PortfolioMotion";

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}

export default function Home() {
  return (
    <>
      <PortfolioMotion />
      <InteractivePortfolioHero />

      <div className="focus-band" aria-label="Focus areas">
        <div className="container focus-items"><span>AI & Agent Security</span><span>Cloud & Identity Security</span><span>Detection Engineering</span><span>Model Supply-Chain Security</span></div>
      </div>

      <section className="section container" id="about" aria-labelledby="about-title">
        <div className="section-grid">
          <SectionLabel number="01">About</SectionLabel>
          <div>
            <h2 id="about-title">Security is a discipline.<br /><span className="muted-heading">Evidence is the standard.</span></h2>
            <div className="about-columns">
              <p>I&apos;m a Security Engineer with 2+ years of hands-on, self-directed security research and engineering experience. I own the path from security architecture and control development to adversarial validation and automation.</p>
              <p>My work focuses on three questions: should an agent execute this tool call, should it hold these permissions, and should we trust this model artifact? I turn those questions into open-source Python systems with documented tests and clear limitations.</p>
            </div>
            <dl className="metric-grid">
              <div><dt>1,058</dt><dd>Documented passing tests</dd></div>
              <div><dt>55</dt><dd>Prompt-injection patterns</dd></div>
              <div><dt>25</dt><dd>Deterministic IAM rules</dd></div>
            </dl>
            <p className="evidence-note">Verified September 2026 repository snapshot: 629 MCP + 230 IAM + 199 model-scanner tests.</p>
          </div>
        </div>
      </section>

      <section className="section experience-section" id="experience" aria-labelledby="experience-title">
        <div className="container section-grid">
          <SectionLabel number="02">Experience</SectionLabel>
          <div>
            <h2 id="experience-title">Engineering, research,<br />and applied judgment.</h2>
            <div className="experience-list">
              {experience.map((item) => (
                <article className="experience-row" key={item.role}>
                  <div className="role-meta"><span>{item.period}</span><span>{item.location}</span></div>
                  <h3>{item.role}</h3>
                  <p className="organization">{item.organization}</p>
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects" aria-labelledby="projects-title">
        <div className="container">
          <div className="project-section-header">
            <div><SectionLabel number="03">Selected projects</SectionLabel><h2 id="projects-title">Controls you can inspect.<br />Evidence you can review.</h2></div>
            <p>Three open-source security systems.<br />Source, tests, and documentation on GitHub.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.repository}>
                <div className="project-index"><span>{project.number}</span><p>{project.category}</p><small>{project.period}</small></div>
                <div className="project-body">
                  <div className="project-title-row"><h3>{project.title}</h3><a className="repo-link" href={`${profile.github}/${project.repository}`} target="_blank" rel="noreferrer" aria-label={`${project.title} on GitHub`}>GitHub <span aria-hidden="true">↗</span></a></div>
                  <p className="project-summary">{project.summary}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-metrics">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                  <div className="tags" aria-label="Technologies">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <details className="project-details">
                    <summary>Controls, validation & scope <span aria-hidden="true">+</span></summary>
                    <div className="details-content"><h4>Security controls</h4><p>{project.controls}</p><h4>Validation</h4><p>{project.evidence}</p><h4>Scope & limitations</h4><p>{project.scope}</p></div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container" id="skills" aria-labelledby="skills-title">
        <div className="section-grid"><SectionLabel number="04">Technical skills</SectionLabel>
          <div><h2 id="skills-title">A practical security toolkit.</h2>
            <div className="skills-grid">{skillGroups.map((group) => <article className="skill-group" key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
          </div>
        </div>
      </section>

      <section className="section background-section" id="background" aria-labelledby="background-title">
        <div className="container section-grid"><SectionLabel number="05">Background</SectionLabel>
          <div><h2 id="background-title">Learning, applied.</h2>
            <div className="education-list">
              <article><div className="role-meta"><span>Aug 2024 - May 2026</span><span>GPA 3.87 / 4.00</span></div><h3>Master of Science in Information Technology</h3><p>Arizona State University · Tempe, Arizona</p></article>
              <article><div className="role-meta"><span>Aug 2019 - Aug 2023</span></div><h3>Bachelor of Engineering in Computer Science and Engineering</h3><p>Ramaiah University of Applied Sciences · Bengaluru, India</p></article>
            </div>
            <div className="recognition-grid">
              <article><p className="eyebrow">Training & credentials</p><h3>AWS Academy Graduate</h3><ul><li>Cloud Security Foundations</li><li>Cloud Architecting</li></ul></article>
              <article><p className="eyebrow">Publication · Dec 2023</p><h3>IEEE INDICON 2023</h3><p>A Personalized E-Learning System Using Reinforcement Learning Through Satellite</p><p className="small-copy">Co-authored and presented a peer-reviewed conference paper on personalized e-learning for remote communities using satellite connectivity.</p></article>
              <article><p className="eyebrow">Research grant · Apr 2023</p><h3>KSCST Student Project Programme</h3><p>46th Series · Karnataka State Council for Science and Technology</p><p className="small-copy">Awarded INR 6,000 in project funding for an AI-based e-learning initiative for remote communities.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="container contact-grid">
          <div><SectionLabel number="06">Get in touch</SectionLabel><h2 id="contact-title">Let&apos;s build<br /> safer systems.</h2></div>
          <div className="contact-copy"><p>Open to security engineering opportunities across AI security, cloud identity, detection engineering, and security automation.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<span aria-hidden="true">↗</span></a><div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={RESUME_URL} download>Résumé ↓</a></div><p className="authorization">Tempe, AZ · Open to U.S. relocation<br />F-1 OPT work authorization · Future sponsorship required</p></div>
        </div>
      </section>
    </>
  );
}
