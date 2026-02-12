// /**Import des modules néccessaires */
// import Axios from "./caller.services";

// let getAllPatients = () => {
//   return Axios.get("/patients");
// };

// let getPatient = (id) => {
//   return Axios.get("/patients/" + id);
// };

// let getPatients = (patient) => {
//   return Axios.get("/patients/" + patient.id, patient);
// };

// let addPatients = (credentials) => {
//   return Axios.post("/patients", credentials);
// };

// let updatePatient = (patient) => {
//   return Axios.put("/patients/" + patient.id, patient);
// };

// let deletePatient = (id) => {
//   return Axios.delete("/patients/" + id);
// };

// const getPaymentsByPatient = (patientId) => {
//   return Axios.get(`/patientts/${patientId}/payment`);
// };

// export const patientService = {
//   getAllPatients,
//   getPaymentsByPatient,
//   getPatient,
//   getPatients,
//   addPatients,
//   updatePatient,
//   deletePatient,
// };
import Axios from "./caller.services";

let getAllPatients = (config = {}) => {
    // OPTIMISATION : Ajouter per_page par défaut pour limiter le nombre de résultats
    const params = config.params || {};
    if (!params.per_page) {
        params.per_page = 20; // Limiter à 20 patients par défaut
    }
    config.params = params;
    return Axios.get("/patients", config);
};

let getSearchPatients = (request, config = {}) => {
    // Recherche
    return Axios.get("/patients/search/" + request, config);
};

let getPatient = (uuid) => {
    // Utilisez "uuid" au lieu d' "id"
    return Axios.get("/patients/" + uuid); // Utilisez "uuid" au lieu d' "id"
};
let getDetailPatient = (id) => {
    return Axios.get(`/detailpatient/${id}`);
};


let getPatients = (patient) => {
    return Axios.get("/patients/" + patient.uuid, patient); // Utilisez "uuid" au lieu d' "id"
};

let addPatients = (credentials) => {
    return Axios.post("/patients", credentials);
};

let updatePatient = (patient) => {
    return Axios.put("/patients/" + patient.uuid, patient); // Utilisez "uuid" au lieu d' "id"
};

let deletePatient = (uuid) => {
    // Utilisez "uuid" au lieu d' "id"
    return Axios.delete("/patients/" + uuid); // Utilisez "uuid" au lieu d' "id"
};

const getPaymentsByPatient = (patientUuid) => {
    // Utilisez "patientUuid" au lieu d' "patientId"
    return Axios.get(`/patients/${patientUuid}/payment`); // Utilisez "patientUuid" au lieu d' "patientId"
};

export const patientService = {
    getDetailPatient,
    getAllPatients,
    getSearchPatients,
    getPaymentsByPatient,
    getPatient,
    getPatients,
    addPatients,
    updatePatient,
    deletePatient,
};