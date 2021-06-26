const homeButton = document.querySelector('.home > img');
const editProfileButtton = document.querySelector('.edit > img');
const logoutButton = document.querySelector('.logout > img');

homeButton.addEventListener('click', () => {
    location.href = "/pages/dashboard/dashboard.html";
});

logoutButton.addEventListener('click', () => {
    if (token) {
        fetch(`${url}/auth/logout`, {
          method: "POST",
          headers: {
            authorization: token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.message)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    location.href = "../../index.html";
    localStorage.removeItem('userToken');
});

editProfileButtton.addEventListener('click', () => {
    location.href = "";
});