// Factory pattern for photographer - Return an object with DOM elements and datas
function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    // Homepage - Create photographer (user) card
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute('href', `./photographer.html?id=${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.setAttribute('id', 'user-name'+id)
        link.setAttribute('aria-labelledby', 'user-name'+id )
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

    // Details page - Create user header
    function getUserHeaderDOM() {
        const div = document.createElement('div');
        const h1 = document.createElement( 'h1' );
        h1.textContent = name;
        const text1 = document.createElement( 'p' );
        text1.textContent = `${city}, ${country}`;
        text1.className = 'location';
        const text2 = document.createElement( 'p' );
        text2.textContent = tagline;
        text2.className = 'tagline';
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        div.appendChild(h1);
        div.appendChild(text1);
        div.appendChild(text2);
        return { div, img };
    }

    // Details page - Create the fixed label with total number of likes and price
    function getUserLabelDOM() {
        const div = document.createElement('div');
        div.className = 'fixed-label';
        const icon = document.createElement( 'span' );
        icon.className = 'material-symbols-outlined';
        icon.textContent = 'favorite';
        const p1 = document.createElement('p');
        p1.setAttribute('id', 'totalNbOfLikes');
        p1.textContent = `${totalNbOfLikes()} `;
        const p2 = document.createElement('p');
        p1.appendChild(icon)
        p2.textContent = `${price}€ / jour`;
        div.appendChild(p1);
        div.appendChild(p2);
        return div;
    }

    // Details page - Calculate the total number of likes
    function totalNbOfLikes() {
        let likes = 0;
        for (let article of mediaDOMArray) {
            likes += parseFloat(article.querySelector('.nbOfLikes').textContent);
        }
        return likes;
    }

    return { name, city, picture, totalNbOfLikes, getUserCardDOM, getUserHeaderDOM, getUserLabelDOM }
}