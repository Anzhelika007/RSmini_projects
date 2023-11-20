export class Book {
    constructor({ id, title, author, description, status, urlToImage, season }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.urlToImage = urlToImage;
        this.season = season;
        this.status = status;
    }

    // book generator
    generateBook() {
        let template = '';
        let book = document.createElement('div');
        book.className = `favorites__gallery__book ${this.season}`;

        if (this.title) {
            template += `<div class="favorites__gallery__book-wrapper">`;
            template += `<h4 class="favorites__gallery__book-status">Staff Picks</h4>`;

            this.title &&
                (template += `<div class="favorites__gallery__book-name">${this.title}</div>`);


            this.author &&
                (template += `<div class="favorites__gallery__book-author">${this.author}</div>`)

            this.description &&
                (template += `<div class="favorites__gallery__book-description">${this.description}</div>`)

            if (JSON.parse(localStorage.getItem('userOnline'))) {
                const userIdOnline = localStorage.getItem('userIdOnline');
                for (let i = 0; i < localStorage.length; i++) {
                    let key = localStorage.key(i);
                    if (key.includes(`${userIdOnline}:Book:`)) {
                        if (localStorage.getItem(key).includes(this.title)) {
                            this.status = 'Own';
                            break;
                        }
                    }
                }
            }
            if (this.status === "Own") {
                template += `<button class="favorites__gallery__book-btn" disabled>${this.status}</button>`;
            } else {
                template += `<button class="favorites__gallery__book-btn">${this.status}</button>`;
            }


            template += `</div>`;

            this.urlToImage &&
                (template += `<img class="favorites__gallery__book-img" src=${this.urlToImage} alt=book + ${this.id}>`)

        }

        book.innerHTML = template;

        return book;
    }

}
