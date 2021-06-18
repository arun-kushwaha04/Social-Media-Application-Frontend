//url 
const url = "http://localhost:8000";

const myProfile = document.querySelector(".profile-photo-feed");
myProfile.addEventListener("click",()=>{
    location.href = "/pages/profile/index.html"
})

let firebaseConfig;
window.onload = () => {
    // fetch(`${url}/uploadImage/addFeed`)
    //     .then(res =>
    //         res.json()
    //     )
    //     .then(data => {
    //         firebaseConfig = data.firebaseConfig;
    //         firebase.initializeApp(firebaseConfig);
    //         console.log(data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    fetchCredentials();
    getUserNotes();
}

//a function to fetch firebase credentials from backend
async function fetchCredentials() {
    console.log("hi");
    const response = await fetch(`${url}/uploadImage/addFeed`, {
        method: "GET",
    });
    const credentials = await response.json();
    if (response.ok) {
        firebaseConfig = credentials.firebaseConfig;
        firebase.initializeApp(firebaseConfig);
    } else {
        return Promise.reject(response);
    }
}



const body = document.querySelector('body');

const like = document.querySelector('.like-button');
const comment = document.querySelector('.comment-button');
const share = document.querySelector('.share-button');
let likesCount = 0;

//hamburger
const leftSection = document.querySelector('.right-section');
const hamburgerButton = document.querySelector('.hamburger');

hamburgerButton.addEventListener('click',()=>{
    leftSection.classList.toggle("open");
})


const search = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

search.addEventListener('focusin', () => {
    searchIcon.style.visibility = 'hidden';
    searchInput.style.paddingLeft = '1rem';
});
search.addEventListener('focusout', () => {
    searchIcon.style.visibility = 'visible';
    searchInput.style.paddingLeft = '2.5rem';
});




//implementing the add feed logic

const feedInput = document.querySelector('.feed-input');
const addFeed = document.querySelector('.add-feed-after-click');
const closeAddFeed = document.querySelector('.close-feed');
const addPhoto = document.querySelector('.add-photo-feed');

feedInput.addEventListener('click', () => {
    addFeed.style.visibility = 'visible';
    body.style.overflowY = 'hidden';
    addFeed.scrollIntoView();
})

addPhoto.addEventListener('click', () => {
    addFeed.style.visibility = 'visible';
    body.style.overflowY = 'hidden';
    addFeed.scrollIntoView();
})

closeAddFeed.addEventListener('click', () => {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }
    counter = 0;
    body.style.overflowY = 'scroll';
    addFeed.style.visibility = 'hidden';
})

//selecting image from the system 

const imageButton = document.querySelector('#img');
const imageSelector = document.querySelector('.image-selector');
const preview = document.querySelector('.preview');
let counter = 0;
let imageToUpload = [];
let imageUrl = [];

imageButton.addEventListener('change', (event) => {
    imageToUpload.push(event.target.files[0]);
    // console.log(JSON.parse(event.target.files[0]))
    updateImageDisplay();
})


// showing post and hiding the post button

const postButton = document.querySelector('.post-button');
const feedText = document.querySelector('.feed-text');

feedText.addEventListener('input', () => {
    if (feedText.value === "") {
        postButton.style.display = 'none';
    } else {
        postButton.style.display = 'block';
    }
})



function updateImageDisplay() {
    const curFiles = imageButton.files;
    if (curFiles.length !== 0 && counter < 5) {
        counter++;
        imageSelector.style.display = 'block';
        for (const file of curFiles) {
            // para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            const container = document.createElement('div');
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.classList.add('feed-image');
            // image.style.padding = '1rem';
            container.appendChild(image);
            preview.appendChild(container);

        }
    }
    if (counter > 3) {
        console.log('hi');
        imageSelector.style.display = 'none';
        return;
    }
}

//upload image to firebase storage

const uploadFeed = document.querySelector('.post-button');

uploadFeed.addEventListener('click', () => {
    imageToUpload.forEach(element => {
        const refVar = firebase.storage().ref('feeds/' + element.name);

        let task = refVar.put(element);

        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            },
            function error(err) {
                console.log(err);
            },
            function complete() {
                console.log(task);
                console.log('File uploded');
                task.snapshot.ref.getDownloadURL()
                    .then(
                        function(downloadURL) {
                            //we got the url of the image 
                            imageUrl.push(downloadURL);
                        });
                console.log(imageUrl);
            }
        )
    });
})

async function getUserNotes() {
    const res = await fetch(`${url}/feed/getUserPost`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("userToken")}`,
        },
    });
    if (res.status === 200) {
        const data = await res.json();
        //we have to load the post of user.
        const post = data.post;
        console.log(post);
        post.forEach(element => {
            addUserPost(element);
        })



    } else {
        const data = await res.json();
        //show the error of from the response.

    }

}

//fuction to populate the post
function addUserPost(element) {
    const container = document.querySelector('.user-posts');
    const div = document.createElement("div");
    div.classList = "Posts";
    div.innerHTML = `
        <header class="post-user-info">
                            <img class="profile-photo-feed-insert" src="${element.profilephoto}" />
                            <div class="user-name-feed">${element.userusername}</div>
                        </header>
                        <div class="content">
                            <p>
                                ${element.description}
                            </p>
                            <div class="preview" id="preview${element.postid}">

                            </div>
                            <div class="engageButtons">
                                <div class="like-button" id = ${element.postid}>
                                    <img src="../../assets/LikeButton.svg" class="crazy-button" />
                                    <span class="likes">${element.postlikes}</span>
                                </div>
                                <div class="comment-button" id = ${element.postid}>
                                    <img src="../../assets/Comment.svg" class="crazy-button" />
                                    <span class="comments">${element.postcomments}</span>
                                </div>
                                <div class="share-button" id = ${element.postid}>
                                    <img src="../../assets/Share.svg" class="crazy-button" />
                                    <span class="share">${element.postshare}</span>
                                </div>
                            </div>
                        </div>
        `;
    container.appendChild(div);
    addPostImage(element.images, element.postid);
}


function addPostImage(ImageArray, postId) {
    const id = `preview${postId}`;
    const preview = document.querySelector(`#${id}`);
    ImageArray.forEach(element => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.classList.add('feed-image');
        img.src = element;
        div.appendChild(img);
        preview.appendChild(div);
    })
}