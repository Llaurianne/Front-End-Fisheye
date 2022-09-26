// DOM elements
const lightbox = document.getElementById("lightbox");
const prevMedia = document.querySelector(".prev");
const nextMedia = document.querySelector(".next");
let lightboxImage

// Display lightbox
function displayLightbox() {
    let index
    for (let article of mediaDOMArray) {
        let media = article.querySelector('img, video');
        media.addEventListener('click', function(){
            createMediaDOM(media)
            lightbox.style.display = "block";
            lightboxImage.src = media.src;
            index = mediaDOMArray.findIndex(elt => elt.querySelector('img, video').src === lightboxImage.src)
        })
    }
    nextMedia.addEventListener('click', () => {index = goToNext(index)});
    prevMedia.addEventListener('click', () => {index = goToPrev(index)});
    document.addEventListener('keyup', (evt) => {
        if (evt.key === 'ArrowRight' ) {
            index = goToNext(index)
        } else if (evt.key === 'ArrowLeft' ) {
            index = goToPrev(index)
        } else if (evt.key === 'Escape') {
            closeLightbox()
        }
    });
}

function createMediaDOM(media) {
    let newNode;
    if (media.nodeName == 'IMG') {
        newNode = document.createElement('img');
        newNode.setAttribute('id', 'lightbox-image');
        lightboxImage = lightbox.appendChild(newNode);
    } else if (media.nodeName == 'VIDEO'){
        newNode = document.createElement('video');
        lightboxImage = document.createElement('source');
        newNode.setAttribute('controls', '');
        newNode.setAttribute('id', 'lightbox-image');
        newNode.appendChild(source);
        lightbox.appendChild(newNode);
    }
}

function goToNext(index) {
    document.getElementById('lightbox-image').remove()
    if (index === mediaDOMArray.length - 1) { index = 0 }
    else { index++ }
    let media = mediaDOMArray[index].querySelector('img, video')
    createMediaDOM(media)
    lightboxImage.setAttribute('src', media.src)
    return index
}

function goToPrev(index) {
    document.getElementById('lightbox-image').remove()
    if (index === 0) { index = mediaDOMArray.length - 1 }
    else { index-- }
    let media = mediaDOMArray[index].querySelector('img, video')
    createMediaDOM(media)
    lightboxImage.setAttribute('src', media.src)
    return index
}

// Close lightbox modal
function closeLightbox() {
    lightbox.style.display = "none";
    //document.removeEventListener('keyup', closeLightbox)
}