// Creator Outreach Studio — shared domain types.
//
// A tiny, honest, 100%-client-side toolkit for the "be your own Forbes"
// influencer-outreach loop: keep a prospect list, generate outreach DMs,
// turn a creator's top post into a humanized article, and slice that
// article into Instagram carousel slides. No servers, no API keys, no fees.

export type Platform =
  | "instagram"
  | "tiktok"
  | "x"
  | "youtube"
  | "substack"
  | "linkedin";

export interface PlatformMeta {
  id: Platform;
  label: string;
  glyph: string;
  /** Tailwind text color used for accents. */
  tone: string;
}

export const PLATFORMS: PlatformMeta[] = [
  { id: "instagram", label: "Instagram", glyph: "◎", tone: "text-pink-400" },
  { id: "tiktok", label: "TikTok", glyph: "♪", tone: "text-cyan-300" },
  { id: "x", label: "X", glyph: "𝕏", tone: "text-neutral-200" },
  { id: "youtube", label: "YouTube", glyph: "▶", tone: "text-red-400" },
  { id: "substack", label: "Substack", glyph: "✎", tone: "text-orange-400" },
  { id: "linkedin", label: "LinkedIn", glyph: "in", tone: "text-sky-400" },
];

export function platformMeta(id: Platform): PlatformMeta {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0];
}

// The outreach pipeline — mirrors the video's flow: find them, DM them,
// they (maybe) say "sure buddy", you feature them, you post, you repeat.
export type Stage =
  | "prospect"
  | "contacted"
  | "replied"
  | "agreed"
  | "featured"
  | "posted"
  | "passed";

export interface StageMeta {
  id: Stage;
  label: string;
  hint: string;
  /** Accent color for the column header / chips. */
  accent: string;
}

export const STAGES: StageMeta[] = [
  {
    id: "prospect",
    label: "Prospect",
    hint: "On the list, not yet contacted.",
    accent: "#8b8b8b",
  },
  {
    id: "contacted",
    label: "DM sent",
    hint: "Slid into the DMs.",
    accent: "#c9a227",
  },
  {
    id: "replied",
    label: "Replied",
    hint: "They wrote back.",
    accent: "#6ba3d6",
  },
  {
    id: "agreed",
    label: "Said yes",
    hint: "“Sure, buddy. That’s fine.”",
    accent: "#7bc96f",
  },
  {
    id: "featured",
    label: "Featured",
    hint: "Article + carousel built.",
    accent: "#a879d6",
  },
  {
    id: "posted",
    label: "Posted",
    hint: "Live, tagged, collab requested.",
    accent: "#4caf7d",
  },
  {
    id: "passed",
    label: "Passed",
    hint: "They rejected you. Worth a try.",
    accent: "#a15252",
  },
];

export function stageMeta(id: Stage): StageMeta {
  return STAGES.find((s) => s.id === id) ?? STAGES[0];
}

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: Platform;
  niche: string;
  followers: number;
  /** URL or short description of their top-performing post. */
  topPost: string;
  email: string;
  notes: string;
  stage: Stage;
  createdAt: number;
  updatedAt: number;
}

export interface Brand {
  /** The name of your "blog and shit". */
  blogName: string;
  yourName: string;
  yourHandle: string;
}

export interface OutreachState {
  brand: Brand;
  influencers: Influencer[];
  /** Last article drafted in the Humanizer, handed off to the Carousel tool. */
  draftArticle: string;
  draftCredit: string;
  version: 1;
}

export const DEFAULT_BRAND: Brand = {
  blogName: "The Signal",
  yourName: "",
  yourHandle: "@thesignal",
};
