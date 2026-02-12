/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAlldepartements = () => {
  return Axios.get("/departement");
};

let getDepartement = (id) => {
  return Axios.get("/departement/" + id);
};

let getdepartement = (departement) => {
  return Axios.get("/departement/" + departement.id, departement);
};

let addDepartement = (credentials) => {
  return Axios.post("/departement", credentials);
};

let updateDepartement = (departement) => {
  return Axios.put("/departement/" + departement.id, departement);
};

let deleteDepartement = (id) => {
  return Axios.delete("/departement/" + id);
};

export const departementService = {
  getAlldepartements,
  getDepartement,
  getdepartement,
  addDepartement,
  updateDepartement,
  deleteDepartement,
};
