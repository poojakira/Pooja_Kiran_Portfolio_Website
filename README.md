# Pooja Kiran Bharadwaj — AI Security Engineering Portfolio

A cinematic, 3D portfolio built around a hard-audited set of open-source AI-security
projects. It presents the work as an **interactive AI security research lab**, not a
generic developer portfolio.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
**React Three Fiber / three.js**, **GSAP**, and **Lenis** smooth scroll.

---

## The idea

> AI stops being a prediction problem and becomes a security problem the moment it can act.

The site is organized around the boundary where an AI system stops predicting and
starts acting on real infrastructure — calling tools over MCP, assuming IAM roles,
and loading model weights. Three principles run through the flagship work:

- **Capability ≠ Permission** → MCP Agent Security Gateway
- **Permission ≠ Provenance** → HF Model Provenance Scanner
- **Identity ≠ Authorization** → AWS Agent Identity Guard

Every claim on the site is grounded in the actual repositories at
[github.com/poojakira](https://github.com/poojakira). The data model lives in
`src/data/projects.ts` (the "Portfolio Truth Table") and `src/data/content.ts`.

## Structure

```
Hero        → SecurityCore 3D object + positioning (who builds the system?)
Systems     → four verified system categories (what is inside it?)
Flagships   → Tier-S project worlds with per-project architecture flow + threat model
Lab         → "Capability ≠ Permission" interactive least-privilege demo
Research    → Tier-A red-team / ML-security work + Tier-B engineering archive
About       → verified background timeline + engineering philosophy
Contact     → roles open to
```

### Curation (why only some projects appear)

Projects are tiered by an internal editorial ranking. Only the strongest,
fully-verifiable work receives prominence:

- **Tier S (flagship):** `mcp-agent-security-gateway`, `aws-agent-identity-guard`, `hf-model-provenance-scanner`
- **Tier A (supporting):** `llm-redteam-framework`, `model-privacy-attacks`, `dataset-poisoning-detector`, `adversarial-ml-lab`
- **Tier B (archive):** `attack-v19-core`, `PulseNet-RUL-Forecasting`

Aggregation/dashboard workspaces are intentionally omitted to keep the portfolio focused.

## 3D system

Custom, meaningful geometry — not decorative particles:

- `SecurityCore` — inner faceted core (the intelligent system) inside a wireframe
  boundary shell, with data pulses inspected as they cross the perimeter.
- `CameraRig` — scroll- and pointer-driven narrative camera.
- `ArchitectureFlow` — per-project animated control-flow diagram with the security
  boundary drawn explicitly.

Performance & accessibility: DPR is adaptive by device tier, 3D is a lazy
`next/dynamic` import (kept out of the initial bundle), and everything degrades
gracefully under `prefers-reduced-motion` and on low-end devices. The site is fully
understandable without any 3D.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run type-check # tsc --noEmit
```

## Honesty

These are research and portfolio projects — functional, tested, and open-source, but
not hardened for enterprise scale. Each project's own documented limitations are
surfaced on the site rather than hidden.
