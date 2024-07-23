document.addEventListener("DOMContentLoaded", () => {
  // 1. Fetch data from the API
  fetch("https://type.fit/api/quotes")
    // 2. Convert the response body from JSON to a JavaScript array
    .then(function (response) {
      return response.json();
    })
    // 3. Receive the array data,
    //  and create a quote element,
    // for each quote in the array
    .then(function (data) {
      // 4. Create an html <li> element for each quote,
      // and add the <li> element to the <ul> with a class of 'all-quotes'
      data.forEach(function (quote) {
        const allQuotes = document.querySelector("ul.all-quotes");
        allQuotes.innerHTML += `<li>
          <p class="text">${quote.text}</p>
          <p class="author">${quote.author}</p>
        </li>`;
      });
    });
});
