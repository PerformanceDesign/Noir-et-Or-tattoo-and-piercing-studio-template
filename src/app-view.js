/* ============ PER-VIEW ANIMATIONS & COMPONENTS ============ */

/* split element text into word spans (keeps nested elements) */
function splitWords(el) {
  if (el._split) return $$('.w > .iw', el);
  el._split = true;
  const walk = node => {
    [...node.childNodes].forEach(ch => {
      if (ch.nodeType === 3) {
        const frag = document.createDocumentFragment();
        ch.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          w.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
          const iw = document.createElement('span'); iw.className = 'iw';
          iw.style.cssText = 'display:inline-block;will-change:transform;';
          iw.textContent = part;
          w.appendChild(iw); frag.appendChild(w);
        });
        node.replaceChild(frag, ch);
      } else if (ch.nodeType === 1 && !ch.classList.contains('w')) walk(ch);
    });
  };
  walk(el);
  return $$('.w > .iw', el);
}
function splitChars(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map(w =>
    `<span class="w">${[...w].map(c => `<span class="c">${c}</span>`).join('')}</span>`
  ).join(' ');
  return $$('.c', el);
}

function initView(route) {
  const view = $('#view');
  if (!HAS_GSAP) return;

  App.ctx = gsap.context(() => {
    const RM = REDUCED;

    /* ---- split headlines ---- */
    if (!RM) $$('[data-split]', view).forEach(el => {
      const words = splitWords(el);
      gsap.set(words, { yPercent: 115 });
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.15, stagger: .035, ease: 'power4.out' })
      });
    });

    /* ---- generic reveals ---- */
    const revealEls = $$('[data-reveal]', view);
    if (revealEls.length && !RM) {
      gsap.set(revealEls, { y: 36, autoAlpha: 0 });
      ScrollTrigger.batch(revealEls, {
        start: 'top 90%', once: true,
        onEnter: b => gsap.to(b, { y: 0, autoAlpha: 1, duration: 1, stagger: .09, ease: 'power3.out', overwrite: true })
      });
    }
    /* ---- stagger groups ---- */
    $$('[data-stagger]', view).forEach(group => {
      const kids = [...group.children];
      if (!kids.length || RM) return;
      gsap.set(kids, { y: 44, autoAlpha: 0 });
      ScrollTrigger.create({
        trigger: group, start: 'top 88%', once: true,
        onEnter: () => gsap.to(kids, { y: 0, autoAlpha: 1, duration: 1, stagger: .09, ease: 'power3.out' })
      });
    });
    /* ---- media reveals (veil sweep) ---- */
    $$('[data-reveal-media]', view).forEach(box => {
      const veil = $('.r-veil', box), img = $('img', box);
      if (RM) { if (veil) veil.style.display = 'none'; return; }
      if (veil) gsap.set(veil, { transformOrigin: '100% 50%' });
      ScrollTrigger.create({
        trigger: box, start: 'top 86%', once: true,
        onEnter: () => {
          if (veil) gsap.to(veil, { scaleX: 0, duration: 1.15, ease: 'power4.inOut' });
          if (img) gsap.fromTo(img, { scale: 1.28 }, { scale: 1.02, duration: 1.5, ease: 'power3.out' });
        }
      });
    });
    /* ---- parallax ---- */
    if (!RM) $$('[data-parallax]', view).forEach(img => {
      const v = parseFloat(img.dataset.parallax) || 10;
      gsap.fromTo(img, { yPercent: -v / 2 }, { yPercent: v / 2, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    /* ---- big outlined words drift ---- */
    if (!RM) $$('[data-bigword], [data-heroword]', view).forEach(el => {
      gsap.fromTo(el, { xPercent: 2 }, { xPercent: -7, ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    /* ---- knobs rotate with scroll ---- */
    const knobs = $$('[data-knob]', view);
    if (knobs.length && !RM) ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: self => {
        const r = self.scroll() * .28;
        knobs.forEach((k, i) => { k.style.transform = `rotate(${i % 2 ? -r : r}deg)`; });
      }
    });
    /* ---- counters ---- */
    $$('[data-count]', view).forEach(el => {
      const target = parseFloat(el.dataset.count), plus = el.dataset.plus === '1';
      const obj = { v: 0 };
      const fmt = v => fmtInt(v) + (plus ? '+' : '');
      if (RM) { el.textContent = fmt(target); return; }
      ScrollTrigger.create({
        trigger: el, start: 'top 92%', once: true,
        onEnter: () => gsap.to(obj, { v: target, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(obj.v); } })
      });
    });
    /* ---- VU meters ---- */
    $$('[data-vu]', view).forEach(vu => {
      const val = parseFloat(vu.dataset.value), max = parseFloat(vu.dataset.max), key = vu.dataset.key;
      const stat = STATS.find(s => s.key === key);
      const needle = $('.vu-needle', vu), num = $('[data-vu-num]', vu);
      const angle = -58 + 116 * Math.min(val / max, 1);
      gsap.set(needle, { svgOrigin: '100 92', rotation: -58 });
      const obj = { v: 0 };
      if (RM) { gsap.set(needle, { rotation: angle }); num.textContent = stat.fmt(val); return; }
      ScrollTrigger.create({
        trigger: vu, start: 'top 88%', once: true,
        onEnter: () => {
          gsap.to(needle, { rotation: angle, duration: 1.9, ease: 'elastic.out(1, .38)', onComplete: () => {
            gsap.to(needle, { rotation: '+=1.6', duration: 1.3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
          }});
          gsap.to(obj, { v: val, duration: 1.7, ease: 'power2.out', onUpdate: () => { num.textContent = stat.fmt(obj.v); } });
        }
      });
    });
    /* ---- marquee ---- */
    const mq = $('[data-marquee] .mq-track', view);
    if (mq && !RM) {
      const tween = gsap.to(mq, { xPercent: -33.333, duration: 28, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        onUpdate: self => {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 700, 2.6);
          gsap.to(tween, { timeScale: boost, duration: .25, overwrite: 'auto', onComplete: () => gsap.to(tween, { timeScale: 1, duration: 1.4, ease: 'power2.out' }) });
        }
      });
    }
    /* ---- featured horizontal pin ---- */
    const pin = $('[data-feat-pin]', view), track = $('[data-feat-track]', view);
    if (pin && track && !RM && window.innerWidth > 640) {
      const imgs = $$('[data-feat-img]', track);
      const amt = () => Math.max(track.scrollWidth - window.innerWidth + 60, 0);
      gsap.to(track, {
        x: () => -amt(), ease: 'none',
        scrollTrigger: {
          trigger: pin, start: 'top 12%', end: () => '+=' + amt(),
          pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: self => gsap.set(imgs, { xPercent: -6 + 12 * self.progress })
        }
      });
    }

    /* ---- route-specific ---- */
    if (route === 'home') initHero(view);
    if (route === 'gallery') initGallery(view);
    if (route === 'artists') initTilt(view);
    if (route === 'contact') initContact(view);

    initMagnets(view);
  }, view);
}

/* ---------- HERO intro ---------- */
function initHero(view) {
  const seal = $('[data-seal] .seal-rot', view);
  if (seal && !REDUCED) gsap.to(seal, { rotation: 360, svgOrigin: '60 60', duration: 26, ease: 'none', repeat: -1 });
  const lines = $$('[data-hero-line]', view);
  const fades = $$('[data-hero-fade]', view);
  const visual = $('[data-hero-visual]', view);
  const img = $('[data-hero-img]', view);
  if (REDUCED) return;
  const chars = [];
  lines.forEach(l => chars.push(splitChars(l)));
  const tl = gsap.timeline({ paused: App.firstLoad, delay: App.firstLoad ? 0 : .55 });
  tl.from(fades, { y: 26, autoAlpha: 0, duration: 1, stagger: .1, ease: 'power3.out' }, 0);
  chars.forEach((set, i) => tl.from(set, { yPercent: 118, duration: 1.25, stagger: .022, ease: 'power4.out' }, .12 + i * .14));
  if (visual) tl.fromTo(visual, { clipPath: 'inset(8% 10% 62% 10% round 30px)', autoAlpha: 0 }, { clipPath: 'inset(-8% -14% -8% -14% round 30px)', autoAlpha: 1, duration: 1.5, ease: 'power4.inOut', clearProps: 'clipPath' }, .25);
  if (img) tl.from(img, { scale: 1.35, duration: 2, ease: 'power3.out' }, .3);
  if (img && App.lenis) gsap.to(img, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: view.querySelector('.hero'), start: 'top top', end: 'bottom top', scrub: true } });
  App.introTl = tl;
}

/* ---------- GALLERY ---------- */
let lbList = [], lbIdx = 0;
function initGallery(view) {
  const grid = $('[data-gallery]', view);
  const items = $$('.g-item', view);
  const empty = $('.g-empty', view);
  const countEl = $('[data-gcount]', view);
  const visible = () => items.filter(el => el.style.display !== 'none');

  /* entrance */
  if (!REDUCED) {
    gsap.set(items, { y: 60, autoAlpha: 0, scale: .96 });
    ScrollTrigger.batch(items, {
      start: 'top 94%', once: true,
      onEnter: b => gsap.to(b, { y: 0, autoAlpha: 1, scale: 1, duration: 1, stagger: .06, ease: 'power3.out', overwrite: true })
    });
  }

  /* filters */
  $$('.filter-chip', view).forEach(chip => chip.addEventListener('click', () => {
    if (chip.classList.contains('active')) return;
    $$('.filter-chip', view).forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    const match = el => f === 'all' || el.dataset.cat === f;
    const doFilter = () => {
      let n = 0;
      items.forEach(el => { const m = match(el); el.style.display = m ? '' : 'none'; if (m) n++; });
      empty.style.display = n ? 'none' : '';
      countEl.textContent = n;
    };
    if (typeof Flip !== 'undefined' && !REDUCED) {
      const state = Flip.getState(items);
      doFilter();
      Flip.from(state, {
        duration: .8, ease: 'power3.inOut', stagger: .012, absolute: true, scale: true,
        onEnter: els => gsap.fromTo(els, { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .55, ease: 'power2.out' }),
        onLeave: els => gsap.to(els, { opacity: 0, scale: .9, duration: .35, ease: 'power2.in' }),
        onComplete: () => ScrollTrigger.refresh()
      });
    } else { doFilter(); if (HAS_GSAP) ScrollTrigger.refresh(); }
  }));

  /* webgl hover shaders */
  if (FINE && !REDUCED) {
    items.forEach(item => {
      const img = $('img', item);
      item.addEventListener('pointerenter', e => { const fx = HoverFX.attach(item, img); fx.enter(e); });
      item.addEventListener('pointermove', e => { if (item._fx) item._fx.move(e); });
      item.addEventListener('pointerleave', () => { if (item._fx) item._fx.leave(); });
    });
  }

  /* lightbox open */
  items.forEach(item => {
    const open = () => {
      const vis = visible();
      openLightbox(vis, vis.indexOf(item));
    };
    item.addEventListener('click', open);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

/* ---------- LIGHTBOX (global chrome) ---------- */
function fillLightbox(el) {
  const data = GALLERY[parseInt(el.dataset.idx, 10)];
  const t = dict();
  $('#lbImg').src = data.full;
  $('#lbImg').alt = data.cap[App.lang];
  $('#lbCat').textContent = t.misc[data.cat];
  $('#lbTitle').textContent = data.cap[App.lang];
  $('#lbCount').textContent = `${lbIdx + 1} / ${lbList.length}`;
}
function openLightbox(list, idx) {
  lbList = list; lbIdx = Math.max(idx, 0);
  const lb = $('#lightbox');
  fillLightbox(lbList[lbIdx]);
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  scrollLock(true);
  if (HAS_GSAP && !REDUCED) {
    gsap.fromTo('#lbBackdrop', { opacity: 0 }, { opacity: 1, duration: .45 });
    gsap.fromTo('.lb-stage', { opacity: 0, scale: .93, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: .6, ease: 'power3.out' });
    gsap.fromTo('.lb-btn', { opacity: 0 }, { opacity: 1, duration: .4, stagger: .06, delay: .15 });
  } else { $('#lbBackdrop').style.opacity = 1; }
}
function stepLightbox(dir) {
  if (!lbList.length) return;
  lbIdx = (lbIdx + dir + lbList.length) % lbList.length;
  const img = $('#lbImg');
  if (HAS_GSAP && !REDUCED) {
    gsap.to('.lb-stage', { opacity: 0, x: -26 * dir, duration: .22, ease: 'power2.in', onComplete: () => {
      fillLightbox(lbList[lbIdx]);
      gsap.fromTo('.lb-stage', { opacity: 0, x: 26 * dir }, { opacity: 1, x: 0, duration: .4, ease: 'power2.out' });
    }});
  } else fillLightbox(lbList[lbIdx]);
}
function closeLightbox(immediate) {
  const lb = $('#lightbox');
  if (!lb.classList.contains('open')) return;
  const done = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); $('#lbImg').src = ''; };
  scrollLock(false);
  if (immediate || !HAS_GSAP || REDUCED) { done(); return; }
  gsap.to('#lbBackdrop', { opacity: 0, duration: .35 });
  gsap.to('.lb-stage', { opacity: 0, scale: .95, duration: .3, ease: 'power2.in', onComplete: done });
}
$('#lbPrev').addEventListener('click', () => stepLightbox(-1));
$('#lbNext').addEventListener('click', () => stepLightbox(1));
$('#lbClose').addEventListener('click', () => closeLightbox());
$('#lbBackdrop').addEventListener('click', () => closeLightbox());
/* touch swipe navigation in the lightbox */
(function () {
  const lb = $('#lightbox');
  let sx = 0, sy = 0;
  lb.addEventListener('touchstart', e => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) stepLightbox(dx < 0 ? 1 : -1);
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.6) closeLightbox();
  }, { passive: true });
})();
window.addEventListener('keydown', e => {
  if (!$('#lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

/* ---------- ARTISTS tilt ---------- */
function initTilt(view) {
  if (!FINE || REDUCED) return;
  $$('[data-tilt]', view).forEach(card => {
    const qx = gsap.quickTo(card, 'rotationX', { duration: .6, ease: 'power3.out' });
    const qy = gsap.quickTo(card, 'rotationY', { duration: .6, ease: 'power3.out' });
    gsap.set(card, { transformPerspective: 1000 });
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      qx(((e.clientY - r.top) / r.height - .5) * -6);
      qy(((e.clientX - r.left) / r.width - .5) * 7);
    });
    card.addEventListener('pointerleave', () => { qx(0); qy(0); });
  });
}

/* ---------- CONTACT ---------- */
function initContact(view) {
  /* open/closed LED — driven by SITE_CONFIG.hours + timezone */
  const led = $('#openLed', view), txt = $('#openLedTxt', view);
  if (led) {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: SITE_CONFIG.timezone, weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date());
      const wd = parts.find(p => p.type === 'weekday').value;
      const h = parseInt(parts.find(p => p.type === 'hour').value, 10);
      const dayIdx = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[wd];
      const win = SITE_CONFIG.hours[dayIdx];
      const open = !!win && h >= win[0] && h < win[1];
      led.classList.add(open ? 'on' : 'off');
      txt.textContent = open ? dict().contact.todayOpen : dict().contact.todayClosed;
    } catch (e) { led.style.display = 'none'; }
  }
  /* contact form — demo mode, or real POST when SITE_CONFIG.form.endpoint is set */
  const form = $('#bookForm', view);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const t = dict().contact;
    const name = $('#fName', form).value.trim();
    const email = $('#fEmail', form).value.trim();
    const msg = $('#fMsg', form).value.trim();
    const err = $('#formErr', form), ok = $('#formOk', form), btn = $('#formBtn', form);
    const okT = $('#formOkT', form), okP = $('#formOkP', form);
    const valid = name && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && msg;
    if (!valid) {
      err.textContent = t.fErr;
      err.classList.add('show'); ok.classList.remove('show');
      if (HAS_GSAP && !REDUCED) gsap.fromTo(form, { x: 0 }, { x: 9, duration: .07, repeat: 5, yoyo: true, ease: 'none', clearProps: 'x' });
      return;
    }
    err.classList.remove('show');
    btn.querySelector('span').textContent = t.fSending;
    btn.style.pointerEvents = 'none';
    const finish = (success, realSend) => {
      btn.querySelector('span').textContent = t.fBtn;
      btn.style.pointerEvents = '';
      if (success) {
        if (realSend) { okT.textContent = t.fSentT; okP.textContent = t.fSent; }
        ok.classList.add('show');
        form.reset();
        if (HAS_GSAP && !REDUCED) gsap.from(ok, { y: 14, autoAlpha: 0, duration: .6, ease: 'power3.out' });
      } else {
        err.textContent = t.fSendErr;
        err.classList.add('show');
      }
    };
    const endpoint = (SITE_CONFIG.form.endpoint || '').trim();
    if (endpoint) {
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(r => finish(r.ok, true))
        .catch(() => finish(false, true));
    } else {
      setTimeout(() => finish(true, false), 850);
    }
  });
}

/* ============ BOOT ============ */
(function boot() {
  initLenis();
  initCursor();
  initNavScroll();
  initMagnets(document);
  const initial = (location.hash.replace(/^#\//, '') || 'home').split('?')[0];
  render(TEMPLATES[initial] ? initial : 'home');
  runPreloader(() => {
    App.firstLoad = false;
    if (App.introTl) App.introTl.play();
  });
  window.addEventListener('load', () => { if (HAS_GSAP) ScrollTrigger.refresh(); });
  let rT;
  window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { if (HAS_GSAP) ScrollTrigger.refresh(); }, 250); });
})();
