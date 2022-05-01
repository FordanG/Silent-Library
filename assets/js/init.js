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

function setDatabase(data) {
  if (!localStorage.getItem("users"))
    localStorage.setItem("users", JSON.stringify(data[0]));
  if (!localStorage.getItem("books"))
    localStorage.setItem("books", JSON.stringify(data[1]));
  if (!localStorage.getItem("isLoggedIn"))
    localStorage.setItem("isLoggedIn", false);
  if (!localStorage.getItem("currentUser"))
    localStorage.setItem("currentUser", "");
}

async function initializeDatabase() {
  const userData = await fetchApi("./assets/json/users.json");
  const booksData = await fetchApi("./assets/json/books.json");
  const database = [userData, booksData];
  setDatabase(database);
}

initializeDatabase();
