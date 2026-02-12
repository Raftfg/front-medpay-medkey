/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllDepartments = () => {
  return Axios.get("/departments");
};

let getDepartment = (id) => {
  return Axios.get("/departments/" + id);
};

let getDepartments = (department) => {
  return Axios.get("/departments/" + department.id, department);
};

let addDepartments = (credentials) => {
  return Axios.post("/departments", credentials);
};

let updateDepartment = (department) => {
  return Axios.put("/departments/" + department.uuid, department);
};

let deleteDepartment = (uuid) => {
  return Axios.delete("/departments/" + uuid);
};

// const getPaymentsByDepartment = (departmentId) => {
//   return Axios.get(`/departments/${departmentId}/payment`);
// };

export const departmentService = {
  getAllDepartments,
  getDepartment,
  getDepartments,
  addDepartments,
  updateDepartment,
  deleteDepartment,
};
