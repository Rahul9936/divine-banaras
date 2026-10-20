import type { Metadata } from "next";
import HomestayExperience from "@/components/homestay/HomestayExperience";
import { homestay } from "@/data/homestay";
import { site } from "@/lib/site";
import "./homestay.css";

export const metadata: Metadata = {
  title: "Divine Home Stay — 2BHK Homestay near BHU, Varanasi",
  description:
    "A fully furnished 2BHK homestay near BHU, Varanasi at ₹3,000/night. Two king-size beds, AC, kitchen, free WiFi, geyser, RO water, parking, lift and power backup, plus a view of the BHU Vishwanath Temple from the balcony. Take the 3D tour.",
  alternates: { canonical: "/homestay/" },
  openGraph: {
    title: "Divine Home Stay — near BHU, Varanasi",
    description: "Entire 2BHK flat with a view of the BHU Vishwanath Temple. ₹3,000/night.",
    images: ["/homestay/photos/living-1.webp"],
  },
};

const lodgingSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: homestay.name,
  url: `${site.url}/homestay/`,
  image: `${site.url}/homestay/photos/living-1.webp`,
  telephone: `+${homestay.whatsapp}`,
  priceRange: `₹${homestay.pricePerNight} per night`,
  checkinTime: "12:00",
  checkoutTime: "11:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Radhey Shree Apartment, near Gyandeep Academy, ITI Karaundi",
    addressLocality: "Varanasi",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  amenityFeature: ["Free WiFi", "Air conditioning", "Kitchen", "Hot water", "Water purifier", "Free parking", "Lift", "Power backup", "TV"].map(
    (name) => ({ "@type": "LocationFeatureSpecification", name, value: true }),
  ),
};

export default function HomestayPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingSchema) }} />
      <HomestayExperience />
    </>
  );
}
