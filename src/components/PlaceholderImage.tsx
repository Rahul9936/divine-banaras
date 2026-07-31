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
        <img src={imageSrc} alt="" className="h-full w-full object-cover" />
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
          <line x1="200" y1="78" x2="200" y2="60" opacity="0.5" />
          <line x1="218" y1="82" x2="230" y2="66" opacity="0.5" />
          <line x1="236" y1="94" x2="252" y2="82" opacity="0.5" />
          <line x1="248" y1="114" x2="268" y2="112" opacity="0.5" />
          <line x1="242" y1="132" x2="262" y2="140" opacity="0.5" />
          <line x1="220" y1="148" x2="232" y2="166" opacity="0.5" />
          <line x1="200" y1="154" x2="200" y2="172" opacity="0.5" />
          <line x1="182" y1="148" x2="170" y2="166" opacity="0.5" />
          <line x1="160" y1="132" x2="140" y2="140" opacity="0.5" />
          <line x1="152" y1="114" x2="132" y2="112" opacity="0.5" />
          <line x1="164" y1="94" x2="148" y2="82" opacity="0.5" />
          <line x1="182" y1="82" x2="170" y2="66" opacity="0.5" />
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
