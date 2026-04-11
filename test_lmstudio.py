from lm_client import chat, resolve_chat_model

model = resolve_chat_model()
print(f"Using model: {model}")

response = chat(
    "Explain like I'm 10 how LM Studio works.",
    model=model,
)

print(response)
