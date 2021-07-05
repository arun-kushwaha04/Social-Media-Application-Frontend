let counter = 0;
let count = 4;
let checker = 0;
let images = [];
let imageToUpload = [];
let imageUrl = [];
let postImage = [];
let postId;
//message showing
const messageContainer = document.querySelector('.message-container');
const body = document.querySelector('body');
const homeButton = document.querySelector('.phome > img');
const editProfileButtton = document.querySelector('.pedit > img');
const logoutButton = document.querySelector('.plogout > img');
const userToken = localStorage.getItem("userToken");

// const url = "https://sheltered-citadel-84490.herokuapp.com";
const url = "http://localhost:8000";

// const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
const frontendUrl = `http://localhost:5500`;

const currUrl = new URLSearchParams(window.location.search);
const username = currUrl.get("username");

const name_ = document.querySelector('.name');
const username_ = document.querySelector('.username');
const email = document.querySelector('.email');
const postCount = document.querySelector('.postCount');
const followerCount = document.querySelector('.followerCount');
const followingCount = document.querySelector('.followingCount');
const likeCount = document.querySelector('.likeCount');
const about = document.querySelector('.about');
const photo = document.querySelector('.user-image');


let firebaseConfig;
window.onload = () => {
    fetchCredentials();
    fetchUserDetails();
    getUserPosts();
};

//get firebase credentials
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

// function to fetch user details
const fetchUserDetails = async() => {
    let userData = { username };
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/user/getUserinfo`, {
            method: "POST",
            body: userData,
            headers: {
                "Authorization": `${localStorage.getItem("userToken")}`,
                "Content-Type": "application/json",
            },
        })
        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            username_.innerHTML = username;
            name_.innerHTML = data.userData.name;
            email.innerHTML = data.userData.email;
            postCount.innerHTML = data.userData.posts;
            followerCount.innerHTML = data.userData.followers;
            followingCount.innerHTML = data.userData.following;
            likeCount.innerHTML = data.userData.likes;
            // about.innerHTML = data.userData.about;            
            photo.src = data.userData.profilePhoto;
        }
    } catch (error) {
        console.log(error);
    }

    if (userToken) {
        fetch(`${url}/user/getUserinfo`, {
                method: "POST",
                headers: {
                    "Authorization": `${localStorage.getItem("userToken")}`,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("hi");
                console.log(data.userData);
                Name.innerHTML = data.name;
                email.innerHTML = data.email;
                postCount.innerHTML = data.posts;
                followerCount.innerHTML = data.followers;
                followingCount.innerHTML = data.following;
                likeCount.innerHTML = data.likes;
                about.innerHTML = data.about;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};


homeButton.addEventListener('click', () => {
    location.href = `${frontendUrl}/pages/dashboard/dashboard.html`;
});

logoutButton.addEventListener('click', () => {
    if (userToken) {
        fetch(`${url}/auth/logout`, {
                method: "POST",
                headers: {
                    authorization: userToken,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    location.replace(`${frontendUrl}/index.html`);
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('profilePhoto');
    localStorage.removeItem('userId');
});

editProfileButtton.addEventListener('click', () => {
    location.href = "";
});

let theme = localStorage.getItem("theme");

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


//post on hover
//function to get all user post
async function getUserPosts() {
    try {
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
            for (let i = 0; i < post.length; i++) {
                addUserPost(post[i]);
            }
        } else {
            const data = await res.json();
            //show the error of from the response.

        }
    } catch (e) {
        console.log(e);
        //error handling done
    }
}

function addUserPost(element) {
    let originalpostid = element.originalpostid;
    if (originalpostid === null) {
        originalpostid = element.postid;
    }
    const container = document.querySelector('.user-posts');
    const divContainer = document.createElement("div");
    const div = document.createElement("div");
    div.classList = "Posts";
    div.setAttribute('id', element.postid);
    div.innerHTML = `
    
        <header class="post-user-info">
            <img class="profile-photo-feed-insert" src="${element.profilephoto}" />
            <div class="user-name-feed">
                ${element.username}
                <div class="time">${element.datetime}</div>
            </div>
            <div class="update-post">
                <i class="fas fa-trash-alt" id = "${element.postid}" onClick="deletePost(event)"></i>
                <i class="fas fa-pen-square" id = "${element.postid}" onClick="editPost(event)"></i>
            </div>
        </header>
        <div class="content">
            <p>
                ${element.description}
            </p>
            <div class="preview" id="preview${element.postid}">

            </div>
            <div class="engageButtons">
                <div class="like-button">
                    <i class="fas fa-heart crazy-button"></i>
                    <span class="likes">${element.postlikes}</span>
                </div>
                <div class="comment-button" >
                    <i class="fas fa-comment-alt crazy-button" onClick = "openCommentSection(event)" id=${originalpostid} ></i>
                    <span class="comments">${element.postcomments}</span>
                </div>
                <div class="share-button">
                    <i class="fas fa-share crazy-button"></i>
                    <span class="share">${element.postshare}</span>
                </div>
            </div>
        </div>
        
    `
    const div2 = document.createElement('div');
    div2.classList.add('comment-section');
    divContainer.appendChild(div);
    divContainer.appendChild(div2);
    container.appendChild(divContainer);
    addPostImage(element.images, element.postid);
}

function addPostImage(ImageArray, postId, divElement) {
    const id = `preview${postId}`;
    let preview = document.querySelector(`#${id}`);
    if (divElement) preview = divElement;
    let i = 0;
    ImageArray.forEach(element => {
        const div = document.createElement('div');
        div.style.position = 'relative';
        const img = document.createElement('img');
        img.classList.add('feed-image');
        if (divElement) {
            const closeImageDiv = document.createElement('div');
            closeImageDiv.classList.add('close-image');
            closeImageDiv.onclick = function(event) {
                const parent = this.parentElement;
                this.parentElement.parentElement.removeChild(parent);
                const id = parseInt(this.children[0].id);
                const toRemoveImage = postImage[id];
                postImage[id] = null;
                let ref = firebase.storage().refFromURL(toRemoveImage);
                ref.delete();
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
            closeImage.setAttribute('id', `${i}`);
            closeImage.classList.add('profile-photo-close');
            closeImage.classList.add('image-photo-close');
            closeImageDiv.appendChild(closeImage);
            div.appendChild(closeImageDiv);
            i++;
        }
        img.src = element;
        div.appendChild(img);
        preview.appendChild(div);
    })
}

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

async function getAllComment(commentSection, userData) {
    commentSection.innerHTML = " ";
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


//Edit The Post
const editPostDiv = document.querySelector('.add-feed-after-click');
const closeEditPostDiv = document.querySelector('.close-feed');
const userInfo = document.querySelector('.post-user-info');
const description = document.querySelector('.feed-text');
const feedPreview = document.querySelector('#feed-preview');

const postButton = document.querySelector('.post-button');
const uploadButton = document.querySelector('.upload-button');
const feedText = document.querySelector('.feed-text');

const editPost = async(event) => {
    const postid = event.currentTarget.id;
    postId = postid;
    editPostDiv.style.display = 'block';
    editPostDiv.scrollIntoView();
    feedPreview.innerHTML = '';
    let userData = { postid };
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/feed/getPostById`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            userInfo.children[0].src = data.post.profilephoto;
            userInfo.children[1].innerHTML = data.post.username;
            description.innerHTML = data.post.description;
            counter = data.post.images.length;
            if (counter <= 3) {
                console.log('displaying image selector')
                imageSelector.style.display = 'block';
            }
            postImage = data.post.images;
            body.style.overflowY = 'hidden';
            addPostImage(data.post.images, null, feedPreview);
        }
    } catch (error) {
        console.log(error);
    }

}
closeEditPostDiv.addEventListener('click', () => {
    editPostDiv.style.display = 'none';
    body.style.overflowY = 'auto';
})


//uploading image to firebase 
const imageButton = document.querySelector('#img');
const imageSelector = document.querySelector('.image-selector');
const preview = document.querySelector('#feed-preview');
const containerForPost = document.querySelector('.container-for-post');
const loadingEffect = document.querySelector('.loading-effect');
const loader = document.querySelector('.loader');

imageButton.addEventListener('change', (event) => {
    imageToUpload.push(event.target.files[0]);
    updateImageDisplay();
})

function updateImageDisplay() {
    const curFiles = imageButton.files;
    if (curFiles.length !== 0 && counter < 5) {
        uploadButton.style.display = 'block';
        postButton.style.display = 'none';
        counter++;
        const div = document.createElement('div');
        div.style.position = 'relative';
        const img = document.createElement('img');
        img.classList.add('feed-image');
        imageSelector.style.display = 'block';
        for (const file of curFiles) {
            // para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            const closeImageDiv = document.createElement('div');
            closeImageDiv.classList.add('close-image');
            closeImageDiv.onclick = function(event) {
                const parent = this.parentElement;
                this.parentElement.parentElement.removeChild(parent);
                imageToUpload.splice(event.target.id - 4, 1);
                count++;
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
            closeImage.setAttribute('id', `${count-1}`);
            closeImage.classList.add('profile-photo-close');
            closeImage.classList.add('image-photo-close');
            closeImageDiv.appendChild(closeImage);
            img.src = URL.createObjectURL(file);
            div.appendChild(closeImageDiv);
            div.appendChild(img);
            preview.appendChild(div);
        }
    }
    if (counter > 3) {
        imageSelector.style.display = 'none';
        return;
    }
}

//upload image to firebase storage then add th post to the database

postButton.addEventListener('click', async() => {
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
    if (checker === 1 || imageToUpload.length === 0) {
        await modifyImageUrl();
        console.log(postImage, imageUrl);
        addPost();
    } else {
        messageDiv.removeChild(success);
        message.textContent = 'First Upload Images';
        success.style.opacity = 1;
    }
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
});

const modifyImageUrl = () => {
    for (let i = postImage.length; i >= 0; i--) {
        if (postImage[i] === null || postImage[i] === undefined) continue;
        else imageUrl.unshift(postImage[i]);
    }
}

uploadButton.addEventListener('click', () => {
    uploadImageToFirebase();
})

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
                containerForPost.style.display = 'block';
                loadingEffect.style.display = 'none';
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

//adding to post 
async function addPost() {
    console.log('hi');
    containerForPost.style.display = 'block';
    loadingEffect.style.display = 'none';
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

        let userData = {
            image: imageUrl,
            description: feedText.value,
            postId,
        }
        userData = JSON.stringify(userData);
        imageToUpload = [];
        imageUrl = [];
        try {
            const res = await fetch(`${url}/feed/editUserPost`, {
                method: "POST",
                body: userData,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("userToken")}`,
                },
            });
            if (res.status === 200) {
                const data = await res.json();
                if (data.message === 'Post Updtaed') {
                    //inform the user oabout this
                    body.style.overflowY = 'scroll';
                    editPostDiv.style.visibility = 'hidden';
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