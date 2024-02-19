'use strict';

const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");

const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

const playerName0 = document.getElementById("name--0");
const playerName1 = document.getElementById("name--1");


let dice = document.querySelector(".dice");
let newDice = document.querySelector(".btn--new");
let rollDice = document.querySelector(".btn--roll");
let holdDice = document.querySelector(".btn--hold");

score0.textContent = 0;
score1.textContent = 0;
currentScore0.textContent = 0;
currentScore1.textContent = 0;


dice.classList.add("hidden");


// ROLL DICE BUTTON

rollDice.addEventListener("click", () => {
    let randomDice = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove("hidden");
    dice.src=`dice-${randomDice}.png`;

    if (randomDice !== 1) {
        if (player0.classList.contains("player--active")) {
            currentScore0.textContent -= -randomDice;
        } else {
            currentScore1.textContent -= -randomDice;
        }

    } else {
        if (player0.classList.contains("player--active")) {
            currentScore0.textContent = 0;
            player0.classList.remove("player--active");
            player1.classList.add("player--active");
        } else {
            currentScore1.textContent = 0;
            player1.classList.remove("player--active");
            player0.classList.add("player--active");
        }
    }
});


// HOLD BUTTON
holdDice.addEventListener("click", () => {
    if (score0.textContent < 100 || score1.textContent < 100) {
        if (player0.classList.contains("player--active")) {
            score0.textContent -= -currentScore0.textContent;
            currentScore0.textContent = 0;
            player0.classList.remove("player--active");
            player1.classList.add("player--active");
    
        } else {
            score1.textContent -= -currentScore1.textContent;
            currentScore1.textContent = 0;
            player1.classList.remove("player--active");
            player0.classList.add("player--active");
        }
    } else {
        if (player0.classList.contains("player--active")) {
            player0.classList.add("player--winner");
        
        } else if (player1.classList.contains("player--active")) {
            player1.classList.add("player--winner");
            
        } 
    }
});

// NEW GAME
newDice.addEventListener("click", () => {
    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    player1.classList.remove("player--active");
    player0.classList.add("player--active");
});

