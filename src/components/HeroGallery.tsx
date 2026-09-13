"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface HeroGalleryProps {
  images: string[];
  title: string;
  category: string;
}

export default function HeroGallery({ images, title, category }: HeroGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDesktopThumbnails, setShowDesktopThumbnails] = useState(false);

  // Pad or slice images so we always have at least 5 for the grid
  const mainImage = images[0] || "/placeholder.jpg";
  const subImages = [
    images[1] || mainImage,
    images[2] || mainImage,
    images[3] || mainImage,
    images[4] || mainImage,
  ];

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keep thumbnail images out of the mobile DOM so they are not downloaded on
  // smaller screens. They are added after hydration only for desktop layouts.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateThumbnails = () => setShowDesktopThumbnails(mediaQuery.matches);

    updateThumbnails();
    mediaQuery.addEventListener("change", updateThumbnails);
    return () => mediaQuery.removeEventListener("change", updateThumbnails);
  }, []);

  // Keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev]);

  return (
    <>
      {/* Grid Container matching your reference layout */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl md:grid-cols-4 md:grid-rows-2 h-[380px] sm:h-[480px] lg:h-[540px]">
          {/* Main Large Image (Left, 2 columns wide, 2 rows tall) */}
          <div
            onClick={() => handleOpen(0)}
            className="relative cursor-pointer overflow-hidden md:col-span-2 md:row-span-2 group"
          >
            <Image
              src={mainImage}
              alt={`${title} main`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay Category Tag */}
            {category && (
              <span className="absolute top-4 left-4 rounded-full bg-maroon/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur-md">
                {category}
              </span>
            )}
          </div>

          {/* 4 Grid Thumbnails (Right Side) */}
          {showDesktopThumbnails && subImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => handleOpen(idx + 1 < images.length ? idx + 1 : 0)}
              className="relative hidden cursor-pointer overflow-hidden md:block group"
            >
              <Image
                src={img}
                alt={`${title} photo ${idx + 2}`}
                fill
                sizes="(min-width: 768px) 25vw, 1px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}

          {/* Floating 'View all' Button */}
          <button
            onClick={() => handleOpen(0)}
            className="absolute bottom-4 right-8 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-md backdrop-blur-md hover:bg-white transition-all hover:scale-105"
          >
            <svg
              className="h-4 w-4 text-ink"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
            </svg>
            View all ({images.length})
          </button>
        </div>
      </div>

      {/* Fullscreen Gallery Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors sm:left-8"
            aria-label="Previous image"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image Container */}
          <div className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-xl">
            <Image
              src={images[currentIndex]}
              alt={`${title} - image ${currentIndex + 1}`}
              width={1600}
              height={1200}
              sizes="90vw"
              className="max-h-[85vh] max-w-[90vw] object-contain select-none"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-xs text-white backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors sm:right-8"
            aria-label="Next image"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
