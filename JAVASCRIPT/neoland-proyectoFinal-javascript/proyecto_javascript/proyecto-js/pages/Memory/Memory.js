import "./Memory.css";
import JSConfetti from "js-confetti";
import {
  intervals,
  timeCleaner,
  resetTiming,
} from "../../utils/intervalManagement";
import { getUser } from "../../global/state/globalState";

const user = getUser().name;
const template = () => `
<div class="container">
  <div class="containerWording">
    <h1>USUARIO: ${user}<br>PUNTUACIÓN: <span id="score">0</span><br>TIEMPO:<span id="time" /></h1>
  </div>
    <section class="memory-game">
      <div class="memory-card" id="reyOros">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/card3_fe5txf.png"
          alt="Rey de Oros"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>
      <div class="memory-card" id="reyOros">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/card3_fe5txf.png"
          alt="Rey de Oros"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>

      <div class="memory-card" id="asEspadas">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta1_z5pvjw.png"
          alt="As de Espadas"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>
      <div class="memory-card" id="asEspadas">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta1_z5pvjw.png"
          alt="As de Espadas"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>

      <div class="memory-card" id="asOros">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta6_ogwx0a.png"
          alt="As de Oros"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>
      <div class="memory-card" id="asOros">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta6_ogwx0a.png"
          alt="As de Oros"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>

      <div class="memory-card" id="sotaBastos">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta5_i1rhx0.png"
          alt="Sota de Bastos"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>
      <div class="memory-card" id="sotaBastos">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta5_i1rhx0.png"
          alt="Sota de Bastos"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>

      <div class="memory-card" id="caballoOros">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta2_ncewv8.png"
          alt="Caballo de Oros"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>
      <div class="memory-card" id="caballoOros">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta2_ncewv8.png"
          alt="Caballo de Oros"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>

      <div class="memory-card" id="asBastos">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta4_cyjvu9.png"
          alt="As de Bastos"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>
      <div class="memory-card" id="asBastos">
        <img
          class="front-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381227/carta4_cyjvu9.png"
          alt="As de Bastos"
        />
        <img
          class="back-face"
          src="https://res.cloudinary.com/dhninncj6/image/upload/v1690381228/back_dkz4be.jpg"
          alt="Back card"
        />
      </div>
    </section>
  </div>
`;

let lockBoard = false;
let contador = 0;
let ok = 0;
let segundos;
let intervalo;
let score = 0;
//! -------------------------------------------------------la logica DEL JUEGO -----------
const flipCard = (e, card) => {
  if (!lockBoard) {
    card.classList.add("flip");
    const numberFlip = document.querySelectorAll(".flip");
    if (numberFlip.length === 2) {
      lockBoard = true;
      checkForMatch(numberFlip);
    }
  }
};

const checkForMatch = (numberFlip) => {
  contador++;
  let isMatch = numberFlip[0].id === numberFlip[1].id;
  isMatch ? disableCards(numberFlip) : unflipCards(numberFlip);
  if (isMatch) {
    score += 10;
    const scoreEl = document.getElementById("score");
    scoreEl.textContent = score;
  }
};

const disableCards = (numberFlip) => {
  ok++;
  numberFlip[0].removeEventListener("click", flipCard);
  numberFlip[1].removeEventListener("click", flipCard);
  numberFlip[0].classList.add("flipOk");
  numberFlip[1].classList.add("flipOk");
  numberFlip[0].classList.remove("flip");
  numberFlip[1].classList.remove("flip");

  resetBoard();
  ok === 6 && (segundos = 1);
};

function unflipCards(numberFlip) {
  lockBoard = true;

  setTimeout(() => {
    numberFlip[0].classList.remove("flip");
    numberFlip[1].classList.remove("flip");

    resetBoard();
  }, 1500);
}

const resetBoard = () => {
  lockBoard = false;
};

//! -------------------------------------- LA LOGICA DEL PINTADO DEL JUEGO --------------------------------
const shuffle = () => {
  const cards = document.querySelectorAll(".memory-card");
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
  addListeners(cards);
  segundos = 30;
  intervalo = intervals(time, 1000);
};

const addListeners = (cards) => {
  cards.forEach((card) =>
    card.addEventListener("click", (e) => flipCard(e, card))
  );
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
    const memory = document.querySelector(".memory-game");
    const templateEnd = `
    <div class="containerEnd">
      <h1> Has finalizado el juego</h1>
      <h4>${ok === 6 ? "Has ganado🎉" : "Has perdido 💥"}</h4>
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
    memory.innerHTML = "";
    memory.innerHTML = templateEnd;
    resetTiming();
    const reset = document.querySelector("#resetButton");
    reset.addEventListener("click", () => {
      contador = 0;
      ok = 0;
      segundos = 60;
      score = 0;
      document.querySelector("main").innerHTML = template();
      shuffle();
    });
  }
};

export const PrintMemoryGame = () => {
  document.querySelector("main").innerHTML = template();
  shuffle();
};
