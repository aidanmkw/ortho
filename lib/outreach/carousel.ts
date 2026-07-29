// Carousel generator — slices a humanized article into Instagram-square
// (1080×1080) slides and renders them to <canvas> for PNG export. Pure
// client-side; the "install a carousel repo" step from the video, built in.

import type { Article } from "./humanize";

export type SlideKind = "cover" | "hook" | "point" | "takeaways" | "cta";

export interface Slide {
  kind: SlideKind;
  eyebrow?: string;
  title?: string;
  body?: string;
  bullets?: string[];
  index: number;
  total: number;
}

export interface CarouselOptions {
  credit?: string;
  handle?: string;
  blog?: string;
}

function firstSentences(text: string, max: number): string {
  const parts = text.split(/(?<=[.!?])\s+/);
  return parts.slice(0, max).join(" ");
}

export function buildSlides(a: Article, opts: CarouselOptions = {}): Slide[] {
  const slides: Omit<Slide, "index" | "total">[] = [];

  slides.push({ kind: "cover", eyebrow: opts.blog ?? "Feature", title: a.title });
  slides.push({ kind: "hook", eyebrow: "Why this", body: a.dek });

  a.sections.forEach((s, i) => {
    slides.push({
      kind: "point",
      eyebrow: `0${i + 1}`.slice(-2),
      title: s.heading,
      body: firstSentences(s.paragraphs.join(" "), 2),
    });
  });

  if (a.takeaways.length) {
    slides.push({ kind: "takeaways", eyebrow: "Save this", title: "The takeaways", bullets: a.takeaways });
  }

  slides.push({
    kind: "cta",
    eyebrow: "Follow for more",
    title: opts.handle ?? "@yourpage",
    body: opts.credit ? `Original by ${opts.credit}. Featured with credit.` : "Featured with credit.",
  });

  const total = slides.length;
  return slides.map((s, i) => ({ ...s, index: i + 1, total }));
}

export interface Theme {
  id: string;
  label: string;
  bg: [string, string];
  fg: string;
  muted: string;
  accent: string;
}

export const THEMES: Theme[] = [
  { id: "ink", label: "Ink", bg: ["#0c0a08", "#1a1814"], fg: "#f4ecd8", muted: "#b8ad93", accent: "#c9a227" },
  { id: "noir", label: "Noir", bg: ["#111111", "#232323"], fg: "#ffffff", muted: "#9a9a9a", accent: "#e6e6e6" },
  { id: "sunset", label: "Sunset", bg: ["#2a1035", "#7c1f4d"], fg: "#fff5fb", muted: "#e6b9d4", accent: "#ffb86b" },
  { id: "mint", label: "Mint", bg: ["#06231c", "#0d3b2e"], fg: "#eafff6", muted: "#9fd6c2", accent: "#7bc96f" },
  { id: "cobalt", label: "Cobalt", bg: ["#08152e", "#123a6b"], fg: "#eef5ff", muted: "#a9c2e6", accent: "#6ba3d6" },
];

export const CANVAS_SIZE = 1080;

function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Draw text block, auto-shrinking font until it fits the available height.
function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  opts: {
    x: number;
    y: number;
    maxWidth: number;
    maxHeight: number;
    startSize: number;
    minSize: number;
    lineHeight: number;
    weight: string;
    color: string;
  }
): number {
  let size = opts.startSize;
  let lines: string[] = [];
  while (size >= opts.minSize) {
    ctx.font = `${opts.weight} ${size}px Georgia, serif`;
    lines = wrapLines(ctx, text, opts.maxWidth);
    if (lines.length * size * opts.lineHeight <= opts.maxHeight) break;
    size -= 4;
  }
  ctx.fillStyle = opts.color;
  ctx.textBaseline = "top";
  let y = opts.y;
  const step = size * opts.lineHeight;
  for (const line of lines) {
    ctx.fillText(line, opts.x, y);
    y += step;
  }
  return y;
}

export function drawSlide(
  ctx: CanvasRenderingContext2D,
  slide: Slide,
  theme: Theme
): void {
  const S = CANVAS_SIZE;
  const pad = 96;
  const contentW = S - pad * 2;

  // Background gradient.
  const grad = ctx.createLinearGradient(0, 0, S, S);
  grad.addColorStop(0, theme.bg[0]);
  grad.addColorStop(1, theme.bg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  // Accent frame.
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, S - 80, S - 80);

  // Eyebrow (top-left).
  if (slide.eyebrow) {
    ctx.font = `bold 30px Georgia, serif`;
    ctx.fillStyle = theme.accent;
    ctx.textBaseline = "top";
    ctx.fillText(slide.eyebrow.toUpperCase(), pad, pad);
  }

  const bodyTop = pad + 70;

  if (slide.kind === "takeaways" && slide.bullets) {
    ctx.font = `bold 64px Georgia, serif`;
    ctx.fillStyle = theme.fg;
    ctx.textBaseline = "top";
    let y = bodyTop;
    for (const line of wrapLines(ctx, slide.title ?? "", contentW)) {
      ctx.fillText(line, pad, y);
      y += 74;
    }
    y += 30;
    for (const b of slide.bullets.slice(0, 5)) {
      ctx.fillStyle = theme.accent;
      ctx.font = `bold 40px Georgia, serif`;
      ctx.fillText("→", pad, y);
      ctx.fillStyle = theme.fg;
      ctx.font = `36px Georgia, serif`;
      const lines = wrapLines(ctx, b, contentW - 60);
      let by = y;
      for (const l of lines) {
        ctx.fillText(l, pad + 60, by);
        by += 46;
      }
      y = by + 26;
    }
  } else {
    let y = bodyTop;
    if (slide.title) {
      const isCover = slide.kind === "cover";
      y = drawFittedText(ctx, slide.title, {
        x: pad,
        y,
        maxWidth: contentW,
        maxHeight: isCover ? 560 : 320,
        startSize: isCover ? 92 : 68,
        minSize: 40,
        lineHeight: 1.12,
        weight: "bold",
        color: theme.fg,
      });
      y += 40;
    }
    if (slide.body) {
      drawFittedText(ctx, slide.body, {
        x: pad,
        y,
        maxWidth: contentW,
        maxHeight: 700 - (y - bodyTop),
        startSize: 44,
        minSize: 26,
        lineHeight: 1.3,
        weight: "normal",
        color: slide.kind === "cover" ? theme.muted : theme.fg,
      });
    }
  }

  // Footer: page number (right) + progress dots (left).
  ctx.font = `26px Georgia, serif`;
  ctx.fillStyle = theme.muted;
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "right";
  ctx.fillText(`${slide.index} / ${slide.total}`, S - pad, S - pad + 20);
  ctx.textAlign = "left";

  const dotY = S - pad + 12;
  const dotGap = 26;
  for (let i = 0; i < slide.total; i++) {
    ctx.beginPath();
    ctx.arc(pad + i * dotGap, dotY, 6, 0, Math.PI * 2);
    ctx.fillStyle = i + 1 === slide.index ? theme.accent : theme.muted;
    ctx.globalAlpha = i + 1 === slide.index ? 1 : 0.4;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export function carouselAgentPrompt(a: Article, opts: CarouselOptions = {}): string {
  return [
    `Turn this article into a ${buildSlides(a, opts).length}-slide Instagram carousel.`,
    `Each slide: a short punchy headline + at most two lines of body. Slide 1 is`,
    `the hook, the last slide is a CTA to follow ${opts.handle ?? "the page"}${
      opts.credit ? ` and credits ${opts.credit}` : ""
    }.`,
    `Keep the voice human and specific. Output one slide per block.`,
    ``,
    `Article:`,
    `"""`,
    `${a.title}\n\n${a.dek}\n\n${a.sections
      .map((s) => `${s.heading}\n${s.paragraphs.join(" ")}`)
      .join("\n\n")}`,
    `"""`,
  ].join("\n");
}
