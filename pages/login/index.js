const loginButton = document.querySelector("form button");
const register = document.querySelector(".register");

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



//username

const username = document.querySelector('.username');
const usernameIcon1 = document.querySelector('.username-icon1');
const usernameIcon2 = document.querySelector('.username-icon2');
const usernameError = document.querySelector('.username-error');
let chk1 = 0;

function check1() {
    if (username.value.length <= 10) {
        username.style.borderColor = '#27ae60';
        usernameIcon1.style.display = 'none';
        usernameIcon2.style.display = 'block';
        usernameError.style.display = 'none';
        chk1 = 1;
    } else {
        username.style.borderColor = '#e74c3c';
        usernameIcon2.style.display = 'none';
        usernameIcon1.style.display = 'block';
        usernameError.style.display = 'block';
        chk1 = 0;
    }
    if (username.value === "") {
        username.style.borderColor = 'lightgray';
        usernameIcon1.style.display = 'none';
        usernameIcon2.style.display = 'none';
        usernameError.style.display = 'none';
        chk1 = 0;
    }
    if (chk1 === 1 && chk2 === 1 && chk3 === 1 && chk4 === 1 && chk5 === 1) register.style.display = 'block';
    else register.style.display = 'none';
}

//name

const _name = document.querySelector('.name');
const nameIcon1 = document.querySelector('.name-icon1');
const nameIcon2 = document.querySelector('.name-icon2');
const nameError = document.querySelector('.name-error');
let chk2 = 0;

function check2() {
    if (_name.value.length <= 20) {
        _name.style.borderColor = '#27ae60';
        nameIcon1.style.display = 'none';
        nameIcon2.style.display = 'block';
        nameError.style.display = 'none';
        chk2 = 1;
    } else {
        _name.style.borderColor = '#e74c3c';
        nameIcon2.style.display = 'none';
        nameIcon1.style.display = 'block';
        nameError.style.display = 'block';
        chk2 = 0;
    }
    if (_name.value === "") {
        _name.style.borderColor = 'lightgray';
        nameIcon1.style.display = 'none';
        nameIcon2.style.display = 'none';
        nameError.style.display = 'none';
        chk2 = 0;
    }
    if (chk1 === 1 && chk2 === 1 && chk3 === 1 && chk4 === 1 && chk5 === 1) register.style.display = 'block';
    else register.style.display = 'none';
}

//sign_up_email

let reg = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const signUpEmail = document.querySelector('.signUpEmail');
const signUpEmailIcon1 = document.querySelector('.signUpEmail-icon1');
const signUpEmailIcon2 = document.querySelector('.signUpEmail-icon2');
const signUpEmailError = document.querySelector('.signUpEmail-error');
let chk3 = 0;

function check3() {
    if (signUpEmail.value.match(reg)) {
        signUpEmail.style.borderColor = '#27ae60';
        signUpEmailIcon1.style.display = 'none';
        signUpEmailIcon2.style.display = 'block';
        signUpEmailError.style.display = 'none';
        chk3 = 1;
    } else {
        signUpEmail.style.borderColor = '#e74c3c';
        signUpEmailIcon1.style.display = 'block';
        signUpEmailIcon2.style.display = 'none';
        signUpEmailError.style.display = 'block';
        chk3 = 0;
    }
    if (signUpEmail.value === "") {
        signUpEmail.style.borderColor = 'lightgray';
        signUpEmailIcon1.style.display = 'none';
        signUpEmailIcon2.style.display = 'none';
        signUpEmailError.style.display = 'none';
        chk3 = 0;
    }
    if (chk1 === 1 && chk2 === 1 && chk3 === 1 && chk4 === 1 && chk5 === 1) register.style.display = 'block';
    else register.style.display = 'none';
}

//sign_up_password

let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const signUpPassword = document.querySelector('.signUpPassword');
const signUpPasswordIcon1 = document.querySelector('.signUpPassword-icon1');
const signUpPasswordIcon2 = document.querySelector('.signUpPassword-icon2');
const signUpPasswordError = document.querySelector('.signUpPassword-error');
let chk4 = 0;

function check4() {
    if (signUpPassword.value.match(strongRegex)) {
        signUpPassword.style.borderColor = '#27ae60';
        signUpPasswordIcon1.style.display = 'none';
        signUpPasswordIcon2.style.display = 'block';
        signUpPasswordError.style.display = 'none';
        chk4 = 1;
    } else {
        signUpPassword.style.borderColor = '#e74c3c';
        signUpPasswordIcon1.style.display = 'block';
        signUpPasswordIcon2.style.display = 'none';
        signUpPasswordError.style.display = 'block';
        chk4 = 0;
    }
    if (signUpPassword.value === "") {
        signUpPassword.style.borderColor = 'lightgray';
        signUpPasswordIcon1.style.display = 'none';
        signUpPasswordIcon2.style.display = 'none';
        signUpPasswordError.style.display = 'none';
        chk4 = 0;
    }
    if (chk1 === 1 && chk2 === 1 && chk3 === 1 && chk4 === 1 && chk5 === 1) register.style.display = 'block';
    else register.style.display = 'none';
}

//confirmPassword

const confirmPassword = document.querySelector('.confirm-password');
const confirmPasswordIcon1 = document.querySelector('.confirm-password-icon1');
const confirmPasswordIcon2 = document.querySelector('.confirm-password-icon2');
const confirmPasswordError = document.querySelector('.confirm-password-error');
let chk5 = 0;

function check5() {
    if (confirmPassword.value === signUpPassword.value) {
        confirmPassword.style.borderColor = '#27ae60';
        confirmPasswordIcon1.style.display = 'none';
        confirmPasswordIcon2.style.display = 'block';
        confirmPasswordError.style.display = 'none';
        chk5 = 1;
    } else {
        confirmPassword.style.borderColor = '#e74c3c';
        confirmPasswordIcon1.style.display = 'block';
        confirmPasswordIcon2.style.display = 'none';
        confirmPasswordError.style.display = 'block';
        chk5 = 0;
    }
    if (confirmPassword.value === "") {
        confirmPassword.style.borderColor = 'lightgray';
        confirmPasswordIcon1.style.display = 'none';
        confirmPasswordIcon2.style.display = 'none';
        confirmPasswordError.style.display = 'none';
        chk5 = 0;
    }
    if (chk1 === 1 && chk2 === 1 && chk3 === 1 && chk4 === 1 && chk5 === 1) register.style.display = 'block';
    else register.style.display = 'none';
}