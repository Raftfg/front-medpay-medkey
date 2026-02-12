/* Import des modules nécessaires */
import Axios from "./caller.services";

let getAllPermissions = () => {
  return Axios.get("/permissions");
};

let getPermissions = (uuid)=> {
  return Axios.get("/permissions/" + uuid);
};

let addPermissions = (permission) => {
  return Axios.post("/permissions", permission);
};

let updatePermissions = (permission) => {
  return Axios.put("/permissions/" + permission.uuid, permission);
};

let deletePermissions = (uuid)=> {
  return Axios.delete("/permissions/" + uuid);
};

export const permissionService = {
  getAllPermissions,
  getPermissions,
  addPermissions,
  updatePermissions,
  deletePermissions,
};