import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import KashiExperience from "./KashiExperience";
import "./kashi.css";

export const metadata: Metadata = {
  title: "Kashi Vishwanath Temple",
  description:
    "Explore the history, sacred traditions, daily worship timings and visitor guidance for Kashi Vishwanath Temple in Varanasi.",
  alternates: { canonical: `${site.url}/kashi-vishwanath` },
  openGraph: {
    title: "Kashi Vishwanath Temple | Divine Banaras",
    description: "A guide to the history, worship and daily aarti at Kashi Vishwanath Temple.",
    url: `${site.url}/kashi-vishwanath`,
    siteName: site.name,
    type: "article",
    images: [{ url: `${site.url}/kashi-vishwanath-temple.jpg`, alt: "Kashi Vishwanath Temple" }],
  },
};

const aartis = [
  { name: "Mangala Aarti", time: "3:00–4:00 am", note: "Early morning worship" },
  { name: "Bhog Aarti", time: "11:15 am–12:20 pm", note: "Midday offering" },
  { name: "Sandhya / Sapta Rishi Aarti", time: "7:00–8:30 pm", note: "Evening worship" },
  { name: "Shringar-Bhog Aarti", time: "9:00–10:15 pm", note: "Adornment and offering" },
  { name: "Shayan Aarti", time: "10:30–11:00 pm", note: "Night prayer" },
];

export default function KashiVishwanathPage() {
  return (
    <KashiExperience>
      <div className="kv-content">
      <section className="kv-hero">
        <Image src="/kashi-vishwanath-temple.jpg" alt="Kashi Vishwanath Temple in Varanasi" fill priority sizes="100vw" className="kv-hero-image" />
        <div className="kv-hero-shade" aria-hidden="true" />
        <div className="kv-film-grain" aria-hidden="true" />
        <div className="container-page kv-hero-content">
          <p className="kv-kicker">The living heart of Kashi</p>
          <h1>Kashi Vishwanath</h1>
          <p className="kv-hero-copy">A timeless shrine to Shiva, where the ancient lanes of Varanasi open toward the Ganga.</p>
          <a className="kv-scroll" href="#story">Discover the temple <span aria-hidden="true">↓</span></a>
        </div>
        <div className="kv-hero-caption">Vishwanath Gali · Varanasi</div><span className="kv-frame-count" aria-hidden="true">KASHI · 25°18′ N / 83°00′ E</span>
      </section>

      <section className="kv-intro section" id="story">
        <div className="container-page kv-intro-grid">
          <div className="kv-section-label"><span className="kv-sun-mark" aria-hidden="true">✳</span><p className="eyebrow">A shrine through the centuries</p></div>
          <div>
            <h2 className="kv-display">Where Shiva is worshipped as <em>Vishwanath</em>, Lord of the Universe.</h2>
            <p className="kv-body">Set in the old city near the Ganga, Kashi Vishwanath is one of Hinduism’s most revered pilgrimage sites and one of the twelve Jyotirlingas associated with Lord Shiva. Pilgrims come for darshan, prayer and a connection to the sacred city of Kashi.</p>
          </div>
        </div>
      </section>

      <section className="kv-chapter-mark" aria-hidden="true"><span>01</span><i /><span>THE STORY OF KASHI</span></section>

      <section className="kv-history section">
        <div className="container-page kv-history-grid">
          <div className="kv-history-image-wrap">
            <Image src="/kashi.jpg" alt="The ghats and riverfront of Varanasi" fill sizes="(max-width: 768px) 100vw, 48vw" className="kv-history-image" />
            <span className="kv-image-note">Kashi · the city beside the Ganga</span>
          </div>
          <article className="kv-history-copy">
            <p className="eyebrow">History &amp; renewal</p>
            <h2 className="kv-heading">A place rebuilt.<br /><em>A faith uninterrupted.</em></h2>
            <p>The temple’s history reflects centuries of devotion and change. The present temple was built in 1780 by Maharani Ahilyabai Holkar. In 1839, Maharaja Ranjit Singh donated gold to cover two of its domes.</p>
            <p>Today, the shrine remains woven into everyday life in Varanasi. The Kashi Vishwanath Corridor creates a more open connection between the temple precinct and the riverfront, while the surrounding lanes retain the close, bustling character of the old city.</p>
            <a className="kv-text-link" href="https://shrikashivishwanath.org/mythology" target="_blank" rel="noreferrer">Temple history from the official portal <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="kv-chapter-mark" aria-hidden="true"><span>02</span><i /><span>THE LIVING TRADITION</span></section>

      <section className="kv-facts section">
        <div className="container-page">
          <div className="kv-facts-heading"><div><p className="eyebrow">Beyond the darshan</p><h2 className="kv-heading">A few things to know</h2></div><p className="kv-facts-aside">Small details that make the visit richer.</p></div>
          <div className="kv-facts-grid">
            <article className="kv-fact"><span className="kv-fact-symbol" aria-hidden="true">ॐ</span><h3>One of twelve Jyotirlingas</h3><p>Devotees revere Kashi Vishwanath as one of the twelve sacred Jyotirlinga shrines of Shiva.</p></article>
            <article className="kv-fact"><span className="kv-fact-symbol" aria-hidden="true">1780</span><h3>Rebuilt by Ahilyabai Holkar</h3><p>The present temple was built by the Maratha queen, Maharani Ahilyabai Holkar.</p></article>
            <article className="kv-fact"><span className="kv-fact-symbol" aria-hidden="true">Ganga</span><h3>Temple and river, joined</h3><p>The corridor links the temple precinct with the Ganga, bringing the river into the pilgrimage experience.</p></article>
            <article className="kv-fact"><span className="kv-fact-symbol" aria-hidden="true">1839</span><h3>Gold offered by Ranjit Singh</h3><p>Maharaja Ranjit Singh donated gold for two temple domes, a lasting royal offering.</p></article>
          </div>
        </div>
      </section>

      <section className="kv-aarti section" id="aarti">
        <div className="container-page kv-aarti-grid">
          <div className="kv-aarti-intro"><p className="eyebrow">The rhythm of worship</p><h2 className="kv-heading">A day shaped<br /><em>by prayer.</em></h2><p>Daily rituals mark the hours, from the stillness before dawn to the final prayer of night.</p><div className="kv-time-note">Timings can change on special days. Please confirm the current schedule with the temple before your visit.</div><a href="https://shrikashivishwanath.org/general/rituals" target="_blank" rel="noreferrer" className="kv-text-link">Check official ritual schedule <span aria-hidden="true">↗</span></a></div>
          <div className="kv-timeline" aria-label="Daily aarti schedule">
            {aartis.map((aarti, index) => <div className="kv-timeline-row" key={aarti.name} style={{ "--row": index } as React.CSSProperties}><span className="kv-timeline-dot" aria-hidden="true"/><div className="kv-event"><div className="kv-time">{aarti.time}</div><div className="kv-ritual"><h3>{aarti.name}</h3><p>{aarti.note}</p></div></div></div>)}
          </div>
        </div>
      </section>

      <section className="kv-chapter-mark" aria-hidden="true"><span>03</span><i /><span>THE HOURS OF WORSHIP</span></section>

      <section className="kv-sloka-section section">
        <div className="container-page kv-sloka-panel">
          <div><p className="eyebrow">A moment of devotion</p><h2 className="kv-heading">Listen to a Shiva sloka</h2><p className="kv-sloka-caption">Pause, breathe, and listen before your visit.</p></div>
          <div className="kv-audio-area"><audio id="kashi-sloka-audio" controls preload="none"><source src="/audio/kashi-vishwanath-sloka.aac" type="audio/aac" />Your browser does not support audio playback.</audio><span className="kv-audio-hint">Add your AAC audio at <strong>public/audio/kashi-vishwanath-sloka.aac</strong></span></div>
        </div>
      </section>

      <section className="kv-visit section">
        <div className="container-page kv-visit-grid"><div><p className="eyebrow">Before you go</p><h2 className="kv-heading">Make space for the moment.</h2></div><div className="kv-visit-notes"><p>Entry arrangements, security checks and rules for personal belongings can change. Check the official temple guidance before setting out, especially on festival days.</p><Link href="/places/kashi-vishwanath-temple" className="kv-text-link">Read visitor notes <span aria-hidden="true">→</span></Link></div></div>
      </section>

      <section className="kv-endcap"><div className="container-page kv-endcap-inner"><p>At the meeting of city and river, prayer becomes part of the day.</p><Link href="/contact" className="kv-contact-link">Plan your Kashi visit <span aria-hidden="true">→</span></Link></div></section>
      </div>
    </KashiExperience>
  );
}
