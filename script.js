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

// Functionality to get quotes data from the API:
// 1. Make a GET fetch request to the API
// 2. Call the 'json()' method on the response object,
// to convert the response body from JSON to a JavaScript object
// 3. Return the data for use from the function
async function fetchQuotes() {
  return fetch("https://type.fit/api/quotes").then((response) =>
    response.json()
  );
}

// This function iterates over the quotes data array,
// and creates an HTML element for each item in the array
function updateAllQuotesEl(quotes) {
  // 1. Inside the function we use the forEach iterator method to create the elements
  quotes.forEach((quote) => {
    // Pass the quote data to the createQuote function,
    // this will create a quote element
    createQuote(quote);
    allQuotesEl.appendChild(fragmentEl);
  });
}

// Function to create an HTML 'li' (list item) element,
// given a single quote data
function createQuote(quote) {
  // 1. Create an <li> tag
  const quoteEl = document.createElement("li");

  // 2. Create a <blockquote> tag
  const blockQuote = document.createElement("blockquote");

  // 3. Create a <p> tag for the quote text
  const textParagraph = document.createElement("p");
  // Add a class for styling using CSS
  textParagraph.classList.add("text");
  // Add the quote text inside the <p> tag
  textParagraph.textContent = quote.text;

  // 4. Append the <p> tag inside the <blockquote> tag
  blockQuote.appendChild(textParagraph);

  // 5. Create another <p> tag for the author information
  const authorParagraph = document.createElement("p");
  // Add a CSS class for styling
  authorParagraph.classList.add("author");
  // Add the quote author inside the <p> tag
  authorParagraph.textContent = quote.author;

  // 6. Create the like <button>
  const likeBtn = document.createElement("button");
  // Add a CSS class for stylling
  likeBtn.classList.add("like-btn");
  // Add the heart emoji as the text content for the like <button>
  likeBtn.textContent = "❤️";

  // Add the <blockquote>, the author <paragraph> and the like <button>,
  //  to the quote <li> element
  quoteEl.append(blockQuote, authorParagraph, likeBtn);

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
