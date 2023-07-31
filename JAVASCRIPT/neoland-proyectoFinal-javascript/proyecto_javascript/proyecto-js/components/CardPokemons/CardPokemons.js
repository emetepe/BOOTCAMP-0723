import "./CardPokemons.css";

export const CardsPokemons = (data) => {
  document.getElementById("galleryPokemon").innerHTML = "";

  data.map((pokemon) => {
    const classCustomType = `"figurePokemon ${pokemon.type[0].type.name}"`;
    const templateFigure = `
    <figure class=${classCustomType}>
      <img src=${pokemon.image} alt=${pokemon.name} />
      <h2>${pokemon.name}</h2>
      <h2>Weight: ${pokemon.weight}</h2>
      <h2>Height: ${pokemon.height}</h2>
    </figure>`;
    document.getElementById("galleryPokemon").innerHTML += templateFigure;
  });
};