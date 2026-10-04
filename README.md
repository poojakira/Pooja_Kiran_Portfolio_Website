# Pooja Kiran Portfolio Website

Pooja Kiran's security engineering portfolio, built with Next.js, React, TypeScript, and an on-demand Three.js environment. The site is exported as static files for [GitHub Pages](https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/).

## Content and identity

`resume/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.tex` is the editable factual source for the one-page resume. Its generated `public/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf` is the only public resume PDF, and `src/data/resume.ts` mirrors the selected facts used by both portfolio views. Keep all three synchronized whenever verified evidence changes.

The three featured projects are MCP Agent Security Gateway, AWS Agent Identity Guard, and HF Model Provenance Scanner. Test counts, coverage, dates, and verification boundaries are evidence-backed resume snapshots tied to the cited repository state; they are not universal production measurements. The site does not claim production deployment, customer adoption, or universal attack detection.

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


## Evidence refresh — 2026-10-03

The current resume/portfolio synchronization uses MCP Gateway **718 passing tests at 82.46% coverage**, AWS Agent Identity Guard **235 passed with 3 credential-dependent skips**, and HF Model Provenance Scanner **241 passed / 1 skipped plus 6 subtests at 75.81% coverage**. These are bounded repository verification results, not customer-deployment or universal security-effectiveness claims.
