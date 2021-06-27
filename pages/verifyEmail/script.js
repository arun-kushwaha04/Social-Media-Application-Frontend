const heading = document.querySelector('.heading');
const resend = document.querySelector('.btn');

const currUrl = new URLSearchParams(window.location.search);
const userToken = currUrl.get("userToken");
const email = currUrl.get("email");


// const url = "https://evening-earth-85816.herokuapp.com";
const url = "http://localhost:8000";
//fortend url
// const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
const frontendUrl = `http://localhost:5500`;

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
            setTimeout(() => { location.replace(`${frontendUrl}/index.html`) }, 2000);
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
    const res = fetch(`${url}/auth/resendVerificationLink`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: userData,
    });
    const data = await res.json();
    verifyEmail(email, data.domain, data.key, data.userToken);
}

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
            heading.textContent = 'Verification Mail Sent';
            resend.style.display = 'none';
        }
    } catch (err) {
        console.log(err);
        heading.textContent = 'Error In Sending Mail';
        // setTimeout(() => { location.reload(); }, 10000);
    };
}