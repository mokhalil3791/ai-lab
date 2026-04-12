from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from chunking import Chunk, extract_chunks
from config import settings
from lmstudio_client import LMStudioClient
from search import search_project
from utils import is_within_root


@dataclass(slots=True)
class AnswerPayload:
    answer: str
    evidence_summary: str
    sources: list[dict[str, int | str]]
    confidence: str


class QAPipeline:
    def __init__(self) -> None:
        self.lm_client = LMStudioClient()

    def validate_root(self, root_path: str) -> Path:
        root = Path(root_path).expanduser()
        if not root.exists() or not root.is_dir():
            raise ValueError("The selected path does not exist or is not a folder.")
        return root.resolve()

    def answer_question(self, root_path: str, question: str) -> AnswerPayload:
        root = self.validate_root(root_path)
        if not question.strip():
            raise ValueError("Question cannot be empty.")

        file_hits = search_project(root, question)
        chunks: list[Chunk] = []
        for hit in file_hits:
            if not is_within_root(hit.path, root):
                continue
            chunks.extend(extract_chunks(hit.path, root, hit.matched_lines, hit.score))
            if len(chunks) >= settings.max_chunks:
                break

        chunks = self._fit_chunks_to_budget(
            sorted(chunks, key=lambda item: -item.score)[: settings.max_chunks]
        )
        if not chunks:
            return AnswerPayload(
                answer="I could not find enough evidence in the selected folder.",
                evidence_summary="No relevant supported files or matching content were found.",
                sources=[],
                confidence="low",
            )

        prompt = self._build_prompt(question, chunks)
        raw_answer = self.lm_client.ask(prompt).strip()
        if not raw_answer:
            raw_answer = self.lm_client.ask(
                self._build_retry_prompt(question, chunks),
                system_prompt=(
                    "You are a local project Q&A assistant. "
                    "Answer in plain English using only the supplied evidence. "
                    "Be concise. If the evidence is insufficient, say that clearly."
                ),
            ).strip()
        confidence = self._estimate_confidence(chunks)
        if not raw_answer:
            raw_answer = (
                "I found related local evidence, but the model returned an empty response. "
                "Please review the cited files below."
            )
        elif confidence == "low" and "could not" not in raw_answer.lower():
            raw_answer += (
                "\n\nAssumptions: Evidence is limited, so parts of this answer may be incomplete."
            )

        return AnswerPayload(
            answer=raw_answer,
            evidence_summary=self._build_evidence_summary(chunks),
            sources=[
                {
                    "path": chunk.path,
                    "start_line": chunk.start_line,
                    "end_line": chunk.end_line,
                }
                for chunk in chunks
            ],
            confidence=confidence,
        )

    def _build_prompt(self, question: str, chunks: list[Chunk]) -> str:
        evidence_parts: list[str] = []
        for idx, chunk in enumerate(chunks, start=1):
            evidence_parts.append(
                (
                    f"[S{idx}] {chunk.path}:{chunk.start_line}-{chunk.end_line}\n"
                    f"{chunk.content}"
                )
            )

        return (
            f"Question:\n{question}\n\n"
            "Evidence:\n"
            f"{'\n\n'.join(evidence_parts)}\n\n"
            "Write the answer with this structure:\n"
            "Main answer:\n"
            "Evidence:\n"
            "Assumptions:\n"
            "If evidence is insufficient, say that clearly."
        )

    def _build_retry_prompt(self, question: str, chunks: list[Chunk]) -> str:
        evidence_parts: list[str] = []
        for idx, chunk in enumerate(chunks, start=1):
            evidence_parts.append(
                f"[S{idx}] {chunk.path}:{chunk.start_line}-{chunk.end_line}\n{chunk.content}"
            )
        return (
            f"Question: {question}\n\n"
            f"Evidence:\n{'\n\n'.join(evidence_parts)}\n\n"
            "Write a short answer, then one short Evidence line, then one short Assumptions line."
        )

    def _build_evidence_summary(self, chunks: list[Chunk]) -> str:
        unique_files = sorted({chunk.path for chunk in chunks})
        return f"Used {len(chunks)} evidence chunks from {len(unique_files)} file(s)."

    def _estimate_confidence(self, chunks: list[Chunk]) -> str:
        unique_files = len({chunk.path for chunk in chunks})
        if len(chunks) >= 4 and unique_files >= 2:
            return "high"
        if len(chunks) >= 2:
            return "medium"
        return "low"

    def _fit_chunks_to_budget(self, chunks: list[Chunk]) -> list[Chunk]:
        fitted: list[Chunk] = []
        total_chars = 0
        for chunk in chunks:
            chunk_size = len(chunk.content)
            if fitted and total_chars + chunk_size > settings.max_evidence_chars:
                break
            if not fitted and chunk_size > settings.max_evidence_chars:
                fitted.append(
                    Chunk(
                        path=chunk.path,
                        start_line=chunk.start_line,
                        end_line=chunk.end_line,
                        content=chunk.content[: settings.max_evidence_chars],
                        score=chunk.score,
                    )
                )
                break
            fitted.append(chunk)
            total_chars += chunk_size
        return fitted
