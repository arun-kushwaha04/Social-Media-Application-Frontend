const url = "https://sheltered-citadel-84490.herokuapp.com";
// const url = "http://localhost:8000";

//fortend url
const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
// const frontendUrl = `http://localhost:5500`;

const register = document.querySelector(".register");
//changing sign and login page

const toLogin = document.querySelector('.toLogin');
const toSignUp = document.querySelector('.toSignUp');
const loginPage = document.querySelector('#login');
const signupPage = document.querySelector('#signup');

toLogin.addEventListener('click', () => {
    console.log('hi');
    signupPage.style.display = 'none';
    loginPage.style.display = 'block';
});

toSignUp.addEventListener('click', () => {
    signupPage.style.display = 'block';
    loginPage.style.display = 'none';
})



//username

const username = document.querySelector('.username');
const usernameIcon1 = document.querySelector('.username-icon1');
const usernameIcon2 = document.querySelector('.username-icon2');
const usernameError = document.querySelector('.username-error');
let chk1 = 0;

function check1() {
    if (username.value.length <= 10 && username.value[0] !== ' ') {
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
    if (_name.value.length <= 20 && _name.value[0] !== ' ') {
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

//LOGIN

const email = document.querySelector('.email');
const password = document.querySelector('.password');
const emailError = document.querySelector('.email-error');
const emailIcon1 = document.querySelector('.email-icon1');
const emailIcon2 = document.querySelector('.email-icon2');
const passwordIcon1 = document.querySelector('.password-icon1');
const passwordIcon2 = document.querySelector('.password-icon2');
const passwordError = document.querySelector('.password-error');
const login = document.querySelector('.login');

function check6() {
    if (email.value != "" && password.value != "") login.style.display = 'block';
    else login.style.display = 'none';
}

//get request at sign up route

register.addEventListener('click', () => {
    if (chk1 !== 1 && chk2 !== 1 && chk3 !== 1 && chk4 !== 1 && chk5 !== 1) {
        return;
    }
    let userData = {
        username: username.value,
        name: _name.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
    }
    userData = JSON.stringify(userData);
    registerUser(userData, signUpEmail.value);
})

//get request at login route

login.addEventListener('click', (event) => {
    event.preventDefault();
    let userData = {
        email: email.value,
        password: password.value,
    }
    userData = JSON.stringify(userData);
    loginUser(userData);
})

//forgot password button 
const forgotPasswordButton = document.querySelector('.forgetPassword');

forgotPasswordButton.addEventListener('click', () => {
    if (email.value === "") { return; }
    let userData = {
        email: email.value,
    }
    userData = JSON.stringify(userData);
    forgotPassword(userData, email.value);
})


//registering the user
const registerUser = async(userData, email) => {
    try {
        const res = await fetch(`${url}/auth/signUp`, {
            method: 'POST',
            body: userData,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            verifyEmail(email, data.domain, data.key, data.userToken);
            console.log(data);

        }
    } catch (err) {
        console.log(err);
    }
}

//logging in the user
async function loginUser(userData) {
    try {
        const res = await fetch(`${url}/auth/login`, {
            method: 'POST',
            body: userData,
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data.message === 'Internal Server Error Please Try Again') {
            //network error to be shown here
            alert('Error');
        } else if (data.message === 'Please Verify Your Email') {
            emailIcon1.style.display = 'block';
            emailError.textContent = 'Email Not Verified';
            emailError.style.display = 'block';
        } else if (data.message === 'You Are Logged In Other Device Please Log Out') {
            //error to be show when the user is already logged in
            emailIcon1.style.display = 'block';
            emailError.textContent = 'Logged In Ohter Device Please Log Out';
            emailError.style.display = 'block';
        } else if (data.message === 'Invalid Password') {
            passwordIcon1.style.display = 'block';
            passwordError.textContent = 'Invalid Password';
            passwordError.style.display = 'block';
        } else if (data.message === 'No Such User Exists Try Registering Yourself') {
            //error to be shown when user is not registered
        } else {
            localStorage.setItem("userToken", data.userToken);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("username", data.username);
            localStorage.setItem("profilePhoto", data.profilePhoto);
            localStorage.setItem("theme", 0);
            console.log(data);
            location.replace("./pages/dashboard/dashboard.html");
        }
    } catch (err) {
        console.log(err);
        //Error to be shown of server down
    }
}

//forgot password routes
const forgotPassword = async(userData, email) => {
    try {
        const res = await fetch(`${url}/auth/forgotPassword`, {
            method: 'POST',
            body: userData,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            forgotPasswordEmail(email, data.domain, data.key, data.userToken);
            console.log(data);

        }
    } catch (err) {
        console.log(err);
    }
}

//SMTP structure for forgotPassword email
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
        }
    } catch (err) {
        console.log(err);
        //displaying error
        setTimeout(() => { location.reload(); }, 10000);
    };
}

//SMTP structure for verifyuser email
async function verifyEmail(email, domain, key, userToken) {
    try {
        const message = await Email.send({
                Host: "smtp.gmail.com",
                Username: `${domain}`,
                Password: `${key}`,
                To: `${email}`,
                From: "noReply@Dubify.com",
                Subject: "Verify Email",
                Body: `
            <p>Thanks for signing up with Dubify You must follow this link to activate your account:</p>
            <h1>Click on Below Link To Verify Your Mail.</h1>
            <a href="${frontendUrl}/Pages/verifyEmail/index.html?userToken=${userToken}&email=${email}" target="_blank">Verify Email</a>
            <p>Have fun, and don't hesitate to contact US with your feedback..</p>
            <p>Team Dubify</p>
        `,
            })
            //handling the errors
        if (message) {
            console.log('mail sent successfully');
        }
    } catch (err) {
        console.log(err);
        //displaying the error
        setTimeout(() => { location.reload(); }, 10000);
    };
}