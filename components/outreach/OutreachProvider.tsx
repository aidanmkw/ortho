"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_BRAND,
  type Brand,
  type Influencer,
  type OutreachState,
  type Platform,
  type Stage,
} from "@/lib/outreach/types";

const STORAGE_KEY = "outreach.v1";

function uid(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function seedInfluencers(): Influencer[] {
  const now = Date.now();
  const base = {
    email: "",
    notes: "",
    createdAt: now,
    updatedAt: now,
  };
  return [
    {
      ...base,
      id: uid(),
      name: "Maya",
      handle: "@mayabuilds",
      platform: "instagram" as Platform,
      niche: "no-code SaaS",
      followers: 48200,
      topPost: "Carousel: 'I shipped 3 apps with zero code' — 12k saves",
      stage: "prospect" as Stage,
    },
    {
      ...base,
      id: uid(),
      name: "Deza",
      handle: "@deza.eats",
      platform: "tiktok" as Platform,
      niche: "budget cooking",
      followers: 131000,
      topPost: "Reel: '$4 dinners that don't taste like sadness'",
      stage: "contacted" as Stage,
    },
    {
      ...base,
      id: uid(),
      name: "Ravi",
      handle: "@ravi.reads",
      platform: "substack" as Platform,
      niche: "productivity",
      followers: 9200,
      topPost: "Essay: 'The 2-hour workday is a lie (mostly)'",
      stage: "replied" as Stage,
    },
  ];
}

function loadState(): OutreachState {
  const fresh: OutreachState = {
    brand: { ...DEFAULT_BRAND },
    influencers: seedInfluencers(),
    draftArticle: "",
    draftCredit: "",
    version: 1,
  };
  if (typeof window === "undefined") return fresh;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fresh;
    const parsed = JSON.parse(raw) as Partial<OutreachState>;
    return {
      brand: { ...DEFAULT_BRAND, ...(parsed.brand ?? {}) },
      influencers: Array.isArray(parsed.influencers) ? parsed.influencers : [],
      draftArticle: typeof parsed.draftArticle === "string" ? parsed.draftArticle : "",
      draftCredit: typeof parsed.draftCredit === "string" ? parsed.draftCredit : "",
      version: 1,
    };
  } catch {
    return fresh;
  }
}

type NewInfluencer = Omit<Influencer, "id" | "createdAt" | "updatedAt">;

interface Ctx {
  state: OutreachState;
  hydrated: boolean;
  addInfluencer: (input: NewInfluencer) => void;
  updateInfluencer: (id: string, patch: Partial<Influencer>) => void;
  removeInfluencer: (id: string) => void;
  setStage: (id: string, stage: Stage) => void;
  setBrand: (patch: Partial<Brand>) => void;
  setDraft: (article: string, credit: string) => void;
  resetAll: () => void;
}

const OutreachCtx = createContext<Ctx | null>(null);

export function OutreachProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OutreachState>(() => ({
    brand: { ...DEFAULT_BRAND },
    influencers: [],
    draftArticle: "",
    draftCredit: "",
    version: 1,
  }));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full / disabled — non-fatal */
    }
  }, [state, hydrated]);

  const addInfluencer = useCallback((input: NewInfluencer) => {
    setState((s) => {
      const now = Date.now();
      const inf: Influencer = { ...input, id: uid(), createdAt: now, updatedAt: now };
      return { ...s, influencers: [inf, ...s.influencers] };
    });
  }, []);

  const updateInfluencer = useCallback((id: string, patch: Partial<Influencer>) => {
    setState((s) => ({
      ...s,
      influencers: s.influencers.map((i) =>
        i.id === id ? { ...i, ...patch, id: i.id, updatedAt: Date.now() } : i
      ),
    }));
  }, []);

  const removeInfluencer = useCallback((id: string) => {
    setState((s) => ({ ...s, influencers: s.influencers.filter((i) => i.id !== id) }));
  }, []);

  const setStage = useCallback((id: string, stage: Stage) => {
    setState((s) => ({
      ...s,
      influencers: s.influencers.map((i) =>
        i.id === id ? { ...i, stage, updatedAt: Date.now() } : i
      ),
    }));
  }, []);

  const setBrand = useCallback((patch: Partial<Brand>) => {
    setState((s) => ({ ...s, brand: { ...s.brand, ...patch } }));
  }, []);

  const setDraft = useCallback((article: string, credit: string) => {
    setState((s) => ({ ...s, draftArticle: article, draftCredit: credit }));
  }, []);

  const resetAll = useCallback(() => {
    setState({
      brand: { ...DEFAULT_BRAND },
      influencers: seedInfluencers(),
      draftArticle: "",
      draftCredit: "",
      version: 1,
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      state,
      hydrated,
      addInfluencer,
      updateInfluencer,
      removeInfluencer,
      setStage,
      setBrand,
      setDraft,
      resetAll,
    }),
    [state, hydrated, addInfluencer, updateInfluencer, removeInfluencer, setStage, setBrand, setDraft, resetAll]
  );

  return <OutreachCtx.Provider value={value}>{children}</OutreachCtx.Provider>;
}

export function useOutreach(): Ctx {
  const ctx = useContext(OutreachCtx);
  if (!ctx) throw new Error("useOutreach must be used within OutreachProvider");
  return ctx;
}
