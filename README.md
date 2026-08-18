# Mini Web App

Una raccolta di piccoli strumenti, test e letture che funzionano direttamente nel
browser. Nati per imparare, e ogni tanto ne esce qualcosa di utile anche per gli altri.

**Il sito:** [miniwebapp.vercel.app](https://miniwebapp.vercel.app/)

Nessuna registrazione, niente da installare, nessun dato che parte da qui: tutto
quello che scrivi resta sul tuo dispositivo.

---

## Le app

### Strumenti
Cose che si usano più di una volta.

| | Cosa fa |
|---|---|
| **[Ruota della Vita](app1/)** | Otto aree della tua vita da 0 a 10, e il disegno che ne esce. Salva i rilevamenti e li sovrappone, per vedere come cambi nel tempo. |
| **[Gestione Attività](app2/)** | La matrice urgente/importante di Eisenhower. Si trascina fra i quadranti anche col dito, e porta via un CSV. |
| **[Generatore di password](app3/)** | Password davvero casuali, generate dal browser. Con stima della robustezza e modalità frase in italiano. |
| **[Leadership Etica](app13/)** | Tracce d'intervista sull'etica per otto ruoli, in italiano e inglese. Le risposte si salvano da sole ed escono in Markdown o PDF. |
| **[Sei Cappelli per Pensare](app15/)** | Il pensiero parallelo di Edward de Bono: sessioni guidate, timer per ogni cappello, sintesi esportabile. Ha un suo manuale d'uso. |
| **[La Matrice della Risposta](app16/)** | Sette domande per decidere se vale la pena entrare in una conversazione. Dal modello di Sebastiano Zanolli. |

### Test e questionari
Ti fai qualche domanda e ne esce un ritratto.

| | Cosa fa |
|---|---|
| **[Quattro Colori](app4/)** | Rosso, Giallo, Blu, Verde: sedici domande per capire con che stile stai con gli altri. |
| **[Archetipi di Jung](app7/)** | I dodici archetipi in ventiquattro domande, oppure i quattro archetipi classici in versione breve. |
| **[Quiz Generazionale](app12/)** | Confronta la tua generazione anagrafica con quella a cui somigli davvero. Spesso non coincidono. |

### Letture
Una frase al giorno, da tenere in tasca.

| | Cosa fa |
|---|---|
| **[Saggezza Stoica](app11/)** | Marco Aurelio, Seneca, Epitteto e qualche voce contemporanea, con l'indicazione di quali citazioni sono attestate nelle fonti e quali soltanto attribuite. |
| **[L'Arte della Guerra](app14/)** | Novantasette passaggi di Sun Tzu, filtrabili per tema. |

### Altro

| | Cosa fa |
|---|---|
| **[Ti piacciono le mie mini app?](app10/)** | Uno scherzo con un pulsante dispettoso. E, sotto, un modo per scrivermi sul serio. |

---

## Com'è fatto

Niente framework, niente build, niente dipendenze da server di terzi: si apre un
file e funziona. Quello che è comune a tutte le app sta in [`assets/`](assets/):

| File | Cosa contiene |
|---|---|
| `base.css` | Colori, tipi, spaziature, tema chiaro/scuro, componenti, foglio di stampa |
| `shell.js` | Barra di ritorno al menu, interruttore del tema, salvataggio locale, copia, condivisione |
| `charts.js` | Grafici radar e a barre in SVG, scritti qui: sostituiscono Chart.js |
| `citazioni.js` | Il motore comune delle due app di citazioni |
| `apps.js` | Il registro da cui il menu si costruisce da solo |
| `fonts/` | Outfit e Inter, ospitati qui (licenza SIL OFL 1.1) |

Istruzioni per aggiungere o modificare un'app: **[assets/LEGGIMI.md](assets/LEGGIMI.md)**.
In breve — si copia [`_template/`](_template/), si cambiano tre righe in cima al file
e si aggiunge una voce in `assets/apps.js`. Il menu si aggiorna da solo.

L'intera raccolta è installabile come applicazione (PWA) e continua a funzionare
senza rete dopo la prima visita.

---

## App ritirate

`app5`, `app6`, `app8` e `app9` erano cinque versioni dello stesso test sugli
archetipi di Jung, tutte incomplete. Ora sono **una sola**, in [`app7/`](app7/):
i dodici archetipi con lo stesso numero di domande ciascuno, più i quattro
archetipi classici come versione breve. Le vecchie cartelle contengono un
reindirizzamento, così i link già in circolazione continuano a funzionare.

---

## Feedback

Idee, segnalazioni, un'app che ti piacerebbe: usa
**[Ti piacciono le mie mini app?](app10/)** oppure scrivi a
[enzo.iodice@gmail.com](mailto:enzo.iodice@gmail.com).

---

## Licenza

La licenza MIT copre esclusivamente il codice sorgente di questo progetto.

I testi, le immagini e gli altri materiali creativi appartengono ai rispettivi autori.
I modelli e i framework concettuali utilizzati — de Bono, Pearson e Mark, Eisenhower,
Zanolli, Marston — sono attribuiti ai rispettivi autori e citati all'interno delle
applicazioni. I font Outfit e Inter sono distribuiti con licenza SIL Open Font 1.1.
