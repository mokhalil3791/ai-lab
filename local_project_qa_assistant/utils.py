from __future__ import annotations

import re
from pathlib import Path

from config import settings


STOP_WORDS = {
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "what",
    "where",
    "when",
    "which",
    "about",
    "into",
    "your",
    "have",
    "does",
    "how",
    "why",
    "can",
    "use",
}


def normalize_path(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def is_within_root(path: Path, root: Path) -> bool:
    try:
        path.resolve().relative_to(root.resolve())
        return True
    except ValueError:
        return False


def is_supported_file(path: Path) -> bool:
    if path.name in settings.allowed_exact_names:
        return True
    return path.suffix.lower() in settings.allowed_suffixes


def should_ignore_path(path: Path) -> bool:
    return any(part in settings.ignored_dirs for part in path.parts)


def looks_binary(content: bytes) -> bool:
    return b"\x00" in content


def extract_query_terms(question: str) -> list[str]:
    terms = re.findall(r"[A-Za-z0-9_./-]+", question.lower())
    augmented = list(terms)
    for idx in range(len(terms) - 1):
        combined = f"{terms[idx]}{terms[idx + 1]}"
        if len(combined) >= 4:
            augmented.append(combined)

    filtered: list[str] = []
    for term in augmented:
        if len(term) < 3 or term in STOP_WORDS:
            continue
        if term not in filtered:
            filtered.append(term)
    return filtered[:10]
