const ROLE_OPTIONS = ["R/A", "R", "A", "C", "I", "–"];
const STORAGE_KEY = "databricks-workshop-raci-overrides-v1";
const PILLARS = ["EBT", "EET", "DMO", "BU"];

const searchInput = document.getElementById("searchInput");
const sectionFilter = document.getElementById("sectionFilter");
const exportBtn = document.getElementById("exportBtn");
const resetBtn = document.getElementById("resetBtn");
const pillarCards = document.getElementById("pillarCards");
const matrixBody = document.getElementById("matrixBody");
const matrixStatus = document.getElementById("matrixStatus");
const detailEmpty = document.getElementById("detailEmpty");
const detailPanel = document.getElementById("detailPanel");
const detailSection = document.getElementById("detailSection");
const detailChanged = document.getElementById("detailChanged");
const detailTitle = document.getElementById("detailTitle");
const detailSummary = document.getElementById("detailSummary");
const detailRaci = document.getElementById("detailRaci");
const detailRationale = document.getElementById("detailRationale");
const detailDefinition = document.getElementById("detailDefinition");
const detailPrompts = document.getElementById("detailPrompts");
const activityCount = document.getElementById("activityCount");
const sectionCount = document.getElementById("sectionCount");
const changedCount = document.getElementById("changedCount");

const state = {
  activities: window.WORKSHOP_DATA.activities.map((activity) => ({
    ...activity,
    currentRaci: { ...activity.defaultRaci },
  })),
  selectedId: null,
  search: "",
  section: "all",
};

function loadOverrides() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const overrides = JSON.parse(raw);
    for (const activity of state.activities) {
      if (overrides[activity.id]) {
        activity.currentRaci = { ...activity.currentRaci, ...overrides[activity.id] };
      }
    }
  } catch (error) {
    console.warn("Failed to load workshop overrides", error);
  }
}

function saveOverrides() {
  const overrides = {};
  for (const activity of state.activities) {
    if (isChanged(activity)) {
      overrides[activity.id] = activity.currentRaci;
    }
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function isChanged(activity) {
  return PILLARS.some((pillar) => activity.currentRaci[pillar] !== activity.defaultRaci[pillar]);
}

function roleClass(role) {
  if (role === "R/A") {
    return "role-ra";
  }
  if (role === "R") {
    return "role-r";
  }
  if (role === "A") {
    return "role-a";
  }
  if (role === "C") {
    return "role-c";
  }
  if (role === "I") {
    return "role-i";
  }
  return "role-none";
}

function titleKeywords(activity) {
  return `${activity.section} ${activity.title} ${activity.summary}`.toLowerCase();
}

function filteredActivities() {
  return state.activities.filter((activity) => {
    const matchesSearch = !state.search || titleKeywords(activity).includes(state.search);
    const matchesSection = state.section === "all" || activity.section === state.section;
    return matchesSearch && matchesSection;
  });
}

function renderPillars() {
  pillarCards.innerHTML = "";
  for (const [code, pillar] of Object.entries(window.WORKSHOP_DATA.pillars)) {
    const card = document.createElement("article");
    card.className = "pillar-card";
    card.innerHTML = `<h3>${code} · ${pillar.name}</h3><p>${pillar.summary}</p>`;
    pillarCards.appendChild(card);
  }
}

function renderSectionOptions() {
  for (const section of window.WORKSHOP_DATA.sections) {
    const option = document.createElement("option");
    option.value = section;
    option.textContent = section;
    sectionFilter.appendChild(option);
  }
}

function buildRaciSelect(activity, pillar) {
  const select = document.createElement("select");
  select.className = "raci-select";
  select.setAttribute("aria-label", `${activity.title} ${pillar}`);
  for (const role of ROLE_OPTIONS) {
    const option = document.createElement("option");
    option.value = role;
    option.textContent = role;
    if (activity.currentRaci[pillar] === role) {
      option.selected = true;
    }
    select.appendChild(option);
  }

  select.addEventListener("click", (event) => event.stopPropagation());
  select.addEventListener("change", (event) => {
    activity.currentRaci[pillar] = event.target.value;
    saveOverrides();
    updateStats();
    renderMatrix();
    if (state.selectedId === activity.id) {
      renderDetail(activity.id);
    }
  });

  return select;
}

function renderMatrix() {
  const visibleActivities = filteredActivities();
  matrixBody.innerHTML = "";

  for (const activity of visibleActivities) {
    const row = document.createElement("tr");
    if (activity.id === state.selectedId) {
      row.classList.add("selected");
    }
    if (isChanged(activity)) {
      row.classList.add("changed");
    }

    const activityCell = document.createElement("td");
    activityCell.className = "activity-cell";
    activityCell.innerHTML = `
      <span class="activity-title">${activity.title}</span>
      <span class="activity-meta">${activity.section}</span>
    `;
    row.appendChild(activityCell);

    for (const pillar of PILLARS) {
      const cell = document.createElement("td");
      cell.appendChild(buildRaciSelect(activity, pillar));
      row.appendChild(cell);
    }

    row.addEventListener("click", () => {
      state.selectedId = activity.id;
      renderMatrix();
      renderDetail(activity.id);
    });

    matrixBody.appendChild(row);
  }

  if (!visibleActivities.length) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5">No activities match the current filters.</td>`;
    matrixBody.appendChild(row);
  }

  matrixStatus.textContent = `${visibleActivities.length} activities visible. Select a row to guide the discussion.`;
}

function rationaleForActivity(activity) {
  const reasons = [];
  const title = activity.title.toLowerCase();
  const assigned = PILLARS.filter((pillar) => activity.currentRaci[pillar] !== "–");
  const owners = PILLARS.filter((pillar) => activity.currentRaci[pillar] === "A" || activity.currentRaci[pillar] === "R/A");

  for (const pillar of owners) {
    if (pillar === "EBT") {
      if (title.includes("monitor") || title.includes("incident") || title.includes("training") || title.includes("template") || title.includes("mlops") || title.includes("cluster")) {
        reasons.push("EBT is a sensible owner when the work is about running the shared Databricks service, shaping operating standards, or enabling many business teams at once.");
      } else {
        reasons.push("EBT being accountable usually means the activity sits in the business-facing data platform space rather than deep infrastructure or pure governance.");
      }
    }
    if (pillar === "EET") {
      if (title.includes("network") || title.includes("subscription") || title.includes("identity") || title.includes("vulnerability") || title.includes("key vault") || title.includes("service principal")) {
        reasons.push("EET fits well as owner where the activity depends on foundational cloud infrastructure, identity, security baselines, or enterprise engineering controls.");
      } else {
        reasons.push("EET ownership generally signals enterprise platform engineering responsibility rather than business-facing platform operations.");
      }
    }
    if (pillar === "DMO") {
      if (title.includes("catalog") || title.includes("classification") || title.includes("governance") || title.includes("policy") || title.includes("retention") || title.includes("risk") || title.includes("audit")) {
        reasons.push("DMO is a natural owner where the row is primarily about governance decisions, policy definition, classification, entitlements, or evidence for control and audit.");
      } else {
        reasons.push("DMO ownership usually means the activity is fundamentally a governance and decision-rights question, not just a technical implementation task.");
      }
    }
    if (pillar === "BU") {
      if (title.includes("domain") || title.includes("job") || title.includes("workload") || title.includes("cost") || title.includes("resource") || title.includes("stewardship") || title.includes("migration")) {
        reasons.push("BU accountability makes sense when the row is close to domain delivery, business-owned workloads, stewardship, or local cost and risk decisions.");
      } else {
        reasons.push("BU ownership usually indicates that the platform can enable the work, but the business still owns the outcome and day-to-day decisions.");
      }
    }
  }

  const consulted = assigned.filter((pillar) => activity.currentRaci[pillar] === "C");
  if (consulted.length) {
    reasons.push(`${consulted.join(", ")} being consulted suggests the activity crosses organisational boundaries and needs input before a decision or implementation is finalised.`);
  }

  const informed = assigned.filter((pillar) => activity.currentRaci[pillar] === "I");
  if (informed.length) {
    reasons.push(`${informed.join(", ")} being informed implies they should stay aware of the decision or change, even if they are not expected to actively do the work.`);
  }

  if (!reasons.length) {
    reasons.push("Use the glossary definition and the organisational descriptions above to decide whether the current split still feels right for your operating model.");
  }

  return reasons;
}

function promptsForActivity(activity) {
  const prompts = [
    "Does the accountable owner truly have the authority to make the decision and carry the outcome?",
    "If this activity goes wrong in production, who would the business expect to step in first?",
    "Which team has to keep this operating after the initial setup or project phase ends?",
  ];

  const title = activity.title.toLowerCase();
  if (title.includes("policy") || title.includes("governance") || title.includes("classification")) {
    prompts.push("Is this primarily a policy-setting decision, or is it mostly a technical implementation task?");
  }
  if (title.includes("cost") || title.includes("finops")) {
    prompts.push("Should the cost owner be the same as the team that can actually influence consumption day to day?");
  }
  if (title.includes("incident") || title.includes("security")) {
    prompts.push("Do you want separate ownership for platform-scope incidents versus business-domain incidents?");
  }
  if (title.includes("catalog") || title.includes("unity catalog")) {
    prompts.push("Are you separating functional design decisions from the technical act of implementing them in Databricks?");
  }

  return prompts;
}

function renderDetail(activityId) {
  const activity = state.activities.find((item) => item.id === activityId);
  if (!activity) {
    detailPanel.hidden = true;
    detailEmpty.hidden = false;
    return;
  }

  detailEmpty.hidden = true;
  detailPanel.hidden = false;
  detailSection.textContent = activity.section;
  detailChanged.hidden = !isChanged(activity);
  detailTitle.textContent = activity.title;
  detailSummary.textContent = activity.summary;

  detailRaci.innerHTML = "";
  for (const pillar of PILLARS) {
    const chip = document.createElement("div");
    const role = activity.currentRaci[pillar];
    chip.className = `raci-chip ${roleClass(role)}`;
    chip.innerHTML = `<span>${pillar}</span><strong>${role}</strong>`;
    detailRaci.appendChild(chip);
  }

  detailRationale.innerHTML = "";
  for (const reason of rationaleForActivity(activity)) {
    const item = document.createElement("li");
    item.textContent = reason;
    detailRationale.appendChild(item);
  }

  detailDefinition.innerHTML = "";
  for (const paragraph of activity.definition.split("\n\n")) {
    const element = document.createElement("p");
    element.textContent = paragraph;
    detailDefinition.appendChild(element);
  }

  detailPrompts.innerHTML = "";
  for (const prompt of promptsForActivity(activity)) {
    const item = document.createElement("li");
    item.textContent = prompt;
    detailPrompts.appendChild(item);
  }
}

function updateStats() {
  activityCount.textContent = String(state.activities.length);
  sectionCount.textContent = String(window.WORKSHOP_DATA.sections.length);
  changedCount.textContent = String(state.activities.filter(isChanged).length);
}

function exportCsv() {
  const rows = [
    ["Section", "Activity", "EBT", "EET", "DMO", "BU", "Changed"],
    ...state.activities.map((activity) => [
      activity.section,
      activity.title,
      activity.currentRaci.EBT,
      activity.currentRaci.EET,
      activity.currentRaci.DMO,
      activity.currentRaci.BU,
      isChanged(activity) ? "Yes" : "No",
    ]),
  ];

  const csv = rows
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "databricks-raci-workshop.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function resetChanges() {
  for (const activity of state.activities) {
    activity.currentRaci = { ...activity.defaultRaci };
  }
  saveOverrides();
  updateStats();
  renderMatrix();
  if (state.selectedId) {
    renderDetail(state.selectedId);
  }
}

function wireEvents() {
  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderMatrix();
  });

  sectionFilter.addEventListener("change", (event) => {
    state.section = event.target.value;
    renderMatrix();
  });

  exportBtn.addEventListener("click", exportCsv);
  resetBtn.addEventListener("click", resetChanges);
}

function init() {
  loadOverrides();
  renderPillars();
  renderSectionOptions();
  wireEvents();
  updateStats();
  state.selectedId = state.activities[0]?.id || null;
  renderMatrix();
  renderDetail(state.selectedId);
}

init();
