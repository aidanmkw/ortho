import ProspectManager from "@/components/outreach/ProspectManager";

export default function ProspectsPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-neutral-50">Prospects</h1>
      <p className="mb-6 max-w-2xl text-sm text-neutral-400">
        Build your list of creators, set your brand, and browse the discovery tools. Everything you
        add here flows into the DM, Humanizer, and Carousel tools.
      </p>
      <ProspectManager />
    </div>
  );
}
