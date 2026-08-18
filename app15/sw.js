/* Service worker minimale: HTML sempre dalla rete (niente deploy "fantasma"),
   asset statici da cache con aggiornamento in background. */
const CACHE = 'sei-cappelli-v3';
/* Percorsi relativi allo script: l'app vive in una sottocartella del sito. */
const ASSETS = ['./', './index.html', './styles.css', './app.js', './icon.svg', './manifest.webmanifest',
                './manuale.html', './manuale.css', './manuale.md'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
