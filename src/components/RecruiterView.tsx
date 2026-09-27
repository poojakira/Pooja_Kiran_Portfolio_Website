import Image from "next/image";
import Link from "next/link";
import { profile, experience, education, certifications, publication, skillGroups } from "@/data/profile";
import { projects } from "@/data/projects";
import { EvidenceCard, StatusBadge, SectionLabel } from "@/components/ui";

const tierLabel = { 1: "Tier 1 · Flagship", 2: "Tier 2", 3: "Tier 3" } as const;

export function RecruiterView() {
  const flagship = [...projects].sort((a, b) => a.tier - b.tier);
  return (
    <main id="main" className="mx-auto max-w-4xl px-5 pb-24 pt-24">
      {/* Header */}
      <section className="flex flex-col gap-6 border-b border-line pb-10 sm:flex-row sm:items-center">
        <Image
          src={profile.photo}
          alt="Portrait of Pooja Kiran"
          width={104}
          height={104}
          className="rounded-full border border-line object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mono mt-1 text-sm tracking-wide text-cyan">{profile.positioning}</p>
          <p className="mt-3 max-w-2xl text-muted">{profile.summary}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="rounded bg-cyan px-3 py-1.5 font-semibold text-graphite">View Resume</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-3 py-1.5 hover:border-cyan">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-3 py-1.5 hover:border-cyan">LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="rounded border border-line px-3 py-1.5 hover:border-cyan">Email</a>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-line py-10">
        <SectionLabel index="01">EXPERIENCE</SectionLabel>
        <div className="space-y-8">
          {experience.map((x) => (
            <article key={x.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold">{x.role}</h2>
                <span className="mono text-xs text-muted">{x.period}</span>
              </div>
              <p className="text-sm text-cyan">{x.organization} · {x.location}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                {x.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Flagship projects */}
      <section className="border-b border-line py-10">
        <SectionLabel index="02">FLAGSHIP SECURITY PROJECTS</SectionLabel>
        <div className="space-y-6">
          {flagship.map((p) => (
            <article key={p.slug} className="rounded-lg border border-line bg-panel p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold" style={{ color: p.accent }}>{p.title}</h3>
                <span className="mono text-[11px] tracking-wider text-muted">{tierLabel[p.tier]}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{p.category} — {p.control}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.evidence.slice(0, 4).map((e) => (
                  <span key={e.label} className="flex items-center gap-2 rounded border border-line px-2.5 py-1 text-xs">
                    <strong className="text-ink">{e.value}</strong>
                    <span className="text-muted">{e.label}</span>
                    <StatusBadge status={e.status} />
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <Link href={`/projects/${p.slug}`} className="text-cyan hover:underline">Read case study →</Link>
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">GitHub</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Engineering evidence summary */}
      <section className="border-b border-line py-10">
        <SectionLabel index="03">ENGINEERING EVIDENCE</SectionLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <EvidenceCard e={{ value: "652", label: "MCP gateway tests", status: "verified", scope: "79% coverage, local run" }} />
          <EvidenceCard e={{ value: "235", label: "IAM analyzer tests", status: "verified", scope: "25 rules, 3 skipped" }} />
          <EvidenceCard e={{ value: "173", label: "LLM security tests", status: "verified", scope: "95.15% coverage" }} />
          <EvidenceCard e={{ value: "33/33", label: "HF fixtures detected", status: "scoped", scope: "internal red-team fixtures" }} />
        </div>
        <p className="mono mt-3 text-[11px] text-muted">Career facts from resume; technical metrics verified against current GitHub repositories.</p>
      </section>

      {/* Skills */}
      <section className="border-b border-line py-10">
        <SectionLabel index="04">TECHNICAL SKILLS</SectionLabel>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.title}>
              <h3 className="mb-2 text-sm font-semibold text-ink">{g.title}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded border border-line px-2 py-1 text-xs text-muted">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education + certs + publication */}
      <section className="grid gap-10 py-10 sm:grid-cols-2">
        <div>
          <SectionLabel index="05">EDUCATION</SectionLabel>
          {education.map((e) => (
            <div key={e.school} className="mb-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold">{e.school}</h3>
                <span className="mono text-xs text-muted">{e.period}</span>
              </div>
              <p className="text-sm text-muted">{e.degree} · {e.detail}</p>
            </div>
          ))}
        </div>
        <div>
          <SectionLabel index="06">CERTIFICATIONS & PUBLICATION</SectionLabel>
          <ul className="space-y-1 text-sm text-muted">
            {certifications.map((c) => <li key={c}>• {c}</li>)}
          </ul>
          <p className="mt-4 text-sm text-muted">
            <span className="text-ink">Publication:</span> {publication.title}, {publication.venue}
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-lg border border-line bg-panel p-6 text-center">
        <h2 className="text-xl font-semibold">Let&apos;s talk security engineering.</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
          <a href={`mailto:${profile.email}`} className="rounded bg-cyan px-4 py-2 font-semibold text-graphite">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-4 py-2 hover:border-cyan">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-4 py-2 hover:border-cyan">LinkedIn</a>
        </div>
      </section>
    </main>
  );
}
