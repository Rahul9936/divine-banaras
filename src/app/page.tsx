"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedTours } from "@/data/tours";
import { site, whatsappLink } from "@/lib/site";
import TourCard from "@/components/TourCard";
import InquiryForm from "@/components/InquiryForm";

export default function HomePage() {
  const featured = getFeaturedTours();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    // Only auto-rotate when the carousel is actually scrollable (mobile/smaller screens).
    const isScrollable = () => container.scrollWidth > container.clientWidth;

    // Pause auto-rotation when the user has recently interacted
    let suspendedUntil = 0;

    const isContainerVisible = () => {
      const rect = container.getBoundingClientRect();
      const h = rect.height;
      if (h === 0) return false;
      const visibleTop = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      return visibleTop / h >= 0.5; // at least 50% visible
    };

    const rotateCarousel = () => {
      if (!isScrollable()) return;
      if (Date.now() < suspendedUntil) return;
      if (!isContainerVisible()) return;

      const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-carousel-card]"));
      if (cards.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let closestIndex = 0;
      let smallestDistance = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < smallestDistance) {
          smallestDistance = dist;
          closestIndex = i;
        }
      });

      const nextIndex = (closestIndex + 1) % cards.length;
      // use inline: 'center' so it recenters horizontally without forcing vertical jump
      cards[nextIndex]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    const intervalId = window.setInterval(rotateCarousel, 10000);
    // run once shortly after mount but only if visible
    const startTimeout = window.setTimeout(() => {
      rotateCarousel();
    }, 1200);

    const suspend = () => {
      suspendedUntil = Date.now() + 5000; // pause rotation for 5s after interaction
    };
    window.addEventListener("scroll", suspend, { passive: true });
    window.addEventListener("touchstart", suspend, { passive: true });

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(startTimeout);
      window.removeEventListener("scroll", suspend);
      window.removeEventListener("touchstart", suspend);
    };
  }, []);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden text-cream">
        <div className="absolute inset-0">
          <Image
            src="/banner.png"
            alt="Banaras ghats and temple scenery"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 " />
        </div>
        <div className="absolute inset-0 opacity-10 divider-dots text-white" aria-hidden="true" />
        <div className="container-page relative grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <div className="eyebrow inline-block p-4 text-saffron-light bg-ink/70 rounded-lg">Kashi · Ayodhya · Prayagraj · Bodhgaya</div>
            <h1 className="mt-4 font-display text-4xl font-700 leading-tight sm:text-5xl lg:text-6xl bg-ink/70 p-4 rounded-lg">
              Walk the sacred path of{" "}
              <span className="text-marigold">Bharat</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85 bg-ink/70 p-4 rounded-lg">
              From the eternal ghats of Kashi Vishwanath to Ayodhya’s Ram Janmabhoomi, the holy Triveni Sangam in Prayagraj, and the spiritual tranquility of Bodhgaya — Divine Banaras crafts unforgettable 2–3 day yatras and grand spiritual circuits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tours" className="btn-primary">
                Explore Tours
              </Link>
              <a href={site.phoneHref} className="btn-call text-white border-white/60 hover:bg-white/10">
                Call {site.phone}
              </a>
              <a
                href={whatsappLink("Namaste! I'd like help planning a spiritual tour.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Plan on WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-cream/80">
              <Stat value="2–7" label="Day itineraries" />
              <Stat value="100%" label="Assisted darshan" />
              <Stat value="4.9★" label="Traveller rating" />
            </div>
          </div>

          {/* Hero collage of gradient cards (placeholders for photos) */}
          <div className="relative block lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-10 space-y-4">
                <HeroTile title="Kashi Vishwanath" imageSrc="/kashi.jpg" />
                <HeroTile title="Ganga Aarti" imageSrc="/ganga-aarti.jpg" tall />
              </div>
              <div className="space-y-4">
                <HeroTile title="Ayodhya Dham" imageSrc="/ram-mandir.jpg" tall />
                <HeroTile title="Bodhgaya" imageSrc="/bodhgaya.jpg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- The Divine Triangle ---------------- */}
      <section className="section">
        <div className="container-page text-center">
          <p className="eyebrow">Our Signature Journey</p>
          <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
            The Divine Triangle
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Three of the holiest darshans in the subcontinent, connected into
            one seamless pilgrimage — Shiva to Ram, and back to Shiva.
          </p>
        </div>

        <div
          ref={carouselRef}
          className="container-page mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth md:grid md:grid-cols-3 md:overflow-visible md:pb-0 [scrollbar-width:none]"
        >
          <TriangleStep
            step="01"
            title="Kashi Vishwanath"
            place="Varanasi"
            text="Darshan at the Jyotirlinga, the sunrise boat ride, and the electrifying Ganga Aarti."
            imageSrc="/kashi-vishwanath-temple.jpg"
            href="/tours/varanasi-prayagraj-ayodhya-tour-package"
            className="w-[85vw] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
          />
          <TriangleStep
            step="02"
            title="Ram Janmabhoomi"
            place="Ayodhya Dham"
            text="Ram Lalla darshan at the grand mandir, Hanuman Garhi and the serene Sarayu Aarti."
            imageSrc="/ram-mandir.jpg"
            href="/tours/varanasi-prayagraj-ayodhya-tour-package"
            className="w-[85vw] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
          />
          <TriangleStep
            step="03"
            title="Triveni Sangam"
            place="Prayagraj"
            text="Witness the holy confluence of the Ganga, Yamuna, and the mythical Saraswati."
            imageSrc="/sangam.jpg"
            href="/tours/varanasi-prayagraj-ayodhya-tour-package"
            className="w-[85vw] max-w-sm shrink-0 snap-center md:w-auto md:max-w-none md:shrink"
          />
        </div>
      </section>

      {/* ---------------- Quick Enquiry ---------------- */}
      <section className="section bg-[#f07954]">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start rounded-3xl bg-white/80 p-8 shadow-soft ring-1 ring-maroon/10">
          <div className="">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-saffron">
              Request a quote
            </p>
            <h2 className="mt-4 font-display text-4xl font-700 text-maroon sm:text-5xl">
              Book Spiritual Packages
            </h2>
            <p className="mt-4 max-w-xl text-ink/70">
              Get the right yatra plan, tailored guidance and a competitive price from Divine Banaras.
            </p>
            <div className="mt-8 space-y-4">
              <FeatureRow text="Only trusted & verified agents" />
              <FeatureRow text="Friendly customer support" />
              <FeatureRow text="100% money-safe guarantee" />
              <FeatureRow text="Secure & safe online transactions" />
            </div>
          </div>
          <div className="p-8">
            <div className="mb-6 rounded-3xl bg-saffron/10 px-5 py-5">
              <h3 className="mt-3 text-2xl font-semibold text-maroon text-center">
                Enter your details
              </h3>
            </div>
            <InquiryForm minimal defaultTour="Divine Triangle Tour Package" />
          </div>
        </div>
      </section>

      {/* ---------------- Featured Tours ---------------- */}
      <section className="section bg-sand/50">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Handpicked Itineraries</p>
              <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
                Popular Yatras
              </h2>
            </div>
            <Link href="/tours" className="btn-outline">
              View all tours
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Why Divine Banaras ---------------- */}
      <section className="section">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow">Why travel with us</p>
            <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
              Devotion, done right
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              title="Local Kashi roots"
              text="Born and based in Varanasi, we know every ghat, gali and temple timing."
              icon="M12 2l2.5 6H21l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z"
            />
            <Feature
              title="Assisted darshan"
              text="Smooth temple entry and aarti arrangements so you focus on the divine."
              icon="M4 12a8 8 0 1 1 16 0M12 12v6M9 21h6"
            />
            <Feature
              title="Handpicked stays"
              text="Comfortable, clean hotels close to the ghats and temples."
              icon="M3 21V9l9-6 9 6v12M9 21v-6h6v6"
            />
            <Feature
              title="24×7 support"
              text="A dedicated yatra manager on call throughout your journey."
              icon="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            />
          </div>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="section bg-maroon-dark text-cream">
        <div className="container-page">
          <div className="text-center">
            <p className="eyebrow text-saffron-light">Blessings from travellers</p>
            <h2 className="mt-3 font-display text-3xl font-700 text-white sm:text-4xl">
              Stories from the yatra
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Testimonial
              quote="From the Ganga Aarti to Ram Lalla darshan, every moment was arranged with so much care. Truly divine."
              name="Meera & Family"
              from="Mumbai"
            />
            <Testimonial
              quote="The Kashi–Ayodhya trip was seamless. Our guide's knowledge made the temples come alive."
              name="Rajesh Kumar"
              from="Delhi"
            />
            <Testimonial
              quote="Reaching Pashupatinath after Kashi and Ayodhya felt like completing a lifelong wish. Highly recommended."
              name="S. Iyer"
              from="Bengaluru"
            />
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-sunrise-gradient px-6 py-14 text-center text-white sm:px-12">
            <div className="absolute inset-0 opacity-10 divider-dots text-white" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-display text-3xl font-700 sm:text-4xl">
                Ready to begin your yatra?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-white/90">
                Tell us your dates and darshan wishes — we&rsquo;ll craft the
                perfect itinerary for you.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn bg-white text-maroon hover:bg-cream focus:ring-white">
                  Plan My Yatra
                </Link>
                <a href={site.phoneHref} className="btn border border-white/60 text-white hover:bg-white/10 focus:ring-white">
                  Call {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="font-display text-2xl font-700 text-marigold">{value}</span>
      <span className="ml-2">{label}</span>
    </div>
  );
}

function HeroTile({
  title,
  imageSrc,
  tall = false,
}: {
  title: string;
  imageSrc: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`relative flex items-end overflow-hidden rounded-2xl p-4 shadow-soft ${
        tall ? "h-56" : "h-40"
      }`}
    >
      <Image src={imageSrc} alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-maroon/20" />
      <span className="relative text-sm font-semibold text-white drop-shadow bg-saffron-light/70 rounded-2xl p-2">{title}</span>
    </div>
  );
}

function TriangleStep({
  step,
  title,
  place,
  text,
  imageSrc,
  href,
  className,
}: {
  step: string;
  title: string;
  place: string;
  text: string;
  imageSrc?: string;
  href?: string;
  className?: string;
}) {
  const cardContent = (
    <div className={`relative overflow-hidden rounded-2xl border border-maroon/10 bg-white p-7 shadow-card ${className ?? ""}`}>
      {imageSrc ? (
        <>
          <Image src={imageSrc} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-maroon/40" />
        </>
      ) : null}
      <div className="relative">
        <span className="font-display text-5xl font-700 text-sand">{step}</span>
        <h3 className="mt-1 font-display text-2xl font-600 text-white">{title}</h3>
        <p className="text-sm font-semibold uppercase tracking-wider text-saffron-light">
          {place}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-cream/90">{text}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        data-carousel-card
        className={`group block cursor-pointer focus:outline-none focus:ring-2 focus:ring-maroon/40 focus:ring-offset-2 ${className ?? ""}`}
      >
        {cardContent}
      </Link>
    );
  }

  return <div data-carousel-card>{cardContent}</div>;
}

function Feature({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-sand text-saffron-dark sm:mx-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={icon} />
        </svg>
      </div>
      <h3 className="mt-4 font-display text-xl font-600 text-maroon">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
    </div>
  );
}

function FeatureRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 text-ink/80 items-center">
      <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-saffron/15 text-saffron">
        ✓
      </span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function Testimonial({
  quote,
  name,
  from,
}: {
  quote: string;
  name: string;
  from: string;
}) {
  return (
    <figure className="rounded-2xl bg-white/5 p-7 ring-1 ring-white/10">
      <div className="text-marigold" aria-hidden="true">★★★★★</div>
      <blockquote className="mt-3 text-cream/90">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-semibold text-white">{name}</span>
        <span className="text-cream/60"> · {from}</span>
      </figcaption>
    </figure>
  );
}
