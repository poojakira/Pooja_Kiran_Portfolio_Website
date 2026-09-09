"use client";

import dynamic from "next/dynamic";
import { HERO, PROFILE, STORY } from "@/data/content";

// 3D is lazy, client-only, and never blocks first paint or accessibility.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* 3D canvas layer */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <HeroScene />
      </div>

      {/* subtle architectural grid + vignette */}
      <div className="grid-texture pointer-events-none absolute inset-0 z-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(5,5,6,0.85) 100%)",
        }}
      />

      <div className="container-editorial relative z-10 px-6 pt-28 sm:px-10 lg:px-16">
        <p className="eyebrow reveal is-visible">{HERO.eyebrow}</p>

        <h1
          id="hero-heading"
          className="display mt-6 max-w-[18ch] text-fluid-5xl text-chalk text-balance"
        >
          {HERO.statement}
        </h1>

        <p className="mt-8 max-w-prose body-lg">{HERO.subline}</p>

        {/* Three principles — the verified thesis of the flagship work */}
        <div className="mt-12 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.04] sm:grid-cols-3">
          {HERO.principles.map((p) => (
            <div key={p.left} className="bg-graphite/70 px-5 py-5">
              <p className="font-mono text-fluid-sm text-chalk">
                {p.left} <span className="text-block">≠</span> {p.right}
              </p>
              <p className="mt-2 font-mono text-fluid-xs uppercase tracking-wider text-ash">
                → {p.repo}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded border border-signal/40 bg-signal/10 px-6 py-3 font-mono text-fluid-sm uppercase tracking-wider text-signal transition-colors hover:bg-signal/20"
          >
            See the work
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-fluid-sm uppercase tracking-wider text-mist transition-colors hover:text-chalk"
          >
            github.com/{PROFILE.handle} ↗
          </a>
        </div>
      </div>

      {/* Scroll-story label */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="font-mono text-fluid-xs uppercase tracking-widest text-ash">
          {STORY.hero}
        </p>
      </div>
    </section>
  );
}
