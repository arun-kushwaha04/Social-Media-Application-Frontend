//url 
const url = "http://localhost:8000";

let firebaseConfig;
window.onload = () => {
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
const containerForPost = document.querySelector('.container-for-post');
const loadingEffect = document.querySelector('.loading-effect');
const loader = document.querySelector('.loader');
let counter = 0;
let imageToUpload = [];
let imageUrl = [];

imageButton.addEventListener('change', (event) => {
    imageToUpload.push(event.target.files[0]);
    updateImageDisplay();
})


// showing post and hiding the post button

const postButton = document.querySelector('.post-button');
const uploadButton = document.querySelector('.upload-button');
const feedText = document.querySelector('.feed-text');
let checker = 0;

feedText.addEventListener('input', () => {

    if (feedText.value === "") {
        postButton.style.display = 'none';
        uploadButton.style.display = 'none';
    } else if (feedText.value !== "" && counter > 0) {
        if (checker) {
            postButton.style.display = 'block';
            uploadButton.style.display = 'none';
        } else {
            postButton.style.display = 'none';
            uploadButton.style.display = 'block';
        }
    } else if (feedText.value !== "" && counter === 0) {
        postButton.style.display = 'block';
        uploadButton.style.display = 'none';
    }
})



function updateImageDisplay() {
    const curFiles = imageButton.files;
    if (curFiles.length !== 0 && counter < 5) {
        uploadButton.style.display = 'block';
        postButton.style.display = 'none';
        counter++;
        imageSelector.style.display = 'block';
        for (const file of curFiles) {
            // para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            const container = document.createElement('div');
            container.classList.add('post-image-container');
            const closeImageDiv = document.createElement('div');
            closeImageDiv.classList.add('close-image');
            closeImageDiv.onclick = function(event) {
                const parent = this.parentElement;
                this.parentElement.parentElement.removeChild(parent);
                console.log(event.target.id);
                console.log(imageToUpload);
                imageToUpload.splice(event.target.id, 1);
                console.log(imageToUpload);
                counter--;
                if (counter <= 3) {
                    imageSelector.style.display = 'block';
                }
                if (counter === 0) {
                    imageSelector.style.display = 'none';
                }
            };
            const closeImage = document.createElement('img');
            closeImage.src = '../../assets/close.svg';
            closeImage.setAttribute('id', `${counter-1}`);
            closeImage.classList.add('profile-photo-close');
            closeImage.classList.add('image-photo-close');
            closeImageDiv.appendChild(closeImage);
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.classList.add('feed-image');
            // image.style.padding = '1rem';
            container.appendChild(image);
            container.appendChild(closeImageDiv);
            preview.appendChild(container);
        }
    }
    if (counter > 3) {
        console.log('hi');
        imageSelector.style.display = 'none';
        return;
    }
}

function remove(id) {
    console.log(id);
}

//upload image to firebase storage then add th post to the database

postButton.addEventListener('click', () => {
    if (checker === 1) addPost();
    else {
        alert('First upload the image');
    }
});

uploadButton.addEventListener('click', () => {
    uploadImageToFirebase();
})

function uploadImageToFirebase() {
    containerForPost.style.display = 'none';
    loadingEffect.style.display = 'block';
    for (let i = 0; i < imageToUpload.length; i++) {
        const element = imageToUpload[i];
        const refVar = firebase.storage().ref('feeds/' + element.name);
        let task = refVar.put(element);
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                loader.value = percentage;
                console.log(percentage);
            },
            function error(err) {
                console.log(err);
            },
            function complete() {
                task.snapshot.ref.getDownloadURL()
                    .then(
                        function(downloadURL) {
                            //we got the url of the image 
                            imageUrl.push(downloadURL);
                        });
                containerForPost.style.display = 'block';
                loadingEffect.style.display = 'none';
                console.log(imageUrl);
            }
        )
    }
    checker = 1;
    postButton.style.display = 'block';
    uploadButton.style.display = 'none';
}



async function getUserNotes() {
    try {
        const res = await fetch(`${url}/feed/getFollowingPosts`, {
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
    } catch (e) {
        console.log(e);
        //error handling done
    }

}

//showing user image

const profilePhotoFeed = document.querySelector('.profile-photo-feed');
const profilePhotoFeedInsert = document.querySelector('.profile-photo-feed-insert');
const userNameFeed = document.querySelector('.user-name-feed');
profilePhotoFeed.src = localStorage.getItem("profilePhoto");
profilePhotoFeedInsert.src = localStorage.getItem("profilePhoto");
userNameFeed.textContent = localStorage.getItem("username");
//function to populate the post
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

//showing each post image to the user
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



//adding notes to the server
async function addPost() {
    containerForPost.style.display = 'block';
    loadingEffect.style.display = 'none';
    addFeed.style.visibility = 'hidden';
    console.log(imageUrl);
    let userData = {
        image: imageUrl,
        description: feedText.value,
        profilePhoto: localStorage.getItem("profilePhoto"),
    }
    console.log(userData);
    userData = JSON.stringify(userData);
    console.log(userData);
    imageToUpload = [];
    imageUrl = [];
    try {
        const res = await fetch(`${url}/feed/addPost`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            if (data.message === 'Post Created') {
                //inform the user oabout this
            } else {
                //error handling to be done
            }
        }
    } catch (error) {
        console.log(error);
    }
}