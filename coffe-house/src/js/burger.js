const menu = document.querySelector('.navigation');
const menuBtn = document.querySelector('.menu__icon');
const menuBtnMenu = document.querySelector('.header__home-icon');

const body = document.body;

// body.addEventListener('click', ()=>{
//     console.log('1');
// })


if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active__burger');
        menuBtn.classList.toggle('active__burger');
        menuBtnMenu.classList.toggle('active__burger');
        body.classList.toggle('lock');
    })


    menu.querySelectorAll('.navigation__list-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active__burger');
            menuBtn.classList.remove('active__burger');
            menuBtnMenu.classList.remove('active__burger');
            body.classList.remove('lock');
        })
    })

    menu.querySelectorAll('.header__home-cup').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active__burger');
            menuBtn.classList.remove('active__burger');
            menuBtnMenu.classList.remove('active__burger');
            body.classList.remove('lock');
        })
    })
}

/*------------- scroll behavior -----------------*/

const anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach(anchor => {
        anchor.addEventListener('click', event => {
            if(anchor[0] === '#'){
            console.log(anchor);
            event.preventDefault();

            const blockId = anchor.getAttribute('href').substring(1);
            
            document.getElementById(blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            }) 
        }
    })
})
