"""Check the single published resume source and portfolio references."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
tex = (root / "resume/Pooja_Kiran_Software_Engineer_Resume.tex").read_text()
data = (root / "src/data/resume.ts").read_text()
ui = (root / "src/components/Portfolio.tsx").read_text()
assert "Pooja_Kiran_Software_Engineer_Resume.pdf" in data
assert "managerResumeHref" not in ui
assert "resumeHref" in ui
assert "M.S. Information Technology" in tex
assert "Jan 2025" in tex and "May 2026" in tex
assert "Cerberus" in tex and "Honeywell" in tex
assert "834 passing tests" in tex
assert "272 passing tests" in tex
assert "332 passing tests" in tex
assert "—" not in tex and "–" not in tex
for bad in ("100% secure", "40% reduction", "60% detection"):
    assert bad.lower() not in (tex + data).lower()
print("Single-resume source and portfolio references verified")

assert tex.count(r"\\end{document}") == 1
assert tex.rstrip().endswith(r"\\end{document}")
assert tex.index(r"\\section{Experience}") < tex.index(r"\\end{document}")
assert tex.index(r"\\section{Technical Projects}") < tex.index(r"\\end{document}")
