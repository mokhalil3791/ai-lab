const PILLARS = ["EBT", "EET", "DMO", "BU"];
const searchInput = document.getElementById("searchInput");
const sectionFilter = document.getElementById("sectionFilter");
const pillarFilter = document.getElementById("pillarFilter");
const themeFilter = document.getElementById("themeFilter");
const pillarCards = document.getElementById("pillarCards");
const pathCards = document.getElementById("pathCards");
const sectionCards = document.getElementById("sectionCards");
const activityList = document.getElementById("activityList");
const resultsSummary = document.getElementById("resultsSummary");
const detailEmpty = document.getElementById("detailEmpty");
const detailPanel = document.getElementById("detailPanel");
const detailSection = document.getElementById("detailSection");
const detailTheme = document.getElementById("detailTheme");
const detailIcon = document.getElementById("detailIcon");
const detailTitle = document.getElementById("detailTitle");
const detailSummary = document.getElementById("detailSummary");
const detailRaci = document.getElementById("detailRaci");
const detailSignals = document.getElementById("detailSignals");
const detailDefinition = document.getElementById("detailDefinition");
const detailPrompts = document.getElementById("detailPrompts");
const activityCount = document.getElementById("activityCount");
const sectionCount = document.getElementById("sectionCount");
const ownerCount = document.getElementById("ownerCount");
const sourceLabel = document.getElementById("sourceLabel");
const storyIcon = document.getElementById("storyIcon");
const quizTitle = document.getElementById("quizTitle");
const quizSummary = document.getElementById("quizSummary");
const quizMeta = document.getElementById("quizMeta");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuizBtn = document.getElementById("nextQuizBtn");

const ICONS = {
  book: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4.5 5.5A2.5 2.5 0 0 1 7 3h12.5v15.5A2.5 2.5 0 0 0 17 16H7a2.5 2.5 0 0 0-2.5 2.5V5.5Z"/>
      <path d="M7 3v13"/>
      <path d="M10 7h6"/>
      <path d="M10 10h6"/>
    </svg>
  `,
  platform: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="18" height="6" rx="2"/>
      <rect x="3" y="14" width="8" height="6" rx="2"/>
      <rect x="13" y="14" width="8" height="6" rx="2"/>
    </svg>
  `,
  governance: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 3 7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4Z"/>
      <path d="M9.5 12.5 11 14l3.5-4"/>
    </svg>
  `,
  operations: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 18h4l2-6 3 4 2-7 2 9h3"/>
    </svg>
  `,
  security: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2"/>
      <path d="M8 11V8a4 4 0 0 1 8 0v3"/>
      <circle cx="12" cy="16" r="1.2"/>
    </svg>
  `,
  enablement: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3v18"/>
      <path d="m5 10 7-7 7 7"/>
      <path d="M5 21h14"/>
    </svg>
  `,
  ownership: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 7h10v10H7z"/>
      <path d="M3 12h4"/>
      <path d="M17 12h4"/>
      <path d="M12 3v4"/>
      <path d="M12 17v4"/>
    </svg>
  `,
  spark: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="m13 2-7 11h5l-1 9 8-12h-5l0-8Z"/>
    </svg>
  `,
};

const THEME_CONFIG = {
  platform: {
    label: "Platform setup",
    icon: "platform",
    summary: "Workspaces, catalogs, network setup, and foundation services that make Databricks usable.",
  },
  governance: {
    label: "Governance and control",
    icon: "governance",
    summary: "Policies, ownership models, catalog design, entitlements, and oversight responsibilities.",
  },
  operations: {
    label: "Operations and reliability",
    icon: "operations",
    summary: "Monitoring, incident response, support routes, performance, and capacity planning.",
  },
  security: {
    label: "Security and compliance",
    icon: "security",
    summary: "Privileged access, SIEM integration, controls, risk, and regulatory evidence.",
  },
  enablement: {
    label: "Enablement and adoption",
    icon: "enablement",
    summary: "Training, onboarding, templates, champion networks, and migration acceleration.",
  },
  mlops: {
    label: "MLOps and engineering",
    icon: "spark",
    summary: "Shared standards for models, feature stores, runtimes, code promotion, and tooling.",
  },
  ownership: {
    label: "Ownership boundaries",
    icon: "ownership",
    summary: "What is platform-managed, what stays in the business, and how responsibilities evolve.",
  },
};

const LEARNING_PATHS = [
  { title: "Platform foundations", theme: "platform", text: "Best for stakeholders who need to understand workspaces, clusters, subscriptions, connectivity, and baseline platform controls." },
  { title: "Governance decisions", theme: "governance", text: "Focus on catalog design, stewardship, access policy, retention, and all the decision rights around enterprise data." },
  { title: "Operate with confidence", theme: "operations", text: "Show how monitoring, incident response, support routing, and performance standards keep the platform reliable." },
  { title: "Responsible AI and security", theme: "security", text: "Explore privileged access, security incidents, SIEM, AI gateway controls, and audit readiness." },
];

const state = {
  activities: window.WORKSHOP_DATA.activities.map((activity) => enrichActivity(activity)),
  selectedId: null,
  search: "",
  section: "all",
  pillar: "all",
  theme: "all",
  quizId: null,
};

function iconMarkup(name) {
  return ICONS[name] || ICONS.platform;
}

function sectionIndex(section) {
  return window.WORKSHOP_DATA.sections.indexOf(section) + 1;
}

function primaryOwner(activity) {
  for (const pillar of PILLARS) {
    if (activity.defaultRaci[pillar] === "R/A" || activity.defaultRaci[pillar] === "A") {
      return pillar;
    }
  }
  for (const pillar of PILLARS) {
    if (activity.defaultRaci[pillar] === "R") {
      return pillar;
    }
  }
  return "Shared";
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

function classifyTheme(activity) {
  const haystack = `${activity.section} ${activity.title} ${activity.summary}`.toLowerCase();
  if (haystack.includes("incident") || haystack.includes("monitor") || haystack.includes("performance") || haystack.includes("support") || haystack.includes("sla")) {
    return "operations";
  }
  if (haystack.includes("security") || haystack.includes("siem") || haystack.includes("audit") || haystack.includes("vulnerability") || haystack.includes("privileged") || haystack.includes("compliance")) {
    return "security";
  }
  if (haystack.includes("ml") || haystack.includes("model") || haystack.includes("feature store") || haystack.includes("inference") || haystack.includes("runtime") || haystack.includes("sdk")) {
    return "mlops";
  }
  if (haystack.includes("training") || haystack.includes("onboarding") || haystack.includes("community") || haystack.includes("template") || haystack.includes("champion") || haystack.includes("migration")) {
    return "enablement";
  }
  if (haystack.includes("ownership") || haystack.includes("boundary") || haystack.includes("graduation") || haystack.includes("user-managed") || haystack.includes("platform-managed")) {
    return "ownership";
  }
  if (haystack.includes("catalog") || haystack.includes("governance") || haystack.includes("classification") || haystack.includes("retention") || haystack.includes("policy") || haystack.includes("entitlement") || haystack.includes("lineage")) {
    return "governance";
  }
  return "platform";
}

function enrichActivity(activity) {
  const theme = classifyTheme(activity);
  return {
    ...activity,
    theme,
    themeLabel: THEME_CONFIG[theme].label,
    primaryOwner: primaryOwner(activity),
    sectionNumber: sectionIndex(activity.section),
  };
}

function searchableText(activity) {
  return `${activity.section} ${activity.title} ${activity.summary} ${activity.definition} ${activity.themeLabel}`.toLowerCase();
}

function filteredActivities() {
  return state.activities.filter((activity) => {
    const matchesSearch = !state.search || searchableText(activity).includes(state.search);
    const matchesSection = state.section === "all" || activity.section === state.section;
    const matchesPillar = state.pillar === "all" || activity.primaryOwner === state.pillar;
    const matchesTheme = state.theme === "all" || activity.theme === state.theme;
    return matchesSearch && matchesSection && matchesPillar && matchesTheme;
  });
}

function renderPillars() {
  pillarCards.innerHTML = "";
  for (const [code, pillar] of Object.entries(window.WORKSHOP_DATA.pillars)) {
    const card = document.createElement("article");
    card.className = "pillar-card";
    card.innerHTML = `
      <div class="pillar-top">
        <span class="mini-pill">${code}</span>
        <strong>${pillar.name}</strong>
      </div>
      <p>${pillar.summary}</p>
    `;
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

function renderThemeOptions() {
  for (const [key, theme] of Object.entries(THEME_CONFIG)) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = theme.label;
    themeFilter.appendChild(option);
  }
}

function renderLearningPaths() {
  pathCards.innerHTML = "";
  for (const path of LEARNING_PATHS) {
    const theme = THEME_CONFIG[path.theme];
    const card = document.createElement("article");
    card.className = "path-card";
    card.innerHTML = `
      <div class="icon-badge icon-soft" aria-hidden="true">${iconMarkup(theme.icon)}</div>
      <div>
        <h3>${path.title}</h3>
        <p>${path.text}</p>
      </div>
    `;
    card.addEventListener("click", () => {
      state.theme = path.theme;
      themeFilter.value = path.theme;
      renderExplorer();
    });
    pathCards.appendChild(card);
  }
}

function renderSectionCards() {
  sectionCards.innerHTML = "";
  for (const section of window.WORKSHOP_DATA.sections) {
    const sectionActivities = state.activities.filter((activity) => activity.section === section);
    const topTheme = mostCommon(sectionActivities.map((activity) => activity.theme));
    const card = document.createElement("article");
    card.className = "section-card";
    card.innerHTML = `
      <span class="section-number">0${sectionIndex(section)}</span>
      <h3>${section}</h3>
      <p>${sectionActivities.length} activities in this section.</p>
      <div class="section-tags">
        <span class="mini-tag">${THEME_CONFIG[topTheme].label}</span>
        <span class="mini-tag">${mostCommon(sectionActivities.map((activity) => activity.primaryOwner))} often leads</span>
      </div>
    `;
    card.addEventListener("click", () => {
      state.section = section;
      sectionFilter.value = section;
      renderExplorer();
      document.getElementById("explorer").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    sectionCards.appendChild(card);
  }
}

function mostCommon(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return [...counts.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] || "";
}

function previewSignals(activity) {
  const theme = THEME_CONFIG[activity.theme];
  const signals = [`This sits in the ${theme.label.toLowerCase()} theme, which helps frame the discussion for non-technical audiences.`];

  if (activity.primaryOwner === "DMO") {
    signals.push("The suggested lead is DMO, which usually means the activity is more about policy, ownership, or control decisions than pure technical setup.");
  } else if (activity.primaryOwner === "EET") {
    signals.push("The suggested lead is EET, which usually points to foundational cloud, identity, networking, or enterprise security responsibilities.");
  } else if (activity.primaryOwner === "EBT") {
    signals.push("The suggested lead is EBT, which often means this is a business-facing platform capability or shared data service.");
  } else if (activity.primaryOwner === "BU") {
    signals.push("The suggested lead is the BU, which indicates the outcome stays close to domain delivery, stewardship, or workload ownership.");
  }

  if (activity.title.toLowerCase().includes("policy") || activity.title.toLowerCase().includes("governance")) {
    signals.push("This is a strong workshop topic because teams often need to separate policy design from implementation work.");
  }

  return signals;
}

function activityCard(activity) {
  const theme = THEME_CONFIG[activity.theme];
  const card = document.createElement("article");
  card.className = "activity-card";
  if (activity.id === state.selectedId) {
    card.classList.add("selected");
  }

  card.innerHTML = `
    <div class="activity-card-top">
      <div class="icon-badge icon-soft" aria-hidden="true">${iconMarkup(theme.icon)}</div>
      <div>
        <span class="theme-chip">${theme.label}</span>
        <h3>${activity.title}</h3>
      </div>
    </div>
    <p>${activity.summary}</p>
    <div class="activity-meta-row">
      <span class="mini-tag">${activity.section}</span>
      <span class="mini-tag">Lead: ${activity.primaryOwner}</span>
    </div>
    <div class="raci-inline">
      ${PILLARS.map((pillar) => `<span class="raci-mini ${roleClass(activity.defaultRaci[pillar])}">${pillar} ${activity.defaultRaci[pillar]}</span>`).join("")}
    </div>
  `;

  card.addEventListener("click", () => {
    state.selectedId = activity.id;
    renderExplorer();
    renderDetail(activity.id);
  });

  return card;
}

function renderExplorer() {
  const visibleActivities = filteredActivities();
  activityList.innerHTML = "";
  if (!visibleActivities.length) {
    activityList.innerHTML = `<div class="empty-state">No activities match the current filters. Try clearing one filter or searching for a broader term like "security" or "catalog".</div>`;
    resultsSummary.textContent = "No matching activities right now.";
    renderDetail(null);
    return;
  }

  for (const activity of visibleActivities) {
    activityList.appendChild(activityCard(activity));
  }

  if (!visibleActivities.some((activity) => activity.id === state.selectedId)) {
    state.selectedId = visibleActivities[0].id;
  }

  resultsSummary.textContent = `${visibleActivities.length} activities visible across ${new Set(visibleActivities.map((activity) => activity.section)).size} sections.`;
  renderDetail(state.selectedId);
}

function rationaleForActivity(activity) {
  const reasons = previewSignals(activity);
  const assigned = PILLARS.filter((pillar) => activity.defaultRaci[pillar] !== "–");
  const consulted = assigned.filter((pillar) => activity.defaultRaci[pillar] === "C");
  if (consulted.length) {
    reasons.push(`${consulted.join(", ")} being consulted suggests the activity crosses organisational boundaries and needs input before a decision or implementation is finalised.`);
  }

  const informed = assigned.filter((pillar) => activity.defaultRaci[pillar] === "I");
  if (informed.length) {
    reasons.push(`${informed.join(", ")} being informed implies they should stay aware of the decision or change, even if they are not expected to actively do the work.`);
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
  detailTheme.textContent = activity.themeLabel;
  detailIcon.innerHTML = iconMarkup(THEME_CONFIG[activity.theme].icon);
  detailTitle.textContent = activity.title;
  detailSummary.textContent = activity.summary;

  detailRaci.innerHTML = "";
  for (const pillar of PILLARS) {
    const chip = document.createElement("div");
    const role = activity.defaultRaci[pillar];
    chip.className = `raci-chip ${roleClass(role)}`;
    chip.innerHTML = `<span>${pillar}</span><strong>${role}</strong>`;
    detailRaci.appendChild(chip);
  }

  detailSignals.innerHTML = "";
  for (const reason of rationaleForActivity(activity)) {
    const item = document.createElement("li");
    item.textContent = reason;
    detailSignals.appendChild(item);
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
  ownerCount.textContent = String(new Set(state.activities.map((activity) => activity.primaryOwner)).size);
  sourceLabel.textContent = `${window.WORKSHOP_DATA.generatedFrom.glossary} and ${window.WORKSHOP_DATA.generatedFrom.presentation}`;
  storyIcon.innerHTML = iconMarkup("book");
}

function quizFeedbackText(activity, choice) {
  const correct = activity.primaryOwner;
  if (choice === correct) {
    return `Correct. ${correct} is the suggested lead here. ${previewSignals(activity)[1] || ""}`.trim();
  }
  return `The suggested lead is ${correct}, not ${choice}. ${previewSignals(activity)[1] || "Use the glossary wording to separate implementation work from policy or domain ownership."}`.trim();
}

function renderQuiz() {
  const pool = state.activities.filter((activity) => activity.id !== state.quizId);
  const next = pool[Math.floor(Math.random() * pool.length)] || state.activities[0];
  if (!next) {
    return;
  }

  state.quizId = next.id;
  quizTitle.textContent = next.title;
  quizSummary.textContent = next.summary;
  quizMeta.innerHTML = `
    <span class="mini-tag">${next.section}</span>
    <span class="mini-tag">${next.themeLabel}</span>
  `;

  quizOptions.innerHTML = "";
  for (const pillar of PILLARS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = `${pillar} · ${window.WORKSHOP_DATA.pillars[pillar].name}`;
    button.addEventListener("click", () => {
      quizFeedback.textContent = quizFeedbackText(next, pillar);
      const buttons = quizOptions.querySelectorAll("button");
      for (const element of buttons) {
        element.classList.remove("correct", "incorrect");
        if (element === button) {
          element.classList.add(pillar === next.primaryOwner ? "correct" : "incorrect");
        }
      }
    });
    quizOptions.appendChild(button);
  }

  quizFeedback.textContent = "Choose a pillar to reveal the suggested answer and explanation.";
}

function wireEvents() {
  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderExplorer();
  });

  sectionFilter.addEventListener("change", (event) => {
    state.section = event.target.value;
    renderExplorer();
  });

  pillarFilter.addEventListener("change", (event) => {
    state.pillar = event.target.value;
    renderExplorer();
  });

  themeFilter.addEventListener("change", (event) => {
    state.theme = event.target.value;
    renderExplorer();
  });

  nextQuizBtn.addEventListener("click", renderQuiz);
}

function init() {
  renderPillars();
  renderSectionOptions();
  renderThemeOptions();
  renderLearningPaths();
  renderSectionCards();
  wireEvents();
  updateStats();
  state.selectedId = state.activities[0]?.id || null;
  renderExplorer();
  renderDetail(state.selectedId);
  renderQuiz();
}

init();
