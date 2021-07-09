const url = "https://sheltered-citadel-84490.herokuapp.com";
// const url = "http://localhost:8000";

//fortend url
const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
// const frontendUrl = `http://localhost:5500`;


//selcting all the elements to be manipulated
const form = document.querySelector('body');
const heading = document.querySelector('.heading');
const namea = document.querySelector('.name');
const password = document.querySelector('.password');
const nameIcon1 = document.querySelector('.name-icon1');
const nameIcon2 = document.querySelector('.name-icon2');
const passwordIcon1 = document.querySelector('.password-icon1');
const passwordIcon2 = document.querySelector('.password-icon2');
const nameError = document.querySelector('.name-error');
const passwordError = document.querySelector('.password-error');
const enterPassword = document.querySelector('.error-text');
const button = document.querySelector('.btn');

function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k === 32) return false;
}

//function for checking correct name input
function check() {
    if (namea.value.length <= 20) {
        namea.style.borderColor = '#27ae60';
        nameIcon1.style.display = 'none';
        nameIcon2.style.display = 'block';
        nameError.style.display = 'none';
    } else {
        namea.style.borderColor = '#e74c3c';
        nameIcon1.style.display = 'block';
        nameIcon2.style.display = 'none';
        nameError.style.display = 'block';
    }
    if (namea.value === "") {
        namea.style.borderColor = 'lightgray';
        nameIcon1.style.display = 'none';
        nameIcon2.style.display = 'none';
        nameError.style.display = 'none';
    }
}

//function for reseting password field
function check2() {
    if (password.value !== "") {
        password.style.borderColor = 'lightgray';
        passwordIcon1.style.display = 'none';
        passwordIcon2.style.display = 'none';
        passwordError.style.display = 'none';
        enterPassword.style.display = 'none';
    }
}


button.addEventListener('click', async() => {

    //checking if name is empty
    if (namea.value === "") {
        namea.style.borderColor = '#e74c3c';
        nameIcon1.style.display = 'block';
        nameIcon2.style.display = 'none';
        nameError.style.display = 'block';
        return;
    }

    //checking if password is empty 
    if (password.value === "") {
        password.style.borderColor = '#e74c3c';
        passwordIcon1.style.display = 'block';
        passwordIcon2.style.display = 'none';
        enterPassword.style.display = 'block';
        return;
    }

    //converting the name to capital letter
    let temp = namea.value;
    temp.toLowerCase();
    temp = temp.charAt(0).toUpperCase() + temp.slice(1);
    namea.value = temp;

    //forming data to be send to backend
    let data = {
        "name": `${namea.value}`,
        "password": `${password.value}`,
    }
    data = JSON.stringify(data);

    try {
        const res = await fetch(`${url}/user/updateName`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
            body: data,
        })
        if (res.status === 200) {
            const data = await res.json();
            console.log('hi');
            heading.innerHTML = 'Name Updated';
            localStorage.setItem("userToken", data.userToken);
            namea.style.display = 'none';
            password.style.display = 'none';
            nameIcon1.style.display = 'none';
            nameIcon2.style.display = 'none';
            passwordIcon1.style.display = 'none';
            passwordIcon2.style.display = 'none';
            nameError.style.display = 'none';
            passwordError.style.display = 'none';
            enterPassword.style.display = 'none';
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
})
console.log = function() {}