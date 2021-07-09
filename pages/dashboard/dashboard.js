//url 
const url = "https://sheltered-citadel-84490.herokuapp.com";
// const url = "http://localhost:8000";

//fortend url
const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
// const frontendUrl = `http://localhost:5500`;

//message showing
const messageContainer = document.querySelector('.message-container');

let users;
let firebaseConfig;
let following;

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-animation');
    loader.classList.add('loader-end');
})

console.log(window.innerWidth);

const myProfile = document.querySelector(".profile-photo-feed");
myProfile.addEventListener("click", () => {
    location.href = `${frontendUrl}/pages/profile/index.html?username=${localStorage.getItem("username")}&userId=${localStorage.getItem("userId")}`;
})

const sec = document.querySelector(".sec");
const nav2 = document.querySelector(".nav");
const changeThemeButton = document.querySelector(".theme-changer");

changeThemeButton.addEventListener('click', () => themeSlector());


//1 for dark and 0 for light
function themeSlector() {
    let theme = localStorage.getItem("theme");
    if (theme == 1) {
        nav2.style.background = "#0a1931";
        nav2.style.borderBottom = "2px solid greenyellow";
        sec.classList.remove('dark');
        localStorage.setItem('theme', '0');
        changeThemeButton.innerHTML = ` <img src="../../assets/darkTheme.svg" alt="">`;
        return;
    } else {
        nav2.style.background = "#0c033a";
        sec.classList.add('dark');
        nav2.style.borderBottom = "2px solid rgb(251, 122, 201)";
        changeThemeButton.innerHTML = ` <img src="../../assets/lightTheme.svg" alt="">`;
        localStorage.setItem("theme", 1);
        return;
    }
}


function themeLoader() {
    let theme = localStorage.getItem("theme");
    if (theme == 0) {
        nav2.style.background = "#0a1931";
        nav2.style.borderBottom = "2px solid greenyellow";
        sec.classList.remove('dark');
        return;
    } else {
        nav2.style.background = "#0c033a";
        sec.classList.add('dark');
        nav2.style.borderBottom = "2px solid rgb(251, 122, 201)";
        return;
    }
}
themeLoader();

VanillaTilt.init(document.querySelectorAll(".event"), {
    max: 15,
    speed: 300
});

async function getUserList() {
    try {
        const res = await fetch(`${url}/friend/getUserList`);
        const data = await res.json();
        users = await data.users;
        populateSearchResults(users);
    } catch (error) {
        console.log(error);
    }
}

const populateSearchResults = (users) => {
    const container = document.querySelector('.search-result');
    container.innerHTML = '';
    users.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('search-result-section');
        div.innerHTML = `
        
        <a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.id}"><img src="${element.profilephoto}" class="profile-photo" id="${element.username}"></a>
        <div class="search-details">
        <div class="search-username"><a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.id}" target='_blank'>${element.username}</a></div>
        <span class="search-name"><a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.id}" target='_blank'>${element.name}</a></span>&nbsp;&nbsp;
        <span class="search-email"><a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.id}" target='_blank'>${element.email}</a></span>
        </div>
        
        `
        container.appendChild(div);
    })
}

const search = document.querySelector('.search');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');


document.querySelector('body').addEventListener('click', () => {
    if (searchInput === document.activeElement) return;
    else {
        searchIcon.style.visibility = 'visible';
        searchInput.style.paddingLeft = '2.5rem';
        searchContainer.style.display = 'none';
    }
});

search.addEventListener('focusin', () => {
    searchIcon.style.visibility = 'hidden';
    searchInput.style.paddingLeft = '1rem';
    searchContainer.style.display = 'block';
});
// search.addEventListener('focusout', () => {
//     console.log('hi from search')
// searchIcon.style.visibility = 'visible';
// searchInput.style.paddingLeft = '2.5rem';
// searchContainer.style.display = 'none';

// });

// document.querySelector('.search-result').addEventListener('focusin', () => {
//     alert('clicked');
// })

searchInput.addEventListener('input', () => {
    updateSearchBox();
})

const updateSearchBox = () => {
    const value = searchInput.value.toLowerCase();
    let temp = [];
    for (let i = 0; i < users.length; i++) {
        const name = users[i].name.toLowerCase();
        const username = users[i].username.toLowerCase();
        const email = users[i].email.toLowerCase();
        if (name.indexOf(value) > -1 || username.indexOf(value) > -1 || email.indexOf(value) > -1) temp.push(users[i]);
    }
    populateSearchResults(temp);
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

console.log = function() {}

function populateSuggestion(suggestion) {
    suggestionsTable.innerHTML = " ";
    for (let i = 0; i < suggestion.length; i++) {
        if (i >= 10) break;
        element = suggestion[i];
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = `
                <a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.id}"><img src="${element.profilephoto}" class="profile-photo" /></a>
                <span><a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.id}">${element.username}</a></span>
                <div class="follow-btn"><i class="fas fa-user-plus" id='${element.id}' ></i></div>
                `;
        suggestionsTable.appendChild(div);
        div.children[2].children[0].addEventListener('click', (event) => {
            followUser(event);
        })
        setRightSectionHeight();
    }
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
const tocovidInfo = document.querySelector('.toCovidInfo');
const toStory = document.querySelector('.toStory');
const toVideo = document.querySelector('.toVideo');
const toTrending = document.querySelector('.toTrending');
const profile2 = document.querySelector('.toProfileInFeed');
profile.addEventListener("click", () => {
        location.href = `${frontendUrl}/pages/profile/index.html?username=${localStorage.getItem("username")}&userId=${localStorage.getItem("userId")}`;
    })
    // profile.href = `${frontendUrl}/pages/profile/index.html?username=${localStorage.getItem("username")}`;
profile2.href = `${frontendUrl}/pages/profile/index.html?username=${localStorage.getItem("username")}&userId=${localStorage.getItem("userId")}`;


toTrending.addEventListener("click", () => {
    location.href = "https://trends.google.com/trends/";
})
toStory.addEventListener("click", () => {
    location.href = `${frontendUrl}/pages/story/index.html`;
})
tocovidInfo.addEventListener("click", () => {
    location.href = "https://www.who.int/emergencies/diseases/novel-coronavirus-2019";
})
toVideo.addEventListener("click", () => {
    location.href = "https://www.youtube.com/";
})

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
const leftSection = document.querySelector('.left-section');
const hamburgerButton = document.querySelector('.hamburger');

const setRightSectionHeight = () => {
    if (window.innerWidth > 768) return;
    const height = leftSection.offsetHeight;
    rightSection.style.top = `${height}px`;
}
const mainContainer = document.querySelector('.main-container');
hamburgerButton.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        mainContainer.classList.toggle('maincontainer-open');
        sec.classList.toggle('sec-open');
        leftSection.classList.toggle('open');
        leftSection.scrollIntoView();
        rightSection.classList.toggle('open-right');
        setRightSectionHeight();
    } else {
        rightSection.classList.toggle('open');
        rightSection.scrollIntoView();
    }
})

//implementing the add feed logic

const feedInput = document.querySelector('.feed-input');
const addFeed = document.querySelector('.add-feed-after-click');
const closeAddFeed = document.querySelector('.close-feed');
const addPhoto = document.querySelector('.add-photo-feed');

feedInput.addEventListener('click', () => {
    imageUrl = [];
    addFeed.style.visibility = 'visible';
    body.style.overflowY = 'hidden';
    addFeed.scrollIntoView();
})

addPhoto.addEventListener('click', () => {
    imageUrl = [];
    addFeed.style.visibility = 'visible';
    body.style.overflowY = 'hidden';
    addFeed.scrollIntoView();
})

closeAddFeed.addEventListener('click', () => {
    let i = 0;
    imageUrl.forEach(element => {
        let ref = firebase.storage().refFromURL(element);
        ref.delete();
    })
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }
    counter = 0;
    feedText.value = '';
    postButton.style.display = 'none';
    uploadButton.style.display = 'none';
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
let images = [];

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
                counter--;
                if (counter <= 3) {
                    imageSelector.style.display = 'block';
                }
                if (counter === 0) {
                    uploadButton.style.display = 'none';
                    postButton.style.display = 'none';
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
        messageDiv.removeChild(success);
        message.textContent = 'First Upload Images';
        success.style.opacity = 1;
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageContainer.removeChild(messageDiv);
        }, 2000);
    }
});

uploadButton.addEventListener('click', () => {
    uploadImageToFirebase();
})

let imageUploadCounter = 0;

function uploadImageToFirebase() {
    containerForPost.style.display = 'none';
    loadingEffect.style.display = 'block';
    for (let i = 0; i < imageToUpload.length; i++) {
        let today = new Date();
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        const element = imageToUpload[i];
        let ans = Math.random().toString(36).slice(2);
        const refVar = firebase.storage().ref('feeds/' + ans + element.lastModified + dateTime + element.name);
        let task = refVar.put(element);
        task.on('state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                loader.value = percentage;
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
                imageUploadCounter++;
                if (imageUploadCounter === imageToUpload.length) {
                    containerForPost.style.display = 'block';
                    loadingEffect.style.display = 'none';
                    // setTimeout(() => {
                    //     containerForPost.style.display = 'block';
                    //     loadingEffect.style.display = 'none';
                    // }, 2000);
                }
                // console.log(imageUrl);
            }
        )
    }
    checker = 1;
    document.querySelectorAll('.close-image').forEach(element => {
        element.style.display = 'none';
    })
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
            for (let i = 0; i < post.length; i++) {
                addUserPost(post[i]);
            }
        } else {
            const data = await res.json();
            //show the error of from the response.]
            console.log('error');
            setTimeout(() => { location.reload() }, 5000);
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
        <a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.userid}">
        ${element.username} </a>
        <div class="time">${element.datetime}</div>
        </div>`

            if (element.userid != element.originaluserid) {
                heading = ` <div class="user-name-feed">
            <a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.userid}">
            ${element.username}</a>&nbsp; Shared Post Of &nbsp;
            <a href="${frontendUrl}/pages/profile/index.html?username=${element.originalusername}&userId=${element.originaluserid}">
            ${element.originalusername}</a>
            <div class="time">${element.datetime}</div>
            </div>`
            }

            if (html) {
                div.innerHTML = `
            <header class="post-user-info">
            <a href="${frontendUrl}/pages/profile/index.html?username=${element.username}&userId=${element.userid}"><img class="profile-photo-feed-insert" src="${element.profilephoto}" /></a>
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

    if (feedText.value.length > 100) {
        messageDiv.removeChild(success);
        message.textContent = '100 Characters At Max In Posts';
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
            following = data.follower;
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
    table.innerHTML = " ";
    following.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('user');
        div.innerHTML = `
        <a href="${frontendUrl}/pages/profile/index.html?username=${element.followingrusername}&userId=${element.following}"><img src="${element.profilephoto}" class="profile-photo" id="${element.following}"/></a>
        <span><a href="${frontendUrl}/pages/profile/index.html?username=${element.followingrusername}&userId=${element.following}">${element.followingrusername}</a></span>
        <div class="follow-btn"><i class="fas fa-user-minus" id='${element.following}'></i></div>
        `;
        div.children[2].children[0].addEventListener('click', (event) => {
            unfollowUser(event);
        })
        table.appendChild(div);
        setRightSectionHeight();
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

async function openCommentSection(event) {
    const commentSection = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1];
    commentSection.classList.toggle('comment-section-open');
    commentSection.parentElement.children[0].classList.toggle('Posts-open');
    const postid = event.target.parentElement.parentElement.parentElement.parentElement.id;
    const originalpostid = event.target.id;
    let userData = {
        postid,
        originalpostid,
    }
    userData = JSON.stringify(userData);
    getAllComment(commentSection, userData);
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

        const originalpostid = event.target.parentNode.parentNode.parentNode.children[0].children[1].children[2].children[1].children[0].id;
        let userData = {
            postid,
            originaluserid,
            comment,
            dateTime,
            originalpostid,
        }
        userData = JSON.stringify(userData);
        const commentSection = event.target.parentElement.parentElement;
        addComment(userData, commentCounter, commentText, commentSection);
    }
}

//function for adding the comment

async function addComment(userData, commentCounter, commentText, commentSection) {
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
            userData = JSON.parse(userData);
            //adding comment 
            const div = document.createElement("div");
            div.classList.add('comment');
            div.innerHTML = `
            <div class="comment">
            <a href="${frontendUrl}/pages/profile/index.html?username=${localStorage.getItem("username")}"><img class="profile-photo" src="${localStorage.getItem("profilePhoto")}" /></a>
            <div class="comment-box">
            <div class="comment-details">
            <div class="comment-user-name"><a href="${frontendUrl}/pages/profile/index.html?username=${localStorage.getItem("username")}">${localStorage.getItem("username")}</a></div>
            <div class="comment-message">${userData.comment}</div>
            </div>
            <div class="time">${userData.dateTime}</div>
            </div>                    
            </div>`;
            commentSection.prepend(div);
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
    commentSection.innerHTML = " ";
    const div = document.createElement('div');
    div.classList.add('add-comment');
    div.innerHTML = `
    <input class="comment-input" type="text" placeholder="Add Comment">
    <i class="fas fa-paper-plane add-comment-button" onClick = "commentButtonClick(event)"></i>
    </div>`;
    commentSection.appendChild(div);
    while (commentSection.children.length > 1) {
        console.log(commentSection.children[0]);
        commentSection.removeChild(commentSection.children[0]);
    }
    const res = await fetch(`${url}/feed/getAllPostComment`, {
        method: "POST",
        body: userData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("userToken")}`,
        },
    });

    if (res.status === 200) {
        if (commentSection.children.length > 1) {
            return;
        }
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
    } else {
        console.log('error');
    }
}

//sharing a post 

function sharePostClick(event) {
    const postid = event.target.parentElement.parentElement.parentElement.parentElement.id;
    const shareCounter = event.target.parentNode.children[1];
    const originaluserid = event.target.parentElement.parentElement.id;
    const originalpostid = event.target.id;
    //current date and time
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;

    let userData = {
        postid,
        dateTime,
        originalpostid,
    }
    userData = JSON.stringify(userData);
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
    console.log('hi');
    event.preventDefault();
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
    console.log(event.target.parentElement.parentElement.children[1].children[0].innerHTML);
    console.log(event.target.parentElement.parentElement.children[1].children[0]);
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
    getFollowing();
    getSuggestionList();
}

async function unfollowUser(event) {
    event.preventDefault();
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
    console.log(event.target.parentElement.parentElement.children[1].children[0].innerHTML);
    console.log(event.target.parentElement.parentElement.children[1].children[0]);
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
    setRightSectionHeight();
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
    getFollowing();
    getSuggestionList();
}
const tokenVerifier = async() => {
        try {
            const res = await fetch(`${url}/auth/tokenVerifier`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("userToken")}`,
                },
            })
            const data = await res.json();
            if (data.message === "Token Expired") {
                location.replace(`${frontendUrl}`);
            }

        } catch (error) {
            console.log(error);
        }
    }
    //function calls
tokenVerifier();
getUserList();
fetchCredentials();
getUserPosts();
getFollowing();
getSuggestionList();