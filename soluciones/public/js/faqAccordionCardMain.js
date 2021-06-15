const liPreguntas = document.getElementsByTagName("li");
var idLi = "";
if (liPreguntas.length > 0) {
  for (let i = 0; i < liPreguntas.length; i++) {
    liPreguntas[i].addEventListener("click", function (e) {
      eventClick(e);
    });
  }
}
const eventClick = (e) => {
  let miid = e.target.id;
  var li = e.target;
  if (miid == idLi) {
    let myClass = e.target.className;
    if (myClass == "") {
      li.classList.add("li-active");
    } else {
      li.classList.remove(myClass);
    }
  } else {
    /*---------Le quitamos las clases a los otros items-----*/
    var liActive = document.getElementsByClassName("li-active");
    if (liActive.length > 0) {
      liActive[0].classList.remove("li-active");
    }
    /*------------------------------------------------------*/
    li.classList.add("li-active");
  }
  idLi = miid;
};