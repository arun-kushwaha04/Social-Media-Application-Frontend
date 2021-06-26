const homeButton = document.querySelector('.home > img');
const editProfileButtton = document.querySelector('.edit > img');
const logoutButton = document.querySelector('.logout > img');
const userToken = localStorage.getItem("userToken");
const url = "http://localhost:8000";

homeButton.addEventListener('click', () => {
    location.href = "/pages/dashboard/dashboard.html";
});

logoutButton.addEventListener('click', () => {
    if (userToken) {
        fetch(`${url}/auth/logout`, {
          method: "POST",
          headers: {
            authorization: userToken,
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
    location.replace = "../../index.html";
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('profilePhoto');
    localStorage.removeItem('userId');
});

editProfileButtton.addEventListener('click', () => {
    location.href = "";
});