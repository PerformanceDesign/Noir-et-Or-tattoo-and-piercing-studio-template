# Tattoo & Piercing Studio — Website Template Guide

**Black & Gold edition · bilingual RO/EN · single file · no build step**

This template is one self-contained `index.html`. Everything — styles, animations
(GSAP, ScrollTrigger, Flip, Lenis are embedded inside), pages, and both languages —
lives in that single file. You edit it with any text editor; you deploy it by
uploading it anywhere.

---

## 1. Quick start (≈5 minutes)

Open `index.html` in a text editor and use search:

| Search for | What you edit there |
|---|---|
| `SITE CONFIG` | Studio name, monogram, city, founding year, address, phone, email, map link, social URLs, **opening hours**, form endpoint, default language |
| `CONTENT —` | All photos + portfolio data: gallery, featured works, artists, testimonials, stats, prices, timeline |
| `THEME —` | Accent color palette (gold by default; chrome/emerald/crimson alternates included as copy-paste blocks) |
| `I18N` | Every UI string, in Romanian and English |

The `SITE_CONFIG` block at the top of the script drives the whole site: change
`brand.name` once and the navigation, preloader, footer, page transitions, browser
tab title and favicon all update.

---

## 2. Replace the photos (required before real use!)

All images are **temporary Unsplash placeholders** — replace them with your
studio's own work before giving the site to clients.

- Each image lives in the `IMGS`, `FEATURED`, `GALLERY` and `ARTISTS` blocks with a
  comment saying where it appears.
- Replace the whole `U('photo-…', …)` call with a URL string:
  - relative path: `'images/piece-01.jpg'` (upload an `images/` folder next to `index.html`), or
  - absolute URL: `'https://your-cdn.com/piece-01.jpg'`.

**Recommended sizes** (JPEG or WebP, each under ~400 KB):

| Slot | Size / ratio |
|---|---|
| Hero portrait | ~1400 px, portrait 3:4 |
| Gallery & featured | 1000–1500 px long edge (mark taller shots `tall: true`) |
| Artist portraits | ~900×1100, face clearly visible |
| Wide banners (CTA, about) | 1600–1800 px |

**WebGL hover note:** the gallery's liquid-hover effect loads images as WebGL
textures, which requires same-origin images (your own domain — the normal case)
or a host that sends CORS headers (`Access-Control-Allow-Origin`). If an image
can't be used, the site silently falls back to a normal hover — nothing breaks.

---

## 3. Opening hours & the live "open now" light

In `SITE_CONFIG.hours`, days run `0 = Sunday … 6 = Saturday`:

```js
hours: { 0: null, 1: [11, 20], ... , 6: [12, 18] },
timezone: 'Europe/Bucharest',
```

- `[open, close]` in 24-hour format, `null` = closed.
- This one block generates the footer schedule, the contact-page schedule **and**
  the live open/closed LED (computed in the configured timezone).

---

## 4. Make the contact form actually send

By default the form is in **safe demo mode** (it clearly tells visitors nothing is sent).

To make it real: create a free form endpoint (e.g. [Formspree](https://formspree.io) —
sign up, create a form, copy its URL) and paste it into:

```js
form: { endpoint: 'https://formspree.io/f/yourFormId' },
```

The form then POSTs name/email/phone/service/message there, with proper
success/error messages in both languages. Any service that accepts a plain
form POST works (Formspree, Basin, Getform, your own backend…).

---

## 5. Languages

- All UI text lives in the `I18N` object — two complete dictionaries: `ro` and `en`.
- `SITE_CONFIG.defaultLang` sets what visitors see first; the RO/EN switch in the
  navigation is remembered per visitor.
- Content items (gallery captions, artist bios, services…) carry both languages
  inline: `{ ro: '…', en: '…' }`.
- To translate to another language, replace the strings inside one of the two
  dictionaries (e.g. turn `en` into German) — the toggle labels are in the
  navigation markup (`RO` / `EN`).

---

## 6. Colors & fonts

- Search `THEME —` in the `<style>` block. The default is black & gold; three
  complete alternate palettes (chrome/silver, emerald, crimson) are included in
  the comment — replace the 7 accent variables with one block and the entire
  site re-tints (buttons, borders, gradients, cursor, headings).
- The VU meters and rotary knobs intentionally keep their brass "amplifier
  hardware" look regardless of the accent color.
- Fonts load from Google Fonts in the `<head>` (`Cinzel Decorative`, `Cormorant
  Garamond`, `Outfit`, `Kaushan Script`). Swap families there if desired — keep
  one display serif + one text sans for the same feel.

---

## 7. Deploy

The site is static — any host works:

- **Netlify Drop** (easiest): drag the folder with `index.html` (+ your `images/`) onto https://app.netlify.com/drop — done, free HTTPS URL.
- **Vercel**: `vercel` CLI in the folder, or import in the dashboard.
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from branch.
- **Classic hosting (cPanel/FTP)**: upload to `public_html/`.

No server code, no database, no build step. The contact form only needs the
endpoint from section 4.

Before going live, also set `demoNote: false` in `SITE_CONFIG` to remove the
"demo website / temporary photos" footer notice — after you've replaced the photos.

---

## 8. What's inside (for the curious)

- **Pages** (client-side routed with ink-drop transitions): Home, Services,
  Gallery (filterable + lightbox + WebGL hover), Artists, About, Contact.
- **Animation**: GSAP 3.12 + ScrollTrigger + Flip and Lenis smooth scrolling are
  **embedded in the file** — no CDN calls, works offline and under strict CSPs.
- **Mobile**: fully responsive; touch devices get native swipe for the featured
  strip and lightbox, always-visible captions, larger tap targets, and skip the
  desktop-only cursor/magnetic/tilt/WebGL effects for performance.
- **Accessibility**: keyboard navigation for gallery/lightbox, `prefers-reduced-motion`
  respected, semantic landmarks, focus-safe overlays.

## 9. Licenses & credits

- Animation libraries (GSAP + plugins, Lenis): free for commercial use.
- Fonts: Google Fonts (OFL) — free for commercial use.
- **Placeholder photos: Unsplash license — fine for mockups, but replace them
  with your own photography before using the site commercially.** The people in
  the placeholder photos are not affiliated with your studio and their images
  must not imply endorsement.
- The studio name "Noir et Or", artists, testimonials, prices and awards in the
  template are **fictional placeholder content** — replace with your real data.
