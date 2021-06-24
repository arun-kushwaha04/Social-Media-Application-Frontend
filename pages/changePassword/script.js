const newPassword = document.querySelector('.newPassword');
const confirmPassword = document.querySelector('.confirmPassword');
const newPasswordIcon1 = document.querySelector('.newPassword-icon1');
const newPasswordIcon2 = document.querySelector('.newPassword-icon2');
const confirmPasswordIcon1 = document.querySelector('.confirmPassword-icon1');
const confirmPasswordIcon2 = document.querySelector('.confirmPassword-icon2');
const newPasswordError = document.querySelector('.newPassword-error');
const confirmPasswordError = document.querySelector('.confirmPassword-error');
const button = document.querySelector('.btn');

const currUrl = new URLSearchParams(window.location.search);
const userToken = currUrl.get("userToken");


let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
let chk1 = 0,
    chk2 = 0;

function check() {
    if (newPassword.value.match(strongRegex)) {
        newPassword.style.borderColor = '#27ae60';
        newPasswordIcon1.style.display = 'none';
        newPasswordIcon2.style.display = 'block';
        newPasswordError.style.display = 'none';
        chk1 = 1;
        button.style.display = 'none;'
    } else {
        newPassword.style.borderColor = '#e74c3c';
        newPasswordIcon1.style.display = 'block';
        newPasswordIcon2.style.display = 'none';
        newPasswordError.style.display = 'block';
        chk1 = 0;
        button.style.display = 'none;'
    }
    if (newPassword.value === "") {
        newPassword.style.borderColor = 'lightgray';
        newPasswordIcon1.style.display = 'none';
        newPasswordIcon2.style.display = 'none';
        newPasswordError.style.display = 'none';
        chk1 = 0;
        button.style.display = 'none;'
    }
    if (chk1 === 1 && chk2 === 1) {
        button.style.display = 'block';
    }
}

function check3() {
    if (confirmPassword.value === newPassword.value) {
        confirmPassword.style.borderColor = '#27ae60';
        confirmPasswordIcon1.style.display = 'none';
        confirmPasswordIcon2.style.display = 'block';
        confirmPasswordError.style.display = 'none';
        chk2 = 1;
        button.style.display = 'none;'
    } else {
        confirmPassword.style.borderColor = '#e74c3c';
        confirmPasswordIcon1.style.display = 'block';
        confirmPasswordIcon2.style.display = 'none';
        confirmPasswordError.style.display = 'block';
        chk2 = 0;
        button.style.display = 'none;'
    }
    if (confirmPassword.value === "") {
        confirmPassword.style.borderColor = 'lightgray';
        confirmPasswordIcon1.style.display = 'none';
        confirmPasswordIcon2.style.display = 'none';
        confirmPasswordError.style.display = 'none';
        chk2 = 0;
        button.style.display = 'none;'
    }
    if (chk1 === 1 && chk2 === 1) {
        button.style.display = 'block';
    }
}
// const url = "http://localhost:8000";
const url = "https://evening-earth-85816.herokuapp.com";
button.addEventListener('click', () => {
    let data = {
        "password": `${newPassword.value}`,
    }
    data = JSON.stringify(data);
    fetch(`${url}/auth/resetPassword`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${userToken}`,
        },
        body: data,
    }).then(res =>
        res.json()
    ).then(data => {
        if (data.message === "Invalid Password") {
            password.style.borderColor = '#e74c3c';
            passwordIcon1.style.display = 'block';
            passwordIcon2.style.display = 'none';
            passwordError.style.display = 'block';
            enterPassword.style.display = 'none';
            return;
        } else {
            alert(data.message);
            location.replace("https://dreamy-carson-5588a8.netlify.app/index.html");
        }

    }).catch(err => {
        console.log(err.message);
    })
})