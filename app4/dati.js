/* ============================================================
   Test dei Quattro Colori — testi e domande
   ------------------------------------------------------------
   Il modello dei quattro colori è una semplificazione divulgativa
   che discende dal lavoro di William Moulton Marston (1928) e
   dalle tipologie di Jung: è diffuso nella formazione aziendale
   con nomi diversi a seconda dell'editore.

   Sedici affermazioni, quattro per colore, mescolate apposta:
   nella versione precedente erano otto e raggruppate per colore,
   quindi si intuiva subito a cosa "servisse" ogni risposta.
   ============================================================ */

window.COLORI = {

  scalaEtichette: ['Per niente', 'Poco', 'In parte', 'Abbastanza', 'Moltissimo'],
  scala: 5,

  domande: [
    { t: 'Quando un gruppo non riesce a decidere, tendo a prendere in mano io la situazione.', c: 'rosso' },
    { t: 'Con le persone che non conosco mi trovo a mio agio quasi subito.', c: 'giallo' },
    { t: 'Prima di decidere voglio i dati, non le impressioni.', c: 'blu' },
    { t: 'Mi accorgo se c’è tensione in una stanza, anche quando nessuno dice niente.', c: 'verde' },

    { t: 'Vado dritto al punto, anche a costo di sembrare brusco.', c: 'rosso' },
    { t: 'Mi vengono in mente idee di continuo, anche quando non servono.', c: 'giallo' },
    { t: 'Noto errori e imprecisioni che agli altri sfuggono.', c: 'blu' },
    { t: 'Preferisco arrivare a un accordo piuttosto che avere ragione.', c: 'verde' },

    { t: 'Mi trovo bene con obiettivi chiari e risultati misurabili.', c: 'rosso' },
    { t: 'Riesco a far appassionare gli altri a una cosa in cui credo.', c: 'giallo' },
    { t: 'Preferisco un metodo collaudato a una soluzione brillante ma non verificata.', c: 'blu' },
    { t: 'Ci metto un po’ ad abituarmi ai cambiamenti, anche a quelli buoni.', c: 'verde' },

    { t: 'Le discussioni lunghe mi innervosiscono: meglio decidere e correggere strada facendo.', c: 'rosso' },
    { t: 'Preferisco improvvisare piuttosto che seguire un programma dettagliato.', c: 'giallo' },
    { t: 'Mi dà fastidio consegnare qualcosa fatto all’incirca.', c: 'blu' },
    { t: 'Le persone tendono a confidarsi con me.', c: 'verde' }
  ],

  ordine: ['rosso', 'giallo', 'blu', 'verde'],

  colori: {
    rosso: {
      nome: 'Rosso',
      titolo: 'Il Determinato',
      tinta: '#c0453b',
      tintaScura: '#ef7b70',
      motto: '«Decidiamo e andiamo avanti.»',
      breve: 'Diretto, deciso, orientato al risultato.',
      descrizione: 'Il Rosso guarda al risultato e ci va dritto. Decide in fretta, non ha paura del conflitto, e nei momenti di stallo è quello che sblocca la situazione mentre gli altri stanno ancora valutando. Il rovescio è che la stessa rapidità può diventare fretta, e la franchezza può arrivare agli altri come durezza anche quando non era quella l’intenzione.',
      conGliAltri: 'Con te funziona chi va al punto. Chi ha bisogno di tempo per elaborare, davanti alla tua velocità tende a tacere: non perché sia d’accordo, ma perché non riesce a starti dietro.',
      swot: {
        forza: ['Decide anche con informazioni incomplete', 'Non teme il confronto diretto', 'Porta a risultati concreti'],
        debolezza: ['Impazienza', 'Brusco senza accorgersene', 'Ascolta poco chi è più lento'],
        opportunita: ['Ruoli di guida e situazioni da sbloccare', 'Contesti che premiano la rapidità'],
        minaccia: ['Perdere pezzi di squadra per strada', 'Decisioni affrettate difficili da correggere']
      },
      consiglio: 'Prova questo, nella prossima riunione: prima di dire la tua, chiedi il parere della persona che ha parlato meno. Non ti costa niente in termini di tempo, e ti restituisce esattamente le informazioni che la tua velocità di solito lascia indietro.'
    },
    giallo: {
      nome: 'Giallo',
      titolo: 'Il Comunicativo',
      tinta: '#b5860b',
      tintaScura: '#dfb040',
      motto: '«Proviamo, poi vediamo.»',
      breve: 'Socievole, entusiasta, pieno di idee.',
      descrizione: 'Il Giallo porta energia. Sa parlare con chiunque, trova collegamenti che gli altri non vedono e riesce a far venire voglia di fare le cose — che è una capacità rara e sottovalutata. La sua fragilità sta nel seguito: le idee sono tante, l’entusiasmo iniziale è alto, e la parte noiosa dell’esecuzione trova sempre qualcosa di più interessante da fare.',
      conGliAltri: 'Le persone ti seguono volentieri all’inizio. Quello che si aspettano da te, e che a volte manca, è la conferma che la cosa arriverà in fondo: bastano una data e un aggiornamento, e la fiducia resta.',
      swot: {
        forza: ['Entusiasma e coinvolge', 'Idee in abbondanza', 'Si trova bene con chiunque'],
        debolezza: ['Disperde le energie', 'Si annoia nella fase esecutiva', 'Poca attenzione ai dettagli'],
        opportunita: ['Ruoli di relazione, vendita, formazione', 'Avvii di progetti e cambiamenti'],
        minaccia: ['Fama di persona brillante ma inaffidabile', 'Cose lasciate a metà che si accumulano']
      },
      consiglio: 'Prendi una sola delle tue idee — la meno entusiasmante fra quelle che ti stanno a cuore — e portala fino in fondo, anche in versione ridotta. Una cosa finita cambia come gli altri leggono tutte le prossime che proporrai.'
    },
    blu: {
      nome: 'Blu',
      titolo: 'Il Preciso',
      tinta: '#2f6ad1',
      tintaScura: '#74a3ee',
      motto: '«Verifichiamo prima di muoverci.»',
      breve: 'Analitico, accurato, metodico.',
      descrizione: 'Il Blu vuole capire prima di agire. Legge le note a piè di pagina, verifica i numeri, nota l’incongruenza che manda tutto all’aria tre mesi dopo. È la persona che evita gli errori costosi, e proprio per questo il suo contributo si vede poco: i disastri che non succedono non fanno notizia. Il rischio è che la ricerca della certezza diventi un modo elegante per non decidere.',
      conGliAltri: 'Gli altri ti considerano affidabile ma a volte ti percepiscono come freddo. Non è distacco: è che stai ancora valutando. Dirlo ad alta voce — «ci sto pensando, ti rispondo domani» — cambia completamente come viene letto il tuo silenzio.',
      swot: {
        forza: ['Precisione e affidabilità', 'Vede le conseguenze in anticipo', 'Lavoro sempre ben fatto'],
        debolezza: ['Rallenta per cercare la certezza', 'Rigidità sui metodi', 'Sembra distaccato'],
        opportunita: ['Ruoli tecnici, di analisi, di qualità', 'Contesti in cui l’errore costa caro'],
        minaccia: ['Perdere occasioni per eccesso di prudenza', 'Essere scavalcato da chi decide più in fretta']
      },
      consiglio: 'Datti una soglia dichiarata: «con il settanta per cento delle informazioni, decido». Scrivila davvero, da qualche parte. Quasi tutte le decisioni che rimandi in attesa di certezza reggono benissimo quella soglia, e le poche che richiedono di più le riconosci subito perché sono rare.'
    },
    verde: {
      nome: 'Verde',
      titolo: 'Il Paziente',
      tinta: '#2f8f6f',
      tintaScura: '#5cc39c',
      motto: '«Prima le persone.»',
      breve: 'Empatico, stabile, costruttore di relazioni.',
      descrizione: 'Il Verde tiene insieme le persone. Ascolta davvero, si accorge di chi sta in difficoltà, smorza i conflitti prima che diventino rotture. È il collante di quasi tutte le squadre che funzionano, e quasi mai gliene viene riconosciuto il merito perché il suo lavoro si vede solo quando manca. La sua difficoltà è mettersi in mezzo: dire quello che pensa quando rischia di dispiacere a qualcuno.',
      conGliAltri: 'Ti si affidano volentieri. Il prezzo è che il tuo parere resta spesso non detto, e gli altri lo scambiano per assenso. Le persone hanno bisogno di sapere cosa pensi davvero, molto più di quanto tu creda.',
      swot: {
        forza: ['Ascolto autentico', 'Stabilità nei momenti difficili', 'Costruisce fiducia'],
        debolezza: ['Evita il conflitto anche quando servirebbe', 'Fatica a dire di no', 'Resiste ai cambiamenti'],
        opportunita: ['Ruoli di supporto, mediazione, cura', 'Squadre da ricostruire dopo una frattura'],
        minaccia: ['Farsi carico di tutto in silenzio', 'Accumulare un malcontento che poi esplode']
      },
      consiglio: 'Questa settimana, in una situazione in cui non saresti d’accordo, dillo. Una frase sola, senza doverla giustificare: «io la vedo diversamente». Scoprirai che la relazione regge — e che il tuo silenzio, fino ad ora, stava togliendo agli altri un’informazione che gli serviva.'
    }
  },

  /* letture delle combinazioni più frequenti: il profilo puro non esiste quasi mai */
  combinazioni: {
    'rosso+giallo': 'Decisione ed energia insieme: trascini le persone e le fai muovere in fretta. Attenzione al fatto che, fra la tua velocità e il tuo entusiasmo, i dettagli restano indietro — assicurati che qualcuno li stia raccogliendo.',
    'rosso+blu': 'Deciso ma rigoroso: decidi in fretta e sai anche perché. È una combinazione molto efficace e piuttosto dura da reggere per gli altri: quello che ti manca non è capacità, è pazienza.',
    'rosso+verde': 'Una combinazione insolita e preziosa: sai decidere e sai anche accorgerti di chi resta indietro. Il conflitto interno è fra la spinta ad andare avanti e il bisogno che nessuno ci rimetta — che è esattamente la tensione dei buoni capi.',
    'giallo+blu': 'Idee e rigore nella stessa persona: sai immaginare e sai anche verificare. Il rischio è l’oscillazione, entusiasmo un giorno e freno il giorno dopo, che dall’esterno appare come incoerenza.',
    'giallo+verde': 'Calore puro: le persone stanno bene con te e ti si aprono facilmente. Quello che tende a mancare è la struttura — qualcuno che tenga i tempi, magari con un metodo scritto, ti fa rendere molto di più.',
    'blu+verde': 'Affidabile e attento agli altri: la persona su cui tutti contano e che nessuno ringrazia. Il rischio è restare in secondo piano più di quanto meriteresti: il tuo contributo va detto, perché non si vede da solo.'
  }
};
