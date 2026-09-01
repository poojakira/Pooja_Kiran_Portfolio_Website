# Security Audit — Pooja_Kiran_Portfolio_Website

**Date:** 2026-08-06  
**Classification:** STATIC WEBSITE — GitHub Pages deployment

---

## Critical Findings

None — static HTML/CSS/JS with no server-side processing.

---

## High Findings

### HIGH-1: Missing Content Security Policy headers

**Issue:** No CSP headers were configured. XSS risk if any user input is reflected (currently none).  
**Remediation:** Added CSP via meta tag.
**Status:** FIXED in this commit.

### HIGH-2: Unsupported project metrics displayed

**Issue:** If the website displays exact benchmark numbers (AUROC, F1, detection rates) that link to repos without committed evidence, this misleads viewers.  
**Remediation:** Only display metrics with linked evidence. Mark prototypes clearly.
**Status:** Check index.html for claims.

---

## Medium Findings

### M-01: No dependabot.yml (for GitHub Actions if any)
### M-02: External links should use rel="noopener noreferrer"
### M-03: No Lighthouse CI configured

---

## Recommendation

Use this as the canonical portfolio website. Remove unsupported metrics. Label each project with its actual classification (Prototype, Research, Architecture Reference, etc.).
