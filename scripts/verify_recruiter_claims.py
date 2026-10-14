"""Cross-check candidate-confirmed experience and dated engineering claims."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
tex = (root / "resume/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.tex").read_text(encoding="utf-8-sig")
data = (root / "src/data/resume.ts").read_text(encoding="utf-8-sig")
for name, source in [("LaTeX", tex), ("TypeScript", data)]:
    low = source.lower()
    forbidden = ["96.15", "40% reduction", "60% detection", "100% of unauthorized", "98.7% success"]
    if any(term in low for term in forbidden):
        raise SystemExit(f"{name}: unsupported impact metric present")
    required_patterns = {
        "MCP 782 tests": r"\b782\b",
        "MCP coverage": r"\b81\.93\b",
        "IAM 25 deterministic rules": r"\b25\s+deterministic\b",
        "IAM 244 tests": r"\b244\s+(?:tests\s+)?pass(?:ed|ing)\b",
        "Model scanner 260 tests": r"\b260\s+(?:tests\s+)?pass(?:ed|ing)\b",
        "Model scanner committed fixtures": r"\b33\s*(?:/|of)\s*33\b",
        "Undergraduate grading volume": r"\b85\s+undergraduate\b",
        "Graduate grading volume": r"\b52\s+graduate\b",
        "AEROSEC proposed budget": r"120,000",
        "AEROSEC externship scope": r"externship",
    }
    for label, pattern in required_patterns.items():
        if not re.search(pattern, source, flags=re.IGNORECASE):
            raise SystemExit(f"{name}: missing evidence: {label}")
    for unsafe in [r"production.deployed", r"commercially.proven", r"100[%\\]*\s*secure"]:
        if re.search(unsafe, low):
            raise SystemExit(f"{name}: unsupported production claim: {unsafe}")
if "academic externship" not in data.lower():
    raise SystemExit("TypeScript must explicitly identify the academic externship")
if "â†’" in data or "â·" in data:
    raise SystemExit("Corrupted Unicode found")
portfolio = (root / "src/components/Portfolio.tsx").read_text(encoding="utf-8-sig")
if "60-second demo script (text)" not in portfolio:
    raise SystemExit("Markdown demo must be labeled as text")
print("Resume claim checks passed in LaTeX, website data, and portfolio")
