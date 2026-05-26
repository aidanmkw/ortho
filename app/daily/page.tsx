"use client";

import Link from "next/link";
import { useMemo } from "react";
import DrillRunner from "@/components/DrillRunner";
import { useProgress } from "@/components/ProgressProvider";
import { pickDailyItems, todayKey } from "@/lib/daily";

export default function DailyPage() {
  const { progress, hydrated } = useProgress();
  const day = todayKey();

  const items = useMemo(() => {
    const mastered = new Set(
      Object.values(progress.items)
        .filter((i) => i.masteryScore >= 0.7)
        .map((i) => i.itemId)
    );
    return pickDailyItems(day, 10, { masteredIds: mastered });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, hydrated]);

  return (
    <div>
      <div className="mb-6">
        <Link href="/" className="text-sm text-gold/80 hover:text-gold no-underline">
          ← Home
        </Link>
      </div>
      <DrillRunner
        items={items}
        stageTitle="Daily Trial"
        topicTitle={day}
        rewardSeed={`daily:${day}`}
      />
    </div>
  );
}
