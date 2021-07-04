let imageToUpload = null;
let storyImageUrl = [];
let userStory = [];
let followingStory = [];
let element = [];
let chk = null;
const mainContainerBackground = document.querySelector('.current-background-image');
const previousImage = document.querySelector('.previous-image');
const currentImage = document.querySelector('.current-image');
const nextImage = document.querySelector('.next-image');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.prev');
const nav = document.querySelector('nav');
const addStoryButton = document.querySelector('.add-story');
const addStoryButtonDiv = document.querySelector('.add-your-story');
const viewStoryButtonDiv = document.querySelector('.view-your-story');

// const url = "https://sheltered-citadel-84490.herokuapp.com";
const url = "http://localhost:8000";

//fortend url
// const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
const frontendUrl = `http://localhost:5500`;

//message showing
const messageContainer = document.querySelector('.message-container');

let firebaseConfig;


window.onload = () => {
    fetchCredentials();
    getFollowing();
    getUserStory(localStorage.getItem('userId'), 1);
}

document.querySelector('.user-story-div').src = localStorage.getItem('profilePhoto');

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


fetch(`${url}/`, {

});

// let image = [
//     './assets/22917.jpg',
//     './assets/WallpaperDog-643901.jpg',
//     './assets/WallpaperDog-700017.jpg',
//     './assets/WallpaperDog-701205.jpg',
//     './assets/WallpaperDog-8674.jpg'
// ]

let image = [];
let storyUrl = [];

//funtion to fetch a user story
const getUserStory = async(userId, arg, arg2) => {
        let userData = {
            userId,
        }
        userData = JSON.stringify(userData);
        try {
            const res = await fetch(`${url}/story/getUserStory`, {
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
                if (arg) {
                    if (data.message != 'No Story Found') {
                        addStoryButtonDiv.style.display = 'none';
                        viewStoryButtonDiv.style.display = 'block';
                    }
                } else {
                    nextButton.style.visibility = 'visible';
                    previousButton.style.visibility = 'visible';
                }
                if (data.message != 'No Story Found') {
                    image = data.story;
                    userStory = data.story;
                    element = data.element;
                    if (arg2) renderUserStory();
                }
            } else {
                //error handling
            }
        } catch (error) {
            console.log(error);
        }
    }
    //getting the following users
async function getFollowing() {
    try {
        const res = await fetch(`${url}/story/getStoryList`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            console.log(data.story);
            renderFollowingList(data.story);
            //apend the mesagge
        } else {
            //error handling
        }
    } catch (error) {
        console.log(error);
    }
}

//set main constainer bacground
const renderMainContainerBackground = () => {
    mainContainerBackground.src = currentImage.children[1].src;
    return;
}

//setting the fetched image to display
const renderUserStory = (arg) => {
    previousButton.style.visibility = 'hidden';
    nextButton.style.visibility = 'visible';
    currentImage.children[1].src = image[0];
    currentImage.setAttribute('id', 0);
    renderMainContainerBackground();
    if (image.length === 1) {
        previousImage.style.visibility = 'hidden';
        nextImage.style.visibility = 'hidden';
        nextButton.style.visibility = 'hidden';
        return;
    }
    nextImage.setAttribute('id', 1);
    nextImage.children[0].src = image[1];
    previousImage.style.visibility = 'hidden';
    nextImage.style.visibility = 'visible';
    if (arg) {
        nextButton.style.visibility = 'hidden';
        previousButton.style.visibility = 'hidden';
    }
    // setTimeout(nextButtonClick(), 5000);
    return;

    // previousButton.style.visibility = 'hidden';
}


//function on next button clicked
const nextButtonClick = () => {
    const id = parseInt(nextImage.id);
    previousImage.style.visibility = 'visible';
    previousButton.style.visibility = 'visible';
    currentImage.id = id;
    nextImage.id = id + 1;
    previousImage.children[0].src = currentImage.children[1].src;
    currentImage.children[1].src = nextImage.children[0].src;
    if ((id + 1) === image.length) {
        nextImage.style.visibility = 'hidden';
        nextButton.style.visibility = 'hidden';
        renderMainContainerBackground();
        return;
    }
    nextImage.children[0].src = image[id + 1];
    renderMainContainerBackground();
    // setTimeout(nextButtonClick(), 3000);
    return;
}

//function on previous button clicked
const previousButtonClick = () => {
    const id = parseInt(nextImage.id);
    nextImage.style.visibility = 'visible';
    nextButton.style.visibility = 'visible';
    currentImage.id = id - 2;
    nextImage.id = id - 1;
    nextImage.children[0].src = currentImage.children[1].src;
    currentImage.children[1].src = previousImage.children[0].src;
    if (id <= 2) {
        previousImage.style.visibility = 'hidden';
        previousButton.style.visibility = 'hidden';
        renderMainContainerBackground();
        return;
    }
    previousImage.children[0].src = image[id - 3];
    renderMainContainerBackground();
    return;
}

//function to render selected image to view when add image is clicked
function updateImageDisplay(event) {
    imageToUpload = null;
    imageToUpload = (event.target.files[0]);
    currentImage.children[1].src = URL.createObjectURL(imageToUpload)
    renderMainContainerBackground();
    event.target.parentElement.parentElement.children[2].innerHTML = 'Upload / Change Image'
    event.target.parentElement.style.display = 'none';
    event.target.parentElement.parentElement.children[1].style.display = 'block';
}

//a function to render all following users
const renderFollowingList = (following) => {
    const container = document.querySelector('.stories-list');
    let i = 0;
    following.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('story-item');
        div.setAttribute('id', `${i}`);
        div.addEventListener("click", (event) => {
            chk = 0;
            const id = event.currentTarget.id;
            console.log(id);
            if (id) {
                updateViewStory(element.storyid);
                image = followingStory[id];
                renderUserStory();
                currentImage.children[0].setAttribute('id', `${element.storyid}`);
                document.querySelector('.story-creator').innerHTML = `${element.username}`;
                document.querySelector('.story-likes').innerHTML = `${element.likes}`;
                document.querySelector('.story-views').innerHTML = `${element.views}`;
                nav.style.visibility = 'visible';
            }
        })
        div.innerHTML = `    
            <div class="user-profile">
                <img src="${element.profilephoto}" alt="user-image" />
            </div>
            <div class="user-name">${element.username}</div>
        `
        container.appendChild(div);
        followingStory.push(element.images);
        i++;
    })
    console.log('end');
}

const uploadImageToFirebase = (event) => {
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
    const loader = document.querySelector('.loading-effect');
    loader.style.visibility = 'visible';
    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    const element = imageToUpload;
    let ans = Math.random().toString(36).slice(2);
    const refVar = firebase.storage().ref('story/' + ans + element.lastModified + dateTime + element.name);
    let task = refVar.put(element);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            loader.value = percentage;
        },
        function error(err) {
            console.log(err);
            alert('Try Again');
            loader.style.visibility = 'hidden';
        },
        function complete() {
            task.snapshot.ref.getDownloadURL()
                .then(
                    function(downloadURL) {
                        //we got the url of the image                                             
                        storyImageUrl.push(downloadURL);
                        console.log(storyImageUrl);
                        loader.style.display = 'none';
                        // document.querySelector('.add-story-to-screen').style.display = 'none';
                        event.target.parentElement.style.display = 'none';
                        event.target.parentElement.parentElement.children[0].style.display = 'block';
                        event.target.parentElement.parentElement.children[2].innerHTML = 'Add-Photo';
                        messageDiv.removeChild(error);
                        message.textContent = 'Image Uploaded';
                        success.style.opacity = 1;
                        setTimeout(nextButtonClick(), 1000);
                        document.querySelector('.add-story').style.display = 'block';
                        setTimeout(() => {
                            messageDiv.style.opacity = '0';
                            messageContainer.removeChild(messageDiv);
                        }, 2000);
                    });
        }
    )
}

addStoryButton.addEventListener('click', () => { addStoryTOServer() })

//function to uplaod user story
const addStoryTOServer = async() => {
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
    let userData = {
        storyImageUrl,
    }
    userData = JSON.stringify(userData);
    const res = await fetch(`${url}/story/addStory`, {
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
        addStoryButtonDiv.style.display = 'none';
        viewStoryButtonDiv.style.display = 'block';
    } else {
        messageDiv.removeChild(success);
        message.textContent = 'Error Ocurred In Adding Story';
        success.style.opacity = 1;
    }
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
}

//function to view user it own story
viewStoryButtonDiv.addEventListener('click', () => {
    chk = 0;
    image = userStory;
    document.querySelector('.story-creator').innerHTML = `${element.username}`;
    document.querySelector('.story-likes').innerHTML = `${element.likes}`;
    document.querySelector('.story-views').innerHTML = `${element.views}`;
    nav.style.visibility = 'visible';
    renderUserStory();
})

//updating  view on a story
const updateViewStory = async(storyId) => {
    try {
        let userData = {
            storyId,
        }
        userData = JSON.stringify(userData);
        const res = fetch(`${url}/story/updateViewStory`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        })
        if (res.status === 200) console.log("query completed");
    } catch (error) {
        console.log(error);
    }
}


//logic for liking a image in a story
const likeButton = document.querySelector('.crazy-button');

currentImage.addEventListener('mouseover', (event) => {
    const id = currentImage.id;
    const storyId = currentImage.children[0].id;
    if (id && storyId && chk === 0) {
        const image = storyId + id;
        let userData = { image };
        userData = JSON.stringify(userData);
        const res = fetch(`${url}/story/isImageLiked`, {
                method: "POST",
                body: userData,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem("userToken")}`,
                },
            }).then(res => res.json())
            .then(data => {
                if (data.message === "Liked") {
                    likeButton.classList.add('fas');
                    likeButton.classList.remove('far');
                }
                if (data.message === "Not Liked") {
                    likeButton.classList.add('far');
                    likeButton.classList.remove('fas');
                }
            }).catch(err => console.log(err));
        likeButton.setAttribute('id', `${image}`);
        // setTimeout(() => { document.querySelector('.like-story').style.opacity = 1; }, 1000);
        document.querySelector('.like-story').style.opacity = 1;
    }
}, false);
currentImage.addEventListener('mouseout', (event) => {
    const id = currentImage.id;
    if (id) document.querySelector('.like-story').style.opacity = 0;
}, false)

//updtae like on like
const updateLike = async(event) => {
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
    const image = likeButton.id;
    const storyId = currentImage.children[0].id;
    let userData = { storyId, image };
    userData = JSON.stringify(userData);
    try {
        const res = await fetch(`${url}/story/updateLikeStory`, {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("userToken")}`,
            },
        })
        if (res.status === 200) {
            const data = await res.json();
            if (data.value === 1) {
                console.log('liked');
                // likes.innerHTML = parseInt(likes.innerHTML) + 1;
                likeButton.classList.add('fas');
                likeButton.classList.remove('far');
            } else {
                console.log('not liked');
                // likes.innerHTML = parseInt(likes.innerHTML) - 1;
                likeButton.classList.add('far');
                likeButton.classList.remove('fas');
            }
            messageDiv.removeChild(error);
            message.textContent = data.message;
            success.style.opacity = 1;
        }
    } catch (err) {
        messageDiv.removeChild(success);
        message.textContent = 'Server Down';
        error.style.opacity = 1;
        console.log(err);
    }
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageContainer.removeChild(messageDiv);
    }, 2000);
}

// adding event listeners when buttons are clicked
nextButton.addEventListener("click", () => nextButtonClick());
previousButton.addEventListener("click", () => previousButtonClick());




//providing user to add the story 
const addStory = document.querySelector('.add-user-story');
const addStoryDiv = document.querySelector('.add-story-to-screen');

addStory.addEventListener("click", () => {
    nextButton.style.visibility = 'hidden';
    previousButton.style.visibility = 'hidden';
    image = [
        'https://images.unsplash.com/photo-1527843812948-a8c2ddd2fb68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1513569771920-c9e1d31714af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1581362716668-90cdec6b4882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1515446808777-87f69cb475aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mjd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    ]
    addStoryDiv.style.visibility = 'visible';
    nav.style.visibility = 'hidden';
    renderUserStory(1);
    renderMainContainerBackground();

})