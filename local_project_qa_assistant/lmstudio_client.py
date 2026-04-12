from __future__ import annotations

from openai import OpenAI

from config import settings


class LMStudioClient:
    def __init__(self) -> None:
        self.client = OpenAI(
            base_url=settings.lmstudio_base_url,
            api_key="lm-studio",
            max_retries=0,
            timeout=settings.lmstudio_timeout_seconds,
        )

    def ask(self, prompt: str, system_prompt: str | None = None) -> str:
        response = self.client.chat.completions.create(
            model=settings.lmstudio_model,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                    or (
                        "You are a local project Q&A assistant. "
                        "Answer only from the supplied evidence. "
                        "If the evidence is weak or incomplete, say so clearly. "
                        "Separate direct evidence from assumptions. "
                        "Use source tags like [S1], [S2] only when the evidence supports them."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            temperature=settings.lmstudio_temperature,
            max_tokens=settings.lmstudio_max_tokens,
        )
        return response.choices[0].message.content or ""
