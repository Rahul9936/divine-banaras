"use client";

import { useEffect } from "react";
import Link from "next/link";

const experiences = [
  ["🪔", "Millions of Diyas", "Watch the ancient ghats come alive as countless earthen lamps create a mesmerizing golden horizon."],
  ["🌊", "Ganga Aarti", "Witness the divine ritual of lights as priests offer prayers to Maa Ganga beside the sacred river."],
  ["🎶", "Divine Sounds", "Bells, conch shells, mantras and devotional music fill the air throughout the ancient city."],
];

const timeline = [
  ["SUNSET", "The City Awakens", "As the sun dips below the horizon, the ghats begin preparing for an unforgettable evening."],
  ["EVENING", "The First Flame", "One diya becomes hundreds, then thousands, spreading light across the ancient ghats."],
  ["NIGHT", "A River of Light", "The Ganga reflects the glow of the city while prayers and music fill the night sky."],
];

const bajraInclusions: Array<{ icon: string; title: string; items: string[] }> = [
  { icon: "🚤", title: "Premium Bajra Boat", items: ["Exclusive Bajra boat with two western-toilet washrooms", "Comfortable seating for the illumination of all 84 ghats", "Music and sound system, plus live flute & tabla performance", "Scenic mid-Ganga views and onboard assistance"] },
  { icon: "📸", title: "Souvenirs & Memories", items: ["Professional photography throughout the Bajra ride", "A Rudraksha mala for every guest"] },
  { icon: "🍽️", title: "Live Snacks Onboard", items: ["Banarasi tamatar chaat, tikki chaat and golgappe", "Gulab jamun, special Banarasi chai and paan", "Mineral water and tissue papers"] },
  { icon: "🎙️", title: "Guided Experience", items: ["Two experienced guides and dedicated tour managers", "Live storytelling of all 84 ghats", "Insights into the history, culture and significance of Dev Deepawali"] },
];

export default function DevDiwaliExperience() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".dd-reveal").forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  return (
    <main className="dev-diwali-page">
      <section className="dd-hero">
        <div className="dd-glow" />
        <div className="dd-hero-content">
          <span className="dd-eyebrow">THE FESTIVAL OF LIGHTS · VARANASI</span>
          <h1>Dev<br /><span>Deepawali</span></h1>
          <p>When the Gods descend upon the sacred ghats and the Ganga glows with a thousand lights.</p>
          <a href="#experience" className="dd-cta">Discover the Celebration <b>↓</b></a>
        </div>
        {["diya-1", "diya-2", "diya-3"].map((name) => <div key={name} className={`diya ${name}`}><i /><b /></div>)}
        <div className="dd-river" />
        <div className="dd-scroll">SCROLL TO EXPLORE <i /></div>
      </section>

      <section className="dd-intro" id="experience">
        <SectionLabel number="01" text="THE STORY" />
        <div className="dd-intro-grid">
          <div className="dd-reveal"><Kicker>A CELEBRATION LIKE NO OTHER</Kicker><h2>A night when <em>Varanasi</em> becomes a galaxy.</h2></div>
          <div className="dd-copy dd-reveal"><p>Dev Deepawali is one of the most spectacular celebrations in Varanasi. On this sacred night, the ghats of the Ganga are illuminated with countless diyas, transforming the ancient city into a breathtaking sea of golden light.</p><p>From the chants echoing across the river to the glow of thousands of lamps floating upon the Ganga, every moment feels timeless.</p></div>
        </div>
        <div className="dd-moments dd-reveal">
          <div><span>🕯️</span><h3>Kartik Purnima</h3><p>The celebration is held on the sacred full-moon night, when devotees honour the descent of the gods to Kashi.</p></div>
          <div><span>⛵</span><h3>By the Ganga</h3><p>A river-view boat ride offers a quiet, unforgettable perspective of the illuminated ghats.</p></div>
          <div><span>🙏</span><h3>Temple Darshan</h3><p>Begin with blessings at Kashi Vishwanath and Kal Bhairav before the evening celebrations unfold.</p></div>
        </div>
        <div className="dd-stats dd-reveal"><Stat value="84" label="Ghats of Varanasi" /><Stat value="1M" label="Diyas illuminating the city" /><Stat value="1" label="Sacred Ganga" /><Stat value="∞" label="Moments to remember" /></div>
      </section>

      <section className="dd-experience">
        <SectionLabel number="02" text="THE EXPERIENCE" />
        <div className="dd-reveal"><Kicker>FEEL THE MAGIC</Kicker><h2>More than a festival.<br /><span>It&apos;s an experience.</span></h2></div>
        <div className="dd-cards">{experiences.map(([icon, title, text], index) => <article className="dd-card dd-reveal" key={title}><small>0{index + 1}</small><div>{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="dd-ghats"><div className="dd-ghats-content dd-reveal"><Kicker>THE SACRED GHATS</Kicker><h2>Every ghat tells<br />a <span>story.</span></h2><p>As darkness falls over Varanasi, the steps leading to the Ganga become illuminated pathways of devotion. The reflection of thousands of diyas dances upon the river while the skyline glows against the night.</p><Link href="/tours" className="dd-outline">Explore Varanasi <b>→</b></Link></div></section>

      <section className="dd-event" id="event-details">
        <div className="dd-event-intro dd-reveal"><Kicker>DEV DIWALI SPECIAL EVENT · VARANASI</Kicker><h2>An evening aboard<br /><em>the sacred Ganga.</em></h2><p>Be part of a grand spiritual celebration at Kashi with an exclusive Dev Deepawali Bajra Boat Experience.</p></div>
        <div className="dd-event-facts dd-reveal"><div><small>EVENT RATE</small><strong>₹7,999</strong><span>per person</span></div><div><small>EXPERIENCE</small><strong>200</strong><span>guests onboard</span></div><div><small>TRAVEL PARTNERS</small><strong>₹1,000</strong><span>TAC per confirmed booking</span></div></div>
        <div className="dd-inclusions">{bajraInclusions.map(({ icon, title, items }) => <article className="dd-inclusion dd-reveal" key={title}><span className="dd-inclusion-icon">{icon}</span><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="dd-timeline"><SectionLabel number="03" text="THE NIGHT" /><h2 className="dd-reveal">From sunset<br /><em>to starlight.</em></h2><div className="timeline">{timeline.map(([time, title, text]) => <article className="timeline-item dd-reveal" key={time}><small>{time}</small><i /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

      <section className="dd-plan dd-reveal">
        <div><Kicker>PLAN YOUR EVENING</Kicker><h2>Arrive with ease.<br /><em>Leave with wonder.</em></h2></div>
        <div className="dd-plan-list"><p><b>Best view</b><span>Ganga boat ride near Dashashwamedh Ghat</span></p><p><b>Ideal arrival</b><span>Before sunset, for temple darshan and a relaxed start</span></p><p><b>What to carry</b><span>Comfortable footwear, a light layer and your camera</span></p></div>
      </section>

      <section className="dd-final"><div className="dd-final-content dd-reveal"><Kicker>COME EXPERIENCE THE MAGIC</Kicker><h2>See Varanasi<br /><span>in a different light.</span></h2><p>Some celebrations are watched.<br />Dev Deepawali is felt.</p><Link href="/contact" className="dd-cta">Plan Your Visit <b>→</b></Link></div></section>
    </main>
  );
}

function SectionLabel({ number, text }: { number: string; text: string }) { return <div className="dd-section-label"><span>{number}</span><i /><span>{text}</span></div>; }
function Kicker({ children }: { children: React.ReactNode }) { return <p className="dd-kicker">{children}</p>; }
function Stat({ value, label }: { value: string; label: string }) { return <div><strong>{value}</strong><span>{label}</span></div>; }
