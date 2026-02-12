/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllCaisses = () => {
  return Axios.get("/encaissement");
};

let getCaisses = (id) => {
  return Axios.get("/encaissement/" + id);
};

let getCaisse = (encaissement) => {
  return Axios.get("/encaissement/" + encaissement.id, encaissement);
};

let addCaisse = (credentials) => {
  return Axios.post("/encaissement", credentials);
};

let updateCaisse = (encaissement) => {
  return Axios.put("/encaissement/" + encaissement.id, encaissement);
};

let deleteCaisse = (id) => {
  return Axios.delete("/encaissement/" + id);
};

let getencaissement = () => {
  return Axios.get('/getgrapheEncaissement')
}
export const encaissementService = {
  getAllCaisses,
  getCaisse,
  getCaisses,
  addCaisse,
  updateCaisse,
  deleteCaisse,
  getencaissement,
};
