/* ============================================================
   Quiz Generazionale — dati
   ------------------------------------------------------------
   Gli anni di nascita seguono la convenzione più usata (Pew
   Research Center). Le età non sono scritte da nessuna parte:
   si calcolano dall'anno in corso, così non invecchiano insieme
   al codice come succedeva nella versione precedente.

   I profili sono sei valori da 0 a 10 sulle stesse dimensioni
   misurate dal questionario. Sono una stima divulgativa, non
   il risultato di un'indagine: servono a dare un termine di
   paragone, e l'app lo dice apertamente.
   ============================================================ */

window.GENERAZIONI = {

  dimensioni: [
    { id: 'stabilita',  nome: 'Stabilità economica' },
    { id: 'tecnologia', nome: 'Dimestichezza digitale' },
    { id: 'tv',         nome: 'Televisione' },
    { id: 'streaming',  nome: 'Streaming' },
    { id: 'social',     nome: 'Social media' },
    { id: 'lavoro',     nome: 'Centralità del lavoro' }
  ],

  scalaEtichette: ['Per niente', 'Poco', 'Abbastanza', 'Molto', 'Moltissimo'],
  scala: 5,

  domande: [
    { t: 'Quanto conta per te avere una situazione economica stabile e prevedibile?',
      d: 'stabilita' },
    { t: 'Quanto ti senti a tuo agio con un dispositivo o un servizio digitale nuovo?',
      d: 'tecnologia' },
    { t: 'Quanto guardi la televisione tradizionale, quella con i canali e i palinsesti?',
      d: 'tv' },
    { t: 'Quanto guardi contenuti in streaming, da Netflix a YouTube?',
      d: 'streaming' },
    { t: 'Quanto tempo passi sui social media in una giornata normale?',
      d: 'social' },
    { t: 'Quanto il lavoro occupa spazio nella tua vita e nella tua identità?',
      d: 'lavoro' }
  ],

  /* due domande in più, che non entrano nel radar ma completano la lettura */
  extra: [
    { id: 'fonte', t: 'Dove ti informi soprattutto?',
      opzioni: [
        { v: 1, t: 'Giornali, radio, telegiornali' },
        { v: 2, t: 'Siti di informazione' },
        { v: 3, t: 'Un po’ di tutto, senza una fonte precisa' },
        { v: 4, t: 'Social media e canali di creator' }
      ] },
    { id: 'influenza', t: 'Quanto pensi che i media influenzino le tue opinioni?',
      opzioni: [
        { v: 1, t: 'Per niente: mi faccio un’idea mia' },
        { v: 2, t: 'Un po’, ma me ne accorgo' },
        { v: 3, t: 'Abbastanza' },
        { v: 4, t: 'Molto, e spesso me ne accorgo solo dopo' }
      ] }
  ],

  /* dal più vecchio al più giovane */
  elenco: [
    {
      id: 'silente', nome: 'Generazione silenziosa', da: 1928, a: 1945,
      profilo: { stabilita: 9, tecnologia: 3, tv: 8, streaming: 2, social: 2, lavoro: 8 },
      conArticolo: 'la Generazione silenziosa', di: 'della Generazione silenziosa',
      descrizione: 'Cresciuta fra la guerra e la ricostruzione. Parsimonia, rispetto delle istituzioni, fiducia nel lavoro come dovere prima che come realizzazione.',
      segno: 'Ha imparato che le cose si costruiscono lentamente e non si buttano via.'
    },
    {
      id: 'boomer', nome: 'Baby Boomer', da: 1946, a: 1964,
      profilo: { stabilita: 9, tecnologia: 4, tv: 8, streaming: 3, social: 4, lavoro: 9 },
      conArticolo: 'i Baby Boomer', di: 'dei Baby Boomer',
      descrizione: 'La generazione del boom economico e delle grandi trasformazioni sociali. Attaccamento al posto fisso, senso del sacrificio, identità costruita attorno alla carriera.',
      segno: 'Per molti di loro fermarsi somiglia a smettere di esistere.'
    },
    {
      id: 'x', nome: 'Generazione X', da: 1965, a: 1980,
      profilo: { stabilita: 8, tecnologia: 6, tv: 7, streaming: 5, social: 6, lavoro: 8 },
      conArticolo: 'la Generazione X', di: 'della Generazione X',
      descrizione: 'Cresciuta analogica e diventata adulta digitale. Pragmatica, autonoma, poco incline agli entusiasmi: ha visto abbastanza cambiamenti da non prenderne nessuno troppo sul serio.',
      segno: 'È la generazione-cerniera: parla la lingua di quelli prima e di quelli dopo.'
    },
    {
      id: 'y', nome: 'Millennial', da: 1981, a: 1996,
      profilo: { stabilita: 7, tecnologia: 8, tv: 5, streaming: 7, social: 8, lavoro: 7 },
      conArticolo: 'i Millennial', di: 'dei Millennial',
      descrizione: 'Arrivata al lavoro insieme alla crisi. Ha barattato la sicurezza con il senso: cerca esperienze, coerenza fra valori e mestiere, e diffida delle promesse a lungo termine.',
      segno: 'Sa che il posto fisso non tornerà, e ha smesso di aspettarlo.'
    },
    {
      id: 'z', nome: 'Generazione Z', da: 1997, a: 2012,
      profilo: { stabilita: 6, tecnologia: 9, tv: 4, streaming: 8, social: 9, lavoro: 5 },
      conArticolo: 'la Generazione Z', di: 'della Generazione Z',
      descrizione: 'Nativa digitale davvero: non ricorda un mondo senza rete. Attenta alle questioni sociali e ambientali, allergica alla retorica, veloce a smascherare quello che suona finto.',
      segno: 'Separa il lavoro dall’identità più nettamente di chiunque l’abbia preceduta.'
    },
    {
      id: 'alpha', nome: 'Generazione Alpha', da: 2013, a: 2024,
      profilo: { stabilita: 5, tecnologia: 10, tv: 3, streaming: 9, social: 9, lavoro: 4 },
      conArticolo: 'la Generazione Alpha', di: 'della Generazione Alpha',
      descrizione: 'La prima generazione cresciuta con l’intelligenza artificiale come elettrodomestico. Impara guardando video, si aspetta che tutto sia interattivo, e non distingue fra online e offline perché per lei la distinzione non esiste.',
      segno: 'Per loro lo schermo non è un luogo dove andare: è il posto dove le cose stanno.'
    }
  ],

  fonteEtichette: {
    1: 'Ti informi soprattutto sui media tradizionali: giornali, radio, telegiornali.',
    2: 'Ti informi soprattutto su siti di informazione online.',
    3: 'Peschi da fonti diverse senza affezionarti a nessuna.',
    4: 'Ti informi soprattutto attraverso social e creator.'
  },

  influenzaEtichette: {
    1: 'Ritieni di formarti opinioni in autonomia rispetto ai media.',
    2: 'Riconosci una certa influenza dei media, ma pensi di accorgertene.',
    3: 'Riconosci che i media pesano parecchio su come vedi le cose.',
    4: 'Riconosci che i media ti influenzano molto, e spesso te ne accorgi solo dopo.'
  }
};
