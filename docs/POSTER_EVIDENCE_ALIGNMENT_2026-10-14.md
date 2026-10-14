# Active flagship poster alignment (October 14, 2026 UTC)

The three public portfolio poster images are copied **byte-for-byte** from pinned source repository commits by `scripts/sync_poster_assets.py`; the source object's Git blob SHA is checked before synchronization. Their content is dated test evidence, **not** a live counter, production-deployment claim, or detector-population accuracy claim.

| Public portfolio poster | Source project and pinned commit | CI / source boundaries |
|---|---|---|
| `public/mcp-poster.png` | [mcp-agent-security-gateway](https://github.com/poojakira/mcp-agent-security-gateway/blob/9bad1c2f06563e7fdf637b1f70dc75521d6c2e5e/poster/poster.png), `9bad1c2f0656` | [CI 38502413461](https://github.com/poojakira/mcp-agent-security-gateway/actions/runs/38502413461): 782 tests, 81.93% statement coverage; 69 separately inventoried runtime signatures |
| `public/iam-poster.png` | [aws-agent-identity-guard](https://github.com/poojakira/aws-agent-identity-guard/blob/da0b9f1e453ae0e640af9734dc88a3bed14ea7b2/poster/poster.png), `da0b9f1e453a` | [CI 38497940763](https://github.com/poojakira/aws-agent-identity-guard/actions/runs/38497940763): 247 collected, 244 passed, 3 skipped; 25 rule IDs |
| `public/provenance-poster.png` | [hf-model-provenance-scanner](https://github.com/poojakira/hf-model-provenance-scanner/blob/595b33ba8b1af4c2d4ed6ce1ab4b95bc5034cef4/poster/poster.png), `595b33ba8b1a` | [CI 38498005353](https://github.com/poojakira/hf-model-provenance-scanner/actions/runs/38498005353): 260 passed, 1 skipped, 6 subtests, 75.67% statement coverage |

The [machine-readable poster manifest](poster_sources.json) specifies the exact source commit and Git blob SHA for each image. The `Poster Source Sync` workflow fetches only those immutable URLs, rejects mismatched bytes, and commits synchronized files to an internal review branch. The portfolio CI and Pages deployment should be checked again **after** the binary sync commits.

Historical numbers remain valid **only for their earlier anchored snapshots**:
- MCP Gateway October 4: 723 tests, 81.91% coverage, 55 signatures.
- IAM Guard October 4: 243 collected, 240 passed, 3 skipped.
- HF scanner October 3: 241 passed, 1 skipped, 75.67% coverage.

The active poster measurements are not evidence of universally effective detection or any production availability/SLO. The source artifacts were regenerated in their own repositories from their own research briefs and verified-metrics files. This sync verifies **image identity**, not visual legibility, accessibility, or PDF layout. The Cerberus deployment, identities, baseline, and integration evidence are outside scope.

## Independent artifact inspection (October 14)

The three portfolio PNGs at `c3ec80b4e8737f0fb1615f6d9e52c528ed9896b1` were visually inspected: the headline values match the table above and no clipped text was observed. This is a visual PNG review; PDF inspection is tracked separately in the source repositories. The IAM limitation panel at the pinned artifact uses a generic fallback because its renderer did not recognize the research brief's `Claim Boundary` heading; consult that source section for its explicit limits.

The public resume PDF at the same portfolio commit was independently extracted and rendered: one US Letter page, eight contact/project link annotations with the intended targets, and the same test/coverage values as the canonical LaTeX and `src/data/resume.ts`. No metric rewrite or PDF regeneration was needed for this synchronization. Its dated October 10 CI citation remains separate from the poster's October 14 evidence run.

## October 14 follow-up: regenerated source image identity

The source project repairs added printed evidence provenance and source-accurate limitations without changing the verified test totals. The portfolio now pins AWS Identity Guard poster commit `da0b9f1e453ae0e640af9734dc88a3bed14ea7b2` (Git blob `8aa9bb09a48c6aebcbc34a84e10623796595876d`) and HF Scanner poster commit `595b33ba8b1af4c2d4ed6ce1ab4b95bc5034cef4` (Git blob `ebc57344ac1d7dde878fdba42c5d6108be744790`). Both source PNGs were visually reviewed for metric and limitation alignment before this sync, and their bytes were verified against the pinned SHA. Rechecking the published site's image delivery remains separate from CI and is required after deployment. No resume source or PDF is changed by this poster-only sync.
