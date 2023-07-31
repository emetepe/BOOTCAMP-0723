// ----------------------------------------------------------------------
// Neoland JavaScript REVIEW DOM - Cuaderno 7 - Marta Pérez Romero
// ----------------------------------------------------------------------

// Iteración #1: Interacción con el DOM //

/* Dado el siguiente HTML 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="exercise-1.js" defer></script>
    <title>Document</title>
</head>
<body>
    <p class="fn-remove-me">Bye bye</p>
		<div data-function="printHere"></div>
</body>
</html>
*/ 

// 1.1 Basandote en el array siguiente, crea una lista ul > li 
// dinámicamente en el html que imprima cada uno de los paises.
const countries = ['Japón', 'Nicaragua', 'Suiza', 'Australia', 'Venezuela'];

const ul = document.createElement("ul");
document.body.appendChild(ul);
const list = () => {
  countries.forEach((element) => {
    const li = document.createElement("p");
    li.innerHTML = element;
    ul.appendChild(li);
  });
};
list();

// 1.2 Elimina el elemento que tenga la clase .fn-remove-me.
const removeClass = () => {
    const remove = document.querySelector(".fn-remove-me");
    remove.remove();
  };
  removeClass();

// 1.3 Utiliza el array para crear dinamicamente una lista ul > li de elementos 
// en el div de html con el atributo data-function="printHere".
const cars = ['Mazda 6', 'Ford fiesta', 'Audi A4', 'Toyota corola'];

const div = document.querySelector("div[data-function='printHere']");
const ul2 = document.createElement("ul");
div.appendChild(ul2);
document.body.appendChild(ul);
const list = () => {
  cars.forEach((element) => {
    const li = document.createElement("p");
    li.innerHTML = element;
    ul2.appendChild(li);
  });
};
list();

// 1.4 Crea dinamicamente en el html una serie de divs que contenga un elemento 
// h4 para el titulo y otro elemento img para la imagen.
const countries = [
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=1'}, 
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=2'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=3'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=4'},
	{title: 'Random title', imgUrl: 'https://picsum.photos/300/200?random=5'}
];

const app = document.querySelector("#app");
countries.forEach((element) => {
  const container = document.createElement("div");
  app.appendChild(container);
  const tit = document.createElement("h4");
  tit.textContent = element.title;
  container.appendChild(tit);
  const img = document.createElement("img");
  img.src = element.imgUrl;
  container.appendChild(img);
});

// 1.5 Basandote en el ejercicio anterior. Crea un botón que elimine el último 
// elemento de la serie de divs.
const removeButton = document.createElement("button");
removeButton.textContent = "Remove last element in divs";
removeButton.addEventListener("click", () => {
  const divsGroup = document.querySelectorAll(`#app div`);
  console.log(divsGroup[divsGroup.length - 1]);
  divsGroup[divsGroup.length - 1].remove();
});
app.appendChild(removeButton);

// 1.6 Basandote en el ejercicio anterior. Crea un botón para cada uno de los 
// divs que elimine ese mismo elemento del html.
const divsGroup = document.querySelectorAll(`#app div`);
for (const div of divsGroup) {
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove this div";
  removeButton.addEventListener("click", () => {
    div.remove();
  });
  div.appendChild(removeButton);
}