/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllarrondissements = () => {
  return Axios.get("/arrondissement");
};

let getArrondissement = (id) => {
  return Axios.get("/arrondissement/" + id);
};

let getArrondissements = (communeId) => {
  return Axios.get("/arrondissements?communeId=" + communeId);
};

let getarrondissement = (arrondissement) => {
  return Axios.get("/arrondissement/" + arrondissement.id, arrondissement);
};

let addArrondissement = (credentials) => {
  return Axios.post("/arrondissement", credentials);
};

let updateArrondissement = (arrondissement) => {
  return Axios.put("/arrondissement/" + arrondissement.id, arrondissement);
};

let deleteArrondissement = (id) => {
  return Axios.delete("/arrondissement/" + id);
};

export const arrondissementService = {
  getAllarrondissements,
  getArrondissement,
  getarrondissement,
  getArrondissements,
  addArrondissement,
  updateArrondissement,
  deleteArrondissement,
};
