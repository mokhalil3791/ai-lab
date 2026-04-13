const rootPathInput = document.getElementById("rootPath");
const questionInput = document.getElementById("question");
const loadProjectBtn = document.getElementById("loadProjectBtn");
const askBtn = document.getElementById("askBtn");
const statusEl = document.getElementById("status");
const statusDetailEl = document.getElementById("statusDetail");
const timerEl = document.getElementById("timer");
const answerEl = document.getElementById("answer");
const evidenceSummaryEl = document.getElementById("evidenceSummary");
const confidenceEl = document.getElementById("confidence");
const sourcesEl = document.getElementById("sources");

let askTimerId = null;
let askStartedAt = null;

function setStatus(message, kind = "idle", detail = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${kind}`;
  statusDetailEl.textContent = detail;
}

function formatElapsed(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setBusyState(isBusy) {
  loadProjectBtn.disabled = isBusy;
  askBtn.disabled = isBusy;
  rootPathInput.disabled = isBusy;
  questionInput.disabled = isBusy;
}

function startAskTimer() {
  stopAskTimer();
  askStartedAt = Date.now();
  timerEl.hidden = false;
  timerEl.textContent = "Elapsed: 00:00";
  askTimerId = window.setInterval(() => {
    const elapsed = Date.now() - askStartedAt;
    timerEl.textContent = `Elapsed: ${formatElapsed(elapsed)}`;

    if (elapsed >= 12000) {
      setStatus(
        "Still working...",
        "loading",
        "LM Studio is still generating a grounded answer from the retrieved evidence."
      );
    } else if (elapsed >= 4000) {
      setStatus(
        "Calling LM Studio...",
        "loading",
        "Relevant files were gathered and the local model is preparing the answer."
      );
    }
  }, 1000);
}

function stopAskTimer() {
  if (askTimerId !== null) {
    window.clearInterval(askTimerId);
    askTimerId = null;
  }
  askStartedAt = null;
  timerEl.hidden = true;
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
    setStatus("Enter a project folder path first.", "error", "A valid local folder is required before loading a project.");
    return;
  }

  setBusyState(true);
  setStatus("Loading project...", "loading", "Checking that the folder exists and can be used as the project root.");
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
    setStatus("Project loaded.", "idle", "You can now ask questions about this folder.");
  } catch (error) {
    setStatus(error.message, "error", "The project could not be loaded.");
  } finally {
    setBusyState(false);
  }
}

async function askQuestion() {
  const rootPath = rootPathInput.value.trim();
  const question = questionInput.value.trim();
  if (!rootPath) {
    setStatus("Load a project folder first.", "error", "Select a local root folder before asking a question.");
    return;
  }
  if (!question) {
    setStatus("Enter a question first.", "error", "Write a natural-language question about the selected project.");
    return;
  }

  answerEl.textContent = "";
  evidenceSummaryEl.textContent = "";
  confidenceEl.textContent = "";
  renderSources([]);
  setBusyState(true);
  startAskTimer();
  setStatus(
    "Searching files...",
    "loading",
    "Looking for relevant files and extracting the most useful local evidence before calling LM Studio."
  );

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
    const elapsedText = timerEl.textContent.replace("Elapsed: ", "");
    setStatus("Done.", "idle", `Answer completed in ${elapsedText}.`);
  } catch (error) {
    answerEl.textContent = "";
    evidenceSummaryEl.textContent = "";
    confidenceEl.textContent = "";
    renderSources([]);
    setStatus(error.message, "error", "The request did not complete successfully.");
  } finally {
    stopAskTimer();
    setBusyState(false);
  }
}

loadProjectBtn.addEventListener("click", loadProject);
askBtn.addEventListener("click", askQuestion);
