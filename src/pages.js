/* ============ VIEW TEMPLATES ============ */
const ICONS = {
  arrow: '<svg class="arr" viewBox="0 0 24 24" width="15" height="15"><path d="M4 12h15m-6-7 7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  wave: '<svg viewBox="0 0 40 24"><path d="M2 12h24m-6-6 6 6-6 6" fill="none" stroke="#d4a94a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 5v14" stroke="rgba(212,169,74,.4)" stroke-width="1"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 7v5l3.4 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  drop: '<svg viewBox="0 0 24 24"><path d="M12 3s6.5 7.1 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.1 12 3 12 3z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9.5 14.5a3 3 0 0 0 2.5 3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
  ring: '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="7.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="5.5" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3l7.5 3v5.6c0 4.6-3.2 7.7-7.5 9.4-4.3-1.7-7.5-4.8-7.5-9.4V6z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.8 12l2.3 2.3 4.2-4.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.6-4.7-9.3-9.3C1.4 7 3.6 4 6.7 4c2 0 3.8 1.1 5.3 3.2C13.5 5.1 15.3 4 17.3 4c3.1 0 5.3 3 4 6.7C19.6 15.3 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="M12 3.6l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.2 6.9 19l1.1-5.6L3.8 9.5l5.7-.7z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M4.5 12.5l5 5 10-11" fill="none" stroke="#d4a94a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 7.5l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
};

const SVG_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="gradStar" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3dc8f"/><stop offset="1" stop-color="#b98c3a"/></linearGradient>
<linearGradient id="gradGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e7a9"/><stop offset=".5" stop-color="#d4a94a"/><stop offset="1" stop-color="#8c6b2f"/></linearGradient>
</defs></svg>`;

/* --- helpers --- */
function knobSet(labels) {
  return labels.map(l => `<div class="knob-set"><div class="knob" data-knob style="--k:52px"></div><small>${l}</small></div>`).join('');
}
function vuMeter(stat, lang) {
  const ticks = [];
  for (let i = 0; i <= 12; i++) {
    const a = (-58 + i * (116 / 12)) * Math.PI / 180;
    const r1 = 70, r2 = i % 3 === 0 ? 60 : 64;
    const x1 = 100 + Math.sin(a) * r1, y1 = 92 - Math.cos(a) * r1;
    const x2 = 100 + Math.sin(a) * r2, y2 = 92 - Math.cos(a) * r2;
    ticks.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i >= 10 ? '#a5342b' : '#5c4a22'}" stroke-width="${i % 3 === 0 ? 2 : 1}"/>`);
  }
  return `
  <div class="vu" data-vu data-value="${stat.value}" data-max="${stat.max}" data-key="${stat.key}">
    <div class="vu-face">
      <svg viewBox="0 0 200 104">
        <path d="M30 92 A70 70 0 0 1 170 92" fill="none" stroke="#5c4a22" stroke-width="1.2"/>
        <path d="M141 35 A70 70 0 0 1 170 92" fill="none" stroke="#a5342b" stroke-width="3" opacity=".8"/>
        ${ticks.join('')}
        <text x="100" y="58" text-anchor="middle" style="font:600 9px Outfit;letter-spacing:.28em;fill:#8a7440">NOIR·ET·OR</text>
        <text x="100" y="100" text-anchor="middle" style="font:700 11px 'Cormorant Garamond';font-style:italic;fill:#6d5a2c">VU</text>
        <g class="vu-needle"><line x1="100" y1="92" x2="100" y2="26" stroke="#7d1f1a" stroke-width="2.6" stroke-linecap="round"/><circle cx="100" cy="92" r="5.5" fill="url(#gradGold)" stroke="#3a2c10"/></g>
      </svg>
    </div>
    <div class="vu-num" data-vu-num>0</div>
    <div class="vu-label">${stat.label[lang]}</div>
  </div>`;
}
function pageHead(t, routeKey, titleHtml, lead, bigword) {
  return `
  <section class="page-head">
    <div class="ph-bigword" data-bigword>${bigword}</div>
    <div class="wrap">
      <div class="ph-route" data-reveal>Noir et Or <span style="color:var(--gold)">✦</span> <b>${t.routes[routeKey]}</b></div>
      <div class="eyebrow" data-reveal>${t[routeKey].eyebrow}</div>
      <h1 class="h-big" data-split>${titleHtml}</h1>
      <p class="lead" data-reveal style="margin-top:26px">${lead}</p>
    </div>
    <div class="ph-deco">${knobSet(['gain', 'tone'])}</div>
  </section>`;
}
const ornament = `<div class="orna" data-reveal><svg viewBox="0 0 26 26"><path d="M13 2l2.6 8.4L24 13l-8.4 2.6L13 24l-2.6-8.4L2 13l8.4-2.6z" fill="none" stroke="url(#gradGold)" stroke-width="1"/></svg></div>`;

/* ============ HOME ============ */
function tplHome(t, lang) {
  const h = t.home;
  const mq = h.marquee.map(m => `<span class="mq-item">${m}</span>`).join('');
  const B = SITE_CONFIG.brand;
  const sealText = `${B.tagline[lang]} ✦ ${B.city} ✦ EST. ${B.est} ✦ `.toUpperCase();
  return `${SVG_DEFS}
  <section class="hero">
    <div class="hero-bigword" data-heroword>${B.bigword}</div>
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <div class="eyebrow" data-hero-fade>${h.eyebrow}</div>
        <h1 class="hero-title"><span class="l1" data-hero-line>${h.t1}</span><span class="l2" data-hero-line>${h.t2}</span></h1>
        <p class="hero-lead lead" data-hero-fade>${h.lead}</p>
        <div class="hero-ctas" data-hero-fade>
          <a class="btn btn-gold" href="#/contact" data-route="contact" data-magnet><span>${h.cta1}</span>${ICONS.arrow}</a>
          <a class="btn btn-line" href="#/gallery" data-route="gallery" data-magnet><span>${h.cta2}</span></a>
        </div>
      </div>
      <div class="hero-visual" data-hero-visual>
        <svg class="hero-seal" viewBox="0 0 120 120" data-seal>
          <g class="seal-rot">
            <path id="sealPath" d="M60 14 a46 46 0 1 1 -0.01 0" fill="none"/>
            <text><textPath href="#sealPath">${sealText}</textPath></text>
          </g>
          <circle cx="60" cy="60" r="30" fill="rgba(10,10,12,.85)" stroke="url(#gradGold)" stroke-width="1.2"/>
          <text x="60" y="66.5" text-anchor="middle" class="seal-core" fill="url(#gradGold)">${B.mark}</text>
        </svg>
        <div class="hero-photo">
          <div class="hp-in"><img src="${IMGS.hero}" alt="Portret cu tatuaje pe fundal negru" data-hero-img></div>
        </div>
        <div class="hero-knobs">${knobSet(['ink', 'gold'])}</div>
      </div>
    </div>
    <div class="wrap"><div class="hero-est" data-hero-fade>est. ${B.est}</div><div class="hero-scroll" data-hero-fade><span>${h.scroll}</span><span class="wheel"></span></div></div>
  </section>

  <div class="marquee" data-marquee><div class="mq-track">${mq}${mq}${mq}</div></div>

  <section class="sec">
    <div class="wrap craft-grid">
      <div class="craft-visual" data-reveal-media>
        <div class="craft-photo r-media"><img src="${IMGS.craft}" alt="Artist tatuator lucrând" data-parallax="12"><div class="r-veil"></div></div>
        <div class="craft-card" data-reveal><div class="knob" data-knob></div><div><b>Est. ${B.est}</b><small>${h.craftEyebrow} · ${B.city}</small></div></div>
      </div>
      <div class="craft-copy">
        <div class="eyebrow" data-reveal>${h.craftEyebrow}</div>
        <h2 class="h-mid" data-split>${h.craftTitle}</h2>
        <p data-reveal>${h.craftP1}</p>
        <p data-reveal>${h.craftP2}</p>
        <a class="btn btn-ghost" href="#/about" data-route="about" data-reveal><span>${h.craftLink}</span>${ICONS.arrow}</a>
      </div>
    </div>
  </section>

  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head">
        <div><div class="eyebrow" data-reveal>${h.svcEyebrow}</div><h2 class="h-mid" data-split>${h.svcTitle}</h2></div>
        <a class="btn btn-line" href="#/services" data-route="services" data-magnet data-reveal><span>${h.svcLink}</span>${ICONS.arrow}</a>
      </div>
      <div class="svc-grid" data-stagger>
        ${h.svcItems.map((s, i) => `
        <a class="svc-card" href="#/services" data-route="services">
          <div class="svc-media"><img src="${[IMGS.svcTattoo, IMGS.svcPiercing, IMGS.svcCover, IMGS.svcConsult][i]}" alt="${s.t}" loading="lazy"><span class="svc-num">0${i + 1}</span></div>
          <div class="svc-body"><h3>${s.t}</h3><p>${s.d}</p><span class="svc-go">${t.nav.services} ${ICONS.arrow}</span></div>
        </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="sec feat" style="padding-block:clamp(60px,7vw,100px)">
    <div class="feat-pin" data-feat-pin>
      <div class="wrap feat-head">
        <div><div class="eyebrow" data-reveal>${h.featEyebrow}</div><h2 class="h-mid" data-split>${h.featTitle}</h2></div>
        <div class="feat-hint" data-reveal>${ICONS.wave}<span>${h.featHint}</span></div>
      </div>
      <div class="feat-track" data-feat-track>
        ${FEATURED.map((f, i) => `
        <figure class="feat-card">
          <div class="feat-media"><img src="${f.img}" alt="${f.t[lang]}" loading="lazy" data-feat-img><span class="feat-num">0${i + 1}</span>
            <figcaption class="feat-meta"><span>${f.tag[lang]}</span><b>${f.t[lang]}</b></figcaption>
          </div>
        </figure>`).join('')}
        <div class="feat-end">
          ${ornament}
          <a class="btn btn-gold" href="#/gallery" data-route="gallery" data-magnet><span>${h.cta2}</span>${ICONS.arrow}</a>
        </div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="center-head sec-head" style="justify-content:center">
        <div class="center-head" style="width:100%"><div class="eyebrow center" data-reveal>${h.statsEyebrow}</div><h2 class="h-mid" data-split>${h.statsTitle}</h2></div>
      </div>
      <div class="stats-panel panel tolex-bg" data-reveal>
        <span class="stats-screws tl"></span><span class="stats-screws tr"></span><span class="stats-screws bl"></span><span class="stats-screws br"></span>
        <div class="stats-grid">${STATS.map(s => vuMeter(s, lang)).join('')}</div>
      </div>
    </div>
  </section>

  <section class="sec" style="padding-top:20px">
    <div class="wrap">
      <div class="center-head sec-head" style="justify-content:center">
        <div class="center-head" style="width:100%"><div class="eyebrow center" data-reveal>${h.quotesEyebrow}</div><h2 class="h-mid" data-split>${h.quotesTitle}</h2></div>
      </div>
      <div class="quotes-grid" data-stagger>
        ${QUOTES.map(q => `
        <div class="quote-card"><span class="qmark">„</span>
          <div class="quote-stars">${ICONS.star.repeat(5)}</div>
          <blockquote>${q.q[lang]}</blockquote>
          <div class="quote-who"><b>${q.name}</b><span>${q.piece[lang]}</span></div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="sec" style="padding-top:26px">
    <div class="wrap">
      <div class="cta-band" data-reveal>
        <div class="cta-bg"><img src="${IMGS.ctaBand}" alt="" data-parallax="14"></div>
        <span class="cta-ring"></span>
        <div class="cta-in">
          <h2 class="h-big" data-split>${h.ctaT1} <em>${h.ctaT2}</em></h2>
          <p class="lead">${h.ctaP}</p>
          <a class="btn btn-gold" href="#/contact" data-route="contact" data-magnet><span>${h.ctaBtn}</span>${ICONS.arrow}</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* ============ SERVICES ============ */
function tplServices(t, lang) {
  const s = t.services;
  const imgs = [IMGS.svcTattoo, IMGS.piercDetail, IMGS.svcCover, IMGS.svcHero];
  const alts = ['Tatuator lucrând cu mănuși', 'Piercing de ureche cu bijuterie aurie', 'Tatuaj mare pe spate', 'Pregătirea echipamentului de tatuat'];
  return `${SVG_DEFS}
  ${pageHead(t, 'services', s.title, s.lead, 'SERVICII')}
  <section class="sec" style="padding-top:10px">
    <div class="wrap">
      ${s.blocks.map((b, i) => `
      <div class="svcb ${i % 2 ? 'flip' : ''}">
        <div class="svcb-media" data-reveal-media><div class="gold-frame r-media"><div class="gf-in"><img src="${imgs[i]}" alt="${alts[i]}" loading="lazy" data-parallax="10"></div><div class="r-veil"></div></div></div>
        <div class="svcb-copy">
          <div class="svcb-num" data-reveal>${b.n}</div>
          <h3 data-split>${b.t}</h3>
          <p data-reveal>${b.d}</p>
          <div class="svcb-chips" data-stagger>${b.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>
        </div>
      </div>
      ${i < s.blocks.length - 1 ? `<div class="svc-divider">${ornament}</div>` : ''}`).join('')}
    </div>
  </section>

  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="price-panel panel tolex-bg" data-reveal>
        <div class="eyebrow" data-reveal>${s.priceEyebrow}</div>
        <h2 class="h-mid" data-split>${s.priceTitle}</h2>
        <div class="price-rows">
          ${PRICES.map(p => `<div class="price-row" data-reveal><span class="pr-name">${p.s[lang]}</span><span class="pr-dots"></span><span class="pr-val"><span class="pr-from">${t.misc.from}</span><span class="pr-price">${fmtInt(p.p)} ${p.unit}</span></span></div>`).join('')}
        </div>
        <p class="price-note">${s.priceNote}</p>
      </div>
    </div>
  </section>

  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="center-head sec-head" style="justify-content:center">
        <div class="center-head" style="width:100%"><div class="eyebrow center" data-reveal>${s.afterEyebrow}</div><h2 class="h-mid" data-split>${s.afterTitle}</h2></div>
      </div>
      <div class="after-grid" data-stagger>
        <div class="after-card panel"><h4><span style="color:var(--gold)">${ICONS.drop}</span>${s.afterTattoo.t}</h4><ol>${s.afterTattoo.steps.map((st, i) => `<li><i>${i + 1}</i><span>${st}</span></li>`).join('')}</ol></div>
        <div class="after-card panel"><h4><span style="color:var(--gold)">${ICONS.ring}</span>${s.afterPiercing.t}</h4><ol>${s.afterPiercing.steps.map((st, i) => `<li><i>${i + 1}</i><span>${st}</span></li>`).join('')}</ol></div>
      </div>
      <div class="hygiene-row" data-stagger>${s.hygiene.map(hy => `<span class="hyg">${ICONS.check}${hy}</span>`).join('')}</div>
    </div>
  </section>`;
}

/* ============ GALLERY ============ */
function tplGallery(t, lang) {
  const g = t.gallery;
  return `${SVG_DEFS}
  ${pageHead(t, 'gallery', g.title, g.lead, 'GALERIE')}
  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="filters" data-stagger>
        ${['all', 'tattoo', 'piercing', 'studio'].map((f, i) => `<button class="filter-chip ${i === 0 ? 'active' : ''}" data-filter="${f}">${g.filters[f]}</button>`).join('')}
      </div>
      <div class="g-count"><span data-gcount>${GALLERY.length}</span> ${g.counter}</div>
      <div class="g-grid" data-gallery>
        ${GALLERY.map((it, i) => `
        <figure class="g-item ${it.tall ? 'tall' : ''}" data-cat="${it.cat}" data-idx="${i}" tabindex="0" role="button" aria-label="${it.cap[lang]}">
          <img src="${it.img}" alt="${it.cap[lang]}" loading="lazy" crossorigin="anonymous">
          <div class="g-veil"></div>
          <figcaption class="g-meta"><span>${t.misc[it.cat]}</span><b>${it.cap[lang]}</b></figcaption>
        </figure>`).join('')}
        <div class="g-empty" style="display:none">${g.empty}</div>
      </div>
    </div>
  </section>`;
}

/* ============ ARTISTS ============ */
function tplArtists(t, lang) {
  const a = t.artists;
  return `${SVG_DEFS}
  ${pageHead(t, 'artists', a.title, a.lead, 'ECHIPA')}
  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="artists-grid" data-stagger>
        ${ARTISTS.map(ar => `
        <div class="artist-card" data-tilt>
          <div class="artist-in">
            <div class="artist-photo"><img src="${ar.img}" alt="${ar.name}" loading="lazy"></div>
            <div class="artist-body">
              <span class="artist-status" data-on="1"><span class="led"></span>${t.misc.available}</span>
              <h3>${ar.name}</h3>
              <div class="artist-role">${ar.role[lang]}</div>
              <p class="artist-bio">${ar.bio[lang]}</p>
              <div class="artist-chips">${ar.spec.map(sp => `<span class="chip">${sp[lang]}</span>`).join('')}</div>
              <div class="artist-stats">
                <div class="as"><b data-count="${ar.years}">0</b><small>${t.misc.years} · ${a.exp}</small></div>
                <span class="as-div"></span>
                <div class="as"><b data-count="${ar.works}" data-plus="1">0</b><small>${a.works}</small></div>
                <span class="as-div"></span>
                <div class="as"><b>${ar.rating.toFixed(1)}</b><small>★ ${t.misc.rating}</small></div>
              </div>
            </div>
          </div>
        </div>`).join('')}
      </div>
      <div class="guest-panel panel tolex-bg" data-reveal>
        <div><div class="eyebrow">${a.guestT}</div><h3>${a.guestT}</h3><p>${a.guestP}</p></div>
        <a class="btn btn-line" href="#/contact" data-route="contact" data-magnet><span>${a.guestBtn}</span>${ICONS.arrow}</a>
      </div>
    </div>
  </section>`;
}

/* ============ ABOUT ============ */
function tplAbout(t, lang) {
  const a = t.about;
  const vIcons = [ICONS.shield, ICONS.star, ICONS.heart];
  return `${SVG_DEFS}
  ${pageHead(t, 'about', a.title, a.lead, 'DESPRE')}
  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="r-media" data-reveal-media style="aspect-ratio:21/9;min-height:280px">
        <img src="${IMGS.aboutFront}" alt="Vitrina studioului" data-parallax="14" style="width:100%;height:118%;object-fit:cover">
        <div class="r-veil"></div>
      </div>
    </div>
  </section>
  <section class="sec" style="padding-top:14px">
    <div class="wrap">
      <div class="tl">
        ${TIMELINE.map(x => `<div class="tl-item" data-reveal><b>${x.y}</b><p>${x.t[lang]}</p></div>`).join('')}
      </div>
    </div>
  </section>
  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="center-head sec-head" style="justify-content:center">
        <div class="center-head" style="width:100%"><div class="eyebrow center" data-reveal>${a.valuesEyebrow}</div><h2 class="h-mid" data-split>${a.valuesTitle}</h2></div>
      </div>
      <div class="values-grid" data-stagger>
        ${a.values.map((v, i) => `<div class="value-card"><div class="v-ico">${vIcons[i]}</div><h4>${v.t}</h4><p>${v.d}</p></div>`).join('')}
      </div>
    </div>
  </section>
  <section class="sec" style="padding-top:0">
    <div class="wrap">
      <div class="sec-head"><div><div class="eyebrow" data-reveal>${a.studioEyebrow}</div><h2 class="h-mid" data-split>${a.studioTitle}</h2></div></div>
      <div class="studio-strip">
        <div class="studio-shot r-media" data-reveal-media><img src="${IMGS.aboutIn1}" alt="Interiorul studioului" data-parallax="10" loading="lazy"><div class="r-veil"></div></div>
        <div class="studio-shot tall r-media" data-reveal-media><img src="${IMGS.aboutIn3}" alt="Detaliu din studio" data-parallax="14" loading="lazy"><div class="r-veil"></div></div>
        <div class="studio-shot r-media" data-reveal-media><img src="${IMGS.aboutIn2}" alt="Sala principală" data-parallax="10" loading="lazy"><div class="r-veil"></div></div>
      </div>
    </div>
  </section>`;
}

/* ============ CONTACT ============ */
function tplContact(t, lang) {
  const c = t.contact;
  return `${SVG_DEFS}
  ${pageHead(t, 'contact', c.title, c.lead, 'CONTACT')}
  <section class="sec" style="padding-top:0">
    <div class="wrap contact-grid">
      <form class="form-panel panel tolex-bg" id="bookForm" novalidate data-reveal>
        <h3>${c.fService}</h3>
        <div class="field-row">
          <div class="field"><label for="fName">${c.fName} *</label><input id="fName" name="name" type="text" autocomplete="name"></div>
          <div class="field"><label for="fEmail">${c.fEmail} *</label><input id="fEmail" name="email" type="email" autocomplete="email"></div>
        </div>
        <div class="field-row">
          <div class="field"><label for="fPhone">${c.fPhone}</label><input id="fPhone" name="phone" type="tel" autocomplete="tel"></div>
          <div class="field"><label for="fService">${c.fService}</label>
            <select id="fService" name="service">${c.fOptions.map(o => `<option>${o}</option>`).join('')}</select>
          </div>
        </div>
        <div class="field"><label for="fMsg">${c.fMsg} *</label><textarea id="fMsg" name="message"></textarea></div>
        <button class="btn btn-gold" type="submit" data-magnet id="formBtn"><span>${c.fBtn}</span>${ICONS.arrow}</button>
        <div class="form-err" id="formErr">${c.fErr}</div>
        <div class="form-ok" id="formOk"><b>${ICONS.check} <span id="formOkT">${c.fOkT}</span></b><p id="formOkP">${c.fOk}</p></div>
      </form>
      <div class="info-stack">
        <div class="info-card panel" data-reveal>
          <h4>${ICONS.pin} ${c.infoT}</h4>
          <div class="big">${SITE_CONFIG.contact.address1}<br>${SITE_CONFIG.contact.address2}</div>
          <div class="dim">${SITE_CONFIG.contact.phone} · ${SITE_CONFIG.contact.email}</div>
          <a class="btn btn-line" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.contact.mapQuery)}" target="_blank" rel="noopener noreferrer"><span>${c.mapBtn}</span>${ICONS.arrow}</a>
        </div>
        <div class="info-card panel" data-reveal>
          <h4>${ICONS.clock} ${c.hoursT}</h4>
          ${hoursGroups(lang).map(g => `<div class="hours-row"><b>${g.label}</b><span>${g.open ? g.val : '—'}</span></div>`).join('')}
          <span class="open-led" id="openLed"><span class="led"></span><span id="openLedTxt"></span></span>
          <p class="contact-note">${c.walkIn}</p>
        </div>
      </div>
    </div>
  </section>`;
}

const TEMPLATES = { home: tplHome, services: tplServices, gallery: tplGallery, artists: tplArtists, about: tplAbout, contact: tplContact };
