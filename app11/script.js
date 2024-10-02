let quotes = [];
let themes = [];
let authors = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Elementi DOM
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const themeText = document.getElementById('theme');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const authorFilter = document.getElementById('authorFilter');
const themeFilter = document.getElementById('themeFilter');
const searchInput = document.getElementById('searchInput');
const favoritesContainer = document.getElementById('favoritesContainer');
const favoritesList = document.getElementById('favoritesList');
const modal = document.getElementById('infoModal');
const closeBtn = document.getElementsByClassName('close')[0];

// Apri il popup
document.getElementById("openPopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
});

// Chiudi il popup
document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});

// Chiudi il popup cliccando sull'overlay
document.getElementById("overlay").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});

// Carica le citazioni dal file JSON
fetch('quotes.json')
    .then(response => response.json())
    .then(data => {
        quotes = data.quotes;
        themes = data.themes;
        authors = data.authors;
        
        // Popola i filtri
        populateFilters();
        
        // Genera la prima citazione
        generateQuote();
        
        // Mostra i preferiti salvati
        displayFavorites();
    })
    .catch(error => console.error('Errore nel caricamento delle citazioni:', error));

function populateFilters() {
    // Popola il filtro degli autori
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author.name;
        option.textContent = author.name;
        authorFilter.appendChild(option);
    });
    
    // Popola il filtro dei temi
    themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = theme;
        themeFilter.appendChild(option);
    });
}

function filterQuotes() {
    const authorValue = authorFilter.value;
    const themeValue = themeFilter.value;
    const searchValue = searchInput.value.toLowerCase();
    
    return quotes.filter(quote => {
        const authorMatch = !authorValue || quote.author === authorValue;
        const themeMatch = !themeValue || quote.theme === themeValue;
        const searchMatch = !searchValue || 
            quote.text.toLowerCase().includes(searchValue) || 
            quote.author.toLowerCase().includes(searchValue);
        
        return authorMatch && themeMatch && searchMatch;
    });
}

function generateQuote() {
    const filteredQuotes = filterQuotes();
    
    if (filteredQuotes.length === 0) {
        quoteText.textContent = "Nessuna citazione trovata con i filtri attuali.";
        authorText.textContent = "";
        themeText.textContent = "";
        return;
    }
    
    // Effetto di dissolvenza
    quoteText.style.opacity = 0;
    authorText.style.opacity = 0;
    themeText.style.opacity = 0;
    
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        
        quoteText.textContent = `"${quote.text}"`;
        authorText.textContent = `- ${quote.author}`;
        themeText.textContent = quote.theme;
        
        // Riappare la citazione
        quoteText.style.opacity = 1;
        authorText.style.opacity = 1;
        themeText.style.opacity = 1;
    }, 500);
}

function toggleFavorite() {
    const currentQuote = {
        text: quoteText.textContent,
        author: authorText.textContent,
        theme: themeText.textContent
    };
    
    const index = favorites.findIndex(fav => 
        fav.text === currentQuote.text && fav.author === currentQuote.author
    );
    
    if (index === -1) {
        favorites.push(currentQuote);
        favoriteBtn.textContent = '❤️ Rimuovi dai Preferiti';
    } else {
        favorites.splice(index, 1);
        favoriteBtn.textContent = '🤍 Aggiungi ai Preferiti';
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

function displayFavorites() {
    if (favorites.length === 0) {
        favoritesContainer.classList.add('hidden');
        return;
    }
    
    favoritesContainer.classList.remove('hidden');
    favoritesList.innerHTML = '';
    
    favorites.forEach(fav => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('favorite-quote');
        quoteElement.innerHTML = `
            <p>${fav.text}</p>
            <p class="author">${fav.author}</p>
            <p class="theme">${fav.theme}</p>
        `;
        favoritesList.appendChild(quoteElement);
    });
}

// Event listeners
newQuoteBtn.addEventListener('click', generateQuote);
favoriteBtn.addEventListener('click', toggleFavorite);
authorFilter.addEventListener('change', generateQuote);
themeFilter.addEventListener('change', generateQuote);
searchInput.addEventListener('input', generateQuote);

// Modal event listeners
document.getElementById('infoBtn').addEventListener('click', () => modal.style.display = "block");
closeBtn.addEventListener('click', () => modal.style.display = "none");
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
