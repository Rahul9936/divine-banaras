import Image from "next/image";

/**
 * Image placeholder for tour hero sections with optional decorative overlay.
 */
export default function PlaceholderImage({
  imageSrc,
  gradient,
  label,
  className = "",
}: {
  imageSrc?: string;
  gradient?: string;
  label?: string;
  className?: string;
}) {
  const bgClass = gradient ?? "bg-ghat-gradient";

  return (
    <div
      className={`relative overflow-hidden ${imageSrc ? className : `${bgClass} ${className}`}`}
      role="img"
      aria-label={label ?? "Tour image"}
    >
      {imageSrc ? (
        <Image src={imageSrc} alt="" fill className="object-cover" />
      ) : null}
      {/* Subtle mandala / ghat silhouette overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="white" strokeWidth="1.2">
          <circle cx="200" cy="120" r="60" opacity="0.5" />
          <circle cx="200" cy="120" r="42" opacity="0.5" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * 42}
                y1={120 + Math.sin(a) * 42}
                x2={200 + Math.cos(a) * 60}
                y2={120 + Math.sin(a) * 60}
                opacity="0.5"
              />
            );
          })}
        </g>
        {/* ghat steps + temple silhouette */}
        <g fill="white" opacity="0.14">
          <path d="M0 300 L0 250 L400 230 L400 300 Z" />
          <path d="M40 250 l30 -40 l30 40 z" />
          <rect x="60" y="250" width="20" height="20" />
          <path d="M320 250 l24 -34 l24 34 z" />
          <rect x="336" y="250" width="16" height="20" />
        </g>
      </svg>
      {label && (
        <div className="absolute inset-0 flex items-end p-4">
          <span className="rounded-full bg-black/20 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
