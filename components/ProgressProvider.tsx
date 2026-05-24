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
import type { Difficulty } from "@/lib/types";

type Ctx = {
  progress: ProgressState;
  hydrated: boolean;
  record: (
    itemId: string,
    difficulty: Difficulty,
    result: "correct" | "wrong" | "skipped"
  ) => { xpGained: number; mastered: boolean };
  reset: () => void;
};

const ProgressCtx = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress());
  const [hydrated, setHydrated] = useState(false);

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
      setProgress((prev) => {
        const beforeXp = prev.xp;
        const next = pureRecord(prev, itemId, difficulty, result);
        xpGained = next.xp - beforeXp;
        const item = next.items[itemId];
        mastered = item?.masteryScore >= 0.7;
        return next;
      });
      return { xpGained, mastered };
    },
    []
  );

  const reset = useCallback(() => {
    setProgress(emptyProgress());
  }, []);

  const value = useMemo(
    () => ({ progress, hydrated, record, reset }),
    [progress, hydrated, record, reset]
  );

  return <ProgressCtx.Provider value={value}>{children}</ProgressCtx.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressCtx);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
