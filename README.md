> **READ THIS LICENSE BEFORE COPYING, USING, OR MODIFYING ANY MATERIAL.** This repository's owner-controlled original content is proprietary and **All Rights Reserved**. There is no permission to copy, modify, distribute, or reuse it without prior written authorization, subject to existing third-party rights, any prior valid licenses, GitHub's Terms, and applicable law. See [LICENSE](LICENSE).

# Pooja Kiran Portfolio Website

Pooja Kiran's canonical software developer portfolio, built with Next.js, React, TypeScript, and an on-demand Three.js environment. The canonical public URL is [GitHub Pages](https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/); other dashboard or preview sites are supporting evidence surfaces, not alternate professional homepages.

## Content and identity

The master's degree is **M.S. in Information Technology**, without a security specialization. Both résumé tracks use **Software Developer** as the main role: one emphasizes **Python, AI & Security Projects**, the other **Python, AI & Technical Collaboration**. The title is grounded in independent application development, engine-connected interfaces, testing, telemetry integration and academic AI software research. Coordination remains an accurately scoped externship responsibility. The dedicated About section connects software projects, IT grading, technical collaboration, an academic externship and volunteer research.

The website links to its [Software Engineer résumé](https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/Pooja_Kiran_Software_Engineer_Resume.pdf). The Pages workflow generates it with `scripts/build_uploaded_resume.py` before the static export. The tracked LaTeX and legacy PDF URLs have a separate rebuild and text-parity check.

## Project evidence

The four projects cover **Agent → Tool**, **Identity → Authority**, **Artifact → Runtime**, and **Telemetry → Investigation**. Their [evidence pins](docs/project_evidence.json) identify the November 18, 2026 America/Phoenix local verification snapshots. The project cards link to those exact commits and archived assessments. All four draft candidates were assessed as **PARTIAL**. HF independent security closure remains blocked. The cited Aegis CI run has no verified application result.

The portfolio's illustration runs in the browser. The linked project notebooks execute bounded synthetic fixtures, and the verification archives record local execution of the committed cells. Hosted Colab execution remains unverified. The October poster graphics display earlier measurements from the commits and CI runs in the [poster source manifest](docs/poster_sources.json).


## Two ways to explore

- **Recruiter view:** conventional HTML with projects, experience, skills, education, resume access, repository links, and contact information.
- **Explore view:** the security concepts are presented with evidence-scoped illustrations. Telemetry and research are conceptual environments built from the same resume content, rather than additional claimed projects. The Three.js scene loads on demand; essential content remains in the DOM and accessible when WebGL is unavailable.

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
python3 scripts/verify_recruiter_claims.py
python3 -m pip install ruff==0.8.4
python3 -m ruff check scripts
python3 -m ruff format --check scripts
```

On Windows, `py scripts/security_scan.py` is an alternative if Python is installed through the Python launcher. A successful command only establishes the scope it checks; type checking and a production build do not replace browser checks for navigation, layout, keyboard access, reduced motion, WebGL failure, resume downloads, and external links. This README does not assert that a particular commit has passed those checks.

## Deployment

The Pages upload gate checks the exported résumé and poster files and writes their SHA-256 digests and the source commit to `out/build-provenance.json`. `npm run build` produces `out/` with the production base path `/Pooja_Kiran_Portfolio_Website`. Preview the exported files at that path when checking production URLs; serving them only at `/` will not reproduce the deployed asset paths.

`.github/workflows/deploy-pages.yml` builds and deploys pushes to `main` through GitHub Pages. CI, Security Hygiene, and Documentation Integrity run independently. The deployment workflow does not wait for every independent workflow, so check the actual run results for the commit before describing a release as verified. Repository Actions and the published URL provide the current deployment state.

## Security and configuration

This is a public static export with no login handlers, API routes, upload endpoints, or server-side authorization controls. React renders the tracked content as text. Local illustrations are not security enforcement services.

No owner API key or paid service is required. Never embed secrets in `src/`, `public/`, or `NEXT_PUBLIC_*` variables. Keep local `.env` files untracked; safe example templates may contain empty values or explicit placeholders only. If a future integration needs credentials, use your own environment or deployment secret store and keep secret-bearing operations off the public client.

Never commit tokens, cloud access keys, private keys, or populated credential files. If a credential is exposed, revoke or rotate it at the provider before removing it from files and reachable Git history. Removing a value from Git does not revoke it. The Security Hygiene workflow scans tracked files and reachable history for selected credential patterns without printing matched values; this does not guarantee detection of every secret format.

External links opened in a new tab use restrictive relationship attributes. A meta Content Security Policy provides the restrictions supported by this static host; response headers and platform-level controls are governed by GitHub Pages. Dependabot checks npm and GitHub Actions dependencies. Dependency advisories and workflow results should be reviewed for the current commit, rather than inferred from historical audit notes.


## Historical evidence — poster sources refreshed October 14, 2026 UTC

The October resume/portfolio source cited MCP Gateway **782 passing Python 3.12 CI tests at 81.93% coverage from the same October 10, 2026 UTC run**, AWS Agent Identity Guard **247 collected / 244 passed / 3 skipped**, and HF Model Provenance Scanner **260 passed / 1 skipped at 75.67% coverage**. Those results are historical; the active résumé and project descriptions use the November 18 evidence pins above. These are bounded repository verification results, not customer-deployment or universal security-effectiveness claims.

The [poster source manifest](docs/poster_sources.json) pins the currently displayed PNG files and their Git blob hashes. The November parity runs checked the image bytes. The metrics printed on the images refer to the October code and runs documented in the [October source alignment](docs/POSTER_EVIDENCE_ALIGNMENT_2026-10-14.md).


The historical résumé workflow described here rebuilt the legacy LaTeX downloads. See the content and deployment sections above for the current Pages build.


## Recruiter evidence paths

- **MCP application-security case study:** https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/APPSEC_CASE_STUDY.md
- **MCP white-box AppSec assessment:** https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/APPSEC_ASSESSMENT_2026-10-05.md
- **Dataset API white-box AppSec assessment:** https://github.com/poojakira/dataset-poisoning-detector/blob/main/docs/APPSEC_ASSESSMENT_2026-10-05.md
- **MCP 60-second recruiter demo guide:** https://github.com/poojakira/mcp-agent-security-gateway/blob/main/docs/RECRUITER_DEMO_60S.md

These are owner-authorized, repository-backed assessments and demo instructions. The 60-second demo guide is Markdown text, not a recorded video. They are not presented as independent third-party penetration tests.


The portfolio presents this ASU Generative AI learning-assistant initiative as academic/student participation, explicitly separate from employment, internship, and research-service appointments.

## Recruiting evidence audit (2026-10-09)

See [the bounded recruiting evidence audit](docs/RECRUITER_EVIDENCE_AUDIT_2026-10-09.md) for current dated verification, test-scope limitations and unsupported impact claims.


Maintenance checks and their limits are recorded in [the October 9 fix verification](docs/FIX_VERIFICATION_2026-10-09.md).

## Source-backed poster evidence

The [October 14 active poster alignment](docs/POSTER_EVIDENCE_ALIGNMENT_2026-10-14.md) records the currently pinned graphics and Git blob hashes. The [October 9 archived alignment](docs/POSTER_EVIDENCE_ALIGNMENT_2026-10-09.md) documents earlier snapshots. Both are dated and neither establishes current-HEAD production effectiveness.

## October 11, 2026 evidence reconciliation

The previous resume and recruiter view cited a **752-pass gateway Docker CI snapshot** and an **81.91% coverage result from another earlier run**. The updated source cites the October 10 GitHub Actions [gateway Python 3.12 run](https://github.com/poojakira/mcp-agent-security-gateway/actions/runs/38012954359) completed with **782 passed and 81.93% coverage**. Do not combine these two test/coverage results as one run; the public PDF must be regenerated from the same source and visually reviewed after the PR build and GitHub Pages deployment. In the same audit, [IAM CI](https://github.com/poojakira/aws-agent-identity-guard/actions/runs/38009457205) reported **244 passed / 3 skipped**, and [HF CI](https://github.com/poojakira/hf-model-provenance-scanner/actions/runs/38002138828) reported **260 passed / 1 skipped / 6 subtests** at **75.67% coverage**. Archived historical poster snapshots keep their original run/commit anchors; the active portfolio images are now pinned to newer source poster snapshots, separately documented. AEROSEC is an **academic Honeywell × ASU externship**, not a claim of employment by Honeywell, and the $120K is a proposed commercialization scenario, not received funding.
