
"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import "./DevDiwaliExperience.css";

const fireworks = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${8 + ((i * 37) % 85)}%`,
  y: `${12 + ((i * 29) % 43)}%`,
  delay: `${(i % 6) * 0.7}s`,
  color: ["#ffd166", "#ff7b54", "#f9a8d4", "#8be9fd"][i % 4],
}));

const devDeepawaliMessage =
  "Namaste! I would like to enquire about the Dev Deepawali package in Varanasi.";

const experiences = [
  {
    icon: "🚤",
    title: "Premium Bajra Boat",
    description:
      "Exclusive Bajra boat with two washrooms featuring Western toilets, comfortable seating, a well-equipped music and sound system, and onboard assistance.",
  },
  {
    icon: "🎶",
    title: "Live Music & Performances",
    description:
      "Enjoy live flute and tabla performances in a spiritual and lively atmosphere as you witness the illuminated ghats.",
  },
  {
    icon: "📸",
    title: "Photography & Souvenirs",
    description:
      "Professional photography throughout the Bajra ride and a Rudraksha mala as a special souvenir for every guest.",
  },
  {
    icon: "🍽️",
    title: "Authentic Banarasi Treats",
    description:
      "Fresh Tamatar Chaat, Tikki Chaat, Golgappe, Gulab Jamun, special Banarasi Chai, Banarasi Paan, mineral water and tissues.",
  },
  {
    icon: "🪔",
    title: "Guided Ghat Experience",
    description:
      "Two experienced onboard guides sharing live narration and stories about the history, culture and significance of Dev Deepawali and the 84 ghats.",
  },
  {
    icon: "🤝",
    title: "Dedicated Tour Management",
    description:
      "Dedicated tour managers for coordination, with assistance throughout the experience for a smooth and memorable celebration.",
  },
];

export default function DevDiwaliExperience() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(max > 0 ? window.scrollY / max : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const fireworksVisible = progress > 0.18;

  return (
    <main className="devdiwali">
      {/* Scene 1: Cinematic Varanasi ghats */}
      {/* <section className="festival-journey">
        <div className="ghat-scene">
          <div className="scene-image" />
          <div className="river-glow" />

          <div className="floating-particles" aria-hidden="true">
            {Array.from({ length: 32 }, (_, i) => (
              <i
                key={i}
                style={{
                  left: `${(i * 31) % 100}%`,
                  top: `${(i * 43) % 90}%`,
                  animationDelay: `${(i % 8) * -0.7}s`,
                }}
              />
            ))}
          </div>

          <div
            className={`fireworks ${fireworksVisible ? "active" : ""}`}
            aria-hidden="true"
          >
            {fireworks.map((firework) => (
              <i
                key={firework.id}
                className="firework"
                style={{
                  left: firework.x,
                  top: firework.y,
                  animationDelay: firework.delay,
                  "--burst-color": firework.color,
                }}
              />
            ))}
          </div>

          <div className="ghat-content">
            <p className="eyebrow">
              THE ETERNAL CITY · VARANASI · WHEN HEAVEN MEETS EARTH
            </p>

            <h1>
              Dev
              <br />
              <span>Deepawali</span>
            </h1>

            <p className="hero-subtitle">
              One river. Countless lights. An unforgettable night.
            </p>

            <div className="golden-rule" />

            <p className="hero-description">
              Witness the sacred ghats awaken in a celebration
              of light, devotion and timeless beauty. Above the ancient ghats, the night comes alive. A breathtaking symphony of light dances across the sacred waters of the Ganges.
            </p>

          </div>

          <div className="scene-caption">
            <span>THE GANGES · AFTER DUSK</span>
            <span>01 — 03</span>
          </div>

          <a href="#celebration" className="scroll-cue">
            <span>SCROLL TO WITNESS THE MAGIC</span>
            <i />
          </a>
        </div>
      </section> */}

      {/* Scene 2: Fireworks over the Ganges */}
      <section className="celebration" id="celebration">
        <div className="celebration-backdrop" />

        <div className="celebration-stars" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <i
              key={i}
              className="celebration-firework"
              style={{
                left: `${6 + ((i * 41) % 88)}%`,
                top: `${8 + ((i * 23) % 48)}%`,
                animationDelay: `${(i % 5) * 0.65}s`,
                "--burst-color":
                  ["#ffd166", "#ff7b54", "#f9a8d4", "#8be9fd"][
                    i % 4
                  ],
              }}
            />
          ))}
        </div>

        <div className="celebration-content">
          <p className="eyebrow">WHEN HEAVEN MEETS EARTH</p>

          <h1>
              Dev
              <br />
              <span>Deepawali</span>
        </h1>

          <h2>
            A sky full of
            <br />
            <span>wonder.</span>
          </h2>

          <p>
            Above the ancient ghats, the night comes alive.
            A breathtaking symphony of light dances across
            the sacred waters of the Ganges.
          </p>

          <div className="celebration-divider">✦</div>

          <p className="closing-line">
            One river. Countless lights. An unforgettable night.
          </p>

          <a href="#package" className="gold-button">
            Experience Dev Deepawali <span>↓</span>
          </a>
        </div>

        <div className="diya-row" aria-hidden="true">
          {Array.from({ length: 21 }, (_, i) => (
            <span className="diya" key={i}>
              <i />
            </span>
          ))}
        </div>
      </section>

      {/* Scene 3: Travel Kiaa exclusive package */}
      <section className="package-section" id="package">
        <div className="package-orb package-orb-one" />
        <div className="package-orb package-orb-two" />

        <div className="package-container">
          <header className="package-heading">
            <p className="eyebrow">
              DIVINE BANARAS PRESENTS
            </p>

            <h2>
              Your Seat to
              <br />
              <span>the Divine.</span>
            </h2>

            <p className="package-intro">
              Celebrate the magic of Kashi from the sacred waters
              of the Ganga. An exclusive Bajra boat journey
              combining spiritual traditions, authentic Banarasi
              flavours, live performances and unforgettable views.
            </p>
          </header>

          {/* Package price card */}
          <div className="package-price-card">
            <div className="price-card-copy">
              <span className="price-kicker">
                EXCLUSIVE DEV DEEPAWALI EXPERIENCE
              </span>

              <h3>Bajra Boat Experience</h3>

              <p>
                Witness the grand illumination of Varanasi
                84 ghats from the river.
              </p>

              <div className="package-tags">
                <span>🪔 Spiritual Journey</span>
                <span>🎶 Live Entertainment</span>
                <span>🍵 Banarasi Hospitality</span>
              </div>
            </div>

            <div className="price-card-value">
              <span className="price-label">EVENT RATE</span>

              <p className="package-price">
                <span>₹</span>7,999
              </p>

              <span className="price-per-person">
                PER PERSON
              </span>

              <div className="price-separator" />

              <span className="capacity-label">
                EXCLUSIVE CAPACITY
              </span>

              <p className="capacity-value">200 PAX</p>
            </div>
          </div>

          {/* Package inclusions */}
          <div className="inclusions-heading">
            <p className="eyebrow">THOUGHTFULLY CURATED FOR YOU</p>

            <h3>
              Every Moment, <span>Included.</span>
            </h3>

            <p>
              More than a boat ride — a complete celebration
              of the spirit and culture of Kashi.
            </p>
          </div>

          <div className="inclusions-grid">
            {experiences.map((experience, index) => (
              <article
                className="inclusion-card"
                key={experience.title}
                style={{ "--card-index": index }}
              >
                <div className="inclusion-icon">
                  {experience.icon}
                </div>

                <div className="inclusion-number">
                  0{index + 1}
                </div>

                <h4>{experience.title}</h4>

                <p>{experience.description}</p>

                <div className="inclusion-card-rule" />
              </article>
            ))}
          </div>

          {/* Detailed food menu */}
          <div className="food-experience">
            <div className="food-copy">
              <p className="eyebrow">A TASTE OF BANARAS</p>

              <h3>
                Local Flavours.
                <br />
                <span>Timeless Traditions.</span>
              </h3>

              <p>
                Savour beloved Banarasi street-food favourites
                and traditional refreshments while the ghats
                glow around you.
              </p>
            </div>

            <div className="food-menu">
              {[
                ["01", "Tamatar Chaat & Tikki Chaat"],
                ["02", "Golgappe / Pani Puri"],
                ["03", "Gulab Jamun"],
                ["04", "Special Banarasi Chai"],
                ["05", "Special Banarasi Paan"],
                ["06", "Mineral Water & Tissues"],
              ].map(([number, item]) => (
                <div className="food-menu-item" key={number}>
                  <span>{number}</span>
                  <p>{item}</p>
                  <span className="food-check">✦</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guided experience */}
          <div className="guided-experience">
            <div className="guided-symbol">ॐ</div>

            <div className="guided-copy">
              <p className="eyebrow">THE STORIES OF KASHI</p>

              <h3>
                Experience the Soul
                <br />
                of Dev Deepawali.
              </h3>

              <p>
                With two experienced guides onboard, discover
                the history, legends, culture and spiritual
                significance of the 84 ghats through live
                narration and storytelling. Dedicated tour
                managers coordinate the experience, with
                onboard assistance throughout the journey.
              </p>
            </div>

            <div className="guided-stats">
              <div>
                <strong>02</strong>
                <span>Experienced Guides</span>
              </div>

              <div>
                <strong>84</strong>
                <span>Ghats to Discover</span>
              </div>

              <div>
                <strong>01</strong>
                <span>Unforgettable Journey</span>
              </div>
            </div>
          </div>

          {/* Closing call to action */}
          <div className="package-cta">
            <span className="cta-diya">🪔</span>

            <p className="eyebrow">
              AN INVITATION TO WITNESS THE DIVINE
            </p>

            <h3>
              Be Part of the
              <br />
              <span>Grand Celebration.</span>
            </h3>

            <p>
              Join DIVINE BANARAS for an extraordinary Dev
              Deepawali Bajra Boat experience in Varanasi.
            </p>

            <a
              href={whatsappLink(devDeepawaliMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button"
            >
              Enquire About the Package <span>↗</span>
            </a>

            <p className="cta-note">
              Event rate: ₹7,999 per person
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}