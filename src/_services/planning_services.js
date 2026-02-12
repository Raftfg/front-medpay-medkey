/**Import des modules nécessaires */
import Axios from "./caller.services";

let getAllWorkSchedules = (params) => {
  return Axios.get("/work-schedules", { params });
};

let getWorkSchedule = (uuid) => {
  return Axios.get("/work-schedules/" + uuid);
};

let createWorkSchedule = (data) => {
  return Axios.post("/work-schedules", data);
};

let updateWorkSchedule = (uuid, data) => {
  return Axios.put("/work-schedules/" + uuid, data);
};

let deleteWorkSchedule = (uuid) => {
  return Axios.delete("/work-schedules/" + uuid);
};

let publishWorkSchedule = (uuid) => {
  return Axios.post("/work-schedules/" + uuid + "/publish");
};

export const planningService = {
  getAllWorkSchedules,
  getWorkSchedule,
  createWorkSchedule,
  updateWorkSchedule,
  deleteWorkSchedule,
  publishWorkSchedule,
};
