let x = document.cookie;
let array = x.split(" ");
let cookieUserName = array[3].split("=")[1].slice(0, -1);
let cookiePassword = array[4].split("=")[1];
console.log(cookiePassword + " " + cookieUserName);
console.log(cookieUserName);

// var today = new Date();
// var tomorrow = new Date();
// tomorrow.setDate(today.getDate() + 1);
// console.log(tomorrow);

const labas = document.createElement("h3");
labas.textContent = "Sveiki " + cookiePassword + " " + cookieUserName;
document.body.append(labas);

function logout() {
  alert("logout");
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
}

function appendNewEntry() {
  /*kazkaip sita funkcija turi i6gimdyti nauj1 diva su lauku prideti naujoms eilutems */
  const laba = document.createElement("h1");
  laba.textContent = "labytukas";
  document.body.append(laba);

  const laba2 = document.createElement("h1");
  laba2.textContent = "kaaaaaaaaaaaa";
  document.body.append(laba2);
}

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

sukurtiIrasa.addEventListener("submit", function (event) {
  console.log("bandom kurti");
  event.preventDefault();

  const pavadinimas = event.currentTarget.elements.pavadinimas.value;
  const tekstas = event.currentTarget.elements.tekstas.value;
  console.log(pavadinimas + tekstas);
  toggleModal();
  sendEntry(pavadinimas, tekstas);
});

function sendEntry(pavadinimas, tekstas) {
  newDate = getEndDate();
  fetch("https://testapi.io/api/Alg1mantas/resource/entries", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: cookieUserName,
      surname: cookiePassword,
      type: pavadinimas,
      content: tekstas,
      endDate: newDate,
    }),
  })
    .then((res) => res.JSON())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function getEndDate() {
  var result = new Date();
  result.setDate(result.getDate() + 30);
  console.log(result);
  return result;
}

function get_todos() {
  fetch("https://testapi.io/api/Alg1mantas/resource/entries")
    .then((res) => res.json())
    .then((data) => {
      create_todo(data.data);
    })
    .catch((error) => console.log(error));
}

function create_todo(data) {
  console.log(data);
  data.forEach((data) => {
    console.log(data.content + data.name);
    if (cookieUserName === data.name && cookiePassword === data.surname) {
      var div = document.createElement("div");
      div.style.width = "40%";
      div.style.color = "red";
      div.style.padding = "20px";
      div.style.borderRadius = "20px";
      div.style.backgroundColor = "blue";
      div.style.margin = "20px";

      const type = document.createElement("h3");
      type.textContent = data.type;
      div.append(type);

      const content = document.createElement("p");
      content.textContent = data.content;
      div.append(content);

      const br = document.createElement("br");
      const br2 = document.createElement("br");
      const end_date = document.createElement("h7");
      end_date.textContent = data.endDate;

      div.append(end_date);
      div.append(br);
      div.append(br2);

      const edit_button = document.createElement("button");
      edit_button.addEventListener("click", open_edit_modal);
      edit_button.textContent = "Edit";
      div.append(edit_button);

      const button = document.createElement("button");
      button.type = "button";
      button.value = "delete";
      button.textContent = "delete";
      button.addEventListener(
        "click",
        function () {
          deleteTask(data);
        },
        false
      );

      div.appendChild(button);

      document.getElementById("main").appendChild(div);
    }
  });
}

get_todos();

function deleteTask(data) {
  alert(data.id);
  fetch(`https://testapi.io/api/Alg1mantas/resource/entries/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
}

function open_edit_modal(e) {
  // todo_form.elements.id.style.display = "inline";
  // document.getElementById("id_label").style.display = "inline";
  todo_form.elements.modal_button.value = "SAVE";
  modal.style.display = "block";

  const id = e.target.parentElement.id.substring(8);
  const type = document.querySelector(
    `#${e.target.parentElement.id} h2`
  ).textContent;
  const content = document.querySelector(
    `#${e.target.parentElement.id} p:nth-of-type(1)`
  ).textContent;
  const end_date = document.querySelector(
    `#${e.target.parentElement.id} p:nth-of-type(2)`
  ).textContent;

  todo_form.elements.id.value = id;
  todo_form.elements.type.value = type;
  todo_form.elements.content.value = content;
  todo_form.elements.end_date.value = end_date;
}

// const modal2 = document.querySelector(".modal");
// const trigger2 = document.querySelector(".trigger");
// const closeButton2 = document.querySelector(".close-button");

// function toggleModal() {
//   modal.classList.toggle("show-modal");
// }

// function windowOnClick(event) {
//   if (event.target === modal) {
//     toggleModal();
//   }
// }

// trigger.addEventListener("click", toggleModal);
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);
