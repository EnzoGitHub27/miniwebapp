/* ============================================================
   Test Archetipi di Jung — testi e domande
   ------------------------------------------------------------
   Tutto il contenuto sta qui. Per cambiare una domanda, aggiungere
   un consiglio o correggere una descrizione non serve toccare la
   logica: si modifica questo file e basta.

   Due impianti diversi, tenuti separati apposta:

   COMPLETO — i dodici archetipi di Carol Pearson e Margaret Mark
   ("The Hero and the Outlaw", 2001), la lettura piu' diffusa oggi,
   nata in ambito narrativo e di marca a partire dal lavoro di Jung.

   BREVE — quattro figure archetipiche di Jung in senso stretto
   (Eroe, Puer Aeternus, Persona, Grande Madre), che appartengono
   alla psicologia analitica e non allo schema dei dodici.

   Sono due mappe diverse dello stesso territorio: non vanno
   sommate fra loro, e infatti l'app le tiene distinte.
   ============================================================ */

window.JUNG = {

  /* ==========================================================
     MODALITA' COMPLETA — dodici archetipi
     ========================================================== */
  completo: {
    nome: 'I dodici archetipi',
    sottotitolo: 'Ventiquattro affermazioni · circa 6 minuti',
    fonte: 'Modello di Carol S. Pearson e Margaret Mark',
    scala: 5,

    /* Due affermazioni per ciascun archetipo: nessuno pesa piu' degli
       altri. Sono mescolate apposta, cosi' non si intuisce a cosa
       "serve" una risposta. */
    domande: [
      { t: 'Quando c’è un ostacolo davanti, la mia reazione istintiva è affrontarlo.', a: 'eroe' },
      { t: 'Ho bisogno di sentirmi libero di cambiare strada quando voglio.', a: 'esploratore' },
      { t: 'Mi accorgo che qualcuno sta male prima che me lo dica.', a: 'assistente' },
      { t: 'Se una cosa deve funzionare davvero, preferisco esserne responsabile io.', a: 'governante' },
      { t: 'Ho più idee di quante riesca a portarne a termine.', a: 'creatore' },
      { t: 'Prima di decidere ho bisogno di capire davvero come stanno le cose.', a: 'saggio' },
      { t: 'Se una regola non ha senso, non me la faccio andare bene.', a: 'ribelle' },
      { t: 'Anche nei momenti tesi mi viene naturale alleggerire l’atmosfera.', a: 'giullare' },
      { t: 'Tendo a pensare che le persone, in fondo, siano bene intenzionate.', a: 'innocente' },
      { t: 'Metto molto trasporto in quello che faccio e nelle persone a cui tengo.', a: 'amante' },
      { t: 'Riesco a intuire come andranno le cose prima che succedano.', a: 'mago' },
      { t: 'Mi sento più a mio agio fra persone alla mano che fra chi si dà delle arie.', a: 'orfano' },

      { t: 'Mi metto alla prova volentieri, anche quando nessuno me lo chiede.', a: 'eroe' },
      { t: 'Mi annoio in fretta se resto troppo a lungo nello stesso ruolo.', a: 'esploratore' },
      { t: 'Mi capita di mettere i bisogni degli altri davanti ai miei.', a: 'assistente' },
      { t: 'Mi metto a disagio quando le cose procedono senza un ordine chiaro.', a: 'governante' },
      { t: 'Ho bisogno di lasciare un segno mio in quello che faccio.', a: 'creatore' },
      { t: 'Mi interessa più capire a fondo un problema che risolverlo in fretta.', a: 'saggio' },
      { t: 'Mi dà energia mettere in discussione come si è sempre fatto.', a: 'ribelle' },
      { t: 'Prendersi troppo sul serio mi sembra un modo per perdersi il bello.', a: 'giullare' },
      { t: 'Preferisco le situazioni semplici e serene a quelle vantaggiose ma complicate.', a: 'innocente' },
      { t: 'La bellezza di un luogo, di un oggetto o di un gesto conta per me più di quanto ammetta.', a: 'amante' },
      { t: 'Mi attira l’idea di trasformare una situazione, non solo di gestirla.', a: 'mago' },
      { t: 'Le difficoltà che ho attraversato mi hanno reso più capace di capire gli altri.', a: 'orfano' }
    ],

    archetipi: {
      innocente: {
        nome: 'L’Innocente',
        motto: '«Il mondo è un buon posto, se lo lasci essere.»',
        desiderio: 'Vivere bene, in pace, senza doversi difendere.',
        paura: 'Essere punito per aver sbagliato, o scoprire che il mondo non merita fiducia.',
        descrizione: 'L’Innocente porta con sé una fiducia di fondo: nelle persone, nelle cose, nel fatto che alla fine si sistemi. È una forza vera, perché crea attorno a sé un clima in cui gli altri si rilassano e collaborano. Il rischio non è l’ingenuità in sé, ma il momento in cui, per non rovinare quel clima, si finge di non vedere un problema che invece c’è.',
        swot: {
          forza: ['Ottimismo che contagia', 'Capacità di dare fiducia', 'Lealtà e semplicità di rapporti'],
          debolezza: ['Difficoltà a guardare in faccia i problemi', 'Dipendenza da chi decide al posto suo', 'Delusione forte quando la fiducia viene tradita'],
          opportunita: ['Tenere unito un gruppo nei momenti difficili', 'Essere la persona di cui tutti si fidano'],
          minaccia: ['Essere approfittato da chi riconosce quella fiducia', 'Il disincanto, quando arriva tutto insieme']
        },
        consiglio: 'La fiducia non è il contrario della lucidità. Prova a fare una cosa sola: quando avverti che qualcosa non va ma preferiresti lasciar correre, dillo. Una volta. Con calma. Scoprirai che il clima buono regge benissimo anche una verità scomoda — e che rimandarla, invece, prima o poi lo rompe davvero.'
      },
      orfano: {
        nome: 'L’Orfano',
        motto: '«Siamo tutti sulla stessa barca.»',
        desiderio: 'Sentirsi parte di qualcosa, fra pari, senza dover fingere.',
        paura: 'Restare fuori, essere lasciato indietro o preso in giro.',
        descrizione: 'L’Orfano ha imparato dalla vita che le cose non sono garantite, e questo lo ha reso concreto e capace di stare vicino agli altri senza fare la morale. È l’archetipo che nessuno menziona nelle presentazioni ma che tiene insieme le squadre: quello con cui si può parlare davvero. Il suo rischio è trasformare il realismo in rassegnazione, e la ferita in identità.',
        swot: {
          forza: ['Empatia costruita sull’esperienza', 'Realismo senza cinismo', 'Capacità di stare fra pari'],
          debolezza: ['Tendenza a lamentarsi invece di muoversi', 'Aspettarsi il peggio per non restarci male', 'Fatica a chiedere per sé'],
          opportunita: ['Costruire legami solidi e duraturi', 'Essere il punto di riferimento umano di un gruppo'],
          minaccia: ['Restare fermo dove si sta scomodi ma al sicuro', 'Farsi usare da chi promette appartenenza']
        },
        consiglio: 'Sai riconoscere quando qualcosa non funziona: è un talento raro. Il passo che ti manca è il secondo — dire anche cosa proponi. Prova a non chiudere mai un’osservazione senza una richiesta concreta: passi da chi subisce a chi orienta, senza cambiare carattere.'
      },
      eroe: {
        nome: 'L’Eroe',
        motto: '«Dove c’è una volontà, c’è una strada.»',
        desiderio: 'Dimostrare il proprio valore con un’azione difficile e utile.',
        paura: 'Essere debole, tirarsi indietro, non essere all’altezza.',
        descrizione: 'L’Eroe è quello che si muove quando gli altri stanno ancora valutando. Ha coraggio, resistenza e un senso pratico che nelle emergenze vale più di qualsiasi analisi. Il prezzo lo conosce bene chi gli sta accanto: tende a caricarsi tutto, a scambiare la fatica per merito, e a non accorgersi di essere stanco finché non crolla.',
        swot: {
          forza: ['Coraggio e prontezza', 'Resistenza sotto pressione', 'Competenza costruita sul campo'],
          debolezza: ['Difficoltà ad accettare aiuto', 'Competitività anche quando non serve', 'Confonde il valore con la fatica'],
          opportunita: ['Guidare per esempio nei momenti critici', 'Portare a termine cose che altri lasciano a metà'],
          minaccia: ['Esaurimento, che arriva sempre di colpo', 'Allontanare chi si sente inutile accanto a lui']
        },
        consiglio: 'La prova che ti manca non è un’altra impresa: è delegarne una. Scegli una cosa che sai fare meglio di chiunque altro e lasciala a qualcun altro, accettando che venga fatta all’ottanta per cento. È la cosa più difficile che tu possa fare, ed è esattamente per questo che ti serve.'
      },
      assistente: {
        nome: 'L’Assistente',
        motto: '«Ama il prossimo tuo come te stesso.»',
        desiderio: 'Proteggere e aiutare le persone a cui tiene.',
        paura: 'Essere considerato egoista, o non servire a nessuno.',
        descrizione: 'L’Assistente vede i bisogni degli altri con un anticipo che sembra intuito ed è attenzione. Genera fiducia, tiene insieme le relazioni, ripara quello che si rompe. Il punto cieco è sempre lo stesso: nella lista delle persone di cui prendersi cura, il proprio nome non compare mai. E quando la cura diventa il modo per rendersi indispensabile, smette di essere un dono.',
        swot: {
          forza: ['Generosità concreta', 'Attenzione ai bisogni non detti', 'Capacità di far sentire le persone al sicuro'],
          debolezza: ['Non riesce a dire di no', 'Si trascura sistematicamente', 'Può rendersi indispensabile per essere amato'],
          opportunita: ['Creare legami profondi e duraturi', 'Fare una differenza reale nella vita di qualcuno'],
          minaccia: ['Esaurirsi senza accorgersene', 'Il rancore silenzioso di chi dà e non riceve']
        },
        consiglio: 'Prova a considerare un no come un atto di cura e non come un rifiuto: dicendo no a una richiesta, dici sì a chi ha davvero bisogno di te — e a te stesso. Comincia da una richiesta piccola, questa settimana. Il mondo non crolla, e tu ti accorgi di avere un limite: è esattamente quello che ti mancava.'
      },
      esploratore: {
        nome: 'L’Esploratore',
        motto: '«Non costruire recinti attorno a me.»',
        desiderio: 'Sentirsi libero e scoprire chi si è, per strada.',
        paura: 'Restare intrappolato in una vita che non ha scelto.',
        descrizione: 'L’Esploratore ha bisogno di orizzonte. È curioso, autonomo, non ha paura di andare dove non conosce nessuno, e questo lo rende bravissimo negli inizi. Il suo problema non è partire, è restare: quando una situazione diventa familiare, la sente stretta e comincia a guardare fuori, spesso proprio quando starebbe per dare i frutti.',
        swot: {
          forza: ['Indipendenza autentica', 'Curiosità che apre strade', 'Coraggio di ricominciare'],
          debolezza: ['Irrequietezza cronica', 'Fatica a impegnarsi a lungo', 'Confonde la noia con la fine di qualcosa'],
          opportunita: ['Trovare possibilità che gli altri non vedono', 'Costruirsi una vita che gli somiglia davvero'],
          minaccia: ['Ripartire sempre da zero senza mai capitalizzare', 'La solitudine, quando la libertà diventa distanza']
        },
        consiglio: 'La prossima volta che ti viene voglia di cambiare, prova a chiederti se vuoi andare da qualche parte o solo andare via. Se è la seconda, resta ancora tre mesi: quasi tutto quello che hai lasciato a metà stava per diventare interessante proprio lì.'
      },
      ribelle: {
        nome: 'Il Ribelle',
        motto: '«Le regole sono fatte per essere rotte.»',
        desiderio: 'Rovesciare quello che non funziona.',
        paura: 'Essere irrilevante, non contare niente.',
        descrizione: 'Il Ribelle vede subito l’assurdità che tutti hanno smesso di notare, e ha il fegato di dirla. È l’archetipo dei cambiamenti veri: nessuna organizzazione si riforma senza qualcuno disposto a essere antipatico. Il confine sottile è fra rompere qualcosa perché va sostituito e romperlo perché rompere dà la sensazione di esistere.',
        swot: {
          forza: ['Vede le storture che gli altri accettano', 'Coraggio di dire cose scomode', 'Energia per il cambiamento'],
          debolezza: ['Si oppone anche quando non serve', 'Cinismo come abitudine', 'Distrugge più in fretta di quanto costruisca'],
          opportunita: ['Innescare cambiamenti che nessun altro avvierebbe', 'Difendere chi non ha voce'],
          minaccia: ['Isolarsi fino a non essere più ascoltato', 'Bruciare ponti che sarebbero serviti']
        },
        consiglio: 'La tua critica è quasi sempre giusta: il problema è che chi la riceve deve prima sopravvivere a come gliela dai. Prova la regola del «smonto e propongo»: non lasciare mai una demolizione senza un’alternativa concreta nella stessa frase. La stessa verità, detta così, ottiene il triplo.'
      },
      amante: {
        nome: 'L’Amante',
        motto: '«Tu sei l’unico, l’unica.»',
        desiderio: 'Intimità, bellezza, esperienze che si sentano davvero.',
        paura: 'Essere lasciato, non essere voluto, restare solo.',
        descrizione: 'L’Amante mette dentro le cose una temperatura che gli altri non hanno: nelle relazioni, nel lavoro, nel modo in cui apparecchia una tavola. È quello che rende memorabile ciò che sarebbe stato solo corretto. La sua fragilità è che quella stessa intensità, rivolta verso una persona sola, può diventare dipendenza e fargli perdere i propri contorni.',
        swot: {
          forza: ['Passione che si sente', 'Capacità di creare legami veri', 'Gusto e attenzione alla bellezza'],
          debolezza: ['Dipendenza affettiva', 'Perde sé stesso dentro le relazioni', 'Gelosia e bisogno di conferme'],
          opportunita: ['Costruire rapporti che durano', 'Portare calore dove c’è solo efficienza'],
          minaccia: ['Restare male ogni volta che l’altro non ricambia allo stesso modo', 'Perdere obiettività su chi ha davanti']
        },
        consiglio: 'Fatti una domanda ogni tanto: se domani questa relazione o questo progetto finisse, cosa resterebbe di me? Se la risposta è «poco», non è un problema dell’altro. Coltiva una cosa che sia solo tua e che non dipenda da nessuno: paradossalmente è quello che rende sopportabile amare così tanto.'
      },
      creatore: {
        nome: 'Il Creatore',
        motto: '«Se lo puoi immaginare, si può fare.»',
        desiderio: 'Dare forma a qualcosa che prima non c’era.',
        paura: 'Fare una cosa mediocre, o non fare niente di proprio.',
        descrizione: 'Il Creatore non sopporta l’idea di eseguire e basta: ha bisogno che quello che esce dalle sue mani porti il suo segno. È immaginifico, prolifico, capace di vedere la forma finita prima di cominciare. Ed è anche l’archetipo che si blocca di più, perché il confronto fra l’idea perfetta in testa e la cosa imperfetta sul tavolo lo paralizza.',
        swot: {
          forza: ['Immaginazione concreta', 'Capacità di dare forma alle idee', 'Standard alti'],
          debolezza: ['Perfezionismo che blocca', 'Comincia più di quanto finisca', 'Sensibilità eccessiva alle critiche'],
          opportunita: ['Fare cose che nessun altro avrebbe fatto uguali', 'Trasformare un’intuizione in qualcosa di reale'],
          minaccia: ['Il cassetto pieno di progetti al novanta per cento', 'Bruciarsi inseguendo un livello che non arriva mai']
        },
        consiglio: 'Un lavoro finito all’ottanta per cento e visto da qualcuno vale più di uno perfetto e mai uscito dal cassetto. Datti una regola meccanica: una data di consegna decisa prima di iniziare, e la promessa di consegnare comunque. Il novanta per cento della qualità che credi di perdere non se ne accorge nessuno tranne te.'
      },
      giullare: {
        nome: 'Il Giullare',
        motto: '«Si vive una volta sola.»',
        desiderio: 'Godersi il momento, e farlo godere anche agli altri.',
        paura: 'Annoiarsi, o annoiare. Restare intrappolato nel grigio.',
        descrizione: 'Il Giullare ha un talento che sembra frivolo e non lo è: sa cambiare la temperatura di una stanza. Nei gruppi tesi è la valvola, nelle riunioni bloccate è quello che dice la battuta che sblocca. Sotto la leggerezza c’è quasi sempre una lettura molto acuta delle persone. Il rischio è usare l’ironia come porta di servizio per non entrare mai nelle cose serie.',
        swot: {
          forza: ['Sa alleggerire senza banalizzare', 'Spontaneità e presenza', 'Legge le persone in fretta'],
          debolezza: ['Evita i discorsi seri', 'Fatica a farsi prendere sul serio', 'Rimanda gli impegni'],
          opportunita: ['Sciogliere situazioni che nessun altro sblocca', 'Dire verità scomode facendole passare'],
          minaccia: ['Essere considerato simpatico e non affidabile', 'Accorgersi tardi di problemi rimandati ridendo']
        },
        consiglio: 'La battuta ti riesce sempre: prova a tenerla in tasca per una volta. Nella prossima conversazione difficile, resta nel serio trenta secondi in più di quanto ti venga naturale, prima di alleggerire. Non perdi il tuo talento, ci aggiungi il peso che ti manca perché gli altri si fidino.'
      },
      saggio: {
        nome: 'Il Saggio',
        motto: '«La verità vi farà liberi.»',
        desiderio: 'Capire come funzionano davvero le cose.',
        paura: 'Essere ingannato, o dire una sciocchezza.',
        descrizione: 'Il Saggio non si accontenta della versione breve. Studia, verifica, distingue, e per questo è la persona a cui gli altri chiedono un parere quando la decisione conta davvero. Il suo rischio non è sbagliare: è non decidere. Perché c’è sempre un dato in più da raccogliere, e nel frattempo la finestra si chiude.',
        swot: {
          forza: ['Pensiero rigoroso', 'Non si fa trascinare dall’emotività', 'Sa distinguere il rumore dal segnale'],
          debolezza: ['Analizza oltre il punto utile', 'Distacco che sembra freddezza', 'Fatica a decidere con dati incompleti'],
          opportunita: ['Diventare il riferimento su cui gli altri si orientano', 'Risolvere problemi che richiedono profondità'],
          minaccia: ['Perdere occasioni per eccesso di prudenza', 'Isolarsi in un ruolo solo intellettuale']
        },
        consiglio: 'Datti una soglia esplicita: «con il settanta per cento delle informazioni, decido». Scrivila da qualche parte. Quasi tutte le decisioni che rimandi in attesa di certezza si prendono benissimo così, e le poche in cui serve il novanta per cento le riconoscerai subito, perché sono rare.'
      },
      mago: {
        nome: 'Il Mago',
        motto: '«Tutto può diventare qualcos’altro.»',
        desiderio: 'Capire le leggi profonde di una situazione e usarle per trasformarla.',
        paura: 'Provocare conseguenze che non riesce a governare.',
        descrizione: 'Il Mago vede i collegamenti prima degli altri: capisce dove sta la leva e con che gesto piccolo si sposta una cosa grande. È l’archetipo delle trasformazioni riuscite e anche quello che rischia di più, perché la stessa capacità di influenzare può scivolare nella manipolazione, e la visione può staccarsi da quello che è realmente possibile.',
        swot: {
          forza: ['Vede i nessi e le leve', 'Carisma naturale', 'Capacità di far accadere i cambiamenti'],
          debolezza: ['Può manipolare senza accorgersene', 'Promette più di quanto sia realizzabile', 'Fatica a stare nelle cose ordinarie'],
          opportunita: ['Sbloccare situazioni che sembravano ferme', 'Guidare trasformazioni vere, non cosmetiche'],
          minaccia: ['Perdere credibilità dopo una visione non mantenuta', 'Usare l’influenza per sé e accorgersene tardi']
        },
        consiglio: 'La tua visione vale quanto la prima cosa concreta che ne segue. Ogni volta che annunci una trasformazione, dichiara nella stessa frase il primo passo verificabile e la data. È una gabbia, ma è la gabbia che trasforma un visionario in qualcuno di cui ci si fida.'
      },
      governante: {
        nome: 'Il Governante',
        motto: '«Il potere non è tutto: è l’unica cosa.»',
        desiderio: 'Creare un ordine che funzioni e che duri.',
        paura: 'Il caos, l’imprevisto, perdere il controllo.',
        descrizione: 'Il Governante si assume responsabilità che nessuno gli ha chiesto, perché non sopporta di vedere le cose andare alla deriva. Organizza, decide, protegge la struttura: senza di lui molte cose semplicemente non starebbero in piedi. Il rovescio è che l’ordine tende a diventare un fine, e il controllo un modo per non provare ansia.',
        swot: {
          forza: ['Senso di responsabilità', 'Capacità di organizzare e decidere', 'Affidabilità nel tempo'],
          debolezza: ['Controlla più del necessario', 'Rigidità davanti all’imprevisto', 'Delega male, e poi si lamenta del carico'],
          opportunita: ['Costruire cose che funzionano anche senza di lui', 'Dare stabilità a chi ne ha bisogno'],
          minaccia: ['La resistenza silenziosa di chi si sente controllato', 'Il carico che si accumula fino a diventare insostenibile']
        },
        consiglio: 'Prova a misurare il tuo lavoro da un altro numero: non quanto tieni sotto controllo, ma quanto continua a funzionare quando non ci sei. Scegli una cosa e lasciala andare per un mese senza intervenire. Se regge, hai costruito bene. Se non regge, hai scoperto esattamente dove lavorare.'
      }
    },

    /* ordine di visualizzazione sul radar */
    ordine: ['innocente', 'orfano', 'eroe', 'assistente', 'esploratore', 'ribelle',
             'amante', 'creatore', 'giullare', 'saggio', 'mago', 'governante']
  },

  /* ==========================================================
     MODALITA' BREVE — quattro archetipi classici
     ========================================================== */
  breve: {
    nome: 'I quattro archetipi classici',
    sottotitolo: 'Dodici affermazioni · circa 3 minuti',
    fonte: 'Figure della psicologia analitica di Carl Gustav Jung',
    scala: 5,

    domande: [
      { t: 'Quando c’è un problema, mi aspetto da me stesso di risolverlo.', a: 'eroe' },
      { t: 'Mi entusiasmo facilmente per progetti nuovi.', a: 'puer' },
      { t: 'So adattare il mio modo di fare al tono di ogni ambiente.', a: 'persona' },
      { t: 'Mi viene naturale prendermi cura di chi mi sta intorno.', a: 'madre' },

      { t: 'Non mi tiro indietro davanti a una prova difficile.', a: 'eroe' },
      { t: 'Prendere impegni definitivi mi mette a disagio.', a: 'puer' },
      { t: 'Mi importa dell’immagine che gli altri hanno di me.', a: 'persona' },
      { t: 'Faccio fatica a dire di no a chi mi chiede aiuto.', a: 'madre' },

      { t: 'Faccio fatica ad ammettere che ho bisogno di aiuto.', a: 'eroe' },
      { t: 'Preferisco tenere aperte più possibilità che sceglierne una.', a: 'puer' },
      { t: 'In pubblico mostro una versione di me più composta di quella vera.', a: 'persona' },
      { t: 'Proteggere le persone a cui tengo viene prima di quasi tutto.', a: 'madre' }
    ],

    archetipi: {
      eroe: {
        nome: 'L’Eroe',
        motto: '«Me ne occupo io.»',
        desiderio: 'Misurarsi con una prova e uscirne più forte.',
        paura: 'Scoprirsi debole davanti agli altri.',
        descrizione: 'Nella lettura junghiana l’Eroe è la figura che affronta il proprio percorso di crescita attraversando le prove invece di aggirarle: è l’Io che si separa e si costruisce. Nella vita di tutti i giorni si riconosce da un riflesso preciso: davanti a un problema, si fa avanti prima ancora di aver deciso di farlo. La sua fatica è riconoscere il limite, perché ammetterlo somiglia troppo ad arrendersi.',
        swot: {
          forza: ['Coraggio e determinazione', 'Resistenza nelle difficoltà', 'Affidabilità nei momenti decisivi'],
          debolezza: ['Ignora i propri limiti', 'Competitività fuori luogo', 'Non chiede aiuto'],
          opportunita: ['Guidare gli altri con l’esempio', 'Portare a termine imprese difficili'],
          minaccia: ['Esaurimento', 'Conflitti con chi non regge il suo passo']
        },
        consiglio: 'Chiedi aiuto una volta su una cosa che sapresti fare da solo. Non perché ti serva: perché ti alleni a non essere l’unica risorsa disponibile. È la differenza fra essere forte ed essere indispensabile, e solo la prima delle due dura nel tempo.'
      },
      puer: {
        nome: 'Il Puer Aeternus',
        motto: '«Non ancora, non adesso, non per sempre.»',
        desiderio: 'Tenere aperto il possibile, non chiudersi in una forma sola.',
        paura: 'La vita definitiva: quella in cui non si torna indietro.',
        descrizione: 'Il “fanciullo eterno” è la figura descritta da Jung e approfondita da Marie-Louise von Franz: entusiasmo, freschezza, capacità di cominciare, unita a una resistenza profonda verso ciò che è irreversibile. Non è immaturità e basta: è la parte che tiene viva la possibilità. Diventa un problema quando l’attesa della vita giusta impedisce di viverne una qualunque.',
        swot: {
          forza: ['Entusiasmo che accende', 'Creatività e apertura', 'Capacità di ricominciare da capo'],
          debolezza: ['Fatica con gli impegni lunghi', 'Rimanda le scelte definitive', 'Si stanca quando arriva la routine'],
          opportunita: ['Avviare cose nuove che altri non oserebbero', 'Portare freschezza dove tutto è già deciso'],
          minaccia: ['Una vita di inizi senza seguito', 'Accorgersi tardi che le possibilità non erano infinite']
        },
        consiglio: 'Non ti serve rinunciare alla libertà: ti serve un esperimento. Scegli una cosa sola e portala avanti per sei mesi anche quando smette di essere entusiasmante. Non per diventare adulto — per scoprire cosa c’è dall’altra parte della noia, che è l’unica parte che finora non hai mai visto.'
      },
      persona: {
        nome: 'La Persona',
        motto: '«Questa è la versione che vi serve.»',
        desiderio: 'Stare bene nel mondo, essere accettato, funzionare.',
        paura: 'Essere visto per come si è davvero e non andare bene.',
        descrizione: 'La Persona è la maschera sociale: in Jung non è un difetto, è uno strumento necessario per stare fra gli altri. Chi ce l’ha ben sviluppata legge i contesti, si adatta, evita gli attriti inutili. Il rischio arriva quando la maschera si incolla: si smette di sapere dove finisce il ruolo e dove comincia la persona, e la vita diventa una recita ben riuscita ma stancante.',
        swot: {
          forza: ['Legge i contesti e si adatta', 'Diplomazia naturale', 'Sa stare nei ruoli'],
          debolezza: ['Conformismo', 'Fatica a mostrarsi autentico', 'Dipende dal giudizio altrui'],
          opportunita: ['Muoversi bene in ambienti diversi', 'Fare da ponte fra mondi che non si parlano'],
          minaccia: ['Perdere di vista chi si è davvero', 'La stanchezza di reggere sempre una parte']
        },
        consiglio: 'Scegli un contesto — uno solo, e non il più rischioso — in cui provare a togliere la maschera di un centimetro: dire un’opinione vera, ammettere che non sai una cosa. Serve a verificare una cosa che sospetti da tempo: che quasi tutti ti accetterebbero anche così, e che la fatica te la stai facendo da solo.'
      },
      madre: {
        nome: 'La Grande Madre',
        motto: '«Vieni qui, ci penso io.»',
        desiderio: 'Nutrire, proteggere, tenere insieme.',
        paura: 'Non essere più necessaria a nessuno.',
        descrizione: 'La Grande Madre è l’archetipo della cura e della generazione: accoglie, nutre, protegge. Jung ne descriveva però anche il lato in ombra, quello che trattiene: la stessa protezione che salva può impedire di crescere, a chi la riceve e a chi la offre. È l’archetipo più amato e quello che piò facilmente si dimentica di esistere per conto proprio.',
        swot: {
          forza: ['Empatia e accoglienza', 'Capacità di far sentire al sicuro', 'Presenza costante'],
          debolezza: ['Si sacrifica troppo', 'Non sa dire di no', 'Può soffocare chi protegge'],
          opportunita: ['Essere il punto fermo per molte persone', 'Costruire ambienti in cui gli altri crescono'],
          minaccia: ['Esaurimento emotivo', 'Il vuoto quando chi accudiva non ha più bisogno']
        },
        consiglio: 'La prova di una cura riuscita non è quanto bisogno hanno di te: è quanto sono capaci di cavarsela senza. Prova a non intervenire su una cosa piccola e lascia che se la sbrighino. Non stai togliendo affetto: stai smettendo di fare al posto loro, che è la forma più difficile di generosità.'
      }
    },

    ordine: ['eroe', 'puer', 'persona', 'madre']
  },

  /* etichette della scala, dalla meno alla piu' vicina */
  scalaEtichette: [
    'Per niente',
    'Poco',
    'In parte',
    'Abbastanza',
    'Moltissimo'
  ]
};
