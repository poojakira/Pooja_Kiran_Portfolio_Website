"""Negative cases for empty, incomplete, duplicate and mismapped source manifests."""

import copy
import hashlib
import tempfile
import unittest
from pathlib import Path

from verify_poster_sources import EXPECTED, verify


class SourceGateTests(unittest.TestCase):
    def setUp(self):
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.root = Path(tmp.name)
        (self.root / "public").mkdir()
        self.records = []
        for repo, path in EXPECTED.items():
            content = repo.encode()
            (self.root / path).write_bytes(content)
            self.records.append({"repository": repo, "portfolio_path": path,
                                 "path": "poster/poster.png", "commit": "a" * 40,
                                 "sha256": hashlib.sha256(content).hexdigest()})

    def test_valid_local_manifest(self):
        self.assertTrue(verify(self.root, self.records, local_only=True))

    def test_empty_or_missing_records_rejected(self):
        for records in ([], self.records[:2]):
            with self.subTest(records=len(records)), self.assertRaises(ValueError):
                verify(self.root, records, local_only=True)

    def test_duplicate_repository_rejected(self):
        records = self.records[:2] + [self.records[0]]
        with self.assertRaises(ValueError):
            verify(self.root, records, local_only=True)

    def test_mismapped_path_rejected(self):
        records = copy.deepcopy(self.records)
        records[0]["portfolio_path"] = records[1]["portfolio_path"]
        with self.assertRaises(ValueError):
            verify(self.root, records, local_only=True)

    def test_malformed_digest_rejected(self):
        records = copy.deepcopy(self.records)
        records[0]["sha256"] = "invalid"
        with self.assertRaises(ValueError):
            verify(self.root, records, local_only=True)

    def test_changed_poster_rejected(self):
        (self.root / self.records[0]["portfolio_path"]).write_bytes(b"changed")
        with self.assertRaises(ValueError):
            verify(self.root, self.records, local_only=True)


if __name__ == "__main__":
    unittest.main()
