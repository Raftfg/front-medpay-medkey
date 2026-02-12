/* Import des modules nécessaires */
import Axios from "./caller.services";

let getAllInsurances = () => {
  return Axios.get("/insurances");
};

let getInsurance = (uuid) => {
  return Axios.get("/insurances/" + uuid);
};

let getInsurances = (insurance) => {
  return Axios.get("/insurances/" + insurance.uuid, insurance);
};

let addInsurance = (data) => {
  return Axios.post("/insurances", data);
};

let updateInsurance = (insurance) => {
  return Axios.put("/insurances/" + insurance.uuid, insurance);
};

let deleteInsurance = (uuid) => {
  return Axios.delete("/insurances/" + uuid);
};


let getInsuranceWithPacks= (uuid) =>{
  return Axios.get("/insurances/{insuranceId}/with-packs" + uuid);
}

// let getAssurancess = (compagnieId) => {
//   return Axios.get("/assuran?compagnieId=" + compagnieId);
// };

// let getPourcentageByAssurance = (assuranceId) => {
//   return Axios.get("/assuran/" + assuranceId + "/pourcentage");
// };

export const insuranceService  = {
  getAllInsurances,
  getInsuranceWithPacks,
  getInsurance,
  getInsurances,
  addInsurance,
  updateInsurance,
  deleteInsurance,
 
 
};

