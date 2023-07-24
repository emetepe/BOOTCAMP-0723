import { getByIdPokemon } from "../../services/pokemon.service";
import { dataPokemon } from "../../utils/dataPokemon";

const template = () => `
<div id="pokemon">
    <div id="containerFilter"></div>
    <div id="galleryPokemon"></div>
</div>
`;

const dataService = async () => {
  const getData = await dataPokemon();
  console.log(getData);
};

const addListeners = () => {};

export const PrintPokemonPage = () => {
  document.querySelector("main").innerHTML = template();
  dataService();
};

