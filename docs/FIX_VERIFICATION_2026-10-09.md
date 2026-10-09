# Maintenance verification, October 9, 2026

Base source: `4a4c07698b08dcebea4f23137aa54e01972b2ee4`, plus the maintenance patch accompanying this document.

The CI lint and format gates now cover every maintained Python file under `scripts/`. The security helper was formatted with Ruff 0.8.4. Displayed project results are explicitly labeled as cited verification snapshots rather than results for the latest repository commit. No project metric, personal date, portrait, resume PDF, or deployment configuration was changed by this patch.

Local checks passed in a disposable, credential-free checkout using Node.js 24.19.0, npm 11.9.0, Python 3.12.14, and Ruff 0.8.4:

- `npm ci --ignore-scripts --no-audit --no-fund`
- `npm run typecheck`
- `NEXT_TELEMETRY_DISABLED=1 npm run build` (Next.js 16.3.8, static export)
- `python3 scripts/verify_recruiter_claims.py`
- `python3 scripts/security_scan.py`
- `ruff check scripts` and `ruff format --check scripts`
- `git diff --check`

CI declares Node.js 22; the local build used Node.js 24 and does not independently establish that Node.js 22 or hosted Actions passed. No live browser, deployment, WebGL, visual, accessibility, or external link check was performed. No security-project suite was executed through this website checkout, so project metrics were not remeasured here. Cerberus configuration and operational state were not accessed or modified.
