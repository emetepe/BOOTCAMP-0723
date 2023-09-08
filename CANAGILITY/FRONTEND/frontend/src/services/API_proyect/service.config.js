import axios from "axios";

const userLocal = localStorage.getItem("user");
const parseUser = JSON.parse(userLocal);

const APIHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  Authorization: `Bearer ${parseUser?.token}`,
};

export const API = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  headers: APIHeaders,
  timeout: 60000,
});