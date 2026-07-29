import type { Metadata } from "next";
import { OutreachProvider } from "@/components/outreach/OutreachProvider";
import OutreachNav from "@/components/outreach/OutreachNav";

export const metadata: Metadata = {
  title: "Outreach Studio — be your own Forbes",
  description:
    "A free, in-browser toolkit to find creators, DM them, turn their top post into a humanized article, and build Instagram carousels. No fees, no servers.",
};

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  return (
    <OutreachProvider>
      <div className="min-h-screen bg-[#0b0b0d] font-sans text-neutral-200 [font-family:ui-sans-serif,system-ui,-apple-system,Segoe_UI,Roboto,Helvetica,Arial,sans-serif]">
        <OutreachNav />
        <main className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-8">{children}</main>
        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-6 text-[11px] text-neutral-500 sm:px-6">
            <span>Outreach Studio · runs 100% in your browser · no API keys, no fees</span>
            <span>Don&apos;t be like Forbes. Feature people for free.</span>
          </div>
        </footer>
      </div>
    </OutreachProvider>
  );
}
