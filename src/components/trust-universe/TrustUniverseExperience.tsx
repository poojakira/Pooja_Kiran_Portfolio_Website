"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  guidedRoute,
  type UniverseWorldId,
  universeWorldMap,
  universeWorlds,
} from "@/data/trustUniverse";
import { experience, profile, projects, RESUME_URL, skillGroups } from "@/data/portfolio";
import { CONTROL_EVENT } from "@/components/trust-universe/TrustUniverseCanvas";

const TrustUniverseCanvas = dynamic(
  () => import("@/components/trust-universe/TrustUniverseCanvas"),
  { ssr: false },
);

type ExperienceMode = "explore" | "guided" | "recruiter" | "engineering";
type TravelMode = "foot" | "vehicle";

const SESSION_KEY = "pooja-trust-universe-visited";

function readVisited() {
  if (typeof window === "undefined") return new Set<UniverseWorldId>();
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return new Set<UniverseWorldId>((raw ? JSON.parse(raw) : []) as UniverseWorldId[]);
  } catch {
    return new Set<UniverseWorldId>();
  }
}

function writeVisited(visited: Set<UniverseWorldId>) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify([...visited]));
}

export default function TrustUniverseExperience() {
  const [mode, setMode] = useState<ExperienceMode>("explore");
  const [currentWorld, setCurrentWorld] = useState<UniverseWorldId>("trust");
  const [destination, setDestination] = useState<UniverseWorldId | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>("foot");
  const [mapOpen, setMapOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [briefingWorld, setBriefingWorld] = useState<UniverseWorldId | null>("trust");
  const [inspectWorld, setInspectWorld] = useState<UniverseWorldId | null>(null);
  const [visited, setVisited] = useState<Set<UniverseWorldId>>(new Set());
  const [guidedIndex, setGuidedIndex] = useState(0);
  const [askText, setAskText] = useState("");
  const [systemAnswer, setSystemAnswer] = useState("");
  const [quality, setQuality] = useState<"balanced" | "lite">("balanced");
  const askInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setVisited(readVisited());
    const lowPower =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 760 ||
      navigator.hardwareConcurrency <= 4;
    if (lowPower) setQuality("lite");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName ?? "")) {
        if (event.key === "Escape") {
          setAskOpen(false);
          setMapOpen(false);
          setQuickOpen(false);
          setInspectWorld(null);
        }
        return;
      }

      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        setMapOpen((value) => !value);
      }

      if (event.key === "/") {
        event.preventDefault();
        setAskOpen(true);
        window.setTimeout(() => askInput.current?.focus(), 30);
      }

      if (event.key === "Escape") {
        setMapOpen(false);
        setQuickOpen(false);
        setAskOpen(false);
        setInspectWorld(null);
        if (mode === "recruiter" || mode === "engineering") setMode("explore");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  const world = universeWorldMap[currentWorld];

  const markVisited = (id: UniverseWorldId) => {
    setVisited((previous) => {
      const next = new Set(previous);
      next.add(id);
      writeVisited(next);
      return next;
    });
  };

  const enterWorld = (id: UniverseWorldId) => {
    setCurrentWorld(id);
    setDestination(null);

    if (!visited.has(id)) {
      setBriefingWorld(id);
      markVisited(id);
    }

    if (mode === "guided") {
      const index = guidedRoute.indexOf(id);
      if (index >= 0) setGuidedIndex(index);
    }
  };

  const travelTo = (id: UniverseWorldId, useAutopilot = true) => {
    setMapOpen(false);
    setInspectWorld(null);

    if (id === currentWorld) {
      if (!visited.has(id)) {
        setBriefingWorld(id);
        markVisited(id);
      }
      return;
    }

    if (useAutopilot) {
      setDestination(id);
      if (travelMode === "foot") setTravelMode("vehicle");
    } else {
      setDestination(id);
    }
  };

  const runAsk = () => {
    const q = askText.trim().toLowerCase();
    if (!q) return;

    const routeByWords: Array<[string[], UniverseWorldId]> = [
      [["agent", "mcp", "tool", "strongest project"], "agent"],
      [["iam", "identity", "permission", "role"], "identity"],
      [["model", "provenance", "hugging", "artifact"], "model"],
      [["runtime", "container", "isolation", "process"], "runtime"],
      [["telemetry", "siem", "detection", "logs", "testing evidence"], "telemetry"],
      [["cloud", "infrastructure", "network"], "cloud"],
      [["source", "code", "engineering", "evidence", "github"], "vault"],
      [["nexus", "everything", "trust architecture"], "nexus"],
      [["home", "district", "hub"], "trust"],
    ];

    const match = routeByWords.find(([words]) => words.some((word) => q.includes(word)));

    if (q.includes("recruiter")) {
      setMode("recruiter");
      setSystemAnswer("Opening Recruiter Mode: strongest work, verified evidence, resume and contact.");
      return;
    }

    if (q.includes("engineering mode") || q.includes("technical")) {
      setMode("engineering");
      setSystemAnswer("Opening Engineering Mode: controls, evidence, limitations and repository links.");
      return;
    }

    if (match) {
      const target = match[1];
      setSystemAnswer(
        `Routing to ${universeWorldMap[target].shortName}. The system will use the physical route rather than a page jump.`,
      );
      travelTo(target, true);
      return;
    }

    setSystemAnswer(
      "I can navigate to agent security, IAM/identity, model provenance, runtime, telemetry, cloud, the Engineering Vault or Trust Nexus. You can also ask for Recruiter Mode or Engineering Mode.",
    );
  };

  const nextGuided = () => {
    const nextIndex = Math.min(guidedRoute.length - 1, guidedIndex + 1);
    setGuidedIndex(nextIndex);
    travelTo(guidedRoute[nextIndex], true);
  };

  const previousGuided = () => {
    const nextIndex = Math.max(0, guidedIndex - 1);
    setGuidedIndex(nextIndex);
    travelTo(guidedRoute[nextIndex], true);
  };

  const dispatchControl = (key: string) => {
    window.dispatchEvent(new CustomEvent(CONTROL_EVENT, { detail: { key } }));
  };

  const visitedCount = visited.size;
  const briefing = briefingWorld ? universeWorldMap[briefingWorld] : null;
  const inspection = inspectWorld ? universeWorldMap[inspectWorld] : null;

  const worldStatus = useMemo(
    () =>
      universeWorlds.map((item) => ({
        ...item,
        state:
          item.id === currentWorld ? "current" :
          visited.has(item.id) ? "visited" : "available",
      })),
    [currentWorld, visited],
  );

  return (
    <main className="trust-universe-shell">
      <section className="trust-universe-viewport" aria-label="Pooja Kiran Trust Universe">
        <div className="trust-universe-canvas">
          <TrustUniverseCanvas
            currentWorld={currentWorld}
            destination={destination}
            travelMode={travelMode}
            quality={quality}
            onEnterWorld={enterWorld}
            onInspectWorld={setInspectWorld}
            onTravelModeChange={setTravelMode}
            onAutopilotComplete={() => setDestination(null)}
          />
        </div>

        <header className="universe-header">
          <div className="universe-brand">
            <strong>POOJA // THE TRUST UNIVERSE</strong>
            <span>SECURING THE INFRASTRUCTURE BETWEEN INTELLIGENCE AND ACTION</span>
          </div>

          <nav aria-label="Experience modes">
            {(["explore", "guided", "recruiter", "engineering"] as ExperienceMode[]).map((item) => (
              <button
                key={item}
                className={mode === item ? "active" : ""}
                onClick={() => {
                  setMode(item);
                  setMapOpen(false);
                  if (item === "guided") {
                    setGuidedIndex(Math.max(0, guidedRoute.indexOf(currentWorld)));
                  }
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <button className="quick-access-button" onClick={() => setQuickOpen(true)}>
            Quick Access
          </button>
        </header>

        {(mode === "explore" || mode === "guided") && (
          <>
            <div className="world-location">
              <span>{world.code}</span>
              <div>
                <strong>{world.name}</strong>
                <small>{world.route}</small>
              </div>
            </div>

            <div className="world-thesis">
              <p>{world.thesis}</p>
              <span>{travelMode === "vehicle" ? "VEHICLE" : "ON FOOT"} · {quality.toUpperCase()}</span>
            </div>

            <div className="universe-actions">
              <button id="universe-look-button">Mouse look</button>
              <button onClick={() => setMapOpen(true)}>M · World map</button>
              <button onClick={() => setAskOpen(true)}>/ · Ask the System</button>
              <button onClick={() => setInspectWorld(currentWorld)}>F · Inspect</button>
            </div>

            <div className="universe-movement" aria-label="Movement controls">
              <button onClick={() => dispatchControl("w")}>W</button>
              <div>
                <button onClick={() => dispatchControl("a")}>A</button>
                <button onClick={() => dispatchControl("s")}>S</button>
                <button onClick={() => dispatchControl("d")}>D</button>
              </div>
            </div>

            {mode === "guided" && (
              <div className="guided-control">
                <span>GUIDED JOURNEY</span>
                <strong>{guidedIndex + 1} / {guidedRoute.length}</strong>
                <div>
                  <button onClick={previousGuided} disabled={guidedIndex === 0}>Previous</button>
                  <button onClick={() => setMode("explore")}>Return to Explore</button>
                  <button onClick={nextGuided} disabled={guidedIndex === guidedRoute.length - 1}>Next</button>
                </div>
              </div>
            )}

            <div className="universe-statusbar">
              <span>{visitedCount} / {universeWorlds.length} visited</span>
              <span>{destination ? `AUTOPILOT → ${universeWorldMap[destination].shortName}` : "FREE EXPLORE"}</span>
              <span>WASD · SHIFT · E · F · M · /</span>
            </div>
          </>
        )}

        {mapOpen && (
          <div className="world-map-overlay" role="dialog" aria-modal="true" aria-label="Trust Universe world map">
            <div className="world-map-head">
              <div>
                <span>NAVIGATION</span>
                <h2>Trust Universe Map</h2>
                <p>Choose any domain. There is no required order.</p>
              </div>
              <button onClick={() => setMapOpen(false)}>Close</button>
            </div>

            <div className="world-map-grid">
              {worldStatus.map((item) => (
                <button
                  key={item.id}
                  className={`world-map-node ${item.state}`}
                  onClick={() => travelTo(item.id, true)}
                >
                  <span>{item.code}</span>
                  <strong>{item.shortName}</strong>
                  <small>{item.state}</small>
                </button>
              ))}
            </div>

            <div className="world-map-footer">
              <span>FAST TRAVEL uses the gray-box autopilot route.</span>
              <button onClick={() => setTravelMode((value) => value === "vehicle" ? "foot" : "vehicle")}>
                {travelMode === "vehicle" ? "Exit Vehicle" : "Call / Enter Vehicle"}
              </button>
            </div>
          </div>
        )}

        {briefing && (
          <div className={`world-briefing briefing-${briefing.tone}`} role="dialog" aria-modal="true">
            <div className="briefing-code">{briefing.code}</div>
            <div className="briefing-copy">
              <span>WORLD ENTRY</span>
              <h2>{briefing.name}</h2>
              <blockquote>{briefing.thesis}</blockquote>

              <div className="briefing-columns">
                <div>
                  <small>PROBLEM</small>
                  <p>{briefing.problem}</p>
                </div>
                <div>
                  <small>POOJA BUILT</small>
                  <p>{briefing.built}</p>
                </div>
                <div>
                  <small>WHY IT MATTERS</small>
                  <p>{briefing.why}</p>
                </div>
              </div>

              <div className="briefing-actions">
                <button onClick={() => setBriefingWorld(null)}>Enter World</button>
                <button onClick={() => { setInspectWorld(briefing.id); setBriefingWorld(null); }}>View Engineering</button>
                <button onClick={() => { setAskText(`Explain ${briefing.shortName}`); setAskOpen(true); setBriefingWorld(null); }}>Ask About This</button>
                <button onClick={() => setBriefingWorld(null)}>Skip Briefing</button>
              </div>
            </div>
          </div>
        )}

        {inspection && (
          <div className="engineering-inspector" role="dialog" aria-modal="true">
            <div className="inspector-head">
              <div>
                <span>{inspection.code} · EVIDENCE</span>
                <h2>{inspection.name}</h2>
              </div>
              <button onClick={() => setInspectWorld(null)}>Close</button>
            </div>
            <p className="inspection-thesis">{inspection.thesis}</p>
            <div className="inspection-body">
              <section><small>CONTROL STORY</small><p>{inspection.built}</p></section>
              <section><small>EVIDENCE</small><ul>{inspection.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
              {inspection.limitation && <section><small>LIMITATION</small><p>{inspection.limitation}</p></section>}
            </div>
            {["agent", "identity", "model"].includes(inspection.id) && (
              <a
                href={`${profile.github}/${
                  inspection.id === "agent"
                    ? "mcp-agent-security-gateway"
                    : inspection.id === "identity"
                      ? "aws-agent-identity-guard"
                      : "hf-model-provenance-scanner"
                }`}
                target="_blank"
                rel="noreferrer"
              >
                Open repository ↗
              </a>
            )}
          </div>
        )}

        {askOpen && (
          <div className="ask-system-panel" role="dialog" aria-modal="true">
            <div>
              <span>ASK THE SYSTEM</span>
              <button onClick={() => setAskOpen(false)}>Esc</button>
            </div>
            <h2>Where do you want to go?</h2>
            <p>Try “show IAM,” “take me to the strongest project,” “show source code,” or “open Recruiter Mode.”</p>
            <form onSubmit={(event) => { event.preventDefault(); runAsk(); }}>
              <input
                ref={askInput}
                value={askText}
                onChange={(event) => setAskText(event.target.value)}
                placeholder="Ask or navigate…"
              />
              <button type="submit">Go</button>
            </form>
            {systemAnswer && <div className="system-answer">{systemAnswer}</div>}
          </div>
        )}

        {quickOpen && (
          <div className="quick-access-panel" role="dialog" aria-modal="true">
            <div className="quick-access-head">
              <span>QUICK ACCESS</span>
              <button onClick={() => setQuickOpen(false)}>Close</button>
            </div>
            <button onClick={() => { setMode("recruiter"); setQuickOpen(false); }}>About / Recruiter View</button>
            <button onClick={() => { setMode("engineering"); setQuickOpen(false); }}>Top Engineering Work</button>
            <a href={RESUME_URL} download>Resume ↓</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={`mailto:${profile.email}`}>Contact ↗</a>
            <button onClick={() => { setMapOpen(true); setQuickOpen(false); }}>World Map</button>
          </div>
        )}

        {mode === "recruiter" && (
          <section className="mode-surface recruiter-surface" aria-label="Recruiter Mode">
            <div className="mode-toolbar">
              <div><span>RECRUITER MODE</span><strong>Pooja Kiran · Security Engineer</strong></div>
              <button onClick={() => setMode("explore")}>Enter World</button>
            </div>

            <div className="recruiter-hero">
              <div>
                <p>AI SECURITY · CLOUD IDENTITY · DETECTION ENGINEERING</p>
                <h1>Build the boundary. Test the boundary. Show the evidence.</h1>
              </div>
              <div className="recruiter-links">
                <a href={RESUME_URL} download>Resume ↓</a>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            </div>

            <div className="recruiter-metrics">
              <article><strong>1,058</strong><span>documented passing tests across three flagship systems</span></article>
              <article><strong>55</strong><span>prompt-injection patterns in MCP gateway evidence</span></article>
              <article><strong>25</strong><span>deterministic IAM rule IDs</span></article>
            </div>

            <div className="recruiter-projects">
              {projects.map((project) => (
                <article key={project.repository}>
                  <span>{project.number} · {project.category}</span>
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <div>{project.metrics.map((metric) => <small key={metric}>{metric}</small>)}</div>
                  <a href={`${profile.github}/${project.repository}`} target="_blank" rel="noreferrer">Inspect repository ↗</a>
                </article>
              ))}
            </div>

            <div className="recruiter-bottom">
              <section>
                <span>EXPERIENCE</span>
                {experience.map((item) => (
                  <div key={item.role}><strong>{item.role}</strong><small>{item.period} · {item.organization}</small></div>
                ))}
              </section>
              <section>
                <span>CONTACT</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <p>Tempe, Arizona · Open to U.S. relocation</p>
                <p>F-1 OPT work authorization · Future sponsorship required</p>
              </section>
            </div>
          </section>
        )}

        {mode === "engineering" && (
          <section className="mode-surface engineering-surface" aria-label="Engineering Mode">
            <div className="mode-toolbar">
              <div><span>ENGINEERING MODE</span><strong>Evidence before aesthetics.</strong></div>
              <button onClick={() => setMode("explore")}>Return to World</button>
            </div>

            <div className="engineering-grid">
              {projects.map((project) => (
                <article key={project.repository}>
                  <div className="engineering-title">
                    <span>{project.number}</span>
                    <div><h2>{project.title}</h2><small>{project.category}</small></div>
                  </div>
                  <dl>
                    <div><dt>CONTROL</dt><dd>{project.controls}</dd></div>
                    <div><dt>VALIDATION</dt><dd>{project.evidence}</dd></div>
                    <div><dt>LIMITATIONS</dt><dd>{project.scope}</dd></div>
                  </dl>
                  <div className="engineering-metrics">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                  <a href={`${profile.github}/${project.repository}`} target="_blank" rel="noreferrer">Source / tests / CI ↗</a>
                </article>
              ))}
            </div>

            <div className="engineering-skills">
              {skillGroups.map((group) => (
                <section key={group.title}><strong>{group.title}</strong><p>{group.items.join(" · ")}</p></section>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
