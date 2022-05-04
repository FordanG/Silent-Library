import * as auth from "./utils/auth.js";
import { database } from "./utils/database.js";
if (!localStorage.getItem("currentUser")) {
  (() => {
    Swal.fire({
      title: "User Not Logged In",
      text: "Please login first before accessing the admin page",
      icon: "error",
      confirmButtonText: "Continue",
    }).then(function () {
      window.location = "./login.html";
    });
  })();
} else {
  const currentUser = database.currentUser;
  const users = database.users;
  const inquiries = database.inquiries;
  let borrowedBooks = currentUser.borrowedBooks;

  const adminSubtitle = document.querySelector("#adminSubtitle");
  const adminMain = document.querySelector("#adminMain");

  (() => {
    adminSubtitle.textContent = `Hello, ${currentUser.first_name} ${currentUser.last_name}. Welcome to the Admin Page!`;
  })();

  const profileSection = document.querySelector("#profile");
  const profileButton = document.querySelector("#profileButton");
  const booksBorrowedList = document.querySelector("#booksBorrowedList");
  const profileList = document.querySelector("#profileList");

  const membersSection = document.querySelector("#members");
  const membersButton = document.querySelector("#membersButton");
  const membersList = document.querySelector("#membersList");

  const inquiriesSection = document.querySelector("#inquiries");
  const inquiriesButton = document.querySelector("#inquiriesButton");
  const inquiriesList = document.querySelector("#inquiriesList");

  const inactiveButton =
    "px-5 py-2 rounded-md text-gray-700 font-bold hover:text-secondary transition duration-200 ease-in-out";

  const activeButton =
    "px-5 py-2 border-secondary border-2 rounded-md text-gray-700 font-bold hover:text-secondary transition duration-200 ease-in-out";

  const navButtons = [profileButton, membersButton, inquiriesButton];

  const adminSections = [profileSection, membersSection, inquiriesSection];

  function generateList(database, databaseType) {
    if (databaseType == "profile") {
      const newRow = document.createElement("tr");
      newRow.classList.add("text-gray-700");
      newRow.innerHTML = `
              <td class="border-b-2 p-4 dark:border-dark-5">${database.first_name}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${database.last_name} 
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">${database.email}</td>
              <td class="border-b-2 p-4 dark:border-dark-5"><button
            class="bg-primary rounded-sm px-8 py-2 transform text-white font-bold hover:scale-102 transition duration-200 ease-in-out hover:brightness-110" id="editButton"
          >
            Edit
          </button></td>
              <td class="border-b-2 p-4 dark:border-dark-5"><button
            class="bg-secondary rounded-sm px-8 py-2 transform text-white font-bold hover:scale-102 transition duration-200 ease-in-out hover:brightness-110"
            id="deleteButton"
          >
            Delete
          </button></td>
            `;
      profileList.appendChild(newRow);
    } else {
      database.forEach((data, index) => {
        const newRow = document.createElement("tr");
        newRow.classList.add("text-gray-700");
        switch (databaseType) {
          case "borrowedBooks":
            newRow.innerHTML = `
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${index + 1}
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${data.title} 
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">${
                data.authors[0]
              } </td>
              <td class="border-b-2 p-4 dark:border-dark-5"> <button
            class="bg-secondary rounded-sm px-8 py-2 transform text-white font-bold hover:scale-102 transition duration-200 ease-in-out hover:brightness-110"
            id="${data.isbn}"
          >
            Return
          </button> </td>
            `;
            booksBorrowedList.appendChild(newRow);

            const returnButtons = document.querySelectorAll(
              "#booksBorrowedList button"
            );
            returnButtons.forEach((button) => {
              button.addEventListener("click", () => {
                const bookISBN = button.id;

                const book = currentUser.borrowedBooks.find(
                  (books) => books.isbn == bookISBN
                );

                Swal.fire({
                  customClass: {
                    title: "text-primary text-2xl",
                  },
                  title: `Do you want to return this book?`,
                  imageUrl: `${book.thumbnailUrl}`,
                  imageHeight: 240,
                  imageAlt: `${book.title}`,
                  html: `<b>${book.title}</b> by <em>${book.authors[0]}</em>`,
                  showCancelButton: true,
                  confirmButtonColor: "#4188E4",
                  cancelButtonColor: "#F9537F",
                  confirmButtonText: "Return book",
                }).then((result) => {
                  if (result.isConfirmed) {
                    const userIndex = users.findIndex(
                      (user) => user.email === currentUser.email
                    );
                    borrowedBooks = borrowedBooks.filter(
                      (book) => book.isbn != bookISBN
                    );
                    currentUser.borrowedBooks = borrowedBooks;
                    users[userIndex].borrowedBooks = borrowedBooks;
                    localStorage.setItem(
                      "currentUser",
                      JSON.stringify(currentUser)
                    );
                    localStorage.setItem("users", JSON.stringify(users));
                    Swal.fire(
                      `${book.title} returned!`,
                      "Find some more books to read today!",
                      "success"
                    );
                    booksBorrowedList.innerHTML = null;
                    generateList(borrowedBooks, "borrowedBooks");
                    membersList.innerHTML = null;
                    generateList(users, "members");
                  }
                });
              });
            });
            break;

          case "members":
            newRow.innerHTML = `
              <td class="border-b-2 p-4 dark:border-dark-5">${index + 1}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${data.first_name + " " + data.last_name} 
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">${data.email}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">${
                data.borrowedBooks.length
              }</td>
            `;
            membersList.appendChild(newRow);
            break;
          case "inquiries":
            newRow.innerHTML = `
              <td class="border-b-2 p-4 dark:border-dark-5">${index + 1}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${data.first_name + " " + data.last_name} 
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">${data.email}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">${
                data.inquiryType
              }</td>
              <td class="border-b-2 p-4 dark:border-dark-5">${data.message}</td>
            `;
            inquiriesList.appendChild(newRow);
            break;
          default:
          // code block
        }
      });
    }
  }

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navButtons.forEach((button) => (button.classList = inactiveButton));
      adminSections.forEach((section) => {
        section.classList.add("hidden");
      });

      button.classList = activeButton;

      switch (button.id) {
        case "profileButton":
          profile.classList.remove("hidden");
          break;
        case "membersButton":
          membersSection.classList.remove("hidden");
          break;
        case "inquiriesButton":
          inquiriesSection.classList.remove("hidden");
          break;
        default:
      }
    });
  });

  generateList(currentUser, "profile");
  generateList(borrowedBooks, "borrowedBooks");
  generateList(users, "members");
  generateList(inquiries, "inquiries");
}
