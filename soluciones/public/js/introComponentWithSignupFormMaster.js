/*----constantes, variables, validaciones---------*/
const formData = document.getElementById("form");
const inputFormData = formData.querySelectorAll("input");
const regularExpresion = {
  text: /^[a-zA-Z ]{3,20}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_+-]+\.[a-zA-Z-]+$/,
  password: /^[a-zA-Z0-9._+-]{10,30}$/,
};

var estadoInputs = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
};

/*--------eventos primarios------------*/
// if (inputFormData.length > 0) {
//   inputFormData.forEach((element) => {
//     element.addEventListener("keyup", (e) => {
//       keyUpInput(e);
//     });
//   });
// }
formData.addEventListener("submit", (e) => {
  e.preventDefault();
  let miFormData = new FormData(formData);
  var firstName = miFormData.get("firstName");
  var lastName = miFormData.get("lastName");
  var email = miFormData.get("email");
  var password = miFormData.get("password");

  validar(regularExpresion.text, firstName, "firstName");
  validar(regularExpresion.text, lastName, "lastName");
  validar(regularExpresion.email, email, "email");
  validar(regularExpresion.password, password, "password");

  if (
    estadoInputs.firstName == true &&
    estadoInputs.lastName == true &&
    estadoInputs.email == true &&
    estadoInputs.password == true
  ) {
    let messageSuccess=document.getElementById("message-send");
    messageSuccess.innerText="Todos los campos correctos";
    messageSuccess.style.display="block";
    setTimeout((e)=>{
      messageSuccess.innerText="";
      messageSuccess.style.display="none";
    },1000);
  } else {
    if (inputFormData.length > 0) {
      inputFormData.forEach((element) => {
        element.addEventListener("keyup", (e) => {
          keyUpInput(e);
        });
      });
    }
  }
});
/*-----------eventos secundarios-------------*/
const keyUpInput = (e) => {
  var nameInput = e.target.name;
  var valueInput = e.target.value.trim();

  switch (nameInput.toLowerCase()) {
    case "firstname":
      validar(regularExpresion.text, valueInput, nameInput);
      break;
    case "lastname":
      validar(regularExpresion.text, valueInput, nameInput);
      break;
    case "email":
      validar(regularExpresion.email, valueInput, nameInput);
      break;
    case "password":
      validar(regularExpresion.password, valueInput, nameInput);
      break;
  }
};

/*-------------validaciones---------------*/
function validar(expresionRegular, value, nameInput) {
  let groupInput = document.getElementById("group-input-" + nameInput);
  let classGroupInput = groupInput.className;
  var estado = false;

  if (value.trim() != "") {
    if (expresionRegular.test(value)) {
      if (classGroupInput.includes("error")) {
        groupInput.classList.remove("error");
      }
      estado = true;
    } else {
      if (classGroupInput.includes("error") == false) {
        groupInput.classList.add("error");
      }
      estado = false;
    }
  } else {
    if (classGroupInput.includes("error") == false) {
      groupInput.classList.add("error");
    }
    estado = false;
  }
  estadoInputs[nameInput] = estado;
  mostrarError(nameInput, value, estado);
}
function mostrarError(nameError, value, estado = false) {
  let showMessage = document.getElementById("error-message-" + nameError);
  showMessage.innerText = "";

  switch (nameError.toLowerCase()) {
    case "firstname":
      if (value.trim() == "") {
        showMessage.innerText = "Provide a first name";
      } else {
        if (estado == false) {
          /*----otras validaciones------*/
          if (value.trim().length < 3) {
            showMessage.innerText = "min 3 characters";
          } else if (value.trim().length > 20) {
            showMessage.innerText = "max 20 characters";
          } else {
            showMessage.innerText = "Invalid first name (only text)";
          }
        } else {
          showMessage.innerText = "";
        }
      }
      break;
    case "lastname":
      if (value.trim() == "") {
        showMessage.innerText = "Provide a last name";
      } else {
        if (estado == false) {
          /*----otras validaciones------*/
          if (value.trim().length < 3) {
            showMessage.innerText = "min 3 characters";
          } else if (value.trim().length > 20) {
            showMessage.innerText = "max 20 characters";
          } else {
            showMessage.innerText = "Invalid last name (only text)";
          }
        } else {
          showMessage.innerText = "";
        }
      }
      break;
    case "email":
      if (value.trim() == "") {
        showMessage.innerText = "Provide a email";
      } else {
        if (estado == false) {
          showMessage.innerText = "Example email: abr_123.fl-za@email.any";
        } else {
          showMessage.innerText = "";
        }
      }
      break;
    case "password":
      if (value.trim() == "") {
        showMessage.innerText = "Provide a password";
      } else {
        if (estado == false) {
          if (value.trim().length < 10) {
            showMessage.innerText = "min 10 characters";
          } else if (value.trim().length > 30) {
            showMessage.innerText = "max 50 characters";
          } else {
            showMessage.innerText =
              "Invalid password (text and number, only text or only number)";
          }
        } else {
          showMessage.innerText = "";
        }
      }
      break;
  }
}
