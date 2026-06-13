# Design

## Theme

Product UI for focused desktop learning in a quiet evening study setting. Light scientific workspace, muted warm background, high contrast ink, limited accent use.

## Color

- Background: `oklch(0.955 0.008 76)`
- Panel: `oklch(0.985 0.006 82)`
- Secondary panel: `oklch(0.925 0.009 88)`
- Ink: `oklch(0.225 0.015 245)`
- Muted text: `oklch(0.48 0.018 245)`
- Line: `oklch(0.84 0.013 92)`
- Accent: `oklch(0.58 0.19 34)`
- Teal marker: `oklch(0.58 0.09 190)`
- Amber marker: `oklch(0.72 0.13 82)`

## Typography

Use system sans stack. Compact product scale: 12px labels, 13px controls, 14px body, 19px panel headings, 30px main heading.

## Layout

Three-pane app: left control rail, center periodic table and proof timeline, right inspector. No nested cards. Cells form one data grid.

## Components

Buttons and filters use 8px radius, 1px borders, clear selected states, and consistent control height. Knot cells are grid items with SVG mini diagrams and compact metadata.

## Motion

Canvas preview may animate continuously. UI transitions stay short and state-based. Respect reduced-motion in future build.
