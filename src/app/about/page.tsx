import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site, whatsappLink } from "@/lib/site";

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

const commitments = [
  "A clear itinerary before you travel",
  "One point of contact for your journey",
  "Upfront inclusions and practical guidance",
  "Support for darshan, stays and local transport",
];

const officeMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="A local team you can reach"
        title="About Divine Banaras"
        subtitle="Thoughtful spiritual travel, planned with care from Varanasi."
      />

      <section className="section pb-10">
        <div className="container-page grid gap-12 lg:grid-cols-[1.35fr_0.9fr] lg:items-start">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-700 text-maroon sm:text-4xl">
              Sacred journeys deserve a steady hand.
            </h2>
            <div className="mt-6 max-w-2xl space-y-5 text-ink/80">
              <p className="text-lg leading-relaxed">
                Divine Banaras was born on the ghats of Varanasi with a simple
                purpose: help pilgrims experience the sacred heart of Bharat
                with clarity, comfort and personal care. We are a locally rooted
                team, and each journey is planned with the practical details in mind.
              </p>
              <p className="leading-relaxed">
                From the first sermon of the Buddha at Sarnath to Kashi Vishwanath,
                Ayodhya Dham, Bodhgaya and Chitrakoot, we create journeys that give
                you space to focus on what matters. We coordinate the essentials so
                your days feel simpler and more meaningful.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Value title="Local knowledge" text="Guidance shaped by life in and around Kashi." />
              <Value title="Clear planning" text="Know the route, inclusions and next steps before you go." />
              <Value title="Human support" text="Speak with a real person when you need help." />
            </div>
          </div>

          <aside className="overflow-hidden rounded-2xl border border-maroon/10 bg-white shadow-card">
            <div className="bg-maroon px-7 py-6 text-cream">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-saffron-light">
                Our commitment
              </p>
              <h2 className="mt-2 font-display text-3xl font-700">
                What you can expect
              </h2>
            </div>
            <div className="p-7">
              <ul className="space-y-4">
                {commitments.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-saffron text-xs font-bold text-white" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-sand pt-5">
                <p className="text-sm font-semibold text-maroon">Have a question before booking?</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/65">
                  Talk to our Varanasi team and plan at your own pace.
                </p>
                <a href={site.phoneHref} className="mt-4 inline-flex text-sm font-semibold text-saffron-dark underline decoration-saffron/40 underline-offset-4 hover:text-maroon">
                  Call {site.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-sand/45 py-14 sm:py-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">A transparent start</p>
            <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
              A simple way to plan your yatra
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Step number="01" title="Tell us your priorities" text="Share your dates, places of worship, group size and any support you need." />
            <Step number="02" title="Review your plan" text="We will help shape a practical route and explain what is included." />
            <Step number="03" title="Travel with support" text="Your journey details and point of contact stay clear from departure to return." />
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="section py-14 sm:py-16">
        <div className="container-page">
          <div className="rounded-2xl border border-maroon/10 bg-white p-8 shadow-card sm:p-12">
            <div className="max-w-3xl">
              <p className="eyebrow">Leadership & Impact</p>
              <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
                Meet our Founder
              </h2>
              <div className="mt-6 space-y-4 text-ink/80 leading-relaxed">
                <p className="text-lg font-semibold text-saffron-dark">
                  Amrita Singh
                </p>
                <p>
                  Amrita Singh founded Divine Banaras with a vision to connect pilgrims to the spiritual heritage of Varanasi and beyond through authentic, thoughtful travel experiences. 
                </p>
                <p>
                  Beyond her work in travel, Amrita serves as a Project Coordinator at the <strong>Holy City Rickshaw Project</strong>, an initiative dedicated to empowering underprivileged women in the region by creating sustainable livelihood opportunities and independence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-sand/20 py-14 sm:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Professional affiliations</p>
            <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
              Connected to the travel community
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
              The founder of Divine Banaras is an active member of the following travel and tourism associations.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Affiliation
              acronym="VTG"
              name="Varanasi Tourism Guild"
              iconSrc="/vtg.jpeg"
            />
            <Affiliation
              acronym="ADTOI"
              name="Association of Domestic Tour Operators of India"
              iconSrc="/adtoi.jpeg"
            />
            <Affiliation
              acronym="TWA"
              name="Tourism Welfare Association"
              iconSrc="/twa.jpeg"
            />
          </div>
        </div>
      </section>

      <section className="section py-14 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="eyebrow">Find our local base</p>
            <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
              Visit us in Varanasi
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-ink/75">
              Our team is based in Sunderpur, Varanasi. Please call or message us before visiting so we can be ready to help with your journey plans.
            </p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-ink/70">{site.address}</address>
            <a
              href={officeMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-6"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-maroon/10 bg-sand shadow-card">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7215.13974004775!2d82.97773563200066!3d25.285050938597436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e3222c83b71a5%3A0xca515cdaf275ee4c!2sSundarpur%2C%20Nagwa%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1785920879980!5m2!1sen!2sin"
              width="600"
              height="450" 
              className="h-[360px] w-full border-0"
              loading="lazy" 
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="section py-14 sm:py-16">
        <div className="container-page rounded-2xl bg-ghat-gradient px-6 py-9 text-center text-cream shadow-soft sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-saffron-light">Let&apos;s talk</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-700 sm:text-4xl">
            Start with a conversation, not a commitment.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/85 sm:text-base">
            Reach out for a no-pressure discussion about your pilgrimage plans.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn bg-saffron text-white shadow-soft hover:bg-saffron-dark focus:ring-saffron">
              Contact our team
            </Link>
            <a href={whatsappLink("Hello Divine Banaras, I would like help planning a spiritual journey.")} className="btn border border-white/35 bg-white/10 text-white hover:bg-white hover:text-maroon focus:ring-white">
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-xs text-cream/70">Based in {site.address}</p>
        </div>
      </section>
    </>
  );
}

function Value({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-maroon/10 bg-white p-5 shadow-sm">
      <h3 className="font-display text-xl font-700 text-saffron-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
    </div>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="rounded-xl border border-maroon/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold tracking-[0.18em] text-saffron-dark">{number}</p>
      <h3 className="mt-3 font-display text-2xl font-700 text-maroon">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{text}</p>
    </article>
  );
}

function Affiliation({ acronym, name, iconSrc }: { acronym: string; name: string; iconSrc: string }) {
  return (
    <article className="rounded-2xl border border-maroon/10 bg-white p-6 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sand text-maroon shadow-sm">
        <Image src={iconSrc} alt={name} width={32} height={32} className="h-8 w-8 object-contain" />
      </div>
      <p className="font-display text-4xl font-700 text-saffron-dark">{acronym}</p>
      <h3 className="mt-3 font-display text-xl font-700 text-maroon">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/65">Founder is a member</p>
    </article>
  );
}