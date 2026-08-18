/* ============================================================
   Leadership Etica — tracce d'intervista
   ------------------------------------------------------------
   Per aggiungere un ruolo basta una voce in "ruoli": nessuna
   modifica al codice. Ogni ruolo ha le sue domande in italiano
   e in inglese; alle sue si aggiungono sempre quelle generali.
   ============================================================ */

window.INTERVISTE = {

  generali: {
    it: [
      'Quali principi etici guidano concretamente il suo modo di dirigere?',
      'Mi racconta una situazione in cui ha dovuto scegliere fra ciò che conveniva e ciò che riteneva giusto?',
      'Come si accorge che nella sua organizzazione la cultura etica è reale e non solo dichiarata?',
      'Che cosa fa, in pratica, perché le persone si sentano libere di segnalare un problema?',
      'Come valuta l’impatto delle sue decisioni su chi non è seduto al tavolo quando si decide?'
    ],
    en: [
      'Which ethical principles concretely guide the way you lead?',
      'Can you describe a situation where you had to choose between what was convenient and what you believed was right?',
      'How do you know whether the ethical culture in your organisation is real rather than merely stated?',
      'What do you do, in practice, so that people feel safe raising a concern?',
      'How do you assess the impact of your decisions on those who are not in the room when they are made?'
    ]
  },

  ruoli: [
    {
      id: 'industria',
      nome: { it: 'Direttore di stabilimento', en: 'Plant director' },
      domande: {
        it: [
          'Come tiene insieme la spinta all’efficienza e la sicurezza di chi lavora in reparto?',
          'Quali criteri usa quando un fornitore è conveniente ma poco trasparente sulla filiera?',
          'Che peso hanno gli obiettivi ambientali nelle decisioni di produzione quotidiane?',
          'Come gestisce la pressione sui numeri quando arriva dall’alto e ricade sulle persone?',
          'Che cosa cambierebbe, nel suo settore, se potesse decidere lei?'
        ],
        en: [
          'How do you reconcile the drive for efficiency with the safety of people on the shop floor?',
          'What criteria do you apply when a supplier is cost-effective but opaque about its supply chain?',
          'How much weight do environmental targets carry in day-to-day production decisions?',
          'How do you handle pressure on numbers when it comes from above and lands on people?',
          'What would you change in your industry if the decision were yours?'
        ]
      }
    },
    {
      id: 'ad',
      nome: { it: 'Amministratore delegato', en: 'Chief executive' },
      domande: {
        it: [
          'Come costruisce la fiducia con chi ha molto da perdere se sbaglia le sue decisioni?',
          'Quali princìpi guidano le sue scelte di investimento, oltre al rendimento?',
          'Come ha affrontato la volta in cui l’interesse degli azionisti e quello dei dipendenti non coincidevano?',
          'Quanto conta, nella valutazione dei suoi dirigenti, il come hanno ottenuto i risultati?',
          'Che cosa la porterebbe a rinunciare a un affare redditizio?'
        ],
        en: [
          'How do you build trust with those who stand to lose most if your decisions are wrong?',
          'Which principles guide your investment choices beyond returns?',
          'How did you handle a moment when shareholder interest and employee interest diverged?',
          'How much does *how* results were achieved count in the way you assess your executives?',
          'What would make you walk away from a profitable deal?'
        ]
      }
    },
    {
      id: 'it',
      nome: { it: 'Responsabile IT o dei sistemi informativi', en: 'Head of IT' },
      domande: {
        it: [
          'Quali sono oggi le questioni etiche più concrete nella protezione dei dati che gestite?',
          'Come decide se una tecnologia utile all’azienda è accettabile per le persone che ne subiscono gli effetti?',
          'Qual è il suo approccio all’uso dell’intelligenza artificiale su dati che riguardano dipendenti o clienti?',
          'Che cosa fa quando la scelta più sicura è anche la più scomoda per il business?',
          'Come promuove una cultura etica in un gruppo tecnico abituato a ragionare per requisiti?'
        ],
        en: [
          'What are the most concrete ethical questions in the data you handle today?',
          'How do you decide whether a technology that benefits the company is acceptable to the people affected by it?',
          'What is your approach to using artificial intelligence on employee or customer data?',
          'What do you do when the safest choice is also the most inconvenient for the business?',
          'How do you build an ethical culture in a technical team used to thinking in requirements?'
        ]
      }
    },
    {
      id: 'hr',
      nome: { it: 'Direttore risorse umane', en: 'Head of people' },
      domande: {
        it: [
          'Come garantisce che i criteri di selezione e di avanzamento siano davvero equi?',
          'Che cosa succede, nella sua organizzazione, quando chi ottiene risultati si comporta male?',
          'Come tutela chi segnala un abuso senza esporlo a ritorsioni?',
          'Quanto pesa il benessere delle persone nelle decisioni che riguardano i carichi di lavoro?',
          'Qual è la decisione più difficile che ha preso su una persona, e come l’ha comunicata?'
        ],
        en: [
          'How do you ensure hiring and promotion criteria are genuinely fair?',
          'What happens in your organisation when a high performer behaves badly?',
          'How do you protect someone who reports misconduct from retaliation?',
          'How much does people\'s wellbeing weigh in decisions about workload?',
          'What is the hardest decision you have made about a person, and how did you communicate it?'
        ]
      }
    },
    {
      id: 'sanita',
      nome: { it: 'Direttore sanitario', en: 'Medical director' },
      domande: {
        it: [
          'Come si decide quando le risorse non bastano per tutti i bisogni che avete davanti?',
          'Che ruolo ha la volontà del paziente quando entra in conflitto con il giudizio clinico?',
          'Come garantisce che il consenso informato sia una scelta reale e non una firma?',
          'Come affronta un errore del personale nei confronti del paziente e della famiglia?',
          'Che cosa fa perché chi lavora in prima linea possa dire di essere in difficoltà?'
        ],
        en: [
          'How do you decide when resources are not enough for the needs in front of you?',
          'What role does patient will play when it conflicts with clinical judgement?',
          'How do you ensure informed consent is a real choice rather than a signature?',
          'How do you handle a staff error towards the patient and their family?',
          'What do you do so front-line staff can say they are struggling?'
        ]
      }
    },
    {
      id: 'scuola',
      nome: { it: 'Dirigente scolastico', en: 'School principal' },
      domande: {
        it: [
          'Come tiene insieme l’equità verso tutti gli studenti e l’attenzione a chi ha più bisogno?',
          'Che cosa fa quando la richiesta di una famiglia confligge con l’interesse della classe?',
          'Come affronta un comportamento scorretto di un docente stimato?',
          'Quali criteri usa per decidere dove destinare risorse sempre insufficienti?',
          'Che segnali le dicono che la scuola è davvero un posto sicuro per uno studente fragile?'
        ],
        en: [
          'How do you balance fairness to all students with attention to those who need most?',
          'What do you do when a family\'s request conflicts with the interest of the class?',
          'How do you address misconduct by a well-regarded teacher?',
          'What criteria do you use to allocate resources that are always insufficient?',
          'What signals tell you the school is genuinely safe for a vulnerable student?'
        ]
      }
    },
    {
      id: 'vendite',
      nome: { it: 'Direttore commerciale', en: 'Sales director' },
      domande: {
        it: [
          'Dove passa, per lei, il confine fra persuadere e manipolare?',
          'Che cosa succede se un venditore raggiunge il budget promettendo cose che non manterremo?',
          'Come gestisce un cliente che chiede qualcosa di irregolare ma vale molto?',
          'Quanto è disposto a dire a un cliente che il vostro prodotto non fa al caso suo?',
          'Come sono costruiti gli incentivi del suo team, e che comportamenti premiano davvero?'
        ],
        en: [
          'Where, for you, is the line between persuading and manipulating?',
          'What happens if a salesperson hits target by promising things you will not deliver?',
          'How do you handle a client who asks for something irregular but is worth a lot?',
          'How willing are you to tell a client your product is not right for them?',
          'How are your team\'s incentives built, and what behaviour do they actually reward?'
        ]
      }
    },
    {
      id: 'impresa',
      nome: { it: 'Imprenditore di piccola impresa', en: 'Small business owner' },
      domande: {
        it: [
          'Quando i soldi sono pochi, quale principio non è negoziabile comunque vada?',
          'Come tratta un dipendente che non funziona più, in un’azienda dove vi conoscete tutti?',
          'Che cosa fa quando un cliente importante paga in ritardo e i suoi fornitori aspettano lei?',
          'Come tiene separati gli interessi dell’azienda da quelli della famiglia?',
          'Che cosa vorrebbe che dicessero di lei le persone che hanno lavorato con lei?'
        ],
        en: [
          'When money is tight, which principle stays non-negotiable whatever happens?',
          'How do you handle an employee who no longer fits, in a company where everyone knows everyone?',
          'What do you do when a major client pays late and your suppliers are waiting on you?',
          'How do you keep the interests of the business separate from those of the family?',
          'What would you want people who worked with you to say about you?'
        ]
      }
    }
  ],

  etichette: {
    it: {
      titoloDoc: 'Intervista sulla leadership etica',
      ruolo: 'Ruolo',
      data: 'Data',
      senzaRisposta: '(nessuna risposta)'
    },
    en: {
      titoloDoc: 'Ethical leadership interview',
      ruolo: 'Role',
      data: 'Date',
      senzaRisposta: '(no answer)'
    }
  }
};
