import { whatsappLink } from "@/lib/site";

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("Namaste! I'm interested in a Divine Banaras tour.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition-transform hover:scale-105"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.06c-.24.68-1.42 1.32-1.95 1.36-.5.05-.98.24-3.3-.69-2.79-1.1-4.55-3.96-4.69-4.15-.13-.19-1.12-1.49-1.12-2.84s.71-2.01.96-2.29c.24-.27.53-.34.71-.34.18 0 .35 0 .51.01.16.01.38-.06.6.46.24.56.79 1.94.86 2.08.07.14.12.3.02.49-.1.19-.14.3-.28.46-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.27.14.44.21.51.32.07.11.07.65-.17 1.33z" />
      </svg>
    </a>
  );
}
