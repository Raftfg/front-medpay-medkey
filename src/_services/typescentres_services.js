/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAlltypes = () => {
  return Axios.get("/typecentre");
};

let getType = (id) => {
  return Axios.get("/typecentre/" + id);
};

let getTypes = (typecentre) => {
  return Axios.get("/typecentre/" + typecentre.id, typecentre);
};

let addType = (credentials) => {
  return Axios.post("/typecentre", credentials);
};

let updateType = (typecentre) => {
  return Axios.put("/typecentre/" + typecentre.id, typecentre);
};

let deleteType = (id) => {
  return Axios.delete("/typecentre/" + id);
};

export const typescentresService = {
  getAlltypes,
  getType,
  getTypes,
  addType,
  updateType,
  deleteType,
};
