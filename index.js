prisijungti.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = event.currentTarget.elements.loginName.value;
  const password = event.currentTarget.elements.loginPassword.value;

  alert(username + password);

  fetch("https://testapi.io/api/Alg1mantas/resource/testas")
    .then((res) => res.json())
    .then((data) => {
      check_if_exists(username, password, data.data);
    })
    .catch((error) => console.log(error));
});

function check_if_exists(username, password, data) {
  let confirmed = false;
  data.forEach((entry) => {
    if (username == entry.username && password == entry.password) {
      console.log("ok");
      document.cookie = "username=" + entry.username;
      document.cookie = "password=" + entry.password;
      console.log("oki");
      confirmed = true;
      window.location.replace("todo.html");
    }
  });

  if (confirmed === false) {
    alert("you've entered bad data"); /* some more actions in the future */
  }
}
