"use client";

import { useState, useEffect, useRef } from "react";
import PlaceholderImage from "@/components/PlaceholderImage";

interface HeroCarouselProps {
  images: string[];
  label?: string;
}

export default function HeroCarousel({ images, label }: HeroCarouselProps) {
  // Add clone of last image at start and clone of first image at end
  const extendedImages = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  // Start at index 1 because index 0 is the prepended clone
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isSnappingRef = useRef(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [images.length, currentIndex]);

  const handleNext = () => {
    if (isSnappingRef.current) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    // If we reached the cloned first image at the end
    if (currentIndex === extendedImages.length - 1) {
      isSnappingRef.current = true;
      setIsTransitioning(false); // Disable CSS animation
      setCurrentIndex(1); // Jump seamlessly to actual first image

      // Re-enable transitions on the next tick
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isSnappingRef.current = false;
        });
      });
    }
    // If we navigated backward to the cloned last image at the start
    else if (currentIndex === 0) {
      isSnappingRef.current = true;
      setIsTransitioning(false);
      setCurrentIndex(extendedImages.length - 2);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isSnappingRef.current = false;
        });
      });
    }
  };

  const goToSlide = (originalIndex: number) => {
    setIsTransitioning(true);
    setCurrentIndex(originalIndex + 1);
  };

  // Calculate active index for indicator dots (0 to images.length - 1)
  const activeDotIndex =
    currentIndex === 0
      ? images.length - 1
      : currentIndex === extendedImages.length - 1
      ? 0
      : currentIndex - 1;

  return (
    <div className="relative h-72 w-full overflow-hidden sm:h-96">
      {/* Sliding Track */}
      <div
        className={`flex h-full w-full ${
          isTransitioning
            ? "transition-transform duration-700 ease-out will-change-transform"
            : "transition-none"
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((img, idx) => (
          <div key={`${img}-${idx}`} className="h-full w-full flex-shrink-0">
            <PlaceholderImage
              imageSrc={img}
              className="h-72 w-full sm:h-96"
              label={label}
            />
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeDotIndex
                  ? "w-7 bg-saffron"
                  : "w-2.5 bg-white/60 hover:bg-white"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}