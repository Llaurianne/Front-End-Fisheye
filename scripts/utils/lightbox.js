// DOM elements
const lightbox = document.getElementById("lightbox");
const prevMedia = document.querySelector(".prev");
const nextMedia = document.querySelector(".next");
const lightboxCloseBtn = document.getElementById("lightbox-close");

// Global variables
let lightboxImage;
let index;

// Enable the pictures and button to open and close the lightbox
function manageLightbox() {
    for (let article of mediaDOMArray) {
        let media = article.querySelector('img, video');
        media.addEventListener('click', displayLightbox);
        media.addEventListener('keyup', displayLightbox);
    }
    lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightboxCloseBtn.addEventListener('keyup', closeLightbox);
}

// Display lightbox
function displayLightbox(e) {
    if (e.type === 'click' || e.key === 'Enter') {
        document.addEventListener('keyup', keyboardNav); // Enable keyboard navigation
        nextMedia.addEventListener('click', goToNext);
        prevMedia.addEventListener('click', goToPrev);
        let media = e.currentTarget;
        createMediaDOM(media);
        lightbox.style.display = "block";
        lightboxCloseBtn.focus();
        if (e.currentTarget.tagName === 'IMG') {
            lightboxImage.src = media.src;
        } else if (e.currentTarget.tagName === 'VIDEO') {
            lightboxImage.src = media.firstElementChild.src;
        }
        index = mediaDOMArray.findIndex(elt => elt.querySelector('img, video').src === lightboxImage.src)
        lightbox.setAttribute('aria-hidden', false);
        mainHeader.setAttribute('aria-hidden', true);
        main.setAttribute('aria-hidden', true);
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
        newMediaNode.setAttribute('alt', mediaTitle)
        lightboxImage = lightbox.appendChild(newMediaNode);
    } else if (media.nodeName === 'VIDEO'){
        newMediaNode = document.createElement('video');
        newMediaNode.setAttribute('controls', '');
        newMediaNode.setAttribute('id', 'lightbox-image');
        lightboxImage = document.createElement('source');
        newMediaNode.appendChild(lightboxImage);
        newMediaNode.setAttribute('aria-label', mediaTitle)
    }
    let title = document.createElement('p');
    title.textContent = mediaTitle;
    title.setAttribute('id', 'lightbox-title');
    newDiv.appendChild(newMediaNode);
    newDiv.appendChild(title);
    lightbox.appendChild(newDiv);
}

// Link keys and actions for keyboard navigation
function keyboardNav(e) {
    if (e.key === 'ArrowRight') {
        goToNext(e);
    } else if (e.key === 'ArrowLeft') {
        goToPrev(e);
    } else if (e.key === 'Escape') {
        closeLightbox(e);
    }
}

// Go to the next media
function goToNext(e) {
    e.preventDefault();
    if (index !== undefined) {
        document.querySelector('#lightbox div').remove()
        if (index === mediaDOMArray.length - 1) {
            index = 0
        } else {
            index++
        }
        let media = mediaDOMArray[index].querySelector('img, video')
        createMediaDOM(media)
        if (media.tagName === 'IMG') {
            lightboxImage.src = media.src;
        } else if (media.tagName === 'VIDEO') {
            lightboxImage.src = media.firstElementChild.src;
        }
    }
}

// Go to the previous media
function goToPrev(e) {
    e.preventDefault();
    if (index !== undefined) {
        document.querySelector('#lightbox div').remove()
        if (index === 0) {
            index = mediaDOMArray.length - 1
        } else {
            index--
        }
        let media = mediaDOMArray[index].querySelector('img, video')
        createMediaDOM(media)
        if (media.tagName === 'IMG') {
            lightboxImage.src = media.src;
        } else if (media.tagName === 'VIDEO') {
            lightboxImage.src = media.firstElementChild.src;
        }
    }
}

// Close lightbox modal
function closeLightbox(e) {
    if ( e.type === 'click' || e.key === 'Escape' ) {
        let mediaTitle = document.getElementById('lightbox-title').innerText;
        let media
        if (lightboxImage.tagName === 'IMG') {
            media = document.querySelector(`[alt="${mediaTitle}"]`);
            console.log(media)
        } else if (lightboxImage.tagName === 'SOURCE') {
            media = document.querySelector(`[aria-label="${mediaTitle}"]`);
        }
        document.querySelector('#lightbox div').remove()
        lightbox.style.display = "none";
        lightbox.setAttribute('aria-hidden', true);
        mainHeader.setAttribute('aria-hidden', false);
        main.setAttribute('aria-hidden', false);
        media.focus();
        document.removeEventListener('keyup', keyboardNav);
    }
}