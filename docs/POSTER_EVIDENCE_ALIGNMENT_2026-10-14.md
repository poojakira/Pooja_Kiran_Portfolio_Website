# Active portfolio poster alignment — November 2026 (review candidate)

The three portfolio poster images must match immutable, SHA-checked sources. The MCP poster is pinned to [gateway research commit 861a8025](https://github.com/poojakira/mcp-agent-security-gateway/blob/861a80258bd91a8c1d84b9a9c4e4f8c533f6467e/poster/poster.png) (blob SHA `2a968a5912530dbc54edc026080e13b7cfa23106`). Its quantitative results derive from the earlier [PR #167 synthetic-merge CI run 42748742036](https://github.com/poojakira/mcp-agent-security-gateway/actions/runs/42748742036), not from a deployed system. The reported Python 3.12 values are **1,158 passed, 6 skipped, 83.10% statement coverage** (7,327 statements, 1,238 missed); **69** named prompt-injection patterns, **9** Elastic rules, **21** core SIEM tests and **7** SIEM scenario tests are inventoried. The October poster's previous claim of 12 scenario tests was incorrect. Research integration remains **draft/unmerged and production NO-GO**.

The other poster artifacts remain pinned to independent historical checks. An updated site should be published only after its binary asset parity and résumé PDF workflows pass.

## Active poster sources

| Portfolio image | Immutable source | Evidence |
|---|---|---|
| `public/mcp-poster.png` | MCP Agent Security Gateway `861a8025`; Git blob `2a968a59` | Nov 10 [CI 42748742036](https://github.com/poojakira/mcp-agent-security-gateway/actions/runs/42748742036), PR-merge only; 1,158 passed, 6 skipped, 83.10% coverage; not production |
| `public/iam-poster.png` | AWS Agent Identity Guard `da0b9f1e`; Git blob `8aa9bb09` | Oct 2026 [CI 38497940763](https://github.com/poojakira/aws-agent-identity-guard/actions/runs/38497940763): 244 passed, 3 skipped, 25 rule IDs |
| `public/provenance-poster.png` | HF Model Provenance Scanner `595b33ba`; Git blob `ebc57344` | Oct 2026 [CI 38498005353](https://github.com/poojakira/hf-model-provenance-scanner/actions/runs/38498005353): 260 passed, 1 skipped; 75.67% coverage |

## Historical poster record

The October 14 MCP poster was tied to a different source commit and [run 38502413461](https://github.com/poojakira/mcp-agent-security-gateway/actions/runs/38502413461): **782 passed / 81.93% statement coverage**. Its 69 named signatures and 9 Elastic rules were source inventory, not independent detection efficacy; the listed 12 scenario tests has been corrected to 7 in the November poster. Earlier October metrics and observations remain historical and should not be aggregated with the November integrated code.

## Artifact verification

`docs/poster_sources.json` pins source commit and Git blob SHA; `scripts/sync_poster_assets.py --sync` fetches the corresponding source PNG and rejects mismatched bytes. GitHub Actions may commit the regenerated poster PNG to the review branch after the manifest commit. This equality check is **binary provenance**, not a guarantee of perfect visual layout. The source poster was reviewed visually before this update. Verify the final review-branch state and site deployment after artifact synchronization.

## Generated asset audit — November 10, 2026

The [poster sync run](https://github.com/poojakira/Pooja_Kiran_Portfolio_Website/actions/runs/42945891595) passed and committed `public/mcp-poster.png`: source and destination Git blob `2a968a5912530dbc54edc026080e13b7cfa23106` (672,096 bytes). The [two-resume build](https://github.com/poojakira/Pooja_Kiran_Portfolio_Website/actions/runs/42945891777) passed XeLaTeX, two-page layout, and extracted-text assertions, then committed both generated PDFs: Security Engineer blob `747d3a6748aa2a3eaa9d21effc1bc16abf31f2a9` and Engineering Manager blob `5d79dcdcdfbea9bb8e37ed0719693f36cfe0f30e`. The assets are review candidates until PR #158 is merged and site publication is verified.
