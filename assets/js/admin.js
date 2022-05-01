const borrowersList = document.querySelector(".borrowersList");
const booksBorrowedList = document.querySelector(".booksBorrowedList");

const borrowerData = JSON.parse(localStorage.getItem("users"));
const borrowedBooks = JSON.parse(
  localStorage.getItem("currentUser")
).borrowedBooks;

function generateBooksBorrowed(data) {
  data.forEach((borrowedBook, index) => {
    console.log(borrowedBook);
    //   const userIndex = users.findIndex(
    //     (user) => (user.email = currentUser.email)
    //   );
    const borrowedBookRow = document.createElement("tr");
    borrowedBookRow.classList.add("text-gray-700");
    borrowedBookRow.innerHTML = `
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${index + 1}
              </td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${borrowedBook.title} 
              </td>
              
              <td class="border-b-2 p-4 dark:border-dark-5">${
                borrowedBook.authors[0]
              } </td>
            `;
    booksBorrowedList.appendChild(borrowedBookRow);
  });
}

function generateBorrowers(data) {
  data.forEach((borrower) => {
    const borrowerRow = document.createElement("tr");
    borrowerRow.classList.add("text-gray-700");
    borrowerRow.innerHTML = `
              <td class="border-b-2 p-4 dark:border-dark-5">${borrower.id}</td>
              <td class="border-b-2 p-4 dark:border-dark-5">
                ${borrower.first_name + " " + borrower.last_name} 
              </td>
              
              <td class="border-b-2 p-4 dark:border-dark-5">${
                borrower.borrowedBooks.length
              }</td>
            `;
    borrowersList.appendChild(borrowerRow);
  });
}

generateBorrowers(borrowerData);
generateBooksBorrowed(borrowedBooks);
