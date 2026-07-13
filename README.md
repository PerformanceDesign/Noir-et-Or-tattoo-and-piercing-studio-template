# Noir et Or — Tattoo & Piercing Studio Template

**A single-file, bilingual (RO/EN), black-and-gold website template for tattoo & piercing studios.**
No build step, no dependencies to install — one `index.html` with everything embedded.

> 🎛️ Amplifier-inspired design system: brushed-gold buttons, rotary knobs, VU-meter stat gauges,
> toggle switches — with cinematic ink-drop page transitions, scroll-driven animation (GSAP + Lenis,
> embedded), WebGL liquid-hover gallery, and full mobile/touch support.

## ✨ Features

- **6 pages**, client-side routed with ink-drop transitions: Home · Services · Gallery · Artists · About · Contact
- **Bilingual RO/EN** out of the box — one dictionary object, instant toggle, per-visitor memory
- **One config block** (`SITE_CONFIG`) drives the studio name, monogram, contact info, social links,
  **opening hours** (rendered schedule *and* live open/closed indicator), prices, default language
- **Gallery** with filterable grid, gold-framed lightbox (keyboard + touch swipe), WebGL displacement hover
- **Contact form**: safe demo mode by default — paste one Formspree-style URL to make it actually send
- **Fully responsive & touch-friendly**: burger menu, native swipe sections, 44px+ tap targets, safe-area insets,
  `prefers-reduced-motion` respected
- **Self-contained**: GSAP, ScrollTrigger, Flip and Lenis are embedded — works offline and under strict CSPs

## 🚀 Quick start

1. **Get the file**: clone this repo or just download [`index.html`](index.html).
2. **Open it in a text editor** and search for:
   | Search | Edit |
   |---|---|
   | `SITE CONFIG` | name, monogram, contact, hours, socials, form endpoint, default language |
   | `CONTENT —` | photos + portfolio/artists/prices/testimonials |
   | `THEME —` | accent palette (chrome / emerald / crimson alternates included) |
3. **Replace the photos** — all images are temporary Unsplash placeholders (see guide).
4. **Deploy anywhere**: Netlify Drop, Vercel, GitHub Pages (Settings → Pages → deploy from `main`, root), or classic hosting.

📖 **Full instructions: [TEMPLATE-GUIDE.md](TEMPLATE-GUIDE.md)** — photo size specs, languages, form wiring, palettes, deployment.

## 🗂 Repo layout

```
index.html          ← the finished template (edit & ship this one file)
TEMPLATE-GUIDE.md   ← full customization guide
src/                ← modular sources (HTML shell, CSS, JS, vendored libs)
build.py            ← concatenates src/ into dist/index.html (python3 build.py)
```

You can customize `index.html` directly — the `src/` folder + `build.py` are only for
maintainers who prefer editing modular files (`python3 build.py` rebuilds `dist/index.html`).

## ⚠️ Before real use

- Replace **all placeholder photos** (Unsplash license: fine for mockups, but use your own studio photography commercially — the people pictured are not affiliated with your studio).
- The studio "Noir et Or", its artists, testimonials, prices and history are **fictional placeholder content**.
- Set `demoNote: false` in `SITE_CONFIG` to remove the demo notice once your real content is in.

## 📄 Licenses

Animation libraries (GSAP + plugins, Lenis) and Google Fonts are free for commercial use.
Template code: use it freely for your studio project.
