"""Verify resume and website against bounded engineering evidence."""

import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
tex = root / "resume/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.tex"
data = root / "src/data/resume.ts"
sources = (tex.read_text(encoding="utf-8-sig"), data.read_text(encoding="utf-8-sig"))

for source in sources:
    lower = source.lower()
    for forbidden in ("96.15", "40% reduction", "60% detection", "100% secure"):
        if forbidden in lower:
            raise SystemExit("Unsupported impact claim: " + forbidden)
    required = ("782", "81.93", "25 deterministic", "85 undergraduate")
    required += ("52 graduate", "120,000", "externship", "244", "260")
    for value in required:
        if value.lower() not in lower:
            raise SystemExit("Missing source-backed evidence: " + value)
    if not re.search(r"\b33\s*(?:/|of)\s*33\b", source):
        raise SystemExit("Missing bounded 33/33 model-scanner fixture result")

if "academic externship" not in sources[1].lower():
    raise SystemExit("Academic externship labeling missing in website data")
if "â†’" in sources[1] or "â·" in sources[1]:
    raise SystemExit("Corrupted Unicode in website data")

portfolio = root / "src/components/Portfolio.tsx"
ui = portfolio.read_text(encoding="utf-8-sig")
if "60-second demo script (text)" not in ui:
    raise SystemExit("Portfolio must label the Markdown demo as text")

for period in ("Oct 2025 -- Oct 2026", "Apr 2025 -- Oct 2026", "Nov 2024 -- Oct 2026"):
    if period not in sources[0]:
        raise SystemExit("Incorrect project period in LaTeX: " + period)
for period in ("Oct 2025 - Oct 2026", "Apr 2025 - Oct 2026", "Nov 2024 - Oct 2026"):
    if period not in sources[1]:
        raise SystemExit("Incorrect project period in website: " + period)
if "candidate-reported" in sources[0].lower() + sources[1].lower():
    raise SystemExit("Unwanted project-period disclaimer")

print("Resume evidence check passed")
