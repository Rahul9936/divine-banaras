import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  keywords: [
    "Varanasi spiritual tours",
    "Kashi tour packages",
    "Ayodhya pilgrimage",
    "Prayagraj yatra",
    "Bodhgaya travel",
    "Ganga Aarti tours",
    "Indian spiritual travel",
  ],
  openGraph: {
    title: site.name,
    description: site.description,
    url: `${site.url}/`,
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
    title: site.name,
    description: site.description,
    images: [`${site.url}/banner.png`],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
