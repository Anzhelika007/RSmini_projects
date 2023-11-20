const modalStart = document.getElementById('start');
const modalWinner = document.getElementById('winner');
const modalResultTable = document.getElementById('resultTable');
const tableLines = document.getElementById('tableLines');
const fildPlay = document.getElementById('fildPlay');
const audio = document.querySelector('audio');

let playNum = 0;
let progressValue = 0;
let currentTime = 0;
const playList = ['media/audio/start.mp3', 'media/audio/play1.mp3', 'media/audio/winner.mp3', 'media/audio/result.mp3']

/* win combination */
const winningСombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


/* User Bot */
let user = '';
let bot = '';
let move = 0;
let moveX = 0;
let moveY = 0;

let result = '';



window.onload = function () {
    console.log('Спасибо!');
    showModalStart();
}
const showModalStart = () => {
    modalStart.classList.remove('none');
    userSelectedRole();
    playAudio(0);
}
const playAudio = (num) => {
    audio.src = playList[num];
    audio.currentTime = 0;
    audio.play();
}

const userSelectedRole = () => {
    modalStart.addEventListener('click', (e) => {
        if (e.target.id === 'X') {
            user = 'X';
            bot = '0';
            hiddenModalStart();
        }
        if (e.target.id === 'O') {
            user = '0';
            bot = 'X';
            hiddenModalStart();
        }
    })
}

const hiddenModalStart = () => {
    modalStart.classList.add('none');
    startPlay(1);
}

const startPlay = () => {
    playAudio(1);
    fildPlay.addEventListener('click', (e) => {
        if (e.target.className === 'area__item' && e.target.innerText === '') {
            if (move % 2 === 0) {
                e.target.innerText = 'X';
                moveX++;
                move++;
                showScoreStepX(moveX);
                check();
            } else {
                e.target.innerText = 'O';
                moveY++;
                move++;
                showScoreStepY(moveY);
                check();
            }
        }
    })
}

const showScoreStepX = (moveX) => {
    document.getElementById('stepX').textContent = `${moveX}`;
}

const showScoreStepY = (moveY) => {
    document.getElementById('stepO').textContent = `${moveY}`;
}

const check = () => {
    const boxes = document.getElementsByClassName('area__item');
    for (let i = 0; i < winningСombinations.length + 1; i++) {
        if (boxes[winningСombinations[i][0]].innerHTML === 'X' && boxes[winningСombinations[i][1]].innerHTML === 'X' && boxes[winningСombinations[i][2]].innerHTML === 'X') {
            result = 'crosses';
            console.log(1);
            setTimeout(() => prepareResult(result), 30);
        } else if (boxes[winningСombinations[i][0]].innerHTML === 'O' && boxes[winningСombinations[i][1]].innerHTML === 'O' && boxes[winningСombinations[i][2]].innerHTML === 'O') {
            result = 'zeroes';
            setTimeout(() => prepareResult(result), 30);
        }
    }
    if (move === 9) {
        result = 'draw';
        console.log(2);
        setTimeout(() => prepareResult(result), 30);
    }
}

const prepareResult = winner => {
    modalWinner.classList.remove('none');
    document.getElementById('winnerText').innerHTML = `Winner: ${winner}!!!`;
    document.getElementById('winnerCount').innerHTML = `Count movies: ${move}`;
    saveLocalStorage(winner);
    playAudio(2);
}

const saveLocalStorage = (winner) => {
    let countPlay = 0;
    let countStart = 1;
    if (localStorage.getItem('countPlay') == null) {
        localStorage.countPlay = countPlay;
    } else if (localStorage.getItem('countStart') == null) {
        localStorage.countStart = countStart;
    } else {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key.includes('countPlay')) {
                countPlay = +localStorage.getItem('countPlay');
            }
            if (key.includes('countStart')) {
                countStart = +localStorage.getItem('countStart');
            }
        }
    }
    countPlay += 1;
    localStorage.setItem(`${countPlay}:play`, countPlay);
    localStorage.setItem(`${countPlay}:winner`, winner);
    localStorage.setItem(`${countPlay}:move`, move);
    localStorage.countPlay = countPlay;
    localStorage.countStart = countStart;


    if (countPlay > 10 && countPlay - countStart >= 10) {
        delete localStorage[`${countStart}:play`];
        delete localStorage[`${countStart}:winner`];
        delete localStorage[`${countStart}:move`];
        localStorage.countStart = countStart + 1;
    }
    setTimeout(() => showResult(), 2000);
}

const showResult = () => {
    let infoPlay = [];
    modalWinner.classList.add('none');
    modalResultTable.classList.remove('none');
    playAudio(3);

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes(':winner') || key.includes(':move')) {
            infoPlay.push([+key.slice(0, key.indexOf(':')), key, localStorage.getItem(key)]);
        }
    }
    infoPlay.sort();
    infoPlay.sort(function (a, b) {
        return a[0] - b[0];
    });
    createTable(infoPlay);
    setTimeout(() => hiddenResult(), 4000);
}

const createTable = (arr) => {
    let count = 1;
    for (let i = 0; i <= arr.length - 1; i += 2) {
        let line = document.createElement("div");
        line.classList.add('result__item');
        tableLines.appendChild(line);

        /* */
        let num = document.createElement("div");
        num.classList.add('result__num');
        num.innerHTML = `${count}`;
        line.appendChild(num);


        let winner = document.createElement("div");
        winner.classList.add('result__winner');
        winner.innerHTML = `${arr[i + 1][2]}`;
        line.appendChild(winner);

        let move = document.createElement("div");
        move.classList.add('result__winner');
        move.innerHTML = `${arr[i][2]}`;
        line.appendChild(move);

        count++;
    }

}

const hiddenResult = () => {
    location.reload()
    modalResultTable.classList.add('none');
    showModalStart();
}

