// Array that will contain quotes after fetching from API
let quotes = [];

document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch data from the API
  fetch("https://type.fit/api/quotes")
    // 2. Convert the response body from JSON to a JavaScript array
    .then(function (response) {
      return response.json();
    })
    // 3. Receive the array data
    .then(function (data) {
      // 4. Populate the quotes array wit the data
      quotes = data;
      // 5. Iterate over the array using the array forEach method
      quotes.forEach(function (quote, index) {
        // 6. Get a reference to the quote container,
        // which if an <ul> with a class of 'all-quotes'
        const allQuotes = document.querySelector("ul.all-quotes");
        allQuotes.innerHTML += `<li>
          <p class="text">${quote.text}</p>
          <p class="author">${quote.author}</p>
          <button class="like-btn">Like</button>
        </li>`;
      });
      // 7. Get the list of all buttons from the DOM
      const likeBtnList = document.querySelectorAll("button.like-btn");
      // 8. Iterate over the list
      likeBtnList.forEach(function (btn, index) {
        // 9. Add a click event listener
        btn.addEventListener("click", function () {
          // 10. Get a pointer to the favorite quotes container
          // which is an <ul> with a class of 'favorite-quotes'
          const favoriteQuotes = document.querySelector("ul.favorite-quotes");
          // 11. Add a favorite quote
          favoriteQuotes.innerHTML += `<li>
            <p class="text">${quotes[index].text}</p>
            <p class="author">${quotes[index].author}</p>
            <button class="remove-btn">X</button>
          </li>`;
        });
      });
    });
});
