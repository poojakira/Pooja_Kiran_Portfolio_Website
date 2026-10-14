"""Reject unsupported metrics and enforce candidate-confirmed experience evidence."""

import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
paths = [
    root / "resume/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.tex",
    root / "src/data/resume.ts",
]
sources = [(f.name, f.read_text(encoding="utf-8-sig")) for f in paths]
patterns = {
    "MCP 782 tests": r"\b782\b",
    "MCP 81.93% coverage": r"\b81\.93\b",
    "IAM deterministic rules": r"\b25\s+deterministic\b",
    "IAM passing tests": r"\b244\s+(?:tests\s+)?pass(?:ed|ing)\b",
    "HF passing tests": r"\b260\s+(?:tests\s+)?pass(?:ed|ing)\b",
    "HF committed fixtures": r"\b33\s*(?:/|of)\s*33\b",
    "Undergraduate grading volume": r"\b85\s+undergraduate\b",
    "Graduate grading volume": r"\b52\s+graduate\b",
    "AEROSEC planned budget": r"120,000",
    "AEROSEC externship": r"externship",
}
for name, source in sources:
    low = source.lower()
    forbidden = (
        "96.15",
        "40% reduction",
        "60% detection",
        "100% of unauthorized",
        "98.7% success",
        "production-deployed",
    )
    for item in forbidden:
        if item in low:
            raise SystemExit(f"{name}: unsupported impact claim {item}")
    for label, pattern in patterns.items():
        if not re.search(pattern, source, flags=re.IGNORECASE):
            raise SystemExit(f"{name}: missing evidence {label}")

data = sources[1][1]
if "academic externship" not in data.lower():
    raise SystemExit("TypeScript must identify the academic externship")
if "â†’" in data or "â·" in data:
    raise SystemExit("TypeScript contains corrupted Unicode")

portfolio = (root / "src/components/Portfolio.tsx").read_text(
    encoding="utf-8-sig"
)
if "60-second demo script (text)" not in portfolio:
    raise SystemExit("Markdown demo must be labeled as text")

print("Resume evidence and scope checks passed")
