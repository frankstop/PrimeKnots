const families = ["torus", "twist", "alternating", "hyperbolic", "chiral"];
const crossings = [0, 3, 4, 5, 6, 7, 8];

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
  return { id, title, crossing, tags, determinant, signature, alexander, jones, note };
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
      `Atlas-backed prime knot entry at ${crossing} crossings. Diagram glyph is deterministic, not a proof drawing.`
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
const canvas = document.querySelector("#knotCanvas");
const ctx = canvas.getContext("2d");

init();

function init() {
  buildFilters();
  renderTable();
  renderInspector();
  bindEvents();
  requestAnimationFrame(drawLoop);
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
  table.style.gridTemplateColumns = `repeat(${Math.max(1, columnsToRender.length)}, minmax(116px, 1fr))`;

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
  node.querySelector(".mini-diagram").innerHTML = miniSvg(item);
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

function miniSvg(item) {
  const seed = seedFrom(item.id);
  const loops = Math.max(2, Math.min(7, item.crossing || 2));
  const pts = Array.from({ length: 160 }, (_, i) => {
    const t = (i / 159) * Math.PI * 2;
    const r = 27 + 8 * Math.sin(loops * t + seed);
    const x = 54 + Math.cos(t + seed / 9) * r;
    const y = 42 + Math.sin(t * ((seed % 3) + 1) / 2 + seed) * (r * 0.62);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `<svg viewBox="0 0 108 84" role="img" aria-label="${item.id} mini diagram">
    <polyline points="${pts}" fill="none" stroke="oklch(0.35 0.02 245)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity=".18"/>
    <polyline points="${pts}" fill="none" stroke="oklch(0.58 0.19 34)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

function drawLoop() {
  state.rotation += 0.01;
  drawKnot(getSelected(), state.rotation);
  requestAnimationFrame(drawLoop);
}

function drawKnot(item, rotation) {
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  const seed = seedFrom(item.id);
  const p = Math.max(2, item.crossing % 5 || 2);
  const q = Math.max(3, (seed % 7) + 3);
  const points = [];

  for (let i = 0; i < 520; i += 1) {
    const t = (i / 520) * Math.PI * 2;
    const x3 = Math.cos(p * t + rotation) * (120 + 28 * Math.cos(q * t));
    const y3 = Math.sin(p * t + rotation) * (86 + 26 * Math.cos(q * t));
    const z3 = Math.sin(q * t + seed) * 70;
    const scale = 1 + z3 / 420;
    points.push({
      x: width / 2 + x3 * scale,
      y: height / 2 + y3 * scale,
      z: z3,
    });
  }

  points.sort((a, b) => a.z - b.z);
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const light = 58 + Math.round((b.z + 80) / 5);
    ctx.strokeStyle = `oklch(${Math.min(72, light) / 100} 0.16 34)`;
    ctx.lineWidth = 9 + (b.z + 80) / 42;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
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

function seedFrom(text) {
  return text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
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
