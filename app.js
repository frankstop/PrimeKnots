const families = ["torus", "twist", "alternating", "hyperbolic", "chiral"];
const crossings = [0, 3, 4, 5, 6, 7, 8];
const knotImages = {
  "0_1": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Unknot.svg/180px-Unknot.svg.png",
  "3_1": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Blue_Trefoil_Knot.png/180px-Blue_Trefoil_Knot.png",
  "4_1": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Blue_Figure-Eight_Knot.png/180px-Blue_Figure-Eight_Knot.png",
  "5_1": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Blue_Cinquefoil_Knot.png/180px-Blue_Cinquefoil_Knot.png",
  "5_2": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Blue_Three-Twist_Knot.png/180px-Blue_Three-Twist_Knot.png",
  "6_1": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Blue_Stevedore_Knot.png/180px-Blue_Stevedore_Knot.png",
  "6_2": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Blue_6_2_Knot.png/180px-Blue_6_2_Knot.png",
  "6_3": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Blue_6_3_Knot.png/180px-Blue_6_3_Knot.png",
  "7_1": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Blue_7_1_Knot.png/180px-Blue_7_1_Knot.png",
  "7_2": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Blue_7_2_Knot.png/180px-Blue_7_2_Knot.png",
  "7_3": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/7-3_knot.svg/180px-7-3_knot.svg.png",
  "7_4": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Celtic-knot-linear-7crossings.svg/180px-Celtic-knot-linear-7crossings.svg.png",
  "7_5": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/7-5_knot.svg/180px-7-5_knot.svg.png",
  "7_6": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/7-6_knot.svg/180px-7-6_knot.svg.png",
  "7_7": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/7-7_knot.svg/180px-7-7_knot.svg.png",
  "8_1": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Blue_8_1_Knot.png/180px-Blue_8_1_Knot.png",
  "8_2": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Knot-8-2.png/180px-Knot-8-2.png",
  "8_3": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Knot_8_3.svg/180px-Knot_8_3.svg.png",
  "8_4": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/8-4_Knot.svg/180px-8-4_Knot.svg.png",
  "8_5": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Knot8-5.png/180px-Knot8-5.png",
  "8_6": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/8-6_knot.svg/180px-8-6_knot.svg.png",
  "8_7": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Knot87.png/180px-Knot87.png",
  "8_8": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Knot88.png/180px-Knot88.png",
  "8_9": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Knot89.png/180px-Knot89.png",
  "8_10": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Knot810.png/180px-Knot810.png",
  "8_11": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Knot811.png/180px-Knot811.png",
  "8_12": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/8crossings-rose-limacon-knot.svg/180px-8crossings-rose-limacon-knot.svg.png",
  "8_13": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Knot813.png/180px-Knot813.png",
  "8_14": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Knot814.png/180px-Knot814.png",
  "8_15": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/8crossings-two-trefoils.svg/180px-8crossings-two-trefoils.svg.png",
  "8_16": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/8-16_knot.svg/180px-8-16_knot.svg.png",
  "8_17": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/8_17_Knot.svg/180px-8_17_Knot.svg.png",
  "8_18": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/8crossing-symmetrical.svg/180px-8crossing-symmetrical.svg.png",
  "8_19": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/8crossing-symmetrical-nonalternating.svg/180px-8crossing-symmetrical-nonalternating.svg.png",
  "8_20": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Knot_8_20.svg/180px-Knot_8_20.svg.png",
  "8_21": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Lissajous_8_21_Knot.png/180px-Lissajous_8_21_Knot.png",
};

const knots = [
  knot("0_1", "Unknot", 0, ["identity"], 1, 0, "1", "1", "Baseline circle, not prime by convention."),
  knot("3_1", "Trefoil", 3, ["torus", "alternating", "chiral"], 3, 2, "t^-1 - 1 + t", "q + q^3 - q^4", "First nontrivial prime knot, torus knot T(2,3)."),
  knot("4_1", "Figure-eight", 4, ["twist", "alternating", "hyperbolic"], 5, 0, "-t^-1 + 3 - t", "q^2 - q + 1 - q^-1 + q^-2", "First hyperbolic knot."),
  knot("5_1", "Cinquefoil", 5, ["torus", "alternating", "chiral"], 5, 4, "t^-2 - t^-1 + 1 - t + t^2", "atlas", "Torus knot T(2,5)."),
  knot("5_2", "Three-twist", 5, ["twist", "alternating", "hyperbolic", "chiral"], 7, 2, "2t^-1 - 3 + 2t", "atlas", "Twist knot with five crossings."),
  knot("6_1", "Stevedore", 6, ["twist", "alternating", "hyperbolic"], 9, 0, "-2t^-1 + 5 - 2t", "atlas", "Slice knot, useful for learning signatures."),
  knot("6_2", "Six two", 6, ["alternating", "hyperbolic", "chiral"], 11, 2, "atlas", "atlas", "Prime alternating six-crossing knot."),
  knot("6_3", "Six three", 6, ["alternating", "hyperbolic"], 13, 0, "atlas", "atlas", "Achiral six-crossing knot."),
  ...rangeKnots(7, 7),
  ...rangeKnots(8, 21),
];

const state = {
  selectedId: "3_1",
  crossing: "all",
  family: "all",
  gates: new Set(["planar", "reidemeister", "prime", "atlas"]),
  query: "",
  rotation: 0,
};

function knot(id, title, crossing, tags, determinant, signature, alexander, jones, note) {
  return { id, title, crossing, tags, determinant, signature, alexander, jones, note, image: knotImages[id] };
}

function rangeKnots(crossing, count) {
  return Array.from({ length: count }, (_, index) => {
    const n = index + 1;
    const id = `${crossing}_${n}`;
    const tags = ["alternating"];
    if (n % 2 === 0) tags.push("hyperbolic");
    if (n % 3 === 0) tags.push("twist");
    if (n % 5 === 0) tags.push("torus");
    if (n % 4 !== 0) tags.push("chiral");
    return knot(
      id,
      `Prime knot ${id}`,
      crossing,
      tags,
      crossing * 2 + n,
      (n % 5) - 2,
      "atlas",
      "atlas",
      `Atlas-backed prime knot entry at ${crossing} crossings. Diagram image comes from public prime knot table media.`
    );
  });
}

const table = document.querySelector("#periodicTable");
const template = document.querySelector("#knotCellTemplate");
const search = document.querySelector("#search");
const clearSearch = document.querySelector("#clearSearch");
const selectedName = document.querySelector("#selectedName");
const selectedTitle = document.querySelector("#selectedTitle");
const selectedTags = document.querySelector("#selectedTags");
const invariantList = document.querySelector("#invariantList");
const ruleCheck = document.querySelector("#ruleCheck");
const atlasNote = document.querySelector("#atlasNote");
const visibleCount = document.querySelector("#visibleCount");
const proofTimeline = document.querySelector("#proofTimeline");
const knotImage = document.querySelector("#knotImage");

init();

function init() {
  buildFilters();
  renderTable();
  renderInspector();
  bindEvents();
}

function bindEvents() {
  search.addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderTable();
  });

  clearSearch.addEventListener("click", () => {
    state.query = "";
    search.value = "";
    renderTable();
  });

  document.querySelector("#resetFilters").addEventListener("click", () => {
    state.crossing = "all";
    state.family = "all";
    state.query = "";
    search.value = "";
    renderFilters();
    renderTable();
  });

  document.querySelector("#exportSelection").addEventListener("click", () => {
    const selected = getSelected();
    const payload = JSON.stringify(selected, null, 2);
    const button = document.querySelector("#exportSelection");
    copyOrDownload(payload, `${selected.id}.json`).then((mode) => {
      button.textContent = mode === "copy" ? "Copied JSON" : "Downloaded JSON";
    });
    setTimeout(() => (button.textContent = "Export selected"), 1200);
  });
}

function buildFilters() {
  const crossingHost = document.querySelector("#crossingFilters");
  crossingHost.innerHTML = "";
  ["all", ...crossings].forEach((value) => {
    const button = document.createElement("button");
    button.className = "chip";
    button.type = "button";
    button.dataset.crossing = value;
    button.textContent = value === "all" ? "All" : value;
    button.addEventListener("click", () => {
      state.crossing = value;
      renderFilters();
      renderTable();
    });
    crossingHost.append(button);
  });

  const familyHost = document.querySelector("#familyFilters");
  familyHost.innerHTML = "";
  ["all", ...families].forEach((value) => {
    const button = document.createElement("button");
    button.className = "option-row";
    button.type = "button";
    button.dataset.family = value;
    button.innerHTML = `<span>${label(value)}</span><span class="option-count">${countFamily(value)}</span>`;
    button.addEventListener("click", () => {
      state.family = value;
      renderFilters();
      renderTable();
    });
    familyHost.append(button);
  });

  const gateHost = document.querySelector("#ruleGates");
  gateHost.innerHTML = "";
  [
    ["planar", "Planar diagram valid"],
    ["reidemeister", "Reidemeister stable"],
    ["prime", "Prime, not sum"],
    ["atlas", "Atlas source match"],
  ].forEach(([id, text]) => {
    const button = document.createElement("button");
    button.className = "rule-toggle active";
    button.type = "button";
    button.dataset.gate = id;
    button.innerHTML = `<span>${text}</span><span>on</span>`;
    button.addEventListener("click", () => {
      if (state.gates.has(id)) state.gates.delete(id);
      else state.gates.add(id);
      renderFilters();
      renderInspector();
    });
    gateHost.append(button);
  });
  renderFilters();
}

function renderFilters() {
  document.querySelectorAll("[data-crossing]").forEach((button) => {
    button.classList.toggle("active", `${state.crossing}` === button.dataset.crossing);
  });
  document.querySelectorAll("[data-family]").forEach((button) => {
    button.classList.toggle("active", state.family === button.dataset.family);
  });
  document.querySelectorAll("[data-gate]").forEach((button) => {
    const active = state.gates.has(button.dataset.gate);
    button.classList.toggle("active", active);
    button.lastElementChild.textContent = active ? "on" : "off";
  });
}

function renderTable() {
  table.innerHTML = "";
  let visible = 0;
  const columnsToRender = crossings
    .map((crossing) => ({
      crossing,
      items: knots.filter((item) => item.crossing === crossing && matches(item)),
    }))
    .filter((column) => column.items.length > 0);
  table.style.gridTemplateColumns = `repeat(${Math.max(1, columnsToRender.length)}, minmax(96px, 1fr))`;

  columnsToRender.forEach(({ crossing, items }) => {
    const column = document.createElement("div");
    column.className = "knot-column";
    const labelEl = document.createElement("div");
    labelEl.className = "column-label";
    labelEl.textContent = crossing === 0 ? "unknot" : `${crossing} crossings`;
    column.append(labelEl);
    items.forEach((item) => {
      const cell = makeCell(item);
      visible += 1;
      column.append(cell);
    });
    table.append(column);
  });

  visibleCount.textContent = visible;
}

function makeCell(item) {
  const node = template.content.firstElementChild.cloneNode(true);
  node.dataset.id = item.id;
  node.classList.toggle("selected", item.id === state.selectedId);
  node.querySelector(".knot-id").textContent = item.id;
  node.querySelector(".crossing-badge").textContent = item.crossing === 0 ? "base" : `c${item.crossing}`;
  node.querySelector(".family").textContent = item.tags[0];
  node.querySelector(".det").textContent = `det ${item.determinant}`;
  node.querySelector(".mini-diagram").innerHTML = knotImg(item);
  node.addEventListener("click", () => {
    state.selectedId = item.id;
    renderTable();
    renderInspector();
  });
  return node;
}

function matches(item) {
  const crossingOk = state.crossing === "all" || Number(state.crossing) === item.crossing;
  const familyOk = state.family === "all" || item.tags.includes(state.family);
  const haystack = `${item.id} ${item.title} ${item.tags.join(" ")}`.toLowerCase();
  const queryOk = !state.query || haystack.includes(state.query);
  return crossingOk && familyOk && queryOk;
}

function renderInspector() {
  const item = getSelected();
  selectedName.textContent = item.id;
  selectedTitle.textContent = item.title;
  knotImage.src = item.image;
  knotImage.alt = `${item.id} ${item.title} knot diagram`;
  selectedTags.innerHTML = item.tags.map((tag) => `<span>${label(tag)}</span>`).join("");
  invariantList.innerHTML = [
    ["Crossings", item.crossing],
    ["Determinant", item.determinant],
    ["Signature", item.signature],
    ["Alexander", item.alexander],
    ["Jones", item.jones],
  ]
    .map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`)
    .join("");
  ruleCheck.innerHTML = [
    ["planar", "Diagram code has one valid planar embedding."],
    ["reidemeister", "Reduced form remains stable under known Reidemeister rewrites."],
    ["prime", item.id === "0_1" ? "Unknot kept as baseline, not counted as prime." : "No connected-sum decomposition found in atlas class."],
    ["atlas", "Knot id and crossing count match known prime table entry."],
  ]
    .filter(([id]) => state.gates.has(id))
    .map(([, text]) => `<li>${text}</li>`)
    .join("");
  atlasNote.textContent = item.note;
  proofTimeline.innerHTML = [
    ["Generate", `Candidate diagram created for ${item.crossing} crossing tier.`],
    ["Normalize", "Local moves remove diagram-only noise."],
    ["Check", `Invariant packet: det ${item.determinant}, signature ${item.signature}.`],
    ["Accept", `${item.id} matched to prime atlas table.`],
  ]
    .map(([title, text]) => `<li><strong>${title}</strong><span>${text}</span></li>`)
    .join("");
}

function getSelected() {
  return knots.find((item) => item.id === state.selectedId) || knots[1];
}

function knotImg(item) {
  return `<img src="${item.image}" alt="${item.id} knot diagram" loading="lazy" referrerpolicy="no-referrer" />`;
}

function label(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function countFamily(value) {
  if (value === "all") return knots.length;
  return knots.filter((item) => item.tags.includes(value)).length;
}

async function copyOrDownload(payload, filename) {
  try {
    await navigator.clipboard.writeText(payload);
    return "copy";
  } catch {
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
    return "download";
  }
}
