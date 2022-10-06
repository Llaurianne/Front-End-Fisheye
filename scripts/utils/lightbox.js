// DOM elements
const lightbox = document.getElementById("lightbox");
const prevMedia = document.querySelector(".prev");
const nextMedia = document.querySelector(".next");
const lightboxCloseBtn = document.getElementById("lightbox-close");

// Global variables
let lightboxImage;
let index;

// Display lightbox
function displayLightbox() {
    for (let article of mediaDOMArray) {
        let media = article.querySelector('img, video');
        media.addEventListener('click', function(){
            createMediaDOM(media);
            lightbox.style.display = "block";
            lightboxImage.src = media.src;
            index = mediaDOMArray.findIndex(elt => elt.querySelector('img, video').src === lightboxImage.src)
            document.addEventListener('keyup', keyboardNav); // Enable keyboard navigation
            nextMedia.addEventListener('click', goToNext);
            prevMedia.addEventListener('click', goToPrev);
            lightboxCloseBtn.focus();
            lightbox.setAttribute('aria-hidden', false);
            mainHeader.setAttribute('aria-hidden', true);
            main.setAttribute('aria-hidden', true);
        })
    }
}

// Create a div with image or video and its title
function createMediaDOM(media) {
    let newDiv = document.createElement('div');
    let newMediaNode
    let mediaTitle= media.nextElementSibling.innerText;
    if (media.nodeName === 'IMG') {
        newMediaNode = document.createElement('img');
        newMediaNode.setAttribute('id', 'lightbox-image');
        lightboxImage = lightbox.appendChild(newMediaNode);
    } else if (media.nodeName === 'VIDEO'){
        newMediaNode = document.createElement('video');
        newMediaNode.setAttribute('controls', '');
        newMediaNode.setAttribute('id', 'lightbox-image');
        newMediaNode.appendChild(source);
        lightboxImage = document.createElement('source');
    }
    newMediaNode.setAttribute('aria-label', mediaTitle)
    let title = document.createElement('p');
    title.textContent = mediaTitle;
    newDiv.appendChild(newMediaNode);
    newDiv.appendChild(title);
    lightbox.appendChild(newDiv);
}

// Link keys and actions for keyboard navigation
function keyboardNav(evt) {
    if (evt.key === 'ArrowRight') {
        goToNext();
    } else if (evt.key === 'ArrowLeft') {
        goToPrev();
    } else if (evt.key === 'Escape') {
        closeLightbox();
    }
}

// Go to the next media
function goToNext() {
    if (index !== undefined) {
        document.querySelector('#lightbox div').remove()
        if (index === mediaDOMArray.length - 1) {
            index = 0
        } else {
            index++
        }
        let media = mediaDOMArray[index].querySelector('img, video')
        createMediaDOM(media)
        lightboxImage.setAttribute('src', media.src)
    }
}

// Go to the previous media
function goToPrev() {
    if (index !== undefined) {
        document.querySelector('#lightbox div').remove()
        if (index === 0) {
            index = mediaDOMArray.length - 1
        } else {
            index--
        }
        let media = mediaDOMArray[index].querySelector('img, video')
        createMediaDOM(media)
        lightboxImage.setAttribute('src', media.src)
    }
}

// Close lightbox modal
function closeLightbox() {
    document.querySelector('#lightbox div').remove()
    lightbox.style.display = "none";
    lightbox.setAttribute('aria-hidden', true);
    mainHeader.setAttribute('aria-hidden', false);
    main.setAttribute('aria-hidden', false);
    main.focus();
    document.removeEventListener('keyup', keyboardNav);
}