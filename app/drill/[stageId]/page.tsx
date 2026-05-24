import Link from "next/link";
import { notFound } from "next/navigation";
import { getStage, curriculum } from "@/lib/content";
import DrillRunner from "@/components/DrillRunner";

export function generateStaticParams() {
  return curriculum.stages.map((s) => ({ stageId: s.id }));
}

export default function DrillPage({
  params,
  searchParams,
}: {
  params: { stageId: string };
  searchParams: { mode?: string };
}) {
  const stage = getStage(params.stageId);
  if (!stage) notFound();

  let items = stage.topics.flatMap((t) => t.items);
  if (searchParams.mode === "debate") {
    items = items.filter((i) => i.kind === "debate");
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/stage/${stage.id}`}
          className="text-sm text-gold/80 hover:text-gold no-underline"
        >
          ← Back to {stage.title}
        </Link>
      </div>
      <DrillRunner
        items={items}
        stageTitle={stage.title}
        topicTitle={
          searchParams.mode === "debate" ? "Cross-Examination" : undefined
        }
      />
    </div>
  );
}
