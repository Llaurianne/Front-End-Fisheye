const photographerId = new URLSearchParams(document.location.search).get("id")

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
    const photographerModel = photographerFactory(photographerDatas);
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
    displayLightbox()
}

async function init() {
    const { photographerDatas, medias } = await getPhotographer(photographerId)
    const photographerFirstname = photographerDatas.name.split(" ")[0];
    displayPhotographerData()
    displayMedias(medias, photographerFirstname)
}

init()
