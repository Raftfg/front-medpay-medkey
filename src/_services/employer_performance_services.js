/** Import des modules nécessaires */
import Axios from "./caller.services";

let getAllEmployerPerformances = (params) => {
  return Axios.get("/employer-performances", { params });
};

let getEmployerPerformance = (uuid) => {
  return Axios.get("/employer-performances/" + uuid);
};

let createEmployerPerformance = (data) => {
  return Axios.post("/employer-performances", data);
};

let updateEmployerPerformance = (uuid, data) => {
  return Axios.put("/employer-performances/" + uuid, data);
};

let deleteEmployerPerformance = (uuid) => {
  return Axios.delete("/employer-performances/" + uuid);
};

export const employerPerformanceService = {
  getAllEmployerPerformances,
  getEmployerPerformance,
  createEmployerPerformance,
  updateEmployerPerformance,
  deleteEmployerPerformance,
};

