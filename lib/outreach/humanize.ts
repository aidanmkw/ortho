// Article Humanizer — turns a creator's top post into a longer, structured,
// human-sounding article. Runs entirely in the browser: deterministic text
// transforms, no model call, no cost. It ALSO emits the exact prompt you'd
// hand an AI agent if you'd rather it write the piece — same idea as the
// video, minus the "pay Forbes $5k" part.

export type Tone = "punchy" | "warm" | "analytical";

export interface HumanizeOptions {
  creatorName?: string;
  topic?: string;
  blog?: string;
  tone?: Tone;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface Article {
  title: string;
  dek: string;
  sections: ArticleSection[];
  takeaways: string[];
  closing: string;
}

const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","then","so","of","to","in","on","for",
  "with","as","at","by","from","is","are","was","were","be","been","being",
  "it","its","this","that","these","those","i","you","he","she","we","they",
  "me","him","her","us","them","my","your","our","their","not","no","yes",
  "do","does","did","have","has","had","will","would","can","could","should",
  "just","really","very","more","most","some","any","all","one","about","out",
  "up","down","over","into","than","too","also","get","got","like","what",
  "when","where","who","how","why","which","because","while","there","here",
]);

// Phrases that scream "an AI wrote this" → plainer human phrasing.
const AI_TELLS: [RegExp, string][] = [
  [/\bin today's fast[- ]paced world,?\s*/gi, ""],
  [/\bit's important to (note|remember|understand) that\s*/gi, ""],
  [/\bit is important to (note|remember|understand) that\s*/gi, ""],
  [/\bneedless to say,?\s*/gi, ""],
  [/\bat the end of the day,?\s*/gi, "ultimately, "],
  [/\bdelve into\b/gi, "dig into"],
  [/\bdelving into\b/gi, "digging into"],
  [/\ba myriad of\b/gi, "a lot of"],
  [/\bplethora of\b/gi, "pile of"],
  [/\btapestry\b/gi, "mix"],
  [/\bleverage\b/gi, "use"],
  [/\bleveraging\b/gi, "using"],
  [/\butilize\b/gi, "use"],
  [/\butilizing\b/gi, "using"],
  [/\bin order to\b/gi, "to"],
  [/\bfurthermore,?\b/gi, "and"],
  [/\bmoreover,?\b/gi, "plus"],
  [/\bgame[- ]changer\b/gi, "big deal"],
  [/\bnavigate the landscape\b/gi, "figure it out"],
  [/\bunlock (the|your) potential\b/gi, "get more out of it"],
  [/\belevate\b/gi, "lift"],
  [/\bembark on\b/gi, "start"],
  [/\brobust\b/gi, "solid"],
  [/\bseamless\b/gi, "smooth"],
  [/\bin conclusion,?\b/gi, "so, to wrap up,"],
];

const CONTRACTIONS: [RegExp, string][] = [
  [/\bdo not\b/gi, "don't"],
  [/\bdoes not\b/gi, "doesn't"],
  [/\bdid not\b/gi, "didn't"],
  [/\bcannot\b/gi, "can't"],
  [/\bwill not\b/gi, "won't"],
  [/\bit is\b/g, "it's"],
  [/\bthat is\b/g, "that's"],
  [/\byou are\b/gi, "you're"],
  [/\bthey are\b/gi, "they're"],
  [/\bwe are\b/gi, "we're"],
  [/\byou will\b/gi, "you'll"],
  [/\byou have\b/gi, "you've"],
  [/\bI am\b/g, "I'm"],
  [/\bwould not\b/gi, "wouldn't"],
  [/\bshould not\b/gi, "shouldn't"],
];

function collapse(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function splitSentences(text: string): string[] {
  const cleaned = collapse(text);
  if (!cleaned) return [];
  // Split on sentence enders followed by whitespace. We deliberately do NOT
  // require the next char to be uppercase — social captions are often all
  // lowercase, and requiring caps would merge the whole post into one blob.
  return cleaned
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function titleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => (w.length > 2 ? capitalize(w) : w))
    .join(" ");
}

function humanizeSentence(raw: string): string {
  let s = raw;
  for (const [re, rep] of AI_TELLS) s = s.replace(re, rep);
  for (const [re, rep] of CONTRACTIONS) s = s.replace(re, rep);
  s = collapse(s);
  if (!s) return s;
  s = capitalize(s);
  if (!/[.!?…]$/.test(s)) s += ".";
  return s;
}

function keywords(text: string, limit: number): string[] {
  const counts = new Map<string, number>();
  const words = text.toLowerCase().match(/[a-z][a-z'-]{2,}/g) ?? [];
  for (const w of words) {
    if (STOPWORDS.has(w)) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([w]) => w);
}

// Deterministic pick so the same input always yields the same output.
function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

function makeTitle(topic: string, keys: string[], seed: number): string {
  const subject = topic || (keys[0] ? titleCase(keys[0]) : "This");
  const patterns = [
    `What Most People Get Wrong About ${titleCase(subject)}`,
    `The Real Reason ${titleCase(subject)} Works`,
    `${titleCase(subject)}, Explained Like a Human`,
    `Here's What ${titleCase(subject)} Actually Takes`,
    `The ${titleCase(subject)} Playbook Nobody Hands You`,
  ];
  return pick(patterns, seed);
}

function makeHeading(sectionKeys: string[], index: number, seed: number): string {
  const key = sectionKeys[0] ? titleCase(sectionKeys[0]) : `Point ${index + 1}`;
  const patterns = [
    `Start With ${key}`,
    `Why ${key} Matters`,
    `The ${key} Part`,
    `Don't Skip ${key}`,
    `Where ${key} Comes In`,
  ];
  return pick(patterns, seed + index);
}

function chunk<T>(arr: T[], groups: number): T[][] {
  const out: T[][] = Array.from({ length: groups }, () => []);
  const per = Math.ceil(arr.length / groups) || 1;
  arr.forEach((item, i) => {
    const g = Math.min(groups - 1, Math.floor(i / per));
    out[g].push(item);
  });
  return out.filter((g) => g.length > 0);
}

const LEAD_INS: Record<Tone, string[]> = {
  punchy: ["Here's the thing.", "Let's cut to it.", "Quick one."],
  warm: ["Okay, real talk.", "I've been sitting with this.", "Come with me on this."],
  analytical: ["Let's break it down.", "Consider the pattern.", "Look at the mechanics."],
};

export function humanize(rawPost: string, opts: HumanizeOptions = {}): Article {
  const tone: Tone = opts.tone ?? "punchy";
  const topic = (opts.topic ?? "").trim();
  const creator = (opts.creatorName ?? "").trim();

  const sentences = splitSentences(rawPost).map(humanizeSentence).filter(Boolean);
  const seed = rawPost.length + (topic.length * 7) + (creator.length * 13);
  const keys = keywords(rawPost, 8);

  // Fallbacks so an empty/tiny paste still produces a usable article.
  const body =
    sentences.length > 0
      ? sentences
      : [
          "This started as a quick thought and turned into something worth writing down.",
          "The short version: the idea is simpler than it looks once you strip away the noise.",
        ];

  const lead = pick(LEAD_INS[tone], seed);
  const hook = creator
    ? `${lead} ${creator} put out something on ${topic || (keys[0] ?? "this")} that stuck with me, and it's worth unpacking.`
    : `${lead} ${capitalize(body[0])}`;

  const groupCount = Math.min(4, Math.max(2, Math.round(body.length / 3)));
  const groups = chunk(body, groupCount);

  const sections: ArticleSection[] = groups.map((group, i) => {
    const sectionKeys = keywords(group.join(" "), 3);
    return {
      heading: makeHeading(sectionKeys, i, seed),
      paragraphs: [group.join(" ")],
    };
  });

  const takeaways = body
    .filter((s) => s.length > 25 && s.length < 160)
    .slice(0, 4)
    .map((s) => s.replace(/[.!?…]+$/, ""));

  const closingBase = creator
    ? `Full credit to ${creator} for the original take — go follow the source.`
    : `That's the whole idea. Steal it, use it, make it yours.`;

  return {
    title: makeTitle(topic, keys, seed),
    dek: hook,
    sections,
    takeaways: takeaways.length > 0 ? takeaways : ["Keep it simple.", "Ship it.", "Credit the source."],
    closing: closingBase,
  };
}

export function articleToMarkdown(a: Article, blog?: string): string {
  const lines: string[] = [];
  lines.push(`# ${a.title}`, "");
  lines.push(`*${a.dek}*`, "");
  for (const s of a.sections) {
    lines.push(`## ${s.heading}`, "");
    for (const p of s.paragraphs) lines.push(p, "");
  }
  if (a.takeaways.length) {
    lines.push(`## The takeaways`, "");
    for (const t of a.takeaways) lines.push(`- ${t}`);
    lines.push("");
  }
  lines.push(a.closing, "");
  if (blog) lines.push(`— *${blog}*`, "");
  return lines.join("\n").trim() + "\n";
}

export function articleWordCount(a: Article): number {
  const text = [
    a.title,
    a.dek,
    ...a.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
    ...a.takeaways,
    a.closing,
  ].join(" ");
  return (text.match(/\S+/g) ?? []).length;
}

// The prompt you'd paste into any AI agent to do the same job — the
// content is pre-interpolated so it's copy-paste ready.
export function agentPrompt(rawPost: string, opts: HumanizeOptions = {}): string {
  const topic = opts.topic || "the creator's niche";
  const creator = opts.creatorName || "the original creator";
  const blog = opts.blog || "my blog";
  return [
    `You are a ghostwriter for ${blog}. Rewrite the post below as an original,`,
    `human-sounding article of ~500–700 words about ${topic}.`,
    ``,
    `Rules:`,
    `- Keep it genuinely useful and specific — no filler, no "in today's world".`,
    `- Use contractions, short paragraphs, and a clear structure: a hook, 3–4`,
    `  sections with headings, a short "takeaways" list, and a closing line.`,
    `- Never claim it's your own experience if it isn't. Credit ${creator} explicitly.`,
    `- Match a confident, friendly voice. Avoid clichés and AI tells.`,
    ``,
    `Original post to adapt:`,
    `"""`,
    rawPost.trim() || "(paste the post here)",
    `"""`,
  ].join("\n");
}
