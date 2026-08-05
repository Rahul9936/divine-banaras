"use client";

export interface RouteStop {
  label: string;
  sublabel?: string;
  // Percentage coordinates on the canvas container (0-100)
  x: number;
  y: number;
  labelPosition?: "left" | "right" | "top" | "bottom";
}

interface RouteMapProps {
  title?: string;
  subtitle?: string;
  stops: RouteStop[];
  // SVG Bezier curve path string defining the road layout
  pathD?: string;
}

export default function RouteMap({
  title = "Route Map",
  subtitle,
  stops = [],
  pathD = "M 50 480 C 200 480 250 360 450 360 C 650 360 780 220 550 180 C 320 140 220 50 450 40 C 680 30 750 20 950 20",
}: RouteMapProps) {
  if (!stops || stops.length === 0) return null;

  return (
    <div className="w-full rounded-2xl bg-[#F4E8D3] p-6 shadow-sm border border-saffron/20 my-10 overflow-hidden">
      {/* Optional Title Header */}
      {(title || subtitle) && (
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-maroon">{title}</h2>
          {subtitle && <p className="text-sm text-ink/70 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Map Graphic Box */}
      <div className="relative w-full aspect-[16/10] min-h-[380px] sm:min-h-[480px]">
        {/* Decorative Halftone Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: "radial-gradient(#d5ba92 2px, transparent 2px)",
            backgroundSize: "16px 16px"
          }}
        />

        {/* 3D Curved Road SVG */}
        <svg
          className="absolute inset-0 h-full w-full drop-shadow-md"
          viewBox="0 0 1000 520"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Road Shadow / 3D Base */}
          <path
            d={pathD}
            stroke="#1A1C20"
            strokeWidth="52"
            strokeLinecap="round"
          />

          {/* Main Road Surface */}
          <path
            d={pathD}
            stroke="#2D3139"
            strokeWidth="44"
            strokeLinecap="round"
          />

          {/* Dotted Centerline */}
          <path
            d={pathD}
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeDasharray="12 12"
            strokeLinecap="round"
          />
        </svg>

        {/* Render Dynamic Pins on Top of the Road */}
        {stops.map((stop, index) => {
          const pinNumber = String(index + 1).padStart(2, "0");
          const posClass = getLabelPositionClass(stop.labelPosition ?? "right");

          return (
            <div
              key={`${stop.label}-${index}`}
              className="absolute z-10 flex items-center -translate-x-1/2 -translate-y-full"
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
            >
              {/* Teardrop Pin */}
              <div className="relative flex h-12 w-9 shrink-0 items-center justify-center rounded-t-full bg-saffron border-2 border-saffron-dark shadow-md text-maroon font-bold text-xs clip-pin">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-ink font-extrabold text-[11px] -mt-1 shadow-inner">
                  {pinNumber}
                </span>
              </div>

              {/* Text Label */}
              <div className={`absolute whitespace-nowrap ${posClass}`}>
                <p className="font-display text-sm font-bold text-maroon leading-tight">
                  {stop.label}
                </p>
                {stop.sublabel && (
                  <p className="text-[11px] font-medium text-ink/70">
                    {stop.sublabel}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getLabelPositionClass(position: "left" | "right" | "top" | "bottom") {
  switch (position) {
    case "left":
      return "right-11 top-1 text-right";
    case "top":
      return "bottom-14 left-1/2 -translate-x-1/2 text-center";
    case "bottom":
      return "top-14 left-1/2 -translate-x-1/2 text-center";
    case "right":
    default:
      return "left-11 top-1 text-left";
  }
}