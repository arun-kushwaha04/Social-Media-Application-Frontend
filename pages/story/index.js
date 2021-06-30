const mainContainerBackground = document.querySelector('.current-background-image');
const previousImage = document.querySelector('.previous-image');
const currentImage = document.querySelector('.current-image');
const nextImage = document.querySelector('.next-image');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.prev');

const url = "";

fetch(`${url}/`, {

});

const image = [
    './assets/22917.jpg',
    './assets/WallpaperDog-643901.jpg',
    './assets/WallpaperDog-700017.jpg',
    './assets/WallpaperDog-701205.jpg',
    './assets/WallpaperDog-8674.jpg'
]



//set main constainer bacground
const renderMainContainerBackground = () => {
    mainContainerBackground.src = currentImage.children[1].src;
}

//setting the fetched image to display
const renderUserStory = () => {
    currentImage.children[1].src = image[0];
    currentImage.setAttribute('id', 0);
    if (image.length === 1) {
        previousImage.style.display = 'none';
        nextImage.style.visibility = 'hidden';
        return;
    }
    previousImage.setAttribute('id', 1);
    nextImage.children[0].src = image[1];
    previousImage.style.visibility = 'hidden';
    previousButton.style.visibility = 'hidden';
}

nextButton.addEventListener("click", () => {
    const id = parseInt(previousImage.id);
    previousImage.style.visibility = 'visible';
    previousButton.style.visibility = 'visible';
    currentImage.id = id;
    previousImage.id = id + 1;
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
});

previousButton.addEventListener("click", () => {
    const id = parseInt(previousImage.id);
    nextImage.style.visibility = 'visible';
    nextButton.style.visibility = 'visible';
    currentImage.id = id - 2;
    previousImage.id = id - 1;
    nextImage.children[0].src = currentImage.children[1].src;
    currentImage.children[1].src = previousImage.children[0].src;
    if ((id - 2) <= 0) {
        previousImage.style.visibility = 'hidden';
        previousButton.style.visibility = 'hidden';
        renderMainContainerBackground();
        return;
    }
    previousImage.children[0].src = image[id - 3];
    renderMainContainerBackground();
});


renderUserStory();
renderMainContainerBackground();