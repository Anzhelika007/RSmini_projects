const audio = document.querySelector('audio');
const playerBtn = document.getElementById('btn');
let isPlay = false;


window.onload = function () {
    console.log('Hello');
    menuClickHandler();
}
// BG replace  =========================
const menuClickHandler = () => {
    const menu = document.querySelector('.header__wrapper')
    menu.addEventListener('click', (e) => {
        console.log(e.target.id)
        if (e.target.id) {
            replaceBackground(e.target.id);
            playAudio();
        }
    })
}

const replaceBackground = (id) => {
    const main = document.querySelector('.layout');
    main.style.backgroundImage = `url(/media/img/${id}.jpg)`;
}

// Button replace  ======================

const playAudio = () => {
    audio.src = 'media/audio/forest.mp3';
    audio.currentTime = 0;
    audio.play();
    replaceIconPlayPause();
}

const pauseAudio = () => {
    audio.pause();
    replaceIconPausePlay();
}

const replaceIconPlayPause = () => {
    playerBtn.classList.toggle('pause');

}

playerBtn.addEventListener('click', playAudio());