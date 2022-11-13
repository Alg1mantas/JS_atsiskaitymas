registruotis.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = event.currentTarget.elements.username.value;
  const password = event.currentTarget.elements.password.value;
  fecas(username, password);
});

function fecas(username, password) {
  fetch("https://testapi.io/api/Alg1mantas/resource/testas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then(() => {
    <button onclick="window.location.href='register.html'">Register</button>;
  });
}
