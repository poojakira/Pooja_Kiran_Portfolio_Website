# Security poster and resume evidence alignment — October 13, 2026

All three poster copies were regenerated from independently reviewed claim manifests and visually checked as one-page 36×48 PDFs plus matching PNGs. Historical original artifacts remain in source Git history. Their dated evidence must remain separate from the resume’s later CI results.

| Portfolio copy | Reviewed source commit | Printed test snapshot |
| --- | --- | --- |
| public/mcp-poster.png | [c45a3699432e558991e07ba9f4b837c947670c33](https://github.com/poojakira/mcp-agent-security-gateway/commit/c45a3699432e558991e07ba9f4b837c947670c33) | [2026-10-04 UTC run 37184196303](https://github.com/poojakira/mcp-agent-security-gateway/actions/runs/37184196303) |
| public/iam-poster.png | [31e372844802e66ef71e66f1cb66aa5dbcbbbc08](https://github.com/poojakira/aws-agent-identity-guard/commit/31e372844802e66ef71e66f1cb66aa5dbcbbbc08) | [2026-10-04 UTC run 37170669504](https://github.com/poojakira/aws-agent-identity-guard/actions/runs/37170669504) |
| public/provenance-poster.png | [a90031a3ae1003d35b3d6e8b9de60cf26894dfb5](https://github.com/poojakira/hf-model-provenance-scanner/commit/a90031a3ae1003d35b3d6e8b9de60cf26894dfb5) | [2026-10-03 UTC run 37163168715](https://github.com/poojakira/hf-model-provenance-scanner/actions/runs/37163168715) |

The resume’s project and Independent Research bullets describe implemented controls with execution-path limits. Its later dated anchors are MCP run 38012954359 (782 passed, 81.93% coverage), IAM run 38009457205 (247 collected, 244 passed, 3 explicitly disabled separate-rule-API skips), and HF run 38002138828 (260 passed, 1 skipped, 75.67% coverage). These are software test results, not population effectiveness or production reliability. Candidate-reported development periods are separate from public CI dates.

The IAM inventory is 24 offline identity/trust rules plus 1 optional role-metadata boundary check. MCP inspection controls differ by transport/path; no universal enforcement claim is made. The HF 33/33 adversarial fixtures and 0/4 benign flags were independently rerun offline with network/process execution denied; this small curated set does not establish real-world recall or false-positive rate. Incident-inspired fixture labels are not authenticated incident reproduction.

`POSTER_SOURCE_PINS.json` holds exact source commits and SHA-256 hashes. The workflow now verifies equality read-only; it cannot overwrite a reviewed poster with an older source version. Canonical resume LaTeX, PDF and TypeScript were checked for claim parity; the PDF was rendered as one Letter page, and TypeScript/Next.js builds passed. Full new website browser acceptance remains outstanding.

No Cerberus deployment, identities, credentials, telemetry or pilot traffic was changed. Employment, ASU dates and coursework claims remain candidate-reported unless separately supported by original records.
