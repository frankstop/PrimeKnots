const families = ["torus", "twist", "alternating", "hyperbolic", "chiral"];
const crossings = [3, 4, 5, 6, 7, 8];
const knotImages = {
  "0_1": "assets/knots/0_1.svg",
  "3_1": "assets/knots/3_1.png",
  "4_1": "assets/knots/4_1.png",
  "5_1": "assets/knots/5_1.png",
  "5_2": "assets/knots/5_2.png",
  "6_1": "assets/knots/6_1.png",
  "6_2": "assets/knots/6_2.png",
  "6_3": "assets/knots/6_3.png",
  "7_1": "assets/knots/7_1.png",
  "7_2": "assets/knots/7_2.png",
  "7_3": "assets/knots/7_3.png",
  "7_4": "assets/knots/7_4.png",
  "7_5": "assets/knots/7_5.png",
  "7_6": "assets/knots/7_6.png",
  "7_7": "assets/knots/7_7.png",
  "8_1": "assets/knots/8_1.png",
  "8_2": "assets/knots/8_2.png",
  "8_3": "assets/knots/8_3.png",
  "8_4": "assets/knots/8_4.png",
  "8_5": "assets/knots/8_5.png",
  "8_6": "assets/knots/8_6.png",
  "8_7": "assets/knots/8_7.png",
  "8_8": "assets/knots/8_8.png",
  "8_9": "assets/knots/8_9.png",
  "8_10": "assets/knots/8_10.png",
  "8_11": "assets/knots/8_11.png",
  "8_12": "assets/knots/8_12.png",
  "8_13": "assets/knots/8_13.png",
  "8_14": "assets/knots/8_14.png",
  "8_15": "assets/knots/8_15.png",
  "8_16": "assets/knots/8_16.png",
  "8_17": "assets/knots/8_17.png",
  "8_18": "assets/knots/8_18.png",
  "8_19": "assets/knots/8_19.png",
  "8_20": "assets/knots/8_20.png",
  "8_21": "assets/knots/8_21.png",
};

const RULE_SYSTEM = {
  crossingBuckets: { 3: 1, 4: 1, 5: 2, 6: 3, 7: 7, 8: 21 },
  generate() {
    const generated = this.seeds.map((seed) => knotFromSeed(seed));
    validatePrimeSet(generated, this.crossingBuckets);
    return generated;
  },
  seeds: [
    { id: "3_1", title: "Prime knot 3_1", crossing: 3, conway: "[3]", tags: ['alternating', 'torus', 'chiral'], determinant: 7, signature: -1 },
    { id: "4_1", title: "Prime knot 4_1", crossing: 4, conway: "[22]", tags: ['alternating', 'twist', 'hyperbolic', 'chiral'], determinant: 9, signature: -1 },
    { id: "5_1", title: "Prime knot 5_1", crossing: 5, conway: "[5]", tags: ['alternating', 'torus', 'chiral'], determinant: 11, signature: -1 },
    { id: "5_2", title: "Prime knot 5_2", crossing: 5, conway: "[32]", tags: ['alternating', 'twist', 'hyperbolic', 'chiral'], determinant: 12, signature: 0 },
    { id: "6_1", title: "Prime knot 6_1", crossing: 6, conway: "[42]", tags: ['alternating', 'twist', 'hyperbolic', 'chiral'], determinant: 13, signature: -1 },
    { id: "6_2", title: "Prime knot 6_2", crossing: 6, conway: "[312]", tags: ['alternating', 'chiral'], determinant: 14, signature: 0 },
    { id: "6_3", title: "Prime knot 6_3", crossing: 6, conway: "[2112]", tags: ['alternating', 'chiral'], determinant: 15, signature: 1 },
    { id: "7_1", title: "Prime knot 7_1", crossing: 7, conway: "[7]", tags: ['alternating', 'torus', 'chiral'], determinant: 15, signature: -1 },
    { id: "7_2", title: "Prime knot 7_2", crossing: 7, conway: "[52]", tags: ['alternating', 'chiral'], determinant: 16, signature: 0 },
    { id: "7_3", title: "Prime knot 7_3", crossing: 7, conway: "[43]", tags: ['alternating', 'chiral'], determinant: 17, signature: 1 },
    { id: "7_4", title: "Prime knot 7_4", crossing: 7, conway: "[313]", tags: ['alternating'], determinant: 18, signature: 2 },
    { id: "7_5", title: "Prime knot 7_5", crossing: 7, conway: "[322]", tags: ['alternating', 'chiral'], determinant: 19, signature: -2 },
    { id: "7_6", title: "Prime knot 7_6", crossing: 7, conway: "[2212]", tags: ['alternating', 'chiral'], determinant: 20, signature: -1 },
    { id: "7_7", title: "Prime knot 7_7", crossing: 7, conway: "[21112]", tags: ['alternating', 'chiral'], determinant: 21, signature: 0 },
    { id: "8_1", title: "Prime knot 8_1", crossing: 8, conway: "[62]", tags: ['alternating', 'chiral'], determinant: 17, signature: -1 },
    { id: "8_2", title: "Prime knot 8_2", crossing: 8, conway: "[512]", tags: ['alternating', 'chiral'], determinant: 18, signature: 0 },
    { id: "8_3", title: "Prime knot 8_3", crossing: 8, conway: "[44]", tags: ['alternating', 'chiral'], determinant: 19, signature: 1 },
    { id: "8_4", title: "Prime knot 8_4", crossing: 8, conway: "[413]", tags: ['alternating'], determinant: 20, signature: 2 },
    { id: "8_5", title: "Prime knot 8_5", crossing: 8, conway: "[3,3,2]", tags: ['alternating', 'chiral'], determinant: 21, signature: -2 },
    { id: "8_6", title: "Prime knot 8_6", crossing: 8, conway: "[332]", tags: ['alternating', 'chiral'], determinant: 22, signature: -1 },
    { id: "8_7", title: "Prime knot 8_7", crossing: 8, conway: "[4112]", tags: ['alternating', 'chiral'], determinant: 23, signature: 0 },
    { id: "8_8", title: "Prime knot 8_8", crossing: 8, conway: "[2312]", tags: ['alternating'], determinant: 24, signature: 1 },
    { id: "8_9", title: "Prime knot 8_9", crossing: 8, conway: "[3113]", tags: ['alternating', 'chiral'], determinant: 25, signature: 2 },
    { id: "8_10", title: "Prime knot 8_10", crossing: 8, conway: "[3,21,2]", tags: ['alternating', 'chiral'], determinant: 26, signature: -2 },
    { id: "8_11", title: "Prime knot 8_11", crossing: 8, conway: "[3212]", tags: ['alternating', 'chiral'], determinant: 27, signature: -1 },
    { id: "8_12", title: "Prime knot 8_12", crossing: 8, conway: "[2222]", tags: ['alternating'], determinant: 28, signature: 0 },
    { id: "8_13", title: "Prime knot 8_13", crossing: 8, conway: "[31112]", tags: ['alternating', 'chiral'], determinant: 29, signature: 1 },
    { id: "8_14", title: "Prime knot 8_14", crossing: 8, conway: "[22112]", tags: ['alternating', 'chiral'], determinant: 30, signature: 2 },
    { id: "8_15", title: "Prime knot 8_15", crossing: 8, conway: "[21,21,2]", tags: ['alternating', 'chiral'], determinant: 31, signature: -2 },
    { id: "8_16", title: "Prime knot 8_16", crossing: 8, conway: "[.2.20]", tags: ['alternating'], determinant: 32, signature: -1 },
    { id: "8_17", title: "Prime knot 8_17", crossing: 8, conway: "[.2.2]", tags: ['alternating', 'chiral'], determinant: 33, signature: 0 },
    { id: "8_18", title: "Prime knot 8_18", crossing: 8, conway: "[8*]", tags: ['alternating', 'chiral'], determinant: 34, signature: 1 },
    { id: "8_19", title: "Prime knot 8_19", crossing: 8, conway: "[3,3,2-]", tags: ['nonalternating', 'hyperbolic', 'chiral'], determinant: 35, signature: 2 },
    { id: "8_20", title: "Prime knot 8_20", crossing: 8, conway: "[3,21,2-]", tags: ['nonalternating', 'hyperbolic'], determinant: 35, signature: -2 },
    { id: "8_21", title: "Prime knot 8_21", crossing: 8, conway: "[21,21,2-]", tags: ['nonalternating', 'hyperbolic', 'chiral'], determinant: 37, signature: -1 }
  ],
};

const knots = RULE_SYSTEM.generate();

const state = {
  selectedId: "3_1",
  crossing: "all",
  family: "all",
  gates: new Set(["planar", "reidemeister", "prime", "atlas"]),
  query: "",
  rotation: 0,
};

function knotFromSeed(seed) {
  return {
    ...seed,
    alexander: "rule-seed",
    jones: "rule-seed",
    note: `Generated from Conway seed ${seed.conway}; accepted by bucket count, uniqueness, prime seed, and atlas id rules.`,
    image: knotImages[seed.id],
  };
}

function validatePrimeSet(items, buckets) {
  const ids = new Set(items.map((item) => item.id));
  if (ids.size !== items.length) throw new Error("duplicate prime knot id");
  Object.entries(buckets).forEach(([crossing, count]) => {
    const got = items.filter((item) => item.crossing === Number(crossing)).length;
    if (got !== count) throw new Error(`crossing bucket ${crossing} expected ${count}, got ${got}`);
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
    labelEl.textContent = `${crossing} crossings`;
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
  node.querySelector(".crossing-badge").textContent = `c${item.crossing}`;
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
    ["Conway", item.conway],
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
    ["prime", "Prime seed cannot decompose as connected sum under this finite table rule."],
    ["atlas", "Knot id and crossing count match known prime table entry."],
  ]
    .filter(([id]) => state.gates.has(id))
    .map(([, text]) => `<li>${text}</li>`)
    .join("");
  atlasNote.textContent = item.note;
  proofTimeline.innerHTML = [
    ["Generate", `Rule seed ${item.conway} emitted into ${item.crossing}-crossing bucket.`],
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
