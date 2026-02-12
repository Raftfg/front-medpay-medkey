/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllcommunes = () => {
  return Axios.get("/commune");
};

let getCommune = (id) => {
  return Axios.get("/commune/" + id);
};

let getCommunes = (departementId) => {
  return Axios.get("/communes?departementId=" + departementId);
};

let getcommune = (commune) => {
  return Axios.get("/commune/" + commune.id, commune);
};

let addCommune = (credentials) => {
  return Axios.post("/commune", credentials);
};

let updateCommune = (commune) => {
  return Axios.put("/commune/" + commune.id, commune);
};

let deleteCommune = (id) => {
  return Axios.delete("/commune/" + id);
};

export const communeService = {
  getAllcommunes,
  getCommune,
  getCommunes,
  getcommune,
  addCommune,
  updateCommune,
  deleteCommune,
};
