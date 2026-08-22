"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getFeaturedTours } from "@/data/tours";
import { site, whatsappLink } from "@/lib/site";
import TourCard from "@/components/TourCard";
import InquiryForm from "@/components/InquiryForm";
import HeroCarousel from "@/components/HeroCarousel";

const DESTINATIONS = [
  { id: "all", label: "All Destinations" },
  { id: "kashi", label: "Kashi (Varanasi)" },
  { id: "ayodhya", label: "Ayodhya" },
  { id: "prayagraj", label: "Prayagraj" },
  { id: "bodhgaya", label: "Bodhgaya" },
];

export default function HomePageClient() {
  const router = useRouter();
  const featured = getFeaturedTours();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const featuredToursRef = useRef<HTMLDivElement | null>(null);

  const [selectedDest, setSelectedDest] = useState("all");

  const scrollFeaturedTours = (direction: "previous" | "next") => {
    const container = featuredToursRef.current;
    if (!container) return;

    container.scrollBy({
      left: (direction === "next" ? 1 : -1) * container.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  const handleExploreClick = (targetDest?: string) => {
    const destToNavigate = targetDest || selectedDest;

    if (destToNavigate === "kashi") {
      router.push("/tours/varanasi-2-days-itinerary");
      return;
    }

    if (destToNavigate === "ayodhya" || destToNavigate === "prayagraj") {
      router.push("/tours/varanasi-prayagraj-ayodhya-tour-package");
      return;
    }

    if (destToNavigate === "bodhgaya") {
      router.push("/tours/varanasi-gaya-tour-package");
      return;
    }

    router.push("/tours");
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const isScrollable = () => container.scrollWidth > container.clientWidth;
    let suspendedUntil = 0;

    const isContainerVisible = () => {
      const rect = container.getBoundingClientRect();
      const h = rect.height;
      if (h === 0) return false;
      const visibleTop = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      return visibleTop / h >= 0.5;
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
      cards[nextIndex]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    const intervalId = window.setInterval(rotateCarousel, 10000);
    const startTimeout = window.setTimeout(() => {
      rotateCarousel();
    }, 1200);

    const suspend = () => {
      suspendedUntil = Date.now() + 5000;
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
      {/* ---------------- Hero Section (Split Layout) ---------------- */}
      <section className="relative overflow-hidden bg-[#0A1118] text-white py-12 lg:py-20 border-b-4 border-[#D4AF37]">
        {/* Background Overlay */}
        {/* <div className="absolute inset-0 z-0 opacity-15"> */}
        <Image
          src="/varanasi_ghats_hd_bg.jpg"
          alt="Varanasi ghats background"
          fill
          className="absolute inset-0 object-cover opacity-40"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0A1118] via-[#0A1118]/90 to-[#0A1118]/70" />
        </div> */}

        <div className="container-page relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Data, Branding & Navigation Controls */}
            <div className="relative lg:col-span-7 flex flex-col justify-center text-left space-y-6 overflow-hidden rounded-3xl">

              {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0A1118]/95 via-[#0A1118]/70 to-transparent" /> */}

              <div className="relative z-10 space-y-6">
                {/* Brand Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1 text-xs font-semibold text-[#F3C623] backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F3C623]" aria-hidden="true"></span>
                  <span>Locally rooted in Varanasi</span>
                </div>

                {/* Main Headline */}
                <div>
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-5xl font-extrabold uppercase tracking-wide text-white leading-tight">
                    One Call For <span className="text-[#F3C623]">Complete Varanasi Trip</span>
                  </h1>
                  <p className="mt-2 text-[#D4AF37] font-medium text-sm sm:text-base italic tracking-wider">
                    — WE TAKE CARE OF EVERYTHING —
                  </p>
                </div>

                {/* Destination Selection Card */}
                <div className="rounded-2xl bg-white/5 backdrop-blur-md p-5 border border-[#D4AF37]/30 shadow-xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#F3C623] mb-3">
                    Select Your Pilgrimage Destination
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {DESTINATIONS.map((dest) => (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => setSelectedDest(dest.id)}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${selectedDest === dest.id
                          ? "bg-[#D4AF37] text-[#0A1118] shadow-md scale-105"
                          : "bg-black/40 text-white/80 hover:bg-black/60 border border-white/10"
                          }`}
                      >
                        {dest.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-left mb-4">
                    <p className="text-[#D4AF37] font-serif italic text-base">Let Us Make Your Yatra</p>
                    <p className="text-xs text-white/70">Memorable & Comfortable</p>
                  </div>

                  {/* Call To Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => handleExploreClick()}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-[#D4AF37] to-[#F3C623] text-[#0A1118] font-bold rounded-xl text-center text-sm hover:brightness-110 transition-all cursor-pointer shadow-lg"
                    >
                      Explore {selectedDest !== "all" ? DESTINATIONS.find((d) => d.id === selectedDest)?.label : "All"} Packages →
                    </button>
                    <a
                      href={whatsappLink("Hello Divine Banaras, I would like to inquire about tour packages.")}
                      className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-xl border border-white/20 text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                  {/* Quick Direct Call Banner */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-3">
                    <a
                      href={site.phoneHref}
                      className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-xl border border-white/20 text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <div className="text-xl bg-[#D4AF37] text-[#0A1118] p-2.5 rounded-full group-hover:scale-105 transition-transform">
                        📞
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-extrabold tracking-wider text-[#D4AF37] w-full">
                          Call Our Local Varanasi Team
                        </span>
                        <span className="text-lg font-black text-white">{site.phone || "7310079100"}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Image Carousel */}
            <div className="lg:col-span-5 w-full">
              <HeroCarousel onSelectDest={handleExploreClick} />
            </div>

          </div>

          {/* 4 Core Offerings Grid (Angled/Bordered Cards from Poster) */}
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-display font-bold text-[#F3C623]">Core Services</h2>
            <p className="mt-2 text-sm text-[#F3C623]/80">Explore the key services that make your Varanasi pilgrimage smooth and memorable.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4">
            <PosterServiceCard
              title="AIRPORT PICKUP & DROP"
              subtitle="On Time | Safe | Hassle Free"
              imageSrc="/airport_service.jpg"
              icon="✈️"
              destId="ayodhya"
              onClick={handleExploreClick}
            />

            <PosterServiceCard
              title="HOTEL BOOKING"
              subtitle="Budget to Luxury Best Stay Options"
              imageSrc="/hotel_service.jpg"
              icon="🏨"
              destId="bodhgaya"
              onClick={handleExploreClick}
            />

            <PosterServiceCard
              title="CAB SERVICE"
              subtitle="Comfortable & Safe Rides"
              imageSrc="/cab_service.jpg"
              icon="🚗"
              destId="kashi"
              onClick={handleExploreClick}

            />

            <PosterServiceCard
              title="VIP DARSHAN"
              subtitle="Skip the Line | Divine Experience"
              imageSrc="/vip_darshan_service.jpg"
              badge="VIP DARSHAN"
              icon="🛕"
              destId="kashi"
              onClick={handleExploreClick}

            />

          </div>
          {/* Value Points Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 py-4 px-4 rounded-xl bg-[#0F1B26] border border-[#D4AF37]/30 text-center">
            <ValueIcon title="GANGA AARTI" desc="Spiritual Vibes" icon="🪔" />
            <ValueIcon title="AYODHYA TOUR" desc="Shri Ram Darshan" icon="🏛️" />
            <ValueIcon title="VERIFIED" desc="Trusted Services" icon="🛡️" />
            <ValueIcon title="EXPERIENCED" desc="Supportive Team" icon="👥" />
            <ValueIcon title="BEST PRICE" desc="Guaranteed Value" icon="🏷️" />
            <ValueIcon title="24x7 SUPPORT" desc="Always Here" icon="🎧" />
          </div>

        </div>
      </section>

      {/* ---------------- The Divine Triangle ---------------- */}
      {/* <section className="section">
        <div className="container-page text-center">
          <p className="eyebrow">Our Signature Journey</p>
          <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
            The Divine Triangle
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            Three of the holiest darshans in the subcontinent, connected into one seamless pilgrimage — Shiva to Ram, and back to Shiva.
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
      </section> */}

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
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollFeaturedTours("previous")}
                aria-label="Show previous popular yatras"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-maroon/20 bg-white text-maroon transition-colors hover:bg-maroon hover:text-white focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollFeaturedTours("next")}
                aria-label="Show next popular yatras"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-maroon/20 bg-white text-maroon transition-colors hover:bg-maroon hover:text-white focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <Link href="/tours" className="btn-outline">
                View all tours
              </Link>
            </div>
          </div>

          <div
            ref={featuredToursRef}
            className="mt-10 flex items-stretch gap-6 overflow-x-auto pb-5 snap-x snap-mandatory scroll-smooth [scrollbar-width:none]"
          >
            {featured.map((tour) => (
              <div key={tour.slug} className="flex w-[85vw] max-w-[360px] shrink-0 snap-start sm:w-[380px]">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Quick Enquiry ---------------- */}
      <section className="section bg-[#f07954]">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start rounded-3xl bg-white/80 p-8 shadow-soft ring-1 ring-maroon/10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-saffron">
              Plan with confidence
            </p>
            <h2 className="mt-4 font-display text-4xl font-700 text-maroon sm:text-5xl">
              Tell us where you&apos;d like to go
            </h2>
            <p className="mt-4 max-w-xl text-ink/70">
              Share your travel plans and we&apos;ll help you understand the route, likely inclusions and next steps before you decide.
            </p>
            <div className="mt-8 space-y-4">
              <FeatureRow text="Clear routes and inclusions" />
              <FeatureRow text="A locally based Varanasi team" />
              <FeatureRow text="A tailored quote before booking" />
              <FeatureRow text="Options shaped around your group and pace" />
            </div>
          </div>
          <div className="p-8">
            <div className="mb-6 rounded-3xl bg-saffron/10 px-5 py-5">
              <h3 className="text-2xl font-semibold text-center text-maroon">
                Request a call about the Divine Triangle
              </h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-ink/65">Leave your name and phone number; we&apos;ll use them only to discuss this journey.</p>
            </div>
            <InquiryForm minimal defaultTour="Divine Triangle Tour Package" />
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
              title="Local Varanasi team"
              text="Plan with people who are based in and around Kashi."
              icon="M12 2l2.5 6H21l-5 4 2 7-6-4-6 4 2-7-5-4h6.5z"
            />
            <Feature
              title="Clear planning"
              text="Review the route, inclusions and practical details before you travel."
              icon="M4 12a8 8 0 1 1 16 0M12 12v6M9 21h6"
            />
            <Feature
              title="Flexible journeys"
              text="Discuss dates, group needs and the pace that works for your pilgrimage."
              icon="M3 21V9l9-6 9 6v12M9 21v-6h6v6"
            />
            <Feature
              title="Direct contact"
              text="Call, WhatsApp or send an enquiry when you have a question."
              icon="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
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
                Tell us your dates and darshan wishes — we&rsquo;ll craft the perfect itinerary for you.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn bg-white text-maroon hover:bg-cream focus:ring-white">
                  Plan My Yatra
                </Link>
                <a href={site.phoneHref} className="btn border border-white/60 text-white hover:bg-white/10 focus:ring-white">
                  Call {site.phone}
                </a>
                <a href={whatsappLink("Hello Divine Banaras, I would like help planning a spiritual journey.")} className="btn border border-white/60 text-white hover:bg-white/10 focus:ring-white">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ValueIcon({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-xl mb-2">
        {icon}
      </div>
      <h4 className="text-xs font-bold text-[#F3C623] tracking-wider uppercase">{title}</h4>
      <p className="text-[10px] text-white/70 mt-0.5">{desc}</p>
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
        <p className="text-sm font-semibold uppercase tracking-wider text-saffron-light">{place}</p>
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
    <div className="flex items-center gap-3 text-ink/80">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-saffron/15 text-saffron">✓</span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function PosterServiceCard({
  title,
  subtitle,
  imageSrc,
  icon,
  badge,
  destId,
  onClick,
}: {
  title: string;
  subtitle: string;
  imageSrc: string;
  icon: string;
  badge?: string;
  destId: string;
  onClick: (destId: string) => void;
}) {
  return (
    <div className="group relative  rounded-xl overflow-hidden border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all cursor-pointer shadow-xl p-2">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          // 1. Force Next.js to serve a high-density image variant (~1200px) on mobile
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // 2. Increase compression quality from default 75 to 95 for sharp edges & text
          quality={95}
          // 3. Mark as priority so mobile browsers load high-res immediately
          priority
          // 4. Add will-change-transform to prevent Mobile Safari subpixel raster blur
          className="object-cover transition-transform duration-500  will-change-transform"
        />
        <div className="" />
      </div>
    </div>

  );

}
