# Architecture Overview

## Guardian Protocol — Pooja Kiran Portfolio Website

A high-performance, single-page portfolio website built with Next.js 14, featuring
3D particle animations, smooth scroll interactions, and an AI-security-themed design system.

---

## Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Framework        | Next.js 14.2 (App Router)                       |
| Language         | TypeScript 5                                    |
| Styling          | Tailwind CSS 3.4 + PostCSS + Autoprefixer       |
| 3D Graphics      | Three.js + React Three Fiber + Drei             |
| Animation        | GSAP 3.15 + custom CSS keyframes                |
| Smooth Scroll    | Lenis                                           |
| State Management | Zustand                                         |
| Linting          | ESLint (next config)                            |
| CI               | GitHub Actions (Lighthouse CI)                  |
| Deployment       | Vercel                                          |

---

## Deployment

- **Platform**: Vercel (configured via `vercel.json`)
- **Domain**: https://poojakiran.dev
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, HSTS, Permissions-Policy
- **Caching**: Immutable cache headers on fonts and static assets
- **CI Pipeline**: Lighthouse CI runs on push/PR to `main`, enforcing performance ≥ 0.8,
  accessibility ≥ 0.9, best-practices ≥ 0.9, SEO ≥ 0.9

---

## Directory Structure

```
├── .github/workflows/       # CI — Lighthouse audits
├── public/                  # Static assets (video, photo, resume PDF)
├── src/
│   ├── app/                 # Next.js App Router pages & layout
│   │   ├── layout.tsx       # Root layout — fonts, metadata, providers
│   │   ├── page.tsx         # Home page — section composition
│   │   ├── not-found.tsx    # 404 page
│   │   ├── globals.css      # Tailwind base + custom utilities
│   │   └── favicon.ico
│   ├── components/
│   │   ├── animations/      # Scroll/reveal animation wrappers
│   │   ├── layout/          # Header, Footer
│   │   ├── providers/       # SmoothScroll (Lenis) provider
│   │   ├── sections/        # Page sections (Hero, About, etc.)
│   │   ├── three/           # WebGL/Three.js components
│   │   └── ui/              # Misc UI (EasterEggs, SkipLink)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Constants, content data, utilities
│   └── stores/              # Zustand state stores
├── lighthouserc.json        # Lighthouse CI thresholds
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Design tokens & theme
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment & headers
└── package.json             # Dependencies & scripts
```

---

## Component Architecture

### Page Composition (`src/app/page.tsx`)

The home page renders section components in sequence with decorative
`TransitionDivider` separators:

```
Hero → About → Domains → Projects → Experience → Contact
```

### Layout Shell (`src/app/layout.tsx`)

Wraps the page with global providers and overlays:

- **Fonts**: Inter (body) + JetBrains Mono (code)
- **SEO**: OpenGraph, Twitter cards, JSON-LD structured data
- **Providers**: `SmoothScroll` (Lenis), `DeviceTierGate`, `ScrollSyncBridge`
- **Overlays**: `CustomCursor`, `ScrollProgress`, `EasterEggs`
- **Layout**: `Header` (nav) + `Footer`

### 3D Layer (`src/components/three/`)

- `Scene.tsx` — Main Three.js canvas (React Three Fiber)
- `ParticleField.tsx` — Animated particle background
- `ThreatParticle.tsx` — Individual particle shader/mesh
- `DeviceTierGate.tsx` — Conditionally loads 3D based on device capability
- `ScrollSyncBridge.tsx` — Syncs Lenis scroll position to 3D scene
- `SceneLoader.tsx` — Lazy loading wrapper

### Animation System (`src/components/animations/`)

- `ScrollReveal` / `StaggerChildren` — Intersection-based reveal
- `TextReveal` — Character-by-character text animation
- `CountUp` — Animated number counter
- `MagneticButton` — Cursor-reactive button hover
- `CustomCursor` — Custom cursor overlay
- `ScrollProgress` — Page scroll progress indicator
- `ProjectModal` — Animated project detail modal

### State Management

- **`scrollStore.ts`** (Zustand) — Global scroll progress, mouse position, device tier
- **`useDeviceTier.ts`** — Detects hardware capability (high/medium/low) for adaptive rendering
- **`useReducedMotion.ts`** — Respects `prefers-reduced-motion` system preference
- **`useGSAP.ts`** — GSAP lifecycle hook

---

## Design System

The theme is defined in `tailwind.config.ts` with a dark "deep space" palette:

- **Colors**: deep-space, obsidian, graphite (backgrounds); sentinel-violet, plasma-cyan,
  secure-green, amber-alert (accents); pure-light, silver-haze, whisper (text)
- **Typography**: Fluid type scale using CSS `clamp()` for responsive sizing
- **Fonts**: Satoshi (display), Inter (body), JetBrains Mono (code)
- **Animations**: float, pulse-glow, scan-line, fade-up, slide-in, matrix-fade

---

## Performance Strategy

- **Adaptive 3D**: Device tier detection gates WebGL rendering — low-end devices skip particles
- **Package Optimization**: `optimizePackageImports` for Three.js/GSAP tree-shaking
- **Image Formats**: AVIF + WebP via Next.js Image component
- **Font Loading**: `display: swap` with Google Fonts subset
- **Smooth Scroll**: Lenis provides 60fps scroll with minimal layout thrash
- **Reduced Motion**: All animations respect system accessibility preferences

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix lint issues
npm run type-check   # TypeScript type verification
npm run analyze      # Bundle analysis (ANALYZE=true)
```

---

## SEO & Accessibility

- Semantic HTML with `<main>`, skip-link navigation
- JSON-LD structured data (Person schema)
- OpenGraph + Twitter Card meta tags
- Lighthouse CI enforcement in CI pipeline
- `aria-hidden` on decorative elements
- Keyboard-navigable interactive components
