/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllMovments = (params) => {
  return Axios.get("/get-all/movments", { params });
};


let getActiveMovments = (params) => {
  return Axios.get("/movments", { params });
};

let getActiveConsultaionMovments = (params) => {
  return Axios.get("consultation/movments", { params });
};

let getMovment = (id) => {
  return Axios.get("/movment/" + id);
};

let getPatientStat = () => {
  return Axios.get("/movment/" + id);
};

let getMovmentByServiceStat = () => {
  return Axios.get("/movment/" + id);
};

let getMovmentStat = () => {
  return Axios.get("/movment/" + id);
};

let getDrugsAvailable = () => {
  return Axios.get("/drugs-available");
};

//Medicals Serviecs
let getPatientMedicalsRecords = (patient_uuid) => {
  return Axios.get("/atients/medicals/records/" + patient_uuid);
};

// **** Reppport *****////

export const movmentService = {
  getAllMovments,
  getActiveMovments,
  getActiveConsultaionMovments,
  getMovment,
  getDrugsAvailable,
  /** repport ***/
  getPatientStat,
  getMovmentStat,

  getMovmentByServiceStat,

  getPatientMedicalsRecords,

  // ADT Actions
  admitPatient: (data) => Axios.post("/movments/admit", data),
  transferPatient: (data) => Axios.post("/movments/transfer", data),
  releasePatient: (data) => Axios.post("/movments/release", data),
};
