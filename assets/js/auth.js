const auth = JSON.parse(localStorage.getItem("isLoggedIn"));
const navLinks = document.querySelector(".navLinks");
const cta = document.querySelector("#cta");

if (auth) {
  cta.text = "Logout";
  cta.href = "#";
  cta.addEventListener("click", (e) => {
    logout();
  });

  const admin = document.createElement("li");
  admin.classList.add("inline");
  admin.innerHTML = `
              <a
                class="text-lg text-white uppercase font-semibold hover:text-secondary"
                href="./admin.html" id="adminNav"
                >Admin</a
              >
            `;
  navLinks.insertBefore(admin, navLinks.children[4]);
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location = "./index.html";

  Swal.fire({
    title: "Confirmation",
    text: "Logout successful!",
    icon: "success",
    confirmButtonText: "Continue",
  }).then(function () {
    window.location = "./index.html";
  });
}
