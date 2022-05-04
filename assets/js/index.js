import * as auth from "./utils/auth.js";
import { database } from "./utils/database.js";
import { generateBooks } from "./utils/bookUtils.js";

const featuredBooks = database.books.slice(0, 6);
const searchForm = document.forms.namedItem("searchForm");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchBooks();
});

const searchBooks = () => {
  let keyword = document.searchForm.searchField.value;
  localStorage.setItem("keyword", keyword);
  window.location = "./books.html";
};

generateBooks(featuredBooks);
