let timeId = [];
let intId = [];

export const timers = (action, time) => {
  const element = setTimeout(action, time);
  if (!timeId.includes(element)) timeId.push(element);
  return element;
};

export const intervals = (action, time) => {
  const element = setInterval(action, time);
  if (!intId.includes(element)) intId.push(element);
  return element;
};

export const timeCleaner = (element, type) => {
  if (type === "intervalo") {
    clearInterval(element);
  } else if (type === "temporizador") {
    clearTimeout(element);
  }
};

export const resetTiming = () => {
  for (const element of timeId) clearTimeout(element);
  for (const element of intId) clearInterval(element);
  timeId = [];
  intId = [];
};