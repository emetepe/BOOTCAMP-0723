import { updateToken } from "../../util/updateToken";
import { API } from "./service.config";

//------------------get-scores-nivel-actual-------
export const getScoresAñoActual = async () => {
  return API.get("/scores/getScoresAnnoActual", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//------------------get-scores-nivel-actual-------
export const getScoreNivel = async (nivel) => {
  return API.get(`/pruebas/nivel/${nivel}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//------------------get-one-score-------------------
export const getOneScore = async (prueba) => {
  return API.get(`/scores/oneScore/${prueba}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//-----------------create-score----------------------
export const createScore = async (formData) => {
  return API.post("/scores/createScore", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//--------------get-mis-scores-------------------
export const getMisScores = async () => {
  return API.get("/scores/getMisScores", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};
//--------------delete-scores----------------
export const deleteScores = async (id) => {
  return API.delete(`/scores/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => {
      return error;
    });
};