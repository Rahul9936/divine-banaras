"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  destId: string;
  badge: string;
  location: string;
}

interface HeroCarouselProps {
  onSelectDest?: (destId: string) => void;
}

const slides: HeroSlide[] = [
  {
    title: "Kashi Vishwanath Temple",
    subtitle: "VIP Darshan & Temple Assistance",
    image: "/kashi.jpg",
    destId: "kashi",
    badge: "VIP DARSHAN",
    location: "VARANASI • KASHI",
  },
  {
    title: "Ganga Aarti Boat Ride",
    subtitle: "Feel the divine energy of Dashashwamedh Ghat",
    image: "/v7.jpg",
    destId: "kashi",
    badge: "MUST EXPERIENCE",
    location: "VARANASI • GANGA",
  },
  {
    title: "Shri Ram Janmabhoomi",
    subtitle: "Ayodhya Dham day tours & comfortable cab service",
    image: "/ram-mandir.jpg",
    destId: "ayodhya",
    badge: "AYODHYA TOUR",
    location: "AYODHYA • DHAM",
  },
  {
    title: "Bodhgaya & Prayagraj",
    subtitle: "Seamless outstation transfers, stays & sightseeing",
    image: "/bodhgaya.jpg",
    destId: "bodhgaya",
    badge: "FULL CIRCUIT",
    location: "BODHGAYA • PRAYAGRAJ",
  },
];

export default function HeroCarousel({ onSelectDest }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = slides[currentIndex];

  const goToSlide = (index: number) => {
    setCurrentIndex((index + slides.length) % slides.length);
  };

  const goNext = () => {
    goToSlide(currentIndex + 1);
  };

  const goPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      goNext();
    }, 4000);

    return () => window.clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <div
      className="group relative w-full h-[420px] sm:h-[500px] lg:h-[560px] overflow-hidden rounded-[28px] bg-[#081019] shadow-2xl ring-1 ring-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Image
        src={currentSlide.image}
        alt={currentSlide.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#05090d] via-[#071019]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05090d]/65 via-transparent to-transparent" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="absolute left-5 top-5 z-30 flex items-center gap-2 sm:left-7 sm:top-7">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/30 text-sm text-[#F3C623] backdrop-blur-md">
          ॐ
        </span>
        <div className="hidden sm:block">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">
            Divine Banaras
          </p>
          <p className="text-[8px] uppercase tracking-[0.2em] text-[#D4AF37]">
            Sacred Journeys
          </p>
        </div>
      </div>

      <div className="absolute right-5 top-5 z-30 sm:right-7 sm:top-7">
        <div className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[10px] font-bold tracking-widest text-white/80 backdrop-blur-md">
          <span className="text-[#F3C623]">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="mx-1 text-white/30">/</span>
          {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      <div className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 -rotate-90 origin-left md:block">
        <span className="text-[8px] font-bold uppercase tracking-[0.45em] text-white/40">
          Spiritual India
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 p-5 sm:p-7 lg:p-8">
        <div className="max-w-[90%] sm:max-w-[85%]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/35 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F3C623] shadow-[0_0_8px_#F3C623]" />
            <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#F3C623]">
              {currentSlide.badge}
            </span>
          </div>
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.28em] text-white/60">
            {currentSlide.location}
          </p>
          <h3 className="font-display text-2xl font-extrabold leading-tight tracking-wide text-white drop-shadow-2xl sm:text-3xl lg:text-4xl">
            {currentSlide.title}
          </h3>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-white/75 sm:text-sm">
            {currentSlide.subtitle}
          </p>
          <button
            type="button"
            onClick={() => onSelectDest?.(currentSlide.destId)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3C623] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-[#081019] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#F3C623] focus:ring-offset-2 focus:ring-offset-[#081019]"
          >
            Explore Journey
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-7 right-5 z-40 flex items-center gap-2 sm:right-7">
        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous destination"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all hover:border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-[#081019] focus:outline-none focus:ring-2 focus:ring-[#F3C623]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next destination"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all hover:border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-[#081019] focus:outline-none focus:ring-2 focus:ring-[#F3C623]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="absolute left-5 top-20 z-40 flex items-center gap-1.5 sm:left-7 sm:top-24">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goToSlide(idx)}
            aria-label={`Go to ${slide.title}`}
            className="group/dot flex h-4 items-center"
          >
            <span
              className={`block h-1 rounded-full transition-all duration-500 ${
                idx === currentIndex ? "w-8 bg-[#F3C623]" : "w-2 bg-white/40 group-hover/dot:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 z-50 h-[2px] bg-white/10">
          <div
            key={currentIndex}
            className="h-full origin-left bg-[#F3C623]"
            style={{ animation: "heroProgress 4s linear forwards" }}
          />
        </div>
      )}

      {isPaused && (
        <div className="absolute right-5 top-16 z-40 hidden rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[8px] font-bold uppercase tracking-widest text-white/60 backdrop-blur-md sm:block">
          Paused
        </div>
      )}

      <style jsx>{`
        @keyframes heroProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
