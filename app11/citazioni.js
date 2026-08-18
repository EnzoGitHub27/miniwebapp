/* ============================================================
   Saggezza Stoica — le citazioni
   ------------------------------------------------------------
   Ogni voce ha:
     testo    la citazione
     autore   chi l'ha detta
     tema     serve al filtro: prima erano quasi tutte
              "da catalogare" e il filtro non filtrava niente
     fonte    l'opera, dove è nota
     anno     epoca indicativa
     certezza 'attestata' se il testo si ritrova nell'opera,
              'attribuita' se circola sotto quel nome ma non
              compare in quella forma nelle fonti antiche

   La distinzione fra attestata e attribuita è la cosa più utile
   di questo elenco: parecchie massime "stoiche" che girano in
   rete sono riscritture moderne, e vale la pena saperlo.
   ============================================================ */

window.CITAZIONI_STOICHE = [

  /* ---------- Marco Aurelio ---------- */
  { testo: 'Il miglior modo per vendicarsi è non diventare come il tuo nemico.',
    autore: 'Marco Aurelio', tema: 'Virtù', fonte: 'Meditazioni VI, 6', anno: '170-180 d.C.',
    certezza: 'attestata' },
  { testo: 'L’universo è cambiamento, la vita è opinione.',
    autore: 'Marco Aurelio', tema: 'Percezione', fonte: 'Meditazioni IV, 3', anno: '170-180 d.C.',
    certezza: 'attestata' },
  { testo: 'Hai potere sulla tua mente, non sugli eventi esterni. Rendi te ne conto, e troverai la forza.',
    autore: 'Marco Aurelio', tema: 'Controllo', fonte: 'Meditazioni', anno: '170-180 d.C.',
    certezza: 'attribuita' },
  { testo: 'La tranquillità si raggiunge con l’ordine nella mente.',
    autore: 'Marco Aurelio', tema: 'Serenità', fonte: 'Meditazioni IV, 3', anno: '170-180 d.C.',
    certezza: 'attribuita' },
  { testo: 'Non dire che qualcosa è impossibile: dì piuttosto che non l’hai ancora fatto.',
    autore: 'Marco Aurelio', tema: 'Azione', fonte: 'Circola come massima stoica', anno: '—',
    certezza: 'attribuita' },
  { testo: 'Al mattino, quando ti alzi malvolentieri, pensa: mi sveglio per fare il lavoro di un uomo.',
    autore: 'Marco Aurelio', tema: 'Azione', fonte: 'Meditazioni V, 1', anno: '170-180 d.C.',
    certezza: 'attestata' },
  { testo: 'Presto avrai dimenticato tutto, e presto tutti avranno dimenticato te.',
    autore: 'Marco Aurelio', tema: 'Morte', fonte: 'Meditazioni VII, 21', anno: '170-180 d.C.',
    certezza: 'attestata' },
  { testo: 'Ciò che ostacola l’azione fa avanzare l’azione. Ciò che sta sulla strada diventa la strada.',
    autore: 'Marco Aurelio', tema: 'Avversità', fonte: 'Meditazioni V, 20', anno: '170-180 d.C.',
    certezza: 'attestata' },

  /* ---------- Epitteto ---------- */
  { testo: 'Non è ciò che accade che ci turba, ma i nostri pensieri su ciò che accade.',
    autore: 'Epitteto', tema: 'Percezione', fonte: 'Manuale, 5', anno: '125 d.C.',
    certezza: 'attestata' },
  { testo: 'Non desiderare che le cose accadano come vuoi, ma desiderale come accadono: così scorrerà serena la tua vita.',
    autore: 'Epitteto', tema: 'Controllo', fonte: 'Manuale, 8', anno: '125 d.C.',
    certezza: 'attestata' },
  { testo: 'Nulla di grande è creato improvvisamente, neppure un grappolo d’uva o un fico. Se mi dici che desideri un fico, ti rispondo che ci vuole tempo: lascia che prima fiorisca, poi produca il frutto, poi che questo maturi.',
    autore: 'Epitteto', tema: 'Tempo', fonte: 'Discorsi I, 15', anno: '108 d.C.',
    certezza: 'attestata' },
  { testo: 'La ricchezza non consiste nell’avere grandi proprietà, ma nell’avere pochi bisogni.',
    autore: 'Epitteto', tema: 'Desiderio', fonte: 'Frammenti', anno: '125 d.C.',
    certezza: 'attribuita' },
  { testo: 'Nessuno è libero se non è padrone di sé stesso.',
    autore: 'Epitteto', tema: 'Libertà', fonte: 'Discorsi', anno: '108 d.C.',
    certezza: 'attribuita' },
  { testo: 'Se vuoi migliorare, accetta di sembrare sciocco e stupido riguardo alle cose esterne.',
    autore: 'Epitteto', tema: 'Virtù', fonte: 'Manuale, 13', anno: '125 d.C.',
    certezza: 'attestata' },
  { testo: 'Il saggio non si affligge per ciò che non ha, ma gioisce di ciò che ha.',
    autore: 'Epitteto', tema: 'Desiderio', fonte: 'Frammenti', anno: '125 d.C.',
    certezza: 'attribuita' },
  { testo: 'È nelle difficoltà che si rivelano le virtù.',
    autore: 'Epitteto', tema: 'Avversità', fonte: 'Discorsi I, 24', anno: '108 d.C.',
    certezza: 'attestata' },
  { testo: 'Abbiamo due orecchie e una bocca, per ascoltare il doppio di quanto parliamo.',
    autore: 'Epitteto', tema: 'Virtù', fonte: 'Attribuita nei Frammenti', anno: '—',
    certezza: 'attribuita' },
  { testo: 'Non spiegare la tua filosofia: incarnala.',
    autore: 'Epitteto', tema: 'Azione', fonte: 'Circola come massima stoica', anno: '—',
    certezza: 'attribuita' },

  /* ---------- Seneca ---------- */
  { testo: 'La vita è lunga, se sai come usarla.',
    autore: 'Seneca', tema: 'Tempo', fonte: 'De Brevitate Vitae, II', anno: '49 d.C.',
    certezza: 'attestata' },
  { testo: 'Non è l’uomo che ha poco a essere povero, ma colui che desidera di più.',
    autore: 'Seneca', tema: 'Desiderio', fonte: 'Lettere a Lucilio, 2', anno: '65 d.C.',
    certezza: 'attestata' },
  { testo: 'Quanto è più facile tenere fuori dalla mente le passioni dannose che governarle una volta entrate.',
    autore: 'Seneca', tema: 'Controllo', fonte: 'De Ira', anno: '45 d.C.',
    certezza: 'attestata' },
  { testo: 'La vita è come una commedia: non conta quanto è lunga, ma quanto è ben recitata.',
    autore: 'Seneca', tema: 'Tempo', fonte: 'Lettere a Lucilio, 77', anno: '65 d.C.',
    certezza: 'attestata' },
  { testo: 'La vera felicità è godere del presente, senza dipendere ansiosamente dal futuro.',
    autore: 'Seneca', tema: 'Serenità', fonte: 'Lettere a Lucilio, 5', anno: '65 d.C.',
    certezza: 'attestata' },
  { testo: 'Non è perché le cose sono difficili che non osiamo: è perché non osiamo che le cose sono difficili.',
    autore: 'Seneca', tema: 'Azione', fonte: 'Lettere a Lucilio, 104', anno: '65 d.C.',
    certezza: 'attestata' },
  { testo: 'Il tempo scopre la verità.',
    autore: 'Seneca', tema: 'Tempo', fonte: 'De Ira, II', anno: '45 d.C.',
    certezza: 'attestata' },
  { testo: 'Nessun vento è favorevole per il marinaio che non sa a quale porto sta andando.',
    autore: 'Seneca', tema: 'Azione', fonte: 'Lettere a Lucilio, 71', anno: '65 d.C.',
    certezza: 'attestata' },
  { testo: 'Soffriamo più spesso nell’immaginazione che nella realtà.',
    autore: 'Seneca', tema: 'Percezione', fonte: 'Lettere a Lucilio, 13', anno: '65 d.C.',
    certezza: 'attestata' },
  { testo: 'Nessuno si desta ogni mattina pensando che potrebbe non tornare a casa: eppure niente è meno certo.',
    autore: 'Seneca', tema: 'Morte', fonte: 'Lettere a Lucilio, 101', anno: '65 d.C.',
    certezza: 'attribuita' },
  { testo: 'Vivi con gli uomini come se ti vedesse un dio, parla con un dio come se ti ascoltassero gli uomini.',
    autore: 'Seneca', tema: 'Virtù', fonte: 'Lettere a Lucilio, 10', anno: '65 d.C.',
    certezza: 'attestata' },
  { testo: 'La fortuna favorisce la mente preparata.',
    autore: 'Seneca', tema: 'Azione', fonte: 'Formulazione moderna, vicina a Pasteur', anno: '—',
    certezza: 'attribuita' },

  /* ---------- altri stoici ---------- */
  { testo: 'È meglio conquistare i propri desideri che il mondo intero.',
    autore: 'Cleante', tema: 'Desiderio', fonte: 'Tradizione stoica', anno: 'III sec. a.C.',
    certezza: 'attribuita' },
  { testo: 'La felicità non è avere ciò che si desidera, ma desiderare ciò che si ha.',
    autore: 'Zenone di Cizio', tema: 'Desiderio', fonte: 'Formulazione moderna', anno: '—',
    certezza: 'attribuita' },
  { testo: 'La filosofia non è una professione né un passatempo: è il modo in cui affrontiamo la nostra vita.',
    autore: 'Musonio Rufo', tema: 'Virtù', fonte: 'Diatribe', anno: '65-80 d.C.',
    certezza: 'attribuita' },
  { testo: 'Non augurarti che le cose vadano come desideri, ma desiderale come vanno: così scorreranno bene.',
    autore: 'Musonio Rufo', tema: 'Controllo', fonte: 'Diatribe', anno: '65-80 d.C.',
    certezza: 'attribuita' },
  { testo: 'Cominceremo a vivere solo quando smetteremo di rimandare la vita.',
    autore: 'Musonio Rufo', tema: 'Tempo', fonte: 'Diatribe', anno: '65-80 d.C.',
    certezza: 'attribuita' },

  /* ---------- contemporanei ----------
     Non sono stoici antichi, e per questo hanno un tema loro:
     restano perché dicono la stessa cosa con parole di oggi. */
  { testo: 'Sei qui ad aiutarci a risolvere il problema, o ne fai parte?',
    autore: 'Alessandro Casati', tema: 'Contemporanei', fonte: 'Detto in una riunione', anno: '1993',
    certezza: 'attestata' },
  { testo: 'Non è mai troppo tardi per essere ciò che avresti potuto essere.',
    autore: 'George Eliot', tema: 'Contemporanei', fonte: 'Spesso attribuita a Marco Aurelio, ma è sua', anno: '1876',
    certezza: 'attestata' },
  { testo: 'Concedimi la serenità di accettare le cose che non posso cambiare, il coraggio di cambiare quelle che posso, e la saggezza per distinguere le une dalle altre.',
    autore: 'Reinhold Niebuhr', tema: 'Contemporanei', fonte: 'Preghiera della serenità', anno: '1934',
    certezza: 'attestata' },
  { testo: 'Fra lo stimolo e la risposta c’è uno spazio. In quello spazio sta il nostro potere di scegliere la risposta.',
    autore: 'Viktor Frankl', tema: 'Contemporanei', fonte: 'Attribuita, nello spirito di «Uno psicologo nei lager»', anno: '1946',
    certezza: 'attribuita' },
  { testo: 'Non puoi controllare il mare, ma puoi imparare a governare la barca.',
    autore: 'Proverbio', tema: 'Contemporanei', fonte: 'Detto popolare', anno: '—',
    certezza: 'attestata' }
];
