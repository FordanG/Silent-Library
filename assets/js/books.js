const authBook = JSON.parse(localStorage.getItem("isLoggedIn"));
const bookList = document.querySelector("#bookList");
const data = JSON.parse(localStorage.getItem("books"));

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
      swal(e.path[1].innerText);
    });
  });
}

if (authBook)
  function swal(title) {
    Swal.fire({
      title: `Do you want to borrow ${title}`,
      showCancelButton: true,
      confirmButtonColor: "#4188E4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrow book",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(title);
        Swal.fire("Book borrowed!", "Have fun reading!", "success");
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
