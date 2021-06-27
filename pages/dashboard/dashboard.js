//url 
// const url = "https://sheltered-citadel-84490.herokuapp.com";
const url = "http://localhost:8000";

//fortend url
// const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
const frontendUrl = `http://localhost:5500`;

//message showing
const messageContainer = document.querySelector('.message-container');

let theme = localStorage.getItem("theme");
let users;
let firebaseConfig;


window.onload = () => {
    getUserList();
    fetchCredentials();
    getUserPosts();
    getFollowing();
    getSuggestionList()
}

console.log(window.innerWidth);

const myProfile = document.querySelector(".profile-photo-feed");
myProfile.addEventListener("click", () => {
    location.href = "/pages/profile/index.html"
})

const sec = document.querySelector(".sec");
const nav2 = document.querySelector(".nav");
const changeThemeButton = document.querySelector(".theme-changer");

changeThemeButton.addEventListener('click', () => themeSlector());

function themeSlector() {
    nav2.style.background = "#0c033a";
    if (theme === 1) {
        localStorage.setItem("theme", 0);
        sec.classList.remove('dark');
        changeThemeButton.innerHTML = ` <img src="../../assets/darkTheme.svg" alt="">`;
        theme = 0;
        nav2.style.borderBottom = "2px solid greenyellow";
        return;
    } else {
        localStorage.setItem("theme", 1);
        sec.classList.add('dark');
        changeThemeButton.innerHTML = ` <img src="../../assets/lightTheme.svg" alt="">`;
        theme = 1;
        nav2.style.borderBottom = "2px solid rgb(251, 122, 201)";
        return;
    }
}

async function getUserList() {
    try {
        const res = await fetch(`${url}/friend/getUserList`);
        const data = await res.json();
        users = data.users
    } catch (error) {
        console.log(error);
    }
}
async function getSuggestionList() {
    try {
        const res = await fetch(`${url}/friend/getSuggestionList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        });
        const data = await res.json();
        const suggestion = data.users;
        console.log(suggestion)
        populateSuggestion(suggestion);
    } catch (error) {
        console.log(error);
    }
}
const suggestionsTable = document.querySelector('.users-table-suggestion')

function populateSuggestion(suggestion) {
    suggestion.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = `
            <a href="${frontendUrl}/pages/profile/index.html?username=${element.username}"><img src="${element.profilephoto}" class="profile-photo" /></a>
            <span><a href="${frontendUrl}/pages/profile/index.html?username=${element.username}">${element.username}</a></span>
            <div class="follow-btn"><i class="fas fa-user-plus" id='${element.id}' onClick = "followUser(event)"></i></div>
        `;
        suggestionsTable.appendChild(div);
    })
}


const game = document.querySelector(".game");
const video = document.querySelector(".video");
game.addEventListener("click", () => {
    location.href = "https://www.freeonlinegames.com/"
})

video.addEventListener("click", () => {
    location.href = "https://www.youtube.com/feed/trending"
})

const profile = document.querySelector('.toProfile');
const profile2 = document.querySelector('.toProfileInFeed');
profile.href = `${frontendUrl}/pages/profile/index.html?username=${localStorage.getItem("username")}`;
profile2.href = `${frontendUrl}/pages/profile/index.html?username=${localStorage.getItem("username")}`;


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
    if (checker === 1 || imageToUpload.length === 0) addPost();
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



async function getUserPosts() {
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
            // await post.sort((a, b) => (a.postid < b.postid) ? 1 : -1);
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

            let originalpostid = element.originalpostid;
            if (originalpostid === null) {
                originalpostid = element.postid;
            }

            if (data.message === 'Post Is Liked') {
                html = ` <i class="fas fa-heart crazy-button" onClick = "updateLike(event)" id=${originalpostid}></i><span class="likes">${element.postlikes}</span>`;
            } else if (data.message === 'Post Is Not Liked') {
                html = ` <i class="far fa-heart crazy-button" onClick = "updateLike(event)" id=${originalpostid}></i><span class="likes">${element.postlikes}</span>`;
            } else {
                message.textContent = 'Internal Server Error';
            }
            let heading = ` <div class="user-name-feed">
                <a href="${frontendUrl}/pages/profile/index.html?username=${element.userusername}">
                ${element.userusername} </a>
                <div class="time">${element.datetime}</div>
            </div>`

            if (element.userid != element.originaluserid) {
                heading = ` <div class="user-name-feed">
                    <a href="${frontendUrl}/pages/profile/index.html?username=${element.userusername}">
                    ${element.userusername}</a>&nbsp; Shared Post Of &nbsp;
                    <a href="${frontendUrl}/pages/profile/index.html?username=${element.originalusername}">
                    ${element.originalusername}</a>
                    <div class="time">${element.datetime}</div>
                </div>`
            }

            if (html) {
                div.innerHTML = `
                    <header class="post-user-info">
                    <a href="${frontendUrl}/pages/profile/index.html?username=${element.userusername}"><img class="profile-photo-feed-insert" src="${element.profilephoto}" /></a>
                        ${heading}
                        
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
                                <i class="far fa-comment-alt crazy-button" onClick = "openCommentSection(event)" id=${originalpostid}></i>
                                <span class="comments">${element.postcomments}</span>
                            </div>
                            <div class="share-button" id = ${element.userid}>
                                <i class="fas fa-share crazy-button" onClick = "sharePostClick(event)" id=${originalpostid}></i>
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
            //message.textContent = 'Unable To Load Post'
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



//adding post to the server
async function addPost() {
    containerForPost.style.display = 'block';
    loadingEffect.style.display = 'none';
    addFeed.style.visibility = 'hidden';

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

    if (feedText.value.length > 40) {
        messageDiv.removeChild(success);
        message.textContent = '40 Characters At Max In Posts';
        error.style.opacity = 1;
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageContainer.removeChild(messageDiv);
        }, 2000);
        return;
    } else {
        //dateTime
        let today = new Date();
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;

        let userData = {
            image: imageUrl,
            description: feedText.value,
            profilePhoto: localStorage.getItem("profilePhoto"),
            dateTime,
        }
        userData = JSON.stringify(userData);
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
                    body.style.overflowY = 'scroll';
                    addFeed.style.visibility = 'hidden';
                    messageDiv.removeChild(error);
                    message.textContent = data.message;
                    success.style.opacity = 1;
                } else {
                    //error handling to be done
                    messageDiv.removeChild(success);
                    message.textContent = 'Internal Server Error';
                    success.style.opacity = 1;
                }
            }
        } catch (error) {
            console.log(error);
            messageDiv.removeChild(success);
            message.textContent = 'Internal Server Error';
            success.style.opacity = 1;
        }
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageContainer.removeChild(messageDiv);
        }, 2000);
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
        console.log(error);
    }
}
const table = document.querySelector('.users-table');

function renderFollowingList(following) {
    following.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = `
            <a href="${frontendUrl}/pages/profile/index.html?username=${element.followingrusername}"><img src="${element.profilephoto}" class="profile-photo" id="${element.following}"/></a>
            <span><a href="${frontendUrl}/pages/profile/index.html?username=${element.followingrusername}">${element.followingrusername}</a></span>
            <div class="follow-btn"><i class="fas fa-user-minus" id='${element.following}' onClick = 'unfollowUser(event)'></i></div>
        `;
        table.appendChild(div);
    })
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
    const originalpostid = event.target.id;
    // console.log(originalpostid);
    let userData = {
        userid,
        originaluserid,
        postid,
        originalpostid,
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
    commentSection.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add('add-comment');
    div.innerHTML = `
    <input class="comment-input" type="text" placeholder="Add Comment">
    <i class="fas fa-paper-plane add-comment-button" onClick = "commentButtonClick(event)"></i>
    </div>`;
    // while (commentSection.children.length > 1) {
    //     console.log(commentSection.children[0]);
    //     commentSection.removeChild(commentSection.children[0]);
    // }
    commentSection.classList.toggle('comment-section-open');
    commentSection.parentElement.children[0].classList.toggle('Posts-open');
    const postid = event.target.parentElement.parentElement.parentElement.parentElement.id;
    const originalpostid = event.target.id;
    console.log(originalpostid);
    let userData = {
        postid,
        originalpostid,
    }
    userData = JSON.stringify(userData);
    getAllComment(commentSection, userData, div);
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
        const originalpostid = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[2].children[1].children[0].id;
        let userData = {
            postid,
            originaluserid,
            comment,
            dateTime,
            profilePhoto,
            originalpostid,
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
async function getAllComment(commentSection, userData, div) {
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
        for (let i = 0; i < data.comment.length; i++) {
            const comment = data.comment[i];
            const div = document.createElement('div');
            div.classList.add('comment');
            div.innerHTML = `
            <div class="comment">
                <a href="${frontendUrl}/pages/profile/index.html?username=${comment.username}"><img class="profile-photo" src="${comment.profilephoto}" /></a>
                <div class="comment-box">
                <div class="comment-details">
                    <div class="comment-user-name"><a href="${frontendUrl}/pages/profile/index.html?username=${comment.username}">${comment.username}</a></div>
                    <div class="comment-message">${comment.comment}</div>
                </div>
                <div class="time">${comment.datetime}</div>
                </div>                    
            </div>`;
            commentSection.prepend(div);
        }
        commentSection.appendChild(div);
    } else {
        console.log('error');
    }
}

//sharing a post 

function sharePostClick(event) {
    const postid = event.target.parentElement.parentElement.parentElement.parentElement.id;
    const shareCounter = event.target.parentNode.children[1];
    const profilephoto = localStorage.getItem("profilePhoto");
    const originaluserid = event.target.parentElement.parentElement.id;
    const originalpostid = event.target.id;
    //current date and time
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;

    let userData = {
        postid,
        profilephoto,
        dateTime,
        originalpostid,
    }
    userData = JSON.stringify(userData);
    console.log(userData);
    // console.log(userData, shareCounter);
    sharePost(userData, shareCounter, originaluserid);
}

async function sharePost(userData, shareCounter, originaluserid) {
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

    const userId = localStorage.getItem("userId")
    console.log(userId);
    if (originaluserid === userId) {
        messageDiv.removeChild(success);
        message.textContent = `You Can't Re-Share Your Own Post`;
        error.style.opacity = 1;
    } else {
        try {
            const res = await fetch(`${url}/feed/sharePost`, {
                method: "POST",
                body: userData,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("userToken")}`,
                },
            });

            if (res.status === 200) {
                const data = await res.json();
                if (data.message === 'You Shared The Post') {
                    shareCounter.innerHTML = parseInt(shareCounter.innerHTML) + 1;
                    messageDiv.removeChild(error);
                    message.textContent = data.message;
                    success.style.opacity = 1;
                } else if (data.message === 'Post Is Already Shared') {
                    messageDiv.removeChild(success);
                    message.textContent = data.message;
                    error.style.opacity = 1;
                }
            } else {
                messageDiv.removeChild(success);
                message.textContent = 'Internal Server Error';
                error.style.opacity = 1;
            }
        } catch (error) {
            console.log(error);
            messageDiv.removeChild(success);
            message.textContent = 'Server Down';
            error.style.opacity = 1;
        }
    }
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);

}

async function followUser(event) {
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


    const following = event.target.id;
    const followingrusername = event.target.parentElement.parentElement.children[1].children[0].innerHTML;
    const user = event.target.parentElement.parentElement;
    let userData = {
        following,
        followingrusername,
    }
    userData = JSON.stringify(userData);

    try {
        const res = await fetch(`${url}/friend/addFollowing`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        })

        if (res.status === 200) {
            const data = await res.json();
            messageDiv.removeChild(error);
            message.textContent = data.message;
            success.style.opacity = 1;
            user.style.display = 'none';
        } else {
            messageDiv.removeChild(success);
            message.textContent = 'Internal Server Error';
            error.style.opacity = 1;
        }
    } catch (error) {
        console.log(error);
        messageDiv.removeChild(success);
        message.textContent = 'Internal Server Error';
        error.style.opacity = 1;
    }
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
}

async function unfollowUser(event) {
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

    const following = event.target.id;
    const user = event.target.parentElement.parentElement;
    const followingrusername = event.target.parentElement.parentElement.children[1].children[0].innerHTML;
    let userData = {
        following,
        followingrusername,
    }
    userData = JSON.stringify(userData);

    try {
        const res = await fetch(`${url}/friend/removeFollowing`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        })

        if (res.status === 200) {
            const data = await res.json();
            messageDiv.removeChild(error);
            message.textContent = data.message;
            success.style.opacity = 1;
            user.style.display = 'none';
        } else {
            messageDiv.removeChild(success);
            message.textContent = 'Internal Server Error';
            error.style.opacity = 1;
        }
    } catch (error) {
        console.log(error);
        messageDiv.removeChild(success);
        message.textContent = 'Internal Server Error';
        error.style.opacity = 1;
    }
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
}