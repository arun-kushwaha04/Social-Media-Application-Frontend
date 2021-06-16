const homeButton = document.querySelector('.home > img');
const editProfileButtton = document.querySelector('.edit > img');
const logoutButton = document.querySelector('.logout > img');

homeButton.addEventListener('click',()=>{{
    location.href = "/pages/dashboard/dashboard.html";
}})

logoutButton.addEventListener('click',()=>{{
    location.href = "/pages/login/index.html";
}})