// Iteración #1: Variables //

// 1.1 Crea una variable llamada myFavoriteHero, asigna el valor Hulk a ella.
let myFavoriteHero = "Hulk"

// 1.2 Crea una variable llamada x, asigna el valor 50 a ella.
let x = 50

// 1.3 Crea una variable llamada 'h' con el valor 5 y otra 'y' con el valor 10. 
let h = 5;
let y = 10

// 1.4 Crea una otra variable 'z' y asignale el valor de 'h' + 'y'.
let z = h + y

// -----------------------------------

// Iteración #2 Variables avanzadas//

// 2.1 Dado el siguiente javascript, cambia el valor de la propiedad age a 25.
const character = {name: 'Jack Sparrow', age: 10};
character.age = 25;
console.log(character.age);

// 2.2 Declara 3 variables con los nombres y valores siguientes 
	firstName = 'Jon'; 
	lastName = 'Snow'; 
	age = 24; 
/* Muestralos por consola de esta forma: 
	'Soy Jon Snow, tengo 24 años y me gustan los lobos.'*/
	console.log(`Soy ${firstName} ${lastName}, tengo ${age} años y me gustan los lobos`);

	
/* 2.3 Dado el siguiente javascript, imprime con un console.log 
la suma del precio de ambos juguetes.*/
const toy1 = {name: 'Buss myYear', price: 19};
const toy2 = {name: 'Rallo mcKing', price: 29};

total = toy1.price + toy2.price;
console.log(total);

/* 2.4 Dado el siguiente javascript, actualiza el valor de la variable globalBasePrice a 25000 
y actualiza la propiedad finalPrice de todos los coches con el valor de su propiedad 
basePrice más el valor de la variable globalBasePrice.*/
let globalBasePrice = 10000;
const car1 = {name: 'BMW m&m', basePrice: 50000, finalPrice: 60000};
const car2 = {name: 'Chevrolet Corbina', basePrice: 70000, finalPrice: 80000};

globalBasePrice = 25000;
car1.finalPrice = car1.finalPrice + globalBasePrice;
car2.finalPrice = car2.finalPrice + globalBasePrice;

console.log(car1.finalPrice);
console.log(car2.finalPrice);

// -----------------------------------

//Iteración #3: Operadores

// 3.1 Multiplica 10 por 5 y muestra el resultado mediante console.
let mult1 = 10;
let mult2 = 5;
multiplicación = mult1 * mult2;
console.log(`${mult1} * ${mult2} = ${multiplicación}`);

// 3.2 Divide 10 por 2 y muestra el resultado en un console.
let div1 = 10;
let div2 = 2;
division = div1 / div2;
console.log(`${div1} / ${div2} es ${division}`)

// 3.3 Muestra mediante un console el resto de dividir 15 por 9.
let rest1 = 10;
let rest2 = 2;
resto = rest1 % rest2;
console.log(`${rest1} % ${div2} es ${rest2}`)

/* 3.4 Usa el correcto operador de asignación que resultará en o = 15, 
teniendo dos variables p = 10 y j = 5.*/
let p = 10;
let j = 5;
let o = p + j;
console.log(o)

/* 3.5 Usa el correcto operador de asignación que resultará en i = 50,
teniendo dos variables c = 10 y m = 5. */
let c = 10;
let m = 5;
let i = c * m;
console.log(`El operador es *`)

// -----------------------------------

// Iteración #4: Arrays

// 4.1 Consigue el valor "HULK" del array de avengers y muestralo por consola.
const avengers1 = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
valor = avengers1[0];
console.log(valor)

// 4.2 Cambia el primer elemento de avengers a "IRONMAN"
const avengers2 = ["HULK", "SPIDERMAN", "BLACK PANTHER"];
avengers2[0] = "IRONMAN";
console.log(avengers2)

// 4.3 console numero de elementos en el array usando la propiedad correcta de Array.
const avengers3 = ["HULK", "SPIDERMAN", "BLACK PANTHER"];

items = avengers3.length;
console.log(items)

// 4.4 Añade 2 elementos al array: "Morty" y "Summer". 
// Muestra en consola el último personaje del array
const rickAndMortyCharacters1 = ["Rick", "Beth", "Jerry"];

// 4.5 Elimina el último elemento del array y muestra el primero y el último por consola.
const rickAndMortyCharacters2 = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharacters2.pop();
console.log(rickAndMortyCharacters2[0]);
console.log(rickAndMortyCharacters2[rickAndMortyCharacters2.length-1]);

// 4.6 Elimina el segundo elemento del array y muestra el array por consola.
const rickAndMortyCharacters3 = ["Rick", "Beth", "Jerry", "Morty", "Summer", "Lapiz Lopez"];
rickAndMortyCharacters3.splice(1,1);
console.log(rickAndMortyCharacters3)