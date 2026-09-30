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
npm install
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
