# Pooja Kiran — Portfolio Resume Asset

> Canonical, versioned source and PDF of Pooja Kiran's Security Engineer resume, served to the portfolio site.

[![License](https://img.shields.io/badge/content-personal--resume-lightgrey)](#license)

**Maintainer:** Pooja Kiran ([@poojakira](https://github.com/poojakira))

## Overview

This repository is a lightweight asset host for the current Security Engineer resume. It holds the resume PDF (served at the portfolio URL) and its reproducible LaTeX source, plus the profile photo. The live portfolio site itself is maintained at [poojakira.github.io](https://poojakira.github.io/). This repo was intentionally reduced to the resume asset so the resume has a single, versioned source of truth.

## Verified Snapshot

| Metric | Current verified result |
|---|---:|
| Resume PDF | 1 page, compiled from LaTeX (MiKTeX pdfTeX) |
| Source | `resume/*.tex` (reproducible) |
| Featured project metrics | match the flagship repos' `VERIFIED_METRICS.md` (e.g., gateway 659 tests / 82%) |

## Security Problem

Not applicable — this is a personal resume/portfolio asset repository, not a security tool. It exists to keep a single, versioned, reproducible copy of the resume so the numbers in it stay consistent with the underlying repositories' verified metrics.

## Threat Model & Scope

**In scope:** storing the resume PDF + LaTeX source and the profile image; keeping resume metrics consistent with the source repositories.

**Out of scope / not claimed:** no application code, no runtime, no security controls. It is a static asset repository.

## Architecture

```text
resume/*.tex  --(pdflatex)-->  public/Pooja_Kiran_Security_Engineer_Resume.pdf  -->  served on the portfolio site
public/pooja-kiran.png (profile photo)
```

## Core Capabilities

- Versioned resume PDF served to the portfolio
- Reproducible LaTeX source for the resume
- Profile photo asset

## License

Personal resume content © Pooja Kiran. Not licensed for reuse of the personal content.
