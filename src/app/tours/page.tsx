import type { Metadata } from "next";
import { tours, categories } from "@/data/tours";
import TourCard from "@/components/TourCard";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Tours & Yatras | Divine Banaras",
  description:
    "Browse spiritual tour packages from Divine Banaras — Kashi Vishwanath, Ayodhya Ram Janmabhoomi, Pashupatinath Nepal and the Buddhist circuit through Sarnath.",
  keywords: [
    "spiritual tours",
    "Divine Triangle",
    "Varanasi tours",
    "Bodhgaya tour",
    "Ayodhya pilgrimage",
    "Prayagraj travel",
  ],
  openGraph: {
    title: "Tours & Yatras | Divine Banaras",
    description:
      "Browse spiritual tour packages from Divine Banaras — Kashi Vishwanath, Ayodhya Ram Janmabhoomi, Pashupatinath Nepal and the Buddhist circuit through Sarnath.",
    url: `${new URL("/tours", "https://divinebanaras.com").toString()}`,
    siteName: "Divine Banaras",
    type: "website",
    images: [
      {
        url: "https://divinebanaras.com/banner.png",
        alt: "Divine Banaras tours and spiritual journeys",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tours & Yatras | Divine Banaras",
    description:
      "Browse spiritual tour packages from Divine Banaras — Kashi Vishwanath, Ayodhya Ram Janmabhoomi, Pashupatinath Nepal and the Buddhist circuit through Sarnath.",
    images: ["https://divinebanaras.com/banner.png"],
  },
};

export default function ToursPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Itineraries"
        title="Tours & Yatras"
        imageSrc="/banner.png"
        subtitle="From two-day Kashi escapes to the grand Divine Triangle — choose the journey that calls to you."
      />

      <section className="section">
        <div className="container-page space-y-16">
          {categories.map((category) => {
            const list = tours.filter((t) => t.category === category);
            if (list.length === 0) return null;
            return (
              <div key={category}>
                <div className="mb-6 flex items-center gap-4">
                  <h2 className="font-display text-2xl font-700 text-maroon">
                    {category}
                  </h2>
                  <span className="h-px flex-1 bg-maroon/10" />
                  <span className="text-sm text-ink/50">
                    {list.length} {list.length === 1 ? "tour" : "tours"}
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((tour) => (
                    <TourCard key={tour.slug} tour={tour} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
