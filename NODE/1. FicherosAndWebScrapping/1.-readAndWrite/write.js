const fs = require("fs");

fs.writeFile;

const dogs = [
    {
        "nombre": "Sabueso de Transilvania",
        "origen": "Hungría",
        "tamaño": "Mediano",
        "esperanza de vida": "12-14"
    },
    {
        "nombre": "Jack russell terrier",
        "origen": "Reino Unido",
        "tamaño": "Pequeño",
        "esperanza de vida": "12-14"
    },
    {
        "nombre": "Bulldog francés",
        "origen": "Francia",
        "tamaño": "Mediano",
        "esperanza de vida": "10-12"
    },
    {
        "nombre": "Pastor alemán",
        "origen": "Alemania",
        "tamaño": "Grande",
        "esperanza de vida": "8-10"
    },
    {
        "nombre": "Chihuahua",
        "origen": "Méjico",
        "tamaño": "Toy",
        "esperanza de vida": "15-20"
    },
];
const dogsJson = JSON.stringify(dogs);

fs.writeFile("dogsWrite.json", dogsJson, () => {
    console.log("Se ha escrito el archivo JSON");
});