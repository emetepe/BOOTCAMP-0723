import "./Trivial.css";
import { basePreguntas } from "../../utils/basePreguntas";
import { getUser } from "../../global/state/globalState";

const user = getUser().name;
const template = () => `
<div class="container">
<div class="containerWording">
<h1>USUARIO: ${user}</h1>
</div>
  <div class="puntaje" id="puntaje"></div>
  <div class="encabezadoTrivial">
    <div class="categoria" id="categoria"></div>
    <div class="numero" id="numero"></div>
    <div class="pregunta" id="pregunta"></div>
    <img src="#" class="imagen" id="imagen" />
  </div>
  <div class="btnTrivial" id="btn1"></div>
  <div class="btnTrivial" id="btn2"></div>
  <div class="btnTrivial" id="btn3"></div>
  <div class="btnTrivial" id="btn4"></div>
  
</div>
`;

let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;
let numPreguntas = basePreguntas.length;
let pregunta;
let posibles_respuestas;
let preguntas_hechas = 0;
let preguntas_correctas = 0;
let npreguntas = [];
let suspender_botones = false;

const addListeners = () => {
  const btnAnswer1 = document.getElementById("btn1");
  btnAnswer1.addEventListener("click", (e) => {
    oprimir_btn(1);
  });

  const btnAnswer2 = document.getElementById("btn2");
  btnAnswer2.addEventListener("click", (e) => {
    oprimir_btn(2);
  });

  const btnAnswer3 = document.getElementById("btn3");
  btnAnswer3.addEventListener("click", (e) => {
    oprimir_btn(3);
  });

  const btnAnswer4 = document.getElementById("btn4");
  btnAnswer4.addEventListener("click", (e) => {
    oprimir_btn(4);
  });
  escogerPreguntaAleatoria();
};

const escogerPreguntaAleatoria = () => {
  let n;
  preguntas_aleatorias
    ? (n = Math.floor(Math.random() * numPreguntas))
    : (n = 0);
  while (npreguntas.includes(n)) {
    n++;
    if (n >= numPreguntas) {
      n = 0;
    }
    if (npreguntas.length == numPreguntas) {
      // El juego se reinicia
      if (mostrar_pantalla_juego_términado) {
        swal.fire({
          title: "Juego finalizado",
          text:
            "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas - 1),
          icon: "success",
        });
      }
      if (reiniciar_puntos_al_reiniciar_el_juego) {
        preguntas_correctas = 0;
        preguntas_hechas = 0;
      }
      npreguntas = [];
    }
  }
  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);
};

const escogerPregunta = (n) => {
  pregunta = basePreguntas[n]; // basePreguntas
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }
  style("imagen").objectFit = pregunta.objectFit;
  desordenarRespuestas(pregunta);
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
    setTimeout(() => {
      select_id("imagen").setAttribute("src", "");
    }, 500);
  }
};

const select_id = (id) => {
  return document.getElementById(id);
};

const desordenarRespuestas = (pregunta) => {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
};

let btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4"),
];

const style = (id) => {
  return select_id(id).style;
};

const oprimir_btn = (i) => {
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  console.log(posibles_respuestas[i]);
  if (posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    console.log(btn_correspondiente[i]);
    btn_correspondiente[i].style.background = "lightgreen";
  } else {
    console.log(btn_correspondiente[i]);
    btn_correspondiente[i].style.background = "pink";
  }
  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "lightgreen";
      break;
    }
  }
  setTimeout(() => {
    reiniciar();
    suspender_botones = false;
  }, 3000);
};

const reiniciar = () => {
  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }
  escogerPreguntaAleatoria();
};

export const PrintTrivialGame = () => {
  document.querySelector("main").innerHTML = template();
  addListeners();
};


