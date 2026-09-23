# Pooja Kiran | Security Engineer Portfolio

**Repository owner & maintainer:** Pooja Kiran ([@poojakira](https://github.com/poojakira)) — I own and maintain this repository and drive its design, engineering, validation, documentation, and evidence-backed releases.

Photo-led, recruiter-focused portfolio built with the existing Next.js 14 / React / TypeScript stack and exported to GitHub Pages.

## Current website

https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/

The homepage includes profile, experience, three flagship projects with expandable controls / validation / limitations, technical skills, education, credentials, publication, research grant, and contact.

## Content and evidence

- Canonical rendered content: `src/data/portfolio.ts` and `src/app/page.tsx`.
- Content source: user-supplied September 2026 résumé, `Pooja_Kiran_Security_Engineer_Resume(3).pdf`.
- Verified flagship test snapshot: MCP 629, IAM 230, model scanner 199; total 1,058. These values are reconciled to the committed `VERIFIED_METRICS.md` evidence in the three flagship repositories; the website does not independently execute those suites.
- AEROSEC $120K and approximately 12% savings are modeled scenarios, not secured funding or realized savings.
- The model-scanner false-positive result applies only to four documented benign samples.
- Source photo is used unchanged; CSS controls its presentation.
- Legacy 3D sections remain in the repository but are not imported into the rendered website. Existing dependencies and lockfile are preserved.

## Assets and URLs

- Canonical résumé asset: `public/Pooja_Kiran_Security_Engineer_Resume.pdf`
- Canonical source file: `Pooja_Kiran_Security_Engineer_Resume(3).pdf`
- SHA-256: `408cbe449622aeed864758a382ba781845fd26cf32911edeebb95ad278b8918c`
- Portrait: `public/pooja-kiran.png`
- Favicon: `public/favicon.svg`
- `SITE_PATH` in `src/data/portfolio.ts` matches the Next.js basePath.
- All public asset URLs include the GitHub Pages project path explicitly. This works with or without a trailing slash in the initial URL.
- The legacy root-level résumé PDF was removed to prevent ambiguity; only the canonical public résumé remains.


## Cinematic interactive hero

The homepage now includes a cinematic, depth-based hero built around the canonical portrait at `public/pooja-kiran.png`.

- Desktop pointer movement drives restrained parallax, character depth, light-field movement, and technical boundary markers.
- GSAP entrance choreography and ScrollTrigger create the pinned hero camera move and scroll-linked 3D section reveals.
- The interaction honors `prefers-reduced-motion` and uses simplified touch/mobile behavior.
- The character video is optional. Until it exists, the committed portrait remains the visual fallback.
- Final interactive video contract: `public/media/pooja-interactive-hero.mp4`.
- When that MP4 is present, the hero keeps it paused and smoothly maps horizontal pointer position to video time, using an intentionally clamped frame range to avoid unstable endpoint frames.
- The hero does not expose autoplay or native video controls.

The visual motion is presentation only; the engineering evidence and repository-backed project metrics remain unchanged.

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
