# Divine Banaras — divinebanaras.com

A spiritual travel-agency website built with **Next.js (App Router) + TypeScript + Tailwind CSS**.
It showcases tour itineraries across Kashi (Varanasi), Ayodhya, Pashupatinath (Nepal) and the
Buddhist circuit, with an inquiry form and WhatsApp / call buttons.

---

## Run it locally

```bash
npm install       # first time only
npm run dev       # start dev server → http://localhost:3000
```

To build the static site and preview the exact files you'll upload:

```bash
npm run build            # outputs the static site to ./out
npx serve out            # preview at http://localhost:3000
```

---

## Where to edit things

| I want to change…                | Edit this file                                   |
| -------------------------------- | ------------------------------------------------ |
| Phone, WhatsApp, email, address  | `src/lib/site.ts`                                |
| Tours, prices, itineraries       | `src/data/tours.ts`                              |
| Colors / theme                   | `tailwind.config.ts`                             |
| Homepage sections                | `src/app/page.tsx`                               |
| About page text                  | `src/app/about/page.tsx`                         |
| Contact page                     | `src/app/contact/page.tsx`                       |

> ⚠️ **Update `src/lib/site.ts` first** — the phone number, WhatsApp number and
> email are placeholders (`+91 90000 00000`). Nothing else works correctly until
> those are real.

---

## Adding real photos

Right now every image is a tasteful gradient placeholder (`PlaceholderImage`) so
the site looks finished without any photos. To use real pictures:

1. Drop your images into the `public/` folder (e.g. `public/tours/kashi.jpg`).
2. Replace `<PlaceholderImage … />` with Next's optimized image, for example:

   ```tsx
   import Image from "next/image";

   <Image src="/tours/kashi.jpg" alt="Kashi Vishwanath" width={800} height={520} />
   ```

   The main spots to swap are in `src/components/TourCard.tsx`,
   `src/app/tours/[slug]/page.tsx` and the hero tiles in `src/app/page.tsx`.

---

## Receiving inquiry emails (Web3Forms)

This is a **static site** (no backend server), so the contact form emails you via
**Web3Forms** — the browser sends the submission straight to Web3Forms, which
emails it to you. It's free (250 submissions/month) and needs no account dashboard.

1. Go to <https://web3forms.com>, enter the address where you want to RECEIVE
   enquiries (e.g. `info@divinebanaras.com`) and click **Create Access Key**.
   The key is emailed to you instantly.
2. Copy `.env.example` to `.env.local` and paste it in:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
   ```
3. Rebuild (`npm run build`). Submissions now arrive in your inbox.

> The key **must** be set before you build the version you upload — it gets baked
> into the static files at build time. If you rebuild after changing it, re-upload
> the `out/` folder.

---

## Going live on Hostinger (shared / hPanel hosting)

Because it's a static export, you just upload the generated files — no Node.js needed.

**1. Build the site**
```bash
npm install          # first time only
npm run build        # creates the ready-to-upload `out/` folder
```

**2. Upload the contents of `out/` to `public_html`**

Option A — hPanel File Manager (easiest):
- hPanel → **Files → File Manager** → open `public_html`.
- Delete any default `index.html`/placeholder already there.
- Zip the **contents** of the `out/` folder (not the folder itself), upload the
  zip into `public_html`, then use File Manager's **Extract**.
- Make sure the hidden **`.htaccess`** file is included (in File Manager,
  Settings → "Show hidden files"). It powers clean URLs, the custom 404 and HTTPS.

Option B — FTP (FileZilla): connect with the FTP account from hPanel → **Files →
FTP Accounts**, then drag everything inside `out/` into `public_html`.

**3. Point the domain & enable SSL**
- If the domain is registered elsewhere, set its nameservers/DNS to Hostinger
  (hPanel → **Domains**).
- hPanel → **Security → SSL** → issue a free SSL certificate for
  `divinebanaras.com`. Once active, the HTTPS redirect in `.htaccess` takes over.

**Updating the site later:** re-run `npm run build` and re-upload the new `out/`
contents (overwrite existing files).

> ⚠️ Every time you change tours, text or the Web3Forms key, you must **rebuild
> and re-upload** — static files don't update themselves.

🙏 That's it — your site will be live at `https://divinebanaras.com`.
