// ----------------------------------------------------------------------
// Neoland JavaScript EVENTS - Cuaderno 6 - Marta Pérez Romero
// ----------------------------------------------------------------------

// Iteración #1: Creando Events //

/* Dado el siguiente HTML 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
	<input class="click" type="text"/>
	<input class="focus" type="text"/>
	<input class="value" type="text"/>
</body>
</html>
*/ 

// 1.1 Añade un botón a tu html con el id btnToClick y en tu javascript añade el 
// evento click que ejecute un console log con la información del evento del click.
const click = document.querySelector(".click");
const clickF = (e) => {
  console.log(e.target.value);
};
click.addEventListener("click", clickF);

// 1.2 Añade un evento 'focus' que ejecute un console.log con el valor del input.
const focus = document.querySelector(".focus");
const focusF = (e) => {
  console.log(e.target.value);
};
focus.addEventListener("focus", focusF);

// 1.3 Añade un evento 'input' que ejecute un console.log con el valor del input.
const input = document.querySelector(".value");
const inputF = (e) => {
  console.log(e.target.value);
};
input.addEventListener("input", inputF);