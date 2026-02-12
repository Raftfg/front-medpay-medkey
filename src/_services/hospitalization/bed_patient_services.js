/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllBedPatients = (params = {}) => {
    return Axios.get("/bed_patients", { params });
};

let getBedPatient = (uuid) => {
    return Axios.get("/bed_patients/" + uuid);
};

let addBedPatient = (data) => {
    return Axios.post("/bed_patients", data);
};

let updateBedPatient = (bed) => {
    return Axios.put("/bed_patients/" + bed.uuid, bed);
};

let deleteBedPatient = (uuid) => {
    return Axios.delete("/bed_patients/" + uuid);
};

export const bedPatientService = {
    getAllBedPatients,
    getBedPatient,
    addBedPatient,
    updateBedPatient,
    deleteBedPatient,
};