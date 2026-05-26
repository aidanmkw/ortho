// The Apologist's Commonplace Book — a personal collection of citations the
// user has saved. Pure localStorage; an investment loop that makes each
// session's effort persist and accumulate into the user's own arsenal.

export type SavedCitation = {
  key: string; // unique — the citation source string
  source: string;
  text?: string; // the quote / verse / patristic text shown
  scripture?: string;
  savedAt: number;
};

const STORAGE_KEY = "commonplace:v1";
const EVENT = "commonplace-changed";

export function loadSaved(): SavedCitation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedCitation[]) : [];
  } catch {
    return [];
  }
}

function persist(list: SavedCitation[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* quota / private mode — silently degrade */
  }
}

export function isSaved(key: string): boolean {
  return loadSaved().some((s) => s.key === key);
}

/** Toggle save state. Returns the new saved state (true = now saved). */
export function toggleSaved(entry: Omit<SavedCitation, "savedAt">): boolean {
  const list = loadSaved();
  const idx = list.findIndex((s) => s.key === entry.key);
  if (idx >= 0) {
    list.splice(idx, 1);
    persist(list);
    return false;
  }
  list.unshift({ ...entry, savedAt: Date.now() });
  persist(list);
  return true;
}

export function removeSaved(key: string) {
  persist(loadSaved().filter((s) => s.key !== key));
}

export const COMMONPLACE_EVENT = EVENT;
