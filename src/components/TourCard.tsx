import Link from "next/link";
import { formatINR, type Tour } from "@/data/tours";
import { whatsappLink } from "@/lib/site";
import PlaceholderImage from "./PlaceholderImage";

const MAX_PLACES = 3;

export default function TourCard({ tour }: { tour: Tour }) {
  const href =
    tour.slug === "dev-diwali-varanasi-special-tour"
      ? "/dev-diwali"
      : `/tours/${tour.slug}`;

  const shownPlaces = tour.places.slice(0, MAX_PLACES);
  const hiddenPlaces = tour.places.length - shownPlaces.length;

  return (
    // The "View itinerary" link is stretched over the whole card (after:inset-0), so the card stays
    // clickable while the WhatsApp button (relative z-10) remains its own link. Keep its ancestors
    // up to <article> unpositioned, or the overlay will shrink to that ancestor instead.
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-maroon/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative overflow-hidden">
        <PlaceholderImage
          imageSrc={tour.imageSrc}
          className="h-56 w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" aria-hidden="true" />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-maroon shadow-sm">
          {tour.duration}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-saffron-light">{tour.category}</p>
          <h3 className="mt-1 font-display text-2xl font-600 leading-snug text-white drop-shadow">
            {tour.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-2 text-sm text-ink/70">{tour.subtitle}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {shownPlaces.map((p) => (
            <span key={p} className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-medium text-maroon/80">
              {p}
            </span>
          ))}
          {hiddenPlaces > 0 && (
            <span className="rounded-full border border-maroon/15 px-2.5 py-0.5 text-[11px] font-medium text-maroon/70">
              +{hiddenPlaces} more
            </span>
          )}
        </div>

        <ul className="mt-4 grid gap-1.5 text-xs text-ink/70">
          <Detail icon="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" text={tour.stay} />
          <Detail icon="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2M9 17h6M5 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0M15 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0" text={tour.transport} />
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-maroon/10 pt-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-ink/50">
              {tour.priceFrom > 0 ? "From" : "Price"}
            </span>
            <p className="font-display text-xl font-700 text-saffron-dark">
              {tour.priceFrom > 0 ? formatINR(tour.priceFrom) : "On request"}
              {tour.priceFrom > 0 && (
                <span className="ml-1 font-sans text-xs font-normal text-ink/50">/ person</span>
              )}
            </p>
          </div>
          <Link
            href={href}
            aria-label={`View itinerary for ${tour.title}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-maroon transition-colors group-hover:text-saffron after:absolute after:inset-0 after:content-[''] focus:outline-none focus-visible:after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-saffron"
          >
            View itinerary
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <a
          href={whatsappLink(`Namaste! I'm interested in the "${tour.title}" (${tour.duration}). Please share details and availability.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Enquire about ${tour.title} on WhatsApp`}
          className="btn-whatsapp relative z-10 mt-4 w-full gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.42 1.32-1.95 1.36-.5.05-.98.24-3.3-.69-2.79-1.1-4.55-3.96-4.69-4.15-.13-.19-1.12-1.49-1.12-2.84s.71-2.01.96-2.29c.24-.27.53-.34.71-.34.18 0 .35 0 .51.01.16.01.38-.06.6.46.24.56.79 1.94.86 2.08.07.14.12.3.02.49-.1.19-.14.3-.28.46-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.27.14.44.21.51.32.07.11.07.65-.17 1.33z" />
          </svg>
          Enquire on WhatsApp
        </a>
      </div>
    </article>
  );
}

function Detail({ icon, text }: { icon: string; text: string }) {
  return (
    <li className="flex items-center gap-2">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-saffron-dark" aria-hidden="true">
        <path d={icon} />
      </svg>
      <span className="font-medium text-ink/80">{text}</span>
    </li>
  );
}
