# Trust Universe — Technical Evidence Map

## Agent Security City
Repository: poojakira/mcp-agent-security-gateway
Verified anchor:
- 652 passing tests
- ~79.2% statement coverage
- 55 prompt-injection regex patterns
- 9 Elastic Security rules
- 21 core SIEM tests
Boundary: research implementation; heuristic detection has false-positive/false-negative risk; only routed calls are governed.

## Identity Metropolis
Repository: poojakira/aws-agent-identity-guard
Verified anchor:
- 25 deterministic rule IDs
- 235 passed / 3 skipped in fresh exact-count CI
- SARIF 2.1.0
- CI performance gates: p95 <10ms/policy and >1,000 policies/sec
Boundary: static analysis; performance claims are scoped CI gates, not production measurements.

## Model Provenance Lab
Repository: poojakira/hf-model-provenance-scanner
Verified anchor:
- 211 passed / 6 subtests
- 12/12 core fixtures
- 18/18 extended variants
- 3/3 large-scale fixtures
- 0 actionable false positives only across 4 documented benign samples
Boundary: committed fixture-suite results, not universal model-security accuracy.

## Runtime / Telemetry / Cloud
Only surface claims already backed by the user’s repositories. These worlds begin as conceptual gray-box spaces until their evidence ledger is fully audited.

## Engineering Vault
Must expose source links, tests, CI, limitations and evidence anchors. No simulated visual scale may be presented as production scale.
