const selectedTagDefault = document.querySelector('.active__tag').id;

window.onload = function() {
    console.log('Hello Rolling Scopes');
    /* Data products */
    getResponse(selectedTagDefault);
    /* Tags */
    addTagsHandler();

}
/*====================================================================================*/
/*  Classes */ 
class Product {
    constructor({id, name, description, sizes, additives, price, category, urlToImage, ...rest}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.additives = additives;
        this.price = price;
        this.urlToImage = urlToImage;
        this.category = this.category;
    }

    /* Product generator */
    generateProduct() {
        let template = '';
        let product = document.createElement('div');
        product.className = 'gallery__card';
        product.setAttribute('data-id', this.id);

        if(this.urlToImage) {
        template += `<div class="gallery__card-wrapper">`;
        template += `<img class="gallery__card-img" src=${this.urlToImage} alt=${this.tag}>`;
         template += `</div>`; 

            if (this.name || this.tag) {
                template += `<h3 class="gallery__card-title">${this.name}</h3>`;
            }

            template += `<div class="gallery__card-text">${this.description}</div>`
            template += `<h3 class="gallery__card-price">$${this.price}</h3>`
        }

        product.innerHTML = template;
        return product;
    }
}

class Modal {
    constructor({ id, name, description, sizes, additives, price, urlToImage, ...rest}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.additives = additives;
        this.price = this.price;
        this.urlToImage = urlToImage;
    }

    /* Modal generator */
    generateModal() {
        let template = '';
        let modalWindow = document.createElement('div');
        modalWindow.className = 'modal__product modal';
        modalWindow.id = 'modalProduct';

        if(this.urlToImage) {
        template += `<div class="overlay" id="overlay"></div>`;
        template += `<div class="modal__product__wrapper">`;
        template += `<div class="modal__product__img">`;
        template += `<img class="modal__product__img-img" src="${this.urlToImage}" alt="${this.name}">`; 
        template += `</div>`; 
        template += `<div class="form__wrapper">`;
        template += `<form action="#" class="form__product" id="formProduct">`;
        template += `<div class="form__product-prev">`;
        template += `<h3 class="form__product-title">${this.name}</h3>`;
        template += `<p class="form__product-description">${this.description}</p>`;
        template += `</div>`;
        template += `<div class="form__product__size">`;
        template += `<legend class="form__product__size-title">Size</legend>`;
        template += `<div class="input__radio active__input">`;
        template += `<input class="custom-radio" type="radio" id="sizeS" name="drone" value="s" checked>`;
        template += `<label for="sizeS"><b>S</b>${this.sizes.s.size}</label>`;
        template += `</div>`;
        template += `<div class="input__radio">`;
        template += `<input class="custom-radio" type="radio" id="sizeM" name="drone" value="m">`;
        template += `<label for="sizeM"><b>M</b>${this.sizes.m.size}</label>`;
        template += `</div>`;
        template += `<div class="input__radio">`;
        template += `<input class="custom-radio" type="radio" id="sizeL" name="drone" value="l">`;
        template += `<label for="sizeL"><b>L</b>${this.sizes.l.size}</label>`;
        template += `</div>`;
        template += `</div>`;
        template += `<div class="form__product__options">`;
        template += `<legend class="form__product__options-title">Additives</legend>`;
        template += `<div class="input__checkbox">`;
        template += `<input class="custom-checkbox" type="checkbox" id="scales" name="scales" checked >`;
        template += `<label for="scales"><b>1</b>${this.additives[0].name}</label>`;
        template += `</div>`;
        template += `<div class="input__checkbox">`;
        template += `<input class="custom-checkbox" type="checkbox" id="horns" name="horns">`;
        template += `<label for="horns"><b>2</b>${this.additives[1].name}</label>`;
        template += `</div>`;
        template += `<div class="input__checkbox">`;
        template += `<input class="custom-checkbox" type="checkbox" id="horns" name="horns">`;
        template += `<label for="horns"><b>3</b>${this.additives[2].name}</label>`;
        template += `</div>`;
        template += `</div>`;
        template += `<div class="form__product__price">`;
        template += `<h3 class="form__product__price-title">Total:</h3>`;
        template += `<h3 class="form__product__price-price">$7.00</h3>`;
        template += `</div>`;
        template += `<div class="form__product__warning">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.`;
        template += `</div>`;
        template += `<input class="form__product__submit" type="submit" value="close" id="closeModal">`;
        template += `</form>`;
        template += `</div>`;
        template += `</div>`;
        template += `</div>`;
        }

        modalWindow.innerHTML = template;
        return modalWindow;
    }
}
/*====================================================================================*/
/* respons and render card */
async function getResponse(clickedTag){
    let products = [];
    const response = await fetch('src/js/products.json');
    const data = await response.json();
    for(const product of data){
        if (product.category == clickedTag) {
            products.push(new Product(product));
        }
    }
    renderCardProductsToDom(products); 
    addProductCardHandler(products);
}
/*====================================================================================*/
/* Tags */
const addTagsHandler = () => {
    document.querySelector('.menu__coffee__block').addEventListener('click', (e) => {
        if (e.target.classList.contains('menu__coffee__block-btn')) {
            let clickedTag = e.target.id;
            removeSelectedTags();
            selectedClickedTag(clickedTag);
            getResponse(clickedTag);
        }
    })
}

const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.menu__coffee__block-btn');
    tags.forEach(tag => {
        tag.classList.remove('active__tag');
    })
}

const selectedClickedTag = (clickedTag) => {
    document.getElementById(clickedTag).classList.add('active__tag');
}
/*====================================================================================*/
/* render card products */
const getGalleryWrapper = () => {
    const galleryWrapper = document.querySelector('.gallery');
    galleryWrapper.innerHTML = '';
    return galleryWrapper ;
}

const renderCardProductsToDom = (products) => {
    let galleryWrapper = getGalleryWrapper();
    products.forEach(product =>{
        galleryWrapper.append(product.generateProduct());
    })
    renderIconShowMore(products);
}
/* render icon More */
const renderIconShowMore = (products) => {
    hiddenIconShowMore();
    if (products.length > 4) {
        showIconShowMore();
        showMoreClickHandler();
    }
}

const hiddenIconShowMore = () => {
    const iconShowMore = document.querySelector('.menu__coffee__gallery-refresh');
    iconShowMore.classList.add('none')
}

const showMoreClickHandler = () => {
    document.querySelector('.menu__coffee__gallery-refresh').addEventListener('click', () => {
        renderMoreProductsCards();
        hiddenIconShowMore();
    })
}

 /* More prords */
const renderMoreProductsCards = () => {
    const galleryWrapper = document.querySelector('.gallery');
    galleryWrapper.style.height = '100%';
    hiddenIconShowMore();
}

const showIconShowMore = () => {
    const iconShowMore = document.querySelector('.menu__coffee__gallery-refresh');
    const galleryWrapper = document.querySelector('.gallery');
    if (window.innerWidth > 691) {
        galleryWrapper.style.height = '1052px';
    } else {
        galleryWrapper.style.height = '2144px';
    }

    iconShowMore.classList.remove('none')
}
/*====================================================================================*/
/* render Modal product */
const addProductCardHandler = (products) => {
    const galleryWrapper = document.querySelector('.gallery');
    galleryWrapper.addEventListener('click', (e) => {
        const id = e.target.closest('.gallery__card').getAttribute('data-id');
        products.forEach(product => {
            if (product.id === id){
                const modal = new Modal(product);
                document.body.append(modal.generateModal());
                document.body.classList.toggle('lock');
                //handleModal(product.price);
                  /* FORM */
                const closedModal = document.getElementById('closeModal');
                if (closedModal){
                    listenerModalClosed(closedModal);
                }
            }
        })
    })
}

const listenerModalClosed = (closedModal) => {
    closedModal.addEventListener('click', () =>{
        document.body.classList.toggle('lock');
        document.getElementById('modalProduct').remove();
        
    })
    document.getElementById('overlay').addEventListener('click', () => {
        document.getElementById('modalProduct').remove();
        document.body.classList.toggle('lock');
    })
}

function handleModal(startPrice) {
    const containerForm = document.querySelector("#formProduct");
    const priceElement = document.querySelector(".form__product__price");
    const formData = {
        size: null,
        additives: null
    };
    containerForm.addEventListener("click", (event) => {
        if (event.target.className.includes("input__radio size_input")) {
            event.target.classList.add("active_input");
            formData.size = {
                size: event.target.querySelector("input").value
            }
        }
        if (event.target.className.includes("input__radio additives_input")) {
            event.target.classList.add("active_input");
            formData.size = {
                additives: event.target.querySelector("input").value
            }
        }
    })
    priceElement.innerHTML(formdata.size + FormData.additives + startPrice)
}