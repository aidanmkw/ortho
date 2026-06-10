// Bare layout for /pilgrimage — the 3D icon-world owns the whole viewport
// (the app component renders position:fixed over the site chrome).
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "ΟΔΟΣ — The Pilgrim Road",
  description:
    "A 3D pilgrimage through the history of the Church, painted like the inside of an icon. Thirteen stations, one golden road.",
};

export const viewport: Viewport = {
  themeColor: "#0e0a06",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function PilgrimageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-[100dvh] bg-black">{children}</div>;
}
