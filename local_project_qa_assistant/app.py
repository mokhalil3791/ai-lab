from __future__ import annotations

from pathlib import Path

import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

from config import settings
from qa_pipeline import QAPipeline


app = FastAPI(title=settings.app_title)
app.mount("/static", StaticFiles(directory=settings.static_dir), name="static")
templates = Jinja2Templates(directory=settings.templates_dir)
pipeline = QAPipeline()

app.state.current_root_path = ""


class LoadProjectRequest(BaseModel):
    root_path: str


class AskRequest(BaseModel):
    root_path: str | None = None
    question: str


@app.get("/", response_class=HTMLResponse)
def home(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "app_title": settings.app_title,
            "current_root_path": app.state.current_root_path,
            "lmstudio_base_url": settings.lmstudio_base_url,
            "lmstudio_model": settings.lmstudio_model,
        },
    )


@app.post("/load-project")
def load_project(payload: LoadProjectRequest) -> dict[str, object]:
    try:
        root = pipeline.validate_root(payload.root_path)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    app.state.current_root_path = str(root)
    return {"ok": True, "root_path": str(root)}


@app.post("/ask")
def ask_question(payload: AskRequest) -> dict[str, object]:
    root_path = payload.root_path or app.state.current_root_path
    if not root_path:
        raise HTTPException(status_code=400, detail="Load a project folder first.")

    try:
        result = pipeline.answer_question(root_path, payload.question)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Assistant error: {exc}") from exc

    return {
        "answer": result.answer,
        "evidence_summary": result.evidence_summary,
        "sources": result.sources,
        "confidence": result.confidence,
        "root_path": str(Path(root_path)),
    }


if __name__ == "__main__":
    uvicorn.run("app:app", host=settings.host, port=settings.port, reload=True)
