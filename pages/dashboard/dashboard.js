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

feedInput.addEventListener('click', () => {
    addFeed.style.visibility = 'visible';
})

closeAddFeed.addEventListener('click', () => {
    addFeed.style.visibility = 'hidden';
})

//selecting image from the system 

const imageButton = document.querySelector('#img');
const preview = document.querySelector('.preview');

imageButton.addEventListener('change', (event) => {
    updateImageDisplay();
})


function updateImageDisplay() {
    const curFiles = imageButton.files;
    if (curFiles.length !== 0) {
        for (const file of curFiles) {
            // para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.style.width = '40%';
            image.style.alignSelf = 'center';
            // image.style.padding = '1rem';
            preview.appendChild(image);
        }
    }
}