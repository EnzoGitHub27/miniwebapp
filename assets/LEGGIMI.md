# Come aggiungere o modificare una mini app

Tutto quello che è comune a tutte le app sta in `assets/`. Le singole app
contengono solo quello che le rende diverse: il testo, i dati, la logica.

## Aggiungere una nuova app: tre passi

**1. Copia il modello**

```bash
cp -r _template appNN
```

**2. Compila le tre cose segnate in cima al file**

Apri `appNN/index.html` e cambia quello che sta fra i due marcatori `▼▼ ... ▲▲`:
titolo, descrizione, indirizzo. Poi, più sotto, il colore dell'app in `--accent`.
In fondo al file, metti il nome della cartella in `data-app`.

**3. Registrala nel menu**

Aggiungi una voce in `assets/apps.js`:

```json
{
  "id": "appNN",
  "titolo": "Come si chiama",
  "sommario": "Una frase che dice cosa fa e perché.",
  "categoria": "strumenti",
  "accento": "#2f6ad1",
  "tag": ["parola", "altra parola"],
  "aggiunta": "2026-09-01",
  "aggiornata": "2026-09-01"
}
```

Fatto. Il menu si aggiorna da solo, la scheda compare nella categoria giusta,
l'etichetta "novità" appare per i primi novanta giorni e sparisce da sola.
Non c'è nient'altro da toccare.

Categorie disponibili: `strumenti`, `test`, `letture`, `extra`.
Per aggiungerne una, mettila in `categorie` nello stesso file.

---

## Cosa ti dà `assets/` senza scrivere niente

**`base.css`** — colori, tipi, spaziature, tema chiaro/scuro, stampa,
e un po' di componenti già pronti:

| Classe | A cosa serve |
|---|---|
| `.wrap` | contenitore centrato, larghezza giusta |
| `.stack` `.stack-lg` `.spread` `.row-wrap` `.grid` | impaginazione |
| `.card` `.panel` | superfici |
| `.btn` `.btn-primary` `.btn-ghost` `.btn-sm` `.icon-btn` | pulsanti |
| `.field` `.field-label` `.field-hint` | campi |
| `.choices` `.choice` | risposte a scelta (radio travestiti) |
| `.likert` `.likert-ends` | scala a cinque livelli |
| `.chip` `.chip-ok` `.chip-warn` `.chip-bad` | etichette di stato |
| `.progress` | barra di avanzamento |
| `.swot` | griglia SWOT a quattro riquadri |
| `.hero` `.eyebrow` `.lede` `.dim` `.muted` `.small` `.nums` | testo |
| `.no-print` `.print-only` | cosa mostrare quando si stampa |

Per cambiare il colore di un'app basta sovrascrivere `--accent`
(e `--accent-ink`, il colore del testo sopra al pieno).

**`shell.js`** — mettilo in fondo al `<body>` con `data-app` e `data-title`.
Da solo aggiunge la barra in alto con il ritorno al menu e l'interruttore
del tema, e collega i cursori al loro riempimento colorato.

Poi ti mette a disposizione:

```js
const store = Shell.store();      // salvataggio locale con prefisso mwa.appNN.
store.set('chiave', valore);      // niente più collisioni fra app
store.get('chiave', predefinito);

Shell.toast('Messaggio');         // notifica che sparisce da sola
Shell.copy(testo);                // copia negli appunti, con ripiego
Shell.share({title, text, url});  // condivisione del telefono, o copia
Shell.download('file.csv', testo, 'text/csv');
Shell.print();                    // apre il dialogo di stampa (= salva in PDF)

Shell.stamp();                    // 2026-08-18, per i nomi dei file
Shell.itDate(data);               // 18 agosto 2026
Shell.esc(testo);                 // testo sicuro dentro innerHTML
Shell.shuffler(elenco);           // pesca a caso senza ripetere
Shell.daySeed();                  // numero fisso per tutta la giornata
```

**`charts.js`** — da includere solo se servono grafici.

```js
Charts.radar(elemento, {
  labels: ['Finanze', 'Lavoro', 'Salute'],
  max: 10,                        // la scala la decidi tu, e non cambia mai
  series: [
    { name: 'Oggi',      values: [7, 6, 8] },
    { name: 'Sei mesi fa', values: [5, 7, 6] }
  ]
});

Charts.bars(elemento, { labels: [...], values: [...], max: 10 });
Charts.toPng(elemento, 'grafico.png');
```

---

## Regole che tengono insieme la raccolta

- **Niente server esterni.** Font, grafici e stili sono tutti qui dentro.
  Nessuna CDN: se domani cambia, il sito non si accorge di niente.
- **Le chiavi di salvataggio passano da `Shell.store()`**, mai
  `localStorage` diretto: il prefisso evita che due app si sovrascrivano.
- **I PDF si fanno con `Shell.print()`**, non con librerie. Il foglio di
  stampa in `base.css` toglie già barre e pulsanti.
- **I testi lunghi stanno in un file dati** (`.js` o `.json`), non nell'HTML:
  così ampliare un'app è scrivere testo, non codice.
- **Ogni campo deve essere usabile col pollice**: bersagli da almeno
  44 pixel e caratteri da almeno 16, altrimenti iOS ingrandisce da solo.

---

## Il tema

Tre stati, non due. Se l'utente non ha mai scelto, comanda il sistema
operativo; se ha scelto, la scelta resta in `mwa.theme` e vince lei.
Per questo `theme-init.js` va nel `<head>` **senza** `defer`: altrimenti
si vede il lampo bianco prima che il tema scuro venga applicato.

Quando definisci un colore, definiscilo sempre nel `:root` nudo e poi
riscrivilo nei due blocchi scuri. Un colore che esiste soltanto dentro
`@media (prefers-color-scheme: dark)` sparisce per metà dei visitatori.

---

## Le app ritirate

`app5`, `app6`, `app8` e `app9` erano cinque versioni dello stesso test
sugli archetipi di Jung. Ora sono una sola, in `app7`. Le vecchie cartelle
restano ma contengono solo un reindirizzamento, così i link già in giro
per il mondo continuano a funzionare. Sono elencate in `apps.js` sotto
`ritirate`, con il motivo.

Se in futuro ritiri un'altra app, fai lo stesso: non cancellare la
cartella, mettici dentro il reindirizzamento.
