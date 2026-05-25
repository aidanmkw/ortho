// Quality audit for MCQ items: flags items where the correct answer is
// significantly longer than the average wrong answer (the "longest = correct"
// tell). Used to guide content rewrites.

import { curriculum } from "../lib/content";

type Finding = {
  stage: string;
  topic: string;
  id: string;
  prompt: string;
  correctLen: number;
  wrongLenMean: number;
  ratio: number;
  correctText: string;
  wrongTexts: string[];
};

const findings: Finding[] = [];

for (const stage of curriculum.stages) {
  for (const topic of stage.topics) {
    for (const item of topic.items) {
      if (item.kind !== "mcq" && item.kind !== "identify-source") continue;
      if (!item.choices || item.choices.length < 2) continue;
      const correct = item.choices.find((c) => c.id === item.correctChoiceId);
      if (!correct) continue;
      const wrong = item.choices.filter((c) => c.id !== item.correctChoiceId);
      const correctLen = correct.text.length;
      const wrongLenMean =
        wrong.reduce((n, c) => n + c.text.length, 0) / wrong.length;
      const ratio = correctLen / Math.max(wrongLenMean, 1);
      if (ratio >= 1.4 || correctLen - wrongLenMean > 40) {
        findings.push({
          stage: stage.id,
          topic: topic.id,
          id: item.id,
          prompt: (item.prompt ?? "").slice(0, 80),
          correctLen,
          wrongLenMean: Math.round(wrongLenMean),
          ratio: Number(ratio.toFixed(2)),
          correctText: correct.text,
          wrongTexts: wrong.map((w) => w.text),
        });
      }
    }
  }
}

findings.sort((a, b) => b.ratio - a.ratio);

console.log(
  `MCQ items with suspicious length disparity (correct >> wrong): ${findings.length}\n`
);
console.log(
  `Total MCQ/identify-source items in corpus: ${countMcqItems()}\n`
);

const TOP = parseInt(process.argv[2] ?? "30", 10);
for (const f of findings.slice(0, TOP)) {
  console.log("─".repeat(78));
  console.log(`[${f.stage} / ${f.topic} / ${f.id}]  ratio=${f.ratio}`);
  console.log(`Q: ${f.prompt}`);
  console.log(`✓ (${f.correctLen}):  ${f.correctText.slice(0, 120)}`);
  for (let i = 0; i < f.wrongTexts.length; i++) {
    console.log(
      `✗ (${f.wrongTexts[i].length}):  ${f.wrongTexts[i].slice(0, 80)}`
    );
  }
}

function countMcqItems() {
  let n = 0;
  for (const s of curriculum.stages) {
    for (const t of s.topics) {
      for (const i of t.items) {
        if (i.kind === "mcq" || i.kind === "identify-source") n++;
      }
    }
  }
  return n;
}
