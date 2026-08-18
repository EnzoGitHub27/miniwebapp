# Manuale d'uso — Sei Cappelli per Pensare

*App web per applicare la tecnica dei Sei Cappelli per Pensare di Edward de Bono (1985).*
*Versione 1.0 — questo manuale spiega come usare bene l'interfaccia, soprattutto nel momento in cui rispondi alle domande.*

---

## 1. L'idea in trenta secondi

Nelle discussioni normali ognuno difende la propria posizione: chi è ottimista contrasta chi è prudente, e il tempo se ne va nello scontro. De Bono propone il contrario, il **pensiero parallelo**: in ogni momento tutti guardano il problema dalla stessa direzione. Prima solo i fatti, poi solo le idee, poi solo i benefici, poi solo i rischi. Nessuno deve difendere niente, perché tutti indossano lo stesso cappello nello stesso istante.

I sei cappelli sono sei modalità di pensiero, non sei ruoli assegnati alle persone:

| Cappello | Direzione | Domanda madre |
|---|---|---|
| ⚪ Bianco | Fatti e informazioni | Cosa sappiamo con certezza? |
| 🔴 Rosso | Emozioni e intuito | Cosa mi dice la pancia? |
| ⚫ Nero | Rischi e prudenza | Cosa può andare storto? |
| 🟡 Giallo | Benefici e valore | Perché potrebbe funzionare? |
| 🟢 Verde | Creatività e alternative | Cos'altro possiamo fare? |
| 🔵 Blu | Processo e regia | Dove stiamo andando, e cosa decidiamo? |

L'app fa una cosa sola, ma la fa bene: tiene il tempo, ti ricorda in che cappello sei, ti suggerisce le domande giuste e raccoglie le risposte in una sintesi esportabile.

---

## 2. Preparare la sessione (schermata iniziale)

### 2.1 Il campo "Su cosa vuoi ragionare?"

È il campo più importante di tutta l'app: una domanda formulata male produce una sessione confusa, per quanto bene la conduci.

**Scrivi una domanda, non un argomento.**

| ✗ Debole | ✓ Efficace |
|---|---|
| Il nuovo corso | Dovremmo lanciare il corso di Vibe Coding entro dicembre? |
| Problemi con i clienti | Come riduciamo le disdette nel primo mese di abbonamento? |
| Marketing 2027 | Su quale canale investiamo i 5.000 € del budget del primo trimestre? |

Tre regole pratiche:

1. **Una domanda sola.** Se ne contiene due ("lanciare a dicembre *e* alzare il prezzo?"), fai due sessioni.
2. **Rendila decidibile.** Alla fine deve poter esistere una risposta: sì, no, oppure una scelta fra alternative.
3. **Niente risposta nascosta dentro la domanda.** "Come convinciamo tutti che dicembre è la scelta giusta?" non è una domanda, è una conclusione travestita.

Il testo che scrivi qui resta visibile in cima a ogni tappa e diventa il titolo della sintesi. Se lo lasci vuoto la sessione funziona lo stesso, ma nell'archivio la ritroverai come "Sessione senza titolo".

### 2.2 Modalità

- **Sequenza guidata (consigliata).** Sette tappe nell'ordine studiato da de Bono per esaminare un'idea: Blu → Bianco → Verde → Giallo → Nero → Rosso → Blu. La logica: si apre definendo l'obiettivo, si parte dai fatti, si generano idee *prima* di poterle criticare, si cercano i benefici, solo allora si attaccano i rischi, si registra la reazione di pancia e si chiude con la sintesi. Usala sempre le prime volte e con i gruppi.
- **Libera.** I sei cappelli, senza ordine imposto: tocchi quello che ti serve nella barra in alto. Utile quando hai poco tempo e un obiettivo mirato ("mi serve mezz'ora di solo verde"), o quando il gruppo conosce già il metodo.

### 2.3 Timer

| Durata | Quando usarla |
|---|---|
| **Off** | Riunioni lunghe, sessioni di studio, prima volta con un gruppo intimidito dal cronometro. |
| **1 min** | Brainstorming veloce da soli, o giri di riscaldamento. |
| **3 min** | Il valore predefinito, adatto quasi sempre: un gruppo di 3-5 persone produce 5-8 note. |
| **5 min** | Temi complessi, gruppi numerosi, cappello Bianco con molti dati da mettere in fila. |
| **10 min** | Sessioni approfondite; oltre questa soglia l'attenzione cala e il metodo perde il suo vantaggio. |

Il timer non è una tagliola: allo scadere l'app avvisa e poi **continua a contare in avanti** (`+00:24`), così sai esattamente di quanto hai sforato senza essere interrotto a metà frase.

Una sessione tipo con timer a 3 minuti dura circa **25 minuti** in modalità guidata: sette tappe più il tempo dei passaggi.

---

## 3. La schermata di sessione, elemento per elemento

```
 ←   Dovremmo lanciare il corso...   ≡        riga superiore
 [•][•][•][•][•][•][•]                        barra delle tappe
 ┌──────────────────────────────────┐
 │ TAPPA 3 · IDEE                   │
 │ 🟢 Cappello Verde                 │        cappello attivo
 │ Genera alternative                │
 │ ───────────────────  02:14 ⏸ ↺   │        timer
 │ « Quali alternative non abbiamo   │        domanda guida
 │   ancora considerato? »  ⟳        │
 │ [ scrivi qui...            ] [+] │        campo nota
 │ • Lancio in due tempi          ✕ │        note della tappa
 │ • Versione podcast del corso   ✕ │
 └──────────────────────────────────┘
 [ ← Indietro ]        [ Avanti → ]
```

- **← (in alto a sinistra)** — esci dalla sessione salvando. La ritrovi con "Riprendi la sessione interrotta" o dall'archivio.
- **≡ (in alto a destra)** — salta direttamente alla sintesi, anche a metà sessione.
- **Barra delle tappe** — un segno per tappa, del colore del cappello. Acceso = ci sono già note, spento = tappa vuota, evidenziato e più largo = tappa corrente. Toccando un segno salti a quella tappa: è il modo normale di muoversi in modalità libera, mentre in sequenza guidata serve per tornare indietro a integrare qualcosa. **Attenzione: cambiare tappa riavvia il timer.**
- **Timer** — parte da solo ogni volta che entri in una tappa nuova. *Pausa* quando qualcuno interrompe o si apre una discussione di processo; *Azzera* per rifare il giro sullo stesso cappello.
- **Domanda guida** — l'app propone una delle cinque domande tipiche del cappello. Il pulsante **↻ Altra domanda** ruota alla successiva.
- **Campo nota + [+]** — dove scrivi. Su cellulare il campo resta attivo dopo l'invio e la tastiera non si chiude: puoi scrivere nota-invio-nota-invio senza mai togliere le dita.
- **Elenco note** — le note della tappa corrente, in ordine di inserimento. La **✕** cancella (senza conferma: è voluto, deve essere veloce come scrivere).
- **Indietro / Avanti** — spostamento fra le tappe. Sull'ultima, "Avanti" diventa **Vedi la sintesi**.

Tutto è salvato automaticamente a ogni nota: non esiste un pulsante "salva" e non puoi perdere il lavoro chiudendo l'app.

---

## 4. Come rispondere bene alle domande

È qui che si decide la qualità della sessione. La regola generale: **una nota = un pensiero, 5-15 parole, scritte mentre pensi e non dopo aver riflettuto**.

### 4.1 Cinque abitudini che cambiano il risultato

1. **Non riformulare.** La nota non deve essere elegante, deve essere recuperabile fra due settimane. "Email dicembre = aperture -40%" vale quanto una frase perfetta e costa un decimo del tempo.
2. **Spezza.** Se una nota contiene una "e" o una "ma", quasi sempre sono due note. Separandole, in sintesi potrai tenerne una e scartare l'altra.
3. **Resta nel cappello.** È l'unica regola rigida del metodo. Il pensiero che arriva fuori tempo non va perso: annotalo comunque, ma nella tappa a cui appartiene (tocca il suo segno nella barra, scrivi, torna indietro).
4. **Quantità prima di qualità, tranne nel Bianco.** Nel verde e nel giallo scrivi tutto, anche il debole. Nel bianco scrivi solo ciò che puoi verificare.
5. **Punta a tre note per cappello.** Sotto le tre, quasi sempre il gruppo si è fermato al primo pensiero ovvio.

### 4.2 Cosa scrivere sotto ogni cappello

**⚪ Bianco — fatti e informazioni**
Solo dati verificabili e buchi informativi dichiarati.
- ✓ `Iscritti edizione 2025: 148, di cui 31 a prezzo pieno`
- ✓ `Non sappiamo quanti userebbero la versione asincrona → chiedere alla lista`
- ✗ `Secondo me gli iscritti crescerebbero` → è un'opinione: va nel Giallo o nel Rosso

Un trucco: se una nota comincia con "credo", "probabilmente", "di solito", non è bianca.

**🔴 Rosso — emozioni e intuito**
La reazione di pancia, senza spiegazioni. È l'unico cappello in cui giustificarsi è vietato: appena aggiungi un "perché", sei passato a un altro cappello.
- ✓ `Dicembre mi mette ansia`
- ✓ `L'idea del podcast mi entusiasma più di quanto ammetta`
- ✗ `Dicembre è rischioso perché c'è il Natale` → questa è una nota nera

Trenta secondi bastano. Se il gruppo esita, chiedi la risposta in tre parole a testa.

**⚫ Nero — rischi e prudenza**
Il critico costruttivo: ogni obiezione deve indicare *il meccanismo* per cui la cosa fallisce.
- ✓ `A dicembre il tasso di apertura email crolla: il lancio passa inosservato`
- ✓ `La landing richiede 3 giorni di lavoro che non abbiamo in calendario`
- ✗ `Non funzionerà mai` → giudizio senza meccanismo, inutilizzabile dopo

È il cappello più facile da indossare e il più pericoloso: fuori dalla sua tappa uccide le idee prima che siano nate.

**🟡 Giallo — benefici e valore**
Ottimismo *motivato*: ogni beneficio va argomentato, come per il nero.
- ✓ `Chiudere entro dicembre porta i ricavi nell'anno fiscale corrente`
- ✓ `Il lancio pre-natalizio intercetta i buoni regalo aziendali`
- ✗ `Sarà bellissimo` → entusiasmo senza contenuto: quello è rosso

**🟢 Verde — creatività e alternative**
Quantità, provocazioni, soluzioni laterali. Qui vale tutto, anche l'impossibile: serve a far apparire il possibile accanto.
- ✓ `Lancio in due tempi: lista d'attesa a dicembre, apertura a gennaio`
- ✓ `E se il corso fosse gratis e si pagasse solo la certificazione?`
- ✗ `Lista d'attesa? Non ci crederà nessuno` → valutare mentre si crea è il modo più rapido di svuotare la tappa

Se il gruppo si blocca, usa **↻ Altra domanda**: "E se facessimo l'esatto contrario?" sblocca quasi sempre.

**🔵 Blu — processo e regia**
Il cappello che governa il pensiero, non il contenuto. Nella prima tappa fissa l'obiettivo, nell'ultima tira le somme.
- ✓ (apertura) `Obiettivo: decidere sì/no entro venerdì 12`
- ✓ (chiusura) `Decisione: lista d'attesa a dicembre, apertura 15 gennaio`
- ✓ (chiusura) `Marco prepara la landing entro il 5`
- ✗ `Io direi di lanciare a gennaio` → è contenuto: appartiene al giallo o al nero

**Nella tappa 7 non ripetere ciò che è già scritto sopra.** Il blu di chiusura contiene solo tre cose: la decisione presa, il prossimo passo concreto con nome e data, ed eventualmente ciò che resta aperto.

---

## 5. Le sette tappe della sequenza guidata

| Tappa | Cappello | Obiettivo | Segnale che puoi passare oltre |
|---|---|---|---|
| 1 | 🔵 Blu | Definire domanda, risultato atteso e regole | Tutti saprebbero ripetere la domanda a memoria |
| 2 | ⚪ Bianco | Mettere in fila fatti e lacune | Le opinioni cominciano a spuntare al posto dei dati |
| 3 | 🟢 Verde | Generare alternative | Le idee nuove sono varianti delle precedenti |
| 4 | 🟡 Giallo | Trovare il valore in ciascuna | Ogni alternativa ha almeno un beneficio scritto |
| 5 | ⚫ Nero | Cercare i punti di rottura | I rischi si ripetono con parole diverse |
| 6 | 🔴 Rosso | Registrare la reazione di pancia | Tutti hanno parlato una volta (bastano 60 secondi) |
| 7 | 🔵 Blu | Decidere e assegnare | Esiste una frase con un verbo, un nome e una data |

Un dettaglio che sfugge: se nella tappa 5 emerge un ostacolo grosso, non fermarti lì. Torna al verde (tocca il segno verde nella barra) e chiedi *"come lo superiamo?"*. Il nero che genera nuovo verde è il momento in cui il metodo produce di più.

---

## 6. Condurre un gruppo

- **Numero ideale: 3-7 persone.** Oltre, dividi in sottogruppi e confronta le due sintesi.
- **Una sola persona scrive**, con lo schermo proiettato o condiviso: chi scrive indossa il blu e non partecipa al merito. In alternativa passate il telefono a ogni tappa.
- **Giro di tavolo, 30 secondi a testa**, poi via libera. Elimina il problema di chi parla sempre per primo.
- **Il richiamo standard**: *"quello è nero, ce lo segno per la tappa 5"*. Detto con il cappello in mano non offende nessuno: non stai zittendo una persona, stai spostando un pensiero.
- **Non annunciare i cappelli come ruoli.** "Tu fai il critico" è l'esatto opposto del metodo: ricrea le posizioni personali che il metodo serve a sciogliere.
- **Chiudi sempre con la tappa 7 ad alta voce**, leggendo la decisione dallo schermo. Se nessuno sa cosa scrivere, la sessione non è finita.

---

## 7. Uso in solitaria

Funziona benissimo anche da soli, con due accorgimenti: timer a 1-3 minuti e **divieto di rileggere** prima della sintesi. Scrivi di getto, cambia cappello, vai avanti. La sorpresa arriva alla fine, quando leggi tutto insieme.

Il caso più utile: una decisione su cui giri a vuoto da giorni. Dieci minuti di sei cappelli, e quasi sempre scopri che stavi ripetendo lo stesso cappello (di solito il nero) da settantadue ore.

---

## 8. La sintesi e cosa farne

Il pulsante **≡** in alto o *Vedi la sintesi* sull'ultima tappa aprono il riepilogo: tema, data, numero di note, cappelli usati, e tutti i contenuti raggruppati per cappello.

- **Copia** — mette tutta la sessione negli appunti in formato Markdown, pronta per Notion, Obsidian, un'email o un documento.
- **.md** — scarica un file di testo `sei-cappelli-<tema>.md`.
- **Condividi** (solo su cellulare) — usa il menu di condivisione del telefono: WhatsApp, Mail, Note.
- **Stampa** — apre la stampa del sistema con un impaginato pulito in bianco e nero. Da lì scegli *Salva come PDF* per archiviare o allegare il verbale della riunione.

Puoi tornare alla sessione con la **←**: la sintesi si ricalcola ogni volta, quindi aggiungere una nota e riaprirla è immediato.

---

## 9. Archivio, privacy, installazione

- **Icona orologio (in alto a destra)**: l'elenco delle sessioni salvate, con il tema, la data e i pallini colorati dei cappelli usati. Toccane una per riaprirla, il cestino per eliminarla.
- **"Riprendi la sessione interrotta"** in home riapre l'ultima su cui hai lavorato.
- **Dove finiscono le note.** Restano nel browser di questo dispositivo (`localStorage`): nessun account, nessun server, nessun tracciamento. Il rovescio della medaglia: non le ritrovi su un altro telefono e spariscono se cancelli i dati del sito o navighi in incognito. Per conservarle davvero, **esporta la sintesi**.
- **Installazione come app.** Su iPhone: *Condividi → Aggiungi a schermata Home*. Su Android: menu *⋮ → Installa app*. Dopo la prima visita funziona anche **offline**.
- **Tema chiaro/scuro**: l'icona luna/sole. La scelta viene ricordata.

---

## 10. Problemi frequenti

| Sintomo | Causa e rimedio |
|---|---|
| Il suono di fine tempo non parte | Su iPhone l'interruttore silenzioso blocca l'audio del browser: resta la vibrazione. Su alcuni browser il primo suono parte solo dopo che hai toccato lo schermo almeno una volta. |
| Il timer riparte da capo | Succede a ogni cambio di tappa: è voluto. Per fermarlo usa *Pausa*. |
| Ho perso le note | Verifica di essere sullo stesso dispositivo e browser, senza navigazione privata. Le note non si sincronizzano fra dispositivi. |
| La sessione non compare nell'archivio | Una sessione viene salvata quando riceve la **prima nota**: quelle vuote non vengono archiviate. |
| Ho cancellato una nota per sbaglio | Non c'è annullamento, va riscritta. È il prezzo di un'interfaccia veloce quanto il pensiero. |

---

## 11. Riepilogo tascabile

| Cappello | Chiedi | Non fare |
|---|---|---|
| ⚪ Bianco | Quali dati abbiamo? Cosa ci manca? | Opinioni travestite da fatti |
| 🔴 Rosso | Cosa sento, in tre parole? | Spiegare il perché |
| ⚫ Nero | Cosa può rompersi, e come? | Criticare fuori dalla sua tappa |
| 🟡 Giallo | Perché potrebbe funzionare? | Entusiasmo senza motivo |
| 🟢 Verde | Cos'altro? E se il contrario? | Valutare mentre si crea |
| 🔵 Blu | Dove siamo, cosa decidiamo, chi fa cosa? | Entrare nel merito |

---

*La tecnica dei Sei Cappelli per Pensare è di Edward de Bono (Six Thinking Hats, 1985). Questa app è uno strumento indipendente per applicarla.*
