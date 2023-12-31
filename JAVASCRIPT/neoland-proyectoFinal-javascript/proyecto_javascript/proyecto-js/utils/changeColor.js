// Funcionalidad para modificar el color de la página de forma aleatoria

export const changeColorRGB = () => {
  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let R = randomNumber(0, 255);
  let G = randomNumber(0, 255);
  let B = randomNumber(0, 255);

  const color = `rgb(${R},${G},${B}`;
  return color;
};

// Mejora 1: botón para hacer reset y volver al color por defecto

