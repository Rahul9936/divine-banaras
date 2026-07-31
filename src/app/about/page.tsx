import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Divine Banaras",
  description:
    "Divine Banaras is a Varanasi-based spiritual travel agency crafting soulful yatras across Kashi, Ayodhya, Nepal and the Buddhist circuit.",
  keywords: [
    "spiritual travel agency",
    "Varanasi travel",
    "Ayodhya pilgrimage",
    "Bodhgaya tours",
    "Buddhist circuit",
  ],
  openGraph: {
    title: "About Us | Divine Banaras",
    description:
      "Divine Banaras is a Varanasi-based spiritual travel agency crafting soulful yatras across Kashi, Ayodhya, Nepal and the Buddhist circuit.",
    url: `${site.url}/about`,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: `${site.url}/banner.png`,
        alt: "Divine Banaras spiritual travel agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Divine Banaras",
    description:
      "Divine Banaras is a Varanasi-based spiritual travel agency crafting soulful yatras across Kashi, Ayodhya, Nepal and the Buddhist circuit.",
    images: [`${site.url}/banner.png`],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="About Divine Banaras"
        subtitle="Rooted in Kashi, devoted to your journey."
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="space-y-5 text-ink/80">
            <p className="text-lg leading-relaxed">
              Divine Banaras was born on the ghats of Varanasi, out of a simple
              wish — to help pilgrims experience the sacred heart of Bharat
              without worry. We are a small, locally-rooted team that lives and
              breathes Kashi, and we treat every traveller as a guest of the
              gods.
            </p>
            <p className="leading-relaxed">
              From the first sermon of the Buddha at Sarnath, to the Jyotirlinga
              of Kashi Vishwanath, to Ram Lalla&rsquo;s darshan at Ayodhya Dham
              and the sacred Pashupatinath in Nepal — we design journeys that are
              spiritually rich, comfortable, and completely hassle-free.
            </p>
            <p className="leading-relaxed">
              Whether you have two days or a full week, whether you seek a quiet
              boat ride at dawn or the grand Divine Triangle across two nations,
              our team handles every detail — darshan, aarti, stays, transport
              and a knowledgeable guide by your side.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <Value title="Our Mission" text="Make sacred travel effortless, so you can focus entirely on the divine." />
              <Value title="Our Promise" text="Honest pricing, clean stays, and support at every step of your yatra." />
              <Value title="Our Roots" text="Proudly based in Varanasi with deep local knowledge and relationships." />
            </div>

            <div className="pt-6">
              <Link href="/contact" className="btn-primary">
                Start planning with us
              </Link>
            </div>
          </div>

          <aside className="rounded-2xl bg-sand/60 p-8">
            <h2 className="font-display text-2xl font-700 text-maroon">
              Why pilgrims choose us
            </h2>
            <ul className="mt-5 space-y-4">
              {[
                "Deep local expertise in Kashi & the surrounding sacred sites",
                "Assisted darshan and aarti arrangements",
                "Transparent, all-inclusive pricing",
                "Handpicked, comfortable accommodation",
                "Dedicated yatra manager on call 24×7",
                "Trusted by families, seniors & solo pilgrims",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-saffron text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}

function Value({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-maroon/10 bg-white p-5">
      <h3 className="font-display text-lg font-600 text-saffron-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
    </div>
  );
}
