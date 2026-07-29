// Reference directory of creator-discovery platforms — the grid from the
// video ("find a bunch of influencers that you think are cool"). This is a
// read-only cheat-sheet; the Studio itself never calls these services.

export interface DiscoveryTool {
  name: string;
  glyph: string;
  reach: string;
  blurb: string;
  emails: boolean;
  url: string;
}

export const DISCOVERY_TOOLS: DiscoveryTool[] = [
  {
    name: "Modash",
    glyph: "mo",
    reach: "380M+ creators",
    blurb: "Huge index across IG / TikTok / YouTube, emails included.",
    emails: true,
    url: "https://www.modash.io/",
  },
  {
    name: "Phyllo",
    glyph: "▤",
    reach: "220M+ profiles",
    blurb: "Developer API to creator profiles and their published data.",
    emails: false,
    url: "https://www.getphyllo.com/",
  },
  {
    name: "HypeAuditor",
    glyph: "▲",
    reach: "227M+ creators",
    blurb: "Fraud + authenticity scoring so you skip the bot accounts.",
    emails: false,
    url: "https://hypeauditor.com/",
  },
  {
    name: "Upfluence",
    glyph: "◳",
    reach: "Discovery suite",
    blurb: "Search + verified emails + outreach in one place.",
    emails: true,
    url: "https://www.upfluence.com/",
  },
  {
    name: "GRIN",
    glyph: "◗",
    reach: "190M+ creators",
    blurb: "Creator management with bulk DM sequences.",
    emails: false,
    url: "https://grin.co/",
  },
  {
    name: "Aspire",
    glyph: "◮",
    reach: "Millions of IG/TikTok",
    blurb: "Bulk outreach and campaign workflows.",
    emails: true,
    url: "https://www.aspire.io/",
  },
  {
    name: "Klear / Meltwater",
    glyph: "◇",
    reach: "AI topic search",
    blurb: "Topic-based discovery inside the Meltwater suite.",
    emails: false,
    url: "https://klear.com/",
  },
  {
    name: "Heepsy",
    glyph: "◔",
    reach: "IG / TikTok / YT",
    blurb: "Affordable search with public contact emails.",
    emails: true,
    url: "https://www.heepsy.com/",
  },
  {
    name: "Favikon",
    glyph: "◈",
    reach: "10M+ vetted",
    blurb: "600+ niche leaderboards — great for ranking prospects.",
    emails: false,
    url: "https://www.favikon.com/",
  },
  {
    name: "CreatorIQ",
    glyph: "◍",
    reach: "Enterprise graph",
    blurb: "Enterprise Creator Graph, accessed via APIs.",
    emails: false,
    url: "https://www.creatoriq.com/",
  },
];
