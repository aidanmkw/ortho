// Bare layout for /quest route — avoids the global site header/footer so the
// game has full-bleed control of the viewport.
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Orthodox Quest",
};

export const viewport: Viewport = {
  themeColor: "#0a0610",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function QuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-[100dvh] bg-black">{children}</div>;
}
