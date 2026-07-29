import Humanizer from "@/components/outreach/Humanizer";

export default function HumanizerPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-neutral-50">Article Humanizer</h1>
      <p className="mb-6 max-w-2xl text-sm text-neutral-400">
        Turn a creator&apos;s top post into a longer, human-sounding article. It runs entirely in your
        browser — or copy the ready-made prompt and let your own AI agent write it.
      </p>
      <Humanizer />
    </div>
  );
}
