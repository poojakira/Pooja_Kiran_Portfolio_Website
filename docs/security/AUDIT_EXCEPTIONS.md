# npm audit exception review

This portfolio is built as a static export. The production deployment does not run a Next.js server, middleware, server actions, React Server Component endpoints, or the Next image optimizer service.

The CI audit gate still runs `npm audit --json` on every push. `scripts/review-audit-report.mjs` fails the build for any unreviewed high or critical dependency finding. The only allowed findings are scoped to this static-export deployment model and documented below.

## Reviewed findings

| Package | Scope decision |
| --- | --- |
| `next` | Allowed only because `next.config.mjs` sets `output: 'export'` and images are `unoptimized: true`; server-side Next advisories are not part of the deployed runtime for this static site. |
| `postcss` | Build-time dependency under the static-export toolchain; no runtime parsing of untrusted CSS or source maps. |
| `glob` | Build/lint dependency path only; no exposed user-controlled glob CLI or shell execution path. |
| `js-yaml` | Build/development dependency path only; no runtime YAML ingestion from users. |
| `lodash.pick` | Transitive `@react-three/drei` dependency for static rendering; no exposed API accepts untrusted object structures for picking/merging. |

## Required follow-up

These exceptions are not a permanent claim that the dependencies are clean. They are bounded risk decisions for the current static export architecture. Upgrade `next`, `eslint-config-next`, `@react-three/drei`, and related packages when a lockfile-compatible update is available and re-run the full CI gate.
