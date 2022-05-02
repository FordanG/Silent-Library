const authBook = JSON.parse(localStorage.getItem("isLoggedIn"));
const bookList = document.querySelector("#bookList");
const data = JSON.parse(localStorage.getItem("books"));
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const searchForm = document.forms.namedItem("searchForm");
const searchResultTitle = document.querySelector("#searchResultTitle");
const seeBooks = document.querySelector("#seeBooks");

const search = (array, keyword) =>
  data.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );

if (searchForm)
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchBooks();
  });

seeBooks.addEventListener("click", () => {
  searchResultTitle.innerHTML = `<h2 class="text-secondary font-bold tracking-wide text-2xl uppercase">
            Pick a book
          </h2>
          <p class="text-gray-500 italic text-md">
            Dive in the minds of these finest authors
          </p>`;
  seeBooks.classList.add("hidden");
  generateBooks(data);
});

const searchBooks = () => {
  let keyword = document.searchForm.searchField.value;
  const searchResult = search(data, keyword);
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

function generateBooks(data) {
  data.forEach((book) => {
    if (book.thumbnailUrl) {
      const bookContainer = document.createElement("div");
      bookContainer.id = book.isbn;
      bookContainer.classList +=
        "flex flex-col items-center transform hover:scale-102 transition duration-200 ease-in-out hover:brightness-110 book";
      // bookContainer.href = "./bookpage.html";

      const bookImg = document.createElement("img");
      bookContainer.appendChild(bookImg);
      bookImg.src = book.thumbnailUrl;
      bookImg.alt = book.title;
      bookImg.classList +=
        "h-60 w-40 object-cover border border-grey-100 drop-shadow-md mb-2";

      bookContainer.insertAdjacentHTML(
        "beforeend",
        `    
            <h3 class="font-bold text-lg text-center">${book.title}</h3>
            <h4 class="text-lg -mt-2 text-center">${book.authors[0]}</h4>
            `
      );
      bookList.appendChild(bookContainer);
    }
  });
  document.querySelectorAll(".book").forEach((book) => {
    book.addEventListener("click", (e) => {
      const bookISBN = e.path[1].id;
      // get book from list
      const bookFound = data.find((book) => {
        return book.isbn == bookISBN;
      });
      swal(bookFound);
    });
  });
}

if (authBook)
  function swal(book) {
    Swal.fire({
      customClass: {
        title: "text-primary text-2xl",
      },
      title: `Do you want to borrow this book?`,
      imageUrl: `${book.thumbnailUrl}`,
      imageHeight: 240,
      imageAlt: `${book.title}`,
      html: `<b>${book.title}</b> by <em>${book.authors[0]}</em>`,
      showCancelButton: true,
      confirmButtonColor: "#4188E4",
      cancelButtonColor: "#F9537F",
      confirmButtonText: "Borrow book",
    }).then((result) => {
      if (result.isConfirmed) {
        const bookFound = currentUser.borrowedBooks.find((booklist) => {
          return booklist.isbn == book.isbn;
        });
        if (!bookFound) {
          const users = JSON.parse(localStorage.getItem("users"));
          const userIndex = users.findIndex(
            (user) => user.email === currentUser.email
          );
          users[userIndex].borrowedBooks.push(book);
          currentUser.borrowedBooks.push(book);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          localStorage.setItem("users", JSON.stringify(users));
          Swal.fire("Book borrowed!", "Have fun reading!", "success");
        } else {
          Swal.fire({
            title: "Book borrowed already",
            text: "You are still borrowing this book",
            icon: "error",
            confirmButtonText: "Continue",
          });
        }
      }
    });
  }
else
  function swal() {
    Swal.fire({
      title: `Login First to Borrow Books`,

      confirmButtonColor: "#4188E4",

      confirmButtonText: "Continue",
    }).then(function () {
      window.location = "./login.html";
    });
  }

generateBooks(data);
