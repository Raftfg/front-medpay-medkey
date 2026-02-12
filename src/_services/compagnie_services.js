/** Import des modules nécessaires */
import Axios from "./caller.services";

let getAllCompagnies = () => {
  return Axios.get("/compagnies");
};

let getCompagnies = (id) => {
  return Axios.get("/compagnies/" + id);
};

let addCompagnie = (compagnie) => {
  return Axios.post("/compagnies", compagnie);
};

let updateCompagnie = (compagnie) => {
  return Axios.put("/compagnies/" + compagnie.id, compagnie);
};

let deleteCompagnie = (id) => {
  return Axios.delete("/compagnies/" + id);
};
const getAssuranceByCompagnie = (compagnieId) => {
  return Axios.get(`/compagniess/${compagnieId}/assurances`);
};

export const compagnieService = {
  getAllCompagnies,
  getCompagnies,
  getAssuranceByCompagnie,
  addCompagnie,
  updateCompagnie,
  deleteCompagnie,
};
