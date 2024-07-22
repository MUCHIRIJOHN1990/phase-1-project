// Elements of interest
// 1. All quotes container, will contain all quotes fetched from the API
const allQuotesEl = document.querySelector("ul.all-quotes");
// 2. Favorite quotes container, which start outs empty and will be populated,
// when a user likes a quote
const favoriteQuotesEl = document.querySelector("ul.favorite-quotes");
const fragmentEl = document.createDocumentFragment();

// The steps I took to get the application working
// 1. We listen for the 'DOMContentLoaded' event,
// this ensures that the DOM has been created before,
// we start accessing HTML element from JS
document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch the quotes data from the API
  fetchQuotes().then((quotes) => {
    // 2. Create an HTML element for each item in the quote data array
    updateAllQuotesEl(quotes);
  });

  // Functionality to like a quote.
  // 1. Add an event listener that executes a function,
  // to add a quote to the favorite list
  allQuotesEl.addEventListener("click", (event) => {
    if (event.target.matches("button.like-btn")) {
      // Collect quote information
      const parentElement = event.target.parentElement;
      const text = parentElement.querySelector("p.text").textContent;
      const author = parentElement.querySelector("p.author").textContent;
      const quote = {
        text,
        author,
      };
      // Add the quote information to the favorite list
      addQuoteToFavorites(quote);
    }
  });

  // Functionality to remove a quote from favorite quotes list
  // Add an event listener that listens for the click event,
  // and removes the quote that has been clicked
  favoriteQuotesEl.addEventListener("click", (event) => {
    // 1. Get the quote element that has been clicked
    if (event.target.matches("button.remove-btn")) {
      const parentElement = event.target.parentElement;
      // 2. Remove the quote element
      parentElement.remove();
    }
  });
});

// Helper functions
// Functionality to get quotes data from the API:
// 1. Make a GET fetch request to the API
// 2. Call the 'json()' method on the response object,
// to convert the body from JSON to a JavaScript object
// 3. Return the data for use from the function
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
