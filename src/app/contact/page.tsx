import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact & Enquiry | Divine Banaras",
  description:
    "Get in touch with Divine Banaras to plan your spiritual yatra. Call, WhatsApp, email or send us an enquiry.",
  keywords: [
    "contact Divine Banaras",
    "spiritual travel enquiry",
    "Varanasi tour booking",
    "Ayodhya pilgrimage planning",
  ],
  openGraph: {
    title: "Contact & Enquiry | Divine Banaras",
    description:
      "Get in touch with Divine Banaras to plan your spiritual yatra. Call, WhatsApp, email or send us an enquiry.",
    url: `${site.url}/contact`,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: `${site.url}/banner.png`,
        alt: "Contact Divine Banaras for spiritual tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Enquiry | Divine Banaras",
    description:
      "Get in touch with Divine Banaras to plan your spiritual yatra. Call, WhatsApp, email or send us an enquiry.",
    images: [`${site.url}/banner.png`],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Speak with our Varanasi team"
        title="Plan your journey with clarity"
        subtitle="Ask questions, share your plans and choose the contact method that feels easiest."
      />

      <section className="section pb-10">
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">We&apos;re here to help</p>
            <h2 className="mt-3 font-display text-3xl font-700 text-maroon sm:text-4xl">
              Start with a real conversation.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/75">
              Whether you know your route or are just beginning to explore, our
              team can help you understand your options before you decide.
            </p>

            <div className="mt-7 space-y-3">
              <ContactRow
                label="Call us"
                value={site.phone}
                detail="For a direct conversation about your travel plans"
                href={site.phoneHref}
                icon="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"
              />
              <ContactRow
                label="WhatsApp"
                value="Chat with our team"
                detail="Share a quick question or your preferred travel dates"
                href={whatsappLink("Namaste! I would like help planning a spiritual journey.")}
                external
                icon="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z"
              />
              <ContactRow
                label="Email"
                value={site.email}
                detail="Best for detailed questions and trip requirements"
                href={`mailto:${site.email}`}
                icon="M4 4h16v16H4zM4 6l8 6 8-6"
              />
              <ContactRow
                label="Our local base"
                value={site.address}
                detail="Proudly based in Varanasi, Uttar Pradesh"
                icon="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
              />
            </div>

            <aside className="mt-6 rounded-2xl border border-maroon/10 bg-sand/55 p-6">
              <h3 className="font-display text-2xl font-700 text-maroon">What to share with us</h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/70">
                <li>• Your preferred dates and group size</li>
                <li>• Places you would like to visit or worship at</li>
                <li>• Any accommodation, mobility or pace preferences</li>
              </ul>
              <p className="mt-4 border-t border-maroon/10 pt-4 text-sm leading-relaxed text-ink/70">
                There is no obligation to book when you contact us. We will first help you understand the journey.
              </p>
            </aside>
          </div>

          <div className="rounded-2xl border border-maroon/10 bg-white p-6 shadow-card sm:p-8">
            <div className="border-b border-sand pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-dark">Send an enquiry</p>
              <h2 className="mt-2 font-display text-3xl font-700 text-maroon">Tell us about your yatra</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Share as much or as little as you know. We use these details only to respond to your enquiry and help plan your journey.
              </p>
            </div>
            <div className="mt-6">
              <InquiryForm />
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-cream p-4 text-xs leading-relaxed text-ink/65">
              <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-maroon text-white" aria-hidden="true">✓</span>
              <p>Your details stay with Divine Banaras and are used only to discuss this enquiry.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  label,
  value,
  detail,
  href,
  icon,
  external = false,
}: {
  label: string;
  value: string;
  detail: string;
  href?: string;
  icon: string;
  external?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-xl border border-maroon/10 bg-white p-4 shadow-sm transition-all group-hover:-translate-y-0.5 group-hover:border-saffron/35 group-hover:shadow-card">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-saffron/12 text-saffron-dark">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={icon} />
        </svg>
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">{label}</p>
        <p className="mt-0.5 font-semibold text-maroon">{value}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink/60">{detail}</p>
      </div>
    </div>
  );

  if (!href) return inner;

  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group block rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2">
      {inner}
    </a>
  );
}
