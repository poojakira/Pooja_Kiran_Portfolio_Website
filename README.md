# Pooja Kiran Portfolio Website

Pooja Kiran's canonical security-engineering portfolio, built with Next.js, React, TypeScript, and an on-demand Three.js environment. The canonical public URL is [GitHub Pages](https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/); other dashboard or preview sites are supporting evidence surfaces, not alternate professional homepages.

## Content and identity

`resume/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.tex` is the editable factual source for the one-page resume. Its generated `public/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf` is the only public resume PDF, and `src/data/resume.ts` mirrors the selected facts used by both portfolio views. Keep all three synchronized whenever verified evidence changes.

The three featured projects form one recruiter-facing security story: **Agent → Tool** (MCP Agent Security Gateway), **Identity → Authority** (AWS Agent Identity Guard), and **Artifact → Runtime** (HF Model Provenance Scanner). Project dates show the original development periods supplied by the maintainer; the current test counts, coverage, fixtures, and other metrics are later 2026 public-repository verification snapshots. The site does not imply that the present implementation or present metrics existed unchanged at the start of each project, and it does not claim production deployment, customer adoption, or universal attack detection.

`public/pooja-portrait.webp` is the supplied portrait. The scene does not replace Pooja's identity with an invented character.

## Two ways to explore

- **Recruiter view:** conventional HTML with projects, experience, skills, education, resume access, repository links, and contact information.
- **Explore view:** the three flagship projects form the core environments. Telemetry and research are conceptual environments built from the same resume content, rather than additional claimed projects. The Three.js scene loads on demand; essential content remains in the DOM and accessible when WebGL is unavailable.

Interactive gateway, identity, artifact, and telemetry illustrations run locally in the browser. Their scenarios explain concepts; they do not call project backends, inspect real uploaded artifacts, run live security scans, or report live security events. Reduced-motion preferences and a conventional recruiter interface provide alternatives to the cinematic presentation.

## Development and verification

Use Node.js 22, matching the GitHub Actions workflows, and Python 3 for the repository security scan.

```bash
npm ci
npm run dev
```

The development server uses the root path. Run the following checks before publishing:

```bash
npm run typecheck
npm run build
python3 scripts/security_scan.py
```

On Windows, `py scripts/security_scan.py` is an alternative if Python is installed through the Python launcher. A successful command only establishes the scope it checks; type checking and a production build do not replace browser checks for navigation, layout, keyboard access, reduced motion, WebGL failure, resume downloads, and external links. This README does not assert that a particular commit has passed those checks.

## Deployment

`npm run build` produces `out/` with the production base path `/Pooja_Kiran_Portfolio_Website`. Preview the exported files at that path when checking production URLs; serving them only at `/` will not reproduce the deployed asset paths.

`.github/workflows/deploy-pages.yml` builds and deploys pushes to `main` through GitHub Pages. CI, Security Hygiene, and Documentation Integrity run independently. The deployment workflow does not wait for every independent workflow, so check the actual run results for the commit before describing a release as verified. Repository Actions and the published URL provide the current deployment state.

## Security and configuration

This is a public static export with no login handlers, API routes, upload endpoints, or server-side authorization controls. React renders the tracked content as text. Local illustrations are not security enforcement services.

No owner API key or paid service is required. Never embed secrets in `src/`, `public/`, or `NEXT_PUBLIC_*` variables. Keep local `.env` files untracked; safe example templates may contain empty values or explicit placeholders only. If a future integration needs credentials, use your own environment or deployment secret store and keep secret-bearing operations off the public client.

Never commit tokens, cloud access keys, private keys, or populated credential files. If a credential is exposed, revoke or rotate it at the provider before removing it from files and reachable Git history. Removing a value from Git does not revoke it. The Security Hygiene workflow scans tracked files and reachable history for selected credential patterns without printing matched values; this does not guarantee detection of every secret format.

External links opened in a new tab use restrictive relationship attributes. A meta Content Security Policy provides the restrictions supported by this static host; response headers and platform-level controls are governed by GitHub Pages. Dependabot checks npm and GitHub Actions dependencies. Dependency advisories and workflow results should be reviewed for the current commit, rather than inferred from historical audit notes.


## Evidence refresh — 2026-10-04

The current resume/portfolio synchronization uses MCP Gateway **723 passing tests at 81.91% coverage**, AWS Agent Identity Guard **243 collected / 240 passed / 3 skipped**, and HF Model Provenance Scanner **241 passed / 1 skipped at 75.67% coverage**. These are bounded repository verification results, not customer-deployment or universal security-effectiveness claims.

The embedded project poster images are pinned to the regenerated evidence artifacts from MCP Gateway commit `d936cadde0ff4e0fb322c6600638b387b1c39d09`, AWS Agent Identity Guard commit `51916ac3d381579c78112233911827217304022a`, and HF Model Provenance Scanner commit `dec0c68ceb9167c7e9b4b439b1bfd006beb5c148`.

The canonical public resume PDF is rebuilt from the tracked LaTeX source and the build gate verifies the current project metrics before synchronization. The generated artifact is accepted only after the one-page and current-metric checks pass.


## Recruiter evidence paths

- **MCP application-security case study:** https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/APPSEC_CASE_STUDY.md
- **MCP white-box AppSec assessment:** https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/APPSEC_ASSESSMENT_2026-10-05.md
- **Dataset API white-box AppSec assessment:** https://github.com/poojakira/dataset-poisoning-detector/blob/main/docs/APPSEC_ASSESSMENT_2026-10-05.md
- **MCP 60-second recruiter demo guide:** https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/RECRUITER_DEMO_60S.md

These are owner-authorized, repository-backed assessments and demonstrations. They are not presented as independent third-party penetration tests.


The portfolio presents this ASU Generative AI learning-assistant initiative as academic/student participation, explicitly separate from employment, internship, and research-service appointments.

## Recruiting evidence audit (2026-10-09)

See [the bounded recruiting evidence audit](docs/RECRUITER_EVIDENCE_AUDIT_2026-10-09.md) for current dated verification, test-scope limitations and unsupported impact claims.
