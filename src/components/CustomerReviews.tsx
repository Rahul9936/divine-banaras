import Image from "next/image";
import { reviews } from "@/data/reviews";

export default function CustomerReviews() {
  if (reviews.length === 0) return null;

  return (
    <section className="section bg-sand/50">
      <div className="container-page">
        <div className="text-center">
          <p className="eyebrow">Customer reviews</p>
          <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
            Words and moments from our travellers
          </h2>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={`${r.name}-${r.comment.slice(0, 16)}`}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-maroon/10"
            >
              {r.media && (
                <div className="relative aspect-[4/3] w-full bg-black/5">
                  {r.media.type === "video" ? (
                    <video
                      className="h-full w-full object-cover"
                      src={r.media.src}
                      poster={r.media.poster}
                      controls
                      preload="metadata"
                      playsInline
                    />
                  ) : (
                    <Image
                      src={r.media.src}
                      alt={`Photo shared by ${r.name}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
              )}
              <figcaption className="flex flex-1 flex-col p-6">
                {r.rating && (
                  <div className="text-saffron" aria-label={`${r.rating} out of 5 stars`}>
                    {"★".repeat(r.rating)}
                    <span className="text-ink/20">{"★".repeat(5 - r.rating)}</span>
                  </div>
                )}
                <blockquote className="mt-3 flex-1 text-ink/75">&ldquo;{r.comment}&rdquo;</blockquote>
                <div className="mt-5 border-t border-maroon/10 pt-4">
                  <p className="font-semibold text-maroon">{r.name}</p>
                  {(r.location || r.tour) && (
                    <p className="text-sm text-ink/60">
                      {[r.location, r.tour].filter(Boolean).join(" · ")}
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
