# Verification report

**LOCAL ONLY.** Tested source: d40d9623ef298b772c5ddb19e0b9a2f9eebe0fa2. Fixing source at report time: 62070f7332cf69e060ecdf2760a7d134a7e00060. Hosted observations in [audit findings](AUDIT_FINDINGS.md) identify their separate source SHAs.

Docker Node 22.23.5, npm 10.9.9. npm ci, npm run typecheck, npm run build, output HTML and poster byte checks, npm audit --audit-level=high all exited 0. npm reported zero known vulnerabilities. The audited local build excluded Pages résumé generation. The public PDF returned HTTP 200 and pdfinfo reported one letter page.

The production build ran at d40d9623ef298b772c5ddb19e0b9a2f9eebe0fa2. Subsequent local source changes in this review were Markdown-only. Outputs and the audit are in portfolio-build.log. The deployed browser check targets 0d913db4951cdde1257f57e14ae67978f8c36040.



The local workflow syntax check used actionlint 1.7.7. The Markdown lexical check inspected relative file targets. It does not establish heading fragments, external targets, or example commands. Logs and command wrappers are in the workspace audit directory.
