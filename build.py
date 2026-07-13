#!/usr/bin/env python3
import os

SRC = os.path.join(os.path.dirname(__file__), 'src')
DIST = os.path.join(os.path.dirname(__file__), 'dist')
os.makedirs(DIST, exist_ok=True)

def read(name):
    with open(os.path.join(SRC, name), encoding='utf-8') as f:
        return f.read()

head = read('head.html')
styles = read('styles-a.css') + '\n' + read('styles-b.css')
head = head.replace('{{STYLES}}', styles)

js_files = ['data.js', 'i18n.js', 'pages.js', 'webgl.js', 'app-core.js', 'app-view.js']
js = '\n;\n'.join(read(f) for f in js_files)

# Vendored libraries inlined directly — no CDN dependency, survives strict CSP
# contexts that block third-party script origins (and works offline/self-hosted).
vendors = ['vendor/gsap.min.js', 'vendor/ScrollTrigger.min.js', 'vendor/Flip.min.js', 'vendor/lenis.min.js']
vendor_js = '\n'.join('<script>' + read(v) + '</script>' for v in vendors)

html = head + vendor_js + '\n<script>\n' + js + '\n</script>\n</body>\n</html>\n'

out = os.path.join(DIST, 'index.html')
with open(out, 'w', encoding='utf-8') as f:
    f.write(html)

# also emit combined js for syntax checking
with open(os.path.join(DIST, 'bundle.js'), 'w', encoding='utf-8') as f:
    f.write(js)

print(f'OK -> {out} ({os.path.getsize(out)/1024:.1f} KB)')
