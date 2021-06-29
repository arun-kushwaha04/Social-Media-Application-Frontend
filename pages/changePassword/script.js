const url = "https://sheltered-citadel-84490.herokuapp.com";
// const url = "http://localhost:8000";

//fortend url
const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
// const frontendUrl = `http://localhost:5500`;

const form = document.querySelector('.form');
const newPassword = document.querySelector('.newPassword');
const confirmPassword = document.querySelector('.confirmPassword');
const newPasswordIcon1 = document.querySelector('.newPassword-icon1');
const newPasswordIcon2 = document.querySelector('.newPassword-icon2');
const confirmPasswordIcon1 = document.querySelector('.confirmPassword-icon1');
const confirmPasswordIcon2 = document.querySelector('.confirmPassword-icon2');
const newPasswordError = document.querySelector('.newPassword-error');
const confirmPasswordError = document.querySelector('.confirmPassword-error');
const button = document.querySelector('.btn');
const heading = document.querySelector('.heading');
const resend = document.querySelector('.resend');

const currUrl = new URLSearchParams(window.location.search);
const userToken = currUrl.get("userToken");
const email = currUrl.get("email");


const heading = document.querySelector('.heading');
const resend = document.querySelector('.resend');

window.addEventListener('load', () => {
    let userData = {
        "email": email
    }
    userData = JSON.stringify(userData);
    fetch(`${url}/auth/verifyEmail`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${userToken}`,
        },
        body: userData,
    }).then(res =>
        res.json()
    ).then(data => {
        heading.textContent = data.message;
        if (data.message === 'Email Verified Succesfully, Would Be Directed To Login Page Shortly.') {
            heading.textContent = 'Reset Password';
            form.style.display = 'block'
        } else {
            resend.style.display = 'block';
        }
    }).catch(err => {
        heading.textContent = 'Server Down';
        resend.style.display = 'block';
        console.log(err.message);
    })
})

resend.addEventListener('click', () => resendEmail());

async function resendEmail() {
    let userData = {
        "email": email
    }
    userData = JSON.stringify(userData);
    const res = await fetch(`${url}/auth/resendVerificationLink`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: userData,
    });
    const data = await res.json();
    forgotPasswordEmail(email, data.domain, data.key, data.userToken);
}


async function forgotPasswordEmail(email, domain, key, userToken) {
    try {
        const message = await Email.send({
                Host: "smtp.gmail.com",
                Username: `${domain}`,
                Password: `${key}`,
                EnableSsl: true,
                To: `${email}`,
                From: "noReply@Dubify.com",
                Subject: "RESET PASSWORD",
                Body: `
            <p>Someone (hopefully you) has requested a password reset for your Note-Maker account. Follow the link below to set a new password:</p>
            <h1>Click on Below Link To Reset Your Password.</h1>
            <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
            <a href="${frontendUrl}/Pages/changePassword/index.html?userToken=${userToken}&email=${email}" target="_blank">Reset Password</a>
            <p>Team dubify</p>
        `,
            })
            //displaying the send message
        if (message) {
            console.log('mail sent successfully');
            heading.textContent = 'Verification Mail Sent';
            resend.style.display = 'none';
        }
    } catch (err) {
        console.log(err);
        //displaying error
        heading.textContent = 'Error In Sending Mail';
        // setTimeout(() => { location.reload(); }, 10000);
    };
}


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
            location.replace(`${frontendUrl}/index.html`);
        }

    }).catch(err => {
        console.log(err.message);
    })
})