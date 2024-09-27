// Funzione per calcolare i risultati in base alle risposte
function calculateResults() {
    // Ottenere i valori dalle domande
    const hero = (parseInt(document.querySelector('input[name="hero1"]').value) + parseInt(document.querySelector('input[name="hero2"]').value)) / 2;
    const puer = (parseInt(document.querySelector('input[name="puer1"]').value) + parseInt(document.querySelector('input[name="puer2"]').value)) / 2;
    const persona = (parseInt(document.querySelector('input[name="persona1"]').value) + parseInt(document.querySelector('input[name="persona2"]').value)) / 2;
    const mother = (parseInt(document.querySelector('input[name="mother1"]').value) + parseInt(document.querySelector('input[name="mother2"]').value)) / 2;

function showResults() {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    
    // Aggiungiamo la classe fade-out alle domande
    questionContainer.classList.add('fade-out');
    
    setTimeout(() => {
        // Dopo l'animazione, nascondiamo le domande e mostriamo i risultati
        questionContainer.style.display = 'none';
        resultContainer.style.display = 'block';
    
        // Aggiungiamo la classe fade-in ai risultati
        resultContainer.classList.add('fade-in');
    }, 1000); // Aspettiamo 1 secondo per completare l'animazione
    }
      

    // Dati per il grafico radar
    const data = {
        labels: ['Eroe', 'Puer Aeternus', 'Persona', 'Grande Madre'],
        datasets: [{
            label: 'Archetipi di Jung',
            data: [hero, puer, persona, mother],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    // Configurazione del grafico radar
    const config = {
        type: 'radar',
        data: data,
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    };

    // Creare il grafico radar
    const radarChart = new Chart(
        document.getElementById('radarChart'),
        config
    );

    // Identifica l'archetipo dominante
    const maxScore = Math.max(hero, puer, persona, mother);
    let dominantArchetype = '';
    let description = '';

    if (maxScore == hero) {
        dominantArchetype = 'Eroe';
        description = 'Coraggioso, determinato a superare ogni ostacolo.';
    } else if (maxScore == puer) {
        dominantArchetype = 'Puer Aeternus';
        description = 'Creativo e amante della libertà, ma incline all’irresponsabilità.';
    } else if (maxScore == persona) {
        dominantArchetype = 'Persona';
        description = 'Adattabile, ma rischia di nascondere la propria autenticità.';
    } else if (maxScore == mother) {
        dominantArchetype = 'Grande Madre';
        description = 'Empatica e protettiva, tende a sacrificarsi per gli altri.';
    }

    // Mostra il nome dell'archetipo dominante con descrizione interattiva
    document.getElementById('dominantArchetypeName').textContent = dominantArchetype;
    document.getElementById('archetypeDescription').textContent = description;

    // Mostra SWOT analysis e suggerimenti per miglioramento
    showSWOT(dominantArchetype);
    showImprovementTips(dominantArchetype);
}

// Funzione per resettare il test
function resetTest() {
    // Resetta gli slider al valore di default
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.value = 3;
    });

    // Rimuove i risultati del test
    document.getElementById('dominantArchetypeName').textContent = '';
    document.getElementById('archetypeDescription').textContent = '';
    const radarCanvas = document.getElementById('radarChart');
    radarCanvas.getContext('2d').clearRect(0, 0, radarCanvas.width, radarCanvas.height);
    const swotCanvas = document.getElementById('swotChart');
    swotCanvas.getContext('2d').clearRect(0, 0, swotCanvas.width, swotCanvas.height);
    document.getElementById('improvementTips').querySelector('p').textContent = '';
}

// Funzione per mostrare la SWOT Analysis in base all'archetipo dominante
function showSWOT(archetype) {
    let strengths, weaknesses, opportunities, threats;

    if (archetype === 'Eroe') {
        strengths = "Coraggio, determinazione, resilienza.";
        weaknesses = "Tendenza a ignorare i propri limiti, eccessiva competitività.";
        opportunities = "Possibilità di guidare gruppi, crescere professionalmente.";
        threats = "Rischio di burnout e conflitti interpersonali.";
    } else if (archetype === 'Puer Aeternus') {
        strengths = "Creatività, entusiasmo, spontaneità.";
        weaknesses = "Immaturità, mancanza di responsabilità.";
        opportunities = "Sviluppo di progetti innovativi, esplorazione di nuove strade.";
        threats = "Difficoltà nel gestire impegni a lungo termine.";
    } else if (archetype === 'Persona') {
        strengths = "Capacità di adattamento sociale, rispetto delle regole.";
        weaknesses = "Eccessiva conformità, paura di mostrarsi autentici.";
        opportunities = "Buone relazioni sociali e professionali.";
        threats = "Perdita dell'identità autentica, stress da aspettative altrui.";
    } else if (archetype === 'Grande Madre') {
        strengths = "Empatia, cura per gli altri, connessione con la natura.";
        weaknesses = "Sacrificio personale eccessivo, difficoltà a dire di no.";
        opportunities = "Opportunità di diventare una figura di supporto e cura.";
        threats = "Rischio di esaurimento emotivo, trascurare se stessi.";
    }

    // Crea il grafico SWOT interattivo
    const swotData = {
        labels: ['Punti di Forza', 'Punti di Debolezza', 'Opportunità', 'Minacce'],
        datasets: [{
            label: 'SWOT Analysis',
            data: [strengths.length, weaknesses.length, opportunities.length, threats.length],
            backgroundColor: [
                'rgba(0, 255, 0, 0.3)',   // Forza
                'rgba(255, 0, 0, 0.3)',   // Debolezza
                'rgba(0, 0, 255, 0.3)',   // Opportunità
                'rgba(255, 255, 0, 0.3)'  // Minaccia
            ],
            borderWidth: 1
        }]
    };

    const swotConfig = {
        type: 'bar',
        data: swotData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.raw !== null) {
                                label += context.raw;
                            }
                            return label + ' - ' + [strengths, weaknesses, opportunities, threats][context.dataIndex];
                        }
                    }
                }
            }
        }
    };

    const swotChart = new Chart(
        document.getElementById('swotChart'),
        swotConfig
    );
}

// Funzione per mostrare suggerimenti di miglioramento
function showImprovementTips(archetype) {
    const tipsEl = document.getElementById('improvementTips').querySelector('p');

    if (archetype === 'Eroe') {
        tipsEl.textContent = "Lavora sullo sviluppo della cooperazione e sulla capacità di accettare i tuoi limiti personali.";
    } else if (archetype === 'Puer Aeternus') {
        tipsEl.textContent = "Cerca di bilanciare la tua spontaneità con la capacità di pianificare e assumerti responsabilità.";
    } else if (archetype === 'Persona') {
        tipsEl.textContent = "Esplora il tuo vero io dietro la maschera sociale. Lasciati spazio per l'espressione autentica.";
    } else if (archetype === 'Grande Madre') {
        tipsEl.textContent = "Bilancia il tuo desiderio di cura con l'auto-cura. Evita di sacrificarti eccessivamente per gli altri.";
    }
}

let currentQuestion = 0;
const totalQuestions = document.querySelectorAll('.question').length;

function updateProgressBar() {
  currentQuestion++;
  let progressPercentage = (currentQuestion / totalQuestions) * 100;
  document.getElementById('progress-bar').style.width = progressPercentage + '%';
}

// Aggiungiamo l'evento per aggiornare la barra ogni volta che una domanda viene completata
document.querySelectorAll('.question-slider').forEach(slider => {
  slider.addEventListener('input', () => {
    updateProgressBar();
  });
});
