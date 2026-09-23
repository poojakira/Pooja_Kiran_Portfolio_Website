"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { RESUME_URL, profile } from "@/data/portfolio";

const SecurityCanvas = dynamic(() => import("@/components/three/SecurityCanvas"), {
  ssr: false,
  loading: () => (
    <div className="three-loader" role="status" aria-live="polite">
      <span />
      <p>Loading interactive security world…</p>
    </div>
  ),
});

const stages = {
  1: {
    eyebrow: "Hello — I’m Pooja",
    title: "Security Engineer",
    body: "I build and test controls for AI agents, cloud identity, and model supply chains.",
    metric: "Drag the world to explore my work",
    href: "#projects",
    action: "View selected work",
  },
  2: {
    eyebrow: "01 · Agent Security",
    title: "MCP Agent Security Gateway",
    body: "Inline MCP/JSON-RPC policy enforcement before tool execution, with prompt-injection detection, capability checks, audit logging, and SIEM validation.",
    metric: "629 tests · 78.47% statement coverage · 9 Elastic rules",
    href: "#projects",
    action: "Explore the gateway",
  },
  3: {
    eyebrow: "02 · Cloud Identity",
    title: "AWS Agent Identity Guard",
    body: "Static IAM analysis for risky privilege combinations, PassRole, AssumeRole, wildcard access, and agent authorization paths.",
    metric: "230 tests · 25 deterministic IAM rules",
    href: "#projects",
    action: "Explore IAM controls",
  },
  4: {
    eyebrow: "03 · Model Supply Chain",
    title: "HF Model Provenance Scanner",
    body: "Non-executing inspection for provenance, serialization, loader, impersonation, configuration, and model-artifact supply-chain signals.",
    metric: "199 tests · 12/12 core fixtures · 18/18 extended variants",
    href: "#projects",
    action: "Explore provenance",
  },
} as const;

export default function InteractivePortfolioHero() {
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);
  const [isRotating, setIsRotating] = useState(false);
  const current = stages[stage];

  const updateStage = (value: number) => {
    if (value >= 1 && value <= 4) setStage(value as 1 | 2 | 3 | 4);
  };

  return (
    <section className="tutorial-hero" aria-labelledby="hero-title">
      <div className="three-sky-glow" aria-hidden="true" />

      <div className="three-stage-wrap">
        <div className="three-stage-card" key={stage}>
          <p className="three-stage-eyebrow">{current.eyebrow}</p>
          <h1 id="hero-title">{current.title}</h1>
          <p className="three-stage-body">{current.body}</p>
          <p className="three-stage-metric">{current.metric}</p>
          <a href={current.href} className="three-stage-action">
            {current.action}
            <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      <div className="three-world-shell" aria-label="Interactive 3D security portfolio scene">
        <SecurityCanvas
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          setStage={updateStage}
        />
      </div>

      <div className="three-signature">
        <p>Pooja Kiran</p>
        <span>AI Security · Cloud Identity · Detection Engineering</span>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={RESUME_URL} download>Résumé ↓</a>
        </div>
      </div>

      <div className="three-controls" aria-hidden="true">
        <span className={isRotating ? "three-control-dot active" : "three-control-dot"} />
        <p>{isRotating ? "Exploring" : "Drag · swipe · arrow keys"}</p>
      </div>
    </section>
  );
}
