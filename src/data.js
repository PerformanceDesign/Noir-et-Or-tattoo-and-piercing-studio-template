/* ═══════════════════════════════════════════════════════════════
   ✦ SITE CONFIG — EDIT EVERYTHING ABOUT YOUR STUDIO HERE ✦
   This single block drives the brand name, monogram, contact info,
   opening hours (including the live open/closed indicator), social
   links, the contact form and the default language — everywhere on
   the site. No other code changes needed for a rename.
   ═══════════════════════════════════════════════════════════════ */
const SITE_CONFIG = {
  brand: {
    name: 'Noir et Or',            // full studio name (nav, footer, preloader, page title)
    mark: 'N·O',                   // short monogram, 2-4 chars (seal, favicon, transitions)
    bigword: 'NOIR ET OR',         // giant outlined word behind the hero
    tagline: { ro: 'Tattoo & Piercing', en: 'Tattoo & Piercing' },
    city: 'București',
    est: 2014                      // founding year (hero seal, badges)
  },
  contact: {
    address1: 'Str. Pictor Arthur Verona 12',
    address2: 'București, România',
    phone: '+40 721 000 000',
    email: 'hello@noiretor.ro',
    mapQuery: 'Strada Pictor Arthur Verona 12 Bucuresti',   // used for the Google Maps link
    socials: {                     // leave any of these '' to hide its icon
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      tiktok: 'https://tiktok.com'
    }
  },
  /* Opening hours: 0=Sunday … 6=Saturday. [open, close] in 24h, or null = closed.
     Drives BOTH the displayed schedule AND the live "open now" indicator. */
  hours: { 0: null, 1: [11, 20], 2: [11, 20], 3: [11, 20], 4: [11, 20], 5: [11, 20], 6: [12, 18] },
  timezone: 'Europe/Bucharest',    // IANA timezone for the open/closed indicator
  form: {
    /* Paste a form endpoint (e.g. https://formspree.io/f/yourid) to make the
       contact form actually send. Leave '' for safe demo mode. */
    endpoint: ''
  },
  defaultLang: 'ro',               // 'ro' or 'en' — first language visitors see
  demoNote: true                   // shows the "demo site / temporary photos" footer note
};

/* ═══════════════════════════════════════════════════════════════
   ✦ CONTENT — REPLACE THE PLACEHOLDER IMAGES & PORTFOLIO DATA ✦
   All photos below are TEMPORARY Unsplash placeholders. Replace each
   url with your own photo (an absolute https URL or a relative path
   like "images/piece-01.jpg" uploaded next to index.html).
   Recommended sizes — gallery/featured ≈1000-1500px on the long edge,
   hero portrait ≈1400px (3:4), artist portraits ≈900×1100 (face visible).
   Note: the WebGL hover effect needs same-origin images or a host that
   sends CORS headers (your own domain is fine).
   ═══════════════════════════════════════════════════════════════ */
const U = (id, w = 1600, extra = '') => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop${extra}`;

const IMGS = {
  hero:        U('photo-1759247944314-0f95e06a232f', 1400),   // homepage hero portrait (3:4)
  craft:       U('photo-1568515045052-f9a854d70bfd', 1400),   // "the atelier" section
  ctaBand:     U('photo-1605822964483-d64f5e574ffc', 1800),   // wide CTA banner background
  svcTattoo:   U('photo-1782316342631-11aaa48f7d56', 1200),   // services: tattoo
  svcPiercing: U('photo-1708389828558-8a904033f3f2', 1200),   // services: piercing
  svcCover:    U('photo-1740239986116-6c04b956f9d3', 1200),   // services: cover-up
  svcConsult:  U('photo-1605647533135-51b5906087d0', 1200),   // services: consultation
  svcHero:     U('photo-1761276297550-27567ed50a1e', 1400),   // services page: block 04
  piercDetail: U('photo-1655255114527-d0a834d9a774', 1200),   // services page: block 02
  aboutFront:  U('photo-1774249447467-b9bbecffc7a2', 1600),   // about: storefront
  aboutIn1:    U('photo-1608666599953-b951163495f4', 1400),   // about: interior 1
  aboutIn2:    U('photo-1671750145942-da9fed292290', 1400),   // about: interior 2
  aboutIn3:    U('photo-1513078094721-e7b6e0394a6a', 1000)    // about: interior 3 (tall)
};

/* featured works — homepage horizontal scroll (5-7 items works best) */
const FEATURED = [
  { img: U('photo-1533743409942-b91130480a7a', 1500), t: { ro: 'Grădina nocturnă', en: 'Night Garden' },     tag: { ro: 'Spate întreg · Floral', en: 'Full back · Floral' } },
  { img: U('photo-1543244128-30d70d41e2a9', 1500),   t: { ro: 'Școala veche', en: 'Old School' },   tag: { ro: 'Mânecă · Traditional', en: 'Sleeve · Traditional' } },
  { img: U('photo-1651692883249-ed36b3523419', 1200), t: { ro: 'Linii fine', en: 'Fine Lines' },            tag: { ro: 'Antebraț · Fine line', en: 'Forearm · Fine line' } },
  { img: U('photo-1570106786245-ce68ce6503f8', 1500), t: { ro: 'Moștenire', en: 'Heritage' },               tag: { ro: 'Spate · Ornamental', en: 'Back · Ornamental' } },
  { img: U('photo-1594091186701-13cd25dfda73', 1500), t: { ro: 'Mașinăria', en: 'The Machine' },            tag: { ro: 'Atelier · Detaliu', en: 'Workshop · Detail' } },
  { img: U('photo-1523505706581-ebcc99ba63cf', 1200), t: { ro: 'Șarpele de aur', en: 'The Gilded Serpent' }, tag: { ro: 'Braț · Ilustrativ', en: 'Arm · Illustrative' } }
];

/* gallery — cat: 'tattoo' | 'piercing' | 'studio'; tall: true = taller tile */
const GALLERY = [
  { id: 'g01', img: U('photo-1736628495264-2728d5582aa2', 1000), full: U('photo-1736628495264-2728d5582aa2', 2000), cat: 'tattoo',   tall: false, cap: { ro: 'Fine line pe antebraț', en: 'Fine line on forearm' } },
  { id: 'g02', img: U('photo-1708389828558-8a904033f3f2', 1000), full: U('photo-1708389828558-8a904033f3f2', 2000), cat: 'piercing', tall: true,  cap: { ro: 'Curated ear · aur', en: 'Curated ear · gold' } },
  { id: 'g03', img: U('photo-1542727365-19732a80dcfd', 1000),   full: U('photo-1542727365-19732a80dcfd', 2000),   cat: 'tattoo',   tall: true,  cap: { ro: 'Micro-tatuaj', en: 'Micro tattoo' } },
  { id: 'g04', img: U('photo-1608666599953-b951163495f4', 1000), full: U('photo-1608666599953-b951163495f4', 2000), cat: 'studio',   tall: false, cap: { ro: 'Stația de lucru', en: 'The workstation' } },
  { id: 'g05', img: U('photo-1543244128-30d70d41e2a9', 1000),   full: U('photo-1543244128-30d70d41e2a9', 2000),   cat: 'tattoo',   tall: false, cap: { ro: 'Tradițional în culoare', en: 'Traditional in color' } },
  { id: 'g06', img: U('photo-1603323226047-df6de54ddc13', 1000), full: U('photo-1603323226047-df6de54ddc13', 2000), cat: 'piercing', tall: true,  cap: { ro: 'Nostril · titan', en: 'Nostril · titanium' } },
  { id: 'g07', img: U('photo-1533743409942-b91130480a7a', 1000), full: U('photo-1533743409942-b91130480a7a', 2000), cat: 'tattoo',   tall: false, cap: { ro: 'Floral pe spate', en: 'Floral back piece' } },
  { id: 'g08', img: U('photo-1595747644932-abb68f85f419', 1000), full: U('photo-1595747644932-abb68f85f419', 2000), cat: 'studio',   tall: true,  cap: { ro: 'Colțul cu schițe', en: 'The flash corner' } },
  { id: 'g09', img: U('photo-1605822964483-d64f5e574ffc', 1000), full: U('photo-1605822964483-d64f5e574ffc', 2000), cat: 'tattoo',   tall: false, cap: { ro: 'Blackout pe mână', en: 'Hand blackout' } },
  { id: 'g10', img: U('photo-1644231392320-6a8590fbbd7f', 1000), full: U('photo-1644231392320-6a8590fbbd7f', 2000), cat: 'piercing', tall: true,  cap: { ro: 'Portret · septum', en: 'Portrait · septum' } },
  { id: 'g11', img: U('photo-1627960630431-270d04164a22', 1000), full: U('photo-1627960630431-270d04164a22', 2000), cat: 'tattoo',   tall: true,  cap: { ro: 'Script pe încheietură', en: 'Wrist script' } },
  { id: 'g12', img: U('photo-1517762340357-3a82e505f7c4', 1000), full: U('photo-1517762340357-3a82e505f7c4', 2000), cat: 'studio',   tall: false, cap: { ro: 'Recepția studioului', en: 'Studio front desk' } },
  { id: 'g13', img: U('photo-1551199452-0754298c4f8b', 1000),   full: U('photo-1551199452-0754298c4f8b', 2000),   cat: 'tattoo',   tall: false, cap: { ro: 'Cruce · linie neagră', en: 'Cross · black line' } },
  { id: 'g14', img: U('photo-1520563683082-7ef74b616a89', 1000), full: U('photo-1520563683082-7ef74b616a89', 2000), cat: 'piercing', tall: false, cap: { ro: 'Inel de nas', en: 'Nose ring' } },
  { id: 'g15', img: U('photo-1736594635582-7f60e14604cc', 1000), full: U('photo-1736594635582-7f60e14604cc', 2000), cat: 'tattoo',   tall: false, cap: { ro: 'Compoziție fine line', en: 'Fine line composition' } },
  { id: 'g16', img: U('photo-1568515045052-f9a854d70bfd', 1000), full: U('photo-1568515045052-f9a854d70bfd', 2000), cat: 'studio',   tall: true,  cap: { ro: 'În timpul lucrului', en: 'Work in progress' } },
  { id: 'g17', img: U('photo-1610942933193-8fafd0973f6d', 1000), full: U('photo-1610942933193-8fafd0973f6d', 2000), cat: 'tattoo',   tall: true,  cap: { ro: 'Umbre și textură', en: 'Shadow and texture' } },
  { id: 'g18', img: U('photo-1652766540048-de0a878a3266', 1000), full: U('photo-1652766540048-de0a878a3266', 2000), cat: 'piercing', tall: true,  cap: { ro: 'Lob · piatră neagră', en: 'Lobe · black stone' } },
  { id: 'g19', img: U('photo-1523505706581-ebcc99ba63cf', 1000), full: U('photo-1523505706581-ebcc99ba63cf', 2000), cat: 'tattoo',   tall: true,  cap: { ro: 'Șarpe ilustrativ', en: 'Illustrative serpent' } },
  { id: 'g20', img: U('photo-1671750145942-da9fed292290', 1000), full: U('photo-1671750145942-da9fed292290', 2000), cat: 'studio',   tall: false, cap: { ro: 'Sala principală', en: 'The main room' } }
];

/* your team — 2-6 artists render well */
const ARTISTS = [
  {
    key: 'ana', name: 'Ana Vlad',
    img: U('photo-1485463598028-44d6c47bf23f', 900, '&h=1100&crop=faces'),
    role:  { ro: 'Fine line & botanic', en: 'Fine line & botanical' },
    bio:   { ro: 'Desenează din copilărie și tatuează de nouă ani. Lucrările ei par trase cu penița — subțiri, precise, vii.', en: 'Drawing since childhood, tattooing for nine years. Her work looks pen-drawn — thin, precise, alive.' },
    spec:  [{ ro: 'Fine line', en: 'Fine line' }, { ro: 'Botanic', en: 'Botanical' }, { ro: 'Lettering', en: 'Lettering' }],
    years: 9, works: 1200, rating: 4.9
  },
  {
    key: 'victor', name: 'Victor Neagu',
    img: U('photo-1736864200485-df983cef7b39', 900, '&h=1100&crop=faces'),
    role:  { ro: 'Blackwork & geometrie', en: 'Blackwork & geometry' },
    bio:   { ro: 'Arhitect ratat, tatuator împlinit. Construiește piese mari, cu negru dens și simetrii care țin o viață.', en: 'A recovering architect. He builds large-scale pieces — dense blacks, symmetry made to last a lifetime.' },
    spec:  [{ ro: 'Blackwork', en: 'Blackwork' }, { ro: 'Geometric', en: 'Geometric' }, { ro: 'Ornamental', en: 'Ornamental' }],
    years: 11, works: 1550, rating: 4.8
  },
  {
    key: 'mara', name: 'Mara Ilie',
    img: U('photo-1761957367473-2d71f8a26ca0', 900, '&h=1100&crop=faces'),
    role:  { ro: 'Realism & culoare', en: 'Realism & color' },
    bio:   { ro: 'Pictează în ulei și tatuează portrete care respiră. Culoarea e limbajul ei matern.', en: 'She paints in oils and tattoos portraits that breathe. Color is her native language.' },
    spec:  [{ ro: 'Realism', en: 'Realism' }, { ro: 'Culoare', en: 'Color' }, { ro: 'Portret', en: 'Portrait' }],
    years: 8, works: 940, rating: 4.9
  },
  {
    key: 'radu', name: 'Radu Cosma',
    img: U('photo-1770648755348-8eb9497d7de9', 900, '&h=1100&crop=faces'),
    role:  { ro: 'Master piercer', en: 'Master piercer' },
    bio:   { ro: 'Zece ani de piercing și mii de urechi „curatoriate". Calm, steril, milimetric.', en: 'Ten years of piercing and thousands of curated ears. Calm, sterile, millimetre-exact.' },
    spec:  [{ ro: 'Curated ear', en: 'Curated ear' }, { ro: 'Septum', en: 'Septum' }, { ro: 'Industrial', en: 'Industrial' }],
    years: 10, works: 4100, rating: 5.0
  }
];

/* client testimonials (3 render best) */
const QUOTES = [
  { name: 'Ioana M.',    piece: { ro: 'mânecă florală', en: 'floral sleeve' },   q: { ro: '„Am intrat cu o idee vagă și am ieșit cu o operă de artă. Ana a înțeles ce voiam înainte să știu eu."', en: '“I walked in with a vague idea and left with a work of art. Ana understood what I wanted before I did.”' } },
  { name: 'Andrei P.',   piece: { ro: 'cover-up spate', en: 'back cover-up' },   q: { ro: '„Un tatuaj de care mi-a fost rușine zece ani e acum piesa mea preferată. Respect total pentru Victor."', en: '“A tattoo I was ashamed of for ten years is now my favourite piece. Total respect for Victor.”' } },
  { name: 'Cristina D.', piece: { ro: 'curated ear', en: 'curated ear' },        q: { ro: '„Cel mai curat studio în care am pus piciorul. Radu ți-ar putea face piercing și cu ochii închiși — dar nu-i lasă niciodată."', en: '“The cleanest studio I have ever set foot in. Radu could pierce blindfolded — he just never would.”' } }
];

/* studio stats — VU meters (value/max sets the needle position) */
const fmtInt = v => Math.round(v).toLocaleString(typeof App !== 'undefined' && App.lang === 'en' ? 'en-US' : 'ro-RO');
const STATS = [
  { key: 'years',  value: 12,   max: 15,   fmt: v => Math.round(v),                                   label: { ro: 'ani de studio', en: 'years of craft' } },
  { key: 'works',  value: 4800, max: 5000, fmt: v => fmtInt(Math.round(v / 100) * 100) + '+',         label: { ro: 'lucrări realizate', en: 'pieces completed' } },
  { key: 'return', value: 98,   max: 100,  fmt: v => Math.round(v) + '%',                             label: { ro: 'clienți care revin', en: 'returning clients' } },
  { key: 'rating', value: 4.9,  max: 5,    fmt: v => v.toFixed(1),                                    label: { ro: 'rating mediu', en: 'average rating' } }
];

/* starting prices */
const PRICES = [
  { s: { ro: 'Tatuaj mic (până în 8 cm)', en: 'Small tattoo (under 8 cm)' },      p: 350,  unit: 'lei' },
  { s: { ro: 'Tatuaj mediu (o ședință)', en: 'Medium tattoo (one session)' },     p: 700,  unit: 'lei' },
  { s: { ro: 'Ședință complexă (3–4 h)', en: 'Complex session (3–4 h)' },         p: 1400, unit: 'lei' },
  { s: { ro: 'Full day (6+ h)', en: 'Full day (6+ h)' },                          p: 2500, unit: 'lei' },
  { s: { ro: 'Piercing lob / helix', en: 'Lobe / helix piercing' },               p: 150,  unit: 'lei' },
  { s: { ro: 'Nostril / septum', en: 'Nostril / septum' },                        p: 220,  unit: 'lei' },
  { s: { ro: 'Industrial / conch', en: 'Industrial / conch' },                    p: 280,  unit: 'lei' }
];

/* about page timeline */
const TIMELINE = [
  { y: '2014', t: { ro: 'Începem într-un atelier de 20 m² — două scaune, un autoclav și foarte mult curaj.', en: 'We start in a 20 m² workshop — two chairs, one autoclave and a lot of nerve.' } },
  { y: '2017', t: { ro: 'Ne mutăm pe strada Pictor Arthur Verona, în inima Bucureștiului artistic.', en: 'We move to Pictor Arthur Verona street, in the heart of artistic Bucharest.' } },
  { y: '2020', t: { ro: 'Deschidem departamentul de piercing și primul „curated ear" din studio.', en: 'We open the piercing department and the studio’s first curated ear service.' } },
  { y: '2023', t: { ro: 'Echipa crește la patru artiști rezidenți și lansăm programul de guest spots.', en: 'The team grows to four resident artists and we launch our guest spot program.' } },
  { y: '2026', t: { ro: 'Peste 4.800 de lucrări mai târziu, abia ne încălzim.', en: 'Over 4,800 pieces later, we are just warming up.' } }
];

/* ── derived helpers (no need to edit) ── */
function hoursGroups(lang) {
  const days = I18N[lang].daysFull, H = SITE_CONFIG.hours;
  const pad = n => String(n).padStart(2, '0');
  const fmt = h => h ? `${pad(h[0])}:00 – ${pad(h[1])}:00` : I18N[lang].misc.closed;
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const order = [1, 2, 3, 4, 5, 6, 0];
  const groups = [];
  order.forEach(d => {
    const g = groups[groups.length - 1];
    if (g && same(H[d], g.h)) { g.to = d; }
    else groups.push({ from: d, to: d, h: H[d] });
  });
  return groups.map(g => ({
    label: g.from === g.to ? days[g.from] : `${days[g.from]} – ${days[g.to]}`,
    val: fmt(g.h), open: !!g.h
  }));
}
