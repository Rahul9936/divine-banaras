import type { Metadata } from "next";
import Link from "next/link";
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
          <div className="grid gap-5 rounded-2xl border border-maroon/10 bg-sand/45 p-6 shadow-sm sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
            <div>
              <p className="eyebrow">Flexible by design</p>
              <h2 className="mt-2 font-display text-3xl font-700 text-maroon">Need a journey shaped around you?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/70">
                Every itinerary can be adapted to your dates, pace, hotel preference and darshan needs. Start with a conversation before you commit.
              </p>
            </div>
            <Link href="/contact" className="btn-primary whitespace-nowrap">Ask about a custom yatra</Link>
          </div>

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
