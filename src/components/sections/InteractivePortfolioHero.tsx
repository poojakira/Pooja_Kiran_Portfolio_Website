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
    hook: "Power without boundaries is not intelligence. It is risk.",
    guide: "Welcome. I’m Sentinel. I’ll guide you through the decisions that turn powerful technology into systems people can trust.",
  },
  2: {
    eyebrow: "Zone 01 · Agent Execution",
    title: "MCP Agent Security Gateway",
    body: "The first checkpoint represents the boundary before an AI agent can invoke tools: MCP/JSON-RPC policy, prompt-injection signals, capability checks, audit logging, and SIEM validation.",
    metric: "629 tests · 78.47% statement coverage · 9 Elastic rules",
    href: "#projects",
    action: "Review gateway evidence",
    hook: "Before AI can act, it has to earn the right to act.",
    guide: "This door is about execution. An intelligent system should not gain real-world power simply because it can ask for it.",
  },
  3: {
    eyebrow: "Zone 02 · Identity & Authorization",
    title: "AWS Agent Identity Guard",
    body: "This zone represents the identity layer behind agent actions: risky IAM combinations, AssumeRole, PassRole, wildcard access, trust relationships, and authorization paths.",
    metric: "230 tests · 25 deterministic IAM rules",
    href: "#projects",
    action: "Review IAM evidence",
    hook: "Identity is where capability becomes accountability.",
    guide: "Here the question changes from what can the system do to who is allowed to do it, under which role, and with what blast radius.",
  },
  4: {
    eyebrow: "Zone 03 · Model Supply Chain",
    title: "HF Model Provenance Scanner",
    body: "A controlled artifact vault represents model trust before execution: provenance, serialization risk, loader behavior, impersonation signals, configuration anomalies, and supply-chain evidence.",
    metric: "199 tests · 12/12 core fixtures · 18/18 extended variants",
    href: "#projects",
    action: "Review provenance evidence",
    hook: "If you cannot trace what a model is, you should not trust what it can do.",
    guide: "Models are software supply-chain artifacts too. This vault represents the evidence needed before loading something powerful into a trusted environment.",
  },
  5: {
    eyebrow: "Zone 04 · Detection & Validation",
    title: "Security evidence, not security theater.",
    body: "The walkthrough ends in a security-operations space because controls only matter when they are tested, observable, and supported by evidence.",
    metric: "Telemetry · testing · detections · documented limitations",
    href: "#about",
    action: "See how I engineer",
    hook: "Security is not a promise. It is evidence that survives scrutiny.",
    guide: "This is the final room. Controls become credible when they can be tested, observed, challenged, and explained to people who were not in the room when they were built.",
  },
} as const;

export default function InteractivePortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const current = stages[stage];

  useEffect(() => {
    setSpeechSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") return;

      const forward = event.key === "w" || event.key === "W" || event.key === "ArrowUp";
      const backward = event.key === "s" || event.key === "S" || event.key === "ArrowDown";

      if (!forward && !backward) return;
      event.preventDefault();

      window.scrollBy({
        top: (forward ? 1 : -1) * Math.max(90, window.innerHeight * 0.085),
        behavior: "smooth",
      });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!voiceEnabled || !speechSupported) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `${current.hook} ${current.guide}`,
    );
    const voices = synth.getVoices();
    const preferred =
      voices.find((voice) => voice.lang.startsWith("en") && voice.localService) ??
      voices.find((voice) => voice.lang.startsWith("en"));

    if (preferred) utterance.voice = preferred;
    utterance.rate = 0.92;
    utterance.pitch = 0.9;
    utterance.volume = 0.92;
    synth.speak(utterance);

    return () => synth.cancel();
  }, [stage, voiceEnabled, speechSupported, current.guide, current.hook]);

  const toggleVoice = () => {
    if (!speechSupported) return;

    if (voiceEnabled) {
      window.speechSynthesis.cancel();
      setVoiceEnabled(false);
      return;
    }

    setVoiceEnabled(true);
  };

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

        <div className="facility-mission" key={`mission-${stage}`} aria-hidden="true">
          <span>SECURITY WALKTHROUGH</span>
          <strong>{current.eyebrow}</strong>
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

        <aside className="sentinel-dialogue" aria-live="polite">
          <div className="sentinel-dialogue-head">
            <div className="sentinel-avatar" aria-hidden="true">
              <span />
              <i />
            </div>
            <div>
              <strong>SENTINEL</strong>
              <span>AI SECURITY FACILITY GUIDE</span>
            </div>
            {speechSupported && (
              <button
                type="button"
                className={voiceEnabled ? "sentinel-voice active" : "sentinel-voice"}
                onClick={toggleVoice}
                aria-pressed={voiceEnabled}
                aria-label={voiceEnabled ? "Mute Sentinel guide voice" : "Enable Sentinel guide voice"}
              >
                {voiceEnabled ? "VOICE ON" : "ENABLE VOICE"}
              </button>
            )}
          </div>

          <p className="sentinel-principle-label">POOJA&apos;S PRINCIPLE</p>
          <blockquote key={`hook-${stage}`}>“{current.hook}”</blockquote>
          <p className="sentinel-guide-copy">{current.guide}</p>
        </aside>

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
          <span>Scroll / W-S to move · mouse to look</span>
          <i />
        </div>
      </div>
    </section>
  );
}
