"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function KashiExperience({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(".kv-intro, .kv-chapter-mark, .kv-history, .kv-facts, .kv-aarti, .kv-sloka-section, .kv-visit"));
    const heroImage = root.querySelector<HTMLElement>(".kv-hero-image");
    elements.forEach((element) => element.classList.add("kv-reveal"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    let frame = 0;
    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!heroImage) return;
        const hero = heroImage.closest<HTMLElement>(".kv-hero");
        if (!hero) return;
        const bounds = hero.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
        const progress = Math.max(-1, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height) * 2 - 1));
        heroImage.style.setProperty("--parallax-y", `${progress * 34}px`);
      });
    };
    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -36px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={rootRef} className="kashi-page">{children}</div>;
}
