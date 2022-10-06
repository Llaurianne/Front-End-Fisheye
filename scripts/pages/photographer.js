const photographerId = new URLSearchParams(document.location.search).get("id");
const orderBy = document.getElementById('order-by')
const trigger = document.getElementById('trigger')
const photographerMediasSection = document.querySelector(".photograph-medias");
const options = document.querySelectorAll('li');

let mediaDOMArray = [];
let sortedMedias = [];

// Fetch photographers and medias datas from json file
async function getPhotographer(i) {
    await fetch("./data/photographers.json")
            .then((res) => res.json())
            .then((data) => {
                let index = data.photographers.findIndex(elt => elt.id == i);
                photographerDatas = data.photographers[index];
                mediasDatas = data.media.filter(elt => elt.photographerId == i);
            });
    return { photographerDatas, mediasDatas };
}

// Sort the medias datas (from json file) by option (popularity, date or title) and store them in an []
function sortMedias(option) {
    switch(option) {
        case "popularity":
            sortedMedias = mediasDatas.sort((a, b) => b.likes - a.likes)
            break;
        case "date":
            sortedMedias = mediasDatas.sort((a, b) => {
                if (a.date > b.date) { return -1 }
                else { return 1 }
            })
            break;
        case "title":
            sortedMedias = mediasDatas.sort((a, b) => {
                if (a.title < b.title) { return -1 }
                else { return 1 }
            })
            break;
    }
    return sortedMedias
}

// Call mediaFactory / Place and display medias DOM elements
async function displayMedias(sortedMedias, firstname) {
    // Delete the medias previously displayed
    photographerMediasSection.querySelectorAll('article').forEach(article => article.remove())
    // Build new DOM elements in the new order
    sortedMedias.forEach((media) => {
        const mediasModel = mediaFactory(media, firstname);
        let mediaCardDOM
        if (media.image) {
            mediaCardDOM = mediasModel.getImageDOM();
        } else if (media.video) {
            mediaCardDOM = mediasModel.getVideoDOM();
        }
        photographerMediasSection.appendChild(mediaCardDOM);
    })
    // Create a new array of DOM articles elements, to be used in the lightbox
    mediaDOMArray = Array.from(document.querySelectorAll('article'));
    // Enable possibility to open the lightbox
    displayLightbox()
}

// Call photographerFactory / Place and display header's and fixed label's DOM elements
async function displayPhotographerDatas() {
    const photographHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographerDatas);
    photographHeader.prepend(photographerModel.getUserHeaderDOM().div);
    photographHeader.appendChild(photographerModel.getUserHeaderDOM().img);
    photographHeader.after(photographerModel.getUserLabelDOM())
}

// Enable trigger to open or close the menu
function dropdownMenu() {
    trigger.addEventListener('click', () => {
        if (!orderBy.classList.contains('expanded')) {
            openDropdownMenu()
        } else {
            closeDropdownMenu()
        }
    })
}

// Open dropdown menu and enable filter by option
function openDropdownMenu() {
    orderBy.classList.add('expanded');
    trigger.setAttribute("aria-expanded", true);
    options.forEach(elt => {
        elt.addEventListener('click', displayOption);
        elt.setAttribute('aria-hidden', false);
    })
}

// Close dropdown menu
function closeDropdownMenu() {
    orderBy.classList.remove('expanded');
    trigger.setAttribute("aria-expanded", false);
    options.forEach(elt => {
        elt.removeEventListener('click', displayOption);
        if (elt.getAttribute('aria-selected') === false) {
            elt.setAttribute('aria-hidden', true);
        }
    })
}

// Display the medias depending on the chosen option
function displayOption(e) {
    options.forEach(option => {
        option.className="";
        option.setAttribute("aria-selected", false);
        option.setAttribute('aria-hidden', true);
    })
    e.currentTarget.className = "active";
    e.currentTarget.setAttribute("aria-selected", true);
    e.currentTarget.setAttribute('aria-hidden', false);
    orderBy.setAttribute("aria-activedescendant", e.currentTarget.id);
    const photographerFirstname = photographerDatas.name.split(" ")[0].replace("-", " ");
    sortedMedias = sortMedias(e.currentTarget.id)
    displayMedias(sortedMedias, photographerFirstname)
    closeDropdownMenu()
}

// Initialize the page
async function init() {
    const { photographerDatas } = await getPhotographer(photographerId);
    console.log(photographerDatas)
    const photographerFirstname = photographerDatas.name.split(" ")[0].replace("-", " ");
    sortedMedias = sortMedias("popularity");
    displayMedias(sortedMedias, photographerFirstname);
    displayPhotographerDatas();
    dropdownMenu();
    manageContactForm();
}

init();

