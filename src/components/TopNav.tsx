"use client";

import Link from "next/link";
import { profile } from "@/data/profile";

export function TopNav({
  view,
  onToggle,
}: {
  view: "cinematic" | "recruiter";
  onToggle: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-graphite/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-base font-semibold tracking-tight">Pooja Kiran</span>
          <span className="mono hidden text-[11px] tracking-widest text-cyan sm:inline">TRUST // LAB</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onToggle}
            className="mono rounded border border-line px-3 py-1.5 text-[11px] tracking-wider text-ink transition-colors hover:border-cyan hover:text-cyan"
            aria-pressed={view === "recruiter"}
          >
            {view === "cinematic" ? "RECRUITER VIEW" : "CINEMATIC VIEW"}
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mono rounded bg-cyan px-3 py-1.5 text-[11px] font-semibold tracking-wider text-graphite"
          >
            RESUME
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hidden text-sm text-muted hover:text-ink sm:inline">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hidden text-sm text-muted hover:text-ink sm:inline">LinkedIn</a>
        </div>
      </nav>
    </header>
  );
}
