// Ejercicios JS functions

// -----------------------------------------------------------------
// **Iteración #1: Buscar el máximo**
// -----------------------------------------------------------------

// 1.1. Completa la función que tomando dos números como argumento devuelva el más alto.

// ------------- Con arrow function y ternario ----------------

const max = (numberOne, numberTwo) => {
    numberOne > numberTwo ? console.log(`El número ${numberOne} es el más alto`) : console.log(`El número ${numberTwo} es el más alto`);
}
let number1 = 3;
let number2 = 2;

max(number1,number2);

// -----------------------------------------------------------------
// **Iteración #2: Buscar la palabra más larga**
// -----------------------------------------------------------------

/* Completa la función que tomando un array de strings como argumento devuelva el más largo, 
en caso de que dos strings tenga la misma longitud deberá devolver el primero.
Puedes usar este array para probar tu función: */

const avengers = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
// ---- Con arrow function, reduce y ternario ----------------
const avenger = avengers.reduce((acc, val) => acc.length > val.length ? acc : val, '');

console.log(avenger);

// -----------------------------------------------------------------
// **Iteración #3: Calcular la suma**
// -----------------------------------------------------------------

/* Calcular una suma puede ser tan simple como iterar sobre un array y sumar cada uno de los elementos.
Implemente la función denominada sumNumbers que toma un array de números como argumento y devuelve la 
suma de todos los números de la matriz. 
Puedes usar este array para probar tu función: */

const numbers = [1, 2, 3, 5, 45, 37, 58];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
}
console.log(sum)

// -----------------------------------------------------------------
// **Iteración #4: Calcular el promedio**
// -----------------------------------------------------------------

// Calcular un promedio es una tarea extremadamente común. Puedes usar este array para probar tu función:
const numbers = [12, 21, 38, 5, 45, 37, 6];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
}
let avg = (Math.round(sum/numbers.length));
console.log(avg.toFixed(2))

// -----------------------------------------------------------------
// **Iteración #5: Calcular promedio de strings**
// -----------------------------------------------------------------

/* Crea una función que reciba por parámetro un array y cuando es un valor number lo sume y de lo 
contrario cuente la longitud del string y lo sume. Puedes usar este array para probar tu función: */

const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];
let sum = 0;

const averageWord = (array) => {
    for (let i = 0; i < array.length; i++) {
        typeof(array[i]) == "number" ? sum += array[i] : sum += array[i].length;
        }
        console.log(sum)
    }
averageWord(mixedElements)

// -----------------------------------------------------------------
// **Iteración #6: Valores únicos**
// -----------------------------------------------------------------

/* Crea una función que reciba por parámetro un array y compruebe si existen elementos duplicados, 
en caso que existan los elimina para retornar un array sin los elementos duplicados.
Puedes usar este array para probar tu función: */

const duplicates = [
    'sushi',
    'pizza',
    'burger',
    'potatoe',
    'pasta',
    'ice-cream',
    'pizza',
    'chicken',
    'onion rings',
    'pasta',
    'soda'
];

const unique = duplicates.reduce((acc,element)=> {
    if(!acc.includes(element)) {
        acc.push(element);
    }
    return acc;
},[])

console.log(unique);

// -----------------------------------------------------------------
//  **Iteración #7: Buscador de nombres**
// -----------------------------------------------------------------

/* Crea una función que reciba por parámetro un array y el valor que desea comprobar que existe 
dentro de dicho array - comprueba si existe el elemento, en caso que existan nos devuelve un true
 y la posición de dicho elemento y por la contra un false. 
 Puedes usar este array para probar tu función: */

 const nameFinder = [
    'Peter',
    'Steve',
    'Tony',
    'Natasha',
    'Clint',
    'Logan',
    'Xabier',
    'Bruce',
    'Peggy',
    'Jessica',
    'Marc'
  ];
  function finderName(param) {
    // insert code
  }

// -----------------------------------------------------------------
// Iteration #8: Contador de repeticiones
// -----------------------------------------------------------------

/* Crea una función que nos devuelva el número de veces que se repite cada una 
de las palabras que lo conforma.  Puedes usar este array para probar tu función: */
const counterWords = [
    'code',
    'repeat',
    'eat',
    'sleep',
    'code',
    'enjoy',
    'sleep',
    'code',
    'enjoy',
    'upgrade',
    'code'
  ];
  function repeatCounter(param) {
    // insert code
  }
