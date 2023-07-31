import "./Topo.css";
import { getUser } from "../../global/state/globalState";
import JSConfetti from "js-confetti";
import {
  intervals,
  timeCleaner,
  resetTiming,
} from "../../utils/intervalManagement";

const user = getUser().name;
const template = () => `
<div class="container">
<div class="containerWording">
  <h1>USUARIO: ${user}<br>PUNTUACIÓN: <span id="score">0</span><br></h1>
</div>
<div class= "topo-game" id="boardTopo">
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
    <div class="hole"></div>
</div>
<div class="cursor"></div>
<div class="game-over">
    <span class="game-over-text"></span>
    <button id="btn_restart" class="restart">Volver a jugar</button>
</div>
`;

//const cursor = document.querySelector(".cursor");

let score = 0;
let segundos;
let intervalo;

const run = () => {
  const holes = [...document.querySelectorAll(".hole")];
  const i = Math.floor(Math.random() * holes.length);
  
  const hole = holes[i];
  let timer = null;

  const img = document.createElement("img");
  img.classList.add("mole");
  img.src =
    "https://res.cloudinary.com/dhninncj6/image/upload/v1690468595/mole_ztnjcc.png";

  img.addEventListener("click", () => {
    score += 10;
    const scoreEl = document.getElementById("score");
    scoreEl.textContent = score;
    img.src =
      "https://res.cloudinary.com/dhninncj6/image/upload/v1690468595/mole-whacked_v96mlu.png";
    clearTimeout(timer);
    setTimeout(() => {
      hole.removeChild(img);
      run();
    }, 500);
  });

  hole.appendChild(img);

  timer = setTimeout(() => {
    hole.removeChild(img);
    run();
  }, 1000);
};

const time = () => {
  segundos--;
  /*console.log(segundos);*/
  const containerTime = document.getElementById("time");
  const segundosTime = `<h4>${segundos}</h4>`;
  containerTime.innerHTML = segundosTime;
  checkInterval();
};

const checkInterval = () => {
  if (segundos === 0) {
    timeCleaner(intervalo, "intervalo");
    const topo = document.querySelector("#boardTopo");
    const templateEnd = `
    <div class="containerEnd">
      <h1> Has finalizado el juego</h1>
      
      <button id="resetButton">Volver a jugar</button>
    </div>`;

    if (ok === 6) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    } else {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        emojis: ["😪"],
      });
    }
    //!---------------------------------------------------------------------
    topo.innerHTML = "";
    topo.innerHTML = templateEnd;
    resetTiming();
    const reset = document.querySelector("#resetButton");
    reset.addEventListener("click", () => {
      segundos = 60;
      score = 0;
      document.querySelector("main").innerHTML = template();
    });
  }
};

export const PrintTopoGame = () => {
  document.querySelector("main").innerHTML = template();
  run();
};
