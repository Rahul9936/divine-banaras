import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import InquiryForm from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact & Enquiry",
  description:
    "Get in touch with Divine Banaras to plan your spiritual yatra. Call, WhatsApp, email or send us an enquiry.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Let's plan your yatra"
        title="Contact Us"
        subtitle="Tell us your dates and darshan wishes — we usually reply within a few hours."
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Contact details */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-700 text-maroon">
              Reach us directly
            </h2>

            <ContactRow
              label="Call us"
              value={site.phone}
              href={site.phoneHref}
              icon="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"
            />
            <ContactRow
              label="WhatsApp"
              value="Chat with us"
              href={whatsappLink("Namaste! I'd like to plan a tour.")}
              external
              icon="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z"
            />
            <ContactRow
              label="Email"
              value={site.email}
              href={`mailto:${site.email}`}
              icon="M4 4h16v16H4zM4 6l8 6 8-6"
            />
            <ContactRow
              label="Office"
              value={site.address}
              icon="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
            />

            <div className="rounded-2xl bg-sand/60 p-6">
              <h3 className="font-display text-lg font-600 text-maroon">
                Office hours
              </h3>
              <p className="mt-2 text-sm text-ink/70">
                Monday – Sunday · 8:00 AM – 9:00 PM IST
              </p>
              <p className="mt-1 text-sm text-ink/70">
                Yatra support available 24×7 during your trip.
              </p>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="rounded-2xl bg-white p-6 shadow-card ring-1 ring-maroon/10 sm:p-8">
            <h2 className="font-display text-2xl font-700 text-maroon">
              Send an enquiry
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              Fields marked <span className="text-saffron">*</span> are required.
            </p>
            <div className="mt-6">
              <InquiryForm />
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
  href,
  icon,
  external = false,
}: {
  label: string;
  value: string;
  href?: string;
  icon: string;
  external?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-saffron/12 text-saffron-dark">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={icon} />
        </svg>
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
          {label}
        </p>
        <p className="mt-0.5 text-ink/85">{value}</p>
      </div>
    </div>
  );

  if (!href) return inner;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block rounded-xl transition-colors hover:bg-sand/50"
    >
      {inner}
    </a>
  );
}
