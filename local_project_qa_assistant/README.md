# Local Project Q&A Assistant

A fully local, read-only project Q&A assistant with a simple web UI.

## Features

- Runs locally on Windows
- Uses LM Studio as the only LLM backend
- Searches one selected project folder at a time
- Reads only relevant local file chunks
- Returns grounded answers with file citations and line numbers
- Does not edit files

## Run

```powershell
cd D:\Dev\personal\ai-lab\local_project_qa_assistant
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Open `http://127.0.0.1:8000`.

## LM Studio Config

Environment variables:

- `LMSTUDIO_BASE_URL`
- `LMSTUDIO_MODEL`
- `LMSTUDIO_TEMPERATURE`
- `LMSTUDIO_MAX_TOKENS`
- `LMSTUDIO_TIMEOUT_SECONDS`

Default base URL is `http://127.0.0.1:1234/v1`.
