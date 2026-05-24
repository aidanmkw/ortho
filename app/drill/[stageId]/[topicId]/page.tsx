import Link from "next/link";
import { notFound } from "next/navigation";
import { getStage, getTopic, curriculum } from "@/lib/content";
import DrillRunner from "@/components/DrillRunner";

export function generateStaticParams() {
  return curriculum.stages.flatMap((s) =>
    s.topics.map((t) => ({ stageId: s.id, topicId: t.id }))
  );
}

export default function TopicDrillPage({
  params,
}: {
  params: { stageId: string; topicId: string };
}) {
  const stage = getStage(params.stageId);
  const topic = getTopic(params.stageId, params.topicId);
  if (!stage || !topic) notFound();

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
        items={topic.items}
        stageTitle={stage.title}
        topicTitle={topic.title}
      />
    </div>
  );
}
