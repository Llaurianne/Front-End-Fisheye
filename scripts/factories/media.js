function mediaFactory(media, firstname) {
    const { id, photographerId, title, image, video, likes, date, price } = media;

    const picturePath = `assets/images/${firstname}/${image}`;
    const videoPath = `assets/images/${firstname}/${video}`

    let mediaTag

    // Create DOM common to images and videos
    function getMediaDOM() {
        const article = document.createElement( 'article' );
        const text = document.createElement( 'p' );
        text.textContent = title;
        const counter = document.createElement( 'p' );
        counter.textContent = likes;
        const icon = document.createElement( 'span' );
        icon.className = 'material-symbols-outlined';
        icon.textContent = 'favorite';
        article.appendChild(mediaTag);
        article.appendChild(text);
        article.appendChild(counter);
        article.appendChild(icon);
        return (article);
    }

    // Create DOM elements for videos
    function getVideoDOM() {
        mediaTag = document.createElement( 'video' );
        mediaTag.setAttribute('width', 300);
        mediaTag.setAttribute('controls', '');
        source = document.createElement( 'source');
        source.setAttribute('src', videoPath);
        mediaTag.appendChild(source)
        return getMediaDOM()
    }


    // Create DOM elements for images
    function getImageDOM() {
        mediaTag = document.createElement( 'img' );
        mediaTag.setAttribute("src", picturePath)
        mediaTag.setAttribute("alt", "")
        return getMediaDOM()
    }

    return { getVideoDOM, getImageDOM }
}