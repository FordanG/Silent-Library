export const database = {
  books: JSON.parse(localStorage.getItem("books")),
  users: JSON.parse(localStorage.getItem("users")),
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : {},
  inquiries: JSON.parse(localStorage.getItem("inquiries")),
};
