const photographerId = new URLSearchParams(document.location.search).get("id");
const filterList = document.getElementById('filter-list')
const arrow = document.getElementById('dropdown-arrow')
let mediaDOMArray = [];

// Fetch photographers and medias datas from json file
async function getPhotographer(i) {
    await fetch("./data/photographers.json")
            .then((res) => res.json())
            .then((data) => {
                let index = data.photographers.findIndex(elt => elt.id == i);
                photographerDatas = data.photographers[index];
                medias = data.media.filter(elt => elt.photographerId == i);
            });
    return { photographerDatas, medias };
}

// Call photographerFactory / Place and display header's and fixed label's DOM elements
async function displayPhotographerData() {
    const photographHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographerDatas, medias);
    photographHeader.prepend(photographerModel.getUserHeaderDOM().div);
    photographHeader.appendChild(photographerModel.getUserHeaderDOM().img);
    photographHeader.after(photographerModel.getUserLabelDOM())
}

// Call mediaFactory / Place and display medias DOM elements
async function displayMedias(medias, firstname) {

    const photographerMediasSection = document.querySelector(".photograph-medias");
    medias.forEach((media) => {
        const mediasModel = mediaFactory(media, firstname);
        let mediaCardDOM
        if (media.image) {
            mediaCardDOM = mediasModel.getImageDOM();
        } else if (media.video) {
            mediaCardDOM = mediasModel.getVideoDOM();
        }
        photographerMediasSection.appendChild(mediaCardDOM);
    })
    mediaDOMArray = Array.from(document.querySelectorAll('article'));
    displayLightbox()
}

async function init() {
    const { photographerDatas, medias } = await getPhotographer(photographerId)
    const photographerFirstname = photographerDatas.name.split(" ")[0];
    displayMedias(medias, photographerFirstname)
    displayPhotographerData()
    dropdownMenu()
}

init()

// Dropdown menu
function dropdownMenu() {
    const popularity = document.getElementById('popularity');
    const date = document.getElementById('date');
    const title = document.getElementById('title');
    arrow.addEventListener('click', () => {
        if (!filterList.classList.contains('dropdown')) {
            openDropdownMenu()
        } else {
            closeDropdownMenu()
        }
    })
}

function openDropdownMenu() {
    filterList.classList.add('dropdown');
}

function closeDropdownMenu() {
    filterList.classList.remove('dropdown');
}