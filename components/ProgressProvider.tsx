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
  emptyProgress,
  loadProgress,
  recordResult as pureRecord,
  saveProgress,
  type ProgressState,
} from "@/lib/progress";
import type { ApologistRank, Difficulty } from "@/lib/types";

type Ctx = {
  progress: ProgressState;
  hydrated: boolean;
  rankUpEvent: ApologistRank | null;
  clearRankUp: () => void;
  record: (
    itemId: string,
    difficulty: Difficulty,
    result: "correct" | "wrong" | "skipped"
  ) => { xpGained: number; mastered: boolean; rankedUp: ApologistRank | null };
  reset: () => void;
};

const ProgressCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress());
  const [hydrated, setHydrated] = useState(false);
  const [rankUpEvent, setRankUpEvent] = useState<ApologistRank | null>(null);

  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveProgress(progress);
  }, [progress, hydrated]);

  const record = useCallback(
    (
      itemId: string,
      difficulty: Difficulty,
      result: "correct" | "wrong" | "skipped"
    ) => {
      let xpGained = 0;
      let mastered = false;
      let rankedUp: ApologistRank | null = null;
      setProgress((prev) => {
        const beforeXp = prev.xp;
        const beforeRank = prev.rank;
        const next = pureRecord(prev, itemId, difficulty, result);
        xpGained = next.xp - beforeXp;
        const item = next.items[itemId];
        mastered = item?.masteryScore >= 0.7;
        if (next.rank !== beforeRank) {
          rankedUp = next.rank;
          setRankUpEvent(next.rank);
        }
        return next;
      });
      return { xpGained, mastered, rankedUp };
    },
    []
  );

  const reset = useCallback(() => {
    setProgress(emptyProgress());
    setRankUpEvent(null);
  }, []);

  const clearRankUp = useCallback(() => {
    setRankUpEvent(null);
  }, []);

  const value = useMemo(
    () => ({ progress, hydrated, rankUpEvent, clearRankUp, record, reset }),
    [progress, hydrated, rankUpEvent, clearRankUp, record, reset]
  );

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
