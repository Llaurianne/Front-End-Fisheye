async function getPhotographers() {
    let photographers
    await fetch("./data/photographers.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                photographers = data.photographers
            });
    return {
        photographers: [...photographers]
    };
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        let medias = []
        const photographerModel = photographerFactory(photographer, medias);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
