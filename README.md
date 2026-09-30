# Pooja Kiran Portfolio Website

Production portfolio for Pooja Kiran, built as a static-exported Next.js site for GitHub Pages.

## Single content source

`public/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf` is the canonical resume artifact. The site renders from `src/data/resume.ts`, a structured mirror of the facts selected from that PDF; the browser does not parse the PDF at runtime.

When the resume changes, `src/data/resume.ts` must be reconciled with the PDF in the same update. The site intentionally does not import biography or metrics from older portfolio files or prior resume versions.

## Experience modes

- **Recruiter view:** fast DOM-first scan of experience, projects, evidence, skills, education, resume, and contact.
- **Explore mode:** cinematic security interface with a procedural Three.js environment plus the same resume-backed content.

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

The static export is written to `out/`. The GitHub Pages workflow deploys from `main`.

<!-- repo-verification:start -->
## Verification update — 2026-09-30

- **Scope:** Account-wide `poojakira` repository pass covering source/configuration, CI/release workflows, security-hygiene gates, dependency/SAST controls, and documentation consistency.
- **Remediation:** Reviewed build/deploy/security workflows and documentation consistency; no repository-controlled defect required a code change in this pass.
- **Verification state:** CI, Security Hygiene, Documentation Integrity, and GitHub Pages deployment completed successfully on the latest verified main-branch run.
- **Security note:** Portfolio claims should remain tied to repository/test evidence and should not imply customer deployment or production usage unless separately evidenced.
- **Evidence boundary:** This update records repository and GitHub Actions evidence observed during the pass. It is not a claim of independent penetration testing, production deployment, or zero residual risk.
<!-- repo-verification:end -->

## Verification checkpoint — 2026-09-30

- **Snapshot commit:** `8feea92f80ef5f2b5f129a27422bd189f66cd288`
- **Status:** VERIFIED GREEN
- **Evidence:** Documentation Integrity, Security Hygiene, CI, and GitHub Pages deployment all completed successfully on the current main revision.
- This checkpoint is intentionally date-bounded. It does not claim zero vulnerabilities or universal production readiness.


## Secret handling

Keep runtime credentials outside Git. If this repository provides an `.env.example` or `.env.sample`, copy it to a local `.env` or `.env.local` and fill in values locally; the real environment file must remain untracked.

Do not commit AWS access keys or session credentials, API tokens, service-account JSON, private keys, package-manager credentials, Terraform state, or secret-bearing `tfvars`. CI/deployment credentials belong in GitHub Actions secrets or the deployment provider's secret manager. AWS account IDs are identifiers; AWS access-key IDs, secret access keys, and session tokens are credentials.

If a real credential is ever exposed, revoke or rotate it at the provider first, then remove it from the working tree and reachable Git history. The Security Hygiene workflow checks the current tree and reachable history for common credential formats without printing matched secret values.


## Security review scope — 2026-09-30

This is a public static export: there are no repository API routes, login handlers, server-side authorization decisions, or upload endpoints. React renders the tracked content as text; secrets must never be embedded in `src/`, `public/`, or any `NEXT_PUBLIC_*` variable. Rate limiting and response headers on GitHub Pages are hosting controls, not Next.js API middleware in this export.

The dependency lockfile makes CI installation repeatable (`npm ci`). Read-only workflows disable persisted checkout credentials; the resume generation workflow retains credentials because it explicitly commits its generated PDF. Verification: TypeScript check and static production build passed; npm audit reported zero known vulnerabilities in the installed dependency graph on this date. This is a dated advisory result, not a guarantee that dependencies contain no vulnerabilities.

Local `.env` and `.env.*` files are ignored; permitted example/sample templates must contain only empty values or explicit placeholders. This static repository requires no owner API key, AWS credential, or shared dashboard key. Keep credentials in your own deployment secret store; anything included in public website/profile content is public.
