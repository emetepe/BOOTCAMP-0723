// ----------------------------------------------------------------------
// Neoland JavaScript ES6 - Cuaderno 8 - Marta Pérez Romero
// ----------------------------------------------------------------------

// -----------------------------------------------------------------
// ** Iteración #1: Arrows **
// -----------------------------------------------------------------

/* Crea una arrow function que tenga dos parametros a y b y 
que por defecto el valor de a = 10 y de b = 5. Haz que la función muestre 
por consola la suma de los dos parametros. */
const sumArrow = (a = 10, b = 5) => {
  console.log(a + b);
};

// 1.1. Ejecuta esta función sin pasar ningún parametro
console.log(sumArrow());

// 1.2 Ejecuta esta función pasando un solo parametro
console.log(sumArrow(a));

// 1.3 Ejecuta esta función pasando dos parametros
console.log(sumArrow(a, b));

// -----------------------------------------------------------------
// ** Iteración #2: Destructuring **
// -----------------------------------------------------------------

/* 2.1 En base al siguiente javascript, crea variables en base a las propiedades 
del objeto usando object destructuring e imprimelas por consola. Cuidado, 
no hace falta hacer destructuring del array, solo del objeto. */
const game = {
  title: "The last us 2",
  gender: ["action", "zombie", "survival"],
  year: 2020,
};

// Creamos las tres variables y las igualamos al objeto game
let { title, gender, year } = game;

// Imprimimos cada una por separado para comprobar el destructuring del objeto
console.log(title);
console.log(gender);
console.log(year);

/* 2.2 En base al siguiente javascript, usa destructuring para crear 3 variables 
llamadas fruit1, fruit2 y fruit3, con los valores del array. Posteriormente
imprimelo por consola. */
const fruits = ["Banana", "Strawberry", "Orange"];

// Creamos las tres variables y las igualamos al array game
let [fruit1, fruit2, fruit3] = fruits;

// Imprimimos cada una por separado para comprobar el destructuring del array
console.log(fruit1);
console.log(fruit2);
console.log(fruit3);

/* 2.3 En base al siguiente javascript, usa destructuring para crear 2 
variables igualandolo a la función e imprimiendolo por consola. */
const animalFunction = () => {
  return { name: "Bengal Tiger", race: "Tiger" };
};

// Creamos las dos variables y la igualamos a la función
let { nombre, raza } = animalFunction();

// Mostramos resultados en una frase con un template
console.log(`El ${nombre} pertenece a la raza ${race}`);

/* 2.4 En base al siguiente javascript, usa destructuring para crear las 
variables name y itv con sus respectivos valores. Posteriormente crea 
3 variables usando igualmente el destructuring para cada uno de los años 
y comprueba que todo esta bien imprimiendolo. */
const car = { name: "Mazda 6", itv: [2015, 2011, 2020] };

// Creamos las variables name e itv, las igualamos al objeto y las imprimimos
let { name, itv } = car;
console.log(name, itv);

// Creamos las tres variables, las igualamos al array y las imprimimos
let [year1, year2, year3] = itv;
console.log(year1, year2, year3);

// -----------------------------------------------------------------
// ** Iteración #3: Spread Operator **
// -----------------------------------------------------------------

// 3.1 Dado el siguiente array, crea una copia usando spread operators.
const pointsList = [32, 54, 21, 64, 75, 43];

// Simplemente copiamos con ... y el array que queremos copiar
const pointsListCopy = [...pointsList];
console.log(pointsListCopy);

// 3.2 Dado el siguiente objeto, crea una copia usando spread operators.
const toy = { name: "Bus laiyiar", date: "20-30-1995", color: "multicolor" };

// Hacemos lo mismo que en el caso anterior pero con llaves, porque es un objeto
const toyCopy = { ...toy };
console.log(toyCopy);

//3.3 Dado los siguientes arrays, crea un nuevo array juntandolos usando spread operatos.
const pointsList = [32, 54, 21, 64, 75, 43];
const pointsLis2 = [54, 87, 99, 65, 32];

// Unimos los arrays colocando ... delante de cada uno, separados por coma
const pointListsJoined = [...pointsList, ...pointsLis2];

// 3.4 Dado los siguientes objetos. Crea un nuevo objeto fusionando los dos con spread operators.
const toy = { name: "Bus laiyiar", date: "20-30-1995", color: "multicolor" };
const toyUpdate = { lights: "rgb", power: ["Volar like a dragon", "MoonWalk"] };

// Hacemos lo mismo que en el caso anterior pero con llaves por ser objetos
const toysTogether = { ...toy2, ...toy2Update };
console.log(toysTogether);

/* 3.5 Dado el siguiente array. Crear una copia de él eliminando la posición 2 
pero sin editar el array inicial. De nuevo, usando spread operatos. */
const colors = ["rojo", "azul", "amarillo", "verde", "naranja"];

// Creamos una copia de colors con spread operator y corchetes por ser array
const colorsCopy = [...colors];

// Eliminamos con splice la posición 2, 1 solo elementos
copiaColors.splice(1, 1);

// Imprimimos por pantalla el array resultante
console.log(colorsCopy);

// -----------------------------------------------------------------
// ** Iteración #4: Map **
// -----------------------------------------------------------------

// 4.1 Dado el siguiente array, devuelve un array con sus nombres utilizando .map().
const users = [
  { id: 1, name: "Abel" },
  { id: 2, name: "Julia" },
  { id: 3, name: "Pedro" },
  { id: 4, name: "Amanda" },
];
// Hacemos el map sobre el array users quedándonos con el nombre
const names = users.map((users) => users.name);
console.log(names);

/* 4.2 Dado el siguiente array, devuelve una lista que contenga los valores de la propiedad 
.name y cambia el nombre a 'Anacleto' en caso de que empiece por 'A'. */
const users = [
  { id: 1, name: "Abel" },
  { id: 2, name: "Julia" },
  { id: 3, name: "Pedro" },
  { id: 4, name: "Amanda" },
];
// Hacemos lo mismo que en el caso anterior pero necesitamos un bucle para recorrer los objetos
// Añadimos la condición para que si empieza por A (con .startsWith(), lo cambie por Anacleto)
const names = users.map((users) => users.name);
for (element in names) {
  names[element].startsWith("A") && (names[element] = "Anacleto");
}
// Mostramos por pantalla el resultado
console.log(names);

/* 4.3 Dado el siguiente array, devuelve una lista que contenga los valores de la propiedad .name 
y añade al valor de .name el string ' (Visitado)' cuando el valor de la propiedad isVisited = true. */
const cities = [
  { isVisited: true, name: "Tokyo" },
  { isVisited: false, name: "Madagascar" },
  { isVisited: true, name: "Amsterdam" },
  { isVisited: false, name: "Seul" },
];
// Recorremos cities y si se ha visitado concatenamos (Visitado) en el propio array
for (city in cities) {
  cities[city].isVisited &&
    (cities[city].name = cities[city].name.concat(" (Visitado)"));
}
// Hacemos el map sobre el array modiicado, que ya incluye (Visitado) e imprimimos por pantalla
const newCities = cities.map((cities) => cities.name);
console.log(newCities);

// -----------------------------------------------------------------
// ** Iteración #5: Filter **
// -----------------------------------------------------------------

/* 5.1 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
con los valores que sean mayor que 18 */
const ages = [22, 14, 24, 55, 65, 21, 12, 13, 90];
// Filtramos añadiendo la condición con arrow function
const higherAges = ages.filter((age) => age > 18);
// Mostramos array resultante
console.log(higherAges);

/* 5.2 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
con los valores que sean par. */
const ages = [22, 14, 24, 55, 65, 21, 12, 13, 90];
// Filtramos añadiendo la condición con arrow function
const evenAges = ages.filter((age) => age % 2 == 0);
// Mostramos array resultante
console.log(evenAges);

/* 5.3 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
con los streamers que tengan el gameMorePlayed = 'League of Legends'. */
const streamers = [
  { name: "Rubius", age: 32, gameMorePlayed: "Minecraft" },
  { name: "Ibai", age: 25, gameMorePlayed: "League of Legends" },
  { name: "Reven", age: 43, gameMorePlayed: "League of Legends" },
  { name: "AuronPlay", age: 33, gameMorePlayed: "Among Us" },
];
// Filtramos añadiendo la condición con arrow function
const legendsStreamers = streamers.filter(
  (streamer) => streamer.gameMorePlayed == "League of Legends"
);
// Mostramos array resultante
console.log(legendsStreamers);

/* 5.4 Dado el siguiente array, utiliza .filter() para generar un nuevo array 
con los streamers que incluyan el caracter 'u' en su propiedad .name. Recomendamos 
usar la funcion .includes() para la comprobación. */
const streamers = [
  { name: "Rubius", age: 32, gameMorePlayed: "Minecraft" },
  { name: "Ibai", age: 25, gameMorePlayed: "League of Legends" },
  { name: "Reven", age: 43, gameMorePlayed: "League of Legends" },
  { name: "AuronPlay", age: 33, gameMorePlayed: "Among Us" },
];
// Filtramos añadiendo la condición con arrow function e .includes()
const uStreamers = streamers.filter((streamer) => streamer.name.includes("u"));
// Mostramos array resultante
console.log(uStreamers);

/* 5.5 utiliza .filter() para generar un nuevo array con los streamers que incluyan 
el caracter 'Legends' en su propiedad .gameMorePlayed. Recomendamos usar la funcion 
.includes() para la comprobación. Además, pon el valor de la propiedad .gameMorePlayed 
a MAYUSCULAS cuando .age sea mayor que 35. */

// Filtramos el primer array y lo incluimos en el nuevo si incluye la palabra pedida
const legendsIncludedStreamers = streamers.filter((streamer) =>
  streamer.gameMorePlayed.includes("Legends")
);
// Recorremos el nuevo array con for...in y si se cumple la condición añadimos la cadena en mayúsculas
for (streamer in legendsIncludedStreamers) {
  legendsIncludedStreamers[streamer].age > 26 &&
    (legendsIncludedStreamers[streamer].gameMorePlayed =
      legendsIncludedStreamers[streamer].gameMorePlayed.toUpperCase());
}
// Mostramos array resultante
console.log(legendsIncludedStreamers);

/* 5.6 Dado el siguiente html y javascript, utiliza .filter() para mostrar por consola 
los streamers que incluyan la palabra introducida en el input. De esta forma, si 
introduzco 'Ru' me deberia de mostrar solo el streamer 'Rubius'. Si
introduzco 'i', me deberia de mostrar el streamer 'Rubius' e 'Ibai'. */
const input = document.querySelector(
  `input[data-function='toFilterStreamers']`
);
const div = document.createElement("div");
document.body.appendChild(div);

const streamers = [
  { name: "Rubius", age: 32, gameMorePlayed: "Minecraft" },
  { name: "Ibai", age: 25, gameMorePlayed: "League of Legends" },
  { name: "Reven", age: 43, gameMorePlayed: "League of Legends" },
  { name: "AuronPlay", age: 33, gameMorePlayed: "Among Us" },
];

const encontrar = (e) => {
	div.innerHTML = "";
	if (e.target.value !== "") {
	  streamers.forEach((element) => {
		if (element.name.toLocaleLowerCase().includes(e.target.value)) {
		  const parrafo = document.createElement("p");
		  parrafo.innerHTML = element.name;
		  div.appendChild(parrafo);
		}
	  });
	}
  };
  input.addEventListener("click", encontrar);

/* <!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
             <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <title>Document</title>
</head>
<body>
  <input type="text" data-function="toFilterStreamers"/>
</body>
</html> */

/* 5.7 Dado el siguiente html y javascript, utiliza .filter() para mostrar por consola 
los streamers que incluyan la palabra introducida en el input. De esta forma, si 
introduzco 'Ru' me deberia de mostrar solo el streamer 'Rubius'. Si introduzco 'i', 
me deberia de mostrar el streamer 'Rubius' e 'Ibai'.
En este caso, muestra solo los streamers filtrados cuando hagamos click en el button. */
const button = document.querySelector("button");

const streamers = [
  { name: "Rubius", age: 32, gameMorePlayed: "Minecraft" },
  { name: "Ibai", age: 25, gameMorePlayed: "League of Legends" },
  { name: "Reven", age: 43, gameMorePlayed: "League of Legends" },
  { name: "AuronPlay", age: 33, gameMorePlayed: "Among Us" },
];

const encontrar = () => {
  const input = document.querySelector("input");
  streamers.forEach((element) => {
    if (element.name.toLocaleLowerCase().includes(input.value)) {
      const parrafo = document.createElement("p");
      parrafo.innerHTML = element.name;
      document.body.appendChild(parrafo);
    }
  });
};

button.addEventListener("click", encontrar);

/* <!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
             <meta http-equiv="X-UA-Compatible" content="ie=edge">
             <title>Document</title>
</head>
<body>
  <input type="text" data-function="toFilterStreamers"/>
  <button data-function="toShowFilterStreamers">Filter</button>
</body>
</html> */

// -----------------------------------------------------------------
// ** Iteración #6: Find **
// -----------------------------------------------------------------

// 6.1 Dado el siguiente array, usa .find() para econtrar el número 100.
const numbers = [32, 21, 63, 95, 100, 67, 43];
// Creamos findHundred con la condición dada y mostramos por pantalla
const findHundred = numbers.find((number) => number === 100);
console.log(findHundred);

// 6.2 Dado el siguiente array, usa .find() para econtrar la pelicula del año 2010.
const movies = [
  { title: "Madagascar", stars: 4.5, date: 2015 },
  { title: "Origen", stars: 5, date: 2010 },
  { title: "Your Name", stars: 5, date: 2016 },
];
// Creamos findMovie con la condición dada y mostramos por pantalla
const findMovie = movies.find((movie) => movie.date === 2010);
console.log(findMovie);

/* 6.3 Dado el siguiente javascript, usa .find() para econtrar el alien de nombre 
'Cucushumushu' y la mutación 'Porompompero'. Una vez que los encuentres, usa 
spread operator para fusionarlos teniendo en cuenta que el objeto de la mutación 
lo queremos meter en la propiedad .mutation del objeto fusionado.*/
const aliens = [
  { name: "Zalamero", planet: "Eden", age: 4029 },
  { name: "Paktu", planet: "Andromeda", age: 32 },
  { name: "Cucushumushu", planet: "Marte", age: 503021 },
];
const mutations = [
  {
    name: "Porompompero",
    description:
      "Hace que el alien pueda adquirir la habilidad de tocar el tambor",
  },
  {
    name: "Fly me to the moon",
    description: "Permite volar, solo y exclusivamente a la luna",
  },
  {
    name: "Andando que es gerundio",
    description: "Invoca a un señor mayor como Personal Trainer",
  },
];
// Con .find() obtenemos los valores que queremos
const findAlien = aliens.find((alien) => alien.name === "Cucushumushu");
const findMutation = mutations.find(
  (mutation) => mutation.name === "Porompompero"
);
// Añadunos nueva propiedad al primer array
findAlien.mutation = "";
// Fusionamos ambos arrays con spread operator
const fusionado = { ...findAlien, ...findMutation };
console.log(fusionado);

// -----------------------------------------------------------------
// ** Iteración #7: Reduce **
// -----------------------------------------------------------------

/* 7.1 Dado el siguiente array, haz una suma de todos las notas de los examenes de 
los alumnos usando la función .reduce(). */

const exams = [
  { name: "Yuyu Cabeza Crack", score: 5 },
  { name: "Maria Aranda Jimenez", score: 1 },
  { name: "Cristóbal Martínez Lorenzo", score: 6 },
  { name: "Mercedez Regrera Brito", score: 7 },
  { name: "Pamela Anderson", score: 3 },
  { name: "Enrique Perez Lijó", score: 6 },
  { name: "Pedro Benitez Pacheco", score: 8 },
  { name: "Ayumi Hamasaki", score: 4 },
  { name: "Robert Kiyosaki", score: 2 },
  { name: "Keanu Reeves", score: 10 },
];
const totalScore = exams.reduce(
  (acc, singleScore) => acc + singleScore.score,
  0
);
console.log(totalScore);

/* 7.2 Dado el mismo array, haz una suma de todos las notas de los examenes de los 
alumnos que esten aprobados usando la función .reduce(). */
const totalScore = exams.reduce(
  (acc, singleScore) =>
    singleScore.score >= 5 ? acc + singleScore.score : acc,
  0
);
console.log(totalScore);

// 7.3 Dado el mismo array, haz la media de las notas de todos los examenes .reduce().
const totalScore = exams.reduce(
  (acc, singleScore) => acc + singleScore.score,
  0
);
let avgScore = totalScore / exams.length;
console.log(avgScore);

// -----------------------------------------------------------------
// ** Iteración #8: Bonus **
// -----------------------------------------------------------------

/* 8.1 Dado el siguiente javascript filtra los videojuegos por gender = 'RPG' usando 
.filter() y usa .reduce() para conseguir la media de sus .score. 
La función .find() también podría ayudarte para el contrar el genero 'RPG' en el 
array .gender. */

const videogames = [
  { name: "Final Fantasy VII", genders: ["RPG"], score: 9.5 },
  { name: "Assasins Creed Valhala", genders: ["Aventura", "RPG"], score: 4.5 },
  { name: "The last of Us 2", genders: ["Acción", "Aventura"], score: 9.8 },
  { name: "Super Mario Bros", genders: ["Plataforma"], score: 8.5 },
  { name: "Genshin Impact", genders: ["RPG", "Aventura"], score: 7.5 },
  {
    name: "Legend of Zelda: Breath of the wild",
    genders: ["RPG", "La cosa más puto bonita que he visto nunca"],
    score: 10,
  },
];
// Creamos array filtrado que incluya la condición en la propiedad .genders del array videogames
const filteredVideogames = videogames.filter((videogame) =>
  videogame.genders.includes("RPG")
);
// Creamos array sobre array anterior usando .reduce para sumar el total de las puntuaciones, partiendo de 0
const totalScore = filteredVideogames.reduce(
  (acc, videojuego) => acc + videojuego.score,
  0
);
// Creamos la variable avgScore y mostramos por pantalla la media de las puntuaciones
let avgScore = totalScore / videogames.length;
console.log(avgScore);
