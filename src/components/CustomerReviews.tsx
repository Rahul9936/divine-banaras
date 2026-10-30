import { reviews } from "@/data/reviews";

export default function CustomerReviews() {
  if (reviews.length === 0) return null;

  return (
    <section className="section bg-sand/50">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">Testimonials</p>
        <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
          Loved by Travelers
        </h2>
        <p className="mt-3 max-w-xl text-ink/65">
          Authentic experiences from guests who travelled with Divine Banaras.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={`${r.name}-${r.comment.slice(0, 16)}`}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft"
            >
              <figcaption className="flex flex-1 flex-col p-6">
                <svg className="h-7 w-7 text-saffron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2H4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .01-1 1v3z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.76-2.02-2-2h-4c-1.25 0-2 .75-2 1.97V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
                </svg>
                {r.rating && (
                  <div className="mt-4 text-sm tracking-widest text-saffron" aria-label={`${r.rating} out of 5 stars`}>
                    {"★".repeat(r.rating)}
                    <span className="text-ink/20">{"★".repeat(5 - r.rating)}</span>
                  </div>
                )}
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">&ldquo;{r.comment}&rdquo;</blockquote>
                <div className="mt-6 border-t border-ink/10 pt-4">
                  <p className="text-sm font-semibold text-ink">{r.name}</p>
                  {(r.tour || r.location) && (
                    <p className="mt-0.5 text-xs text-ink/60">
                      {r.tour ? `Travelled to ${r.tour}` : r.location}
                    </p>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
