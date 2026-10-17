import Image from "next/image";

interface HeroCarouselProps {
  onSelectDest?: (destId: string) => void;
}

const featuredJourney = {
  title: "Dev Diwali Varanasi",
  subtitle: "Experience the sacred ghats illuminated by countless diyas.",
  image: "/dev-diwali.jpg",
  destId: "dev-diwali",
  badge: "FESTIVAL OF LIGHTS",
  location: "VARANASI • DEV DEEPAWALI",
};

// The component name remains unchanged to preserve the existing page structure.
export default function HeroCarousel({ onSelectDest }: HeroCarouselProps) {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[28px] bg-[#081019] shadow-2xl ring-1 ring-white/10 sm:h-[500px] lg:h-[560px]">
      <Image
        src={featuredJourney.image}
        alt={featuredJourney.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05090d] via-[#071019]/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05090d]/65 via-transparent to-transparent" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="absolute left-5 top-5 z-10 flex items-center gap-2 sm:left-7 sm:top-7">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-black/30 text-sm text-[#F3C623] backdrop-blur-md">ॐ</span>
        <div className="hidden sm:block">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">Divine Banaras</p>
          <p className="text-[8px] uppercase tracking-[0.2em] text-[#D4AF37]">Sacred Journeys</p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-8">
        <div className="max-w-[90%] sm:max-w-[85%]">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-black/35 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F3C623] shadow-[0_0_8px_#F3C623]" />
            <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#F3C623]">{featuredJourney.badge}</span>
          </div>
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.28em] text-white/60">{featuredJourney.location}</p>
          <h3 className="font-display text-2xl font-extrabold leading-tight tracking-wide text-white drop-shadow-2xl sm:text-3xl lg:text-4xl">{featuredJourney.title}</h3>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-white/75 sm:text-sm">{featuredJourney.subtitle}</p>
          <button type="button" onClick={() => onSelectDest?.(featuredJourney.destId)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3C623] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-[#081019] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#F3C623] focus:ring-offset-2 focus:ring-offset-[#081019]">
            Discover Dev Diwali
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
