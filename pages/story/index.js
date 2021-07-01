let imageToUpload = null;
const mainContainerBackground = document.querySelector('.current-background-image');
const previousImage = document.querySelector('.previous-image');
const currentImage = document.querySelector('.current-image');
const nextImage = document.querySelector('.next-image');
// const nextButton = document.querySelector('.next');
// const previousButton = document.querySelector('.prev');

// const url = "https://sheltered-citadel-84490.herokuapp.com";
const url = "http://localhost:8000";

//fortend url
// const frontendUrl = `https://webkirti-social-media-website.netlify.app`;
const frontendUrl = `http://localhost:5500`;

let firebaseConfig;


window.onload = () => {
    fetchCredentials();
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


fetch(`${url}/`, {

});

let image = [
    './assets/22917.jpg',
    './assets/WallpaperDog-643901.jpg',
    './assets/WallpaperDog-700017.jpg',
    './assets/WallpaperDog-701205.jpg',
    './assets/WallpaperDog-8674.jpg'
]

let storyUrl = [];

//set main constainer bacground
const renderMainContainerBackground = () => {
    mainContainerBackground.src = currentImage.children[0].src;
}

//setting the fetched image to display
const renderUserStory = () => {
    currentImage.children[0].src = image[0];
    currentImage.setAttribute('id', 0);
    if (image.length === 1) {
        previousImage.style.visibility = 'hidden';
        nextImage.style.visibility = 'hidden';
        return;
    }
    nextImage.setAttribute('id', 1);
    nextImage.children[0].src = image[1];
    previousImage.style.visibility = 'hidden';
    // previousButton.style.visibility = 'hidden';
}


//function on next button clicked
const nextButtonClick = () => {
    const id = parseInt(nextImage.id);
    previousImage.style.visibility = 'visible';
    // previousButton.style.visibility = 'visible';
    currentImage.id = id;
    nextImage.id = id + 1;
    previousImage.children[0].src = currentImage.children[0].src;
    currentImage.children[0].src = nextImage.children[0].src;
    if ((id + 1) === image.length) {
        nextImage.style.visibility = 'hidden';
        // nextButton.style.visibility = 'hidden';
        renderMainContainerBackground();
        return;
    }
    nextImage.children[0].src = image[id + 1];
    renderMainContainerBackground();
    // setTimeout(nextButtonClick, 2000);
    return;
}

//function on previous button clicked
const previousButtonClick = () => {
    const id = parseInt(previousImage.id);
    nextImage.style.visibility = 'visible';
    nextButton.style.visibility = 'visible';
    currentImage.id = id - 2;
    previousImage.id = id - 1;
    nextImage.children[0].src = currentImage.children[0].src;
    currentImage.children[0].src = previousImage.children[0].src;
    if ((id - 2) <= 0) {
        previousImage.style.visibility = 'hidden';
        // previousButton.style.visibility = 'hidden';
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
    currentImage.children[0].src = URL.createObjectURL(imageToUpload)
    renderMainContainerBackground();
    event.target.parentElement.parentElement.children[2].innerHTML = 'Upload / Change Image'
    event.target.parentElement.style.display = 'none';
    event.target.parentElement.parentElement.children[1].style.display = 'block';
}

const uploadImageToFirebase = (event) => {
    console.log('hi');
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
                        storyUrl.push(downloadURL);
                        console.log(storyUrl);
                        loader.style.display = 'none';
                        // document.querySelector('.add-story-to-screen').style.display = 'none';
                        event.target.parentElement.style.display = 'none';
                        event.target.parentElement.parentElement.children[0].style.display = 'block';
                        event.target.parentElement.parentElement.children[2].innerHTML = 'Add-Photo';
                        alert('Image Uploaded');
                        setTimeout(nextButtonClick(), 1000);
                    });
        }
    )
}




//adding event listeners when buttons are clicked
// nextButton.addEventListener("click", () => nextButtonClick());
// previousButton.addEventListener("click", () => previousButtonClick());




//providing user to add the story 
const addStory = document.querySelector('.add-user-story');
const addStoryDiv = document.querySelector('.add-story-to-screen');

addStory.addEventListener("click", () => {
    image = [
        'https://images.unsplash.com/photo-1527843812948-a8c2ddd2fb68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
        'https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1513569771920-c9e1d31714af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1581362716668-90cdec6b4882?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1515446808777-87f69cb475aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mjd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    ]
    addStoryDiv.style.visibility = 'visible';
    renderUserStory();
    renderMainContainerBackground();

})