// Funzione per calcolare la generazione dell'utente in base alla sua data di nascita
function calcolaGenerazione(dataNascita) {
    const anno = new Date(dataNascita).getFullYear();
    if (anno >= 1997 && anno <= 2012) return 'Gen Z';
    else if (anno >= 1981 && anno <= 1996) return 'Millennial';
    else if (anno >= 1965 && anno <= 1980) return 'Gen X';
    else if (anno >= 1946 && anno <= 1964) return 'Baby Boomer';
    return 'Altro';
}

// Funzione per ottenere il profilo generazionale
function getProfiloGenerazionale(generazione) {
    switch (generazione) {
        case 'Gen Z':
            return [6, 9, 4, 8, 9, 5]; // Stabilità economica, Tecnologia, TV, Streaming, Social Media, Lavoro
        case 'Millennial':
            return [7, 8, 5, 7, 8, 7];
        case 'Gen X':
            return [8, 6, 7, 5, 6, 8];
        case 'Baby Boomer':
            return [9, 4, 8, 3, 4, 9];
        default:
            return [5, 5, 5, 5, 5, 5]; // Valore di default se non rientra nelle categorie
    }
}

// Funzione per ottenere la descrizione della generazione
function getDescrizioneGenerazione(generazione) {
    switch (generazione) {
        case 'Gen Z':
            return 'Digital natives, attenti alle questioni sociali e ambientali.';
        case 'Millennial':
            return 'Connessi e innovativi, valorizzano esperienze e diversità.';
        case 'Gen X':
            return 'Pragmatici e indipendenti, con un equilibrio tra vita e lavoro.';
        case 'Baby Boomer':
            return 'Tradizionalisti e laboriosi, con un forte attaccamento alla stabilità.';
        default:
            return 'Generazione non identificata.';
    }
}

// Nuovo oggetto per i pesi delle domande
const pesiDomande = {
    stabilitaEconomica: 1.5,
    tecnologia: 1.2,
    tv: 0.8,
    streaming: 1,
    socialMedia: 1.2,
    lavoro: 1,
    socialMediaPreference: 0.9,
    mediaInfluence: 1.1
};

// Nuova funzione per calcolare il punteggio pesato
function calcolaPunteggioPesato(risposte) {
    return risposte.reduce((acc, val, index) => {
        const peso = Object.values(pesiDomande)[index];
        return acc + (val * peso);
    }, 0) / Object.values(pesiDomande).reduce((a, b) => a + b);
}

// Funzione modificata per calcolare la generazione
function calcolaGenerazioneAvanzata(dataNascita, punteggioPesato) {
    const anno = new Date(dataNascita).getFullYear();
    let generazioneAnagrafica;

    if (anno >= 1997 && anno <= 2012) generazioneAnagrafica = 'Gen Z';
    else if (anno >= 1981 && anno <= 1996) generazioneAnagrafica = 'Millennial';
    else if (anno >= 1965 && anno <= 1980) generazioneAnagrafica = 'Gen X';
    else if (anno >= 1946 && anno <= 1964) generazioneAnagrafica = 'Baby Boomer';
    else generazioneAnagrafica = 'Altro';

    // Calcola la generazione mentale basata sul punteggio pesato
    let generazioneMentale;
    if (punteggioPesato > 8) generazioneMentale = 'Gen Z';
    else if (punteggioPesato > 6) generazioneMentale = 'Millennial';
    else if (punteggioPesato > 4) generazioneMentale = 'Gen X';
    else generazioneMentale = 'Baby Boomer';

    return { generazioneAnagrafica, generazioneMentale };
}

// Funzione principale modificata per calcolare i risultati del quiz
function calcolaRisultati(event) {
    event.preventDefault();

    const dataNascita = document.getElementById('dataNascita').value;
    if (!dataNascita) {
        alert("Per favore, inserisci la tua data di nascita.");
        return;
    }

    const risposte = [];
    for (let i = 1; i <= 8; i++) {
        const valore = document.querySelector(`input[name="domanda${i}"]:checked`);
        if (!valore) {
            alert(`Per favore, rispondi alla domanda ${i}.`);
            return;
        }
        risposte.push(parseInt(valore.value));
    }

    const punteggioPesato = calcolaPunteggioPesato(risposte);
    const { generazioneAnagrafica, generazioneMentale } = calcolaGenerazioneAvanzata(dataNascita, punteggioPesato);
    const descrizioneAnagrafica = getDescrizioneGenerazione(generazioneAnagrafica);
    const descrizioneMentale = getDescrizioneGenerazione(generazioneMentale);

    document.getElementById('generazione').innerHTML = `
        <h3>La tua generazione anagrafica: ${generazioneAnagrafica}</h3>
        <p>Range di età: ${getRangeEtà(generazioneAnagrafica)}</p>
        <p>Descrizione: ${descrizioneAnagrafica}</p>
        <h3>La tua generazione mentale: ${generazioneMentale}</h3>
        <p>Descrizione: ${descrizioneMentale}</p>
        <p>Punteggio pesato: ${punteggioPesato.toFixed(2)}/10</p>
    `;

    // Usa solo le prime 6 risposte per il grafico radar
    const risposteRadar = risposte.slice(0, 6);
    generaGrafici(generazioneAnagrafica, risposteRadar);
    generaSWOT(generazioneAnagrafica, risposte, generazioneMentale);
    suggerisciAzioni(risposte, generazioneMentale);
}

// Funzione per ottenere il range di età della generazione
function getRangeEtà(generazione) {
    switch (generazione) {
        case 'Gen Z':
            return '12-27 anni';
        case 'Millennial':
            return '28-43 anni';
        case 'Gen X':
            return '44-59 anni';
        case 'Baby Boomer':
            return '60-77 anni';
        default:
            return 'Età non specificata.';
    }
}

// Funzione per generare entrambi i grafici
function generaGrafici(generazione, utente) {
    generaGraficoRadar(generazione, utente);
    generaGraficoMedia(utente.slice(2, 5)); // Usa solo le risposte relative ai media per il grafico dei media
}

// Funzione per generare il grafico radar
function generaGraficoRadar(generazione, utente) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const profiloGenerazionale = getProfiloGenerazionale(generazione);

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Stabilità economica', 'Tecnologia', 'TV', 'Streaming', 'Social Media', 'Lavoro'],
            datasets: [{
                label: 'Profilo Generazione',
                data: profiloGenerazionale,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            },
            {
                label: 'Profilo Utente',
                data: utente,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

// Funzione per generare il grafico dei media
function generaGraficoMedia(consumoMedia) {
    const ctx = document.getElementById('mediaChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['TV', 'Streaming', 'Social Media'],
            datasets: [{
                label: 'Ore al giorno',
                data: consumoMedia,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

// Funzione per generare l'analisi SWOT
function generaSWOT(generazioneAnagrafica, risultatiUtente, generazioneMentale) {
    const [stabilitaEconomica, tecnologia, tv, streaming, socialMedia, lavoro, socialMediaPreference, mediaInfluence] = risultatiUtente;

    // Ottieni i punteggi generazionali
    const profiloGenerazionale = getProfiloGenerazionale(generazioneAnagrafica);

    // Punti di forza
    document.querySelector('.strengths-content').innerHTML = `
        <p>Valorizzazione della stabilità economica: ${stabilitaEconomica}/10</p>
        <p>Stabilità economica media generazionale: ${profiloGenerazionale[0]}/10</p>
    `;

    // Punti deboli
    document.querySelector('.weaknesses-content').innerHTML = `
        <p>Potenziale sovraesposizione ai media: ${Math.max(tv, streaming, socialMedia)}/10</p>
        <p>Punteggio medio generazionale in media: ${Math.max(...profiloGenerazionale.slice(2, 5))}/10</p>
    `;

    // Opportunità
    document.querySelector('.opportunities-content').innerHTML = `
        <p>Comfort con la tecnologia: ${tecnologia}/10</p>
        <p>Punteggio medio generazionale in tecnologia: ${profiloGenerazionale[1]}/10</p>
        <p>La tua generazione mentale (${generazioneMentale}) 
        ${generazioneMentale !== generazioneAnagrafica ? 'differisce' : 'coincide'} 
        con la tua generazione anagrafica (${generazioneAnagrafica}). 
        Questo potrebbe offrirti prospettive uniche.</p>
    `;

    // Minacce
    document.querySelector('.threats-content').innerHTML = `
        <p>Possibile squilibrio lavoro-vita: ${lavoro}/10</p>
        <p>Punteggio medio generazionale in lavoro: ${profiloGenerazionale[5]}/10</p>
        <p>Influenza dei media sulle opinioni: ${mediaInfluence}/10</p>
    `;
}

// Funzione per suggerire azioni di miglioramento
function suggerisciAzioni(risultatiUtente, generazioneMentale) {
    const [stabilitaEconomica, tecnologia, tv, streaming, socialMedia, lavoro, socialMediaPreference, mediaInfluence] = risultatiUtente;
    let suggerimenti = "";

    if (stabilitaEconomica < 5) suggerimenti += "Considera di migliorare la tua educazione finanziaria. ";
    if (tecnologia < 5) suggerimenti += "Potresti beneficiare dall'apprendere nuove competenze tecnologiche. ";
    if (tv + streaming + socialMedia > 15) suggerimenti += "Prova a ridurre il tempo trascorso sui media e dedica più tempo ad attività offline. ";
    if (lavoro > 8) suggerimenti += "Cerca di migliorare il tuo equilibrio tra lavoro e vita privata. ";
    
    if (socialMediaPreference > 5) suggerimenti += "Considera di diversificare le tue fonti di informazione oltre ai social media. ";
    if (mediaInfluence > 5) suggerimenti += "Rifletti su come i media influenzano le tue opinioni e cerca di mantenere un pensiero critico. ";

    // Aggiungi suggerimenti basati sulla generazione mentale
    switch (generazioneMentale) {
        case 'Gen Z':
            suggerimenti += "Considera di sfruttare la tua mentalità innovativa per affrontare sfide in modi non convenzionali. ";
            break;
        case 'Millennial':
            suggerimenti += "Sfrutta la tua adattabilità per navigare i cambiamenti nel mondo del lavoro e della tecnologia. ";
            break;
        case 'Gen X':
            suggerimenti += "Utilizza la tua esperienza e pragmatismo per guidare progetti e mentorare colleghi più giovani. ";
            break;
        case 'Baby Boomer':
            suggerimenti += "Condividi la tua saggezza e esperienza, ma resta aperto a nuove idee e tecnologie. ";
            break;
    }

    document.getElementById('suggestions').innerHTML = `<h2>Azioni per Migliorare</h2><p>${suggerimenti}</p>`;
}

// Aggiungi un event listener al form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quizForm');
    if (form) {
        form.addEventListener('submit', calcolaRisultati);
    }
});