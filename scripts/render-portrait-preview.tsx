import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync } from "fs";
import Portrait from "@/components/quest/Portrait";
import { PORTRAITS, playerPortraitConfig } from "@/lib/quest/portraits";

const samples = [
  { id: "st-anthony", label: "Saint Anthony" },
  { id: "st-ignatius", label: "Saint Ignatius" },
  { id: "st-athanasius", label: "Saint Athanasius" },
  { id: "st-macarius", label: "Saint Macarius" },
  { id: "st-cyril", label: "Saint Cyril" },
  { id: "st-john-damascus", label: "Saint John of Damascus" },
  { id: "st-mark-ephesus", label: "Saint Mark of Ephesus" },
  { id: "st-george", label: "Saint George" },
  { id: "st-catherine", label: "Saint Catherine" },
  { id: "st-mary-egypt", label: "Saint Mary of Egypt" },
  { id: "st-seraphim", label: "Saint Seraphim" },
  { id: "centurion", label: "Centurion Lucius" },
  { id: "marcus", label: "Marcus Verus" },
  { id: "arius", label: "Arius" },
  { id: "tempter", label: "The Tempter" },
  { id: "eutyches", label: "Eutyches" },
  { id: "iconoclast", label: "Constantine V" },
  { id: "humbert", label: "Cardinal Humbert" },
  { id: "pope-eugene", label: "Pope Eugene IV" },
  { id: "nkvd", label: "Captain Pavlov" },
  { id: "lds", label: "Elder Williams" },
  { id: "reformed", label: "Sarah Kelley" },
  { id: "atheist", label: "Alex Chen" },
  { id: "doubt", label: "The Doubt" },
];

const cards = samples.map(({ id, label }) => {
  const config = PORTRAITS[id];
  if (!config) return "";
  const svg = renderToStaticMarkup(
    createElement(Portrait, { config, size: 220 })
  );
  return `<div class="card"><div class="portrait">${svg}</div><div class="label">${label}</div></div>`;
});

const playerSvg = renderToStaticMarkup(
  createElement(Portrait, {
    config: playerPortraitConfig("#7a4f1d"),
    size: 220,
    hairColorHex: "#7a4f1d",
  })
);
cards.push(
  `<div class="card"><div class="portrait">${playerSvg}</div><div class="label">Player (hero)</div></div>`
);

const html = `<!doctype html>
<html><head>
<meta charset="utf-8" />
<title>Portrait Preview</title>
<style>
  body { background: #0c0a08; color: #f4ecd8; font-family: Georgia, serif; padding: 24px; }
  h1 { text-align: center; color: #c9a228; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; max-width: 1400px; margin: 0 auto; }
  .card { background: #1a1208; border: 2px solid #5a4810; padding: 12px; border-radius: 4px; }
  .portrait { display: flex; justify-content: center; }
  .label { text-align: center; color: #c9a228; margin-top: 10px; font-size: 13px; letter-spacing: 0.05em; }
</style>
</head><body>
<h1>Character Portrait Preview &mdash; Orthodox Quest</h1>
<div class="grid">
${cards.join("\n")}
</div>
</body></html>`;

writeFileSync("/tmp/portraits-preview.html", html);
console.log("Wrote /tmp/portraits-preview.html");
