"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
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
    keyword: "BOUNDARY",
    eyebrow: "Arrival · AI Security Facility",
    title: "Walk inside the systems I secure.",
    body: "A realistic walkthrough of the security boundaries around agent execution, cloud identity, model artifacts, and operational validation.",
    metric: "Scroll or use W/S to move through the facility",
    href: "#projects",
    action: "Jump to engineering evidence",
    hook: "Power without boundaries is not intelligence. It is risk.",
    guide: "Welcome. I’m ORION. I’ll walk with you through the decisions Pooja makes when intelligent systems are allowed to act in the real world.",
    takeaway: "Pooja approaches AI security as an engineering problem: define the boundary, enforce it, then prove that it works.",
  },
  2: {
    keyword: "EXECUTION",
    eyebrow: "Zone 01 · Agent Execution",
    title: "MCP Agent Security Gateway",
    body: "The first checkpoint represents the boundary before an AI agent can invoke tools: MCP/JSON-RPC policy, prompt-injection signals, capability checks, audit logging, and SIEM validation.",
    metric: "641 tests · 79.54% statement coverage · 9 Elastic rules",
    href: "#projects",
    action: "Review gateway evidence",
    hook: "Before AI can act, it has to earn the right to act.",
    guide: "This door is about execution. An intelligent system should not gain real-world power simply because it can request a tool call.",
    takeaway: "Pooja builds controls at the point where AI intent becomes action, with explicit enforcement and measurable validation.",
  },
  3: {
    keyword: "IDENTITY",
    eyebrow: "Zone 02 · Identity & Authorization",
    title: "AWS Agent Identity Guard",
    body: "This zone represents the identity layer behind agent actions: risky IAM combinations, AssumeRole, PassRole, wildcard access, trust relationships, and authorization paths.",
    metric: "230 tests · 25 deterministic IAM rules",
    href: "#projects",
    action: "Review IAM evidence",
    hook: "Capability is not permission.",
    guide: "Here the question changes from what can the system do to who is allowed to do it, under which role, and with what blast radius.",
    takeaway: "Pooja treats identity as a security control surface, not an administrative detail.",
  },
  4: {
    keyword: "PROVENANCE",
    eyebrow: "Zone 03 · Model Supply Chain",
    title: "HF Model Provenance Scanner",
    body: "A controlled artifact vault represents model trust before execution: provenance, serialization risk, loader behavior, impersonation signals, configuration anomalies, and supply-chain evidence.",
    metric: "199 tests · 12/12 core fixtures · 18/18 extended variants",
    href: "#projects",
    action: "Review provenance evidence",
    hook: "If you cannot trace the artifact, you should not trust the outcome.",
    guide: "Models are software supply-chain artifacts too. This vault represents the evidence needed before loading something powerful into a trusted environment.",
    takeaway: "Pooja extends security thinking beyond applications and identities to the artifacts AI systems depend on.",
  },
  5: {
    keyword: "EVIDENCE",
    eyebrow: "Zone 04 · Detection & Validation",
    title: "Security evidence, not security theater.",
    body: "The walkthrough ends in a security-operations space because controls only matter when they are tested, observable, and supported by evidence.",
    metric: "Telemetry · testing · detections · documented limitations",
    href: "#about",
    action: "See how I engineer",
    hook: "Security is not a promise. It is evidence that survives scrutiny.",
    guide: "This is the final room. Controls become credible when they can be tested, observed, challenged, and explained to people who were not in the room when they were built.",
    takeaway: "Pooja’s strongest pattern is ownership from control design through testing, telemetry, evidence, and clear communication.",
  },
} as const;

const suggestedQuestions = [
  "Why should we talk to Pooja?",
  "What is her strongest project?",
  "How does she validate security controls?",
  "What roles fit her work?",
];

function answerQuestion(raw: string) {
  const q = raw.toLowerCase();

  if (q.includes("hire") || q.includes("why should") || q.includes("talk to")) {
    return "Pooja combines AI security, cloud identity, detection engineering, and hands-on software development. The important part is the evidence: her flagship systems are backed by documented tests, scoped metrics, CI checks, security detections, and explicit limitations. That shows both initiative and engineering discipline.";
  }

  if (q.includes("strongest") || q.includes("best project")) {
    return "The MCP Agent Security Gateway is the clearest single example of her direction. It sits directly in the agent action path, evaluates MCP and JSON-RPC tool calls, applies policy and prompt-injection signals, records audit evidence, and is currently documented with 641 passing tests, 79.54 percent statement coverage, and 9 Elastic detection rules.";
  }

  if (q.includes("mcp") || q.includes("agent") || q.includes("tool")) {
    return "Her MCP Agent Security Gateway focuses on the moment an AI agent tries to execute a tool. It combines policy checks, capability validation, prompt-injection signals, audit logging, rate limiting, and SIEM-oriented evidence. The design goal is simple: capability should not automatically become permission.";
  }

  if (q.includes("iam") || q.includes("identity") || q.includes("aws") || q.includes("cloud")) {
    return "Her AWS Agent Identity Guard is a static IAM analysis system for risky permission combinations and authorization paths, including AssumeRole, PassRole, wildcards, privilege-escalation patterns, and related agent identity risks. The current documented scope includes 25 deterministic rule IDs and 231 passing tests.";
  }

  if (q.includes("model") || q.includes("provenance") || q.includes("supply chain") || q.includes("hugging")) {
    return "Her model-provenance work treats AI artifacts as part of the software supply chain. The scanner inspects provenance, serialization and loader risk, impersonation signals, configuration anomalies, and supporting evidence without executing untrusted model payloads. The current CI snapshot documents 199 tests, 12 of 12 core fixtures, and 18 of 18 extended variants.";
  }

  if (q.includes("test") || q.includes("validate") || q.includes("evidence") || q.includes("quality")) {
    return "A recurring pattern across Pooja’s work is validation before marketing. Her projects expose test counts, coverage where applicable, CI gates, detection rules, scoped performance claims, and documented limitations. She distinguishes what a system proves from what it is only designed to explore.";
  }

  if (q.includes("role") || q.includes("position") || q.includes("fit")) {
    return "Her portfolio is most directly aligned with security engineering roles involving AI or agent security, application and product security, cloud identity and IAM, detection engineering, security automation, and security infrastructure. The common thread is building enforceable security controls and validating them with software and telemetry.";
  }

  if (q.includes("background") || q.includes("education") || q.includes("degree")) {
    return "Pooja completed a Master’s in Information Technology with a security focus at Arizona State University after a computer science engineering degree. Her portfolio combines graduate security work, open-source security engineering, applied AI security research, and an aerospace business-and-compliance project.";
  }

  if (q.includes("different") || q.includes("unique") || q.includes("stand out")) {
    return "What stands out is the combination of systems thinking and evidence. She does not present AI security as a collection of buzzwords. Her portfolio connects agent execution, identity, model provenance, detection, testing, and operational visibility into one coherent security story.";
  }

  return "I can answer questions about Pooja’s security projects, testing evidence, AI and agent security work, AWS IAM analysis, model provenance, background, role fit, and the engineering principles behind this facility. Try asking what makes her work different or which project best demonstrates her strengths.";
}


type SpeechRecognitionResultLike = {
  0: { transcript: string };
};

type SpeechRecognitionEventLike = Event & {
  results: {
    0: SpeechRecognitionResultLike;
  };
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type SpeechWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

export default function InteractivePortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qaOpen, setQaOpen] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const current = stages[stage];

  useEffect(() => {
    setSpeechSupported(typeof window !== "undefined" && "speechSynthesis" in window);

    if (typeof window !== "undefined") {
      const speechWindow = window as SpeechWindow;
      setMicSupported(Boolean(speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition));
    }
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
      const talk = event.key === "e" || event.key === "E";

      if (talk) {
        event.preventDefault();
        setQaOpen(true);
        return;
      }

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
      `${current.hook} ${current.guide} Key takeaway. ${current.takeaway}`,
    );
    const voices = synth.getVoices();
    const preferred =
      voices.find((voice) => voice.lang.startsWith("en") && voice.localService) ??
      voices.find((voice) => voice.lang.startsWith("en"));

    if (preferred) utterance.voice = preferred;
    utterance.rate = 0.9;
    utterance.pitch = 0.86;
    utterance.volume = 0.92;
    synth.speak(utterance);

    return () => synth.cancel();
  }, [stage, voiceEnabled, speechSupported, current.guide, current.hook, current.takeaway]);

  const speak = (text: string) => {
    if (!voiceEnabled || !speechSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((voice) => voice.lang.startsWith("en") && voice.localService) ??
      voices.find((voice) => voice.lang.startsWith("en"));
    if (preferred) utterance.voice = preferred;
    utterance.rate = 0.9;
    utterance.pitch = 0.86;
    utterance.volume = 0.92;
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    if (!speechSupported) return;

    if (voiceEnabled) {
      window.speechSynthesis.cancel();
      setVoiceEnabled(false);
      return;
    }

    setVoiceEnabled(true);
  };

  const ask = (raw: string) => {
    const cleaned = raw.trim();
    if (!cleaned) return;
    const nextAnswer = answerQuestion(cleaned);
    setQuestion(cleaned);
    setAnswer(nextAnswer);
    setQaOpen(true);
    speak(nextAnswer);
  };

  const startListening = () => {
    if (!micSupported || listening || typeof window === "undefined") return;

    const speechWindow = window as SpeechWindow;
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Recognition) return;

    const recognition = new Recognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) {
        setQuestion(transcript);
        ask(transcript);
      }
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setListening(true);
    setQaOpen(true);
    recognition.start();
  };

  const submitQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <section ref={sectionRef} className="facility-journey aura-journey" aria-labelledby="hero-title">
      <div className="facility-sticky aura-sticky">
        <div className="facility-world aura-world" aria-label="Interactive 3D AI security facility walkthrough">
          <SecurityCanvas progress={progress} />
        </div>

        <div className="aura-atmosphere" aria-hidden="true">
          <i className="aura-orb aura-orb-a" />
          <i className="aura-orb aura-orb-b" />
          <i className="aura-beam" />
          <i className="aura-grid" />
          <i className="aura-noise" />
        </div>

        <div className="aura-topline">
          <div>
            <strong>POOJA KIRAN</strong>
            <span>SECURITY ENGINEER · AI SYSTEMS</span>
          </div>
          <div className="aura-topline-center">
            <span>TRUST ARCHITECTURE</span>
            <i />
            <span>{String(stage).padStart(2, "0")} / 05</span>
          </div>
          <div className="aura-top-links">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={RESUME_URL} download>Résumé ↓</a>
          </div>
        </div>

        <div className="aura-stage-word" key={`word-${stage}`} aria-hidden="true">
          {current.keyword}
        </div>

        <div className="aura-hero-copy" key={`copy-${stage}`}>
          <p className="aura-kicker">{current.eyebrow}</p>
          <h1 id="hero-title">
            <span>{current.keyword}</span>
            <em>{current.title}</em>
          </h1>
          <p className="aura-hero-body">{current.body}</p>

          <div className="aura-proof">
            <span>PROOF</span>
            <strong>{current.metric}</strong>
          </div>

          <div className="aura-actions">
            <a href={current.href} className="aura-primary-action">
              {current.action}
              <span aria-hidden="true">↘</span>
            </a>
            <button type="button" className="aura-secondary-action" onClick={() => setQaOpen(true)}>
              Ask ORION
            </button>
          </div>
        </div>

        <aside className={qaOpen ? "sentinel-dialogue aura-orion qa-open" : "sentinel-dialogue aura-orion"} aria-live="polite">
          <div className="sentinel-dialogue-head">
            <div className="sentinel-avatar" aria-hidden="true">
              <span />
              <i />
            </div>
            <div>
              <strong>ORION</strong>
              <span>HUMANOID FACILITY GUIDE</span>
            </div>
            {speechSupported && (
              <button
                type="button"
                className={voiceEnabled ? "sentinel-voice active" : "sentinel-voice"}
                onClick={toggleVoice}
                aria-pressed={voiceEnabled}
                aria-label={voiceEnabled ? "Mute ORION guide voice" : "Enable ORION guide voice"}
              >
                {voiceEnabled ? "VOICE ON" : "VOICE"}
              </button>
            )}
          </div>

          <p className="sentinel-principle-label">POOJA&apos;S RULE</p>
          <blockquote key={`hook-${stage}`}>“{current.hook}”</blockquote>
          <p className="sentinel-guide-copy">{current.guide}</p>

          <div className="mission-takeaway" key={`takeaway-${stage}`}>
            <span>KEY TAKEAWAY</span>
            <p>{current.takeaway}</p>
          </div>

          <button
            type="button"
            className="orion-ask-toggle"
            onClick={() => setQaOpen((open) => !open)}
            aria-expanded={qaOpen}
          >
            {qaOpen ? "Close conversation" : "Ask ORION about Pooja"}
          </button>

          {qaOpen && (
            <div className="orion-qa">
              <div className="orion-suggestions">
                {suggestedQuestions.map((item) => (
                  <button key={item} type="button" onClick={() => ask(item)}>
                    {item}
                  </button>
                ))}
              </div>

              <form onSubmit={submitQuestion} className="orion-question-form">
                <label htmlFor="orion-question">Ask about Pooja&apos;s work</label>
                <div>
                  <input
                    id="orion-question"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="What makes her work different?"
                    autoComplete="off"
                  />
                  {micSupported && (
                    <button
                      type="button"
                      className={listening ? "orion-mic listening" : "orion-mic"}
                      onClick={startListening}
                      aria-label={listening ? "Listening for your question" : "Ask ORION by voice"}
                    >
                      {listening ? "LIVE" : "MIC"}
                    </button>
                  )}
                  <button type="submit">Ask</button>
                </div>
              </form>

              {answer && (
                <div className="orion-answer">
                  <span>ORION</span>
                  <p>{answer}</p>
                </div>
              )}
            </div>
          )}
        </aside>

        <div className="aura-stage-rail" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((item) => (
            <span key={item} className={item === stage ? "active" : item < stage ? "passed" : ""}>
              <i />
              <small>{String(item).padStart(2, "0")}</small>
            </span>
          ))}
        </div>

        <div className="facility-progress aura-progress" aria-hidden="true">
          <div className="facility-progress-track">
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
          <div className="facility-progress-meta">
            <span>ENTER</span>
            <span>SCROLL / W-S</span>
            <span>VERIFY</span>
          </div>
        </div>

        <button
          type="button"
          className="orion-proximity-prompt aura-talk"
          onClick={() => setQaOpen(true)}
          aria-label="Talk to ORION"
        >
          <span>E</span>
          <strong>Talk to ORION</strong>
          <small>Ask about Pooja</small>
        </button>

        <div className="aura-corner aura-corner-tl" aria-hidden="true" />
        <div className="aura-corner aura-corner-br" aria-hidden="true" />
      </div>
    </section>
  );
}
