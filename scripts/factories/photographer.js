function photographerFactory(data, medias) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    // Homepage
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute('href', `./photographer.html?id=${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const text1 = document.createElement( 'p' );
        text1.textContent = `${city}, ${country}`;
        text1.className = 'location';
        const text2 = document.createElement( 'p' );
        text2.textContent = tagline;
        text2.className = 'tagline';
        const text3 = document.createElement( 'p' );
        text3.textContent = `${price} €/jour`;
        text3.className = 'price';
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(text1);
        article.appendChild(text2);
        article.appendChild(text3);
        return (article);
    }

    // Details page header
    function getUserHeaderDOM() {
        const div = document.createElement('div');
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const text1 = document.createElement( 'p' );
        text1.textContent = `${city}, ${country}`;
        text1.className = 'location';
        const text2 = document.createElement( 'p' );
        text2.textContent = tagline;
        text2.className = 'tagline';
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        div.appendChild(h2);
        div.appendChild(text1);
        div.appendChild(text2);
        return { div, img };
    }

    // Fixed label with likes and prices on details page
    function getUserLabelDOM() {
        const div = document.createElement('div');
        div.className = 'fixedLabel';
        const p1 = document.createElement('p');
        p1.setAttribute('id', 'totalNbOfLikes');
        p1.textContent = totalNbOfLikes();
        const icon = document.createElement( 'span' );
        icon.className = 'material-symbols-outlined';
        icon.textContent = 'favorite';
        const p2 = document.createElement('p');
        p2.textContent = `${price}€ / jour`;
        div.appendChild(p1);
        div.appendChild(icon);
        div.appendChild(p2);
        return div;
    }

    // Total number of likes
    function totalNbOfLikes() {
        let likes = 0;
        for (let article of mediaDOMArray) {
            likes += parseFloat(article.querySelector('.nbOfLikes').textContent);
        }
        /*for (let media of medias) {
            likes += media.likes;
        };*/
        return likes;
    }

    return { name, city, picture, totalNbOfLikes, getUserCardDOM, getUserHeaderDOM, getUserLabelDOM }
}