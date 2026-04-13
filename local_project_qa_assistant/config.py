from __future__ import annotations

import os
from dataclasses import dataclass, field
from pathlib import Path


def _env_int(name: str, default: int) -> int:
    value = os.getenv(name)
    if value is None:
        return default
    try:
        return int(value)
    except ValueError:
        return default


def _env_float(name: str, default: float) -> float:
    value = os.getenv(name)
    if value is None:
        return default
    try:
        return float(value)
    except ValueError:
        return default


@dataclass(slots=True)
class Settings:
    app_title: str = "Local Project Q&A Assistant"
    host: str = os.getenv("ASSISTANT_HOST", "127.0.0.1")
    port: int = _env_int("ASSISTANT_PORT", 8000)

    lmstudio_base_url: str = os.getenv("LMSTUDIO_BASE_URL", "http://127.0.0.1:1234/v1")
    lmstudio_model: str = os.getenv("LMSTUDIO_MODEL", "qwen/qwen3.5-9b")
    lmstudio_temperature: float = _env_float("LMSTUDIO_TEMPERATURE", 0.2)
    lmstudio_max_tokens: int = _env_int("LMSTUDIO_MAX_TOKENS", 700)
    lmstudio_timeout_seconds: int = _env_int("LMSTUDIO_TIMEOUT_SECONDS", 90)

    max_file_bytes: int = _env_int("ASSISTANT_MAX_FILE_BYTES", 1_000_000)
    max_search_results: int = _env_int("ASSISTANT_MAX_SEARCH_RESULTS", 12)
    max_chunks: int = _env_int("ASSISTANT_MAX_CHUNKS", 8)
    chunk_context_lines: int = _env_int("ASSISTANT_CHUNK_CONTEXT_LINES", 12)
    max_chunk_lines: int = _env_int("ASSISTANT_MAX_CHUNK_LINES", 80)
    max_evidence_chars: int = _env_int("ASSISTANT_MAX_EVIDENCE_CHARS", 9000)

    ignored_dirs: set[str] = field(
        default_factory=lambda: {
            ".git",
            "node_modules",
            ".venv",
            "venv",
            "dist",
            "build",
            ".next",
            "__pycache__",
            ".idea",
            ".vscode",
        }
    )
    allowed_suffixes: set[str] = field(
        default_factory=lambda: {
            ".py",
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".java",
            ".cs",
            ".go",
            ".rs",
            ".php",
            ".rb",
            ".swift",
            ".kt",
            ".kts",
            ".c",
            ".cc",
            ".cpp",
            ".h",
            ".hpp",
            ".html",
            ".css",
            ".scss",
            ".sql",
            ".sh",
            ".ps1",
            ".bat",
            ".cmd",
            ".env",
            ".ini",
            ".cfg",
            ".conf",
            ".md",
            ".txt",
            ".json",
            ".yaml",
            ".yml",
            ".toml",
            ".csv",
        }
    )
    allowed_exact_names: set[str] = field(
        default_factory=lambda: {
            "Dockerfile",
            "Makefile",
            "README",
            "README.md",
            "LICENSE",
        }
    )

    @property
    def templates_dir(self) -> Path:
        return Path(__file__).parent / "templates"

    @property
    def static_dir(self) -> Path:
        return Path(__file__).parent / "static"


settings = Settings()
