let counter = 0;
let count = 4;
let checker = 0;
let images = [];
let imageToUpload = [];
let imageUrl = [];
let imageToDelete = [];
let postImage = [];
let post;
let postId;
let loadCounter = 0;

//message showing
const messageContainer = document.querySelector('.message-container');
const body = document.querySelector('body');
const homeButton = document.querySelector('.phome');
const editProfileButtton = document.querySelector('.pedit');
const dropDownList = document.querySelector('#myDropdown');
const logoutButton = document.querySelector('.plogout');
const userToken = localStorage.getItem('userToken');

const url = 'https://dubify.onrender.com';
// const url = "http://localhost:8000";

//fortend url
const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
// const frontendUrl = `http://localhost:5500`;

const currUrl = new URLSearchParams(window.location.search);
const username = currUrl.get('username');
const userId = currUrl.get('userId');

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
window.onload = () => {};

//drop down menu items
if (username != localStorage.getItem('username')) {
    editProfileButtton.style.display = 'none';
}
editProfileButtton.addEventListener('click', () => {
    if (username === localStorage.getItem('username'))
        dropDownList.classList.toggle('show');
});

//setting href for various edit functions
const editName = document.querySelector('.update-name');
const editPassword = document.querySelector('.update-password');
editName.href = `../EditName/index.html`;
editPassword.href = `../EditPassword/index.html`;

//get firebase credentials
async function fetchCredentials() {
    const response = await fetch(`${url}/uploadImage/addFeed`, {
        method: 'GET',
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
    let userData = { username, userId };
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/user/getUserinfo`, {
            method: 'POST',
            body: userData,
            headers: {
                Authorization: `${localStorage.getItem('userToken')}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        if (data.message === 'Fetched succesfully') {
            console.log(data);
            username_.innerHTML = username;
            name_.innerHTML = data.userData.name;
            email.innerHTML = data.userData.email;
            postCount.innerHTML = data.userData.postmade;
            followerCount.innerHTML = data.userData.followercount;
            followingCount.innerHTML = data.userData.followingcount;
            likeCount.innerHTML = data.userData.likes;
            // about.innerHTML = data.userData.about;
            photo.src = data.userData.profilephoto;
        }
        if (data.message === 'Invalid Profile URL') {
            alert('Invalid Profile URL');
        }
    } catch (error) {
        console.log(error);
    }
};

homeButton.addEventListener('click', () => {
    location.href = `${frontendUrl}/pages/dashboard/dashboard.html`;
});

logoutButton.addEventListener('click', () => {
    if (userToken) {
        fetch(`${url}/auth/logout`, {
                method: 'POST',
                headers: {
                    authorization: userToken,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message);
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

const nav2 = document.querySelector('.pnav');
const sec = document.querySelector('.sec');
const changeThemeButton = document.querySelector('.theme-changer');

changeThemeButton.addEventListener('click', () => {
    console.log('hi');
    themeSlector();
});

//1 for dark and 0 for light
function themeSlector() {
    let theme = localStorage.getItem('theme');
    if (theme == 1) {
        nav2.style.background = '#0a1931';
        nav2.style.borderBottom = '2px solid greenyellow';
        sec.classList.remove('dark');
        localStorage.setItem('theme', '0');
        changeThemeButton.innerHTML = ` <img src="../../assets/darkTheme.svg" alt="">`;
        return;
    } else {
        nav2.style.background = '#0c033a';
        sec.classList.add('dark');
        nav2.style.borderBottom = '2px solid rgb(251, 122, 201)';
        changeThemeButton.innerHTML = ` <img src="../../assets/lightTheme.svg" alt="">`;
        localStorage.setItem('theme', 1);
        return;
    }
}

function themeLoader() {
    let theme = localStorage.getItem('theme');
    if (theme == 0) {
        nav2.style.background = '#0a1931';
        nav2.style.borderBottom = '2px solid greenyellow';
        sec.classList.remove('dark');
        return;
    } else {
        nav2.style.background = '#0c033a';
        sec.classList.add('dark');
        nav2.style.borderBottom = '2px solid rgb(251, 122, 201)';
        return;
    }
}
themeLoader();

//post on hover
//function to get all user post
async function getUserPosts() {
    let userData = { username, userId };
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/feed/getUserPost`, {
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            //we have to load the post of user.
            post = data.post;
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

//viewing the user post
function addUserPost(element) {
    let originalpostid = element.originalpostid;
    if (originalpostid === null) {
        originalpostid = element.postid;
    }
    const container = document.querySelector('.user-posts');
    const divContainer = document.createElement('div');
    const div = document.createElement('div');
    div.classList = 'Posts';
    div.setAttribute('id', element.postid);
    let heading = `${element.username}`;
    if (element.userid != element.originaluserid) {
        heading = ` 
            ${element.username}</a>&nbsp; Shared Post Of &nbsp;
            ${element.originalusername}
        `;
    }
    let buttons = `<i class="fas fa-trash-alt" id = "${element.postid}" onClick="deletePost(event,1)"></i>
    <i class="fas fa-pen-square" id = "${element.postid}" onClick="editPost(event)"></i>`;
    if (element.userid != element.originaluserid) {
        buttons = `<i class="fas fa-trash-alt" id = "${element.postid}" onClick="deletePost(event)"></i>`;
    }
    if (username != localStorage.getItem('username')) {
        buttons = '';
    }
    div.innerHTML = `
    
        <header class="post-user-info">
            <img class="profile-photo-feed-insert" src="${element.profilephoto}" />
            <div class="user-name-feed">
                ${heading}
                <div class="time">${element.datetime}</div>
            </div>
            <div class="update-post">
                ${buttons}
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
        
    `;
    const div2 = document.createElement('div');
    div2.classList.add('comment-section');
    divContainer.appendChild(div);
    divContainer.appendChild(div2);
    container.appendChild(divContainer);
    addPostImage(element.images, element.postid);
}

//function to delete the post
const deletePost = async(event, arg) => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
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

    const postId = event.currentTarget.id;
    const post = event.target.parentElement.parentElement.parentElement;
    let userData = { postId };
    userData = JSON.stringify(userData);

    try {
        const res = await fetch(`${url}/feed/deleteUserPost`, {
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
        });

        if (res.status === 200) {
            const data = await res.json();
            if (
                data.message === 'Post Deleted' ||
                data.message === 'Post And All Shared Links Deleted'
            ) {
                if (arg) {
                    delteImagesFromFirebase(postId);
                }
                messageDiv.removeChild(error);
                message.textContent = data.message;
                success.style.opacity = 1;
                post.parentElement.removeChild(post);
            } else if (data.message === 'Your Not Authoriized To Delete This Post') {
                messageDiv.removeChild(success);
                message.textContent = data.message;
                error.style.opacity = 1;
            }
        }
    } catch (error) {
        console.log(error);
    }
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
};

//function to delte images from firebase
const delteImagesFromFirebase = async(postId) => {
    imageToDelete = [];
    for (let i = 0; i < post.length; i++) {
        element = post[i];
        console.log(element);
        if (element.postid == postId) {
            imageToDelete = element.images;
            break;
        }
    }
    imageToDelete.forEach((element) => {
        const ref = firebase.storage().refFromURL(element);
        ref.delete();
    });
};

//function to display image to preview
function addPostImage(ImageArray, postId, divElement) {
    const id = `preview${postId}`;
    let preview = document.querySelector(`#${id}`);
    if (divElement) preview = divElement;
    let i = 0;
    ImageArray.forEach((element) => {
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
                imageToDelete.push(ref);
                counter--;
                if (count === 4) {
                    postButton.style.display = 'block';
                } else if (counter <= 3) {
                    imageSelector.style.display = 'block';
                } else if (counter === 0) {
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
    });
}

//function to open comment section
async function openCommentSection(event) {
    const commentSection =
        event.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.children[1];
    commentSection.classList.toggle('comment-section-open');
    commentSection.parentElement.children[0].classList.toggle('Posts-open');
    const postid =
        event.target.parentElement.parentElement.parentElement.parentElement.id;
    const originalpostid = event.target.id;
    let userData = {
        postid,
        originalpostid,
    };
    userData = JSON.stringify(userData);
    getAllComment(commentSection, userData);
}

//function to get comments of a post
async function getAllComment(commentSection, userData) {
    commentSection.innerHTML = ' ';
    while (commentSection.children.length > 1) {
        console.log(commentSection.children[0]);
        commentSection.removeChild(commentSection.children[0]);
    }
    const res = await fetch(`${url}/feed/getAllPostComment`, {
        method: 'POST',
        body: userData,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${localStorage.getItem('userToken')}`,
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

feedText.addEventListener('input', () => {
    if (feedText.value === '') {
        postButton.style.display = 'none';
        uploadButton.style.display = 'none';
    } else if (feedText.value !== '' && counter > 0) {
        if (checker) {
            postButton.style.display = 'block';
            uploadButton.style.display = 'none';
        } else {
            postButton.style.display = 'none';
            uploadButton.style.display = 'block';
        }
    } else if (feedText.value !== '' && counter === 0) {
        postButton.style.display = 'block';
        uploadButton.style.display = 'none';
    }
});

//opening the post div for editing
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
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            userInfo.children[0].src = data.post.profilephoto;
            userInfo.children[1].innerHTML = data.post.username;
            description.innerHTML = data.post.description;
            counter = data.post.images.length;
            if (counter <= 3) {
                console.log('displaying image selector');
                imageSelector.style.display = 'block';
            }
            postImage = data.post.images;
            body.style.overflowY = 'hidden';
            addPostImage(data.post.images, null, feedPreview);
        }
    } catch (error) {
        console.log(error);
    }
};
closeEditPostDiv.addEventListener('click', () => {
    editPostDiv.style.display = 'none';
    body.style.overflowY = 'auto';
});

//selecting various buttons
const imageButton = document.querySelector('#img');
const imageSelector = document.querySelector('.image-selector');
const preview = document.querySelector('#feed-preview');
const containerForPost = document.querySelector('.container-for-post');
const loadingEffect = document.querySelector('.loading-effect');
const loader = document.querySelector('.loader');

imageButton.addEventListener('change', (event) => {
    imageToUpload.push(event.target.files[0]);
    updateImageDisplay();
});

//function to display selected image to view
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
            closeImage.setAttribute('id', `${count - 1}`);
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
    if (checker === 1 || imageToUpload.length === 0) {
        await modifyImageUrl();
        addPost();
    } else {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
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

const modifyImageUrl = () => {
    for (let i = postImage.length; i >= 0; i--) {
        if (postImage[i] === null || postImage[i] === undefined) continue;
        else imageUrl.unshift(postImage[i]);
    }
};

uploadButton.addEventListener('click', () => {
    uploadImageToFirebase();
});

let imageUploadCounter = 0;
//a function to uplaoad image to firebase
function uploadImageToFirebase() {
    if (imageToUpload.length === 0) {
        postButton.style.display = 'block';
        uploadButton.style.display = 'none';
        return;
    }
    containerForPost.style.display = 'none';
    loadingEffect.style.display = 'block';
    for (let i = 0; i < imageToUpload.length; i++) {
        let today = new Date();
        let date =
            today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let time =
            today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        let dateTime = date + ' ' + time;
        const element = imageToUpload[i];
        let ans = Math.random().toString(36).slice(2);
        const refVar = firebase
            .storage()
            .ref('feeds/' + ans + element.lastModified + dateTime + element.name);
        let task = refVar.put(element);
        task.on(
            'state_changed',
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                loader.value = percentage;
            },
            function error(err) {
                console.log(err);
            },
            function complete() {
                task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    //we got the url of the image
                    imageUrl.push(downloadURL);
                });
                imageUploadCounter++;
                if (imageUploadCounter === imageToUpload.length) {
                    containerForPost.style.display = 'block';
                    loadingEffect.style.display = 'none';
                }
                // console.log(imageUrl);
            },
        );
    }
    checker = 1;
    document.querySelectorAll('.close-image').forEach((element) => {
        element.style.display = 'none';
    });
    postButton.style.display = 'block';
    uploadButton.style.display = 'none';
}

//updating the post
async function addPost() {
    console.log('hi');
    containerForPost.style.display = 'block';
    loadingEffect.style.display = 'none';
    //message div
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
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
        };
        userData = JSON.stringify(userData);
        imageToUpload = [];
        imageUrl = [];
        try {
            const res = await fetch(`${url}/feed/editUserPost`, {
                method: 'POST',
                body: userData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${localStorage.getItem('userToken')}`,
                },
            });
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                if (data.message === 'Post Updtaed') {
                    //inform the user oabout this
                    body.style.overflowY = 'scroll';
                    editPostDiv.style.visibility = 'hidden';
                    messageDiv.removeChild(error);
                    message.textContent = data.message;
                    success.style.opacity = 1;
                    imageToDelete.forEach((element) => {
                        element.delete();
                    });
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
            location.reload();
        }, 2000);
    }
}

//profile photo update

const profilePhotoDiv = document.querySelector('.pprofile-photo');
const updateProfilePhotoDiv = document.querySelector('.pprofile-photo-over');
const newProfilePhoto = document.querySelector('#img-profile-photo');

profilePhotoDiv.addEventListener(
    'mouseover',
    () => {
        if (username === localStorage.getItem('username'))
            updateProfilePhotoDiv.style.opacity = 1;
    },
    false,
);
profilePhotoDiv.addEventListener(
    'mouseout',
    () => {
        updateProfilePhotoDiv.style.opacity = 0;
    },
    false,
);
newProfilePhoto.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const currentProfilePhoto = localStorage.getItem('profilePhoto');
    uploadProfilePhotoToFirebase(file, currentProfilePhoto);
});

const uploadProfilePhotoToFirebase = (file, currentProfilePhoto) => {
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
    let today = new Date();
    let date =
        today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateTime = date + ' ' + time;
    const element = file;
    let ans = Math.random().toString(36).slice(2);
    const refVar = firebase
        .storage()
        .ref(
            'Profile-Photos/' + ans + element.lastModified + dateTime + element.name,
        );
    let task = refVar.put(element);
    task.on(
        'state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function error(err) {
            console.log(err);
        },
        function complete() {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                updateProfilePhotoToDataBase(
                    messageDiv,
                    message,
                    success,
                    error,
                    downloadURL,
                    currentProfilePhoto,
                );
            });
        },
    );
};
console.log = function() {};
const updateProfilePhotoToDataBase = async(
    messageDiv,
    message,
    success,
    error,
    downloadURL,
    currentProfilePhoto,
) => {
    console.log('hi');
    let userData = {
        profilePhoto: downloadURL,
    };
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/user/updateProfilePhoto`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
            body: userData,
        });
        if (res.status === 200) {
            const data = await res.json();
            localStorage.setItem('profilePhoto', downloadURL);
            const profilePhotoUrl =
                'https://firebasestorage.googleapis.com/v0/b/dubify-7f0f8.appspot.com/o/Profile-Photos%2F51f6fb256629fc755b8870c801092942.png?alt=media&token=f67200e6-85c6-49a8-afe1-9ebd06a298c5';
            if (currentProfilePhoto != profilePhotoUrl) {
                const ref = firebase.storage().refFromURL(currentProfilePhoto);
                ref.delete();
            }
            profilePhotoDiv.src = downloadURL;
            messageDiv.removeChild(error);
            message.textContent = 'Profile Photo Updated';
            success.style.opacity = 1;
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
        location.reload();
    }, 2000);
};

//follow or unfollow the user
const followButton = document.querySelector('.follow');
const unFollowerButton = document.querySelector('.unfollow');
followButton.addEventListener('click', () => {
    followUser();
});
unFollowerButton.addEventListener('click', () => {
    unfollowUser();
});
const isUserFollowing = async() => {
    let userData = { username };
    userData = JSON.stringify(userData);

    try {
        const res = await fetch(`${url}/friend/isUserFollowing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
            body: userData,
        });
        if (res.status === 200) {
            const data = await res.json();
            if (data.value === 0) {
                unFollowerButton.style.display = 'none';
                followButton.style.display = 'block';
            } else {
                unFollowerButton.style.display = 'block';
                followButton.style.display = 'none';
            }
        }
    } catch (error) {
        console.log(error);
    }
};

async function followUser() {
    console.log('follow');
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
    const following = userId;
    const followingrusername = username;
    let userData = {
        following,
        followingrusername,
    };
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/friend/addFollowing`, {
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            messageDiv.removeChild(error);
            message.textContent = data.message;
            success.style.opacity = 1;
            unFollowerButton.style.display = 'block';
            followButton.style.display = 'none';
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

async function unfollowUser() {
    console.log('Unfollow');
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

    const following = userId;
    const followingrusername = username;
    let userData = {
        following,
        followingrusername,
    };
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/friend/removeFollowing`, {
            method: 'POST',
            body: userData,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            messageDiv.removeChild(error);
            message.textContent = data.message;
            success.style.opacity = 1;
            unFollowerButton.style.display = 'none';
            followButton.style.display = 'block';
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

const tokenVerifier = async() => {
    try {
        const res = await fetch(`${url}/auth/tokenVerifier`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem('userToken')}`,
            },
        });
        const data = await res.json();
        if (data.message === 'Token Expired') {
            location.replace(`${frontendUrl}`);
        }
        if (data.message === 'Valid token') {
            homeButton.style.display = 'block';
            editProfileButtton.style.display = 'block';
            logoutButton.style.display = 'block';
        }
    } catch (error) {
        console.log(error);
    }
};

//function calls
if (userId && username) {
    tokenVerifier();
    fetchCredentials();
    fetchUserDetails();
    if (username != localStorage.getItem('username')) isUserFollowing();
    getUserPosts();
} else {
    alert('Invalid Profile URL');
}

window.addEventListener('load', () => {
    const loader = document.querySelector('.ploader-animation');
    setTimeout(() => {
        loader.classList.add('ploader-end');
    }, 2000);
});
