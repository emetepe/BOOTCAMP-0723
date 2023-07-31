// ----------------------------------------------------------------------
// Neoland JavaScript Loops - Cuaderno 3 - Marta Pérez Romero
// ----------------------------------------------------------------------

// -----------------------------------------------------------------
// ** Iteración #1: Usa includes **
// -----------------------------------------------------------------

/* 1.1. Haz un bucle y muestra por consola todos aquellos valores del array 
que incluyan la palabra "Camiseta". Usa la función .includes de javascript. */
const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta']

// --------- CON FOR OF --------
for (const product of products) {
    (product.includes("Camiseta")) ? console.log(`${product}`) : "";
}

// ---------- CON FOREACH -------
products.forEach((product,index,fullObject) => {
    product.includes("Camiseta") ? console.log(`${product}`) : "";
})

// -----------------------------------------------------------------
// ** Iteración #2: Condicionales avanzados **
// -----------------------------------------------------------------

/* 2.1. Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados 
y añade la propiedad ***isApproved*** a true o false en consecuencia. Una vez lo tengas 
compruébalo con un ***console.log***. 
( **Mirar abajo en pistas** ).
Puedes usar este array para probar tu función: */
const alumns = [
    {name: 'Pepe Viruela', T1: false, T2: false, T3: true}, 
	{name: 'Lucia Aranda', T1: true, T2: false, T3: true},
	{name: 'Juan Miranda', T1: false, T2: true, T3: true},
	{name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
	{name: 'Raquel Benito', T1: true, T2: true, T3: true}
]
/* Recorremos el array para contar los trimestres aprobados
   Si son 2 o 3 el alumno ha aprobado y se pone isApproved=true
   Si son 0 o 1 el alumno no ha aprobado y se pone isApproved=false 
   Nota: se ha usado la pista del enunciado para meter la nueva propiedad*/
alumns.forEach((alumn) => {
    let approvedQuarters = 0;
    isApproved = false;
    for (valor in alumn) {
        alumn[valor] == true && approvedQuarters++;
        approvedQuarters >= 2 ? alumn.isApproved = true : alumn.isApproved = false;
    }
}
);
console.log(alumns)

// -----------------------------------------------------------------
// ** Iteración #3: Probando For...of **
// -----------------------------------------------------------------

/* 3.1. Usa un bucle forof para recorrer todos los destinos del array. Imprime en un 
***console.log*** sus valores. Puedes usar este array:. */
const placesToTravel = ['Japon', 'Venecia', 'Murcia', 'Santander', 'Filipinas', 'Madagascar']

for (place of placesToTravel) {
    console.log(place)
}

// -----------------------------------------------------------------
// ** Iteración #4: Probando For...in **
// -----------------------------------------------------------------

/* 4.1. Usa un for...in para imprimir por consola los datos del alienígena. Puedes usar este objeto: */
const alien = {
    name: 'Wormuck',
    race: 'Cucusumusu',
    planet: 'Eden',
    weight: '259kg'
}

for (clave in alien) {
    console.log(`El alienígena tiene la clave ${clave} con valor: ${alien[clave]}`)
}
// -----------------------------------------------------------------
// ** Iteración #5: Probando For **
// -----------------------------------------------------------------

/* 5.1. Usa un bucle for para recorrer todos los destinos del array y elimina los elementos que 
tengan el id 11 y 40. Imprime en un console log el array. Puedes usar este array */
const placesToTravel = [{id: 5, name: 'Japan'}, {id: 11, name: 'Venecia'}, {id: 23, name: 'Murcia'}, {id: 40, name: 'Santander'}, {id: 44, name: 'Filipinas'}, {id: 59, name: 'Madagascar'}]
// Para recorrer con un for pondríamos lo siguiente:
// for (i = 0; i < placesToTravel.length; i++ ) {
//     placesToTravel[i].id == (11 || 40) && placesToTravel.splice(i,1);
// }
// Se opta, además, por el uso de for...in por ser más limpio
// Recorremos el array con un for...in y con un ternario eliminamos 11 y 40 con un splice
for (place in placesToTravel) {
    placesToTravel[place].id == (11 || 40) && placesToTravel.splice(place,1);
}
console.log(placesToTravel)

// -----------------------------------------------------------------
// ** Iteración #6: Mixed For...of e includes **
// -----------------------------------------------------------------

/* 6.1. Usa un bucle for...of para recorrer todos los juguetes y elimina los que incluyan la palabra 
gato. Recuerda que puedes usar la función .includes() para comprobarlo.Puedes usar este array: */
const toys = [
    {id: 5, name: 'Buzz MyYear'}, 
    {id: 11, name: 'Action Woman'}, 
    {id: 23, name: 'Barbie Man'}, 
    {id: 40, name: 'El gato con Guantes'},
    {id: 40, name: 'El gato felix'}
]
// Recorremos el array con for...of, con includes() comprobamos la condición, si se cumple, eliminamos con un splice
for (toy of toys) {
    toy.name.includes("gato") && toys.splice(toys.indexOf(toy),1);
}
console.log(toys)

// -----------------------------------------------------------------
// ** Iteración #7: For...of avanzado **
// -----------------------------------------------------------------

/* 7.1. Usa un bucle for...of para recorrer todos los juguetes y añade los que tengan más de 1
5 ventas (sellCount) al array popularToys. Imprimelo por consola.. Puedes usar este array: */
const popularToys = [];
const toys = [
	{id: 5, name: 'Buzz MyYear', sellCount: 10}, 
	{id: 11, name: 'Action Woman', sellCount: 24}, 
	{id: 23, name: 'Barbie Man', sellCount: 15}, 
	{id: 40, name: 'El gato con Guantes', sellCount: 8},
	{id: 40, name: 'El gato felix', sellCount: 35}
]
// Con un for..of y un "semiternario" comprobamos condición y añadimos elemento con push
for (toy of toys) {
    toy.sellCount > 15 && popularToys.push(toy);
console.log(popularToys)