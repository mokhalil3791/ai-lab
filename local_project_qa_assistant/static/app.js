const rootPathInput = document.getElementById("rootPath");
const questionInput = document.getElementById("question");
const loadProjectBtn = document.getElementById("loadProjectBtn");
const askBtn = document.getElementById("askBtn");
const statusEl = document.getElementById("status");
const answerEl = document.getElementById("answer");
const evidenceSummaryEl = document.getElementById("evidenceSummary");
const confidenceEl = document.getElementById("confidence");
const sourcesEl = document.getElementById("sources");

function setStatus(message, kind = "idle") {
  statusEl.textContent = message;
  statusEl.className = `status ${kind}`;
}

function renderSources(sources) {
  sourcesEl.innerHTML = "";
  if (!sources || !sources.length) {
    const item = document.createElement("li");
    item.textContent = "No sources.";
    item.className = "empty";
    sourcesEl.appendChild(item);
    return;
  }

  for (const source of sources) {
    const item = document.createElement("li");
    item.textContent = `${source.path}:${source.start_line}-${source.end_line}`;
    sourcesEl.appendChild(item);
  }
}

async function loadProject() {
  const rootPath = rootPathInput.value.trim();
  if (!rootPath) {
    setStatus("Enter a project folder path first.", "error");
    return;
  }

  setStatus("Loading project...", "loading");
  try {
    const response = await fetch("/load-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ root_path: rootPath }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Failed to load project.");
    }
    rootPathInput.value = data.root_path;
    setStatus("Project loaded.", "idle");
  } catch (error) {
    setStatus(error.message, "error");
  }
}

async function askQuestion() {
  const rootPath = rootPathInput.value.trim();
  const question = questionInput.value.trim();
  if (!rootPath) {
    setStatus("Load a project folder first.", "error");
    return;
  }
  if (!question) {
    setStatus("Enter a question first.", "error");
    return;
  }

  answerEl.textContent = "";
  evidenceSummaryEl.textContent = "";
  confidenceEl.textContent = "";
  renderSources([]);
  setStatus("Searching files, reading chunks, and calling LM Studio...", "loading");

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        root_path: rootPath,
        question,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || "Question failed.");
    }

    answerEl.textContent = data.answer;
    evidenceSummaryEl.textContent = `Evidence summary: ${data.evidence_summary}`;
    confidenceEl.textContent = `Confidence: ${data.confidence}`;
    renderSources(data.sources);
    setStatus("Done.", "idle");
  } catch (error) {
    answerEl.textContent = "";
    evidenceSummaryEl.textContent = "";
    confidenceEl.textContent = "";
    renderSources([]);
    setStatus(error.message, "error");
  }
}

loadProjectBtn.addEventListener("click", loadProject);
askBtn.addEventListener("click", askQuestion);
