import Link from "next/link";
import { site } from "@/lib/site";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      {/* Diya / flame mark */}
      <span className="relative inline-flex h-10 w-10 items-center justify-center">
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <defs>
            <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F4A623" />
              <stop offset="100%" stopColor="#E8751A" />
            </linearGradient>
          </defs>
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke={light ? "#F4A623" : "#7B1E1E"}
            strokeWidth="1.5"
            opacity="0.55"
          />
          <path
            d="M24 10c3.5 5 6 8.2 6 12.5A6 6 0 0 1 24 28a6 6 0 0 1-6-5.5C18 18.2 20.5 15 24 10z"
            fill="url(#flame)"
            className="animate-flicker origin-bottom"
          />
          <path
            d="M14 33c2.5 2.6 6 4 10 4s7.5-1.4 10-4c-1.8 3.2-5.5 5.5-10 5.5S15.8 36.2 14 33z"
            fill={light ? "#F4A623" : "#C9A227"}
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-xl font-700 tracking-wide ${
            light ? "text-white" : "text-maroon"
          }`}
        >
          {site.name}
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.28em] ${
            light ? "text-cream/70" : "text-saffron"
          }`}
        >
          Spiritual Journeys
        </span>
      </span>
    </Link>
  );
}
