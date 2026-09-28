# Pooja Kiran Portfolio Website

Production portfolio for Pooja Kiran, built as a static-exported Next.js site for GitHub Pages.

## Single content source

All personal facts, experience, projects, metrics, skills, education, certifications, and profile/repository links shown by this website are sourced from:

`public/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.pdf`

The site intentionally does not import claims or biography from older portfolio files, prior résumé versions, or other repositories.

## Experience modes

- **Recruiter view:** fast DOM-first scan of experience, projects, evidence, skills, education, résumé, and contact.
- **Explore mode:** cinematic security interface with a procedural Three.js environment plus the same résumé-backed content.

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
