"use client";

import { useMemo, useState } from "react";
import { SUPPORTING_PROJECTS, ARCHIVE_PROJECTS } from "@/data/projects";
import { STORY } from "@/data/content";
import Reveal from "@/components/ui/Reveal";

// Categories present in the supporting/archive set (only real ones).
const FILTERS = ["All", "ML Security & Red-Teaming", "Foundations"] as const;
type Filter = (typeof FILTERS)[number];

export default function Research() {
  const [filter, setFilter] = useState<Filter>("All");

  const supporting = useMemo(
    () =>
      filter === "All"
        ? SUPPORTING_PROJECTS
        : SUPPORTING_PROJECTS.filter((p) => p.category === filter),
    [filter],
  );
  const archive = useMemo(
    () =>
      filter === "All" || filter === "Foundations" || filter === "ML Security & Red-Teaming"
        ? ARCHIVE_PROJECTS.filter((p) => filter === "All" || p.category === filter)
        : [],
    [filter],
  );

  return (
    <section id="research" className="section-pad relative border-t border-white/[0.06]">
      <div className="container-editorial">
        <Reveal>
          <p className="section-index">/ {STORY.research}</p>
          <h2 className="display mt-4 max-w-[20ch] text-fluid-3xl text-chalk text-balance">
            Red-team &amp; research: how the systems get stress-tested.
          </h2>
          <p className="mt-6 max-w-prose body-base">
            Strong supporting work — measurement harnesses and attack labs that keep
            the flagship tools honest. Each states its limitations openly; several
            report near-chance results on the hard cases precisely because the
            methodology is trustworthy.
          </p>
        </Reveal>

        {/* Filter */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-4 py-1.5 font-mono text-fluid-xs uppercase tracking-wider transition-colors ${
                  filter === f
                    ? "border-signal/50 bg-signal/10 text-signal"
                    : "border-white/[0.08] text-mist hover:border-white/20 hover:text-chalk"
                }`}
              >
                {f === "ML Security & Red-Teaming" ? "ML Security" : f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Tier A cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {supporting.map((p, i) => (
            <Reveal key={p.repository} delay={i * 70}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-xl border border-white/[0.06] bg-graphite/50 p-7 transition-colors hover:border-signal/30 hover:bg-slate/50"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded border border-white/[0.06] bg-void/60 px-2 py-0.5 font-mono text-fluid-xs text-mist">
                    LEVEL 02
                  </span>
                  <span className="font-mono text-fluid-xs text-ash">{p.language}</span>
                </div>
                <h3 className="mt-4 text-fluid-xl text-chalk">{p.title}</h3>
                <p className="mt-2 body-base flex-1">{p.tagline}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.evidence.slice(0, 2).map((e) => (
                    <li key={e} className="flex gap-2.5 font-mono text-fluid-xs text-mist">
                      <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-signal" />
                      {e}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="font-mono text-fluid-xs text-ash">
                    {p.frameworks.slice(0, 2).join(" · ")}
                  </span>
                  <span className="font-mono text-fluid-xs text-mist transition-colors group-hover:text-signal">
                    repo ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Tier B — engineering archive */}
        {archive.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <p className="mono-label">/ Engineering archive</p>
            </Reveal>
            <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2">
              {archive.map((a, i) => (
                <Reveal key={a.repository} delay={i * 60} className="bg-graphite/40">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col p-6 transition-colors hover:bg-slate/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-fluid-xs text-ash">{a.category}</span>
                      <span className="font-mono text-fluid-xs text-ash">{a.status}</span>
                    </div>
                    <h4 className="mt-3 text-fluid-lg text-chalk">{a.title}</h4>
                    <p className="mt-2 body-base flex-1">{a.description}</p>
                    <span className="mt-4 font-mono text-fluid-xs text-mist transition-colors group-hover:text-signal">
                      {a.repository} ↗
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
