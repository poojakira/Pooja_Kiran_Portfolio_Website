"use client";

import { useEffect, useState } from "react";

interface Step { line: string; verdict?: "ok" | "warn" | "block"; }
interface Scenario {
  id: string;
  name: string;
  room: string;
  request: string[];
  steps: Step[];
  outcome: "BLOCK" | "QUARANTINE" | "DETECTED";
  evidence: string;
}

// Deterministic, visual-only scenarios. No real commands, credentials, or execution.
const SCENARIOS: Scenario[] = [
  {
    id: "mcp",
    name: "Tool-Call Abuse (MCP Gateway)",
    room: "07 · Agent Runtime Gateway",
    request: ["agent: research-agent-07", "method: tools/call", "tool: filesystem.read", "target: /.env"],
    steps: [
      { line: "IDENTITY ........ VERIFIED", verdict: "ok" },
      { line: "TOOL ............ REGISTERED", verdict: "ok" },
      { line: "CAPABILITY ...... DENIED", verdict: "block" },
      { line: "SENSITIVE PATH .. DETECTED", verdict: "warn" },
      { line: "EXFIL SIGNAL .... WARNING", verdict: "warn" },
    ],
    outcome: "BLOCK",
    evidence: "652 tests · 55 injection patterns · hash-chained audit event emitted",
  },
  {
    id: "iam",
    name: "IAM Privilege Escalation (Identity Guard)",
    room: "06 · Identity & Workload Trust Vault",
    request: ["role: agent-role", "action: iam:PassRole", "target: privileged-role", "condition: (none)"],
    steps: [
      { line: "WILDCARD ........ ABSENT", verdict: "ok" },
      { line: "PassRole ........ UNSCOPED", verdict: "block" },
      { line: "ESCALATION PATH . IDENTIFIED", verdict: "block" },
      { line: "SEVERITY ........ CRITICAL", verdict: "warn" },
    ],
    outcome: "DETECTED",
    evidence: "25 deterministic rules · SARIF 2.1.0 finding · CI exit code 1",
  },
  {
    id: "model",
    name: "Malicious Model Artifact (Provenance Scanner)",
    room: "02 · Model Intake & Provenance Vault",
    request: ["artifact: model.pkl", "format: pickle", "loaded: NO (static scan)"],
    steps: [
      { line: "FORMAT .......... PICKLE", verdict: "ok" },
      { line: "OPCODE STACK_GLOBAL DETECTED", verdict: "warn" },
      { line: "OPCODE REDUCE ... DETECTED", verdict: "warn" },
      { line: "UNSAFE SERIALIZATION", verdict: "block" },
    ],
    outcome: "QUARANTINE",
    evidence: "150+ rules / 18 analyzers · non-executing · mapped to ATT&CK v19",
  },
  {
    id: "poison",
    name: "Dataset Poisoning (Integrity Hall)",
    room: "03 · Training Data Integrity Hall",
    request: ["batch: ingest-4821", "samples: 2000", "contamination: label-flip"],
    steps: [
      { line: "Z-SCORE ......... FLAGGED", verdict: "warn" },
      { line: "SPECTRAL ........ FLAGGED", verdict: "warn" },
      { line: "ENSEMBLE VOTE ... 2/3", verdict: "block" },
      { line: "RECALL .......... LOW (honest)", verdict: "warn" },
    ],
    outcome: "QUARANTINE",
    evidence: "8 controls · spectral F1 0.08–0.37 (scoped) · quarantined",
  },
  {
    id: "adv",
    name: "Adversarial Input (Test Chamber)",
    room: "04 · Adversarial Model Test Chamber",
    request: ["model: SmallCNN", "attack: PGD-L∞", "epsilon: 8/255"],
    steps: [
      { line: "CLEAN ACCURACY .. 71.82%", verdict: "ok" },
      { line: "PERTURBATION .... APPLIED", verdict: "warn" },
      { line: "ROBUST ACCURACY . 0%", verdict: "block" },
    ],
    outcome: "DETECTED",
    evidence: "measured on real weights (subset) · not projected · ATLAS AML.T0043",
  },
  {
    id: "llm",
    name: "Prompt Injection (Red-Team Range)",
    room: "05 · LLM Red-Team Range",
    request: ["category: indirect injection", "split: OOD paraphrase"],
    steps: [
      { line: "GROUPED F1 ...... 0.9714", verdict: "ok" },
      { line: "OOD F1 .......... 0.7188", verdict: "warn" },
      { line: "MEMORIZATION GAP ~25 pts", verdict: "warn" },
    ],
    outcome: "DETECTED",
    evidence: "173 tests · shows in-dist vs OOD honestly, not the best number only",
  },
];

const verdictColor = { ok: "#41D18A", warn: "#F5A623", block: "#FF5A5F" } as const;

export function AttackSimulator() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Scenario | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!active) return;
    setShown(0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setShown(active.steps.length); return; }
    const iv = setInterval(() => {
      setShown((s) => {
        if (s >= active.steps.length) { clearInterval(iv); return s; }
        return s + 1;
      });
    }, 420);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mono fixed bottom-5 right-5 z-40 rounded-full border border-cyan bg-graphite px-4 py-2.5 text-[11px] font-semibold tracking-wider text-cyan shadow-lg hover:bg-cyan hover:text-graphite"
        aria-haspopup="dialog"
      >
        ▶ SIMULATE ATTACK
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Attack simulator"
          onClick={() => { setOpen(false); setActive(null); }}
        >
          <div className="max-h-[85vh] w-full max-w-lg overflow-auto rounded-lg border border-line bg-panel p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="mono text-sm tracking-widest text-cyan">SIMULATE ATTACK</h2>
              <button onClick={() => { setOpen(false); setActive(null); }} className="text-muted hover:text-ink" aria-label="Close">✕</button>
            </div>
            <p className="mt-2 text-xs text-muted">Deterministic, visual-only. No commands, credentials, or execution.</p>

            {!active ? (
              <div className="mt-4 space-y-2">
                {SCENARIOS.map((s) => (
                  <button key={s.id} onClick={() => setActive(s)} className="block w-full rounded border border-line px-4 py-3 text-left text-sm hover:border-cyan">
                    <span className="font-semibold">{s.name}</span>
                    <span className="mono block text-[11px] text-muted">{s.room}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <button onClick={() => setActive(null)} className="mono text-[11px] text-muted underline hover:text-ink">← scenarios</button>
                <h3 className="mt-2 font-semibold">{active.name}</h3>
                <div className="mono mt-3 rounded border border-line bg-graphite p-3 text-[11px] text-muted">
                  {active.request.map((r) => <div key={r}>{r}</div>)}
                </div>
                <div className="mono mt-3 space-y-1 text-xs">
                  {active.steps.slice(0, shown).map((st, i) => (
                    <div key={i} style={{ color: st.verdict ? verdictColor[st.verdict] : "#8A93A3" }}>{st.line}</div>
                  ))}
                </div>
                {shown >= active.steps.length && (
                  <div className="mt-4 rise">
                    <div className="mono inline-block rounded px-3 py-1.5 text-sm font-bold" style={{ background: "rgba(255,90,95,0.14)", color: "#FF5A5F" }}>
                      {active.outcome}
                    </div>
                    <p className="mono mt-3 text-[11px] leading-relaxed text-muted">EVIDENCE: {active.evidence}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
