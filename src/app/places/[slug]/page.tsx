import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlace, places } from "@/data/places";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return places.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlace(slug);
  if (!place) return { title: "Place not found" };

  return {
    title: place.name,
    description: place.summary,
    keywords: [place.name, "Varanasi temples", "places to visit in Varanasi", "Kashi pilgrimage"],
    alternates: { canonical: `${site.url}/places/${place.slug}` },
    openGraph: {
      title: `${place.name} | Divine Banaras`,
      description: place.summary,
      url: `${site.url}/places/${place.slug}`,
      siteName: site.name,
      type: "article",
      images: [{ url: `${site.url}${place.image}`, alt: place.name }],
    },
  };
}

export default async function PlaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const place = getPlace(slug);
  if (!place) notFound();

  const message = `Namaste! I would like to visit ${place.name} in Varanasi. Please share details.`;

  return (
    <>
      <section className="section pb-8">
        <div className="container-page">
          <Link href="/places" className="text-sm font-semibold text-maroon/70 transition-colors hover:text-maroon">← All places</Link>
          <p className="eyebrow mt-6">{place.location}</p>
          <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-maroon sm:text-5xl">{place.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink/70">{place.summary}</p>
        </div>
      </section>

      <section className="container-page">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl bg-sand shadow-soft">
          <Image src={place.image} alt={place.name} fill priority sizes="(max-width: 768px) 100vw, 1152px" className="object-cover" />
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_320px]">
          <article>
            <h2 className="font-display text-3xl font-bold text-maroon">About {place.name}</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/75">
              {place.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <section className="mt-10 rounded-2xl border border-saffron/25 bg-sand/55 p-6 sm:p-8" aria-labelledby="local-experiences-heading">
              <p className="eyebrow">Don’t miss these moments</p>
              <h2 id="local-experiences-heading" className="mt-2 font-display text-2xl font-bold text-maroon">Local experiences</h2>
              <div className="mt-5 space-y-4">
                {place.localExperiences.map((experience) => (
                  <div key={experience.title} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-maroon/5">
                    <h3 className="font-display text-xl font-bold text-maroon">{experience.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75">{experience.description}</p>
                    {experience.timingNote && <p className="mt-3 border-l-2 border-saffron pl-3 text-sm font-medium leading-relaxed text-maroon/80">{experience.timingNote}</p>}
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-maroon">What makes it special</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {place.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 rounded-xl bg-sand/50 p-4 text-sm text-ink/80">
                    <span className="text-saffron-dark" aria-hidden="true">✦</span>{highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 rounded-2xl border border-maroon/10 bg-white p-6">
              <h2 className="font-display text-2xl font-bold text-maroon">Visitor notes</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
                {place.visitorNotes.map((note) => <li key={note} className="flex gap-3"><span className="text-saffron-dark" aria-hidden="true">•</span>{note}</li>)}
              </ul>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-sand/60 p-6 ring-1 ring-maroon/10">
              <p className="eyebrow">Plan your visit</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-maroon">Explore Kashi with local support</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">Ask us about local transport and adding this stop to your Varanasi itinerary.</p>
              <div className="mt-5 flex flex-col gap-3">
                <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">Enquire on WhatsApp</a>
                <Link href="/tours" className="btn-outline w-full">Browse Varanasi tours</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page">
          <Link href="/places" className="text-sm font-semibold text-maroon hover:text-saffron-dark">← Discover more places in Varanasi</Link>
        </div>
      </section>
    </>
  );
}
