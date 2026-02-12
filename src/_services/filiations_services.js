/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllFiliations = () => {
  return Axios.get("/filiations");
};

let getFiliations = (uuid) => {
  return Axios.get("/filiations/" + uuid);
};

let getFiliation = (filiation) => {
  return Axios.get("/filiations/" + filiation.uuid, filiation);
};

let addFiliations = (credentials) => {
  return Axios.post("/filiations", credentials);
};

let updateFiliation = (filiation) => {
  return Axios.put("/filiations/" + filiation.uuid, filiation);
};

// let getFiliationByPatient = (filiationId) => {
//   return Axios.get("/filiation/patient/{id}" + filiationId);
// };
let getFiliationByPatient = (patientId) => {
  return Axios.get(`/filiation/patient/${patientId}`);
};

let deleteFiliation = (uuid) => {
  return Axios.delete("/filiations/" + uuid);
};

// let getAssurancess = (compagnieId) => {
//   return Axios.get("/assuran?compagnieId=" + compagnieId);
// };

// let getPourcentageByAssurance = (assuranceId) => {
//   return Axios.get("/assuran/" + assuranceId + "/pourcentage");
// };

export const filiationService = {
  getFiliationByPatient,
  getAllFiliations,
  getFiliations,
  getFiliation,
  addFiliations,
  updateFiliation,
  deleteFiliation,
  // getAssurancess,
  // getPourcentageByAssurance,
};
