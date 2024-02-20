export class DiceGame {
    constructor(config = {
        max_score: 20,
        score_should_reset: 1,
        image_sizes: 6,
    }) {
        this.isGameStarting = false;
        this.players = [];
        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex] || null;
        this.images = [];
        this.diceImage = null;
        this.config = config;
    }

    run() {
        this.createField();
        this.images = this.generateDice();
        this.diceImage?.classList.add("hidden");
        this.mountHTML();
    }

    mountHTML() {
        const newGameBtn = document.querySelector(".btn--new");
        const rollDiceBtn = document.querySelector(".btn--roll");
        const holdBtn = document.querySelector(".btn--hold");

        newGameBtn.addEventListener("click", e => this.reset(e));

        rollDiceBtn.addEventListener("click", e => this.rollDiceClicked(e));

        holdBtn.addEventListener("click", e => this.holdClicked(e));
    }

    createField() {
        const playerFieldHTML = this.players.map(player => this.fieldTemplate(player)).join("");

        document.getElementById("game").innerHTML = playerFieldHTML + this.actionTemplate();

        this.diceImage = document.querySelector(".dice");
    }

    reset() {
        this.resetPlayerScore();

        this.diceImage.classList.remove("hidden");

        this.isGameStarting = true;
    }

    addPlayer(player) {
        if (player.name) {
            player.id = this.players.length + 1;
            this.players.push(player);
        }
    }

    setCurrentPlayer(player) {
        if (player) {
            this.currentPlayer = player;
        }
        else {
            this.currentPlayer = this.players[0];
        }

        this.currentPlayerIndex = this.currentPlayer.id - 1;

        this.removeClassPlayerActive();

        document.querySelector(`.player--${this.currentPlayer.id}`)?.classList.add("player--active");
    }

    removeClassPlayerActive() {
        [...document.querySelectorAll(".player")].map(playerEl => {
            if (playerEl.classList.contains("player--active")) {
                playerEl.classList.remove("player--active")
            }
        });
    }

    rollDiceClicked() {
        if (!this.isGameStarting) return this.gameShouldStart();

        const currentDice = this.pickRandomImages();

        this.diceImage.setAttribute("src", currentDice.src);

        if (currentDice.id == this.config.score_should_reset) {
            this.currentPlayer.realScore += this.currentPlayer.score;
            this.currentPlayer.score = 0;
            this.updateScore(this.currentPlayer);
            this.moveToNextPlayer();
        }
        else {
            this.currentPlayer.score += currentDice.id;
            this.updateScore(this.currentPlayer);
        }
    }

    playerWinner(player) {
        document.querySelector(`.player--${player.id}`).classList.add("player--winner");
    }

    holdClicked() {
        if (!this.isGameStarting) return this.gameShouldStart();

        this.currentPlayer.realScore += this.currentPlayer.score;

        this.updateScore(this.currentPlayer);

        this.moveToNextPlayer();
    }

    gameShouldStart() {
        if (!this.isGameStarting) {
            alert("Please click the new game");
        }
    }

    moveToNextPlayer() {
        this.setCurrentPlayer(this.players[this.currentPlayerIndex + 1]);
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
        return `<img src="dice-1.png" alt="Playing dice" class="dice" />
                <button class="btn btn--new">🔄 New game</button>
                <button class="btn btn--roll">🎲 Roll dice</button>
                <button class="btn btn--hold">📥 Hold</button> `
    }

    generateDice() {
        return Array.from({ length: this.config.image_sizes}, (_, num) => {
            return {
                id: num + 1,
                src: `dice-${num + 1}.png`
            }
        });
    }

    pickRandomImages() {
        const randomIndex = this.generateRandomNumber(0, this.config.image_sizes - 1);
        return this.images[randomIndex];
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    updateScore(player) {
        document.getElementById(`current--${player.id}`).innerHTML = player.score;
        document.getElementById(`score--${player.id}`).innerHTML = player.realScore;
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