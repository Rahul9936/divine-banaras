import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  url: site.url,
  description: site.description,
  image: `${site.url}/banner.png`,
  logo: `${site.url}/favicon.svg`,
  telephone: `+${site.whatsapp}`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sunderpur",
    addressLocality: "Varanasi",
    addressRegion: "Uttar Pradesh",
    postalCode: "221005",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2850509,
    longitude: 82.9777356,
  },
  hasMap: "https://www.google.com/maps/search/?api=1&query=Sunderpur%2C%20Varanasi%2C%20Uttar%20Pradesh%20221005%2C%20India",
  areaServed: ["Varanasi", "Ayodhya", "Prayagraj", "Bodhgaya", "India"],
  sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Varanasi sightseeing",
    "Kashi Vishwanath",
    "Ayodhya Ram Janmabhoomi",
    "Buddhist circuit",
    "Sarnath",
    "spiritual tours India",
    "Ganga Aarti",
    "Kashi tour packages",
    "Varanasi tour packages",
    "Places to visit in Varanasi",
    "Kashi Ayodhya tour"
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: `${site.url}/banner.png`,
        alt: "Banaras ghats and temple scenery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [`${site.url}/banner.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MZ5WXSNT');
          `}
        </Script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
