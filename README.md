# Pooja Kiran Portfolio Website

A performance-first personal portfolio built with Next.js 14, Three.js, and GSAP, enforcing quality gates via Lighthouse CI on every commit.

> **Repository Status: Archived** (read-only as of August 23, 2026)

---

## The Hook: Why This Is Interesting

Most developer portfolios are either a plain HTML page or a bloated template. This one takes a different path: it combines WebGL 3D graphics with scroll-driven animations while keeping Lighthouse performance above 80 and accessibility above 90, enforced automatically in CI.

**Real-world scenario:** You are building a portfolio that needs to impress visually (3D elements, smooth scroll animations) but also needs to load fast on mobile and pass accessibility audits. How do you reconcile heavy client-side rendering (Three.js, GSAP) with strict performance budgets? This repo answers that question with concrete implementation patterns.

---

## Executive Summary

**Who is this for:**
- Developers building portfolios who want a reference for combining 3D visuals with production-grade web performance
- Engineers studying how to integrate Three.js into a Next.js app without destroying page load times
- Anyone looking for a pattern that pairs Vercel deployment with automated Lighthouse CI quality gates

**What problem it solves:**
It demonstrates that you can ship a visually rich, animation-heavy single-page portfolio while maintaining measurable quality standards, not just hoping it's "fast enough" but proving it on every pull request.

---

## Why This Repository Exists

Portfolio websites face a tension: visual polish versus performance. This repo exists to resolve that tension with engineering discipline rather than compromise.

**Questions this repo answers:**

1. How do you tree-shake Three.js in Next.js so the 3D scene doesn't bloat your initial bundle?
2. How do you set up Lighthouse CI with GitHub Actions to block PRs that regress performance?
3. What does a scroll-state architecture look like when coordinating GSAP timelines with React rendering?
4. How do you configure Vercel security headers for a static portfolio site?
5. How do you use fluid typography with Tailwind CSS to avoid breakpoint-based font jumping?

---

## Architecture Overview

```
+----------------------------------------------------------+
|                    Vercel Edge Network                     |
|  (Security Headers, Caching, CDN)                        |
+----------------------------------------------------------+
           |
           v
+----------------------------------------------------------+
|              Next.js 14 (App Router, SSR/SSG)             |
+----------------------------------------------------------+
           |
           v
+---------------------------+-------------------------------+
|     Page Sections         |       Shared Infrastructure   |
|                           |                               |
|  Hero.tsx                 |  stores/scrollStore.ts        |
|  About.tsx                |    (Zustand scroll state)     |
|  Domains.tsx              |                               |
|  Experience.tsx           |  hooks/                       |
|  Projects.tsx             |    (Custom React hooks)       |
|  ProjectsInteractive.tsx  |                               |
|  Contact.tsx              |  lib/                         |
|                           |    (Utilities, helpers)       |
+---------------------------+-------------------------------+
           |                            |
           v                            v
+------------------+        +------------------------+
| components/three |        | components/animations  |
| (Three.js/R3F    |        | (GSAP scroll triggers, |
|  3D scenes)      |        |  motion primitives)    |
+------------------+        +------------------------+
           |                            |
           v                            v
+------------------+        +------------------------+
| @react-three/    |        | GSAP + Lenis           |
| fiber + drei     |        | (Smooth scroll engine) |
+------------------+        +------------------------+
```

**Component Responsibilities:**

| Directory | Role |
|-----------|------|
| `src/app/` | Next.js App Router pages and layouts |
| `src/components/sections/` | Full-viewport page sections (Hero, About, Projects, etc.) |
| `src/components/three/` | React Three Fiber 3D scene components |
| `src/components/animations/` | GSAP-based scroll and entrance animations |
| `src/components/layout/` | Navigation, footer, page shell |
| `src/components/providers/` | Context providers (Three.js canvas, smooth scroll) |
| `src/components/ui/` | Reusable UI primitives (buttons, cards, etc.) |
| `src/hooks/` | Custom hooks for scroll position, viewport, etc. |
| `src/stores/` | Zustand store for scroll state shared across components |
| `src/lib/` | Utility functions and configuration |

---

## End-to-End Workflow

1. **Developer writes code** locally using `npm run dev` (Next.js dev server on port 3000)
2. **Type checking** via `npm run type-check` (runs `tsc --noEmit`)
3. **Linting** via `npm run lint` (ESLint with Next.js rules)
4. **Push to branch / open PR** triggers the `lighthouse.yml` GitHub Actions workflow
5. **CI pipeline** installs deps (`npm ci`), builds the project (`npm run build`), then runs Lighthouse CI with 3 runs against localhost
6. **Quality gates enforce:** Performance >= 80 (warn), Accessibility >= 90 (error/block), Best Practices >= 90 (warn), SEO >= 90 (warn)
7. **Merge to main** triggers Vercel auto-deploy to production at `pooja-kiran-portfolio-website.vercel.app`
8. **Vercel applies** security headers (HSTS, X-Frame-Options DENY, CSP-adjacent protections) and immutable caching for static assets

---

## Design Decisions and Trade-offs

**Why Next.js 14 App Router instead of a static site generator?**
The App Router gives server-side rendering for the initial HTML shell (good for SEO and perceived performance) while still supporting the heavy client-side Three.js canvas. A pure static generator like Astro could work, but the React ecosystem for Three.js (`@react-three/fiber`) made Next.js the pragmatic choice.

**Why Zustand for state instead of React Context?**
Scroll position changes 60 times per second. React Context would re-render the entire tree on every scroll tick. Zustand's subscription model lets only the components that read scroll state re-render, which matters when you have a WebGL canvas competing for frame budget.

**Why Lenis for smooth scroll?**
Native CSS `scroll-behavior: smooth` doesn't give you the fine-grained control needed for scroll-linked animations. Lenis provides a virtual scroll layer that GSAP's ScrollTrigger can hook into precisely, giving consistent behavior across browsers.

**Why fluid typography via clamp() instead of responsive breakpoints?**
Breakpoint-based font sizing creates jumps at specific widths. `clamp()` scales text linearly between a minimum and maximum, giving a smoother reading experience on tablets and unusual viewport sizes without extra media queries.

**Why enforce Lighthouse in CI rather than just checking manually?**
Three.js bundles are large. It is easy to add one more shader or model and silently regress load times. Automated enforcement catches regressions before they ship. The accessibility threshold is set at "error" level (blocks merge) because WCAG compliance is non-negotiable.

**Trade-off: Bundle size vs visual richness.**
Three.js, React Three Fiber, and drei add roughly 150-200KB gzipped to the client bundle. The `optimizePackageImports` config in `next.config.mjs` tree-shakes unused Three.js modules. This is an acceptable cost for the 3D differentiator, but it means the site will never achieve a perfect 100 Lighthouse performance score on slow 3G.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.2.35 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^3.4.1 |
| 3D Rendering | Three.js + React Three Fiber + Drei | 0.185 / 8.15 / 9.88 |
| Animation | GSAP | ^3.15.0 |
| Smooth Scroll | Lenis | ^1.3.26 |
| State Management | Zustand | ^4.5.2 |
| Utility | clsx + tailwind-merge | ^2.1.1 / ^2.3.0 |
| Linting | ESLint (Next.js config) | ^8 |
| CI | GitHub Actions + Lighthouse CI | v11 |
| Hosting | Vercel | - |
| Node.js | (CI requirement) | 20 |

---

## Installation and Quick Start

> **Note:** This repository is archived and read-only. You can clone it and run it locally, but no new contributions are accepted.

### Prerequisites

- Node.js 20+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/poojakira/Pooja_Kiran_Portfolio_Website.git
cd Pooja_Kiran_Portfolio_Website

# Install dependencies
npm ci

# Run development server
npm run dev
```

The site will be available at `http://localhost:3000`.

### Available Scripts

```bash
npm run dev          # Start Next.js dev server with hot reload
npm run build        # Production build (SSR + static optimization)
npm run start        # Serve production build locally
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix lint issues
npm run type-check   # TypeScript type verification (no emit)
npm run analyze      # Bundle analysis (sets ANALYZE=true)
```

### Usage Example: Running Lighthouse Locally

```bash
# Build and serve
npm run build
npm run start

# In another terminal, run Lighthouse CI
npx @lhci/cli autorun --config=./lighthouserc.json
```

---

## Security Considerations

This site is a static portfolio with no backend API, authentication, or user data collection. Security is focused on transport and browser-level protections configured via `vercel.json`:

| Header | Value | Purpose |
|--------|-------|---------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains | Forces HTTPS for 1 year |
| X-Content-Type-Options | nosniff | Prevents MIME sniffing attacks |
| X-Frame-Options | DENY | Blocks clickjacking via iframes |
| X-XSS-Protection | 1; mode=block | Legacy XSS filter (defense in depth) |
| Referrer-Policy | strict-origin-when-cross-origin | Limits referrer leakage |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Disables unnecessary browser APIs |

Static assets (`/fonts/*`, `/_next/static/*`) use immutable caching (`max-age=31536000, immutable`) for performance without cache invalidation risk, since Next.js hashes filenames on every build.

---

## Production Readiness Assessment

| Criterion | Status | Notes |
|-----------|--------|-------|
| Type safety | Yes | Full TypeScript, `tsc --noEmit` in scripts |
| Linting | Yes | ESLint with Next.js recommended rules |
| CI pipeline | Yes | Lighthouse CI on push and PR |
| Performance budgets | Yes | Automated thresholds (perf >= 80, a11y >= 90) |
| Security headers | Yes | HSTS, X-Frame-Options, etc. via Vercel |
| Error handling | Partial | No error boundary or Sentry integration visible |
| Testing | No | No unit/integration test framework configured |
| Monitoring | No | No runtime observability (acceptable for a portfolio) |
| SEO | Yes | Lighthouse SEO >= 90 enforced |
| Accessibility | Yes | Lighthouse a11y >= 90 enforced (error-level gate) |
| Caching strategy | Yes | Immutable hashed assets, CDN via Vercel |
| Bundle optimization | Yes | `optimizePackageImports` for Three.js tree-shaking |

**Verdict:** Production-ready for its purpose (a personal portfolio). The lack of unit tests is a known gap, but the Lighthouse CI pipeline provides functional regression detection for the user-facing experience.

---

## Roadmap / Future Improvements

> This repository is **archived** and will not receive updates. The following are observations about what could be improved if development were to resume:

- **Add unit tests** for animation hooks and scroll state logic (Vitest or Jest)
- **Add a Content Security Policy** header to restrict script sources
- **Progressive enhancement** for the 3D scene (fallback static image for devices that cannot run WebGL)
- **Preload critical Three.js chunks** to reduce time-to-interactive for the hero section
- **Add a blog section** powered by MDX for content that evolves over time
- **Implement a service worker** for offline viewing of the portfolio
- **Dark/light theme toggle** (currently dark-only based on the color palette)

---

## License and Author

**Author:** Pooja Kiran ([GitHub: @poojakira](https://github.com/poojakira))

**License:** No license file is included in the repository. All rights reserved by default.

**Live site:** [pooja-kiran-portfolio-website.vercel.app](https://pooja-kiran-portfolio-website.vercel.app)

---

## Engineering Lessons

This project demonstrates a useful principle: treat your portfolio like a production system. By adding Lighthouse CI with hard accessibility gates, you get two things at once. First, you catch regressions before they go live. Second, the CI configuration itself becomes a portfolio piece, showing potential employers that you think about quality as a process, not a one-time checklist.

The tension between Three.js bundle weight and Lighthouse performance targets forced real engineering decisions (tree-shaking configuration, code splitting, deferred loading). That's the kind of constraint that produces better work than unlimited freedom would.
