const body = document.querySelector('body');

const like = document.querySelector('.like-button');
const comment = document.querySelector('.comment-button');
const share = document.querySelector('.share-button');

let likesCount = 0;

// particle js configuration
// particlesJS.load("particles-js", "particlesjs-config.json");

// like.addEventListener('click',()=>{
//     likesCount = likesCount + 1;
//     document.
// })

const search = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

search.addEventListener('focusin', () => {
    console.log('hello');
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
})

addPhoto.addEventListener('click', () => {
    addFeed.style.visibility = 'visible';
    body.style.overflowY = 'hidden';
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
let counter = 0;

imageButton.addEventListener('change', () => {
    updateImageDisplay();
})

function updateImageDisplay() {
    const curFiles = imageButton.files;
    if (curFiles.length !== 0 && counter < 5) {
        counter++;
        imageSelector.style.display = 'block';
        for (const file of curFiles) {
            // para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            const container = document.createElement('div');
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.style.width = '100%';
            image.style.height = '15rem';
            if (window.screen.width <= 600) {
                image.style.height = '10rem';
            }
            image.style.objectFit = 'cover';
            image.style.alignSelf = 'center';
            // image.style.padding = '1rem';
            container.appendChild(image);
            preview.appendChild(container);


            // uploading to google drive

        }
    }
    if (counter > 3) {
        console.log('hi');
        imageSelector.style.display = 'none';
        return;
    }
}