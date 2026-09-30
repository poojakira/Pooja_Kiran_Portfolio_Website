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
