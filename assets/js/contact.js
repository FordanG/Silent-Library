let users = JSON.parse(localStorage.getItem("users"));

// nodes selection
const contactForm = document.forms.namedItem("contact");
let inquiries = JSON.parse(localStorage.getItem("inquiries"));
console.log(contactForm);

const submitForm = () => {
  // Get the HTML elements
  let firstName = contactForm.firstName;
  let lastName = contactForm.lastName;
  let email = contactForm.email;
  let inquiryType = contactForm.inquiry;
  let message = contactForm.message;

  if (isValidFirstName(firstName, 1, 20))
    if (isValidLastName(lastName, 1, 20))
      if (isValidEmail(email)) {
        let inquiry = {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          inquiryType: inquiryType.value,
          message: message.value,
        };

        inquiries.push(inquiry);

        localStorage.setItem("inquiries", JSON.stringify(inquiries));
        Swal.fire({
          title: "Confirmation",
          text: "Message Sent!",
          icon: "success",
          confirmButtonText: "Continue",
        }).then(function () {
          contactForm.reset();
        });
        return true;
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

if (contactForm)
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
  });
