import { updateToken } from "../../util/updateToken";
import { API } from "./service.config";

//---------------get-all-pruebas-dog---------------------
export const getAllPruebasDog = async () => {
  return API.get("/pruebas/getAllPruebasDog", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//----------------get-scores-mis-dogs-------------
export const getScoresMisDogs = async () => {
  return API.get("/pruebas/dogs", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//---------------create-prueba-----------------
export const createPrueba = async (formData) => {
  return API.post("/pruebas/create", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//-------------get-pruebas-------------------
export const getAllPruebas = async () => {
  return API.get("/pruebas/getAllPruebas", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//------------get-by-id------------------------
export const getPruebaById = async (id) => {
  return API.get(`/pruebas/getPruebaById/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//------------add-dog-------------------
export const addDog = async (id, formData) => {
  return API.post(`/pruebas/addDog/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//------------add-coach-----------------
export const addNewCoach = async (id, formData) => {
  return API.post(`/pruebas/addCoach/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};