/**Import des modules nécessaires */
import Axios from "./caller.services";

let getAllFormations = (params) => {
  return Axios.get("/formations", { params });
};

let getFormation = (uuid) => {
  return Axios.get("/formations/" + uuid);
};

let createFormation = (data) => {
  return Axios.post("/formations", data);
};

let updateFormation = (uuid, data) => {
  return Axios.put("/formations/" + uuid, data);
};

let deleteFormation = (uuid) => {
  return Axios.delete("/formations/" + uuid);
};

export const formationService = {
  getAllFormations,
  getFormation,
  createFormation,
  updateFormation,
  deleteFormation,
};
