# Prime Knot Periodic Table

[![Pages](https://img.shields.io/badge/GitHub%20Pages-ready-2f6f73)](https://pages.github.com/)
[![Static App](https://img.shields.io/badge/app-static%20HTML%2FCSS%2FJS-b6472f)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-48525c)](LICENSE)
[![Prime knots](https://img.shields.io/badge/prime%20knots-36-b6472f)](#what-it-does)
[![Max crossings](https://img.shields.io/badge/max%20crossings-8-2f6f73)](#what-it-does)

Prime Knot Periodic Table is a visual knot theory workbench. It shows prime knots through eight crossings as a periodic table, then lets learners inspect families, invariants, rule gates, and atlas-backed proof notes.

Live site: <https://frankstop.github.io/PrimeKnots/>


## What It Does

- Displays 36 entries: unknot plus prime knots through 8 crossings.
- Filters by crossing count and family tags.
- Renders deterministic SVG mini diagrams for every cell.
- Shows animated canvas knot previews for selected knots.
- Explains rule gates: planar validity, Reidemeister stability, prime check, atlas match.
- Exports selected knot metadata as JSON.

## Why This Shape

All knots cannot be listed, because knot types are infinite. This app treats “all” as a scoped promise: complete tables up to a chosen crossing limit, plus clear labels when entries are atlas-backed, generated, or only diagram candidates.

## Roadmap

- Add verified diagram codes from Knot Atlas or KnotInfo.
- Add Alexander and Jones polynomial data for every row.
- Add mirror-pair and chirality comparison mode.
- Add Web Worker generation pipeline.
- Add links, composite knots, and torus-knot family generators.

## Local Use

Open `index.html` in a browser.

For a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

This repo is ready for branch-based Pages. Enable Pages with `main` as the source branch and `/` as the folder.

## Sources To Integrate

- [Knot Atlas](https://katlas.org/wiki/Main_Page)
- [KnotInfo](https://knotinfo.math.indiana.edu/)
- [SnapPy](https://snappy.computop.org/)
- [KnotPlot](https://knotplot.com/)

## License

MIT
