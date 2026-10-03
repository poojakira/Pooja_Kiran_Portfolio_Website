# Pooja Kiran Portfolio Website

Production portfolio for Pooja Kiran, built as a static-exported Next.js site for GitHub Pages.

## Single content source

`resume/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.tex` is the editable resume source of truth, and `public/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf` is the single canonical public resume PDF. The site renders from `src/data/resume.ts`, a structured mirror of the facts selected from that PDF; the browser does not parse the PDF at runtime.

When the resume changes, `src/data/resume.ts` must be reconciled with the PDF in the same update. The site intentionally does not import biography or metrics from older portfolio files or prior resume versions.

## Portfolio experience

- **Recruiter-first:** fast, static DOM rendering of experience, projects, evidence, skills, education, resume, and contact.
- **Nine security environments:** dedicated sections for agent runtime security, cloud identity, model supply-chain security, training-data integrity, LLM red teaming, adversarial ML, detection engineering, AEROSEC strategy, and reproducibility.
- **No runtime 3D engine:** the production site uses lightweight semantic HTML/CSS security diagrams instead of WebGL/Three.js, reducing bundle size and avoiding animation-heavy interaction while keeping the evidence hierarchy readable on desktop and mobile.

## Verification update - 2026-10-01

- Production TypeScript check passed with `npm run typecheck`.
- Static Next.js production export passed with `npm run build`.
- Repository security-control scan passed with `py scripts/security_scan.py`.
- The canonical one-page resume is `public/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf`, and the site data mirrors its four selected projects.
- Current portfolio evidence references an account-wide audit snapshot: GitHub reports protected `main` branches across 19 repositories; the cited sweep recorded zero Gitleaks findings, zero broken relative Markdown links, and 10 poster verifications. Required status checks are not uniformly enforced across the fleet, so this is not an account-wide mandatory-CI merge-gate claim.
- These are repository/evidence checks, not claims of production deployment, universal security efficacy, or zero residual risk.

## Local development

```bash
npm ci
npm run typecheck
npm run dev
```

## Production

```bash
npm run build
```

The static export is written to `out/`. The GitHub Pages workflow deploys automatically from `main`; CI, Security Hygiene, and Documentation Integrity also run on public `main`/pull-request changes.

<!-- repo-verification:start -->
## Verification update — 2026-09-30

- **Scope:** Account-wide `poojakira` repository pass covering source/configuration, CI/release workflows, security-hygiene gates, dependency/SAST controls, and documentation consistency.
- **Remediation:** Reviewed build/deploy/security workflows and documentation consistency; no repository-controlled defect required a code change in this pass.
- **Verification state:** CI, Security Hygiene, Documentation Integrity, and GitHub Pages deployment completed successfully on the latest verified main-branch run.
- **Security note:** Portfolio claims should remain tied to repository/test evidence and should not imply customer deployment or production usage unless separately evidenced.
- **Evidence boundary:** This update records repository and GitHub Actions evidence observed during the pass. It is not a claim of independent penetration testing, production deployment, or zero residual risk.
<!-- repo-verification:end -->

## Verification checkpoint — 2026-09-30

- **Checked snapshot:** `9da16b249c4d385bdcf8ff4b3fd167aa69adb60c`
- **Status:** VERIFIED GREEN
- **Evidence:** CI, Security Hygiene, Documentation Integrity, resume build, and GitHub Pages deployment completed successfully for the cited checked snapshot.
- This record is immutable and date-bounded. Later `main` commits may be newer; consult GitHub Actions for the latest run state. It does not claim zero vulnerabilities or universal production readiness.


## Secret handling

Keep runtime credentials outside Git. If this repository provides an `.env.example` or `.env.sample`, copy it to a local `.env` or `.env.local` and fill in values locally; the real environment file must remain untracked.

Do not commit AWS access keys or session credentials, API tokens, service-account JSON, private keys, package-manager credentials, Terraform state, or secret-bearing `tfvars`. CI/deployment credentials belong in GitHub Actions secrets or the deployment provider's secret manager. AWS account IDs are identifiers; AWS access-key IDs, secret access keys, and session tokens are credentials.

If a real credential is ever exposed, revoke or rotate it at the provider first, then remove it from the working tree and reachable Git history. The Security Hygiene workflow checks the current tree and reachable history for common credential formats without printing matched secret values.


## Security review scope — 2026-09-30

This is a public static export: there are no repository API routes, login handlers, server-side authorization decisions, or upload endpoints. React renders the tracked content as text; secrets must never be embedded in `src/`, `public/`, or any `NEXT_PUBLIC_*` variable. Rate limiting and response headers on GitHub Pages are hosting controls, not Next.js API middleware in this export.

The dependency lockfile makes CI installation repeatable (`npm ci`). Read-only workflows disable persisted checkout credentials; the resume generation workflow retains credentials because it explicitly commits its generated PDF. Verification: TypeScript check and static production build passed; npm audit reported zero known vulnerabilities in the installed dependency graph on this date. This is a dated advisory result, not a guarantee that dependencies contain no vulnerabilities.

Local `.env` and `.env.*` files are ignored; permitted example/sample templates must contain only empty values or explicit placeholders. This static repository requires no owner API key, AWS credential, or shared dashboard key. Keep credentials in your own deployment secret store; anything included in public website/profile content is public.

<!-- security-local-config:start -->
## Secrets and local configuration

- Never commit real API keys, access tokens, passwords, cloud credentials, private keys, or a populated `.env` file.
- Local `.env` and `.env.*` files are ignored by Git. Only safe templates such as `.env.example` or `.env.sample` may be committed, and they must contain placeholder or empty values only.
- If an integration needs credentials, create your own local `.env` file (or use your shell/secret manager) and supply **your own** API key. In GitHub Actions, use repository/environment secrets rather than hard-coding values in workflow YAML.
- Do not copy or reuse any credential that appears in repository history, examples, tests, screenshots, logs, or documentation. Test strings are not intended to be usable credentials.
- If a real credential is ever committed, **revoke or rotate it at the credential provider first**, then remove it from the current tree and reachable Git history. Deleting a key from GitHub does not revoke it.
<!-- security-local-config:end -->
