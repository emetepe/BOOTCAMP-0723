import { initController } from "../../utils";
import "./Dashboard.css"

const templateDashboard = () => `
<div id="containerDashboard">
    <ul>
        <li>
            <figure id="navigatePokemon">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690620433/pokeapi_icon1_z6usq6.png" alt="Go to Pokemon page" />
                <h2>P0KEMON</h2>
            </figure>
        </li>
        <li>
            <figure id="navigateTrivial">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690319092/5691719_zbpgpa.png" alt="Go to Trivial game" />
                <h2>TRIVIAL</h2>
            </figure>
        </li>
        <li>
            <figure id="navigateMemory">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690170567/219-2197760_brain-training-version-memory-game-icon_iecl0m.png" alt="Go to Memory game" />
                <h2>MEMORY GAME</h2>
            </figure>
        </li>
        <li>
            <figure id="navigateSnake">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690566369/1bd09b39b8034b31e0592733f8219f7d-snake-cartoon-circle-icon_ns6f0x.png" alt="Go to Snake game" />
                <h2>SNAKE</h2>
            </figure>
        </li>
        <li>
            <figure id="navigateTicTacToe">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690320007/2076261_as2fob.png" alt="Go to Tic Tac Toe game" />
                <h2>TIC TAC TOE</h2>
            </figure>
        </li>
        <li>
            <figure id="navigateTopo">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690449762/2045507_jpeaav.png" alt="Go to Topo game" />
                <h2>TOPO</h2>
            </figure>
        </li>
        <li>
            <figure id="navigateHangman">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690663950/hangman_ey5cce.png" alt="Go to Hangman game" />
                <h2>HANGMAN</h2>
            </figure>
        </li>
        <li>
            <figure id="navigateTodoList">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690622207/todolist_pjnen3.png" alt="Go to TodoList App" />
                <h2>TODO LIST</h2>
            </figure>
        </li>
        <li>
            <figure id="navigateTodoDD">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690622207/dragdroplist_bhkp0i.png" alt="Go to TodoList DragDrop App" />
                <h2>TODO LIST DRAG&DROP</h2>
            </figure>
        </li>
    </ul>

</div>
`;

const addEventListeners = () => {
    const navigatePokemon = document.getElementById("navigatePokemon");
    navigatePokemon.addEventListener("click", () => {
      initController("Pokemon");
    });
    const navigateTrivial = document.getElementById("navigateTrivial");
    navigateTrivial.addEventListener("click", () => {
      initController("Trivial");
    });
    const navigateMemory = document.getElementById("navigateMemory");
    navigateMemory.addEventListener("click", () => {
      initController("Memory");
    });
    const navigateSnake = document.getElementById("navigateSnake");
    navigateSnake.addEventListener("click", () => {
      initController("Snake");
    });
    const navigateTicTacToe = document.getElementById("navigateTicTacToe");
    navigateTicTacToe.addEventListener("click", () => {
      initController("TicTacToe");
    });
    const navigateTopo = document.getElementById("navigateTopo");
    navigateTopo.addEventListener("click", () => {
      initController("Topo");
    });
    const navigateHangman = document.getElementById("navigateHangman");
    navigateHangman.addEventListener("click", () => {
      initController("Hangman");
    });
    const navigateTodoList = document.getElementById("navigateTodoList");
    navigateTodoList.addEventListener("click", () => {
      initController("TodoList");
    });
    const navigateTodoDD = document.getElementById("navigateTodoDD");
    navigateTodoDD.addEventListener("click", () => {
      initController("TodoDD");
    });
  };

export const PrintTemplateDashboard = () => {
    document.querySelector("main").innerHTML = templateDashboard();
    document.querySelector("nav").style.display = "flex";
    addEventListeners();
};