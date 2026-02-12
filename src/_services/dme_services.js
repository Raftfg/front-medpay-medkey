/** Import des modules nécessaires */
import Axios from "./caller.services";

/**
 * Récupère le DME complet d'un patient
 * @param {string} patientUuid 
 */
let getFullDme = (patientUuid) => {
    return Axios.get("/dme/full/" + patientUuid);
};

/**
 * Génère un résumé intelligent par IA
 * @param {string} patientUuid 
 */
let getAiSummary = (patientUuid) => {
    return Axios.get("/dme/ai-summary/" + patientUuid);
};

/**
 * Recherche des codes CIM-10
 * @param {string} query 
 */
let searchCim10 = (query) => {
    return Axios.get("/dme/cim10/search?q=" + encodeURIComponent(query));
};

// ========== ANTÉCÉDENTS ==========
let getAntecedents = (patientId) => {
    return Axios.get("/dme/antecedents?patients_id=" + patientId);
};

let createAntecedent = (data) => {
    return Axios.post("/dme/antecedents", data);
};

let updateAntecedent = (id, data) => {
    return Axios.put("/dme/antecedents/" + id, data);
};

let deleteAntecedent = (id) => {
    return Axios.delete("/dme/antecedents/" + id);
};

// ========== ALLERGIES ==========
let getAllergies = (patientId) => {
    return Axios.get("/dme/allergies?patients_id=" + patientId);
};

let createAllergie = (data) => {
    return Axios.post("/dme/allergies", data);
};

let updateAllergie = (id, data) => {
    return Axios.put("/dme/allergies/" + id, data);
};

let deleteAllergie = (id) => {
    return Axios.delete("/dme/allergies/" + id);
};

// ========== OBSERVATIONS CLINIQUES (SOAP) ==========
let getObservations = (patientId) => {
    return Axios.get("/dme/observations?patients_id=" + patientId);
};

let createObservation = (data) => {
    return Axios.post("/dme/observations", data);
};

let updateObservation = (id, data) => {
    return Axios.put("/dme/observations/" + id, data);
};

let deleteObservation = (id) => {
    return Axios.delete("/dme/observations/" + id);
};

// ========== VACCINATIONS ==========
let getVaccinations = (patientId) => {
    return Axios.get("/dme/vaccinations?patients_id=" + patientId);
};

let createVaccination = (data) => {
    return Axios.post("/dme/vaccinations", data);
};

let updateVaccination = (id, data) => {
    return Axios.put("/dme/vaccinations/" + id, data);
};

let deleteVaccination = (id) => {
    return Axios.delete("/dme/vaccinations/" + id);
};

// ========== PRESCRIPTIONS ==========
let getPrescriptions = (patientId) => {
    return Axios.get("/dme/prescriptions?patients_id=" + patientId);
};

let createPrescription = (data) => {
    return Axios.post("/dme/prescriptions", data);
};

let updatePrescription = (id, data) => {
    return Axios.put("/dme/prescriptions/" + id, data);
};

let deletePrescription = (id) => {
    return Axios.delete("/dme/prescriptions/" + id);
};

let getPrescription = (id) => {
    return Axios.get("/dme/prescriptions/" + id);
};

// ========== DOCUMENTS ==========
let getDocuments = (patientId) => {
    return Axios.get("/dme/documents?patients_id=" + patientId);
};

let createDocument = (formData) => {
    return Axios.post("/dme/documents", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

let updateDocument = (id, data) => {
    return Axios.put("/dme/documents/" + id, data);
};

let deleteDocument = (id) => {
    return Axios.delete("/dme/documents/" + id);
};

let downloadDocument = (id) => {
    return Axios.get("/dme/documents/" + id + "/download", {
        responseType: 'blob'
    });
};

export const dmeService = {
    getFullDme,
    getAiSummary,
    searchCim10,
    // Antécédents
    getAntecedents,
    createAntecedent,
    updateAntecedent,
    deleteAntecedent,
    // Allergies
    getAllergies,
    createAllergie,
    updateAllergie,
    deleteAllergie,
    // Observations
    getObservations,
    createObservation,
    updateObservation,
    deleteObservation,
    // Vaccinations
    getVaccinations,
    createVaccination,
    updateVaccination,
    deleteVaccination,
    // Prescriptions
    getPrescriptions,
    createPrescription,
    updatePrescription,
    deletePrescription,
    getPrescription,
    // Documents
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    downloadDocument,
};
