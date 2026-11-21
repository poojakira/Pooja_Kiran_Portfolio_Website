import tempfile
import unittest
from pathlib import Path

from scripts.verify_pages_export import POSTERS, RESUME, verify_export


class PagesExportTest(unittest.TestCase):
    def setUp(self):
        temp = tempfile.TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.out = Path(temp.name) / "out"
        self.public = Path(temp.name) / "public"
        self.out.mkdir()
        self.public.mkdir()
        self.html = (
            '<a href="#main">Skip</a><main id="main" tabindex="-1">'
            f'<a href="./{RESUME}">Résumé</a>'
            + "".join(f'<img src="./{name}">' for name in POSTERS)
            + "</main>"
        )
        (self.out / "index.html").write_text(self.html)
        for directory in (self.out, self.public):
            (directory / RESUME).write_bytes(b"%PDF-fixture")
            for name in POSTERS:
                (directory / name).write_bytes(b"\x89PNG\r\n\x1a\nfixture")

    def test_export_records_content_digests(self):
        result = verify_export(self.out, self.public, "synthetic-sha")
        self.assertEqual(result["source_commit"], "synthetic-sha")
        self.assertEqual(set(result["assets_sha256"]), {RESUME, *POSTERS})

    def test_export_rejects_unfocusable_skip_link_destination(self):
        (self.out / "index.html").write_text(self.html.replace(' tabindex="-1"', ""))
        with self.assertRaisesRegex(ValueError, "focusable main"):
            verify_export(self.out, self.public, "synthetic-sha")

    def test_export_rejects_unexpected_resume_bytes(self):
        (self.out / RESUME).write_bytes(b"%PDF-different-fixture")
        with self.assertRaisesRegex(ValueError, "does not match"):
            verify_export(self.out, self.public, "synthetic-sha")
