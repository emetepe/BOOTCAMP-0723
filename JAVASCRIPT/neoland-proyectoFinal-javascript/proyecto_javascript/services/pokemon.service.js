// En este archivo tenemos todas las llamadas a APIs y BBDD
import { axiosUtil } from "../utils";

export const getByIdPokemon = async(id) => {
    const optionsRequest = {
        method: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    };
    return await axiosUtil(optionsRequest);
};

