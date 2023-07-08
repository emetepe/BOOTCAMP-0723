// -----------------------------------------------------------------
// ** Iteración #1: Usa includes **
// -----------------------------------------------------------------

/* 1.1. Haz un bucle y muestra por consola todos aquellos valores del array 
que incluyan la palabra "Camiseta". Usa la función .includes de javascript. */
const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta'];

// for (const product of products) {
//     (product.includes("Camiseta")) ? console.log(`${product}`) : "";
// }

products.forEach((product,index,fullObject) => {
    product.includes("Camiseta") ? console.log(`${product}`) : "";
})



