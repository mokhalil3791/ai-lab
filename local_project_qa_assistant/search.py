from __future__ import annotations

import subprocess
from dataclasses import dataclass, field
from pathlib import Path

from config import settings
from utils import extract_query_terms, is_supported_file, normalize_path, should_ignore_path


@dataclass(slots=True)
class FileHit:
    path: Path
    score: float = 0.0
    matched_lines: set[int] = field(default_factory=set)
    reasons: list[str] = field(default_factory=list)


def _rg_available() -> bool:
    try:
        subprocess.run(
            ["rg", "--version"],
            check=False,
            capture_output=True,
            text=True,
            timeout=5,
        )
        return True
    except (OSError, subprocess.SubprocessError):
        return False


def _build_rg_command(root: Path, term: str) -> list[str]:
    command = [
        "rg",
        "-n",
        "-i",
        "--no-heading",
        "--color",
        "never",
        "--max-count",
        "4",
    ]
    for ignored in settings.ignored_dirs:
        command.extend(["--glob", f"!{ignored}/**"])
    command.extend([term, str(root)])
    return command


def _search_with_rg(root: Path, terms: list[str], hits: dict[Path, FileHit]) -> None:
    for term in terms:
        try:
            result = subprocess.run(
                _build_rg_command(root, term),
                check=False,
                capture_output=True,
                text=True,
                timeout=15,
            )
        except (OSError, subprocess.SubprocessError):
            return

        for raw_line in result.stdout.splitlines():
            parts = raw_line.split(":", 2)
            if len(parts) < 3:
                continue
            file_path = Path(parts[0])
            if not file_path.exists() or should_ignore_path(file_path) or not is_supported_file(file_path):
                continue
            line_no = int(parts[1])
            hit = hits.setdefault(file_path, FileHit(path=file_path))
            hit.matched_lines.add(line_no)
            hit.score += 3.0
            if f"content:{term}" not in hit.reasons:
                hit.reasons.append(f"content:{term}")


def _search_by_walk(root: Path, terms: list[str], hits: dict[Path, FileHit]) -> None:
    for path in root.rglob("*"):
        if not path.is_file() or should_ignore_path(path) or not is_supported_file(path):
            continue

        relative_path = normalize_path(path, root).lower()
        filename_score = 0.0
        for term in terms:
            if term in relative_path:
                filename_score += 4.0
        if filename_score:
            hit = hits.setdefault(path, FileHit(path=path))
            hit.score += filename_score
            if "filename" not in hit.reasons:
                hit.reasons.append("filename")

        try:
            if path.stat().st_size > settings.max_file_bytes:
                continue
        except OSError:
            continue

        if _rg_available():
            continue

        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        lowered = text.lower()
        for term in terms:
            if term in lowered:
                hit = hits.setdefault(path, FileHit(path=path))
                hit.score += 2.0
                if f"content:{term}" not in hit.reasons:
                    hit.reasons.append(f"content:{term}")


def search_project(root: Path, question: str) -> list[FileHit]:
    terms = extract_query_terms(question)
    if not terms:
        return []

    hits: dict[Path, FileHit] = {}
    _search_by_walk(root, terms, hits)
    if _rg_available():
        _search_with_rg(root, terms, hits)

    ordered = sorted(
        hits.values(),
        key=lambda item: (-item.score, str(item.path).lower()),
    )
    return ordered[: settings.max_search_results]
