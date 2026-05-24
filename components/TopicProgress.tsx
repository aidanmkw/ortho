"use client";

import { useProgress } from "./ProgressProvider";
import { masteredItemCount } from "@/lib/progress";

export default function TopicProgress({
  itemIds,
}: {
  itemIds: string[];
}) {
  const { progress, hydrated } = useProgress();
  if (!hydrated) return null;
  const mastered = masteredItemCount(progress, itemIds);
  const total = itemIds.length;
  const pct = total > 0 ? mastered / total : 0;
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex-1 h-1 bg-parchment/10 rounded overflow-hidden">
        <div
          className="h-full bg-gold transition-all"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <span className="text-[10px] text-parchment/60 whitespace-nowrap">
        {mastered}/{total}
      </span>
    </div>
  );
}
