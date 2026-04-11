from openai import OpenAI


DEFAULT_BASE_URL = "http://127.0.0.1:1234/v1"
DEFAULT_API_KEY = "lm-studio"


def get_client() -> OpenAI:
    return OpenAI(
        base_url=DEFAULT_BASE_URL,
        api_key=DEFAULT_API_KEY,
        max_retries=0,
        timeout=300,
    )


def list_models() -> list[str]:
    client = get_client()
    return [model.id for model in client.models.list().data]


def resolve_chat_model(model: str | None = None) -> str:
    available_models = list_models()
    if not available_models:
        raise RuntimeError(
            "LM Studio is reachable, but no models are loaded. "
            "Load a chat model in LM Studio or run `lms load <model-id>`."
        )

    if model:
        if model in available_models:
            return model
        raise RuntimeError(
            f"Requested model '{model}' is not loaded in LM Studio. "
            f"Loaded models: {', '.join(available_models)}"
        )

    for model_id in available_models:
        if "embed" not in model_id.lower():
            return model_id

    raise RuntimeError(
        "LM Studio only reports embedding models right now. "
        f"Loaded models: {', '.join(available_models)}"
    )


def chat(prompt: str, model: str | None = None) -> str:
    client = get_client()
    resolved_model = resolve_chat_model(model)
    response = client.chat.completions.create(
        model=resolved_model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    return response.choices[0].message.content or ""
