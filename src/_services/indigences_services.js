/** Import des modules nécessaires */
import Axios from "./caller.services";

let getAllIndigences = () => {
  return Axios.get("/indigences");
};

let getIndigence = (id) => {
  return Axios.get("/indigences/" + id);
};

let addIndigence = (credentials) => {
  return Axios.post("/indigences", credentials);
};

let updateIndigence = (indigence) => {
  return Axios.put("/indigences/" + indigence.id, indigence);
};

let deleteIndigence = (id) => {
  return Axios.delete("/indigences/" + id);
};

export const indigenceService = {
  getAllIndigences,
  getIndigence,
  addIndigence,
  updateIndigence,
  deleteIndigence,
};
