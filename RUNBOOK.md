# Runbook — Portfolio Website

Step-by-step guide to run, deploy, and maintain the portfolio website.

---

## Step 1: Run Locally

No build tools or server required — this is a static HTML site.

**Windows (PowerShell):**
```powershell
# Option A: Open directly in default browser
Start-Process index.html

# Option B: Serve with Python (avoids file:// CORS issues)
py -m http.server 8080
# Open http://localhost:8080
```

**Linux/macOS:**
```bash
# Option A: Open directly
open index.html   # macOS
xdg-open index.html  # Linux

# Option B: Serve with Python
python3 -m http.server 8080
# Open http://localhost:8080
```

---

## Step 2: Deploy to GitHub Pages

The site deploys automatically when you push to `main`. GitHub Pages serves from the root of the `main` branch.

1. Make your changes locally.
2. Commit and push:
   ```powershell
   git add .
   git commit -m "update: describe your change"
   git push origin main
   ```
3. GitHub Pages will rebuild within 1–2 minutes.
4. Verify at: https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/

**Manual setup (if Pages isn't configured):**
1. Go to repo Settings → Pages.
2. Source: "Deploy from a branch".
3. Branch: `main`, folder: `/ (root)`.
4. Save.

---

## Step 3: Update Content

The site is a single `index.html` file with inline structure:

| Section | Where to Edit |
|---------|---------------|
| Hero / intro | `<section id="hero">` |
| About | `<section id="about">` |
| Projects | `<section id="projects">` — each project is a card `<div>` |
| Skills | `<section id="skills">` |
| Contact | `<section id="contact">` |

**To add a new project card:**
1. Open `index.html`.
2. Find the projects section.
3. Copy an existing project card `<div>` and modify the title, description, and link.
4. Save and test locally (Step 1).

**To update styles:**
- Edit `styles.css` — the site uses custom CSS with CSS variables for theming.

**To update JavaScript (3D canvas, animations):**
- Edit `main.js`.

---

## Step 4: Regenerate sitemap.xml

The `sitemap.xml` maps all pages for search engines. Update it when you add new pages or change URLs.

**Windows (PowerShell):**
```powershell
# Manual approach — edit sitemap.xml directly
# Update the <lastmod> date and add/remove <url> entries

# The current sitemap covers:
# - https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/
# - https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/404.html

# After editing, commit:
git add sitemap.xml
git commit -m "docs: update sitemap"
git push origin main
```

**Automated (if you add a generator later):**
```powershell
# Install a sitemap generator
py -m pip install sitemap-generator
# Generate from local files
sitemap-generator --base-url "https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/" --output sitemap.xml
```

---

## Step 5: Verification

Run these checks after any change:

**Check all links work:**
```powershell
# Install linkchecker
py -m pip install linkchecker

# Run against local server (start server in another terminal first)
linkchecker http://localhost:8080

# Or check the live site
linkchecker https://poojakira.github.io/Pooja_Kiran_Portfolio_Website/
```

**Manual verification checklist:**
- [ ] `index.html` loads without console errors (F12 → Console)
- [ ] 3D canvas renders (not blank)
- [ ] All navigation links scroll to correct sections
- [ ] External project links open correct GitHub repos
- [ ] `robots.txt` is accessible at `/robots.txt`
- [ ] `sitemap.xml` is valid XML
- [ ] `404.html` displays when visiting a non-existent path
- [ ] CSP headers are not blocking resources (check Network tab)
- [ ] Accessible: run Lighthouse audit (F12 → Lighthouse → Accessibility)
- [ ] PDF resume link downloads correctly

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 3D canvas blank | Check browser console for WebGL errors. Try a different browser. |
| CORS errors on `file://` | Use `py -m http.server` instead of opening directly |
| GitHub Pages not updating | Check Actions tab for build errors. Clear browser cache. |
| Fonts not loading | Check CSP headers in `<meta>` tag allow the font CDN |
| Links broken after rename | Update `sitemap.xml` and any internal `href` references |

---

## Files Reference

| File | Purpose |
|------|---------|
| `index.html` | Main page — all content |
| `styles.css` | All styling |
| `main.js` | JavaScript — 3D canvas, animations, interactions |
| `sitemap.xml` | Search engine sitemap |
| `robots.txt` | Crawler directives |
| `favicon.svg` | Browser tab icon |
| `404.html` | Custom 404 page |
| `Pooja_Kiran.pdf` | Resume PDF |
| `.nojekyll` | Tells GitHub Pages not to process with Jekyll |
| `.github/dependabot.yml` | Dependabot config |
