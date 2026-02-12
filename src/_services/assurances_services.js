/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllAssurances = () => {
  return Axios.get("/assurances");
};

let getAssurances = (id) => {
  return Axios.get("/assurances/" + id);
};

let getAssurance = (assurance) => {
  return Axios.get("/assurances/" + assurance.id, assurance);
};

let addAssurances = (credentials) => {
  return Axios.post("/assurances", credentials);
};

let updateAssurance = (assurance) => {
  return Axios.put("/assurances/" + assurance.id, assurance);
};

let deleteAssurance = (id) => {
  return Axios.delete("/assurances/" + id);
};

let getAssurancess = (compagnieId) => {
  return Axios.get("/assuran?compagnieId=" + compagnieId);
};

let getPourcentageByAssurance = (assuranceId) => {
  return Axios.get("/assuran/" + assuranceId + "/pourcentage");
};

export const AssuranceService = {
  getAllAssurances,
  getAssurance,
  getAssurances,
  addAssurances,
  updateAssurance,
  deleteAssurance,
  getAssurancess,
  getPourcentageByAssurance
};
