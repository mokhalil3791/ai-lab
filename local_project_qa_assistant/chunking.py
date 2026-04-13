from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from config import settings
from utils import looks_binary, normalize_path


@dataclass(slots=True)
class Chunk:
    path: str
    start_line: int
    end_line: int
    content: str
    score: float


def read_text_lines(path: Path) -> list[str]:
    raw = path.read_bytes()
    if looks_binary(raw):
        raise ValueError("Binary file")
    text = raw.decode("utf-8", errors="replace")
    return text.splitlines()


def _window_bounds(total_lines: int, center_line: int) -> tuple[int, int]:
    start = max(1, center_line - settings.chunk_context_lines)
    end = min(total_lines, center_line + settings.chunk_context_lines)
    if end - start + 1 > settings.max_chunk_lines:
        end = start + settings.max_chunk_lines - 1
    return start, end


def extract_chunks(path: Path, root: Path, matched_lines: set[int], score: float) -> list[Chunk]:
    try:
        lines = read_text_lines(path)
    except (OSError, ValueError):
        return []

    total_lines = len(lines)
    if total_lines == 0:
        return []

    windows: list[tuple[int, int]] = []
    if matched_lines:
        for line_no in sorted(matched_lines):
            windows.append(_window_bounds(total_lines, line_no))
    else:
        windows.append((1, min(total_lines, settings.max_chunk_lines)))

    merged: list[tuple[int, int]] = []
    for start, end in windows:
        if not merged:
            merged.append((start, end))
            continue
        last_start, last_end = merged[-1]
        if start <= last_end + 5:
            merged[-1] = (last_start, max(last_end, end))
        else:
            merged.append((start, end))

    chunks: list[Chunk] = []
    rel_path = normalize_path(path, root)
    for start, end in merged[:2]:
        numbered_lines = [f"{idx}: {lines[idx - 1]}" for idx in range(start, end + 1)]
        chunks.append(
            Chunk(
                path=rel_path,
                start_line=start,
                end_line=end,
                content="\n".join(numbered_lines),
                score=score,
            )
        )
    return chunks
