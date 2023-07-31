import "./TicTacToe.css";
import JSConfetti from "js-confetti";
import { getUser } from "../../global/state/globalState";

const user = getUser().name;
const template = () => `
<div class="container">
<div class="containerWording">
<h1>USUARIO: ${user}</h1>
</div>
<div class="TTT-game">
  <div class="boadTTT">
    <div class="grid-cell" data-value="0"></div>
    <div class="grid-cell" data-value="1"></div>
    <div class="grid-cell" data-value="2"></div>
    <div class="grid-cell" data-value="3"></div>
    <div class="grid-cell" data-value="4"></div>
    <div class="grid-cell" data-value="5"></div>
    <div class="grid-cell" data-value="6"></div>
    <div class="grid-cell" data-value="7"></div>
    <div class="grid-cell" data-value="8"></div>
  </div>
</div>
`;

const addListeners = () => {

  const game = {
    xTurn: true,
    xState: [],
    oState: [],
    winningStates: [
      // Rows
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],

      // Columns
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],

      // Diagonal
      ["0", "4", "8"],
      ["2", "4", "6"],
    ],
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    const isCell = target.classList.contains("grid-cell");
    const isDisabled = target.classList.contains("disabled");

    if (isCell && !isDisabled) {
      const cellValue = target.dataset.value;

      game.xTurn === true
        ? game.xState.push(cellValue)
        : game.oState.push(cellValue);

      target.classList.add("disabled");
      target.classList.add(game.xTurn ? "x" : "o");

      game.xTurn = !game.xTurn;

      // If all cells are disabled, then its draw
      if (!document.querySelectorAll(".grid-cell:not(.disabled)").length) {
        const TTT = document.querySelector(".TTT-game");
        const templateEnd = `
        <div class="containerEnd">
          <button id="resetButton">Volver a jugar</button>
        </div>`;
        TTT.innerHTML = "";
        TTT.innerHTML = templateEnd;
        const reset = document.querySelector("#resetButton");
        reset.addEventListener("click", () => {
          document.querySelector("main").innerHTML = template();
        });

        const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ["😪"],
      });
        game.xTurn = true;
        game.xState = [];
        game.oState = [];

      }

      game.winningStates.forEach((winningState) => {
        const xWins = winningState.every((state) =>
          game.xState.includes(state)
        );
        const oWins = winningState.every((state) =>
          game.oState.includes(state)
        );

        if (xWins || oWins) {

          const TTT = document.querySelector(".TTT-game");
          const templateEnd = `
          <div class="containerEnd">
            <button id="resetButton">Volver a jugar</button>
          </div>`;
          TTT.innerHTML = "";
          TTT.innerHTML = templateEnd;
          const reset = document.querySelector("#resetButton");
          reset.addEventListener("click", () => {
            document.querySelector("main").innerHTML = template();
          });

          const jsConfetti = new JSConfetti();
          jsConfetti.addConfetti();
          game.xTurn = true;
          game.xState = [];
          game.oState = [];
          
        }
      });
    }
  });
};


export const PrintTicTacToePage = () => {
  document.querySelector("main").innerHTML = template();
  addListeners();
};
