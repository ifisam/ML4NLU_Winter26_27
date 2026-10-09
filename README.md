# ML4NLU — Machine Learning for Natural Language Understanding

Course site for *Machine Learning for Natural Language Understanding*,
taught by Prof. Dr. Achim Rettinger, Chair of Computational Linguistics,
Universität Trier.

Static site — no build step. Open `index.html` directly, or serve the
folder with any static file server (e.g. `python3 -m http.server`).

- `index.html` / `style.css` / `script.js` — page structure, styling, and
  the renderer that turns `data.json` into the schedule and resources list.
- `data.json` — single source of truth for the weekly schedule, linked
  materials, and reading list.
- `content/` — lecture slides, flipped-classroom decks, and practice
  exercise sheets referenced from the schedule.
- `docs/superpowers/specs/` — design spec for the site.
