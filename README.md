# Pooja Kiran — AI Security Engineer · Interactive Portfolio

Live: https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/

A static, keyless, evidence-linked interactive experience. It is the runtime companion to the
GitHub profile README (the gateway): the profile points here, and this app does what GitHub
Pages markdown cannot — grounded Q&A, voice, diagrams, threat models, and safe demos.

## What it does

- **Ask my AI** — a deterministic, client-side retrieval assistant grounded in a provenance-aware
  knowledge base. Every substantive answer links its sources, offers a "Prove it" jump to the
  project detail, and says *"I can't verify that from the available evidence"* rather than guessing.
- **Talk to me** — voice interaction via the Web Speech API with listening / thinking / speaking
  states, transcript, captions, mute, retry, keyboard access, and a graceful text fallback.
  Nothing autoplays; no credentials touch the browser.
- **Engineering Atlas** — the projects as one trajectory across the AI trust boundary, not a repo list.
- **Flagship project explorer** — progressive disclosure into problem, threat model, architecture &
  data flow, controls, testing, results, tradeoffs, limitations, framework mappings, and source evidence.
- **Safe demos** — an MCP tool-call inspector, an IAM policy analyzer, and a prompt-injection signal
  check. All deterministic and local: no code execution, no network, no credentials, no cloud actions.
- **Audience modes** — Explore / Founder / Security / Researcher / Recruiter change depth and order, not facts.
- **Résumé, timeline, education, publications, stack, philosophy** — all rendered from the same source of truth.

## Architecture

Vanilla HTML + CSS + ES modules, no build step. See `ARCHITECTURE.md` for the chosen defaults.

| File | Role |
| :--- | :--- |
| `index.html` | Semantic structure, hero + 3 CTAs, mounts, Ask/Talk dialogs, strict CSP |
| `styles.css` | Design system + all component styles (responsive, reduced-motion, print) |
| `data/knowledge.json` | **Single source of truth.** Identity, projects, evidence, resume, FAQ, modes |
| `retrieval.js` | Pure retrieval core + demo analyzers (imported by the app and the tests) |
| `assistant.js` | Ask my AI + Talk to me controllers, observability hook |
| `demos.js` | Wiring for the three safe local demos |
| `main.js` | Nav, reveal, audience modes, and rendering of atlas/projects/resume/etc. |
| `tests/run.mjs` | Dependency-free test suite |

The deterministic assistant is the permanent, safe fallback. An optional hosted-LLM backend is
defined only as a boundary (`assistant.backend`, default `null`) — if ever added, it is a
server-side enhancement and no secret ships to the browser.

## Adding verified professional (LinkedIn) content later

LinkedIn is not scraped. When verified content is supplied, add it under
`professional_ingestion` in `data/knowledge.json` (set `status: "supplied"` and append `items`).
The résumé and assistant pick it up automatically — no code changes.

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Tests

```bash
npm test        # node tests/run.mjs — 31 checks, no dependencies
npm run check   # JSON validity + tests
```

## Security posture

- Strict CSP (`default-src 'self'`; `script-src 'self'`; no inline handlers; `connect-src 'self'`).
- No analytics, trackers, remote fonts, or third-party frontend dependencies.
- All dynamic text inserted via `textContent` / safe DOM builders — retrieved text and user input
  are treated as untrusted data and can never inject markup or be executed as instructions.
- Microphone only on explicit user gesture; permission-denied, unsupported, offline, and
  knowledge-load-failure states are all handled.
- No credentials anywhere. See `SECURITY_AUDIT.md`.
