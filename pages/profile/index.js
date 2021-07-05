const homeButton = document.querySelector('.home > img');
const editProfileButtton = document.querySelector('.edit > img');
const logoutButton = document.querySelector('.logout > img');
const userToken = localStorage.getItem("userToken");

const url = "https://sheltered-citadel-84490.herokuapp.com";
// const url = "http://localhost:8000";

const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
// const frontendUrl = `http://localhost:5500`;

const currUrl = new URLSearchParams(window.location.search);
const username = currUrl.get("username");

const name_ = document.querySelector('.name');
const username_ = document.querySelector('.username');
const email = document.querySelector('.email');
const postCount = document.querySelector('.postCount');
const followerCount = document.querySelector('.followerCount');
const followingCount = document.querySelector('.followingCount');
const likeCount = document.querySelector('.likeCount');
const about = document.querySelector('.about');
const photo = document.querySelector('.user-image');

window.onload = () => {
    fetchUserDetails();
};

window.onload = () => {

    if (userToken) {
        fetch(`${url}/user/getUserinfo`, {
                method: "POST",
                headers: {
                    "Authorization": `${localStorage.getItem("userToken")}`,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("hi");
                console.log(data.userData);
                Name.innerHTML=data.name;
                email.innerHTML=data.email;
                postCount.innerHTML=data.posts;
                followerCount.innerHTML=data.followers;
                followingCount.innerHTML=data.following;
                likeCount.innerHTML=data.likes;
                about.innerHTML=data.about;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};


homeButton.addEventListener('click', () => {
    location.href = `${frontendUrl}/pages/dashboard/dashboard.html`;
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
    location.replace(`${frontendUrl}/index.html`);
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('profilePhoto');
    localStorage.removeItem('userId');
});

editProfileButtton.addEventListener('click', () => {
    location.href = "";
});

let theme = localStorage.getItem("theme");

const changeThemeButton = document.querySelector(".theme-changer");

changeThemeButton.addEventListener('click', () => themeSlector());

function themeSlector() {
    nav2.style.background = "#0c033a";
    if (theme === 1) {
        localStorage.setItem("theme", 0);
        sec.classList.remove('dark');
        changeThemeButton.innerHTML = ` <img src="../../assets/darkTheme.svg" alt="">`;
        theme = 0;
        nav2.style.borderBottom = "2px solid greenyellow";
        return;
    } else {
        localStorage.setItem("theme", 1);
        sec.classList.add('dark');
        changeThemeButton.innerHTML = ` <img src="../../assets/lightTheme.svg" alt="">`;
        theme = 1;
        nav2.style.borderBottom = "2px solid rgb(251, 122, 201)";
        return;
    }
}