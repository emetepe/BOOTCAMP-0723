export const paginacion = (data, elements) => {
    const large = data.length;
    const numeroP = Math.ceil(large / elements);
    return numeroP;
  };