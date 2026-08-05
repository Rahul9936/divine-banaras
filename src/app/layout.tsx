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
        <Script id="fullsession" strategy="afterInteractive">
          {`
            window.FUS_IS_IN_IFRAME = (window.top != window.self);
            (function (m, n, t, l, x, p, o) {
              window["_fus_host"] = l;
              window["_site_id"] = p;
              window["_fus_id"] = x;
              o = n.createElement(t);
              o.type = "text/javascript";
              o.async = true;
              o.src = "https://emitter.fullsession.io/RTSessions.js";
              y = n.getElementsByTagName(t)[0];
              y.parentNode.insertBefore(o, y);
            })(window, document, "script", "fullsession.io", 'cus_ms9waejg89w');
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
