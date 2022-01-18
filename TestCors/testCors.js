const element = document.getElementById("root");
const button = document.getElementById("create-account");

function createAccount() {
  element.innerHTML = "Create ngon";
  const account = {
      username : 'akalabu4',
      password : 'akalabu2',
      role : 'users'
  }
  axios
    .post("http://localhost:3000/account",account)
    .then(function (response) {
      // handle success
      console.log(response);
      element.innerHTML = JSON.stringify(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      element.innerHTML = error;
    });
}
axios
  .get("http://localhost:3000/account")
  .then(function (response) {
    // handle success
    console.log(response);
    element.value = "củ cải";
    element.innerHTML = "Ok";
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    element.innerHTML = "Bị Lỗi";
  });
