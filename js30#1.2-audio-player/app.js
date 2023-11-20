const audio = document.querySelector('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const timeSong = document.getElementById('timeSong');
const timePlay = document.getElementById('timePlay');
const progressBar = document.getElementById('progressBar');


let playNum = 0;
let progressValue = 0;
let currentTime = 0;
const playList = ['media/audio/beyonce.mp3', 'media/audio/dontstartnow.mp3']
const author = ['Beyonse', 'Dua Lipa'];
const songs = ['Don\'t Hurt Yourself', 'Don\'t Start Now'];
const images = ['media/img/lemonade.png', 'media/img/dontstartnow.png'];

let isPlay = false;

window.onload = function () {
    console.log('Hello');
}

const playAudio = () => {
    if (!isPlay) {
        isPlay = true;
        audio.src = `${playList[playNum]}`;
        console.log('start', progressValue);
        audio.currentTime = currentTime;
        audio.play();
        replaceIconPlayPause(isPlay);
        setTimePlay();
        scaleBg();
    } else {
        isPlay = false;
        audio.pause();
        replaceIconPlayPause(isPlay);
        scaleBg();
        console.log('end', progressValue);
    }
}

const replaceIconPlayPause = (isPlay) => {
    if (isPlay) {
        playBtn.classList.add('pause');
    } else {
        playBtn.classList.remove('pause');
    }

};
const playNext = () => {
    progressValue = 0;
    currentTime = 0;
    if (playNum + 1 > playList.length - 1) {
        playNum = 0;
    } else {
        playNum += 1;
    }
    isPlay = false;
    playAudio();
    scaleBg();
    replaceBg();
    replaceAuthorSong();
}
const playPrev = () => {
    progressValue = 0;
    currentTime = 0;
    if (playNum - 1 < 0) {
        playNum = playList.length - 1;
    } else {
        playNum -= 1;
    }
    isPlay = false; playAudio();
    scaleBg();
    replaceBg();
    replaceAuthorSong();
}

const replaceBg = () => {
    const backgroundPage = document.getElementById('backgroundPage');
    const playerImg = document.getElementById('playerImg');
    backgroundPage.src = `${images[playNum]}`;
    playerImg.src = `${images[playNum]}`;
}
const scaleBg = () => {
    if (isPlay) {
        playerImg.classList.add('play__player__img');
    } else {
        playerImg.classList.remove('play__player__img');
    }
}

const replaceAuthorSong = () => {
    document.getElementById('songAuthor').textContent = `${author[playNum]}`;
    document.getElementById('song').textContent = `${songs[playNum]}`;
}

/* Time================================================*/
const convertTime = (time) => {
    let mins = Math.floor(time / 60);
    if (mins < 10) {
        mins = String(mins);
    }
    let secs = Math.floor(time % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    return mins + ':' + secs;
}

const setTimePlay = () => {
    audio.addEventListener('timeupdate', (e) => {
        timePlay.textContent = convertTime(audio.currentTime);
        currentTime = audio.currentTime;
        // console.log(audio.duration);
        setValueProgress();
    });
}

// Set time song
audio.onloadeddata = () => {
    timeSong.textContent = convertTime(audio.duration);
    setValueProgress();
}

//progress bar
const setValueProgress = () => {
    // console.log(audio.currentTime);
    // console.log(audio.duration);
    progressValue = audio.currentTime / audio.duration * 100;
    progressBar.style.background = `linear-gradient(to right, #808080 0%, #808080 ${progressValue}%, #000000 ${progressValue}%, white 100%)`;
    progressBar.value = progressValue;
};

playBtn.addEventListener('click', () => {
    playAudio();
});
prevBtn.addEventListener('click', () => {

    playPrev();
});
nextBtn.addEventListener('click', () => {
    playNext();
});

progressBar.addEventListener('click', (e) => {
    const progressBarWidth = window.getComputedStyle(progressBar).width;
    console.log(progressBarWidth);
    const timeToSeek = e.offsetX / parseInt(progressBarWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);
