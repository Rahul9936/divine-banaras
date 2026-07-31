/**
 * Central site configuration.
 * Edit the contact details below with your real numbers, email and social links.
 */
export const site = {
  name: "Divine Banaras",
  domain: "divinebanaras.com",
  url: "https://divinebanaras.com",
  tagline: "Journeys to the soul of Bharat",
  description:
    "Divine Banaras crafts spiritual tours through Kashi (Varanasi), Ayodhya Dham and Pashupatinath in Nepal, along with guided Buddhist circuit journeys through Sarnath and beyond.",

  // --- Contact details (replace with your real details) ---
  phone: "+917068474084",
  phoneHref: "tel:+917068474084",
  whatsapp: "917068474084", // country code + number, digits only
  email: "info@divinebanaras.com",
  address: "Assi Ghat, Varanasi, Uttar Pradesh 221005, India",

  social: {
    instagram: "https://instagram.com/divinebanaras",
    facebook: "https://facebook.com/divinebanaras",
    youtube: "https://youtube.com/@divinebanaras",
  },
} as const;

/** Build a pre-filled WhatsApp chat link. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
