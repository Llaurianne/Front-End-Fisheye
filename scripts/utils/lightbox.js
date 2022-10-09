// DOM elements
const lightbox = document.getElementById("lightbox");
const prevMedia = document.querySelector(".prev");
const nextMedia = document.querySelector(".next");
const lightboxCloseBtn = document.getElementById("lightbox-close");

// Global variables
let lightboxImage;
let index;

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
    console.log(' Display Lightbox')
    if (e.type === 'click' || e.key === 'Enter') {
        document.addEventListener('keyup', keyboardNav); // Enable keyboard navigation
        nextMedia.addEventListener('click', goToNext);
        prevMedia.addEventListener('click', goToPrev);
        let media = e.currentTarget;
        createMediaDOM(media);
        lightbox.style.display = "block";
        lightboxCloseBtn.focus();
        lightboxImage.src = media.src;
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
        newMediaNode.appendChild(source);
        newMediaNode.setAttribute('aria-label', mediaTitle)
        lightboxImage = document.createElement('source');
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
    if (e.key === 'ArrowRight' || (e.key === 'Enter' && document.activeElement === nextMedia)) {
        goToNext();
    } else if (e.key === 'ArrowLeft' || (e.key === 'Enter' && document.activeElement === prevMedia)) {
        goToPrev();
    } else if (e.key === 'Escape') {
        closeLightbox(e);
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
function closeLightbox(e) {
    if ( e.type === 'click' || e.key === 'Enter' || e.key === 'Escape' ) {
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