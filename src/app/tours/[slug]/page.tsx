import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTour, tours } from "@/data/tours";
import { site, whatsappLink } from "@/lib/site";
import PlaceholderImage from "@/components/PlaceholderImage";
import InquiryForm from "@/components/InquiryForm";
import HeroCarousel from "@/components/HeroCarousel";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) {
    return {
      title: "Tour not found | Divine Banaras",
      description: "The requested tour could not be found on Divine Banaras.",
      openGraph: {
        title: "Tour not found | Divine Banaras",
        description: "The requested tour could not be found on Divine Banaras.",
        url: `${site.url}/tours/${slug}`,
        siteName: site.name,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: "Tour not found | Divine Banaras",
        description: "The requested tour could not be found on Divine Banaras.",
      },
    };
  }

  const tourTitle = tour.title.split("—")[0].trim();
  const imageUrl = `${site.url}${tour.imageSrc}`;
  const pageUrl = `${site.url}/tours/${tour.slug}`;

  return {
    title: `${tourTitle} | Divine Banaras`,
    description: tour.summary,
    keywords: [
      tour.title,
      tour.category,
      "spiritual tours",
      "Varanasi tour",
      "Ayodhya pilgrimage",
      "Prayagraj travel",
      "Bodhgaya travel",
    ],
    openGraph: {
      title: `${tourTitle} | Divine Banaras`,
      description: tour.summary,
      url: pageUrl,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: `${tourTitle} — ${tour.subtitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tourTitle} | Divine Banaras`,
      description: tour.summary,
      images: [imageUrl],
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const tourTitleClean = tour.title.split("—")[0].trim();
  const waMessage = `Namaste! I'm interested in the "${tourTitleClean}" (${tour.duration}) tour. Please share details.`;

  // Support both `images` array (if present in your tour model) or single `imageSrc`
  const galleryImages: string[] =
    (tour as any).images && Array.isArray((tour as any).images) && (tour as any).images.length > 0
      ? (tour as any).images
      : [tour.imageSrc];

  const hasMultipleImages = galleryImages.length > 1;

  return (
    <>
      {/* Hero Section: Conditional Carousel or Banner */}
      <section className="relative overflow-hidden">
        {hasMultipleImages ? (
          <HeroCarousel images={galleryImages} label={tour.category} />
        ) : (
          <PlaceholderImage
            imageSrc={tour.imageSrc}
            className="h-72 w-full sm:h-96"
            label={tour.category}
          />
        )}

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-maroon-dark/80 via-maroon-dark/30 to-transparent" />
        <div className="container-page absolute inset-x-0 bottom-0 pointer-events-none">
          <div className="pb-8 text-cream pointer-events-auto">
            <Link href="/tours" className="text-sm text-cream/80 hover:text-white">
              ← All tours
            </Link>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              {tour.title}
            </h1>
            <p className="mt-2 max-w-2xl text-cream/85">{tour.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px]">
          {/* Main content */}
          <div>
            {/* Quick facts */}
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Fact label="Duration" value={tour.duration} />
              <Fact label="Category" value={tour.category} />
              <Fact label="Destinations" value={`${tour.places?.length ?? 0} places`} />
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl font-bold text-maroon">Overview</h2>
              <p className="mt-3 leading-relaxed text-ink/80">{tour.summary}</p>
            </div>

            {/* Highlights */}
            {tour.highlights && tour.highlights.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-maroon">Highlights</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {tour.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm text-ink/80">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-maroon">
                  Day-by-day Itinerary
                </h2>
                <ol className="mt-6 space-y-6 border-l-2 border-saffron/30 pl-6">
                  {tour.itinerary.map((d) => {
                    const activities = d.activities?.length
                      ? d.activities
                      : splitActivities(d.description);

                    return (
                      <li key={d.day} className="relative">
                        <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-saffron ring-4 ring-cream" />
                        <p className="text-xs font-semibold uppercase tracking-widest text-saffron">
                          {d.day}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-maroon">
                          {d.title}
                        </h3>
                        {activities.length > 0 ? (
                          <ul className="mt-3 space-y-2 rounded-xl bg-sand/50 p-3">
                            {activities.map((activity, index) => (
                              <li key={`${d.day}-${index}`} className="flex items-start gap-2 text-sm text-ink/75">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            {/* Includes / Excludes */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {tour.includes && (
                <div className="rounded-2xl bg-[#25D366]/8 p-6 ring-1 ring-[#25D366]/20">
                  <h3 className="font-display text-xl font-semibold text-maroon">
                    What&rsquo;s included
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {tour.includes.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
                        <span className="mt-1 text-[#1EBE5A]">✓</span> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.excludes && (
                <div className="rounded-2xl bg-maroon/5 p-6 ring-1 ring-maroon/10">
                  <h3 className="font-display text-xl font-semibold text-maroon">
                    Not included
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {tour.excludes.map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink/80">
                        <span className="mt-1 text-maroon/50">✕</span> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar booking card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-soft ring-1 ring-maroon/10">
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full text-center"
                >
                  Enquire on WhatsApp
                </a>
                <a href={site.phoneHref} className="btn-outline w-full text-center">
                  Call {site.phone}
                </a>
              </div>

              <div className="mt-6 border-t border-maroon/10 pt-5">
                <h3 className="font-display text-lg font-semibold text-maroon">
                  Quick enquiry
                </h3>
                <p className="mt-1 text-xs text-ink/60">
                  Prefer we reach out? Leave your details.
                </p>
              </div>
              <div className="mt-4">
                <InquiryForm defaultTour={tour.title} />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-sand/60 p-4 text-center">
      <p className="text-[11px] uppercase tracking-wider text-ink/50">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold text-maroon">{value}</p>
    </div>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-saffron/15 text-saffron-dark">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function splitActivities(description?: string): string[] {
  if (!description) return [];
  return description
    .split(/[.;]/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .map((segment) => segment.replace(/^\s*[-•]\s*/, ""));
}