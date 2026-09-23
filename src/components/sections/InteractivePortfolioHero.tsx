"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RESUME_URL, profile } from "@/data/portfolio";

const SecurityCanvas = dynamic(() => import("@/components/three/SecurityCanvas"), {
  ssr: false,
  loading: () => (
    <div className="facility-loader" role="status" aria-live="polite">
      <span />
      <p>Initializing AI security facility…</p>
    </div>
  ),
});

const stages = {
  1: {
    eyebrow: "Arrival · AI Security Facility",
    title: "Walk inside the systems I secure.",
    body: "A realistic walkthrough of the security boundaries around agent execution, cloud identity, model artifacts, and operational validation.",
    metric: "Scroll to move through the facility",
    href: "#projects",
    action: "Jump to engineering evidence",
  },
  2: {
    eyebrow: "Zone 01 · Agent Execution",
    title: "MCP Agent Security Gateway",
    body: "The first checkpoint represents the boundary before an AI agent can invoke tools: MCP/JSON-RPC policy, prompt-injection signals, capability checks, audit logging, and SIEM validation.",
    metric: "629 tests · 78.47% statement coverage · 9 Elastic rules",
    href: "#projects",
    action: "Review gateway evidence",
  },
  3: {
    eyebrow: "Zone 02 · Identity & Authorization",
    title: "AWS Agent Identity Guard",
    body: "This zone represents the identity layer behind agent actions: risky IAM combinations, AssumeRole, PassRole, wildcard access, trust relationships, and authorization paths.",
    metric: "230 tests · 25 deterministic IAM rules",
    href: "#projects",
    action: "Review IAM evidence",
  },
  4: {
    eyebrow: "Zone 03 · Model Supply Chain",
    title: "HF Model Provenance Scanner",
    body: "A controlled artifact vault represents model trust before execution: provenance, serialization risk, loader behavior, impersonation signals, configuration anomalies, and supply-chain evidence.",
    metric: "199 tests · 12/12 core fixtures · 18/18 extended variants",
    href: "#projects",
    action: "Review provenance evidence",
  },
  5: {
    eyebrow: "Zone 04 · Detection & Validation",
    title: "Security evidence, not security theater.",
    body: "The walkthrough ends in a security-operations space because controls only matter when they are tested, observable, and supported by evidence.",
    metric: "Telemetry · testing · detections · documented limitations",
    href: "#about",
    action: "See how I engineer",
  },
} as const;

export default function InteractivePortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const current = stages[stage];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      ticking.current = false;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const next = Math.min(1, Math.max(0, -rect.top / travel));

      setProgress(next);

      let nextStage: 1 | 2 | 3 | 4 | 5 = 1;
      if (next >= 0.14 && next < 0.37) nextStage = 2;
      else if (next >= 0.37 && next < 0.61) nextStage = 3;
      else if (next >= 0.61 && next < 0.83) nextStage = 4;
      else if (next >= 0.83) nextStage = 5;
      setStage(nextStage);
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="facility-journey" aria-labelledby="hero-title">
      <div className="facility-sticky">
        <div className="facility-world" aria-label="Interactive 3D AI security facility walkthrough">
          <SecurityCanvas progress={progress} />
        </div>

        <div className="facility-topbar" aria-hidden="true">
          <span>AI SECURITY FACILITY</span>
          <span>AUTHORIZED WALKTHROUGH</span>
        </div>

        <div className="facility-story">
          <div className="facility-story-card" key={stage}>
            <p className="facility-eyebrow">{current.eyebrow}</p>
            <h1 id="hero-title">{current.title}</h1>
            <p className="facility-body">{current.body}</p>
            <p className="facility-metric">{current.metric}</p>
            <a href={current.href} className="facility-action">
              {current.action}
              <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>

        <div className="facility-identity">
          <p>Pooja Kiran</p>
          <span>Security Engineer · AI Security · Cloud Identity · Detection Engineering</span>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={RESUME_URL} download>Résumé ↓</a>
          </div>
        </div>

        <div className="facility-progress" aria-hidden="true">
          <div className="facility-progress-track">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <div className="facility-progress-meta">
            <span>ENTRY</span>
            <span>{String(stage).padStart(2, "0")} / 05</span>
            <span>OPS</span>
          </div>
        </div>

        <div className="facility-scroll-cue" aria-hidden="true">
          <span>Scroll to walk</span>
          <i />
        </div>
      </div>
    </section>
  );
}
