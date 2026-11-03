import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { places } from "@/data/places";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Places to Visit in Varanasi",
  description: "Discover the temples and spiritual landmarks of Varanasi with Divine Banaras.",
  alternates: { canonical: `${site.url}/places` },
  openGraph: {
    title: "Places to Visit in Varanasi | Divine Banaras",
    description: "Discover the temples and spiritual landmarks of Varanasi with Divine Banaras.",
    url: `${site.url}/places`,
    siteName: site.name,
    type: "website",
  },
};

export default function PlacesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-maroon text-cream">
        <div className="absolute inset-0 bg-ghat-gradient opacity-80" aria-hidden="true" />
        <div className="container-page relative py-16 text-center sm:py-20">
          <p className="eyebrow text-saffron-light">Explore Kashi</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Places to Visit in Varanasi</h1>
          <p className="mx-auto mt-4 max-w-2xl text-cream/85">Get to know the temples and landmarks that make Kashi a meaningful destination for pilgrims and curious travellers alike.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-7 md:grid-cols-2">
            {places.map((place) => (
              <article key={place.slug} className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-maroon/10">
                <Link href={`/places/${place.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden bg-sand">
                    <Image src={place.image} alt={place.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow">{place.location}</p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-maroon group-hover:text-saffron-dark">{place.name}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{place.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-maroon">Explore this place <span aria-hidden="true">→</span></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
