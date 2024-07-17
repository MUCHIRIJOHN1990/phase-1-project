const allQuotesEl = document.querySelector("ul.all-quotes");
const favoriteQuotesEl = document.querySelector("ul.favorite-quotes");
const fragmentEl = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  // Fetch quotes as soon as the document has loaded
  fetchQuotes().then((quotes) => {
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

function updateAllQuotesEl(quotes) {
  for (const quote of quotes) {
    createQuote(quote);
    allQuotesEl.appendChild(fragmentEl);
  }
}

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

function addQuoteToFavorites(quote) {
  createFavoriteQuote(quote);
  updateFavoriteQuotesEl();
}

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

function updateFavoriteQuotesEl() {
  favoriteQuotesEl.appendChild(fragmentEl);
}
