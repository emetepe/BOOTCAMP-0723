// Ejercicios JS functions

// **Iteración #1: Buscar el máximo**

// 1.1. Completa la función que tomando dos números como argumento devuelva el más alto.
function sum(numberOne , numberTwo) {
    if (numberOne > numberTwo) {
        console.log(`El número ${numberOne} es el más alto`);
    } else if (numberTwo > numberOne) {
            console.log(`El número ${numberTwo} es el más alto`);
        } else {console.log("Los dos números son iguales")
    }
  }

  let number1 = 3;
  let number2 = 2;

  sum(number1,number2);
