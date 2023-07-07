// Ejercicios JS functions

// -----------------------------------------------------------------
// **Iteración #1: Buscar el máximo**
// -----------------------------------------------------------------

// 1.1. Completa la función que tomando dos números como argumento devuelva el más alto.

// ------------- Con function "normal" ----------------

function max(numberOne , numberTwo) {
   if (numberOne > numberTwo) {
       console.log(`El número ${numberOne} es el más alto`);
   } else if (numberTwo > numberOne) {
          console.log(`El número ${numberTwo} es el más alto`);
       } else {console.log("Los dos números son iguales")
   }
 }

 let number1 = 3;
 let number2 = 2;

 max(number1,number2); 


// ------------- Con arrow function ----------------

const max = (numberOne, numberTwo) => {
   if (numberOne > numberTwo) {
       console.log(`El número ${numberOne} es el más alto`);
   } else if (numberTwo > numberOne) {
           console.log(`El número ${numberTwo} es el más alto`);
       } else {console.log("Los dos números son iguales")
   }
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

// ---- Con arrow function y ternario ----------------

let avenger = avengers.reduce((acc, val) => acc.length > val.length ? acc : val, '');

console.log(avenger);

