import * as auth from "./auth.js";
import { database } from "./database.js";
import { generateBooks } from "./bookUtils.js";

let keyword = localStorage.getItem("keyword");

const bookList = document.querySelector("#bookList");
const searchForm = document.forms.namedItem("searchForm");
const searchResultTitle = document.querySelector("#searchResultTitle");
const seeBooks = document.querySelector("#seeBooks");

generateBooks(database.books);

const search = (array, keyword) =>
  array.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );

if (searchForm)
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let keyword = document.searchForm.searchField.value;
    searchBooks(keyword);
  });

if (seeBooks)
  seeBooks.addEventListener("click", () => {
    searchResultTitle.innerHTML = `<h2 class="text-secondary font-bold tracking-wide text-2xl uppercase">
            Pick a book
          </h2>
          <p class="text-gray-500 italic text-md">
            Dive in the minds of these finest authors
          </p>`;
    seeBooks.classList.add("hidden");
    generateBooks(database.books);
  });

const searchBooks = (keyword) => {
  // let keyword = document.searchForm.searchField.value;
  const searchResult = search(database.books, keyword);
  if (!(searchResult.length === 0)) {
    searchResultTitle.innerHTML = `<h2 class="text-secondary font-bold tracking-wide text-2xl uppercase">
            ${searchResult.length} results for "${keyword}"
          </h2>`;
    bookList.innerHTML = "";
    generateBooks(searchResult);
  } else {
    bookList.innerHTML = "";
    searchResultTitle.innerHTML = `<h2 class="text-secondary font-bold tracking-wide text-2xl uppercase">
            No Results Found for "${keyword}". Please try to search for a new book.
          </h2>`;
  }
  seeBooks.classList.remove("hidden");
};

if (keyword) {
  document.searchForm.searchField.value = keyword;
  searchBooks(keyword);
  localStorage.removeItem("keyword");
}

export default generateBooks;
