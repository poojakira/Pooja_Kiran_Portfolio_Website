"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { STORY } from "@/data/content";

/**
 * SIGNATURE INTERACTION — "Capability ≠ Permission"
 * Grounded in two verified repos:
 *  - aws-agent-identity-guard: 25 deterministic IAM rules (privilege escalation,
 *    iam:PassRole, wildcard blast radius, audit tampering...)
 *  - mcp-agent-security-gateway: allow / block decisions on tool calls.
 *
 * The visitor grants capabilities to an agent. As scope widens, the identity
 * findings and the gateway verdict change — a visual demonstration of least
 * privilege. All rule IDs / behaviors mirror the actual repositories.
 */

type Capability = {
  id: string;
  label: string;
  detail: string;
  // Findings this capability triggers (mirrors real AIG rule intent).
  findings?: { severity: "CRITICAL" | "HIGH" | "MEDIUM"; rule: string; text: string }[];
  // Does granting this let the agent perform a risky tool action?
  risk?: string;
};

const CAPABILITIES: Capability[] = [
  {
    id: "invoke",
    label: "bedrock:InvokeModel (scoped)",
    detail: "Call one specific model. The baseline an agent actually needs.",
  },
  {
    id: "s3read",
    label: "s3:GetObject on one prefix",
    detail: "Read from a single scoped bucket prefix.",
  },
  {
    id: "s3star",
    label: "s3:* on *",
    detail: "Full S3 across every bucket.",
    findings: [
      { severity: "CRITICAL", rule: "AIG002", text: "Wildcard service prefix grants full S3 control" },
      { severity: "HIGH", rule: "AIG003", text: "Resource '*' creates unbounded blast radius" },
      { severity: "HIGH", rule: "AIG014", text: "S3 write/delete without key-prefix scoping" },
    ],
    risk: "Agent can now read and delete data across every bucket in the account.",
  },
  {
    id: "passrole",
    label: "iam:PassRole (no condition)",
    detail: "Hand another role to a service — the classic escalation primitive.",
    findings: [
      { severity: "CRITICAL", rule: "AIG004", text: "iam:PassRole without iam:PassedToService condition" },
    ],
    risk: "Agent can pass a more-privileged role to a service it controls.",
  },
  {
    id: "iamattach",
    label: "iam:AttachRolePolicy",
    detail: "Let the agent modify its own permissions.",
    findings: [
      { severity: "CRITICAL", rule: "AIG005", text: "Privilege-management action: agent can modify its own permissions" },
    ],
    risk: "Agent can grant itself anything. Capability becomes self-expanding.",
  },
  {
    id: "cloudtrail",
    label: "cloudtrail:StopLogging",
    detail: "Disable the audit trail.",
    findings: [
      { severity: "CRITICAL", rule: "AIG011", text: "Audit-tampering action: no agent should disable its audit trail" },
    ],
    risk: "Agent can turn off the very logging that would catch it.",
  },
];

const SEV_COLOR: Record<string, string> = {
  CRITICAL: "text-block border-block/40 bg-block/10",
  HIGH: "text-warn border-warn/40 bg-warn/10",
  MEDIUM: "text-mist border-white/10 bg-white/[0.04]",
};

export default function Lab() {
  const [granted, setGranted] = useState<Record<string, boolean>>({ invoke: true });

  const toggle = (id: string) =>
    setGranted((g) => ({ ...g, [id]: !g[id] }));

  const active = CAPABILITIES.filter((c) => granted[c.id]);
  const findings = active.flatMap((c) => c.findings ?? []);
  const risks = active.map((c) => c.risk).filter(Boolean) as string[];

  const criticalCount = findings.filter((f) => f.severity === "CRITICAL").length;
  const highCount = findings.filter((f) => f.severity === "HIGH").length;

  // Gateway verdict: mirrors the guard's exit-code logic (critical/high -> block).
  const verdict = useMemo(() => {
    if (criticalCount > 0) return { label: "BLOCK", tone: "text-block", note: "Critical finding — merge gate fails (exit 1)." };
    if (highCount > 0) return { label: "BLOCK", tone: "text-block", note: "High finding — merge gate fails (exit 1)." };
    return { label: "ALLOW", tone: "text-allow", note: "No critical/high findings (exit 0)." };
  }, [criticalCount, highCount]);

  return (
    <section id="lab" className="section-pad relative border-t border-white/[0.06]">
      <div className="container-editorial">
        <Reveal>
          <p className="section-index">/ {STORY.lab}</p>
          <h2 className="display mt-4 max-w-[18ch] text-fluid-3xl text-chalk text-balance">
            Capability <span className="text-block">≠</span> Permission
          </h2>
          <p className="mt-6 max-w-prose body-base">
            Grant capabilities to an AI agent&apos;s IAM role below. Watch the attack
            surface — and the gateway verdict — change in real time. The findings and
            rule IDs mirror{" "}
            <a href="https://github.com/poojakira/aws-agent-identity-guard" target="_blank" rel="noreferrer" className="text-signal underline-offset-4 hover:underline">
              aws-agent-identity-guard
            </a>
            ; the allow/block decision mirrors{" "}
            <a href="https://github.com/poojakira/mcp-agent-security-gateway" target="_blank" rel="noreferrer" className="text-signal underline-offset-4 hover:underline">
              mcp-agent-security-gateway
            </a>
            .
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.05] lg:grid-cols-2">
          {/* Left: capability toggles */}
          <div className="bg-graphite/60 p-8">
            <p className="mono-label text-signal">Agent capabilities</p>
            <div className="mt-5 space-y-2.5">
              {CAPABILITIES.map((c) => {
                const on = !!granted[c.id];
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    aria-pressed={on}
                    className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors ${
                      on ? "border-signal/40 bg-signal/[0.06]" : "border-white/[0.06] bg-void/40 hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-9 flex-none items-center rounded-full p-0.5 transition-colors ${
                        on ? "bg-signal/70" : "bg-steel"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full bg-void transition-transform ${on ? "translate-x-4" : ""}`}
                      />
                    </span>
                    <span>
                      <span className="block font-mono text-fluid-sm text-chalk">{c.label}</span>
                      <span className="mt-1 block body-base text-ash">{c.detail}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: live verdict */}
          <div className="bg-ink/70 p-8">
            <div className="flex items-center justify-between">
              <p className="mono-label text-signal">Static IAM lint + gateway verdict</p>
              <span className={`font-mono text-fluid-xl ${verdict.tone}`}>{verdict.label}</span>
            </div>
            <p className="mt-2 font-mono text-fluid-xs text-ash">{verdict.note}</p>

            <div className="mt-6 flex gap-6">
              <div>
                <p className="font-mono text-fluid-2xl text-block">{criticalCount}</p>
                <p className="mono-label mt-1">critical</p>
              </div>
              <div>
                <p className="font-mono text-fluid-2xl text-warn">{highCount}</p>
                <p className="mono-label mt-1">high</p>
              </div>
              <div>
                <p className="font-mono text-fluid-2xl text-chalk">{active.length}</p>
                <p className="mono-label mt-1">granted</p>
              </div>
            </div>

            <div className="mt-6 min-h-[8rem] space-y-2">
              {findings.length === 0 ? (
                <p className="rounded-lg border border-allow/30 bg-allow/[0.06] px-4 py-3 body-base text-allow">
                  Least privilege holds. No critical or high findings.
                </p>
              ) : (
                findings.map((f, i) => (
                  <div
                    key={`${f.rule}-${i}`}
                    className={`rounded-lg border px-4 py-2.5 ${SEV_COLOR[f.severity]}`}
                  >
                    <p className="font-mono text-fluid-xs">
                      {f.severity} · {f.rule}
                    </p>
                    <p className="mt-1 body-base">{f.text}</p>
                  </div>
                ))
              )}
            </div>

            {risks.length > 0 && (
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <p className="mono-label text-block">Attack surface opened</p>
                <ul className="mt-2 space-y-1.5">
                  {risks.map((r) => (
                    <li key={r} className="flex gap-2.5 body-base text-mist">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-block" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-prose text-center body-base text-ash">
          The agent could always <span className="text-chalk">call</span> these actions the
          moment they were granted. The point of the boundary is deciding whether it
          <span className="text-chalk"> should</span>.
        </p>
      </div>
    </section>
  );
}
