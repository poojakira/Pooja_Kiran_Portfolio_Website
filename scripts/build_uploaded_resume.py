"""Generate the approved single-page resume from its inspected page layout.

The source is a zlib-compressed ASCII85 JSON recording of the uploaded PDF's
text spans, positions, horizontal rules, and clickable link destinations.
No personal data or resume claims are synthesized by this generator.
"""

import base64
import hashlib
import json
from pathlib import Path
import zlib

import fitz

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "resume" / "uploaded_resume_layout.b85"
OUTPUT = ROOT / "public" / "Pooja_Kiran_Software_Engineer_Resume.pdf"
EXPECTED_SHA = "c7fee1e1e7aec54447e6449a1b18991a657ccc3d39447303b671b02ca1911f56"
FONT_ROOT = Path("/usr/share/fonts/truetype/crosextra")

raw = zlib.decompress(base64.b85decode(SOURCE.read_text().strip().encode("ascii")))
if hashlib.sha256(raw).hexdigest() != EXPECTED_SHA:
    raise SystemExit("Resume layout integrity mismatch")
data = json.loads(raw.decode("utf-8"))
if len(data["spans"]) != 83 or len(data["links"]) != 9:
    raise SystemExit("Unexpected resume source dimensions")

doc = fitz.open()
page = doc.new_page(width=612, height=792)
for name, filename in (
    ("carlitoRegular", "Carlito-Regular.ttf"),
    ("carlitoBold", "Carlito-Bold.ttf"),
):
    page.insert_font(fontname=name, fontfile=str(FONT_ROOT / filename))
for x, y, font_size, bold, value, rgb in data["spans"]:
    page.insert_text(
        (x, y),
        value,
        fontsize=font_size,
        fontname="carlitoBold" if bold else "carlitoRegular",
        color=tuple(channel / 255 for channel in rgb),
        overlay=True,
    )
for x1, y1, x2, y2 in data["lines"]:
    page.draw_line((x1, y1), (x2, y2), color=(0.73, 0.78, 0.82), width=0.55)
for rectangle, target in data["links"]:
    page.insert_link(
        {"kind": fitz.LINK_URI, "from": fitz.Rect(rectangle), "uri": target}
    )
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
doc.save(OUTPUT, garbage=4, deflate=True)
doc.close()
check = fitz.open(OUTPUT)
content = check[0].get_text()
assert len(check) == 1
assert "configuration-management submissions for 101 students" in content
assert "834 passing tests" in content
assert "Software Engineer with 2+ Years" not in content
assert "PYTHON BACKEND & API INTEGRATION" in content
assert len(check[0].get_links()) == 9
print(f"Validated one-page corrected resume: {OUTPUT}")
