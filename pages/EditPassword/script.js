const url = 'https://dubify.onrender.com';
// const url = "http://localhost:8000";

//fortend url
const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
// const frontendUrl = `http://localhost:5500`;

const form = document.querySelector('body');
const heading = document.querySelector('.heading');
const newPassword = document.querySelector('.newPassword');
const confirmPassword = document.querySelector('.confirmPassword');
const password = document.querySelector('.password');
const newPasswordIcon1 = document.querySelector('.newPassword-icon1');
const newPasswordIcon2 = document.querySelector('.newPassword-icon2');
const confirmPasswordIcon1 = document.querySelector('.confirmPassword-icon1');
const confirmPasswordIcon2 = document.querySelector('.confirmPassword-icon2');
const passwordIcon1 = document.querySelector('.password-icon1');
const passwordIcon2 = document.querySelector('.password-icon2');
const newPasswordError = document.querySelector('.newPassword-error');
const confirmPasswordError = document.querySelector('.confirmPassword-error');
const passwordError = document.querySelector('.password-error');
const enterPassword = document.querySelector('.error-text');
const button = document.querySelector('.btn');

const currUrl = new URLSearchParams(window.location.search);
const userToken = currUrl.get('userToken');

let strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);
let chk1 = 0,
    chk2 = 0;

function check() {
    if (newPassword.value.match(strongRegex)) {
        newPassword.style.borderColor = '#27ae60';
        newPasswordIcon1.style.display = 'none';
        newPasswordIcon2.style.display = 'block';
        newPasswordError.style.display = 'none';
        chk1 = 1;
        password.style.display = 'none';
        button.style.display = 'none;';
    } else {
        newPassword.style.borderColor = '#e74c3c';
        newPasswordIcon1.style.display = 'block';
        newPasswordIcon2.style.display = 'none';
        newPasswordError.style.display = 'block';
        chk1 = 0;
        password.style.display = 'none';
        button.style.display = 'none;';
    }
    if (newPassword.value === '') {
        newPassword.style.borderColor = 'lightgray';
        newPasswordIcon1.style.display = 'none';
        newPasswordIcon2.style.display = 'none';
        newPasswordError.style.display = 'none';
        chk1 = 0;
        password.style.display = 'none';
        button.style.display = 'none;';
    }
    if (chk1 === 1 && chk2 === 1) {
        password.style.display = 'block';
        button.style.display = 'block';
    }
}

function check2() {
    if (password.value !== '') {
        password.style.borderColor = 'lightgray';
        passwordIcon1.style.display = 'none';
        passwordIcon2.style.display = 'none';
        passwordError.style.display = 'none';
        enterPassword.style.display = 'none';
    }
}

function check3() {
    if (confirmPassword.value === newPassword.value) {
        confirmPassword.style.borderColor = '#27ae60';
        confirmPasswordIcon1.style.display = 'none';
        confirmPasswordIcon2.style.display = 'block';
        confirmPasswordError.style.display = 'none';
        chk2 = 1;
        password.style.display = 'none';
        button.style.display = 'none;';
    } else {
        confirmPassword.style.borderColor = '#e74c3c';
        confirmPasswordIcon1.style.display = 'block';
        confirmPasswordIcon2.style.display = 'none';
        confirmPasswordError.style.display = 'block';
        chk2 = 0;
        password.style.display = 'none';
        button.style.display = 'none;';
    }
    if (confirmPassword.value === '') {
        confirmPassword.style.borderColor = 'lightgray';
        confirmPasswordIcon1.style.display = 'none';
        confirmPasswordIcon2.style.display = 'none';
        confirmPasswordError.style.display = 'none';
        chk2 = 0;
        password.style.display = 'none';
        button.style.display = 'none;';
    }
    if (chk1 === 1 && chk2 === 1) {
        password.style.display = 'block';
        button.style.display = 'block';
    }
}
console.log = function() {};
button.addEventListener('click', async() => {
    if (password.value === '') {
        password.style.borderColor = '#e74c3c';
        passwordIcon1.style.display = 'block';
        passwordIcon2.style.display = 'none';
        enterPassword.style.display = 'block';
        return;
    }
    let data = {
        newPassword: `${newPassword.value}`,
        password: `${password.value}`,
    };
    data = JSON.stringify(data);
    try {
        const res = await fetch(`${url}/user/updatePassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
            body: data,
        });
        if (res.status === 200) {
            const data = await res.json();
            heading.textContent = 'Password Updated';
            newPassword.style.display = 'none';
            password.style.display = 'none';
            newPasswordIcon1.style.display = 'none';
            newPasswordIcon2.style.display = 'none';
            confirmPasswordIcon1.style.display = 'none';
            confirmPasswordIcon2.style.display = 'none';
            passwordIcon1.style.display = 'none';
            passwordIcon2.style.display = 'none';
            passwordError.style.display = 'none';
            enterPassword.style.display = 'none';
            newPasswordError.style.display = 'none';
            confirmPasswordError.style.display = 'none';
        } else {
            const data = await res.json();
            if (data.message === 'Invalid password') {
                password.style.borderColor = '#e74c3c';
                passwordIcon1.style.display = 'block';
                passwordIcon2.style.display = 'none';
                passwordError.style.display = 'block';
                enterPassword.style.display = 'none';
                return;
            } else {
                heading.textContent = 'Internal Server Error';
            }
        }
    } catch (error) {
        heading.textContent = 'Internal Server Error';
        console.log(error);
    }
});
