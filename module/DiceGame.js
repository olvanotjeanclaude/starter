export class DiceGame {
    constructor() {
        this.isGameStarting = false;
        this.players = [];
        this.currentPlayer = this.players[0] || null;
        this.images = this.generateDice();
        this.shouldReset = 1;
        this.diceImage = document.querySelector(".dice");
    }

    run() {
        this.createField();
        this.diceImage?.classList.add("hidden");
        this.generateDice();

        this.mountHTML();
    }

    mountHTML() {
        const newGameBtn = document.querySelector(".btn--new");
        const rollDiceBtn = document.querySelector(".btn--roll");
        const holdBtn = document.querySelector(".btn--hold");
        const imageDiceElement = document.querySelector(".dice");

        newGameBtn.addEventListener("click", e =>this.reset);

        rollDiceBtn.addEventListener("click",e => this.rollDiceClicked());
    }

    createField() {
        const playerFieldHTML = this.players.map(player => this.fieldTemplate(player)).join("");

        document.getElementById("game").innerHTML = playerFieldHTML + this.actionTemplate();
    }

    reset() {
        this.resetPlayerScore();

        this.diceImage.classList.remove("hidden");

        console.log("ok")

        this.isGameStarting = true;
    }

    addPlayer(player) {
        if (player.name) {
            player.id = this.players.length + 1;
            this.players.push(player);
        }
    }

    setCurrentPlayer(player) {
        this.currentPlayer.active = false;
        this.currentPlayer = player;
        this.currentPlayer.active = true;
        document.querySelector(`.player--${currentPlayer.id}`)?.classList.add("player--active");
    }

    rollDiceClicked() {
        if (!this.isGameStarting) return;

        const currentDice = this.pickRandomImages(images);

        document.querySelector(".dice").setAttribute("src", currentDice.src);

        if (currentDice.id == this.shouldReset) {
            this.currentPlayer.score = 0;
            this.swichCurrentPlayer();
        }
        else {
            this.currentPlayer.score += currentDice.id;
        }

        this.updateScore();
    }

    holdClicked() {
        if (!this.isGameStarting) return;

        const currentPlayer = this.currentPlayer;

        currentPlayer.realScore += currentPlayer.score;
        document.getElementById(`score--${currentPlayer.id}`).innerHTML = currentPlayer.realScore;
        swichCurrentPlayer();
    }

    swichCurrentPlayer() {
        const tempPlayer = this.currentPlayer;

        if (this.currentPlayer.id == 0) {
            this.currentPlayer = player2
        }
        else {
            this.currentPlayer = player1
        }

        document.querySelector(`.player--${tempPlayer.id}`).classList.remove("player--active");
        document.querySelector(`.player--${currentPlayer.id}`).classList.add("player--active");
    }

    fieldTemplate(player) {
        return `<section class="player player--${player.id}">
                    <h2 class="name" id="name--${player.id}">${player.name}</h2>
                    <p class="score" id="score--${player.id}">${player.realScore}</p>
                    <div class="current">
                    <p class="current-label">Current</p>
                    <p class="current-score" id="current--${player.id}">${player.score}</p>
                    </div>
                </section>`;
    }

    actionTemplate() {
        return `<img src="dice-1.png" alt="Playing dice" class="dice hidden" />
                <button class="btn btn--new">🔄 New game</button>
                <button class="btn btn--roll">🎲 Roll dice</button>
                <button class="btn btn--hold">📥 Hold</button> `
    }

    generateDice() {
        return Array.from({ length: 6 }, (_, num) => {
            return {
                id: num + 1,
                src: `dice-${num + 1}.png`
            }
        });
    }

    pickRandomImages() {
        const randomIndex = generateRandomNumber(0, 5);
        return [randomIndex];
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    updateScore() {
        document.getElementById(`current--${currentPlayer.id}`).innerHTML = currentPlayer.score;

        if (currentPlayer.realScore < MAX_SCORE) {
            document.querySelector(`.player--${currentPlayer.id}`).classList.add("player--winner");
        }
    }

    resetPlayerScore() {
        this.players = this.players.map(player => ({ ...player, score: 0, realScore: 0 }));

        [...document.querySelectorAll(".score")].forEach((el) => {
            el.innerText = 0;
        });

        [...document.querySelectorAll(".current-score")].forEach((el) => {
            el.innerHTML = 0;
        });
    }
}