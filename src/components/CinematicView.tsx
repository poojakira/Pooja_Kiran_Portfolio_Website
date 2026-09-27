"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { projects, rooms, trustChain } from "@/data/projects";
import { useReducedMotion } from "@/components/useReducedMotion";
import { StatusBadge } from "@/components/ui";

const FacilityScene = dynamic(() => import("@/components/facility/FacilityScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 facility-grid" />,
});

const INIT_LINES = [
  "MODEL ........ VERIFIED",
  "DATA ......... MONITORED",
  "IDENTITY ..... CONSTRAINED",
  "RUNTIME ...... ENFORCED",
  "TOOLS ........ AUTHORIZED",
  "TELEMETRY .... ACTIVE",
];

function InitSequence({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) { onDone(); return; }
    if (n >= INIT_LINES.length) { const t = setTimeout(onDone, 400); return () => clearTimeout(t); }
    const t = setTimeout(() => setN((v) => v + 1), 260);
    return () => clearTimeout(t);
  }, [n, reduced, onDone]);
  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-graphite" role="status" aria-label="Initializing">
      <div className="mono text-cyan text-sm tracking-[0.3em]">TRUST // LAB</div>
      <div className="mono mt-2 text-xs tracking-widest text-muted">AUTONOMOUS SYSTEM INITIALIZATION</div>
      <div className="mono mt-6 space-y-1 text-xs text-allow">
        {INIT_LINES.slice(0, n).map((l) => <div key={l}>{l}</div>)}
      </div>
      <button onClick={onDone} className="mono mt-8 text-[11px] tracking-wider text-muted underline hover:text-ink">SKIP</button>
    </div>
  );
}

export function CinematicView() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [showInit, setShowInit] = useState(true);

  useEffect(() => { setReady(true); }, []);

  return (
    <main id="main">
      {ready && showInit && <InitSequence onDone={() => setShowInit(false)} />}

      {/* HERO / Mission Control */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          {ready && !reduced ? <FacilityScene accent="#3DD6E0" motion={!reduced} /> : <div className="absolute inset-0 facility-grid" />}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pt-20">
          <div className="mono mb-4 flex items-center gap-2 text-xs tracking-widest text-cyan">
            <span className="inline-block h-2 w-2 rounded-full bg-allow pulse" />
            TRUST // LAB — SECURING AI FROM ARTIFACT TO ACTION
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            {profile.hook}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{profile.subhook}</p>
          <p className="mono mt-3 text-sm tracking-wide text-cyan">{profile.positioning}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#facility" className="rounded bg-cyan px-5 py-2.5 font-semibold text-graphite">Enter Trust System</a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-5 py-2.5 hover:border-cyan">Resume</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-5 py-2.5 hover:border-cyan">GitHub</a>
          </div>
          {/* trust chain */}
          <div className="mono mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] tracking-widest text-muted">
            {trustChain.map((t, i) => (
              <span key={t} className="flex items-center gap-3">
                <span className={i === trustChain.length - 1 ? "text-allow" : "text-ink"}>{t}</span>
                {i < trustChain.length - 1 && <span className="text-cyan">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITY ROOMS */}
      <section id="facility" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mono mb-8 text-xs tracking-widest text-muted">
          <span className="text-cyan">FACILITY</span> — SEVEN SECURITY BOUNDARIES + EVIDENCE CENTER
        </div>
        <div className="space-y-4">
          {rooms.map((room) => {
            const project = room.slug ? projects.find((p) => p.slug === room.slug) : null;
            const Wrapper: React.ElementType = project ? Link : "div";
            const wrapperProps = project ? { href: `/projects/${project.slug}` } : {};
            return (
              <Wrapper
                key={room.code}
                {...wrapperProps}
                className="group block rounded-lg border border-line bg-panel/60 p-5 transition-colors hover:border-cyan/60"
                style={{ borderLeft: `3px solid ${room.accent}` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <span className="mono text-sm text-muted">{room.code}</span>
                    <div>
                      <h2 className="text-lg font-semibold group-hover:text-cyan">{room.name}</h2>
                      {project && <p className="text-sm text-muted">{project.title} — {project.question}</p>}
                      {!project && room.code === "01" && <p className="text-sm text-muted">Trust architecture overview and system status.</p>}
                      {!project && room.code === "08" && <p className="text-sm text-muted">Telemetry converges from every sector into traceable evidence.</p>}
                    </div>
                  </div>
                  {project && (
                    <div className="flex items-center gap-2">
                      <span className="mono text-[11px] tracking-wider text-muted">TIER {project.tier}</span>
                      <StatusBadge status={project.evidence[0].status} />
                      <span className="text-cyan opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </div>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Final scene */}
      <section className="border-t border-line bg-panel/40 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <div className="mono space-y-1 text-sm text-allow">
            {INIT_LINES.map((l) => <div key={l}>{l}</div>)}
          </div>
          <h2 className="mt-8 text-2xl font-bold tracking-tight sm:text-3xl">
            Security is the boundary between AI capability and trust.
          </h2>
          <p className="mono mt-4 text-sm tracking-wide text-cyan">Pooja Kiran · Security Engineer</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="rounded bg-cyan px-4 py-2 font-semibold text-graphite">View Resume</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-4 py-2 hover:border-cyan">GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-4 py-2 hover:border-cyan">LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="rounded border border-line px-4 py-2 hover:border-cyan">Contact</a>
          </div>
        </div>
      </section>
    </main>
  );
}
