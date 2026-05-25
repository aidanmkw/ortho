export type CitationQuote = {
  // Verbatim quoted text (1–3 sentences), OR a 1-sentence factual summary
  // when the source is bibliographic-only (modern academic book, fresco,
  // inscription, etc.).
  text: string;

  // Translator / series, e.g. "NPNF1 9", "ANF 1", "Lash", "SVS Press".
  translation?: string;

  // Optional qualifier — "bibliographic reference", "summary, not direct
  // quotation", "passage not verified", etc.
  note?: string;
};
