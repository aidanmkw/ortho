import type { CitationQuote } from "./types";
import { QUOTES_A } from "./batch-a";
import { QUOTES_B } from "./batch-b";
import { QUOTES_C } from "./batch-c";
import { QUOTES_D } from "./batch-d";
import { QUOTES_E } from "./batch-e";
import { QUOTES_F } from "./batch-f";
import { QUOTES_G } from "./batch-g";
import { QUOTES_H } from "./batch-h";

export type { CitationQuote };

// Merged lookup of source-string → quote. Later batches don't overwrite
// earlier ones; collisions are unlikely since each citation source string
// is unique across the curriculum.
const QUOTES: Record<string, CitationQuote> = {
  ...QUOTES_A,
  ...QUOTES_B,
  ...QUOTES_C,
  ...QUOTES_D,
  ...QUOTES_E,
  ...QUOTES_F,
  ...QUOTES_G,
  ...QUOTES_H,
};

export function getCitationQuote(source: string): CitationQuote | null {
  return QUOTES[source] ?? null;
}

export function citationQuoteCount(): number {
  return Object.keys(QUOTES).length;
}
