# The Orthodox Apologist

Gamified training in Eastern Orthodox theology, history, and apologetics.
Fourteen stages, hundreds of cited drills, and full cross-examination
scenarios against Roman Catholic, Reformed, Lutheran, Baptist,
Pentecostal, SDA, JW, and LDS positions.

Every answer carries at least one citation — Father, Council, or
Scripture. The content checker enforces this.

## Quick start (local)

```bash
npm install
npm run dev               # http://localhost:3000
npm run content:check     # verify citation invariants
npm run typecheck
```

## Quick start (mobile, no install)

After the GitHub Actions deploy succeeds (Settings → Pages must be
enabled and set to "GitHub Actions" as source), the live game is at:

  **https://aidanmkw.github.io/ortho/**

On iPhone, open the URL in Safari → Share → **Add to Home Screen** for a
full-screen, installed-app experience.

If the workflow fails because Pages isn't enabled yet:
1. Go to repo Settings → Pages.
2. Under "Build and deployment," set Source = **GitHub Actions**.
3. Re-run the deploy workflow from the Actions tab.

## Game mechanics

- **XP / Rank.** Inquirer → Catechumen → Reader → Subdeacon → Deacon →
  Priest → Archpriest → Confessor → Apologist. XP awarded for first-try
  correct answers, scaled to difficulty.
- **Streaks.** Consecutive days of any drilling. Resets after a missed
  day.
- **Mastery.** Per-item EMA score. ≥0.7 counts as mastered.
- **Stage gating.** A stage unlocks when its predecessor is at 60%
  mastery.
- **Spaced repetition (SR).** SM-2-lite scheduling. Items you got wrong
  resurface immediately; correct items grow longer intervals.
- **Daily Trial.** 10 deterministic items per calendar day, biased
  toward un-mastered items.
- **Review Queue.** All due-or-wrong items in one focused drill.

## ΟΔΟΣ — The Pilgrim Road (3D)

`/pilgrimage` is a browser 3D mode (Three.js) staged inside a Byzantine
icon: gold-leaf sky, stepped faceted mountains, flat unlit color, and
the quest's icon-style figures standing in the world as billboards.
Third-person; WASD / drag on desktop, virtual joystick + drag on touch.

One road runs through the 13 battle chapters of the 2D quest
(`lib/quest/chapters.ts` is the single source of truth — same bosses,
claims, rationales, epigraphs, XP). Mechanics are spatial:

- **Trial of Witness.** The adversary hurls a claim; the answers
  become Α/Β/Γ/Δ plates on the arena floor. Run to one and stand on
  it (or tap it / press 1–4). Truth strikes the heretic; error
  strikes you — and the correct plate glows with its rationale.
- **Vigil lamps.** Walking through a lamp grants Light (+heal).
  Spend 3 Light in battle ("Spirit of Truth") to dim two false answers.
- **Saint blessings.** Greet the station's ally saint: heal, plus one
  wrong answer absorbed in the next trial.
- **Royal Doors.** Each station is sealed until its adversary falls;
  victory opens the doors, lights a memorial, and advances the save
  (`localStorage`, separate from the 2D quest save).

Engine: `lib/quest3d/engine.ts` (world/camera/effects, no game rules);
rules and UI live in `components/quest3d/PilgrimageApp.tsx`.

## Layout

```
/CURRICULUM.md             — Master game plan: every stage, topic, source.
/app                       — Next.js 14 App Router routes.
   /                       — Stage grid (home).
   /stage/[stageId]        — Topic list + drill launchers.
   /drill/[stageId]        — All items in stage (with ?mode=debate).
   /drill/[id]/[topicId]   — Items of one topic only.
/components/DrillRunner.tsx — The game loop.
/lib/types.ts              — Content schema.
/lib/content.ts            — Stage registry.
/content/stages/NN-name/   — One folder per stage; topics under it.
/scripts/content-check.ts  — Validates citation + ID invariants.
```

## Authoring new items

Each item is a `QAItem` (see `lib/types.ts`). Five kinds:

- `qa` — open recall. Supply `prompt` and `expectedAnswer`.
- `mcq` — multiple choice. Supply `prompt`, `choices`, `correctChoiceId`,
  and `rationale` on each choice (especially the wrong ones — that is
  where apologetics is sharpened).
- `identify-source` — same shape as `mcq`; prompt is a quotation.
- `chronology` — supply `choices` plus `correctOrder` (ids in time order).
- `debate` — the centerpiece. Supply `opponentTradition`, `opponentClaim`,
  `orthodoxRebuttal`, and ideally `rejoinders`.

Every item must carry at least one entry in `citations`. The validator
will refuse content otherwise.

## Stages

| # | Stage                         | Rank earned |
|--:|-------------------------------|-------------|
| 1 | Early History                 | Catechumen  |
| 2 | The Church Fathers            | Reader      |
| 3 | Foundational Teaching         | Subdeacon   |
| 4 | Heresies                      | Subdeacon   |
| 5 | The Ecumenical Councils       | Deacon      |
| 6 | EO vs Roman Catholicism       | Priest      |
| 7 | EO vs Protestantism           | Priest      |
| 8 | EO vs Latter-day Saints       | Priest      |
| 9 | Dogma                         | Archpriest  |
| 10| Famous Saints                 | Archpriest  |
| 11| Church Practices              | Confessor   |
| 12| Scripture                     | Confessor   |
| 13| Modern Issues                 | Apologist (in formation) |
| 14| Final Trials                  | Apologist   |

See `CURRICULUM.md` for the full per-stage topic map and source list.

## Editorial posture

Orthodoxy as the Church of the Seven Ecumenical Councils and the
unbroken patristic mind. Cross-examinations engage other traditions
from their own primary sources (Catechism, Trent, Vatican I, Book of
Concord, Westminster, Dort, Joseph Smith Papers) — no straw men. The
Apologist's posture is missionary, not polemical. Charity first.

> Δόξα τῷ Θεῷ πάντων ἕνεκεν.
