/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllBeds = (config = {}) => {
    return Axios.get("/beds", config);
};

let getBed = (uuid) => {
    return Axios.get("/beds/" + uuid);
};

let addBed = (data) => {
    return Axios.post("/beds", data);
};

let updateBed = (bed) => {
    return Axios.put("/beds/" + bed.uuid, bed);
};

let deleteBed = (uuid) => {
    return Axios.delete("/beds/" + uuid);
};

/**
 * Récupère les lits disponibles depuis le module Hospitalization
 * Route: GET /api/v1/beds/available
 * @param {number|null} serviceId - ID du service pour filtrer les lits (optionnel)
 * @returns {Promise} Promise avec les lits disponibles
 */
let getAvailableBeds = (serviceId = null) => {
    const config = serviceId ? { params: { service_id: serviceId } } : {};
    return Axios.get("/beds/available", config);
};

export const bedService = {
    getAllBeds,
    getBed,
    addBed,
    updateBed,
    deleteBed,
    getAvailableBeds,
};