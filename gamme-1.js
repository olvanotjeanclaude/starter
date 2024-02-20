import { DiceGame } from "./module/DiceGame.js";
import { Player } from "./module/Player.js";

const diceGame = new DiceGame();

const olvanot = new Player("Olvanot");
// const jonnia = new Player("Jonnia");
const ivanna = new Player("Ivanna");
const bona = new Player("Bona");

diceGame.addPlayer(olvanot);
// diceGame.addPlayer(jonnia);
diceGame.addPlayer(ivanna);
diceGame.addPlayer(bona);

diceGame.run();

diceGame.setCurrentPlayer(ivanna);