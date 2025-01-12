// Domande in italiano e inglese
const questions = {
    manager: {
      italian: [
        "Come bilancia l'innovazione tecnologica con la responsabilità etica?",
        "Quali sono le principali considerazioni etiche per garantire la sostenibilità?",
        "Come affronta le preoccupazioni relative alla privacy e sicurezza dei dati?",
        "Può descrivere una decisione difficile che ha preso per bilanciare profitti ed etica?",
        "Come immagina un futuro etico per l'industria della domotica?"
      ],
      english: [
        "How do you balance technological innovation with ethical responsibility?",
        "What are the main ethical considerations to ensure sustainability?",
        "How do you address concerns about data privacy and security?",
        "Can you describe a difficult decision you made to balance profits and ethics?",
        "How do you envision an ethical future for the home automation industry?"
      ]
    },
    ceo: {
      italian: [
        "Come promuove la trasparenza per costruire fiducia?",
        "Quali principi guida segue per decidere in cosa investire?",
        "Come ha affrontato sfide etiche nel settore bancario?",
        "Quali iniziative adotta per garantire un accesso equo ai servizi finanziari?",
        "Come mantiene l'integrità in un settore competitivo?"
      ],
      english: [
        "How do you promote transparency to build trust?",
        "What guiding principles do you follow when deciding where to invest?",
        "How have you addressed ethical challenges in the banking sector?",
        "What initiatives do you take to ensure fair access to financial services?",
        "How do you maintain integrity in a competitive sector?"
      ]
    },
    it: {
      italian: [
        "Quali sono le principali sfide etiche nella protezione dei dati?",
        "Come garantisce che le tecnologie rispettino i diritti dei clienti?",
        "Qual è il suo approccio etico all'uso dell'intelligenza artificiale?",
        "Come integra principi di sostenibilità nelle decisioni tecnologiche?",
        "Come promuove una cultura etica nel suo team IT?"
      ],
      english: [
        "What are the main ethical challenges in data protection?",
        "How do you ensure technologies respect customers' rights?",
        "What is your ethical approach to using artificial intelligence?",
        "How do you integrate sustainability principles into technology decisions?",
        "How do you promote an ethical culture within your IT team?"
      ]
    },
    general: {
      italian: [
        "Quali principi etici guidano il suo stile di leadership?",
        "Può condividere un esempio concreto in cui ha dovuto affrontare un dilemma etico?",
        "Come definirebbe una 'cultura etica' all'interno della sua organizzazione?",
        "Quali strategie utilizza per promuovere il benessere dei dipendenti?",
        "Come valuta l’impatto etico delle sue decisioni a lungo termine?"
      ],
      english: [
        "What ethical principles guide your leadership style?",
        "Can you share a concrete example of facing an ethical dilemma?",
        "How would you define an 'ethical culture' within your organization?",
        "What strategies do you use to promote employee well-being?",
        "How do you evaluate the ethical impact of your long-term decisions?"
      ]
    }
  };
  
  // Genera le domande
  document.getElementById("generateQuestions").addEventListener("click", () => {
    const role = document.getElementById("role").value;
    const language = document.getElementById("language").value;
    const questionContainer = document.getElementById("questionContainer");
  
    // Pulisce domande esistenti
    questionContainer.innerHTML = "";
  
    // Combina domande specifiche e generali
    const roleQuestions = questions[role][language];
    const generalQuestions = questions.general[language];
    const allQuestions = [...roleQuestions, ...generalQuestions];
  
    // Crea campi per ogni domanda
    allQuestions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      const questionLabel = document.createElement("label");
      questionLabel.textContent = `${index + 1}. ${question}`;
      questionLabel.setAttribute("for", `question-${index}`);
      const questionInput = document.createElement("textarea");
      questionInput.id = `question-${index}`;
      questionInput.name = `question-${index}`;
      questionInput.rows = 3;
      questionInput.style.width = "100%";
      questionDiv.appendChild(questionLabel);
      questionDiv.appendChild(questionInput);
      questionContainer.appendChild(questionDiv);
    });
  });
  
  // Invia le risposte
  document.getElementById("submitAnswers").addEventListener("click", () => {
    const answers = document.querySelectorAll("#questionContainer textarea");
    const responseList = document.getElementById("responseList");
  
    // Pulisce le risposte precedenti
    responseList.innerHTML = "";
  
    // Combina domande e risposte in un formato leggibile
    answers.forEach((answer, index) => {
      const li = document.createElement("li");
      const questionText = document.querySelector(`label[for="question-${index}"]`).textContent;
      li.textContent = `${questionText}\nRisposta: ${answer.value}`;
      responseList.appendChild(li);
    });
  
    // Mostra la sezione risposte
    document.getElementById("responses").style.display = "block";
  });
  
// Copia tutte le risposte negli appunti
document.getElementById("copyButton").addEventListener("click", () => {
  const responseItems = document.querySelectorAll("#responseList li");
  let textToCopy = "";

  // Combina tutte le domande e risposte in un unico testo
  responseItems.forEach(item => {
    textToCopy += item.textContent + "\n\n";
  });

  // Copia il testo negli appunti
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert("Domande e risposte copiate negli appunti!");
    })
    .catch(err => {
      alert("Errore durante la copia: " + err);
    });
});

// Invia domande e risposte via email
document.getElementById("emailButton").addEventListener("click", () => {
  const responseItems = document.querySelectorAll("#responseList li");
  let emailBody = "";

  // Combina domande e risposte per il corpo dell'email
  responseItems.forEach((item, index) => {
    emailBody += `${index + 1}. ${item.textContent}\n\n`;
  });

  // Sostituisci spazi e ritorni a capo con URL encoding per il body dell'email
  const encodedBody = encodeURIComponent(emailBody);
  const recipient = "destinatario@example.com"; // Sostituisci con l'email desiderata
  const subject = "Risposte all'intervista di Leadership Etica";

  // Apri il client email predefinito
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;
});

  