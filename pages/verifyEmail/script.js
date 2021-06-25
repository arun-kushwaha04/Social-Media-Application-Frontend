const heading = document.querySelector('.heading');

const currUrl = new URLSearchParams(window.location.search);
const userToken = currUrl.get("userToken");
const email = currUrl.get("email");


const url = "https://evening-earth-85816.herokuapp.com";
// const url = "http://localhost:8000";
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
        if (data.message === 'Email Verified Successfully !!') {
            setTimeout(() => { location.replace('https://dreamy-carson-5588a8.netlify.app') }, 2000);
        }
    }).catch(err => {
        console.log(err.message);
    })
})