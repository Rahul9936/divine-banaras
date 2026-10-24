import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTour, tours } from "@/data/tours";
import { site, whatsappLink } from "@/lib/site";
import InquiryForm from "@/components/InquiryForm";
import HeroGallery from "@/components/HeroGallery";

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

  const galleryImages: string[] =
    (tour as any).images && Array.isArray((tour as any).images) && (tour as any).images.length > 0
      ? (tour as any).images
      : [tour.imageSrc];

  return (
    <>
      {/* Title Header Section */}
      <section className="pt-6 pb-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/tours"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon/70 hover:text-maroon transition-colors mb-2"
          >
            ← Back to all tours
          </Link>
          <h1 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl text-maroon leading-tight">
            {tour.title}
          </h1>
          <p className="mt-1 text-base text-ink/70 font-medium max-w-3xl">
            {tour.subtitle}
          </p>
        </div>
      </section>

      {/* Grid Image Hero with Modal Lightbox */}
      <HeroGallery
        images={galleryImages}
        title={tour.title}
        category={tour.category}
      />

      <section className="section mt-8">
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
                  {tour.itinerary.map((d) => {
                    const stops: Array<{ id?: string; title: string; description?: string; type?: string }> =
                      (d as any).stops ||
                      ((d as any).activities || splitActivities(d.description)).map((act: string, i: number) => ({
                        id: String.fromCharCode(65 + i),
                        title: act,
                        description: undefined,
                      }));

                    return (
                      <div key={d.day} className="rounded-2xl bg-sand/30 p-6 border border-maroon/5 shadow-sm">
                        <div className="mb-6 pb-3 border-b border-saffron/20">
                          <p className="text-xs font-bold uppercase tracking-widest text-saffron">
                            {d.day}
                          </p>
                          <h3 className="font-display text-xl font-bold text-maroon mt-0.5">
                            {d.title}
                          </h3>
                          {d.description && (
                            <p className="mt-2 text-sm leading-relaxed text-ink/70">
                              {d.description}
                            </p>
                          )}
                        </div>

                        {stops.length > 0 && (
                          <ol className="relative">
                            {stops.map((stop, stopIndex) => {
                              const isFirst = stopIndex === 0;
                              const isLast = stopIndex === stops.length - 1;
                              const isStartOfTour = isFirst && d === tour.itinerary[0];
                              const isHotel = isHotelStop(stop);

                              return (
                                <li key={stop.id || stopIndex} className="relative flex items-stretch gap-4">
                                  {/* Marker + connector */}
                                  <div className="flex w-10 shrink-0 flex-col items-center">
                                    <div
                                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-cream shadow-md ring-4 ring-cream ${
                                        isHotel ? "bg-saffron-dark" : "bg-maroon"
                                      }`}
                                    >
                                      <StopIcon stop={stop} />
                                    </div>
                                    {!isLast && (
                                      <div className="my-1 w-0 flex-1 border-l-2 border-dashed border-saffron/60" aria-hidden="true" />
                                    )}
                                  </div>

                                  {/* Stop card */}
                                  <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-5"}`}>
                                    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-maroon/5">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">
                                          Stop {stopIndex + 1} of {stops.length}
                                        </span>
                                        {isStartOfTour && (
                                          <span className="rounded-full bg-saffron/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-saffron-dark">
                                            Start
                                          </span>
                                        )}
                                        {isHotel && (
                                          <span className="rounded-full bg-maroon/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-maroon">
                                            Stay
                                          </span>
                                        )}
                                      </div>
                                      <h4 className="mt-1 font-display text-base font-bold leading-tight text-maroon">
                                        {stop.title}
                                      </h4>
                                      {stop.description && (
                                        <p className="mt-1 text-sm font-medium leading-relaxed text-ink/75">
                                          {stop.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ol>
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

function isHotelStop(stop: { title: string; description?: string; type?: string }) {
  const text = `${stop.type || ""} ${stop.title} ${stop.description || ""}`.toLowerCase();
  return (
    stop.type === "hotel" ||
    text.includes("hotel") ||
    text.includes("check-in") ||
    text.includes("check in") ||
    text.includes("overnight stay") ||
    text.includes("resort") ||
    /inn/.test(text)
  );
}

const STOP_ICON_PATHS = {
  hotel: "M3 20V6m0 9h18v5M21 15v-2a3 3 0 0 0-3-3h-8v5M7 12.5a1.5 1.5 0 1 0 0-.01",
  temple: "M12 3v3m-2 0h4M6 21V11a6 6 0 0 1 12 0v10M3 21h18M10 21v-5a2 2 0 0 1 4 0v5",
  shopping: "M6 7h12l1 13H5L6 7zm3 0a3 3 0 0 1 6 0",
  transport: "M5 16V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8M4 16h16v2H4v-2zm3-4h10M7 20v1m10-1v1",
  boat: "M3 15h18l-2.5 4h-13L3 15zm9 0V4l5 8h-5M12 4L7 12h5",
  pin: "M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
} as const;

function StopIcon({ stop }: { stop: { title: string; description?: string; type?: string } }) {
  const text = `${stop.type || ""} ${stop.title} ${stop.description || ""}`.toLowerCase();

  let kind: keyof typeof STOP_ICON_PATHS = "pin";
  if (isHotelStop(stop)) kind = "hotel";
  else if (
    stop.type === "temple" ||
    ["temple", "mandir", "dham", "shrine", "stupa", "aarti"].some((w) => text.includes(w))
  ) kind = "temple";
  else if (stop.type === "shopping" || text.includes("shopping") || text.includes("market")) kind = "shopping";
  else if (text.includes("boat")) kind = "boat";
  else if (stop.type === "transport" || text.includes("transfer") || text.includes("airport")) kind = "transport";

  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={STOP_ICON_PATHS[kind]} />
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
