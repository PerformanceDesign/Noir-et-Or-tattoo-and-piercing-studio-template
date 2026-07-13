/* ============ CUSTOM WEBGL HOVER DISPLACEMENT ============ */
const HoverFX = (() => {
  const VERT = `attribute vec2 aPos; varying vec2 vUv; void main(){ vUv = aPos*.5+.5; vUv.y = 1.-vUv.y; gl_Position = vec4(aPos,0.,1.); }`;
  const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uRes; uniform vec2 uIRes; uniform vec2 uMouse;
uniform float uTime; uniform float uP;

vec2 coverUv(vec2 uv){
  float rs = uRes.x/uRes.y, ri = uIRes.x/uIRes.y;
  vec2 n = rs < ri ? vec2(uIRes.x*uRes.y/uIRes.y, uRes.y) : vec2(uRes.x, uIRes.y*uRes.x/uIRes.x);
  vec2 off = (rs < ri ? vec2((n.x-uRes.x)/2., 0.) : vec2(0., (n.y-uRes.y)/2.)) / n;
  return uv * uRes / n + off;
}
void main(){
  vec2 uv = vUv;
  float p = uP;
  /* zoom subtil spre centru */
  uv = (uv - .5) * (1. - p*.055) + .5;
  /* val lichid */
  float t = uTime * 1.4;
  vec2 wave = vec2(
    sin(uv.y*11. + t) * .014 + sin(uv.y*23. - t*1.3) * .006,
    cos(uv.x*9.  + t*.8) * .012 + cos(uv.x*19. + t*1.1) * .005
  ) * p;
  /* umflare usoara catre cursor */
  vec2 toM = uv - uMouse;
  float d = length(toM);
  vec2 bulge = normalize(toM + 1e-5) * exp(-d*d*7.) * -.045 * p;
  vec2 fuv = coverUv(uv + wave + bulge);
  /* despartire RGB pe directia cursorului */
  vec2 shift = normalize(uMouse - .5 + 1e-5) * .006 * p;
  float r = texture2D(uTex, fuv + shift).r;
  float g = texture2D(uTex, fuv).g;
  float b = texture2D(uTex, fuv - shift).b;
  vec3 col = vec3(r, g, b);
  /* lift auriu cald */
  col = mix(col, col * vec3(1.07, 1.0, .88) + vec3(.03, .015, 0.), p * .4);
  gl_FragColor = vec4(col, 1.);
}`;
  const instances = new Set();

  class FX {
    constructor(host, imgEl) {
      this.host = host; this.img = imgEl; this.ok = false; this.p = 0; this.raf = null;
      this.mx = .5; this.my = .5; this.tx = .5; this.ty = .5; this.t0 = performance.now();
      const c = document.createElement('canvas');
      this.canvas = c; host.appendChild(c);
      const gl = c.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
      if (!gl) return;
      this.gl = gl;
      const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
      const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) return;
      const pr = gl.createProgram();
      gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
      gl.useProgram(pr); this.pr = pr;
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pr, 'aPos');
      gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      this.u = {
        res: gl.getUniformLocation(pr, 'uRes'), ires: gl.getUniformLocation(pr, 'uIRes'),
        mouse: gl.getUniformLocation(pr, 'uMouse'), time: gl.getUniformLocation(pr, 'uTime'), p: gl.getUniformLocation(pr, 'uP')
      };
      this.loadTexture();
      this.resize();
      this.ro = new ResizeObserver(() => this.resize());
      this.ro.observe(host);
      instances.add(this);
    }
    loadTexture() {
      const gl = this.gl, im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => {
        try {
          const tex = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.uniform2f(this.u.ires, im.naturalWidth, im.naturalHeight);
          this.ok = true;
          if (this.pOver) this.enter(this.lastEvt);
        } catch (e) { /* CORS taint — pastram fallback CSS */ }
      };
      im.src = this.img.currentSrc || this.img.src;
    }
    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = this.host.clientWidth, h = this.host.clientHeight;
      if (!w || !h) return;
      this.canvas.width = w * dpr; this.canvas.height = h * dpr;
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.uniform2f(this.u.res, this.canvas.width, this.canvas.height);
    }
    move(e) {
      const r = this.host.getBoundingClientRect();
      this.tx = (e.clientX - r.left) / r.width;
      this.ty = (e.clientY - r.top) / r.height;
      this.lastEvt = e;
    }
    enter(e) {
      this.pOver = true;
      if (e) this.move(e);
      if (!this.ok) return;
      this.host.classList.add('shader-on');
      if (window.gsap) gsap.to(this, { p: 1, duration: 1.05, ease: 'expo.out', overwrite: true });
      else this.p = 1;
      this.loop();
    }
    leave() {
      this.pOver = false;
      if (!this.ok) return;
      const done = () => { this.host.classList.remove('shader-on'); this.stop(); };
      if (window.gsap) gsap.to(this, { p: 0, duration: .8, ease: 'power3.out', overwrite: true, onComplete: done });
      else { this.p = 0; done(); }
    }
    loop() {
      if (this.raf) return;
      const step = () => {
        this.raf = null;
        if (!this.ok) return;
        this.mx += (this.tx - this.mx) * .085;
        this.my += (this.ty - this.my) * .085;
        const gl = this.gl;
        gl.uniform2f(this.u.mouse, this.mx, this.my);
        gl.uniform1f(this.u.time, (performance.now() - this.t0) / 1000);
        gl.uniform1f(this.u.p, this.p);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        if (this.p > .001 || this.pOver) this.raf = requestAnimationFrame(step);
      };
      this.raf = requestAnimationFrame(step);
    }
    stop() { if (this.raf) { cancelAnimationFrame(this.raf); this.raf = null; } }
    destroy() {
      this.stop();
      if (this.ro) this.ro.disconnect();
      try { const ext = this.gl && this.gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); } catch (e) {}
      if (this.canvas && this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
      instances.delete(this);
    }
  }

  return {
    attach(host, img) {
      if (host._fx) return host._fx;
      const fx = new FX(host, img);
      host._fx = fx;
      return fx;
    },
    destroyAll() { [...instances].forEach(i => i.destroy()); }
  };
})();
