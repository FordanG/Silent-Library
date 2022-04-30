// const borrowers = require("./assets/json/borrowers.json");

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      mode: "no-cors",
    },
  });
  const data = await dataFetch.json();
  return data;
}

async function getBorrowers() {
  const borrowers = await fetchApi("./assets/json/borrowers.json");
  localStorage.setItem("borrowers", JSON.stringify(borrowers));
  //   return borrowers;
}

getBorrowers();



// function generateBorrowers(data) {
//   data.forEach((borrower) => {
//     const borrowerRow = document.createElement("tr");
//     borrowerRow.classList.add("text-gray-700");
//     borrowerRow.innerHTML = `
//               <td class="border-b-2 p-4 dark:border-dark-5">${borrower.id}</td>
//               <td class="border-b-2 p-4 dark:border-dark-5">
//                 ${borrower.name}
//               </td>
//               <td class="border-b-2 p-4 dark:border-dark-5">${borrower.dateLastBorrowed}</td>
//               <td class="border-b-2 p-4 dark:border-dark-5">${borrower.borrowedBooks}</td>
//             `;
//     borrowersList.appendChild(borrowerRow);
//   });
// }

// async function generateBorrowersList() {
//   const data = await fetchApi("./assets/json/borrowers.json");
//   generateBorrowers(data);
// }

// generateBorrowersList();
