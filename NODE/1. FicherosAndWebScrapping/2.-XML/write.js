const fs = require("fs");
const { XMLBuilder } = require("fast-xml-parser");

const book = {
  books: {
    book: [
      {
        autor: "Garghentini, Davide<",
        titulo: "XML Developer's Guide",
        genero: "Computer",
      },
      {
        autor: "Garcia, Debra",
        titulo: "Midnight Rain",
        genero: "Fantasy",
      },
    ],
  },
};

let options = {
  ignoreAtributes: false,
  format: true,
};

const builder = new XMLBuilder(options);
let output = builder.build(book);

fs.writeFile("books.xml", output, () => {
  console.log("Documento creado");
});