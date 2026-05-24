import type { Metadata } from "next";
import QuestApp from "@/components/quest/QuestApp";

export const metadata: Metadata = {
  title: "Orthodox Quest: Witness of the Witnesses",
};

export default function QuestPage() {
  return <QuestApp />;
}
