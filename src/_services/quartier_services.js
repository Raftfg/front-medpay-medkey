/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllquartiers = () => {
  return Axios.get("/quartier");
};

let getQuartier = (id) => {
  return Axios.get("/quartier/" + id);
};

let getquartier = (quartier) => {
  return Axios.get("/quartier/" + quartier.id, quartier);
};

let getQuartiers = (arrondissementId) => {
  return Axios.get("/quartiers?arrondissementId=" + arrondissementId);
};

let addQuartier = (credentials) => {
  return Axios.post("/quartier", credentials);
};

let updateQuartier = (quartier) => {
  return Axios.put("/quartier/" + quartier.id, quartier);
};

let deleteQuartier = (id) => {
  return Axios.delete("/quartier/" + id);
};

export const quartierService = {
  getAllquartiers,
  getQuartier,
  getQuartiers,
  getquartier,
  addQuartier,
  updateQuartier,
  deleteQuartier,
};
