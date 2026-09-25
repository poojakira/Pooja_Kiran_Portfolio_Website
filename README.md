# Pooja Kiran | Security Engineer Portfolio

Maintainer: Pooja Kiran ([@poojakira](https://github.com/poojakira)).

A photo-led portfolio built with Next.js 14 / React / TypeScript and exported to GitHub Pages.

## Current website

https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/

The homepage includes profile, experience, three flagship projects with expandable controls / validation / limitations, technical skills, education, credentials, publication, research grant, and contact.

## Content and evidence

- Canonical rendered content: `src/data/portfolio.ts` and `src/app/page.tsx`.
- Content source: user-supplied September 2026 résumé, `Pooja_Kiran_Security_Engineer_Resume(3).pdf`.
- Verified flagship test snapshot: MCP 648, IAM 235, model scanner 211; total 1,094. These values are reconciled to the committed `VERIFIED_METRICS.md` evidence in the three flagship repositories; the website does not independently execute those suites.
- AEROSEC $120K and approximately 12% savings are modeled scenarios, not secured funding or realized savings.
- The model-scanner false-positive result applies only to four documented benign samples.
- Source photo is used unchanged; CSS controls its presentation.
- Legacy 3D sections remain in the repository but are not imported into the rendered website. Existing dependencies and lockfile are preserved.

## Assets and URLs

- Canonical résumé asset: `public/Pooja_Kiran_Security_Engineer_Resume.pdf`
- Canonical source: `resume/Pooja_Kiran_Security_Engineer_Resume.tex` (compile with `pdflatex`)
- SHA-256: `c3c7d6e6efada3557fd9090b52c91951a194fb8f7d2ade4abb3c2910654d3e87`
- Portrait: `public/pooja-kiran.png`
- Favicon: `public/favicon.svg`
- `SITE_PATH` in `src/data/portfolio.ts` matches the Next.js basePath.
- All public asset URLs include the GitHub Pages project path explicitly. This works with or without a trailing slash in the initial URL.
- The legacy root-level résumé PDF was removed to prevent ambiguity; only the canonical public résumé remains.


## Development

```bash
npm ci
npm run dev
npm run type-check
npm run lint
npm run build
```

Open the project path shown above on your local server, not the server root.
The dev wrapper accepts the preview host/port flags and forwards them to Next.js. Development output is isolated in `.next-dev/` so it does not conflict with production builds.
The existing GitHub Actions workflow exports to `out/` and deploys GitHub Pages on a push to main.

## Design and accessibility

Self-hosted Geist fonts, native scrolling, a responsive mobile menu with Escape dismissal, keyboard focus styles, skip navigation, native expandable project details, reduced-motion support, and semantic headings. No 3D or animation libraries are imported by the new homepage.
