import randomWords from "random-spanish-words";

// Componente para escoger una palabra de forma aleatoria
export const getWord = () => {
    const word = randomWords(1)[0];
    const regex = /[áéíóúÁÉÍÓÚ]/;
    console.log(word);
    if (regex.test(word) || word.length < 8) {
      return getWord();
    } else {
      return word;
    }
  };