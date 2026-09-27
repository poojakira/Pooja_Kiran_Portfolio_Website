import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, projectBySlug } from "@/data/projects";
import { EvidenceCard } from "@/components/ui";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projectBySlug(params.slug);
  if (!p) return { title: "Project not found" };
  return {
    title: `${p.title} | Pooja Kiran`,
    description: `${p.category}. ${p.control}`,
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-8">
      <h2 className="mono mb-3 text-xs tracking-widest text-cyan">{title}</h2>
      <div className="text-muted">{children}</div>
    </section>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = projectBySlug(params.slug);
  if (!p) notFound();

  return (
    <main id="main" className="mx-auto max-w-3xl px-5 pb-24 pt-16">
      <Link href="/" className="mono text-[11px] tracking-widest text-muted hover:text-ink">← TRUST // LAB</Link>

      <header className="mt-6 border-b border-line pb-8" style={{ borderBottomColor: p.accent }}>
        <div className="mono mb-2 flex items-center gap-3 text-xs tracking-widest text-muted">
          <span>ROOM {p.room}</span><span style={{ color: p.accent }}>{p.roomName}</span><span>· TIER {p.tier}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: p.accent }}>{p.title}</h1>
        <p className="mt-2 text-sm text-muted">{p.category}</p>
        <p className="mt-4 text-lg text-ink">{p.question}</p>
        <p className="mono mt-2 text-sm" style={{ color: p.accent }}>{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => <span key={s} className="rounded border border-line px-2 py-1 text-xs text-muted">{s}</span>)}
        </div>
      </header>

      <Block title="PROBLEM">{p.problem}</Block>
      <Block title="THREAT">{p.threat}</Block>
      <Block title="CONTROL">{p.control}</Block>
      <Block title="ARCHITECTURE">
        <ol className="space-y-2">
          {p.architecture.map((a, i) => (
            <li key={i} className="flex gap-3">
              <span className="mono text-xs" style={{ color: p.accent }}>{String(i + 1).padStart(2, "0")}</span>
              <span>{a}</span>
            </li>
          ))}
        </ol>
      </Block>
      <Block title="IMPLEMENTATION">{p.implementation}</Block>
      <Block title="VALIDATION">{p.validation}</Block>
      <Block title="EVIDENCE">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {p.evidence.map((e) => <EvidenceCard key={e.label} e={e} />)}
        </div>
      </Block>
      <Block title="LIMITATIONS — WHAT THIS DOES NOT PROVE">
        <ul className="list-disc space-y-2 pl-5">
          {p.limitations.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      </Block>
      <Block title="SOURCE">
        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">{p.repo}</a>
      </Block>

      <nav className="mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-8 text-sm">
        <Link href="/" className="text-muted hover:text-ink">← All rooms</Link>
        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-4 py-2 hover:border-cyan">View on GitHub</a>
      </nav>
    </main>
  );
}
