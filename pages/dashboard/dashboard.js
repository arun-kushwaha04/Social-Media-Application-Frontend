//url 
const url = "http://localhost:8000";
//message showing
const messageContainer = document.querySelector('.message-container');

const myProfile = document.querySelector(".profile-photo-feed");
myProfile.addEventListener("click", () => {
    location.href = "/pages/profile/index.html"
})

const game = document.querySelector(".game");
const video = document.querySelector(".video");
game.addEventListener("click", () => {
    location.href = "https://www.freeonlinegames.com/"
})

video.addEventListener("click", () => {
    location.href = "https://www.youtube.com/feed/trending"
})

let firebaseConfig;
window.onload = () => {
    fetchCredentials();
    getUserNotes();
    getFollowing();
}

//a function to fetch firebase credentials from backend
async function fetchCredentials() {
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
const rightSection = document.querySelector('.right-section');
const hamburgerButton = document.querySelector('.hamburger');

hamburgerButton.addEventListener('click', () => {
    rightSection.classList.toggle('open');
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
                imageToUpload.splice(event.target.id, 1);
                console.log(imageToUpload);
                counter--;
                if (counter <= 3) {
                    imageSelector.style.display = 'block';
                }
                if (counter === 0) {
                    uploadButton.style.display = 'none';
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
            image.style.padding = '1rem';
            container.appendChild(image);
            container.appendChild(closeImageDiv);
            preview.appendChild(container);
        }
    }
    if (counter > 3) {
        imageSelector.style.display = 'none';
        return;
    }
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
    const divContainer = document.createElement("div");
    const div = document.createElement("div");
    div.classList = "Posts";
    div.setAttribute('id', element.postid);
    isLiked(element, div, container, divContainer);
}

//isPostLiked
function isLiked(element, div, container, divContainer) {
    let userData = {
        postid: element.postid
    }
    let html;
    userData = JSON.stringify(userData);
    fetch(`${url}/feed/isLiked`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        }).then(res => res.json())
        .then(data => {
            if (data.message === 'Post Is Liked') {
                html = ` <i class="fas fa-heart crazy-button" onClick = "updateLike(event)"></i><span class="likes">${element.postlikes}</span>`;
            } else if (data.message === 'Post Is Not Liked') {
                html = ` <i class="far fa-heart crazy-button" onClick = "updateLike(event)"></i><span class="likes">${element.postlikes}</span>`;
            } else {
                message.textContent = 'Internal Server Error';
            }
            if (html) {
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
                        <div class="engageButtons" id = ${element.originaluserid}>
                            <div class="like-button" id = ${element.userid}>
                            ${html}
                            </div>
                            <div class="comment-button" id = ${element.userid}>
                                <i class="far fa-comment-alt crazy-button" onClick = "openCommentSection(event)"></i>
                                <span class="comments">${element.postcomments}</span>
                            </div>
                            <div class="share-button" id = ${element.userid}>
                                <img src="../../assets/Share.svg" class="crazy-button" />
                                <span class="share">${element.postshare}</span>
                            </div>
                        </div>
                    </div>                                                                    
                    `;
                const div2 = document.createElement('div');
                div2.classList.add('comment-section');
                div2.innerHTML = `<div class="add-comment">
                    <input class="comment-input" type="text" placeholder="Add Comment">
                    <i class="fas fa-paper-plane add-comment-button" onClick = "commentButtonClick(event)"></i>
                    </div>
                    `
                divContainer.appendChild(div);
                divContainer.appendChild(div2);
                container.appendChild(divContainer);
                addPostImage(element.images, element.postid);
            }
        })
        .catch(err => {
            console.log(err);
            // message.textContent = 'Unable To Load Post'
        })


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

//follower list

async function getFollowing() {
    try {
        const res = await fetch(`${url}/friend/getFollowing`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            console.log(data.follower);
            renderFollowingList(data.follower);
            //apend the mesagge
        } else {
            //error handling
        }
    } catch (error) {
        //error handling
    }
}
const table = document.querySelector('.users-table');

function renderFollowingList(following) {
    following.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = `
            <img src="${element.profilephoto}" class="profile-photo" id="${element.following}" onClick = "profilePage(event)"/>
            <span>${element.followingrusername}</span>
            <div class="follow-btn"><i class="fas fa-user-minus"></i></div>
        `;
        table.appendChild(div);
    })
}

function profilePage(event) {
    const id = event.target.id;
    // location.href = profile url
}


//update like

async function updateLike(event) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('confirmation-message');
    messageDiv.innerHTML = `
        <div class="icon1"><i class="fas fa-exclamation"></i></div>
        <div class="icon2"><i class="fas fa-check"></i></div>
        <div class="request-message">Connecting To Server ...</div>`;
    messageContainer.appendChild(messageDiv);
    messageDiv.style.opacity = '1';
    const message = messageDiv.children[2];
    const success = messageDiv.children[1];
    const error = messageDiv.children[0];
    const userid = event.target.parentNode.id;
    const originaluserid = event.target.parentNode.parentNode.id;
    const postid = event.target.parentElement.parentElement.parentElement.parentElement.id;
    const likes = (event.target.nextSibling);
    let userData = {
        userid,
        originaluserid,
        postid,
    }
    console.log(userData);
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/feed/updateLike`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            if (data.value === 1) {
                console.log('liked');
                likes.innerHTML = parseInt(likes.innerHTML) + 1;
                event.target.classList.add('fas');
                event.target.classList.remove('far');
            } else {
                console.log('not liked');
                likes.innerHTML = parseInt(likes.innerHTML) - 1;
                event.target.classList.add('far');
                event.target.classList.remove('fas');
            }
            messageDiv.removeChild(error);
            message.textContent = data.message;
            success.style.opacity = 1;
        } else {
            message.textContent = 'Internal Server Error';
            error.style.display = 'block';
        }
    } catch (error) {
        messageDiv.removeChild(success);
        message.textContent = 'Server Down';
        error.style.opacity = 1;
        console.log(error);
    }

    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
}

//opening and closing the comment section

function openCommentSection(event) {
    const commentSection = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1];
    while (commentSection.children.length > 1) {
        commentSection.removeChild(commentSection.children[0]);
    }
    commentSection.classList.toggle('comment-section-open');
    commentSection.parentElement.children[0].classList.toggle('Posts-open');
    const postid = event.target.parentElement.parentElement.parentElement.parentElement.id;
    let userData = {
        postid,
    }
    userData = JSON.stringify(userData);
    getAllComment(commentSection, userData)
}

//adding the comment

function commentButtonClick(event) {
    //message div 
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('confirmation-message');
    messageDiv.innerHTML = `
        <div class="icon1"><i class="fas fa-exclamation"></i></div>
        <div class="icon2"><i class="fas fa-check"></i></div>
        <div class="request-message">Connecting To Server ...</div>`;
    messageContainer.appendChild(messageDiv);
    messageDiv.style.opacity = '1';
    const message = messageDiv.children[2];
    const success = messageDiv.children[1];
    const error = messageDiv.children[0];

    //selecting the comment button
    const commentText = event.target.parentElement.children[0];
    let text = commentText.value;
    if (text === "") {
        messageDiv.removeChild(success);
        message.textContent = 'Please Enter Comment Message';
        error.style.opacity = 1;
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageContainer.removeChild(messageDiv);
        }, 2000);
        return;
    } else if (text.length > 40) {
        messageDiv.removeChild(success);
        message.textContent = '40 Characters At Max In Comment Message';
        error.style.opacity = 1;
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageContainer.removeChild(messageDiv);
        }, 2000);
        return;
    } else {
        messageContainer.removeChild(messageDiv);
        const postid = event.target.parentNode.parentNode.parentNode.children[0].id;
        const originaluserid = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[2].id;
        const commentCounter = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[2].children[1].children[1];
        const comment = text;
        //current date and time
        let today = new Date();
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        const profilePhoto = localStorage.getItem("profilePhoto");

        let userData = {
            postid,
            originaluserid,
            comment,
            dateTime,
            profilePhoto,
        }
        userData = JSON.stringify(userData);
        console.log(userData);
        addComment(userData, commentCounter, commentText);
    }
}

//function for adding the comment

async function addComment(userData, commentCounter, commentText) {
    //message div 
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('confirmation-message');
    messageDiv.innerHTML = `
        <div class="icon1"><i class="fas fa-exclamation"></i></div>
        <div class="icon2"><i class="fas fa-check"></i></div>
        <div class="request-message">Connecting To Server ...</div>`;
    messageContainer.appendChild(messageDiv);
    messageDiv.style.opacity = '1';
    const message = messageDiv.children[2];
    const success = messageDiv.children[1];
    const error = messageDiv.children[0];
    try {
        const res = await fetch(`${url}/feed/commentPost`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            commentCounter.innerHTML = parseInt(commentCounter.innerHTML) + 1;
            commentText.value = "";
            messageDiv.removeChild(error);
            message.textContent = data.message;
            success.style.opacity = 1;
        } else {
            messageDiv.removeChild(success);
            message.textContent = 'Internal Server Error';
            error.style.opacity = 1;
        }
    } catch (error) {
        console.log(error);
        messageDiv.removeChild(success);
        message.textContent = 'Server Down';
        message.style.opacity = 1;
    }
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
}

//populating a the comments of a post
async function getAllComment(commentSection, userData) {
    const res = await fetch(`${url}/feed/getAllPostComment`, {
        method: "POST",
        body: userData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("userToken")}`,
        },
    });

    if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        for (let i = 0; i < data.comment.length; i++) {
            const comment = data.comment[i];
            const div = document.createElement('div');
            div.classList.add('comment');
            div.innerHTML = `
            <div class="comment">
                <img class="profile-photo" src="${comment.profilephoto}" />
                <div class="comment-box">
                <div class="comment-details">
                    <div class="comment-user-name">${comment.username}</div>
                    <div class="comment-message">${comment.comment}</div>
                </div>
                <div class="time">${comment.datetime}</div>
                </div>                    
            </div>`;
            commentSection.prepend(div);
        }

    } else {
        console.log('error');
    }

}