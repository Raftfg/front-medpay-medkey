import Axios from "./caller.services";
// Définir la méthode getAllAssurances
const getAllAssurances = () => {
  return Axios.get("/assurances");
};

let getAllPriseenchargePatient = () => {
  return Axios.get("/priseencharges");
};
let getAssurancePatient = (patientId) => {
  return Axios.get(`/getassurancepatient/${patientId}`);
};

let getPriseecharges = (id) => {
  return Axios.get("/priseencharges/" + id);
};

let getPriseecharge = (priseencharge) => {
  return Axios.get("/priseencharges/" + priseencharge.id, priseencharge);
};

let addPriseEnChargePatient = (data) => {
  return Axios.post("/priseencharges", data);
};
let updatePriseEnChargePatient = (priseencharge) => {
  return Axios.put("/priseencharges/" + priseencharge.id, priseencharge);
};

let deletePriseEnChargePatient = (id) => {
  return Axios.delete(`/priseencharges/${id}`);
};

let getAssurances = (compagnieId) => {
  return Axios.get("/assuranc?compagnieId=" + compagnieId);
};

let getPourcentageByAssurance = (assuranceId) => {
  return Axios.get("/assuranc/" + assuranceId + "/pourcentage");
};

export const PriseEnChargePatientService = {
  getAssurancePatient,
  getAllPriseenchargePatient,
  addPriseEnChargePatient,
  updatePriseEnChargePatient,
  deletePriseEnChargePatient,
  getAllAssurances,
  getPriseecharges,
  getPriseecharge,
  getAssurances,
  getPourcentageByAssurance
};
