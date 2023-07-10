// ----------------------------------------------------------------------
// Neoland JavaScript Review Basics - Cuaderno 4 - Marta Pérez Romero
// ----------------------------------------------------------------------

// -----------------------------------------------------------------
// ** Iteración #1: Mix for e includes **
// -----------------------------------------------------------------

/* 1.1. Dado el siguiente javascript usa forof para recorrer el array de películas, 
genera un nuevo array con las categorías de las películas e imprime por consola el 
array de categorías. Ten en cuenta que las categorías no deberían repetirse. 
Para filtrar las categorías puedes ayudarte de la función .includes() */

const movies = [
    {title: 'Madaraspar', duration: 192, categories: ['comedia', 'aventura']},
    {title: 'Spiderpan', duration: 122, categories: ['aventura', 'acción']},
    {title: 'Solo en Whatsapp', duration: 223, categories: ['comedia', 'thriller']},
    {title: 'El gato con guantes', duration: 111, categories: ['comedia', 'aventura', 'animación']},
]
// Creamos array vacío para luego introducir las categorías únicas
const catArray = [];
// Recorremos array movies con for..of
for (movie of movies) {
    // También con for..of recorremos categorías y si cumple condición, introducmos en array nuevo
    for (category of movie.categories) {
        catArray.includes(category) == false && catArray.push(category)
    }
}
// Mostramos por pantalla array nuevo
console.log(catArray)

// -----------------------------------------------------------------
// ** Iteración #2: Mix fors **
// -----------------------------------------------------------------

/* 2.1. Dado el siguiente javascript usa forof y forin para hacer la media 
del volumen de todos los sonidos favoritos que tienen los usuarios. */
const users = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    },
]

// Recorremos array users con for..of para obtener media de volumen de cada usuario
// Creamos las variables que vamos a necesitar para hallar este dato
for (user of users) {
    let totalSongs = 0;
    let totalVol = 0;
    // Por cada usuario recorremos la propiedad .favoriteSounds con for..in y hallamos la media
    for (song in user.favoritesSounds) {
        totalVol += user.favoritesSounds[song].volume;
        totalSongs++;
    }
    console.log(`La media de volumen de ${user.name} es igual a ${totalVol/totalSongs}`);
  }
  
  // Recorremos array user con for..of de nuevo y creamos variables para calcular media total de todos los usuarios
  let totalVols = 0;
  let countVols = 0;
  for (user2 of users) {
    // Por cada canción recorremos la propiedad .favoriteSounds con for..in y hallamos la media
    for (song2 in user2.favoritesSounds) {
      totalVols += user2.favoritesSounds[song2].volume;
      countVols++;
    }
  }
  // Este dato nos sirve para comparar la media de cada usuario con la media total
  console.log(`La media de volumen total de todas las canciones y todos los usuarios es de ${totalVols / countVols}`);

// -----------------------------------------------------------------
// ** Iteración #3: Mix fors **
// -----------------------------------------------------------------

/* 3.1. Dado el siguiente javascript usa forof y forin para saber cuantas veces 
ha sido cada sonido agregado por los usuarios a favorito. Para ello recorre la 
lista de usuarios y usa forin para recoger el nombre de los sonidos que el usuario 
tenga como favoritos. Una vez accedas a ellos piensa en la mejor forma de hacer un 
conteo de cada vez que ese sonido se repita como favorito en cada usuario.
Este ejercicio es un poco complicado con los conocimientos actuales pero...a la vez un 
buen reto y oportunidad para comprender que hay muchas formas de hacer las cosas en javascript. */
const users = [
    {name: 'Manolo el del bombo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 50},
            rain: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'Mortadelo',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 30},
            shower: {format: 'ogg', volume: 55},
            train: {format: 'mp3', volume: 60},
        }
    },
    {name: 'Super Lopez',
        favoritesSounds: {
            shower: {format: 'mp3', volume: 50},
            train: {format: 'ogg', volume: 60},
            firecamp: {format: 'mp3', volume: 80},
        }
    },
    {name: 'El culebra',
        favoritesSounds: {
            waves: {format: 'mp3', volume: 67},
            wind: {format: 'ogg', volume: 35},
            firecamp: {format: 'mp3', volume: 60},
        }
    },
]
// Creamos arrow function checkTimes que toma un array como parámetro
const checkTimes = (array) => {
    // Creamos objeto count vacío para añadir sonidos y contabilizar las veces que se añade una canción
    let count = {};
    // Recorremos el array elemento a elemento con un for...of
    for (element of array) {
        // 
        const {favoritesSounds} = element;
        for (sound in favoritesSounds) {
            /* Usamos .hasOwnProperty (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
             que nos dice si el objeto tiene una propiedad como suya propia y no heredada. Esto nos indica si debemos incrementar el conteo o
             dejarlo con el valor 1 */
            count.hasOwnProperty(sound) ? count[sound] += 1 : count[sound] = 1;}
    }
    return count;
  };
  console.log(checkTimes(users));

// -----------------------------------------------------------------
// ** Iteración #4: Métodos findArrayIndex **
// -----------------------------------------------------------------

/* 4.1. Crea una función llamada `findArrayIndex` que reciba como parametros 
un array de textos y un texto y devuelve la posición del array cuando el valor 
del array sea igual al valor del texto que enviaste como parametro. 
Haz varios ejemplos y compruebalos. Sugerencia de función: */
// Ej array:
const animales = ['Caracol', 'Mosquito', 'Salamandra', 'Ajolote'];
// Creamos función pedida con los argumentos pedidos, array y text como arrow function
const findArrayIndex = (array, text) => {
    // Utilizamos un ternario con la condición de si el texto no está en el array con .includes()
    // Si no lo encontramos mostramos en la salida que el texto no existe.
    array.includes(text) == false ? console.log(`${text} no existe en el array.`) 
        // Si el texto está hacemos un forEach para recorrer el array y obtener la posición
        : array.forEach((item, index) => {
        item == text && console.log(`${text} está en la posicion ${index}.`);});
  };
// Ejecutamos la función para una palabra cualquiera del array y para otra que no está en él 
findArrayIndex(animales, "Salamandra");
findArrayIndex(animales, "Culebra");


// -----------------------------------------------------------------
// ** Iteración #5: Función rollDice **
// -----------------------------------------------------------------

/* 5.1. Crea una función llamada rollDice() que reciba como parametro el numero de 
caras que queramos que tenga el dado que deberá silumar el codigo dentro de la función. 
Como hemos dicho, que la función use el parametro para simular una tirada de dado y 
retornar el resultado. Si no se te ocurre como hacer un numero aleatorio no te preocupes! 
busca información sobre la función de javascript Math.random(); */

const rollDice = (sides) => {
    // Usamos dos funciones de la librería Math:
    // Math.round(), retorna el valor del número redondeado al entero más cercano
    // Math.random(), nos genera un número aleatorio
    // Hacemos un ternario para que no pueda salirnos un 0, que no tiene sentido
    return Math.round(Math.random() * sides) == 0 ? console.log("Prueba de nuevo") : Math.round(Math.random() * sides);
  };
  // Mostramos resultado con un número cualquiera
  console.log(rollDice(8));

// -----------------------------------------------------------------
// ** Iteración #6: Función swap **
// -----------------------------------------------------------------

/* 6.1. Crea una función llamada `swap()` que reciba un array y dos parametros 
que sean indices del array. La función deberá intercambiar la posición de los 
valores de los indices que hayamos enviado como parametro. Retorna el array resultante.
Sugerencia de array: */
const arreglo = ['Mesirve', 'Cristiano Romualdo', 'Fernando Muralla', 'Ronalguiño'];

const swap = (newArray, index1, index2) => {
    // Creamos dos variables para almacenar dos palabras que nos servirán de comodín para el intercambio
    let firstWord;
    let secondWord;
    // Recorremos el array intercambiado con un forEach
    newArray.forEach((item, index) => {
        /* Si el índice en el que estamos coincide con el index1 por parámetro, 
        asignamos a item la primera palabra, si coincide con el index2, lo asignamos a la segunda palabra*/
        index == index1 && (firstWord = item); index == index2 && (secondWord = item);
    });
    // Realizamos el intercambio de índices y de palabras
    newArray[index1] = secondWord; newArray[index2] = firstWord;
    return newArray;
  };
// Sacamos por pantalla el resultado, para las posiciones primera y penúltima, por ejemplo
console.log(swap(arreglo, 0, 3));



