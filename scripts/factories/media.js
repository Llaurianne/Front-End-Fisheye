function mediaFactory(media, firstname) {
    const { title, image, video, likes } = media;

    const picturePath = `assets/images/${firstname}/${image}`;
    const videoPath = `assets/images/${firstname}/${video}`

    let mediaTag

    // Photographer page - Create the common DOM of images and videos
    function getMediaDOM() {
        const article = document.createElement( 'article' );
        const text = document.createElement( 'p' );
        text.textContent = title;
        const counter = document.createElement( 'p' );
        counter.textContent = likes;
        counter.className = 'nbOfLikes';
        counter.setAttribute('aria-label', 'Number of likes');
        const icon = document.createElement( 'span' );
        icon.setAttribute('tabindex', '0');
        icon.addEventListener('click', updateLikes)
        icon.addEventListener('keyup', updateLikes)
        icon.className = 'material-symbols-outlined';
        icon.textContent = 'favorite';
        icon.setAttribute('aria-label', 'Likes');
        article.appendChild(mediaTag);
        article.appendChild(text);
        article.appendChild(counter);
        article.appendChild(icon);
        return (article);
    }

    // Photographer page - Create the videos specifics DOM elements
    function getVideoDOM() {
        mediaTag = document.createElement( 'video' );
        mediaTag.setAttribute('controls', '');
        mediaTag.setAttribute('aria-label', title);
        source = document.createElement( 'source');
        source.setAttribute('src', videoPath);
        text = document.createElement('p');
        text.innerText = `Votre navigateur ne supporte pas ce type de vidéos. Voici un lien de téléchargement de la vidéo nommée "${title}": `;
        link = document.createElement('a');
        link.setAttribute('href', videoPath)
        text.appendChild(link);
        source.appendChild(text)
        mediaTag.appendChild(source)
        return getMediaDOM()
    }

    // Photographer page - Create the images specifics DOM elements
    function getImageDOM() {
        mediaTag = document.createElement( 'img' );
        mediaTag.setAttribute("src", picturePath)
        mediaTag.setAttribute("alt", title)
        mediaTag.setAttribute("tabindex", 0);
        return getMediaDOM()
    }

    // Photographer page - Update the media's number of likes and the total number of likes
    function updateLikes(e) {
        if (e.type === 'click' || e.key === 'Enter') {
            let nbOfLikes = e.currentTarget.parentNode.querySelector('.nbOfLikes');
            let totalLikes = document.getElementById('totalNbOfLikes')
            let mediaClassList = e.currentTarget.classList
            const icon = document.createElement('span');
            icon.className = 'material-symbols-outlined';
            icon.textContent = 'favorite';
            if (!e.currentTarget.classList.contains('liked')) {
                nbOfLikes.textContent = parseFloat(nbOfLikes.textContent) + 1;
                mediaClassList.add('liked');
                totalLikes.textContent = `${parseFloat(totalLikes.textContent) + 1} `;
            } else {
                nbOfLikes.textContent = parseFloat(nbOfLikes.textContent) - 1;
                mediaClassList.remove('liked');
                totalLikes.textContent = `${parseFloat(totalLikes.textContent) - 1} `;
            }
            totalLikes.appendChild(icon)
        }
    }

    return { getVideoDOM, getImageDOM }
}