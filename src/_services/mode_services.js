/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllModes = () => {
  return Axios.get("/modepaiement");
};

let getModes = (id) => {
  return Axios.get("/modepaiement/" + id);
};

let getMode = (modepaiement) => {
  return Axios.get("/modepaiement/" + modepaiement.id, modepaiement);
};

let addMode = (credentials) => {
  return Axios.post("/modepaiement", credentials);
};

let updateMode = (modepaiement) => {
  return Axios.put("/modepaiement/" + modepaiement.id, modepaiement);
};

let deleteMode = (id) => {
  return Axios.delete("/modepaiement/" + id);
};

export const modeService = {
  getAllModes,
  getModes,
  getMode,
  addMode,
  updateMode,
  deleteMode,
};
