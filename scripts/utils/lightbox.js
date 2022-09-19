// DOM elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const prevMedia = document.querySelector(".prev");
const nextMedia = document.querySelector(".next");
let mediasDOMArray

// Display lightbox
function displayLightbox() {
    let index
    mediasDOMArray = Array.from(document.querySelectorAll(".photograph-medias img, .photograph-medias video"));
    mediasDOMArray.forEach(media => {
        media.addEventListener('click', function(){
            lightbox.style.display = "block";
            lightboxImage.src = media.src;
            index = mediasDOMArray.findIndex(elt => elt.src === lightboxImage.src)
        })
    })
    nextMedia.addEventListener('click', () => {index = goToNext(index)});
    prevMedia.addEventListener('click', () => {index = goToPrev(index)});
    document.addEventListener('keyup', (evt) => {
        console.log(evt.key)
        if (evt.key === 'ArrowRight' ) {
            index = goToNext(index)
        }
    });
    document.addEventListener('keyup', escapeLightbox);
}

function goToNext(index) {
    if (index === mediasDOMArray.length - 1) { index = 0 }
    else { index++ }
    lightboxImage.setAttribute('src', mediasDOMArray[index].src)
    return index
}

function goToPrev(index) {
    if (index === 0) { index = mediasDOMArray.length - 1 }
    else { index-- }
    lightboxImage.setAttribute('src', mediasDOMArray[index].src)
    return index
}

// Close lightbox modal
function closeLightbox() {
    lightbox.style.display = "none";
    document.removeEventListener('keyup', escapeLightbox)
}

function escapeLightbox(evt) {
    if (evt.key === 'Escape') {
        closeLightbox()
    }
}