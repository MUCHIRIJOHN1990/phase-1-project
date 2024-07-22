// Elements of interest
// 1. All quotes container, will contain all quotes fetched from the API
const allQuotesEl = document.querySelector("ul.all-quotes");
// 2. Favorite quotes container, which start outs empty and will be populated,
// when a user likes a quote
const favoriteQuotesEl = document.querySelector("ul.favorite-quotes");
const fragmentEl = document.createDocumentFragment();

// Application logic
// 1. The first event listener is the 'DOMContentLoaded' event,
// which is triggered when the initial HTML document has been,
// completely loaded and parsed by the browser.
document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch the quotes data from the API
  fetchQuotes().then((quotes) => {
    // 2. Create an HTML element for each item in the quote data array
    updateAllQuotesEl(quotes);
  });

  // Functionality to like a quote
  allQuotesEl.addEventListener("click", (event) => {
    if (event.target.matches("button.like-btn")) {
      const parentElement = event.target.parentElement;
      const text = parentElement.querySelector("p.text").textContent;
      const author = parentElement.querySelector("p.author").textContent;
      const quote = {
        text,
        author,
      };
      addQuoteToFavorites(quote);
    }
  });

  // Functionality to remove a quote from favorite quotes list
  favoriteQuotesEl.addEventListener("click", (event) => {
    if (event.target.matches("button.remove-btn")) {
      const parentElement = event.target.parentElement;
      parentElement.remove();
    }
  });
});

// Utility functions
async function fetchQuotes() {
  return fetch("https://type.fit/api/quotes").then((response) =>
    response.json()
  );
}

// This function iterates over the quotes data array,
// and creates an HTML element for each item in the array
function updateAllQuotesEl(quotes) {
  // Inside the function we use the forEach iterator method to create the elements
  quotes.forEach((quote) => {
    createQuote(quote);
    allQuotesEl.appendChild(fragmentEl);
  });
}

// Function to create an HTML 'li' (list item) element,
// given a single quote data
function createQuote(quote) {
  const quoteEl = document.createElement("li");

  const blockQuote = document.createElement("blockquote");

  const insideP = document.createElement("p");
  insideP.classList.add("text");
  insideP.textContent = quote.text;

  blockQuote.appendChild(insideP);

  const outsideP = document.createElement("p");
  outsideP.classList.add("author");
  outsideP.textContent = quote.author;

  const likeBtn = document.createElement("button");
  likeBtn.classList.add("like-btn");
  likeBtn.textContent = "❤️";

  quoteEl.append(blockQuote, outsideP, likeBtn);

  fragmentEl.appendChild(quoteEl);
}

// Functionality to add a quote to the favorite list container
function addQuoteToFavorites(quote) {
  createFavoriteQuote(quote);
  updateFavoriteQuotesEl();
}

// Functionality to create a favorite quote element,
// the element is an 'li' (list item)
function createFavoriteQuote(quote) {
  const quoteEl = document.createElement("li");

  const blockQuote = document.createElement("blockquote");

  const insideP = document.createElement("p");
  insideP.classList.add("text");
  insideP.textContent = quote.text;

  blockQuote.appendChild(insideP);

  const outsideP = document.createElement("p");
  outsideP.classList.add("author");
  outsideP.textContent = quote.author;

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "X";

  quoteEl.append(blockQuote, outsideP, removeBtn);

  fragmentEl.appendChild(quoteEl);
}

// Functionality to update the favorite list container,
// with a new favorite quote
function updateFavoriteQuotesEl() {
  favoriteQuotesEl.appendChild(fragmentEl);
}
