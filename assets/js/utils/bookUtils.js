import * as auth from "./auth.js";
import { database } from "./database.js";
const bookList = document.querySelector("#bookList");

export function generateBooks(data) {
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

      const bookFound = database.books.find((book) => {
        return book.isbn == bookISBN;
      });

      if (auth.auth) {
        showModal(bookFound);
      } else {
        Swal.fire({
          title: `Login First to Borrow Books`,
          confirmButtonColor: "#4188E4",
          confirmButtonText: "Continue",
        }).then(function () {
          window.location = "./login.html";
        });
      }
    });
  });
}

function showModal(book) {
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
      const bookFound = database.currentUser.borrowedBooks.find((booklist) => {
        return booklist.isbn == book.isbn;
      });
      if (!bookFound) {
        const userIndex = database.users.findIndex(
          (user) => user.email === database.currentUser.email
        );
        database.users[userIndex].borrowedBooks.push(book);
        database.currentUser.borrowedBooks.push(book);
        localStorage.setItem(
          "currentUser",
          JSON.stringify(database.currentUser)
        );
        localStorage.setItem("users", JSON.stringify(database.users));
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
