import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { tours } from "@/data/tours";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="bg-maroon-dark text-cream/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl text-white">{site.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            {site.tagline}. Curated spiritual journeys across Kashi, Ayodhya,
            Nepal and the Buddhist circuit.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink href={site.social.instagram} label="Instagram">
              <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5zM17.5 6.5h.01M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
            </SocialLink>
            <SocialLink href={site.social.facebook} label="Facebook">
              <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1z" />
            </SocialLink>
            <SocialLink href={site.social.youtube} label="YouTube">
              <path d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8zm7 1.5v5l4.5-2.5L10 9.5z" />
            </SocialLink>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-saffron-light">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/tours" className="hover:text-white">All Tours</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-saffron-light">
            Popular Yatras
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {tours.slice(0, 4).map((t) => (
              <li key={t.slug}>
                <Link href={`/tours/${t.slug}`} className="hover:text-white">
                  {t.title.split("—")[0].trim()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-saffron-light">
            Get in Touch
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="text-cream/70">{site.address}</li>
            <li>
              <a
                href={whatsappLink("Namaste! I would like to know more about your tours.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#8ff0b0] hover:text-white"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>{site.domain} · Made with devotion in Kashi</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-saffron hover:text-saffron-light"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
