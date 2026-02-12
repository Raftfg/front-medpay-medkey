/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllSignataires = () => {
  return Axios.get("/signataires");
};

let getSignataire = (id) => {
  return Axios.get("/signataires/" + id);
};

let getSignataires = (signataire) => {
  return Axios.get("/signataires/" + signataire.id, signataire);
};

let addSignataire = (credentials) => {
  return Axios.post("/signataires", credentials);
};

let updateSignataire = (signataire) => {
  return Axios.put("/signataires/" + signataire.id, signataire);
};

let getRoleUser = (uuid) => {
  return Axios.get(`/users/titre/${uuid}`);
}

let deleteSignataire = (id) => {
  return Axios.delete("/signataires/" + id);
};



export const SignataireService = {
  getRoleUser,
  getAllSignataires ,
  getSignataire,
  getSignataires,
  addSignataire,
  updateSignataire,
  deleteSignataire
};
