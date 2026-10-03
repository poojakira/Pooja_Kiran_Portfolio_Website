"use client";

import { useState } from "react";
import { resume, type ProjectItem } from "@/data/resume";

const scenarios = [
  { label: "Authorized read", request: "Read an approved resource within the caller’s capability.", gate: "The requested action and resource match the illustrative capability.", inspection: "No content or egress signal is present in this example.", decision: "Allow", reason: "Forward the request only after the illustrated checks pass." },
  { label: "Missing capability", request: "Request an action outside the caller’s granted capability.", gate: "The required capability is absent. Authentication alone does not authorize this action.", inspection: "Authorization has failed. Content inspection cannot grant the missing permission.", decision: "Block", reason: "Deny before downstream execution. Record the authorization decision." },
  { label: "Injection signal", request: "An otherwise authorized call carries an instruction to ignore the security policy.", gate: "The example caller has the required capability. Content still needs inspection.", inspection: "The illustrative payload contains a prompt-injection signal.", decision: "Block", reason: "A valid capability does not make untrusted instructions safe. Record the policy decision." },
] as const;

function GatewayInspector() {
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(0);
  const current = scenarios[scenario];
  const stages = ["Request", "Capability", "Inspection", "Decision"];
  const descriptions = [current.request, current.gate, current.inspection, current.reason];
  return <>
    <div className="inspector-options" role="group" aria-label="Choose a gateway scenario">
      {scenarios.map((item, index) => <button type="button" key={item.label} aria-pressed={scenario === index} onClick={() => { setScenario(index); setStep(0); }}>{item.label}</button>)}
    </div>
    <ol className="inspector-stages" aria-label="Gateway inspection stages">
      {stages.map((label, index) => <li key={label} className={index === step ? "is-current" : index < step ? "is-complete" : ""}><button type="button" aria-current={index === step ? "step" : undefined} onClick={() => setStep(index)}><span>0{index + 1}</span>{label}</button></li>)}
    </ol>
    <div className="inspector-explanation" aria-live="polite" aria-atomic="true">
      <span className={`inspector-status ${step === 3 ? current.decision.toLowerCase() : ""}`}>{step === 3 ? `Illustrative outcome: ${current.decision}` : stages[step]}</span>
      <p>{descriptions[step]}</p>
    </div>
    <div className="inspector-controls"><button type="button" onClick={() => setStep(0)} disabled={step === 0}>Reset</button><button type="button" onClick={() => setStep(value => value + 1)} disabled={step === stages.length - 1}>Next step <span aria-hidden="true">→</span></button></div>
  </>;
}

const relationships = [
  { label: "Principal", heading: "Identity is the starting point", body: "Identify the caller before examining what its policies permit. A known identity can still be over-privileged.", risk: "Review wildcard grants and the scope of allowed actions." },
  { label: "AssumeRole", heading: "Inspect the trust relationship", body: "A role’s trust policy controls who may assume it. Inspect that relationship together with the applicable permissions.", risk: "A permissive trust relationship can extend access beyond the intended workload." },
  { label: "PassRole", heading: "Delegation creates another path", body: "Passing a role to a service is distinct from assuming that role. Inspect which roles can be passed and the permissions available through them.", risk: "Broad role delegation can contribute to a privilege-escalation path." },
  { label: "Boundary", heading: "Inspect the permission ceiling", body: "A permission boundary limits the identity permissions it applies to; it does not grant access by itself.", risk: "Review missing boundaries alongside grants and trust-policy weaknesses." },
] as const;

function IdentityInspector() {
  const [selected, setSelected] = useState(0);
  const relationship = relationships[selected];
  return <>
    <div className="identity-inspection-graph">
      <div className="identity-graph-links" aria-hidden="true"><svg viewBox="0 0 600 200" preserveAspectRatio="none"><path d="M80 100 230 40 440 100M80 100 230 160 440 100M440 100h90" /></svg></div>
      <div className="identity-graph-nodes" role="group" aria-label="Inspect an IAM relationship">{relationships.map((item, index) => <button type="button" key={item.label} className={`identity-inspect-node node-${index}`} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}</div>
    </div>
    <div className="inspector-explanation" aria-live="polite" aria-atomic="true"><h4>{relationship.heading}</h4><p>{relationship.body}</p><p className="inspector-risk"><span>Review question</span>{relationship.risk}</p></div>
    <p className="inspector-footnote">Conceptual relationships, not a live AWS permission evaluation. The project performs static policy analysis.</p>
  </>;
}

const inspections = [
  { title: "Artifact", detail: "Start with an untrusted repository or model artifact. Inspection happens without importing or running its code.", label: "Do not execute", formats: "Repository · model files" },
  { title: "Serialization", detail: "Inspect serialization and binary formats, including pickle opcodes and supported model formats. A format name alone does not establish trust.", label: "Inspect structure", formats: "SafeTensors · GGUF · ONNX · Keras · pickle-derived artifacts" },
  { title: "Code & origin", detail: "Combine AST/taint analysis with dependency, provenance, and obfuscation checks to surface risky behavior.", label: "Review signals", formats: "AST/taint · dependencies · provenance · obfuscation" },
  { title: "Evidence", detail: "Review findings together with the scanner’s test scope. A clean result is not proof that every possible threat is absent.", label: "Bound the conclusion", formats: "Findings · committed adversarial fixtures · benign samples" },
] as const;

function ArtifactInspector() {
  const [selected, setSelected] = useState(0);
  const inspection = inspections[selected];
  return <>
    <ol className="inspector-stages artifact-stages" aria-label="Model artifact inspection stages">{inspections.map((item, index) => <li key={item.title} className={selected === index ? "is-current" : ""}><button type="button" aria-current={selected === index ? "step" : undefined} onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.title}</button></li>)}</ol>
    <div className="artifact-inspection-detail" aria-live="polite" aria-atomic="true"><div className="artifact-inspection-object" aria-hidden="true"><span>MODEL</span><small>{String(selected + 1).padStart(2, "0")}</small></div><div className="inspector-explanation"><h4>{inspection.label}</h4><p>{inspection.detail}</p><p className="inspector-footnote">{inspection.formats}</p></div></div>
  </>;
}

export default function WorldInspector({ project }: { project: ProjectItem }) {
  return <section className={`world-inspector inspector-${project.id}`} aria-label={`${project.name} interactive explanation`}>
    <div className="inspector-heading"><h4>Inspect the system</h4><span>Illustrative walkthrough</span></div>
    <p className="inspector-intro">Explore the control logic. These examples explain the design; they do not run the project or report live results.</p>
    {project.id === "mcp" ? <GatewayInspector /> : project.id === "iam" ? <IdentityInspector /> : <ArtifactInspector />}
  </section>;
}

const eventTypes = [
  { label: "Policy decision", detail: "Connect an allow or deny decision to the control that produced it. Decision evidence helps explain what crossed the execution boundary." },
  { label: "Audit record", detail: "Tamper-evident audit logging supports review of the gateway’s decisions. Inspect records alongside the circumstances of the request." },
  { label: "Detection", detail: "Security telemetry supports incident analysis. Detection rules turn recorded signals into reviewable evidence within their tested scope." },
] as const;

export function TelemetryWorld() {
  const [selected, setSelected] = useState(0);
  const gateway = resume.projects.find(project => project.id === "mcp")!;
  return <section className="telemetry-world" id="telemetry" aria-labelledby="telemetry-title">
    <div className="telemetry-world-copy"><p className="world-label">WORLD 04 · Security Telemetry Grid</p><h2 id="telemetry-title">A decision should leave evidence.</h2><p>A security control that cannot explain its decisions is difficult to trust. Follow the connection between gateway enforcement, audit records, and security analysis.</p><a href={gateway.repository} target="_blank" rel="noopener noreferrer">Inspect the gateway repository <span aria-hidden="true">↗</span></a></div>
    <div className="world-inspector telemetry-inspector"><div className="inspector-heading"><h3>From control to review</h3><span>Illustrative flow · no live traffic</span></div><div className="telemetry-selector" role="group" aria-label="Inspect a telemetry concept">{eventTypes.map((event, index) => <button type="button" key={event.label} aria-pressed={index === selected} onClick={() => setSelected(index)}><span aria-hidden="true">0{index + 1}</span>{event.label}</button>)}</div><div className="inspector-explanation" aria-live="polite" aria-atomic="true"><h4>{eventTypes[selected].label}</h4><p>{eventTypes[selected].detail}</p></div><div className="telemetry-evidence"><span>Resume-reported evidence</span><p>{gateway.testing}</p></div></div>
  </section>;
}
