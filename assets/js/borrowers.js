const borrowersList = document.querySelector(".borrowersList");
const data = JSON.parse(localStorage.getItem("users"));
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

generateBorrowers(data);
