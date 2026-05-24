# The Orthodox Apologist

Gamified training in Eastern Orthodox theology, history, and apologetics.
Fourteen stages, hundreds of cited drills, and full cross-examination
scenarios against Roman Catholic, Reformed, Lutheran, Baptist,
Pentecostal, SDA, JW, and LDS positions.

Every answer carries at least one citation — Father, Council, or
Scripture. The content checker enforces this.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run content:check   # verify content invariants
npm run typecheck
```

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
