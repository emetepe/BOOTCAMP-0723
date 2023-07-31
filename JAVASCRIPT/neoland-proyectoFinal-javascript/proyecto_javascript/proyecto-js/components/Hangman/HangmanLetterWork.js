// Componente para el tratamiento de las palabras para evitar errores
export const finalWord = (word, letters) => {
  let lettersOut = "";
  for (let letter of letters) {
    lettersOut = lettersOut + letter;
  }
  let regex = new RegExp(`[^${lettersOut}]`, "g");
  word = word.replace(regex, "_ ");
  return word;
};

export const letterChecking = (submittedLetters, letter) => {
  for (let submittedLetter of submittedLetters) {
    if (submittedLetter == letter) {
      return true;
    }
  }
  return false;
};