// Special devotional content for the Great Feasts and major fixed
// commemorations. When today's date (MM-DD) matches an entry here, the
// daily devotional uses this in place of the seeded generic reading.
//
// Filled by the devotional-enrichment agent.

export type FeastDevotional = {
  key: string; // "MM-DD" fixed-date, e.g. "12-25"
  title: string; // "The Nativity of our Lord and God and Savior Jesus Christ"
  rank: "great-feast" | "feast";
  scripture: { ref: string; text: string; translation: string };
  reflection: string; // 3–5 sentences of Orthodox reflection
  troparion: { title: string; text: string };
};

export const FEAST_DEVOTIONALS: FeastDevotional[] = [];
