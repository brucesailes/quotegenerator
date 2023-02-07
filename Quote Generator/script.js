const quoteContainer = document.getElementById('quote-container');  
const quoteText = document.getElementById('quote'); 
const authorText = document.getElementById('author'); 
const twitterBtn = document.getElementById('twitter'); 
const NewQuoteBtn = document.getElementById('new-quote'); 
const loader = document.getElementById('loader'); 


let apiQuotes = []; 
//Show Loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden = true; 
}
// Hide Loading
function complete() {
    quoteContainer.hidden = false; 
    loader.hidden = true; 
}
//Show New Quote
function newQuote() {
    loading(); 
    //Pick a Random quote from API quote array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    // Check it Author field is blank and replace if with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader 
        quoteText.textContent = quote.text; 
        complete(); 
}

//Get Quotes from API
async function getQuotes() {
    loading(); 
    const apiURL = 'https://type.fit/api/quotes'; 
    try {
        const response = await fetch(apiURL); 
        apiQuotes = await response.json(); 
        newQuote();
    } catch (error) {
        // Catch Erro Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; 
    window.open(twitterUrl, '_blank'); 
}

// Event Listeners
NewQuoteBtn.addEventListener('click', newQuote); 
twitterBtn.addEventListener('click', tweetQuote); 
// On Load 
getQuotes();
 