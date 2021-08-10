class Message {
  showMessage(type, text) {
    let div = document.createElement("DIV");
    div.id = "message";
    div.className = `${type} fadein`;
    div.appendChild(document.createTextNode(text));

    document.body.appendChild(div);

    setTimeout(() => {
      document.getElementById("message").classList.add("fadeout");
      document.getElementById("message").classList.remove("fadein");
    }, 3000);

    setTimeout(() => {
      document.getElementById("message").remove();
    }, 3400);
  }
}

// function showMessage(type, text) {
//   let div = document.createElement("DIV");
//   div.id = "message";
//   div.className = `${type} fadein`;
//   div.appendChild(document.createTextNode(text));

//   document.body.appendChild(div);

//   setTimeout(() => {
//     document.getElementById("message").classList.add("fadeout");
//     document.getElementById("message").classList.remove("fadein");
//   }, 3000);

//   setTimeout(() => {
//     document.getElementById("message").remove();
//   }, 3400);
// }
