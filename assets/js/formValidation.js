console.log("form validation start");
let users = localStorage.getItem("users");
$(function () {
  users = JSON.parse(users); // Convert String as an Object
  if (users === null)
    // If there is nothing intialize
    users = [
      {
        first_name: "Gabriel John",
        last_name: "Fordan",
        email: "gabrieljohnfordan@gmail.com",
        password: "Wasdzc123*",
      },
    ];
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("isLoggedIn", false);
});

// nodes selection
const registrationForm = document.forms.namedItem("registration");
const loginForm = document.forms.namedItem("login");

const registerUser = () => {
  // Get the HTML elements
  let firstName = document.registration.firstName;
  let lastName = document.registration.lastName;
  let email = document.registration.email;
  let password = document.registration.password;

  if (isValidFirstName(firstName, 1, 20))
    if (isValidLastName(lastName, 1, 20))
      if (isValidEmail(email))
        if (!checkUser(email))
          if (isValidPassword(password, 6)) {
            let user = {
              first_name: $("#firstName").val(),
              last_name: $("#lastName").val(),
              email: $("#email").val(),
              password: $("#password").val(),
            };

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            Swal.fire({
              title: "Confirmation",
              text: "Registration successful!",
              icon: "success",
              confirmButtonText: "Continue",
            });
            return true;
          }

  return false;
};

const loginUser = () => {
  // Get the HTML elements
  let email = document.login.email;
  let password = document.login.password;

  if (isValidEmail(email))
    if (isValidPassword(password, 6)) {
      const user = checkUser(email);
      if (user.email === email.value && user.password === password.value) {
        Swal.fire({
          title: "Confirmation",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "Continue",
        }).then(function () {
          window.location = "./books.html";
        });
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        Swal.fire({
          title: "Login Failed",
          text: "Please check your email and password",
          icon: "error",
          confirmButtonText: "Continue",
        });
      }
    }

  return false;
};

const isValidFirstName = (firstName, minLen, maxLen) => {
  let firstNameLength = firstName.value.length;
  if (
    firstNameLength == 0 ||
    firstNameLength > maxLen ||
    firstNameLength < minLen
  ) {
    // || - Or operator
    alert(
      "First Name should not be empty / length must be between " +
        minLen +
        " to " +
        maxLen
    );
    firstName.focus();
    return false;
  } else if (!isAlpha(firstName)) {
    //! - Not operator
    alert("Enter alphabets only");
    firstName.focus();
    return false;
  }
  return true;
};

const isValidLastName = (lastName, minLen, maxLen) => {
  let lastNameLength = lastName.value.length;
  if (
    lastNameLength == 0 ||
    lastNameLength > maxLen ||
    lastNameLength < minLen
  ) {
    // || - Or operator
    alert(
      "First Name should not be empty / length must be between " +
        minLen +
        " to " +
        maxLen
    );
    lastName.focus();
    return false;
  } else if (!isAlpha(lastName)) {
    //! - Not operator
    alert("Enter alphabets only");
    lastName.focus();
    return false;
  }
  return true;
};

const isValidEmail = (email) => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    return true;
  } else {
    alert("Enter valid email address!");
    email.focus();
    return false;
  }
};

const isValidPassword = (password, minLen) => {
  let passwordLength = password.value.length;
  if (passwordLength == 0 || passwordLength < minLen) {
    // || - Or operator
    alert("Password should not be empty / length must be more than " + minLen);
    password.focus();
    return false;
  } else if (!isPassword(password)) {
    // - must contain at least 1 uppercase letter, 1 lowercase letter
    alert(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter"
    );
    password.focus();
    return false;
  }
  return true;
};

const isAlpha = (input) => {
  let characters = /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/; // Regular Expression [ ] - Options , A-Z - A,B, C ... Z, ^ - Any
  if (input.value.match(characters)) {
    return true;
  }
  return false;
};

const isAlphaNumeric = (input) => {
  let characters = /^[0-9A-Za-z]+$/;
  if (input.value.match(characters)) {
    return true;
  }
  return false;
};

const isPassword = (input) => {
  // - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
  let characters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm;
  if (input.value.match(characters)) {
    return true;
  }
  return false;
};

const checkUser = (email) => {
  const userFound = users.find((user) => {
    return user.email == email.value;
  });
  console.log(email.value);
  console.log(users);
  console.log(userFound);
  if (userFound && registrationForm) {
    Swal.fire({
      title: "User Found",
      text: "This email has been associated with an account already",
      icon: "error",
      confirmButtonText: "Continue",
    });
  }
  return userFound ? userFound : false;
};

// document.querySelector("#submit").addEventListener("click", formValidation());

if (registrationForm)
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    registerUser();
  });

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginUser();
  });
