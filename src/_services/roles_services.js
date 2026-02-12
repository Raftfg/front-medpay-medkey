/* Import des modules nécessaires */
import Axios from "./caller.services";

let getAllRoles = () => {
  return Axios.get("/roles");
};

let getRole = (uuid) => {
  return Axios.get("/roles/" + uuid);
};

let addRole = (role) => {
  return Axios.post("/roles", role);
};

let droitUsers = (role) => {
  return Axios.post("/droitusers", role);
};

let updateRole = (role) => {
  return Axios.put("/roles/" + role.uuid, role);
};
  
let deleteRole = (uuid) => {
  return Axios.delete("/roles/" + uuid);
};
let getPermissionsForRole = (roleId) => {
  return Axios.get(`/roles/${roleId}/permissions`, roleId);
};

let detachPermissionsFromRole = (roleId, permissions) => {
  return Axios.post(`/roles/${roleId}/detach-permissions`, { permissions });
};


export const roleService = {
  getAllRoles,
  getRole,
  addRole,
  droitUsers,
  updateRole,
  deleteRole,
  getPermissionsForRole,
  detachPermissionsFromRole
};
