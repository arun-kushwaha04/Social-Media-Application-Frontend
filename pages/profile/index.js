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

window.onload = () => {
    fetchUserDetails();
    getUserPosts();
};

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

}


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