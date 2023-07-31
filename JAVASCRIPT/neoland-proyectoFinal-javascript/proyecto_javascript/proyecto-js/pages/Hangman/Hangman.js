import "./Hangman.css";
import { getWord, finalWord, letterChecking } from "../../components";
import { getUser } from "../../global/state/globalState";

const user = getUser().name;
const template = () => ` 
<div id="container">
<div class="containerWording">
    <h1>USUARIO: ${user}</h1>
  </div>
  <div id="containerHangman">
    <div id="boardHangman">
      <img id="hangged" />
      <span id="attemps"></span>
      <span id="msg"></span><span id="word"></span><br />
      <input
        id="inputLetter"
        type="text"
        maxlength="1"
        minlength="1"
        name="p0"
      />
      <button id="sendLetter">Comprobar letra</button>
    </div>
  </div>
</div>`;

const addEventListeners = () => {
  // Declaraciones y DOM
  const butt = document.getElementById("sendLetter");
  const actualWord = getWord();
  const actualWordMin = actualWord.toLowerCase();
  const word = document.getElementById("word");
  word.innerText = actualWord.replace(/./g, "_ ");
  const choosenLetters = [];
  let attempsCount = 0;
  const maxAttempsCount = 8;
  const attempsDom = document.getElementById("attemps");
  const msg = document.getElementById("msg");
  attempsDom.innerText = attempsCount;
  const imgSource = [
    "https://res.cloudinary.com/dhninncj6/image/upload/v1690665718/0_acdz3f.png",
    "https://res.cloudinary.com/dhninncj6/image/upload/v1690665718/1_a3meam.png",
    "https://res.cloudinary.com/dhninncj6/image/upload/v1690665718/2_q1u7m8.png",
    "https://res.cloudinary.com/dhninncj6/image/upload/v1690665718/3_alkpov.png",
    "https://res.cloudinary.com/dhninncj6/image/upload/v1690665718/4_wesiq3.png",
    "https://res.cloudinary.com/dhninncj6/image/upload/v1690665718/5_dmsm1q.png",
    "https://res.cloudinary.com/dhninncj6/image/upload/v1690665718/6_aomevj.png",
  ];
  let img = document.getElementById("hangged");
  img.src = imgSource[attempsCount];

  butt.addEventListener("click", () => {
    if (attempsCount > maxAttempsCount) {
      PrintHangmanGame();
    }
    const letter = document.getElementById("inputLetter").value;
    if (letter.length == 0) {
      return;
    }
    const letterMin = letter.toLowerCase();

    if (letterChecking(choosenLetters, letterMin)) {
      msg.innerText = "Letra repetida.";
      return;
    } else {
      choosenLetters.push(letterMin);
    }

    if (actualWordMin.includes(letterMin)) {
      msg.innerText = "Correcto, has acertado la letra " + letterMin + ". ";
      word.innerText = finalWord(actualWord, choosenLetters);
    } else {
      msg.innerText = "Fallo, prueba con otra letra.";
      attempsCount = attempsCount + 1;
      attempsDom.innerText = attempsCount;
      img.src = imgSource[attempsCount];
    }
    if (choosenLetters.length == actualWordMin.length) {
      msg.innerText = "¡Bien! Has acertado la palabra.";
      butt.innerText = "Restablecer";
      attempsCount = 1 + maxAttempsCount;
    }
    if (attempsCount == maxAttempsCount) {
      attempsCount = attempsCount + 1;
      msg.innerText = "Has perdido.";
      butt.innerText = "Volver a jugar";
    }
  });
};

export const PrintHangmanGame = () => {
  document.querySelector("main").innerHTML = template();
  addEventListeners();
};
