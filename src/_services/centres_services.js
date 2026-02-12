/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllcentres = () => {
  return Axios.get("/centresanitaire");
};

let getCentres = (id) => {
  return Axios.get("/centresanitaire/" + id);
};

let getCentre = (centresanitaire) => {
  return Axios.get("/centresanitaire/" + centresanitaire.id, centresanitaire);
};

let addCentre = (credentials) => {
  return Axios.post("/centresanitaire", credentials);
};

let updateCentre = (centresanitaire) => {
  return Axios.put("/centresanitaire/" + centresanitaire.id, centresanitaire);
};

let deleteCentre = (id) => {
  return Axios.delete("/centresanitaire/" + id);
};

export const centreService = {
  getAllcentres,
  getCentre,
  getCentres,
  addCentre,
  updateCentre,
  deleteCentre,
};
