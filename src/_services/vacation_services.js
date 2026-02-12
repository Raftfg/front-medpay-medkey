/**Import des modules nécessaires */
import Axios from "./caller.services";

let getAllVacations = (params) => {
  return Axios.get("/vacations", { params });
};

let getVacation = (uuid) => {
  return Axios.get("/vacations/" + uuid);
};

let createVacation = (data) => {
  return Axios.post("/vacations", data);
};

let updateVacation = (uuid, data) => {
  return Axios.put("/vacations/" + uuid, data);
};

let deleteVacation = (uuid) => {
  return Axios.delete("/vacations/" + uuid);
};

let approveVacation = (uuid, data) => {
  return Axios.post("/vacations/" + uuid + "/approve", data);
};

let rejectVacation = (uuid, data) => {
  return Axios.post("/vacations/" + uuid + "/reject", data);
};

export const vacationService = {
  getAllVacations,
  getVacation,
  createVacation,
  updateVacation,
  deleteVacation,
  approveVacation,
  rejectVacation,
};
