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

            {/* Itinerary Section */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-2xl font-bold text-maroon">
                  Day-by-day Itinerary
                </h2>

                <div className="mt-8 space-y-12">
                  {tour.itinerary.map((d, dayIndex) => {
                    // Fallback: If tour doesn't have structured 'stops', split description or activities
                    const stops: Array<{ id?: string; title: string; description?: string; type?: string }> =
                      (d as any).stops ||
                      ((d as any).activities || splitActivities(d.description)).map((act: string, i: number) => ({
                        id: String.fromCharCode(65 + i),
                        title: act,
                        description: undefined,
                      }));

                    return (
                      <div key={d.day} className="rounded-2xl bg-sand/30 p-6 border border-maroon/5 shadow-sm">
                        {/* Day Header */}
                        <div className="mb-6 pb-3 border-b border-saffron/20">
                          <p className="text-xs font-bold uppercase tracking-widest text-saffron">
                            {d.day}
                          </p>
                          <h3 className="font-display text-xl font-bold text-maroon mt-0.5">
                            {d.title}
                          </h3>
                        </div>

                        {/* Route Pin Timeline */}
                        {stops.length > 0 && (
                          <div className="relative pl-2">
                            {/* Thick Continuous Vertical Route Line */}
                            <div className="absolute left-[24px] top-4 bottom-4 w-2 bg-saffron rounded-full" />

                            <div className="space-y-6 relative">
                              {stops.map((stop, stopIndex) => {
                                const isStart = stopIndex === 0;

                                return (
                                  <div key={stop.id || stopIndex} className="flex items-start gap-4 group">
                                    {/* Dynamic Icon Badge (Hotel / Temple / Pin) */}
                                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon text-cream shadow-md ring-4 ring-cream">
                                      <StopIcon stop={stop} />
                                    </div>

                                    {/* Label & Description Text */}
                                    <div className="pt-1">
                                      <h4 className="font-display font-bold text-base text-maroon leading-tight">
                                        {isStart && !stop.title.toLowerCase().includes("starting")
                                          ? `Starting location: ${stop.title}`
                                          : stop.title}
                                      </h4>
                                      {stop.description && (
                                        <p className="mt-1 text-sm text-ink/75 font-medium leading-relaxed">
                                          {stop.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
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

{/* Component to render Hotel, Temple, or Pin Icon dynamically based on text */}
function StopIcon({ stop }: { stop: { title: string; description?: string; type?: string } }) {
  const combinedText = `${stop.type || ""} ${stop.title} ${stop.description || ""}`.toLowerCase();

  const isHotel =
    stop.type === "hotel" ||
    combinedText.includes("hotel") ||
    combinedText.includes("check-in") ||
    combinedText.includes("check in") ||
    combinedText.includes("overnight stay") ||
    combinedText.includes("resort") ||
    combinedText.includes("inn");

  const isTemple =
    stop.type === "temple" ||
    combinedText.includes("temple") ||
    combinedText.includes("mandir") ||
    combinedText.includes("dham") ||
    combinedText.includes("shrine") ||
    combinedText.includes("stupa") ||
    combinedText.includes("aarti");

  if (isHotel) {
    return (
      <img
        src="/hotel.png" // Path to your hotel icon in public folder
        alt="Hotel"
        className="h-7 w-7 object-contain"
      />
    );
  }

  if (isTemple) {
    return (
      <img
        src="/temple.png" // Path to your temple icon in public folder
        alt="Temple"
        className="h-7 w-7 object-contain"
      />
    );
  }

  if (stop.type === "shopping" || combinedText.includes("shopping") || combinedText.includes("market")) {
    return (
      <img
        src="/shopping-bag.png" // Path to your shopping icon in public folder
        alt="Shopping"
        className="h-7 w-7 object-contain"
      />
    );
  }

  if (stop.type === "transport" || combinedText.includes("transfer") || combinedText.includes("airport")) {
    return (
      <img
        src="/transportation.png" // Path to your transport icon in public folder
        alt="Transport"
        className="h-7 w-7 object-contain"
      />
    );
  }

  /* Standard Location Pin Icon (Default) */
  return (
    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
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