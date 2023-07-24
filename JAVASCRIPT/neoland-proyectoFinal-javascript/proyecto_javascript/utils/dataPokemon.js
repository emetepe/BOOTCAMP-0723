// Gestiona las asincronías y traer la data 

import { getByIdPokemon } from "../services/pokemon.service";

export const dataPokemon = async() => {
    const rawData = [];
    for (let i=1; i = 150; i++) {
        rawData.push(await getByIdPokemon(i));
    };
    return rawData;
}