/* ============================================================
   Mini Web App — registro della raccolta
   ------------------------------------------------------------
   Il menu si costruisce da qui. Per aggiungere un'app: una voce
   in "app" e una cartella con lo stesso "id". Nient'altro.

   E' un file .js e non .json apposta: cosi' il menu funziona
   anche aprendo index.html direttamente da disco, senza server.

   Categorie disponibili: strumenti, test, letture, extra.
   Istruzioni complete in assets/LEGGIMI.md
   ============================================================ */

window.MWA = {
  "categorie": [
    {
      "id": "strumenti",
      "nome": "Strumenti",
      "descrizione": "Cose che si usano più di una volta."
    },
    {
      "id": "test",
      "nome": "Test e questionari",
      "descrizione": "Ti fai qualche domanda e ne esce un ritratto."
    },
    {
      "id": "letture",
      "nome": "Letture e ispirazione",
      "descrizione": "Una frase al giorno, da tenere in tasca."
    },
    {
      "id": "extra",
      "nome": "Altro",
      "descrizione": "Esperimenti e scherzi."
    }
  ],
  "app": [
    {
      "id": "app1",
      "titolo": "Ruota della Vita",
      "sommario": "Otto aree della tua vita da 0 a 10, e il disegno che ne esce. Salva i rilevamenti e confronta come cambi nel tempo.",
      "categoria": "strumenti",
      "accento": "#2f8f6f",
      "tag": [
        "auto-valutazione",
        "equilibrio",
        "grafico"
      ],
      "aggiunta": "2024-09-28",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app2",
      "titolo": "Gestione Attività",
      "sommario": "La matrice urgente/importante di Eisenhower. Trascina le attività tra i quadranti, anche col dito, e porta via un CSV.",
      "categoria": "strumenti",
      "accento": "#c2683a",
      "tag": [
        "produttività",
        "Eisenhower",
        "attività"
      ],
      "aggiunta": "2024-09-30",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app3",
      "titolo": "Generatore di password",
      "sommario": "Password davvero casuali, generate dal browser e mai trasmesse. Con stima della robustezza e modalità frase.",
      "categoria": "strumenti",
      "accento": "#5b62d6",
      "tag": [
        "sicurezza",
        "utilità"
      ],
      "aggiunta": "2024-09-27",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app4",
      "titolo": "Test Personalità · Quattro Colori",
      "sommario": "Rosso, Giallo, Blu, Verde: sedici domande per capire con che stile ti muovi tra le persone.",
      "categoria": "test",
      "accento": "#c9821b",
      "tag": [
        "personalità",
        "quattro colori",
        "SWOT"
      ],
      "aggiunta": "2024-09-27",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app7",
      "titolo": "Test Archetipi di Jung",
      "sommario": "I dodici archetipi in ventiquattro domande, oppure i quattro archetipi classici in versione breve. Con radar, SWOT e consigli.",
      "categoria": "test",
      "accento": "#8a5cd0",
      "tag": [
        "Jung",
        "archetipi",
        "SWOT"
      ],
      "aggiunta": "2024-09-29",
      "aggiornata": "2026-08-18",
      "nota": "Riunisce e sostituisce i cinque test separati di prima."
    },
    {
      "id": "app12",
      "titolo": "Quiz Generazionale",
      "sommario": "Confronta la tua generazione anagrafica con quella della tua testa. Spesso non coincidono.",
      "categoria": "test",
      "accento": "#2f7fb5",
      "tag": [
        "generazioni",
        "media",
        "confronto"
      ],
      "aggiunta": "2024-10-21",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app13",
      "titolo": "Leadership Etica",
      "sommario": "Tracce d'intervista sull'etica per ruolo e lingua. Scrivi le risposte, salvale ed esportale in Markdown o PDF.",
      "categoria": "strumenti",
      "accento": "#2f6ad1",
      "tag": [
        "leadership",
        "etica",
        "intervista"
      ],
      "aggiunta": "2025-01-12",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app11",
      "titolo": "Saggezza Stoica",
      "sommario": "Marco Aurelio, Seneca, Epitteto e qualche voce contemporanea. Filtri per autore e tema, preferiti, frase del giorno.",
      "categoria": "letture",
      "accento": "#a06a2c",
      "tag": [
        "stoicismo",
        "citazioni",
        "filosofia"
      ],
      "aggiunta": "2024-10-02",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app14",
      "titolo": "L'Arte della Guerra",
      "sommario": "Cento passaggi di Sun Tzu, uno o più alla volta. Strategia che si legge in trenta secondi.",
      "categoria": "letture",
      "accento": "#c9a227",
      "tag": [
        "Sun Tzu",
        "strategia",
        "citazioni"
      ],
      "aggiunta": "2025-10-29",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app15",
      "titolo": "Sei Cappelli per Pensare",
      "sommario": "Il pensiero parallelo di Edward de Bono: sessioni guidate, timer per ogni cappello e sintesi esportabile.",
      "categoria": "strumenti",
      "accento": "#7c8cf8",
      "tag": [
        "de Bono",
        "decisioni",
        "riunioni",
        "PWA"
      ],
      "aggiunta": "2026-08-18",
      "aggiornata": "2026-08-18"
    },
    {
      "id": "app16",
      "titolo": "La Matrice della Risposta",
      "sommario": "Sette domande per decidere se vale la pena entrare in una conversazione. Dal modello di Sebastiano Zanolli.",
      "categoria": "strumenti",
      "accento": "#d05c72",
      "tag": [
        "Zanolli",
        "comunicazione",
        "decisioni"
      ],
      "aggiunta": "2026-08-03",
      "aggiornata": "2026-08-03"
    },
    {
      "id": "app10",
      "titolo": "Ti piacciono le mie mini app?",
      "sommario": "Uno scherzo con un pulsante dispettoso. E, se vuoi dirmelo sul serio, un modo per scrivermi.",
      "categoria": "extra",
      "accento": "#d0763c",
      "tag": [
        "scherzo",
        "feedback"
      ],
      "aggiunta": "2024-09-28",
      "aggiornata": "2026-08-18"
    }
  ],
  "ritirate": [
    {
      "id": "app5",
      "verso": "app7",
      "motivo": "Confluita nel test unificato degli archetipi."
    },
    {
      "id": "app6",
      "verso": "app7",
      "motivo": "Confluita nel test unificato degli archetipi."
    },
    {
      "id": "app8",
      "verso": "app7",
      "motivo": "Diventata la modalità breve, con i quattro archetipi classici."
    },
    {
      "id": "app9",
      "verso": "app7",
      "motivo": "Confluita nel test unificato degli archetipi."
    }
  ]
};
