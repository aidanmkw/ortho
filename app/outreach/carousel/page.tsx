import CarouselStudio from "@/components/outreach/CarouselStudio";

export default function CarouselPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-neutral-50">Carousel Studio</h1>
      <p className="mb-6 max-w-2xl text-sm text-neutral-400">
        Slice an article into Instagram-ready 1080×1080 slides. Pick a theme, preview, and export
        PNGs — then post and tag the creator.
      </p>
      <CarouselStudio />
    </div>
  );
}
