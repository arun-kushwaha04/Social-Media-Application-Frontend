const loginButton = document.querySelector("form button");

loginButton.addEventListener('click', () => {
    location.href = "../dashboard/dashboard.html"
})

//changing sign and login page

const loignPage = document.querySelector('#login');
const signupPage = document.querySelector('#signup');
const toLogin = document.querySelector('.toLogin');
const toSignUp = document.querySelector('.toSignUp');

toLogin.addEventListener('click', () => {
    signupPage.style.display = 'none';
    loignPage.style.display = 'block';
});

toSignUp.addEventListener('click', () => {
    signupPage.style.display = 'block';
    loignPage.style.display = 'none';
})