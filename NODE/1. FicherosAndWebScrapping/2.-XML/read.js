const fs = require("fs");

const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

const parser = new XMLParser();

fs.readFile("books.xml", "UTF-8", (error, data) => {
  let dataParse;
  error ? console.log(error) : (dataParse = parser.parse(data));

  const { books } = dataParse;
  console.log(books);
  const { book } = books;
  console.log(book);
});