import Link from "next/link";
import { formatINR, type Tour } from "@/data/tours";
import PlaceholderImage from "./PlaceholderImage";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-maroon/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative">
        <PlaceholderImage
          imageSrc={tour.imageSrc}
          label={tour.category}
          className="h-52 w-full"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-maroon shadow-sm">
          {tour.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-600 leading-snug text-maroon">
          {tour.title.split("—")[0].trim()}
        </h3>
        <p className="mt-1 text-sm text-ink/70">{tour.subtitle}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {tour.places.map((p) => (
            <span
              key={p}
              className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-medium text-maroon/80"
            >
              {p}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-maroon/10 pt-4">
          {/* <div>
            <span className="text-[11px] uppercase tracking-wider text-ink/50 hidden">
              From
            </span>
            <p className="font-display text-2xl font-700 text-saffron-dark hidden">
              {formatINR(tour.priceFrom)}
              <span className="ml-1 text-xs font-sans font-normal text-ink/50">
                / person
              </span>
            </p>
          </div> */}
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-maroon transition-colors group-hover:text-saffron">
            View
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
