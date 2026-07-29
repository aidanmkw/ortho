import DmComposer from "@/components/outreach/DmComposer";

export default function DmPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-neutral-50">DM Studio</h1>
      <p className="mb-6 max-w-2xl text-sm text-neutral-400">
        Generate a personalized outreach DM offering a free feature. Pick a creator from your list,
        choose an angle, tweak, and copy.
      </p>
      <DmComposer />
    </div>
  );
}
