/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllDecaisses = () => {
  return Axios.get("/decaissement");
};

let getUrl = () => {
  return Axios.get("/decaissement");
}

let getDecaisses = (id) => {
  return Axios.get("/decaissement/" + id);
};

let getFile = (id) => {
  return Axios.get('/decaissement/${id}/facture');
};

let getDecaisse = (decaissement) => {
  return Axios.get("/decaissement/" + decaissement.id, decaissement);
};

let addDecaisse = (credentials) => {
  return Axios.post("/decaissement", credentials);
};

let updateDecaisse = (decaissement) => {
  return Axios.post("/decaissement/" + decaissement.get('id'), decaissement);
};

let deleteDecaisse = (id) => {
  return Axios.delete("/decaissement/" + id);
};

export const decaissementService = {
  getAllDecaisses,
  getUrl,
  getDecaisse,
  getDecaisses,
  addDecaisse,
  updateDecaisse,
  deleteDecaisse,
  getFile
};
