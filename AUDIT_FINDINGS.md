# Audit findings

## Repository state

Default branch main is 0d913db4951cdde1257f57e14ae67978f8c36040. Review started at 0d913db4951cdde1257f57e14ae67978f8c36040. The collected inventory contains 190 pull requests, 0 issues and 6 Git tags. The public Releases API returned zero release records.

### Open pull requests

- [#179 Publish one Software Engineer resume and remove alternate resume](https://github.com/poojakira/Pooja_Kiran_Portfolio_Website/pull/179)
- [#173 deps: bump three and @types/three](https://github.com/poojakira/Pooja_Kiran_Portfolio_Website/pull/173)
- [#159 Update portfolio and both resumes with bounded MCP Phase 1–16 CI evidence](https://github.com/poojakira/Pooja_Kiran_Portfolio_Website/pull/159)
- [#158 Update portfolio poster, site wording, and both resumes to verified November MCP evidence](https://github.com/poojakira/Pooja_Kiran_Portfolio_Website/pull/158)
- [#155 deps: bump @types/node from 22.20.4 to 26.6.6](https://github.com/poojakira/Pooja_Kiran_Portfolio_Website/pull/155)



### Open issues

No open issues in the collected inventory.



### Hosted runs in collected history

- Success on 0d913db4951cdde1257f57e14ae67978f8c36040, 2026-11-20T20:35:08Z. [Security Hygiene](https://github.com/poojakira/Pooja_Kiran_Portfolio_Website/actions/runs/44812636513)

The public deployment succeeded at the recorded main SHA. The next proposed changes need their own CI and deployment evidence.

## Confirmed defects

| ID | Severity | Affected file and lines | Root cause, impact and remediation | Status |
|---|---|---|---|---|
| SITE-01 | Low | README.md:9–15 | The README described legacy downloads as the primary résumé. Pages generates the one-page PDF linked by the live site. The legacy LaTeX rebuild is a separate workflow. | Implemented locally |
| SITE-02 | Low | README.md:65–77 | The README used historical image commits as deployed pins. The served PNG bytes match the November parity pins. The October code/run measurements remain historical. | Implemented locally |

## Residual risk

Chrome rendered the site, displayed the four projects and navigated to the résumé section. The PDF and poster URLs returned HTTP 200. The three served PNGs had the same Git blob hashes as the tracked files. A successful static build leaves layout across viewports, accessibility tooling and ongoing external link availability unverified.

The review includes the named PRs, selected source, local workflow syntax, relative file targets in Markdown, and the executed checks in [verification](VERIFICATION_REPORT.md). Complete source review, historical per-run root cause classification and validation of all operational documentation remain incomplete.
