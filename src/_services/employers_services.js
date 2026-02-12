/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllEmployers = () => {
  return Axios.get("/employers");
};

let getSearchEmployers = (request) => {
  // Recherche
  return Axios.get("/employers/search/" + request); 
};

let getEmployer = (id) => {
  return Axios.get("/employers/" + id);
};

let getEmployers = (employer) => {
  return Axios.get("/employers/" + employer.id, employer);
};

let addEmployers = (credentials) => {
  return Axios.post("/employers", credentials);
};

let updateEmployer = (employer) => {
  return Axios.put("/employers/" + employer.uuid, employer);
};

let deleteEmployer = (uuid) => {
  return Axios.delete("/employers/" + uuid);
};

// const getPaymentsByEmployer = (employerId) => {
//   return Axios.get(`/employers/${employerId}/payment`);
// };

export const employerService = {
  getAllEmployers,
  getSearchEmployers,
  getEmployer,
  getEmployers,
  addEmployers,
  updateEmployer,
  deleteEmployer,
};
