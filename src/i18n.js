/* ============ BILINGUAL DICTIONARY — RO default / EN ============ */
const I18N = {
ro: {
  brand: { sub: 'Tattoo & Piercing' },
  nav: { home: 'Acasă', services: 'Servicii', gallery: 'Galerie', artists: 'Artiști', about: 'Despre', contact: 'Contact', cta: 'Programează-te' },
  cursor: { view: 'Vezi', drag: 'Trage', open: 'Deschide' },
  routes: { home: 'Acasă', services: 'Servicii', gallery: 'Galerie', artists: 'Artiști', about: 'Despre', contact: 'Contact' },
  footer: {
    tag: 'Studio de tatuaje și piercing în inima Bucureștiului. Negru dens, aur discret, igienă clinică.',
    explore: 'Explorează', visit: 'Ne găsești', hours: 'Program',
    demo: 'site demonstrativ', imgnote: 'Fotografii temporare via Unsplash — vor fi înlocuite cu lucrări reale.'
  },
  daysFull: ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'],
  misc: { from: 'de la', free: 'Gratuit', years: 'ani', works: 'lucrări', rating: 'rating', available: 'Disponibil pentru programări', all: 'Toate', tattoo: 'Tatuaje', piercing: 'Piercing', studio: 'Studio', close: 'Închide', closed: 'închis' },
  home: {
    eyebrow: 'Studio de tatuaje & piercing · București',
    t1: 'Artă gravată', t2: 'în piele.',
    lead: 'Fiecare tatuaj e o poveste spusă o singură dată. O spunem împreună — în negru dens și aur discret.',
    cta1: 'Programează o ședință', cta2: 'Explorează galeria',
    est: 'est. 2014', scroll: 'derulează',
    marquee: ['Tatuaje custom', 'Piercing profesional', 'Fine line', 'Blackwork', 'Realism', 'Cover-up', 'Curated ear', 'Design personalizat'],
    craftEyebrow: 'Atelierul', craftTitle: 'Negru dens. Aur discret. Mâini sigure.',
    craftP1: 'Noir et Or e un studio boutique: maximum doi clienți pe zi pentru fiecare artist, ca fiecare piesă să primească timpul pe care îl merită. Desenăm totul de la zero — nu vei purta niciodată tatuajul altcuiva.',
    craftP2: 'Sterilizare în autoclav clasa B, ace de unică folosință și pigmenți conformi normelor UE. Partea nevăzută a artei e disciplina.',
    craftLink: 'Despre studio',
    svcEyebrow: 'Ce facem', svcTitle: 'Servicii de studio', svcLink: 'Vezi toate serviciile',
    svcItems: [
      { t: 'Tatuaje custom', d: 'De la fine line la blackwork și realism — desenat de la zero, doar pentru tine.' },
      { t: 'Piercing profesional', d: 'Titan implant-grade, tehnică aseptică și vindecare ghidată pas cu pas.' },
      { t: 'Cover-up & rework', d: 'Transformăm tatuaje vechi sau nereușite în piese de care să fii mândru.' },
      { t: 'Consultație & design', d: 'Discutăm ideea, schițăm conceptul, alegem plasarea. Întotdeauna gratuit.' }
    ],
    featEyebrow: 'Lucrări alese', featTitle: 'Piese semnate', featHint: 'derulează — secțiunea se mișcă orizontal',
    statsEyebrow: 'Studioul în cifre', statsTitle: 'Acul nu minte niciodată',
    quotesEyebrow: 'Cuvinte de la clienți', quotesTitle: 'Ce rămâne după cerneală',
    ctaT1: 'Pielea ta.', ctaT2: 'Povestea ta.',
    ctaP: 'Vino cu o idee, o amintire sau doar o direcție. Consultația e gratuită, iar cafeaua e din partea casei.',
    ctaBtn: 'Hai să vorbim'
  },
  services: {
    eyebrow: 'Servicii', title: 'Ce facem cu mâinile astea',
    lead: 'Patru meserii sub același acoperiș: tatuaj, piercing, salvarea tatuajelor vechi și designul care le leagă pe toate.',
    blocks: [
      { n: '01', t: 'Tatuaje custom', d: 'Nu avem cataloage de modele. Fiecare piesă începe cu povestea ta și trece prin schițe, feedback și ajustări până când e doar a ta. Lucrăm curat, la un singur client odată, fără grabă.', chips: ['Fine line', 'Blackwork', 'Realism', 'Traditional', 'Geometric', 'Lettering'] },
      { n: '02', t: 'Piercing profesional', d: 'Doar bijuterii din titan implant-grade (ASTM F-136), tehnică aseptică și instrucțiuni de vindecare pe care chiar le poți urma. De la primul lob la un curated ear complet.', chips: ['Lob & Helix', 'Tragus', 'Conch', 'Industrial', 'Nostril', 'Septum', 'Sprânceană', 'Buric'] },
      { n: '03', t: 'Cover-up & rework', d: 'Un tatuaj vechi nu e o condamnare. Evaluăm onest ce se poate acoperi, ce merită refăcut și când e nevoie de câteva ședințe de laser înainte. Apoi construim ceva mai bun deasupra.', chips: ['Evaluare onestă', 'Schiță peste foto', 'Colaborare laser', 'Refresh linii vechi'] },
      { n: '04', t: 'Consultație & design', d: 'O oră în care vorbim despre idee, plasare, dimensiune și buget. Pleci cu o direcție clară și o programare — sau măcar cu o părere sinceră. Nu costă nimic.', chips: ['Gratuit', '45–60 min', 'Schiță preliminară', 'Fără obligații'] }
    ],
    priceEyebrow: 'Orientativ', priceTitle: 'Prețuri de pornire',
    priceNote: 'Prețul final depinde de dimensiune, complexitate și plasare — îl stabilim exact la consultație. Bijuteria de bază din titan e inclusă la piercing.',
    afterEyebrow: 'Vindecarea', afterTitle: 'Îngrijirea de după',
    afterTattoo: { t: 'După tatuaj', steps: ['Păstrează folia 2–4 ore, apoi spală blând cu săpun neutru.', 'Aplică un strat subțire de cremă recomandată, de 2–3 ori pe zi.', 'Fără soare, piscină sau saună timp de 3–4 săptămâni.', 'Nu scărpina și nu dezlipi crustele — se desprind singure.', 'Retușul e gratuit în primele 3 luni, dacă e nevoie.'] },
    afterPiercing: { t: 'După piercing', steps: ['Clătește cu soluție salină sterilă de 2 ori pe zi.', 'Nu roti și nu atinge bijuteria cu mâinile nespălate.', 'Evită machiajul și produsele cosmetice pe zonă.', 'Nu schimba bijuteria înainte de vindecarea completă.', 'Dormi pe partea opusă până se liniștește zona.'] },
    hygiene: ['Autoclav clasa B', 'Ace de unică folosință', 'Pigmenți conformi REACH', 'Titan implant-grade', 'Suprafețe dezinfectate între clienți', '18+ cu act de identitate']
  },
  gallery: {
    eyebrow: 'Galerie', title: 'Cerneală & metal',
    lead: 'O selecție din lucrările studioului. Atinge o imagine ca să o vezi mai aproape.',
    filters: { all: 'Toate', tattoo: 'Tatuaje', piercing: 'Piercing', studio: 'Studio' },
    empty: 'Nimic aici încă — încearcă alt filtru.',
    counter: 'lucrări afișate'
  },
  artists: {
    eyebrow: 'Echipa', title: 'Mâinile din spatele acului',
    lead: 'Patru artiști rezidenți, patru stiluri, aceeași obsesie pentru detaliu.',
    exp: 'experiență', works: 'lucrări', spec: 'specializări',
    guestT: 'Guest spots', guestP: 'Găzduim regulat artiști invitați din toată Europa. Dacă ești tatuator și vrei să lucrezi o săptămână la Noir et Or, scrie-ne.',
    guestBtn: 'Aplică pentru guest spot'
  },
  about: {
    eyebrow: 'Despre noi', title: 'Un deceniu de cerneală',
    lead: 'Am pornit dintr-un atelier cât o debara și am crescut într-unul dintre cele mai respectate studiouri din București. Povestea, pe scurt:',
    valuesEyebrow: 'Principii', valuesTitle: 'În ce credem',
    values: [
      { t: 'Igienă fără compromis', d: 'Autoclav clasa B, ace și rezerve de unică folosință, pigmenți conformi normelor UE. Verificăm, notăm, arhivăm — de fiecare dată.' },
      { t: 'Artă, nu bandă rulantă', d: 'Maximum doi clienți pe zi per artist. Un tatuaj bun cere timp, iar timpul tău pe scaun merită toată atenția noastră.' },
      { t: 'Consimțământ & confort', d: 'Explicăm fiecare pas, facem pauze când ai nevoie și nu lucrăm niciodată cu persoane sub 18 ani. Corpul tău, regulile tale.' }
    ],
    studioEyebrow: 'Spațiul', studioTitle: 'Locul unde se întâmplă'
  },
  contact: {
    eyebrow: 'Contact', title: 'Hai să vorbim despre piele',
    lead: 'Spune-ne ce ai în minte. Răspundem în maximum 24 de ore, de obicei mult mai repede.',
    fName: 'Numele tău', fEmail: 'Email', fPhone: 'Telefon (opțional)', fService: 'Ce te interesează?',
    fOptions: ['Tatuaj nou', 'Cover-up / rework', 'Piercing', 'Consultație / altceva'],
    fMsg: 'Descrie ideea ta — stil, dimensiune, plasare, orice detaliu ajută.',
    fBtn: 'Trimite mesajul', fSending: 'Se trimite…',
    fOkT: 'Mesaj pregătit!', fOk: 'Acesta e un site demonstrativ — formularul nu trimite date nicăieri. Într-un site live, mesajul ar ajunge direct în inboxul studioului.',
    fSentT: 'Trimis!', fSent: 'Mulțumim! Îți răspundem în cel mult 24 de ore.',
    fSendErr: 'Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-ne direct pe email.',
    fErr: 'Completează numele, emailul și mesajul.',
    infoT: 'Studioul', mapBtn: 'Deschide în Google Maps',
    hoursT: 'Program', todayOpen: 'Azi: deschis', todayClosed: 'Azi: închis',
    walkIn: 'Programările au prioritate. Pentru piercing acceptăm și walk-in, în limita locurilor libere.'
  }
},
en: {
  brand: { sub: 'Tattoo & Piercing' },
  nav: { home: 'Home', services: 'Services', gallery: 'Gallery', artists: 'Artists', about: 'About', contact: 'Contact', cta: 'Book now' },
  cursor: { view: 'View', drag: 'Drag', open: 'Open' },
  routes: { home: 'Home', services: 'Services', gallery: 'Gallery', artists: 'Artists', about: 'About', contact: 'Contact' },
  footer: {
    tag: 'Tattoo & piercing studio in the heart of Bucharest. Dense black, quiet gold, clinical hygiene.',
    explore: 'Explore', visit: 'Find us', hours: 'Hours',
    demo: 'demo website', imgnote: 'Temporary photography via Unsplash — to be replaced with real studio work.'
  },
  daysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  misc: { from: 'from', free: 'Free', years: 'yrs', works: 'works', rating: 'rating', available: 'Available for bookings', all: 'All', tattoo: 'Tattoos', piercing: 'Piercing', studio: 'Studio', close: 'Close', closed: 'closed' },
  home: {
    eyebrow: 'Tattoo & piercing studio · Bucharest',
    t1: 'Art engraved', t2: 'in skin.',
    lead: 'Every tattoo is a story told exactly once. We tell it together — in dense black and quiet gold.',
    cta1: 'Book a session', cta2: 'Explore the gallery',
    est: 'est. 2014', scroll: 'scroll',
    marquee: ['Custom tattoos', 'Professional piercing', 'Fine line', 'Blackwork', 'Realism', 'Cover-ups', 'Curated ear', 'Bespoke design'],
    craftEyebrow: 'The atelier', craftTitle: 'Dense black. Quiet gold. Steady hands.',
    craftP1: 'Noir et Or is a boutique studio: at most two clients per artist per day, so every piece gets the time it deserves. Everything is drawn from scratch — you will never wear someone else’s tattoo.',
    craftP2: 'Class-B autoclave sterilisation, single-use needles and EU-compliant pigments. The invisible half of this art is discipline.',
    craftLink: 'About the studio',
    svcEyebrow: 'What we do', svcTitle: 'Studio services', svcLink: 'See all services',
    svcItems: [
      { t: 'Custom tattoos', d: 'From fine line to blackwork and realism — drawn from zero, only for you.' },
      { t: 'Professional piercing', d: 'Implant-grade titanium, aseptic technique and step-by-step healing guidance.' },
      { t: 'Cover-up & rework', d: 'We turn old or unloved tattoos into pieces you will be proud of.' },
      { t: 'Consultation & design', d: 'We talk through the idea, sketch the concept, pick the placement. Always free.' }
    ],
    featEyebrow: 'Selected work', featTitle: 'Signed pieces', featHint: 'keep scrolling — this section moves sideways',
    statsEyebrow: 'The studio in numbers', statsTitle: 'The needle never lies',
    quotesEyebrow: 'Words from clients', quotesTitle: 'What remains after the ink',
    ctaT1: 'Your skin.', ctaT2: 'Your story.',
    ctaP: 'Bring an idea, a memory, or just a direction. The consultation is free and the coffee is on the house.',
    ctaBtn: 'Let’s talk'
  },
  services: {
    eyebrow: 'Services', title: 'What these hands do',
    lead: 'Four crafts under one roof: tattooing, piercing, rescuing old tattoos, and the design that ties them together.',
    blocks: [
      { n: '01', t: 'Custom tattoos', d: 'There is no flash catalogue here. Every piece starts with your story and moves through sketches, feedback and revisions until it is unmistakably yours. One client at a time, no rushing.', chips: ['Fine line', 'Blackwork', 'Realism', 'Traditional', 'Geometric', 'Lettering'] },
      { n: '02', t: 'Professional piercing', d: 'Implant-grade titanium jewellery only (ASTM F-136), aseptic technique and healing instructions you can actually follow. From a first lobe to a fully curated ear.', chips: ['Lobe & Helix', 'Tragus', 'Conch', 'Industrial', 'Nostril', 'Septum', 'Eyebrow', 'Navel'] },
      { n: '03', t: 'Cover-up & rework', d: 'An old tattoo is not a life sentence. We assess honestly what can be covered, what deserves reworking, and when a few laser sessions should come first. Then we build something better on top.', chips: ['Honest assessment', 'Sketch over photo', 'Laser referrals', 'Old-line refresh'] },
      { n: '04', t: 'Consultation & design', d: 'One hour to talk idea, placement, size and budget. You leave with a clear direction and a booking — or at least an honest opinion. It costs nothing.', chips: ['Free', '45–60 min', 'Preliminary sketch', 'No strings'] }
    ],
    priceEyebrow: 'Ballpark', priceTitle: 'Starting prices',
    priceNote: 'Final pricing depends on size, complexity and placement — we settle it precisely at the consultation. Basic titanium jewellery is included with piercings.',
    afterEyebrow: 'Healing', afterTitle: 'Aftercare',
    afterTattoo: { t: 'After a tattoo', steps: ['Keep the wrap on for 2–4 hours, then wash gently with neutral soap.', 'Apply a thin layer of the recommended cream, 2–3 times a day.', 'No sun, pools or saunas for 3–4 weeks.', 'Do not scratch or peel the scabs — they fall off on their own.', 'Touch-ups are free within the first 3 months, if needed.'] },
    afterPiercing: { t: 'After a piercing', steps: ['Rinse with sterile saline solution twice a day.', 'Do not twist or touch the jewellery with unwashed hands.', 'Keep makeup and cosmetics away from the area.', 'Do not change the jewellery before it has fully healed.', 'Sleep on the opposite side until the area settles.'] },
    hygiene: ['Class-B autoclave', 'Single-use needles', 'REACH-compliant pigments', 'Implant-grade titanium', 'Surfaces disinfected between clients', '18+ with valid ID']
  },
  gallery: {
    eyebrow: 'Gallery', title: 'Ink & metal',
    lead: 'A selection of studio work. Touch an image to see it up close.',
    filters: { all: 'All', tattoo: 'Tattoos', piercing: 'Piercing', studio: 'Studio' },
    empty: 'Nothing here yet — try another filter.',
    counter: 'pieces shown'
  },
  artists: {
    eyebrow: 'The team', title: 'The hands behind the needle',
    lead: 'Four resident artists, four styles, the same obsession with detail.',
    exp: 'experience', works: 'works', spec: 'specialties',
    guestT: 'Guest spots', guestP: 'We regularly host guest artists from across Europe. If you tattoo and want to spend a week at Noir et Or, write to us.',
    guestBtn: 'Apply for a guest spot'
  },
  about: {
    eyebrow: 'About us', title: 'A decade of ink',
    lead: 'We started in a workshop the size of a closet and grew into one of Bucharest’s most respected studios. The short version:',
    valuesEyebrow: 'Principles', valuesTitle: 'What we believe',
    values: [
      { t: 'Hygiene without compromise', d: 'Class-B autoclave, single-use needles and cartridges, EU-compliant pigments. We check, log and archive — every single time.' },
      { t: 'Art, not an assembly line', d: 'At most two clients per artist per day. Good tattoos take time, and your time in the chair deserves our full attention.' },
      { t: 'Consent & comfort', d: 'We explain every step, pause whenever you need, and never work with anyone under 18. Your body, your rules.' }
    ],
    studioEyebrow: 'The space', studioTitle: 'Where it happens'
  },
  contact: {
    eyebrow: 'Contact', title: 'Let’s talk about skin',
    lead: 'Tell us what you have in mind. We reply within 24 hours, usually much faster.',
    fName: 'Your name', fEmail: 'Email', fPhone: 'Phone (optional)', fService: 'What are you after?',
    fOptions: ['New tattoo', 'Cover-up / rework', 'Piercing', 'Consultation / something else'],
    fMsg: 'Describe your idea — style, size, placement, any detail helps.',
    fBtn: 'Send message', fSending: 'Sending…',
    fOkT: 'Message staged!', fOk: 'This is a demo website — the form does not send data anywhere. On a live site, this would land straight in the studio inbox.',
    fSentT: 'Sent!', fSent: 'Thank you! We will get back to you within 24 hours.',
    fSendErr: 'The message could not be sent. Try again or email us directly.',
    fErr: 'Please fill in your name, email and message.',
    infoT: 'The studio', mapBtn: 'Open in Google Maps',
    hoursT: 'Hours', todayOpen: 'Today: open', todayClosed: 'Today: closed',
    walkIn: 'Bookings take priority. For piercings we also accept walk-ins, subject to availability.'
  }
}
};
