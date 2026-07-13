/* ============ CORE RUNTIME — state, lenis, cursor, router, transitions ============ */
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(pointer: fine)').matches && window.innerWidth > 900;
const HAS_GSAP = typeof gsap !== 'undefined';
if (HAS_GSAP) {
  gsap.registerPlugin(ScrollTrigger);
  if (typeof Flip !== 'undefined') gsap.registerPlugin(Flip);
}

const App = {
  lang: SITE_CONFIG.defaultLang === 'en' ? 'en' : 'ro',
  route: 'home',
  firstLoad: true,
  lenis: null,
  ctx: null,
  busy: false
};
try { const saved = localStorage.getItem('no-lang'); if (saved === 'en' || saved === 'ro') App.lang = saved; } catch (e) {}

/* favicon + meta description from SITE_CONFIG (runs once) */
(function brandHead() {
  const B = SITE_CONFIG.brand;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0a0a0c'/><circle cx='32' cy='32' r='25' fill='none' stroke='#d4a94a' stroke-width='2'/><text x='32' y='40' font-family='Georgia,serif' font-weight='700' font-size='19' fill='#e8c96b' text-anchor='middle'>${B.mark}</text></svg>`;
  const link = document.createElement('link');
  link.rel = 'icon'; link.type = 'image/svg+xml';
  link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
  document.head.appendChild(link);
  const md = document.querySelector('meta[name="description"]');
  if (md) md.content = `${B.name} — ${B.tagline.ro} · ${B.city}`;
})();

const $ = (s, sc) => (sc || document).querySelector(s);
const $$ = (s, sc) => [...(sc || document).querySelectorAll(s)];
const dict = () => I18N[App.lang];
const path = (obj, p) => p.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

/* ---------- smooth scroll ---------- */
function initLenis() {
  if (REDUCED || typeof Lenis === 'undefined' || !HAS_GSAP) return;
  App.lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  App.lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => App.lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
function scrollTop(immediate) {
  if (App.lenis) App.lenis.scrollTo(0, { immediate: !!immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}
function scrollLock(on) {
  if (App.lenis) { on ? App.lenis.stop() : App.lenis.start(); }
  document.documentElement.style.overflow = on ? 'hidden' : '';
}

/* ---------- custom cursor ---------- */
function initCursor() {
  if (!FINE || REDUCED || !HAS_GSAP) { $('.cursor').style.display = 'none'; document.body.style.cursor = 'auto'; return; }
  const cur = $('.cursor'), label = $('#cursorLabel');
  const dx = gsap.quickTo('#cursorDot', 'x', { duration: .08, ease: 'power2.out' });
  const dy = gsap.quickTo('#cursorDot', 'y', { duration: .08, ease: 'power2.out' });
  const rx = gsap.quickTo('#cursorRing', 'x', { duration: .38, ease: 'power3.out' });
  const ry = gsap.quickTo('#cursorRing', 'y', { duration: .38, ease: 'power3.out' });
  window.addEventListener('pointermove', e => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); cur.classList.remove('is-hidden'); });
  document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
  window.addEventListener('pointerdown', () => cur.classList.add('is-down'));
  window.addEventListener('pointerup', () => cur.classList.remove('is-down'));
  document.addEventListener('pointerover', e => {
    const media = e.target.closest('.g-item, .feat-card');
    const link = e.target.closest('a, button, [data-magnet], .knob, .lang-toggle');
    if (media) { label.textContent = dict().cursor.view; cur.classList.add('is-media'); cur.classList.remove('is-link'); }
    else if (link) { cur.classList.add('is-link'); cur.classList.remove('is-media'); }
    else cur.classList.remove('is-link', 'is-media');
  });
}

/* ---------- magnetic elements ---------- */
function initMagnets(scope) {
  if (!FINE || REDUCED || !HAS_GSAP) return;
  $$('[data-magnet]', scope).forEach(el => {
    if (el._mag) return; el._mag = true;
    const qx = gsap.quickTo(el, 'x', { duration: .45, ease: 'power3.out' });
    const qy = gsap.quickTo(el, 'y', { duration: .45, ease: 'power3.out' });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * .32);
      qy((e.clientY - (r.top + r.height / 2)) * .32);
    });
    el.addEventListener('pointerleave', () => { qx(0); qy(0); });
  });
}

/* ---------- i18n static chrome + SITE_CONFIG fills ---------- */
function applyStatic() {
  const d = dict();
  document.documentElement.lang = App.lang;
  $$('[data-i18n]').forEach(el => {
    const v = path(d, el.dataset.i18n);
    if (typeof v === 'string') el.textContent = v;
  });
  $('#langToggle').dataset.lang = App.lang;
  $$('.nav-links a, .menu-links a, .footer [data-route]').forEach(a => {
    a.classList.toggle('active', a.dataset.route === App.route);
  });
  /* config-driven chrome */
  const CFG = SITE_CONFIG, B = CFG.brand;
  document.title = `${B.name} — ${B.tagline[App.lang]} · ${B.city}`;
  const map = {
    name: B.name, mark: B.mark, tagline: B.tagline[App.lang], city: B.city,
    year: String(new Date().getFullYear()),
    address1: CFG.contact.address1, address2: CFG.contact.address2,
    phone: CFG.contact.phone, email: CFG.contact.email
  };
  $$('[data-cfg]').forEach(el => {
    const k = el.dataset.cfg;
    if (map[k] != null) el.textContent = map[k];
    if (k === 'phone') el.href = 'tel:' + CFG.contact.phone.replace(/[^+\d]/g, '');
    if (k === 'email') el.href = 'mailto:' + CFG.contact.email;
  });
  $$('[data-cfg-social]').forEach(a => {
    const url = CFG.contact.socials[a.dataset.cfgSocial];
    if (url) { a.href = url; a.style.display = ''; } else a.style.display = 'none';
  });
  const groups = hoursGroups(App.lang);
  const fh = $('#fHours');
  if (fh) fh.innerHTML = groups.map(g => `<span>${g.label} · ${g.val}</span>`).join('');
  const mh = $('#menuHours');
  if (mh) { const g0 = groups.find(g => g.open); mh.textContent = g0 ? `${g0.label} · ${g0.val}` : ''; }
  if (!CFG.demoNote) {
    const dt = $('#demoTag'); if (dt) dt.style.display = 'none';
    const inote = $('#imgNote'); if (inote) inote.style.display = 'none';
  }
  const st = $('#sealTxt'); if (st) st.textContent = B.mark;
  const pm = $('#preMono'); if (pm) pm.textContent = B.mark;
  const im = $('#inkMono'); if (im) im.textContent = B.mark;
  const pw = $('#preWord'); if (pw && !pw._set) { pw.textContent = B.name.toUpperCase(); pw._set = true; }
}

/* ---------- render ---------- */
function disposeView() {
  if (App.ctx) { App.ctx.revert(); App.ctx = null; }
  if (HAS_GSAP) ScrollTrigger.getAll().forEach(st => st.kill());
  if (typeof HoverFX !== 'undefined') HoverFX.destroyAll();
  closeLightbox(true);
}
function render(route) {
  const view = $('#view');
  disposeView();
  App.route = route;
  view.innerHTML = TEMPLATES[route](dict(), App.lang);
  applyStatic();
  initView(route);
  const imgs = $$('img', view).filter(i => !i.complete);
  if (imgs.length && HAS_GSAP) {
    let left = imgs.length;
    imgs.forEach(i => i.addEventListener('load', () => { if (--left <= 2) ScrollTrigger.refresh(); }, { once: true }));
    setTimeout(() => ScrollTrigger.refresh(), 1200);
  }
}

/* ---------- ink transition ---------- */
function navigate(route, opts = {}) {
  if (!TEMPLATES[route]) route = 'home';
  if (App.busy) return;
  if (route === App.route && !opts.force) { scrollTop(); return; }
  closeMenu();
  if (location.hash !== '#/' + route) { App._silent = true; location.hash = '#/' + route; }

  if (!HAS_GSAP || REDUCED) { render(route); scrollTop(true); return; }

  App.busy = true;
  const ov = $('#inkTransition'), fill = $('#inkFill'), mark = $('#inkMark');
  $('#inkRoute').textContent = dict().routes[route];
  const x = opts.x != null ? opts.x : window.innerWidth / 2;
  const y = opts.y != null ? opts.y : window.innerHeight / 2;
  ov.style.setProperty('--ix', (x / window.innerWidth * 100) + '%');
  ov.style.setProperty('--iy', (y / window.innerHeight * 100) + '%');
  ov.classList.add('on');
  const R = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) / Math.min(window.innerWidth, window.innerHeight) * 115 + 12;

  const tl = gsap.timeline({ onComplete: () => { ov.classList.remove('on'); App.busy = false; } });
  tl.fromTo(fill, { clipPath: `circle(0% at var(--ix) var(--iy))` }, { clipPath: `circle(${R}% at var(--ix) var(--iy))`, duration: .72, ease: 'power4.in' })
    .fromTo(mark, { opacity: 0, scale: .92 }, { opacity: 1, scale: 1, duration: .4, ease: 'power2.out' }, '-=.28')
    .add(() => { render(route); scrollTop(true); }, '+=.12')
    .to(mark, { opacity: 0, scale: 1.05, duration: .32, ease: 'power2.in' }, '+=.3')
    .to(fill, { clipPath: `circle(0% at var(--ix) var(--iy))`, duration: .8, ease: 'power4.inOut' }, '-=.08');
}

/* ---------- global click routing ---------- */
document.addEventListener('click', e => {
  const a = e.target.closest('[data-route]');
  if (!a) return;
  e.preventDefault();
  navigate(a.dataset.route, { x: e.clientX, y: e.clientY });
});
window.addEventListener('hashchange', () => {
  if (App._silent) { App._silent = false; return; }
  const r = (location.hash.replace(/^#\//, '') || 'home').split('?')[0];
  navigate(r);
});

/* ---------- language toggle ---------- */
function switchLang(to) {
  if (to === App.lang) return;
  App.lang = to;
  try { localStorage.setItem('no-lang', to); } catch (e) {}
  const view = $('#view');
  if (HAS_GSAP && !REDUCED) {
    gsap.to(view, { opacity: 0, y: 14, duration: .28, ease: 'power2.in', onComplete: () => {
      const sy = window.scrollY;
      render(App.route);
      window.scrollTo(0, Math.min(sy, document.body.scrollHeight));
      gsap.fromTo(view, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: .5, ease: 'power2.out', onComplete: () => ScrollTrigger.refresh() });
    }});
  } else { render(App.route); }
}
$('#langToggle').addEventListener('click', () => switchLang(App.lang === 'ro' ? 'en' : 'ro'));

/* ---------- mobile menu ---------- */
let menuOpen = false;
function openMenu() {
  if (menuOpen) return; menuOpen = true;
  const m = $('#menu'); m.classList.add('open');
  $('#burger').classList.add('open');
  $('#burger').setAttribute('aria-expanded', 'true');
  scrollLock(true);
  if (!HAS_GSAP || REDUCED) { $('.menu-bg').style.clipPath = 'circle(150% at calc(100% - 60px) 42px)'; $$('.menu-links a, .menu-foot').forEach(x => { x.style.opacity = 1; x.style.transform = 'none'; }); return; }
  gsap.to('.menu-bg', { clipPath: 'circle(160% at calc(100% - 60px) 42px)', duration: .85, ease: 'power4.inOut' });
  gsap.to('.menu-links a', { opacity: 1, y: 0, duration: .7, stagger: .07, delay: .28, ease: 'power3.out' });
  gsap.to('.menu-foot', { opacity: 1, duration: .5, delay: .7 });
}
function closeMenu() {
  if (!menuOpen) return; menuOpen = false;
  const m = $('#menu');
  $('#burger').classList.remove('open');
  $('#burger').setAttribute('aria-expanded', 'false');
  scrollLock(false);
  if (!HAS_GSAP || REDUCED) { m.classList.remove('open'); $('.menu-bg').style.clipPath = 'circle(0% at calc(100% - 60px) 42px)'; return; }
  gsap.to('.menu-links a', { opacity: 0, y: 34, duration: .3, stagger: .03, ease: 'power2.in' });
  gsap.to('.menu-foot', { opacity: 0, duration: .25 });
  gsap.to('.menu-bg', { clipPath: 'circle(0% at calc(100% - 60px) 42px)', duration: .6, delay: .12, ease: 'power4.inOut', onComplete: () => m.classList.remove('open') });
}
$('#burger').addEventListener('click', () => menuOpen ? closeMenu() : openMenu());

/* ---------- nav behaviour + progress ---------- */
function initNavScroll() {
  const nav = $('#nav'), bar = $('#progressBar');
  let lastY = 0;
  const onScroll = (y) => {
    nav.classList.toggle('scrolled', y > 60);
    if (y > 500 && y > lastY + 6 && !menuOpen) nav.classList.add('away');
    else if (y < lastY - 4 || y < 120) nav.classList.remove('away');
    lastY = y;
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  };
  if (App.lenis) App.lenis.on('scroll', e => onScroll(e.scroll));
  else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
}

/* ---------- preloader ---------- */
function runPreloader(done) {
  const pre = $('#preloader');
  if (!HAS_GSAP || REDUCED) { pre.style.display = 'none'; done(); return; }
  const count = { v: 0 };
  const tl = gsap.timeline();
  tl.fromTo('#preloader .pre-word', { opacity: 0, letterSpacing: '.6em' }, { opacity: 1, letterSpacing: '.34em', duration: 1.1, ease: 'power3.out' }, 0)
    .fromTo('#preloader .pre-seal', { opacity: 0, rotate: -40, scale: .8 }, { opacity: 1, rotate: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, 0)
    .to(count, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => {
      $('#preCount').textContent = String(Math.round(count.v)).padStart(2, '0');
      $('#preBar').style.transform = `scaleX(${count.v / 100})`;
    } }, .15)
    .to(pre, { yPercent: -100, duration: .9, ease: 'power4.inOut', delay: .1, onComplete: () => { pre.style.display = 'none'; } })
    .add(done, '-=.55');
}
