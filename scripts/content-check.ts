// Validates content invariants:
//   1. Every QAItem has at least one citation.
//   2. MCQ items have a correctChoiceId that matches one of the choices.
//   3. Chronology items have a correctOrder that matches their choices.
//   4. Item IDs are unique across the whole curriculum.
//   5. Debate items have opponentClaim + orthodoxRebuttal.

import { curriculum } from "../lib/content";

const errors: string[] = [];
const seenIds = new Set<string>();

for (const stage of curriculum.stages) {
  for (const topic of stage.topics) {
    for (const item of topic.items) {
      const where = `[${stage.id}/${topic.id}/${item.id}]`;

      if (seenIds.has(item.id)) {
        errors.push(`${where} duplicate item id`);
      }
      seenIds.add(item.id);

      if (!item.citations || item.citations.length === 0) {
        errors.push(`${where} has no citations`);
      } else {
        item.citations.forEach((c, i) => {
          if (!c.source || c.source.trim() === "") {
            errors.push(`${where} citation[${i}] has no source`);
          }
        });
      }

      if (
        (item.kind === "mcq" || item.kind === "identify-source") &&
        item.choices
      ) {
        if (!item.correctChoiceId) {
          errors.push(`${where} mcq/identify missing correctChoiceId`);
        } else if (
          !item.choices.find((c) => c.id === item.correctChoiceId)
        ) {
          errors.push(
            `${where} correctChoiceId "${item.correctChoiceId}" not among choices`
          );
        }
      }

      if (item.kind === "chronology") {
        if (
          !item.choices ||
          !item.correctOrder ||
          item.choices.length !== item.correctOrder.length
        ) {
          errors.push(`${where} chronology choices/correctOrder mismatch`);
        }
      }

      if (item.kind === "debate") {
        if (!item.opponentClaim || !item.orthodoxRebuttal) {
          errors.push(
            `${where} debate item missing opponentClaim or orthodoxRebuttal`
          );
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error("Content check FAILED:");
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}

const totalItems = curriculum.stages.reduce(
  (n, s) => n + s.topics.reduce((m, t) => m + t.items.length, 0),
  0
);
const totalCitations = curriculum.stages.reduce(
  (n, s) =>
    n +
    s.topics.reduce(
      (m, t) => m + t.items.reduce((k, i) => k + i.citations.length, 0),
      0
    ),
  0
);

console.log(`Content check OK.`);
console.log(`  ${curriculum.stages.length} stages`);
console.log(
  `  ${curriculum.stages.reduce((n, s) => n + s.topics.length, 0)} topics`
);
console.log(`  ${totalItems} items`);
console.log(`  ${totalCitations} citations`);
console.log(
  `  ${(totalCitations / totalItems).toFixed(2)} citations / item average`
);
