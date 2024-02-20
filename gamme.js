const MAX_SCORE = 100;
const shouldReset = 1;
let isGameStarting = false;

const images = Array.from({ length: 6 }, (_, num) => {
    return {
        id: num + 1,
        src: `dice-${num + 1}.png`
    }
});

const player1 = {
    id: 0,
    score: 0,
    realScore: 0
};

const player2 = {
    id: 1,
    score: 0,
    realScore: 0
};

let currentPlayer = player1;

const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const currentImage = document.querySelector(".dice");


newGameBtn.addEventListener("click", initGame);

rollDiceBtn.addEventListener("click", () => {
    if (!isGameStarting) return;

    const currentDice = pickRandomImages(images);
    currentImage.setAttribute("src", currentDice.src);

    if (currentDice.id == shouldReset) {
        currentPlayer.score = 0;
        swichCurrentPlayer();
    }
    else {
        currentPlayer.score += currentDice.id;
    }

    updateScore();
})

holdBtn.addEventListener("click", () => {
    if (!isGameStarting) return;

    currentPlayer.realScore += currentPlayer.score;
    document.getElementById(`score--${currentPlayer.id}`).innerHTML = currentPlayer.realScore;
    swichCurrentPlayer();
})


function run() {
    currentImage.classList.add("hidden");
}

function updateScore() {
    document.getElementById(`current--${currentPlayer.id}`).innerHTML = currentPlayer.score;

    if (currentPlayer.realScore < MAX_SCORE) {
        document.querySelector(`.player--${currentPlayer.id}`).classList.add("player--winner");
    }
}


function initGame() {
    document.querySelector(`.player--${currentPlayer.id}`)?.classList.add("player--active");
    resetPlayerScore();
    currentPlayer = player1;
    currentImage.classList.remove("hidden");
    isGameStarting = true;
}

function resetPlayerScore() {
    player1.score = 0;
    player1.realScore = 0;
    player2.score = 0;
    player2.realScore = 0;

    document.getElementById(`current--${player1.id}`).innerText = player1.score;
    document.getElementById(`current--${player2.id}`).innerText = player2.score;
    document.getElementById(`score--${player1.id}`).innerText = player1.realScore;
    document.getElementById(`score--${player2.id}`).innerText = player2.realScore;
}


function pickRandomImages() {
    const index = generateRandomNumber(0, 5);
    return images[index];
}


function swichCurrentPlayer() {
    const tempPlayer = currentPlayer;

    if (currentPlayer.id == 0) {
        currentPlayer = player2
    }
    else {
        currentPlayer = player1
    }

    document.querySelector(`.player--${tempPlayer.id}`).classList.remove("player--active");
    document.querySelector(`.player--${currentPlayer.id}`).classList.add("player--active");
}


function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
