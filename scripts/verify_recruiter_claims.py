from pathlib import Path

r = Path(__file__).resolve().parents[1]
files = [
    r / "resume/Pooja_Kiran_Agentic_AI_Security_Engineer_Resume.tex",
    r / "src/data/resume.ts",
]
for f in files:
    s = f.read_text(encoding="utf-8-sig").lower()
    for forbidden in [
        "96.15",
        "40% reduction",
        "60% detection",
        "100% of unauthorized",
        "98.7% success",
    ]:
        if forbidden in s:
            raise SystemExit(f"{f.name}: unverified impact claim {forbidden}")
    if f.suffix == ".ts":
        for broken in ["â†’", "â·"]:
            if broken in s:
                raise SystemExit(f"{f.name}: corrupted Unicode label {broken!r}")
        if "academic externship" not in s:
            raise SystemExit(f"{f.name}: AEROSEC academic scope not labeled")
    for verified in [
        "782",
        "81.93",
        "25 deterministic",
        "244 passed",
        "260 passed",
        "33/33",
    ]:
        if verified not in s:
            raise SystemExit(f"{f.name}: missing evidence {verified}")
if "AEROSEC (academic externship)" not in files[0].read_text(encoding="utf-8-sig"):
    raise SystemExit("LaTeX must label AEROSEC as an academic externship")
portfolio_ui = (r / "src/components/Portfolio.tsx").read_text(encoding="utf-8-sig")
if "60-second demo script (text)" not in portfolio_ui:
    raise SystemExit("Portfolio must label the Markdown demo guide as text")
print("Resume factual guard passed on canonical LaTeX and TypeScript sources")
