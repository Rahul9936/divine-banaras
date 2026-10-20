"use client";
/* eslint-disable @next/next/no-img-element -- static export serves pre-compressed WebP as-is */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { amenities, homestay, houseRules, nearby, photo, rooms, type RoomId } from "@/data/homestay";

const FlatTour3D = dynamic(() => import("./FlatTour3D"), {
  ssr: false,
  loading: () => <TourLoading />,
});

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const waLink = (text: string) => `https://wa.me/${homestay.whatsapp}?text=${encodeURIComponent(text)}`;
const tourOrder: RoomId[] = ["living", "bedroom1", "bedroom2", "kitchen", "dining", "bath1", "bath2", "entrance", "balcony"];

const galleryTabs: Array<{ label: string; rooms: RoomId[] }> = [
  { label: "All", rooms: tourOrder },
  { label: "Living", rooms: ["living"] },
  { label: "Bedrooms", rooms: ["bedroom1", "bedroom2"] },
  { label: "Kitchen & Dining", rooms: ["kitchen", "dining"] },
  { label: "Bathrooms", rooms: ["bath1", "bath2", "entrance"] },
  { label: "Temple View", rooms: ["balcony"] },
];

export default function HomestayExperience() {
  useReveal();
  const [lightbox, setLightbox] = useState<{ list: string[]; index: number } | null>(null);

  return (
    <div className="bg-cream">
      <Hero />
      <TourSection onOpenPhotos={(list, index) => setLightbox({ list, index })} />
      <Amenities />
      <Gallery onOpen={(list, index) => setLightbox({ list, index })} />
      <Videos />
      <Location />
      <Booking />
      {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} onIndex={(index) => setLightbox({ ...lightbox, index })} />}
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative overflow-hidden bg-ghat-gradient text-cream">
      <div className="hs-glow pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-marigold/30 blur-3xl" />
      <div className="hs-glow pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-saffron/30 blur-3xl [animation-delay:2s]" />
      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <div className="hs-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-marigold/50 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-marigold">
            <span className="h-2 w-2 animate-pulse rounded-full bg-marigold" /> Newly launched
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-tight sm:text-6xl">
            Divine <span className="text-marigold">Home Stay</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-cream/85">
            A private, fully furnished 2BHK near BHU — with the shikhara of the Shri Vishwanath Temple visible right from your balcony.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {["2 King-size Beds", "AC in both rooms", "Kitchen", "Free WiFi", "Geyser", "RO Water", "Parking", "Lift & Power Backup"].map((t) => (
              <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-cream/90 ring-1 ring-white/15">{t}</span>
            ))}
          </div>

          <div className="mt-8 flex items-end gap-3">
            <span className="font-display text-5xl font-bold text-marigold">{inr(homestay.pricePerNight)}</span>
            <span className="pb-2 text-cream/80">/ night · entire flat · up to {homestay.maxGuests} guests</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink("Namaste! I'd like to book Divine Home Stay.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              Book on WhatsApp
            </a>
            <a href={homestay.phoneHref} className="btn border border-white/40 text-cream hover:bg-white/10 focus:ring-white">
              Call {homestay.phone}
            </a>
            <a href="#tour-3d" className="btn text-marigold underline-offset-4 hover:underline focus:ring-marigold">
              Explore in 3D ↓
            </a>
          </div>
        </div>

        <div className="hs-rise relative mx-auto w-full max-w-[300px] [animation-delay:200ms]">
          <div className="hs-float relative aspect-[9/16] overflow-hidden rounded-[2.5rem] border-[10px] border-ink/80 bg-ink shadow-2xl ring-1 ring-marigold/40">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/homestay/tour.mp4"
              poster="/homestay/tour-poster.webp"
              autoPlay
              muted={muted}
              loop
              playsInline
            />
            <button
              type="button"
              onClick={() => {
                setMuted((m) => !m);
                videoRef.current?.play();
              }}
              className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/80"
            >
              {muted ? "🔇 Tap for sound" : "🔊 Sound on"}
            </button>
          </div>
          <img src="/homestay/logo.png" alt="Divine Home Stay logo" className="absolute -left-14 top-10 z-10 hidden w-28 -rotate-6 rounded-2xl shadow-2xl ring-4 ring-white/20 sm:block" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- 3D tour ---------------- */

function TourSection({ onOpenPhotos }: { onOpenPhotos: (list: string[], index: number) => void }) {
  const [selected, setSelected] = useState<RoomId | null>(null);
  const [touring, setTouring] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [mount, setMount] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Only download the 3D bundle when the section approaches the viewport.
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setWebgl(false);
    }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setMount(true), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => setPhotoIdx(0), [selected]);

  useEffect(() => {
    if (!touring) return;
    let i = selected ? Math.max(0, tourOrder.indexOf(selected)) : -1;
    const step = () => {
      i = (i + 1) % tourOrder.length;
      setSelected(tourOrder[i]);
    };
    if (!selected) step();
    const t = setInterval(step, 5000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only when touring toggles
  }, [touring]);

  const pick = (id: RoomId | null) => {
    setTouring(false);
    setSelected(id);
  };

  const room = rooms.find((r) => r.id === selected);

  return (
    <section id="tour-3d" ref={sectionRef} className="section scroll-mt-20">
      <div className="container-page">
        <div className="hs-reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Interactive 3D tour</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">Step inside the flat</h2>
          <p className="mt-4 text-ink/70">
            Drag to rotate the 3D model and tap any room to fly in and see real photos. You can also press <strong>Guided tour</strong> to go through every room.
          </p>
        </div>

        <div className="hs-reveal mt-10 grid gap-6 lg:grid-cols-5">
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-maroon/10 bg-cream shadow-card sm:h-[520px] lg:col-span-3">
            {webgl ? (
              mount ? <FlatTour3D selected={selected} onSelect={pick} /> : <TourLoading />
            ) : (
              <img src={photo("living-1")} alt="Living room" className="h-full w-full object-cover" />
            )}
            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-maroon shadow">
              {selected ? "Tap outside a room to zoom out" : "Drag to rotate · tap a room"}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {selected && (
                <button type="button" onClick={() => pick(null)} className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-maroon shadow hover:bg-white">
                  ⤢ Whole flat
                </button>
              )}
              <button
                type="button"
                onClick={() => setTouring((t) => !t)}
                className={`rounded-full px-4 py-2 text-xs font-semibold shadow ${touring ? "bg-maroon text-white" : "bg-saffron text-white hover:bg-saffron-dark"}`}
              >
                {touring ? "❚❚ Pause tour" : "▶ Guided tour"}
              </button>
            </div>
          </div>

          <aside className="flex flex-col rounded-3xl border border-maroon/10 bg-white p-6 shadow-card lg:col-span-2">
            {room ? (
              <div key={room.id} className="hs-fade flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">{room.icon} Room {tourOrder.indexOf(room.id) + 1} of {tourOrder.length}</p>
                  <div className="flex gap-1">
                    {[-1, 1].map((d) => (
                      <button
                        key={d}
                        type="button"
                        aria-label={d < 0 ? "Previous room" : "Next room"}
                        onClick={() => pick(tourOrder[(tourOrder.indexOf(room.id) + d + tourOrder.length) % tourOrder.length])}
                        className="h-8 w-8 rounded-full border border-maroon/15 text-maroon transition hover:border-saffron hover:bg-saffron hover:text-white"
                      >
                        {d < 0 ? "‹" : "›"}
                      </button>
                    ))}
                  </div>
                </div>
                <h3 className="mt-2 font-display text-3xl font-bold text-maroon">{room.name}</h3>
                <p className="mt-2 text-sm text-ink/70">{room.blurb}</p>
                <button
                  type="button"
                  onClick={() => onOpenPhotos(room.photos, photoIdx)}
                  className="group relative mt-4 aspect-[4/3] overflow-hidden rounded-2xl bg-sand"
                >
                  <img key={room.photos[photoIdx]} src={photo(room.photos[photoIdx])} alt={room.name} className="hs-fade h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[11px] text-white">⤢ {photoIdx + 1}/{room.photos.length}</span>
                </button>
                {room.photos.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {room.photos.map((p, i) => (
                      <button key={p} type="button" onClick={() => setPhotoIdx(i)} className={`h-14 w-16 shrink-0 overflow-hidden rounded-lg ring-2 transition ${i === photoIdx ? "ring-saffron" : "ring-transparent opacity-70 hover:opacity-100"}`}>
                        <img src={photo(p, true)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {room.features.map((f) => (
                    <li key={f} className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-maroon">✓ {f}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-1 flex-col">
                <p className="eyebrow">The layout</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-maroon">2BHK · 1 complete flat</h3>
                <p className="mt-2 text-sm text-ink/70">
                  The whole flat is yours: two bedrooms with king-size beds, two bathrooms, living and dining rooms, a working kitchen and a balcony that looks out on the temple.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {tourOrder.map((id) => {
                    const r = rooms.find((x) => x.id === id)!;
                    return (
                      <button key={id} type="button" onClick={() => pick(id)} className="flex items-center gap-2 rounded-xl border border-maroon/10 px-3 py-2.5 text-left text-sm font-medium text-ink/80 transition hover:-translate-y-0.5 hover:border-saffron hover:text-saffron">
                        <span aria-hidden="true">{r.icon}</span> {r.name.replace(/ —.*$/, "")}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
        <p className="mt-3 text-center text-xs text-ink/50">The 3D model is an illustration of the layout and is not drawn to scale. See the photos for the real rooms.</p>
      </div>
    </section>
  );
}

function TourLoading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-sand/60 text-maroon">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-saffron/30 border-t-saffron" />
      <p className="text-sm font-medium">Building your 3D tour…</p>
    </div>
  );
}

/* ---------------- Amenities ---------------- */

function Amenities() {
  return (
    <section className="section bg-sand/60">
      <div className="container-page">
        <div className="hs-reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Amenities</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">Everything you need, like home</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a, i) => (
            <div
              key={a.title}
              className="hs-reveal group rounded-2xl border border-maroon/10 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-soft"
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sunrise-gradient text-2xl shadow-soft transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                {a.icon}
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-maroon">{a.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */

function Gallery({ onOpen }: { onOpen: (list: string[], index: number) => void }) {
  const [tab, setTab] = useState(0);
  const list = useMemo(
    () => galleryTabs[tab].rooms.flatMap((id) => rooms.find((r) => r.id === id)!.photos),
    [tab],
  );

  return (
    <section className="section">
      <div className="container-page">
        <div className="hs-reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Photo gallery</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">Take a closer look</h2>
        </div>
        <div className="hs-reveal mt-8 flex flex-wrap justify-center gap-2">
          {galleryTabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setTab(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${i === tab ? "bg-maroon text-white shadow-soft" : "bg-white text-ink/70 ring-1 ring-maroon/10 hover:text-saffron"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div key={tab} className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {list.map((p, i) => (
            <button
              key={p}
              type="button"
              onClick={() => onOpen(list, i)}
              className="hs-fade group mb-3 block w-full overflow-hidden rounded-2xl bg-sand"
              style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
            >
              <img src={photo(p, true)} alt={p.replace(/-\d+$/, "")} loading="lazy" className="w-full transition-transform duration-500 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lightbox({ list, index, onClose, onIndex }: { list: string[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const go = useCallback((d: number) => onIndex((index + d + list.length) % list.length), [index, list.length, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  const touchX = useRef<number | null>(null);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      role="dialog"
      aria-modal="true"
    >
      <img key={list[index]} src={photo(list[index])} alt="" className="hs-fade max-h-[85vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
      <button type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">×</button>
      {list.length > 1 && (
        <>
          <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 h-12 w-12 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">‹</button>
          <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 h-12 w-12 rounded-full bg-white/10 text-2xl text-white hover:bg-white/20">›</button>
          <p className="absolute bottom-4 text-sm text-white/70">{index + 1} / {list.length}</p>
        </>
      )}
    </div>
  );
}

/* ---------------- Videos ---------------- */

function Videos() {
  const items = [
    { src: "/homestay/tour.mp4", poster: "/homestay/tour-poster.webp", title: "Video walkthrough", text: "See every corner of the flat, plus the parking and the temple lit up at night." },
    { src: "/homestay/directions.mp4", poster: "/homestay/directions-poster.webp", title: "How to reach us", text: "Directions turn by turn, from the main road to the door of Radhey Shree Apartment." },
  ];
  return (
    <section className="section bg-ghat-gradient text-cream">
      <div className="container-page">
        <div className="hs-reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow !text-marigold">Watch</p>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">See it, then find it</h2>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {items.map((v) => (
            <div key={v.src} className="hs-reveal flex flex-col items-center text-center">
              <div className="aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-[2rem] border-8 border-ink/70 bg-ink shadow-2xl">
                <video className="h-full w-full object-cover" src={v.src} poster={v.poster} controls playsInline preload="none" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold text-marigold">{v.title}</h3>
              <p className="mt-1 max-w-xs text-sm text-cream/80">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Location ---------------- */

function Location() {
  return (
    <section className="section">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <div className="hs-reveal relative overflow-hidden rounded-3xl shadow-card">
          <img src={photo("balcony-1")} alt="BHU Shri Vishwanath Temple seen from the balcony" className="hs-kenburns aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-marigold">From our balcony</p>
            <p className="font-display text-2xl font-bold">BHU Shri Vishwanath Temple 🛕</p>
          </div>
        </div>
        <div className="hs-reveal">
          <p className="eyebrow">Location</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">Wake up to the temple</h2>
          <p className="mt-4 text-ink/70">
            We&apos;re in a quiet residential area near Banaras Hindu University, close enough to the ghats and the big temples while staying away from the old city&apos;s crowds.
          </p>
          <div className="mt-6 rounded-2xl border border-maroon/10 bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-maroon">📍 {homestay.address}</p>
            <a href={homestay.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-saffron hover:underline">
              Open in Google Maps →
            </a>
          </div>
          <ul className="mt-6 divide-y divide-maroon/10">
            {nearby.map((n) => (
              <li key={n.place} className="flex items-center justify-between py-3 text-sm">
                <span className="text-ink/80">{n.place}</span>
                <span className="font-semibold text-maroon">{n.distance}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Booking ---------------- */

function Booking() {
  const today = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const n = Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000);
    return n > 0 ? n : 0;
  }, [checkIn, checkOut]);

  const message = [
    "Namaste! I'd like to book Divine Home Stay.",
    name && `Name: ${name}`,
    checkIn && `Check-in: ${checkIn}`,
    checkOut && `Check-out: ${checkOut}`,
    `Guests: ${guests}`,
    nights > 0 && `Estimated: ${nights} night(s) × ${inr(homestay.pricePerNight)} = ${inr(nights * homestay.pricePerNight)}`,
  ].filter(Boolean).join("\n");

  return (
    <section id="book" className="section bg-sand/60">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div className="hs-reveal">
          <p className="eyebrow">Book your stay</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-maroon sm:text-5xl">{inr(homestay.pricePerNight)} <span className="text-2xl font-semibold text-ink/60">/ night</span></h2>
          <p className="mt-4 text-ink/70">
            You get the entire 2BHK flat for up to {homestay.maxGuests} guests. Send us your dates on WhatsApp and we&apos;ll confirm availability straight away. We can also arrange darshan, boat rides and cabs for your yatra.
          </p>
          <h3 className="mt-8 font-display text-2xl font-bold text-maroon">House rules</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {houseRules.map((r) => (
              <li key={r} className="flex gap-2"><span className="text-saffron">✦</span> {r}</li>
            ))}
          </ul>
        </div>

        <form
          className="hs-reveal rounded-3xl border border-maroon/10 bg-white p-6 shadow-card sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(waLink(message), "_blank", "noopener,noreferrer");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-ink/80 sm:col-span-2">
              Your name
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-maroon/15 px-4 py-3 focus:border-saffron focus:outline-none" placeholder="Full name" />
            </label>
            <label className="text-sm font-medium text-ink/80">
              Check-in
              <input type="date" required min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="mt-1 w-full rounded-xl border border-maroon/15 px-4 py-3 focus:border-saffron focus:outline-none" />
            </label>
            <label className="text-sm font-medium text-ink/80">
              Check-out
              <input type="date" required min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="mt-1 w-full rounded-xl border border-maroon/15 px-4 py-3 focus:border-saffron focus:outline-none" />
            </label>
            <label className="text-sm font-medium text-ink/80 sm:col-span-2">
              Guests
              <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-maroon/15 px-4 py-3 focus:border-saffron focus:outline-none">
                {Array.from({ length: homestay.maxGuests }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>{g} guest{g > 1 ? "s" : ""}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 rounded-2xl bg-cream p-4 text-sm">
            <div className="flex justify-between text-ink/70">
              <span>{inr(homestay.pricePerNight)} × {nights || "–"} night{nights === 1 ? "" : "s"}</span>
              <span className="font-display text-2xl font-bold text-maroon">{nights ? inr(nights * homestay.pricePerNight) : "—"}</span>
            </div>
            <p className="mt-1 text-xs text-ink/50">Final price is confirmed on WhatsApp.</p>
          </div>

          <button type="submit" className="btn-whatsapp mt-6 w-full">Send booking request on WhatsApp</button>
          <a href={homestay.phoneHref} className="btn-outline mt-3 w-full">Or call {homestay.phone}</a>
        </form>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".hs-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
