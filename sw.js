/* ============================================================
   Mini Web App — service worker della raccolta
   ------------------------------------------------------------
   Tiene in cache il guscio comune (stili, script, font, icone)
   cosi' le app si aprono anche senza rete.

   Strategie:
     - pagine e registro    -> prima la rete, la cache come rete di sicurezza
       (cosi' una modifica si vede subito, ma offline il sito resta in piedi)
     - stili, script, font -> prima la cache, aggiornata in sottofondo
     - immagini            -> prima la cache

   Per pubblicare una modifica al guscio basta cambiare VERSIONE.
   app15 ha un proprio service worker: le sue pagine non passano di qui.
   ============================================================ */

const VERSIONE = 'mwa-v1';
const GUSCIO = 'guscio-' + VERSIONE;
const CORRENTE = 'corrente-' + VERSIONE;

const DA_PRECARICARE = [
  './',
  './index.html',
  './assets/base.css',
  './assets/shell.js',
  './assets/theme-init.js',
  './assets/charts.js',
  './assets/apps.js',
  './assets/fonts/inter-latin-var.woff2',
  './assets/fonts/outfit-latin-var.woff2',
  './assets/icon.svg',
  './assets/icon-192.png',
  './manifest.webmanifest'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(GUSCIO)
      // addAll fallisce tutto se un solo file manca: meglio uno alla volta
      .then((cache) => Promise.allSettled(
        DA_PRECARICARE.map((url) => cache.add(url))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((chiavi) => Promise.all(
        chiavi
          // via tutto quello che appartiene a una versione precedente
          .filter((k) => (k.startsWith('guscio-') || k.startsWith('corrente-'))
                         && !k.endsWith(VERSIONE))
          .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const richiesta = evento.request;
  if (richiesta.method !== 'GET') return;

  const url = new URL(richiesta.url);
  if (url.origin !== self.location.origin) return;   // niente di terzi, ma per sicurezza
  if (url.pathname.startsWith('/app15/')) return;    // app15 ha il suo service worker

  const eUnaPagina = richiesta.mode === 'navigate';
  const eIlRegistro = url.pathname.endsWith('/assets/apps.js');

  if (eUnaPagina || eIlRegistro) {
    evento.respondWith(reteConRipiego(richiesta));
    return;
  }

  evento.respondWith(cacheConAggiornamento(richiesta));
});

/* Prima la rete. Se non c'e', si ripiega su quello che abbiamo. */
async function reteConRipiego(richiesta) {
  try {
    const risposta = await fetch(richiesta);
    if (risposta && risposta.ok) {
      const cache = await caches.open(CORRENTE);
      cache.put(richiesta, risposta.clone());
    }
    return risposta;
  } catch (e) {
    const salvata = await caches.match(richiesta);
    if (salvata) return salvata;
    if (richiesta.mode === 'navigate') {
      const home = await caches.match('./index.html');
      if (home) return home;
    }
    return new Response('Non raggiungibile e non presente in cache.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

/* Prima la cache, e intanto si controlla se e' cambiato qualcosa. */
async function cacheConAggiornamento(richiesta) {
  const cache = await caches.open(GUSCIO);
  const salvata = await cache.match(richiesta);

  const aggiornamento = fetch(richiesta)
    .then((risposta) => {
      if (risposta && risposta.ok) cache.put(richiesta, risposta.clone());
      return risposta;
    })
    .catch(() => null);

  return salvata || aggiornamento.then((r) => r || new Response('', { status: 504 }));
}
