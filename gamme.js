const MAX_SCORE =100;
const shouldReset = 1;

const images = Array.from({length:6},(_,num) =>{
    return{
        id:num+1,
        src: `dice-${num+1}.png`
    }
});

//{id:1,src:dice-1.png}

const player1 = {
    id:0,
    score:0,
    realScore:0
};

const player2 = {
    id:1,
    score:0,
    realScore:0
};

let currentPlayer = player1;

const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const currentImage = document.querySelector(".dice");

run();


newGame.addEventListener("click",initGame);

rollDice.addEventListener("click",()=>{
    const currentDice = pickRandomImages(images);
    // const temporaryPlayer = currentPlayer;
    currentImage.setAttribute("src",  currentDice.src);

    if(currentDice.id == shouldReset){
         currentPlayer.score =0;
         swichCurrentPlayer();
    }
    else{
        currentPlayer.score += currentDice.id;
    }

    updateScore();
})

hold.addEventListener("click",() =>{
    currentPlayer.realScore+= currentPlayer.score;
    document.getElementById(`score--${currentPlayer.id}`).innerHTML = currentPlayer.realScore;
})


function run(){
   currentImage.classList.add("hidden");
}

function updateScore(){
    document.getElementById(`current--${currentPlayer.id}`).innerHTML = currentPlayer.score;
}


function initGame(){
    resetPlayerScore();
    currentPlayer = player1;
    currentImage.classList.remove("hidden");
}

function resetPlayerScore(){
    player1.score= 0;
    player1.realScore= 0;
    player1.score= 0;
    player2.realScore= 0;

    document.getElementById(`current--${player1.id}`).innerText = player1.score;
    document.getElementById(`current--${player2.id}`).innerText = player2.score;
    document.getElementById(`score--${player1.id}`).innerText = player1.realScore;
    document.getElementById(`score--${player2.id}`).innerText = player2.realScore;
}


function pickRandomImages(){
   const index = generateRandomNumber(0,5);
   return images[index];
}


function swichCurrentPlayer(){
    const tempPlayer = currentPlayer;

    if(currentPlayer.id==0){
        currentPlayer = player2
    }
    else{
        currentPlayer = player1
    }

    document.querySelector(".player").classList.remove("player--active");

    document.querySelector(`.player--${currentPlayer.id}`);
}
    

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
