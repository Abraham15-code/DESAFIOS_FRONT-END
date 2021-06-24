const txtEmail = document.getElementById("txtEmail");
const form = document.getElementById("form");
const errorMail = document.getElementById("error-message-email");

/*----------expresiones regulares para validaciones-------------*/
const validaExpression = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z_+-]+\.[a-zA-Z-]+$/,
};
/*------------------formularios--------------------------------------------*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validaDatos(new FormData(form));
});

/*----------otras acciones--------------------------*/
function validaDatos(FormData) {
  var email = FormData.get("txtEmail").trim();
  let clase = form.className;

  if (clase.includes("error")) {
    form.classList.remove("error");
  } else if (clase.includes("success")) {
    form.classList.remove("success");
  }
  if (email != "") {
    if (validaExpression.email.test(email)) {
      form.classList.add("success");
      errorMail.innerText = "";
      errorMail.innerText = "It's a valid email";
      setTimeout((e) => {
        errorMail.innerText = "";
        form.classList.remove("success");
      }, 3000);
    } else {
      form.classList.add("error");
      errorMail.innerText = "";
      errorMail.innerText =
        "Please, provide a valid email, example: micorreo.123@gmail.com";
    }
  } else {
    form.classList.add("error");
    errorMail.innerText = "";
    errorMail.innerText = "Please, provide a email";
  }
}
