const fs = require("fs");

fs.readFile("./dogs.json", (error, data) => {
  const dog = [];
  error ? console.log(error) : movie.push(JSON.parse(data));

  PrintDog(JSON.parse(data));
});

const PrintDog = (dog) => {
  console.log(dog);
};
