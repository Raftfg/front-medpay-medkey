/* Import des modules nécessaires */
import Axios from "./caller.services";

let getAllPacks = () => {
  return Axios.get("/packs");
};

let getPack = (uuid) => {
  return Axios.get("/packs/" + uuid);
};

let addPack = (pack) => {
  return Axios.post("/packs", pack);
};


let getPackByAssurance = (assuranceId) => {
  return Axios.get("/pack/" + assuranceId);
};

let getPacksOfInsuranceByPack = (packId) => {
  return Axios.get("/pack/" + packId+ "/insurance/packs");
};

let updatePack = (pack) => {
  return Axios.put("/packs/" + pack.uuid, pack);
};

let deletePack = (uuid) => {
  return Axios.delete("/packs/" + uuid);
};

export const packService = {
  getAllPacks,
  getPack,
  addPack,
  getPackByAssurance,
  getPacksOfInsuranceByPack,
  updatePack,
  deletePack,
  
};
