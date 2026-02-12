/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllContrats = () => {
  return Axios.get("/contrats");
};

let getContrat = (id) => {
  return Axios.get("/contrats/" + id);
};

let getContrats = (contrat) => {
  return Axios.get("/contrats/" + contrat.id, contrat);
};

let addContrats = (credentials) => {
  return Axios.post("/contrats", credentials);
};

let updateContrat = (contrat) => {
  return Axios.put("/contrats/" + contrat.uuid, contrat);
};

let deleteContrat = (uuid) => {
  return Axios.delete("/contrats/" + uuid);
};

let getContratss = (employerId) => {
  return Axios.get("/contrat?employerId=" + employerId);
};

export const contratService = {
  getAllContrats,
  getContrat,
  getContrats,
  addContrats,
  updateContrat,
  deleteContrat,
  getContratss,
};
