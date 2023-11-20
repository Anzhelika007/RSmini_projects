const gallery = document.getElementById('gallery');
const asideSearch = document.getElementById('aside');
const logo = document.getElementById('logo');
const logoText = document.getElementById('logoText');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const searchForm = document.getElementById('searchForm');
const url = 'https://api.unsplash.com/';
const accessKey = 'FyxSrP0dw-dmw45sYItA96IgUXsi3hh8rnYxlPs4tcg';
// pagination
const perPage = 9;
const totalPages = 4;
let currentPage = 1;
// search
let searchText = '';


window.onload = function () {
    console.log('Hello RS');
    getData();
    asideSearchPanel();
    logoClickHindler();
    focusInput();
    submitForm();
}

async function getData() {
    let res = '';
    if (!searchText) {
        res = await fetch(`${url}photos/?client_id=${accessKey}&per_page=${perPage}&page=${currentPage}&orientation=landscape`);
    } else {
        res = await fetch(`${url}search/photos/?query=${searchText}&tag_mode=all&orientation=landscape&per_page=${perPage}&page=${currentPage}&client_id=${accessKey}`);
        console.log(res);
    }
    const data = await res.json();
    showData(data);
}
// for (let page = 1; page <= totalPages; page++) {
//     getData(page);
// }

function showData(data) {
    gallery.innerHTML = '';
    if (Array.isArray(data)) {
        data.map((apiImg) => {
            const img = `<img class="gallery-img" src="${apiImg.urls.regular + "3&w=10&h=10&quot"
                }" alt="${apiImg.alt_description}">`;
            gallery.insertAdjacentHTML('beforeend', img);
        })
    } else if (data.results) {
        data.results.forEach((apiImg) => {
            const img = `<img class="gallery-img" src="${apiImg.urls.regular + "3&w=10&h=10&quot"}" alt="${apiImg.alt_description}">`;
            gallery.insertAdjacentHTML('beforeend', img);
        });
    } else {
        console.error('Unexpected API response:', data);
    }
}

// Asaide ==================================================
function asideSearchPanel() {
    asideSearch.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.id !== 'aside') {
            searchText = event.target.id;
            getData();
        }
    });
}

function logoClickHindler() {
    logo.addEventListener('click', () => {
        searchText = '';
        getData();
    })
    logoText.addEventListener('click', () => {
        searchText = '';
        getData();
    })
};

// search Input =====================================
function focusInput() {
    searchInput.focus();
}

function submitForm() {
    const formElement = document.getElementById('searchForm');
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(formElement);
        searchText = formData.get('search');
        getData();
    });
}


