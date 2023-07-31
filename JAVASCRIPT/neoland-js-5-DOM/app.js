// ----------------------------------------------------------------------
// Neoland JavaScript DOM - Cuaderno 5 - Marta Pérez Romero
// ----------------------------------------------------------------------

// Iteración #1: Interacción con el DOM //

/* Dado el siguiente HTML 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button class="showme">Pillame!</button>
		<h1 id="pillado">Aqui estoy 8)</h1>
		<p>Soy el power ranger Amarillo</p>
    <p>Soy el power ranger Rojo</p>
    <p>Soy el power ranger Azul</p>
    <p>Soy el power ranger Negro</p>
		<h4 class="pokemon">Bulbasaur</h4>
    <h4 class="pokemon">Charmander</h4>
    <h4 class="pokemon">Pikachu</h4>
    <h4 class="pokemon">Squirtle</h4>
		<span data-function="testMe">Batman</span>
    <span data-function="testMe">Robin</span>
    <span data-function="testMe">Rick</span>
    <span data-function="testMe">Morty</span>
</body>
</html>
*/ 

// 1.1 Usa querySelector para mostrar por consola el botón con la clase .showme.
const showme = document.querySelector(".showme");
console.log(showme.innerHTML);

// 1.2 Usa querySelector para mostrar por consola el h1 con el id #pillado.
const pillado = document.querySelector("#pillado");
console.log(pillado.innerHTML);

// 1.3 Usa querySelector para mostrar por consola todos los p.
const parrafos = document.querySelectorAll("p");
console.log(parrafos);

// 1.4 Usa querySelector para mostrar por consola todos los elementos de la clase .pokemon.
const pokemon = document.querySelectorAll(".pokemon");
console.log(pokemon);


// 1.5 Usa querySelector para mostrar por consola todos los elementos con el atributo data-function="testMe".
const dataFunction = document.querySelectorAll("span[data-function='testMe']");
console.log(dataFunction);

// 1.6 Usa querySelector para mostrar por consola el 3 personaje con el atributo data-function="testMe".
console.log(dataFunction[2]);

// Iteración #2 Modificando el DOM //

/* Dado el siguiente HTML 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
	<h2 class="fn-insert-here"></h2>
	<p class="fn-remove-me">Eliminame!</p>
  <p>No me elimines!</p>
  <p>No me elimines!</p>
  <p class="fn-remove-me">Eliminame!</p>
  <p>No me elimines!</p>
  <p class="fn-remove-me">Eliminame!</p>
  <p class="fn-remove-me">Eliminame!</p>
  <p>No me elimines!</p>
	<div></div><div></div>
	<div class="fn-insert-here"></div>
  <div class="fn-insert-here"></div>
</body>
</html> 
*/

// 2.1 Inserta dinámicamente en eun html un div vacío con javascript
const div = document.createElement("div");
document.body.appendChild(div);

/* 2.2 Inserta dinámicamente en eun html un div que contenga una p con javascript
 2.3 Inserta dinámicamente en eun html un div que contenga 6 p utilizando un loop con javascript */
 for (let index = 0; index < 6; index++) {
  const p = document.createElement("p");
  div.appendChild(p);
}
 
// 2.4 Inserta dinámicamente con javascript en un html una p con el texto "Soy dinámico!"
const parrafo = document.createElement("p");
let texto = document.createTextNode("Soy dinámico!");
parrafo.appendChild(texto);
document.body.appendChild(parrafo);

// 2.5 Inserta en el h2 con la clase .f-insert-here el texto "Wubba Lubba dub dub"
const textoh2 = "Wubba Lubba dub dub";
const h2Insert = document.querySelectorAll(".fn-insert-here");
h2Insert.forEach((element) => {
  element.innerText = textoh2;
});

// 2.6. Basándote en el siguiente array crea una lista ul > li con los textos del array 
const apps = ["Facebook", "Netflix", "Instagram", "Snapchat", "Twitter"];
const ul = document.createElement("ul");
document.body.appendChild(ul);
apps.forEach((element) => {
  const li = document.createElement("li");
  let texto = document.createTextNode(element);
  li.appendChild(texto);
  ul.appendChild(li);
});

// 2.7 Elimina todos los nodos que tengan la clase .fn-remove-me
const removeList = document.querySelectorAll(".fn-remove-me");
removeList.forEach((element) => {
  element.remove();
});

// 2.8 Inserta una p con el texto "Voy en medio!" entre los dos div. Recuerda que solo puedes insertar elementos con .appendChild
const p2 = document.querySelector("div");
p2.insertAdjacentHTML("afterbegin", `<p>Voy en medio!<p>`);

// 2.9 Inserta p con el texto "Voy dentro!", dentro de todos los div con la clase .fn-insert-here
const addList = document.querySelectorAll(".fn-insert-here");
addList.forEach((element) => {
  const parrafoAux = document.createElement("p");
  let textoAux = document.createTextNode("Voy dentro!");
  parrafoAux.appendChild(textoAux);
  element.appendChild(parrafoAux);
});