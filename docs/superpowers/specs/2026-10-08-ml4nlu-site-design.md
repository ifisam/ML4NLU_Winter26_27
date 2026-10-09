# ML4NLU Course Site — Design Spec

Date: 2026-10-08
Status: Approved by user, ready for implementation plan

## Goals

- Rebuild the ML4NLU course site to feel like Stanford's CS224n course page
  (clean academic layout, content-dense schedule table, direct links to real
  materials) — but with our own identity: `#D5C661` gold/olive as the primary
  accent (pulled from the actual lecture-deck accent color) instead of
  Stanford's cardinal red.
- Make every file already sitting in `content/` reachable from the site:
  lecture slides, "flipped classroom" decks, and practice `.xlsx` worksheets,
  linked per week from the schedule table.
- Pull real course facts (grading, challenge bonus, weekly rhythm, video
  sources) from `content/00-ML4NLU-Logistics.pdf` and
  `content/00-ML4NLU-Schedule.pdf` rather than inventing copy.

## Non-goals

- No Instructor / Course Assistant / Teaching Staff section or directory —
  explicitly excluded per request. A single byline credit ("Prof. Achim
  Rettinger") stays in the header, matching how CS224n credits its
  instructor inline, but there is no staff listing, no office hours block,
  no TA names/photos anywhere on the page.
- No framework, no build step, no separate per-lecture pages. Stays a static
  `index.html` + `style.css` + `script.js` + `data.json` site, deployable by
  pushing files (e.g. GitHub Pages).
- No invented video links/discussion questions for weeks 2–12. We only have
  real video/question data for Week 1 in the current `data.json`; that stays
  as-is. Weeks 2–12 get their real downloadable files, not fabricated videos.

## Site structure (single page, anchored nav)

1. **Hero/Header** — Title, "Winter 25/26 · Universität Trier", byline
   "Prof. Achim Rettinger".
2. **Overview** *(new)* — short course description.
3. **Announcements** — unchanged content, restyled.
4. **Logistics** — unchanged content, restyled.
5. **Schedule** — existing table, extended: the "Materials" column links
   directly to real files in `content/` per week (see mapping below).
6. **Challenge Bonus** *(new)* — optional challenge scoring rules.
7. **FAQ** *(new)* — grading/deadline/attendance/contact Q&A.
8. **Resources** — unchanged reading list.
9. **Footer** — course name/year only, no staff credit line.

## Content model (`data.json`)

Add a `materials` array to each week entry, alongside the existing `content`
array (kept empty where we have no real video/question data):

```json
{
  "week": 4,
  "topic": "03 - Neural Classifiers",
  "visible": true,
  "materials": [
    {"type": "slides", "title": "Lecture Slides", "file": "content/03-_ML4NLU-NeuralNets.pdf"},
    {"type": "flipped", "title": "Flipped Classroom Slides", "file": "content/03-_ML4NLU-NeuralNets-flippedClassroom.pdf"},
    {"type": "exercise", "title": "Backpropagation", "file": "content/03-ML4NLU-Backpropgation.xlsx"},
    {"type": "exercise", "title": "Linear Layer", "file": "content/03-ML4NLU-Linear-Layer.xlsx"},
    {"type": "exercise", "title": "Multi-Layer Perceptron", "file": "content/03-ML4NLU-Multi-Layer_Perceptron.xlsx"}
  ],
  "content": []
}
```

`type` is one of: `slides`, `flipped`, `exercise`, `reference` (Week 0's
logistics/schedule PDFs), `transcript` (Week 4's "Ruck-Zuck" transcript).
`script.js` renders a labeled chip/link per material type; weeks with no
materials keep the current "No materials posted yet." text, and cancelled/
admin-only weeks (topic `"-"`) get clearer copy: "No session this week."

## File → week mapping (verified against `content/` and the schedule PDF)

| Topic # | data.json week | Files |
|---|---|---|
| 00 | 0 | `00-ML4NLU-Logistics.pdf`, `00-ML4NLU-Schedule.pdf` (reference) |
| 01 | 1 | `01-_ML4NLU-Basics.pdf`, `01-_ML4NLU-Basics-flippedClassroom.pdf`, `01-ML4NLU-Dot-Product.xlsx`, `01-ML4NLU-Matrix-Multiplication.xlsx` |
| 02 | 2 | `02-_ML4NLU-Learning+Eval.pdf`, `02-_ML4NLU-Learning+Eval-flippedClassroom.pdf` |
| 03 | 4 | `03-_ML4NLU-NeuralNets.pdf`, `03-_ML4NLU-NeuralNets-flippedClassroom.pdf`, `03-ML4NLU-Backpropgation.xlsx`, `03-ML4NLU-Linear-Layer.xlsx`, `03-ML4NLU-Multi-Layer_Perceptron.xlsx` |
| 04 | 5 | `04-_ML4NLU-StaticWordVectors.pdf`, `04-_ML4NLU-StaticWordVectors-flippedClassroom.pdf`, `04-_ML4NLU-Autoencoder.xlsx`, `04-ML4TMW-Softmax.xlsx`, `04-ML4NLU-Ruck-Zuck_TransScript.pdf` (transcript) |
| 05 | 6 | `05-_ML4NLU-LanguageModels.pdf`, `05-_ML4NLU-LanguageModels-flippedClass.pdf`, `05-RNN.xlsx` |
| 06 | 7 | `06-_ML4NLU-TransformerEncoding.pdf`, `06-_ML4NLU-TransformerEncoding-flippedClass.pdf`, `06-Self-Attention.xlsx`, `06-Transformer-Full-Stack.xlsx`, `06-Transformer-simplifiedEncoderBlock.xlsx` |
| 07 | 8 | `07-_ML4NLU-TransformerDecoding.pdf`, `07-_ML4NLU-TransformerDecoding-flippedClass.pdf` |
| 08 | 9 | `08-_ML4NLU-PreTraining.pdf`, `08-_ML4NLU-PreTraining-flippedClass.pdf` |
| 09 | 10 | `09-_ML4NLU-PostTraining.pdf`, `09-_ML4NLU-PostTraining-flippedClass.pdf` |
| 10 | 11 | `10-_ML4NLU-Prompting+Tools.pdf`, `10-_ML4NLU-Prompting+Tools-flippedClass.pdf` |
| 11 | 12 | `11-_ML4NLU-Multi-Lingual-Modal-Agent.pdf`, `11-_ML4NLU-Multi-Lingual-Modal-Agent-flippedClass.pdf` |
| 12 | 14 | `12-_ML4NLU-AI+Ethics.pdf`, `12-_ML4NLU-AI+Ethics-flippedClass.pdf` |
| — | 3, 13, 15 | none (cancelled / admin-only sessions, matches current data) |

Weeks 0, 1, 2, 4–12, 14 get `visible: true`. Weeks 3, 13, 15 stay
`visible: false` with the improved "No session this week" copy.

## Copy sourced from the Logistics deck

**Overview** (new section body):
> ML4NLU examines how natural language can be understood by machines —
> starting from the mathematical and machine-learning foundations, through
> neural classifiers, static and contextual word representations, sequence
> models and transformers, pretraining and post-training, up to prompting,
> tool-augmented and multi-lingual/multi-modal/multi-agent LLMs and the
> ethical questions they raise. The course runs as a semi-flipped classroom:
> each week pairs an asynchronous lecture video with an in-class discussion,
> a student seminar presentation, and a hands-on tutorial.

**Challenge Bonus** (new section body):
> An optional challenge runs alongside the written report. Your challenge
> result adjusts your written-report grade:
> - Beat our baseline → **+1 grading step**
> - Hand in the best-performing model → **+2 grading steps**
>
> Participation is optional and does not replace the written report or exam.

**FAQ** (new section, Q&A pairs):
1. **How is my final grade calculated?** 50% written report (schriftliche
   Ausarbeitung), 50% written exam. The exam mixes flipped-classroom-style
   questions with applied questions from the tutorial/exercise sheets.
2. **When is the written report due?** Officially end of February; the hard
   deadline is end of March (end of semester) as listed in PORTA. Missing
   the hard deadline counts as a failed attempt and requires re-examination
   next semester.
3. **Is attendance mandatory?** Lecture and tutorial attendance is
   voluntary (hybrid); seminar attendance is compulsory with active
   participation.
4. **What does a typical week look like?** Tue night — new lecture video +
   flipped-classroom questions posted. Thu lecture — discussion (≤30 min) +
   summary presentation (≤60 min, streamed). Thu/Fri seminar — student
   group presentations. Following Mon tutorial — exercises, Q&A, hands-on
   practice.
5. **Where do the lecture videos come from?** Curated primarily from
   Stanford's CS224U (NLU) and CS224N (NLP with Deep Learning) YouTube
   playlists, plus Meta's LLaMA technical reports for later topics.
6. **Who do I contact?** Technical issues with Porta → porta@uni-trier.de.
   Student records / login credentials → admission@uni-trier.de.
   Course-specific questions go through StudIP messaging.
7. **Do I need to register for exams myself?** Yes — you must sign up for
   both the written exam and the written report individually.

## Visual design direction

- Keep Bootstrap 3 (already linked via CDN) as the grid/base — zero build
  step — but override heavily for a more deliberate, CS224n-like feel:
  generous whitespace, thin hairline section borders, light-gray
  `.sechighlight` bands (existing pattern, keep).
- Primary accent `#D5C661` replaces the current ad-hoc usage: nav bar,
  h1/h2 headings, section dividers, link hover states, material-type chips
  in the schedule table.
- Typography: swap the current Roboto-only setup for a deliberate pairing
  (e.g. a serif display face for headings, clean sans for body) via Google
  Fonts, matching the "academic but designed" feel instead of default
  Bootstrap look.
- Schedule table materials column: small labeled chips per material
  (`Slides`, `Flipped`, `Exercise`, `Reference`) rather than a flat link
  list, so a dense week (5 files) stays scannable.

## Testing / verification

- Open `index.html` directly in a browser; visually confirm all 9 sections
  render, nav anchors scroll correctly, and no console errors from
  `script.js`/`fetch('data.json')`.
- Validate `data.json` is well-formed JSON (e.g. `python3 -m json.tool`).
- For every `file` path added to `materials`, verify the file exists under
  `content/` (already enumerated above) so no link 404s.
- Resize/check at mobile width given Bootstrap grid is still in play.
