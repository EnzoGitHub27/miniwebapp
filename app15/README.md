# Sei Cappelli per Pensare

Web app per condurre sessioni con la tecnica dei **Sei Cappelli per Pensare** di Edward de Bono (1985).
Mobile-first, installabile come PWA, zero dipendenze e zero build step.

**Funziona così:** scrivi il tema, scegli modalità e timer, attraversi i cappelli uno alla volta
prendendo note, e alla fine ottieni una sintesi copiabile / esportabile in Markdown o stampabile in PDF.

## Cosa c'è dentro

- **Sequenza guidata** in 7 tappe (Blu → Bianco → Verde → Giallo → Nero → Rosso → Blu di sintesi),
  l'ordine consigliato da de Bono per sviluppare e valutare un'idea. In alternativa, **modalità libera**.
- **Timer per cappello** (off / 1 / 3 / 5 / 10 min) con avvio automatico a ogni tappa, suono e vibrazione a fine tempo.
- **Domande guida** a rotazione per ogni cappello, per sbloccare il gruppo quando si impunta.
- **Scheda di approfondimento** per ciascun cappello: ruolo, descrizione, domande tipiche, errori da evitare.
- **Sintesi** con statistiche, copia negli appunti, download `.md`, condivisione nativa su mobile, stampa/PDF.
- **Archivio sessioni** e ripresa dell'ultima sessione interrotta.
- Tema chiaro/scuro, colori che seguono il cappello attivo, funziona offline dopo la prima visita.

Le note **non lasciano il dispositivo**: tutto è salvato in `localStorage`, nessun backend, nessun tracciamento.

## Manuale d'uso

Il progetto include un **manuale completo** (`manuale.html`), raggiungibile dalla home dell'app e dal footer.
Spiega come formulare la domanda di partenza, cosa scrivere sotto ogni cappello (con esempi di note giuste e sbagliate),
come condurre un gruppo e come esportare la sintesi. Si scarica in due modi:

- **PDF** — il pulsante *Scarica in PDF* apre la stampa del sistema con un impaginato dedicato (10 pagine A4, senza sfondi né pulsanti);
- **Markdown** — `manuale.md`, la stessa guida in testo, scaricabile anche dal footer dell'app.

Per aggiornarlo, modifica **entrambi** i file (`manuale.html` per la versione web/PDF, `manuale.md` per quella testuale).

## File

| File | Ruolo |
|---|---|
| `index.html` | struttura delle quattro viste (home, sessione, sintesi, archivio) |
| `styles.css` | design system, temi, responsive, stile di stampa |
| `app.js` | contenuti dei cappelli, stato della sessione, timer, export |
| `manuale.html`, `manuale.css` | manuale d'uso consultabile e stampabile in PDF |
| `manuale.md` | stessa guida in Markdown, scaricabile |
| `sw.js` | service worker (HTML dalla rete, asset da cache) |
| `manifest.webmanifest`, `icon*.svg` | installazione come app |

## Sviluppo in locale

Sito statico puro: basta un server locale qualsiasi.

```bash
python3 -m http.server 4321   # poi apri http://localhost:4321
```

## Deploy

L'app fa parte della raccolta [Gilles Mini App Web](../index.html) e viene pubblicata come
sottocartella del sito: `https://miniwebapp.vercel.app/app15/`.

Per questo motivo **tutti i percorsi interni sono relativi** (`styles.css`, non `/styles.css`),
il manifest usa `"start_url": "./"` e `"scope": "./"`, e il service worker registra `sw.js`
risolvendolo rispetto alla propria posizione. Il service worker limita così il proprio scope
a `/app15/` senza interferire con le altre app della raccolta.

Non serve nessuna configurazione: ogni push sul repo `miniwebapp` genera in automatico
un nuovo deploy su Vercel, senza build command e senza framework.

> Se un domani volessi pubblicarla come progetto autonomo alla radice di un dominio,
> i percorsi relativi continuano a funzionare senza modifiche.

## Personalizzazione

- **Testi, domande e descrizioni dei cappelli**: oggetto `HATS` in cima a `app.js`.
- **Ordine delle tappe**: array `SEQUENCE` in `app.js`.
- **Colori e stile**: variabili CSS in `:root` (e `[data-theme="light"]`) in `styles.css`.

---

La tecnica dei Sei Cappelli per Pensare è di Edward de Bono. Questa app è uno strumento indipendente per applicarla.
