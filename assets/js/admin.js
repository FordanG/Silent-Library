const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users"));
const borrowedBooks = currentUser.borrowedBooks;

const adminSubtitle = document.querySelector("#adminSubtitle");
const adminMain = document.querySelector("#adminMain");

(() => {
  adminSubtitle.textContent = `Hello, ${currentUser.first_name} ${currentUser.last_name}. Welcome to the Admin Page!`;
})();

const booksBorrowedSection = document.querySelector("#booksBorrowed");
const booksBorrowedButton = document.querySelector("#booksBorrowedButton");
const booksBorrowedList = document.querySelector("#booksBorrowedList");

const borrowersSection = document.querySelector("#borrowers");
const borrowersButton = document.querySelector("#borrowersButton");
const borrowersList = document.querySelector("#borrowersList");

const membersSection = document.querySelector("#members");
const membersButton = document.querySelector("#membersButton");
const membersList = document.querySelector("#membersList");

// const booksSection = document.querySelector("#books");
// const booksButton = document.querySelector("#booksButton");
// const booksList = document.querySelector("#booksList");

const inquiriesSection = document.querySelector("#inquiries");
const inquiriesButton = document.querySelector("#inquiriesButton");
const inquiriesList = document.querySelector("#inquiriesList");

const inactiveButton =
  "px-5 py-2 rounded-md text-gray-700 font-bold hover:text-secondary transition duration-200 ease-in-out";

const activeButton =
  "px-5 py-2 border-secondary border-2 rounded-md text-gray-700 font-bold hover:text-secondary transition duration-200 ease-in-out";

const navButtons = [
  booksBorrowedButton,
  borrowersButton,
  membersButton,
  inquiriesButton,
];

const adminSections = [
  booksBorrowedSection,
  borrowersSection,
  membersSection,
  inquiriesSection,
];

function generateList(database, databaseType) {
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
            `;
        booksBorrowedList.appendChild(newRow);
        break;
      case "borrowers":
        newRow.innerHTML = `
              <td class="border-b-2 p-4 dark:border-dark-5">${index + 1}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${data.first_name + " " + data.last_name} 
              </td>
              
              <td class="border-b-2 p-4 dark:border-dark-5">${
                data.borrowedBooks.length
              }</td>
            `;
        borrowersList.appendChild(newRow);
        break;
      case "members":
        newRow.innerHTML = `
              <td class="border-b-2 p-4 dark:border-dark-5">${index + 1}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${data.first_name + " " + data.last_name} 
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">${data.email}</td>
            `;
        membersList.appendChild(newRow);
        break;
      case "inquiries":
        break;
      default:
      // code block
    }
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((button) => (button.classList = inactiveButton));
    adminSections.forEach((section) => {
      section.classList.add("hidden");
    });

    button.classList = activeButton;

    switch (button.id) {
      case "booksBorrowedButton":
        booksBorrowedSection.classList.remove("hidden");
        break;
      case "borrowersButton":
        borrowersSection.classList.remove("hidden");
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

// borrowersButton.addEventListener("click", () => {
//   borrowersButton.classList = activeButton;
//   borrowersSection.classList.remove("hidden");
//   generateList(borrowerData, "borrowers");
// });

generateList(users, "borrowers");
generateList(borrowedBooks, "borrowedBooks");
generateList(users, "members");
