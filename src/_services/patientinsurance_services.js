/**Import des modules néccessaires */
import Axios from "./caller.services";

// let getAllPatientInsurances = () => {
//   return Axios.get("/ptient_insurances");
// };

// let getPatientInsurance = (uuid) => {
//   return Axios.get("/ptient_insurances/" + uuid);
// };

// let getPatientInsuranc = (patientinsurance) => {
//   return Axios.get(
//     "/ptient_insurances/" + patientinsurance.uuid,
//     patientinsurance
//   );
// };

// let addPatientInsurances = (patientinsurance) => {
//   return Axios.post("/ptient_insurances", patientinsurance);
// };

// let updatePatientInsurances = (patientinsurance) => {
//   return Axios.put(
//     "/ptient_insurances/" + patientinsurance.uuid,
//     patientinsurance
//   );
// };


// let getInsuranceByPatient = (patientId) => {
//   return Axios.get(`/patientinsurance/patient/${patientId}`);
// };

// let deletepatientinsurance = (uuid) => {
//   return Axios.delete("/ptient_insurances/" + uuid);
// };

let getAllPatientInsurances = () => {
  return Axios.get("/patient_insurances");
};

let getPatientInsurance = (uuid) => {
  return Axios.get("/patient_insurances/" + uuid);
};

let getPatientInsuranc = (patientinsurance) => {
  return Axios.get(
    "/patient_insurances/" + patientinsurance.uuid,
    patientinsurance
  );
};

let addPatientInsurances = (patientinsurance) => {
  return Axios.post("/patient_insurances", patientinsurance);
};

let add = (patientinsuran) => {
  return Axios.post("/patient_insurances/add", patientinsuran);
};
let updatePatientInsurances = (patientinsurance) => {
  return Axios.put(
    "/patient_insurances/" + patientinsurance.uuid,
    patientinsurance
  );
};


let getInsuranceByPatient = (patientId) => {
  return Axios.get(`/patientinsurance/patient/${patientId}`);
};

let getPackDetailsByPatient = (uuid) => {
  return Axios.get(`/patient-insurances/${uuid}/pack-details`);
}

let deletepatientinsurance = (uuid) => {
  return Axios.delete("/patient_insurances/" + uuid);
};

export const patientinsuranceService = {
  add,
  getPackDetailsByPatient,
  getAllPatientInsurances,
  getPatientInsurance,
  getPatientInsuranc,
  addPatientInsurances,
  updatePatientInsurances,
  getInsuranceByPatient,
  deletepatientinsurance,
  // getAssurancess,
  // getPourcentageByAssurance,
};
