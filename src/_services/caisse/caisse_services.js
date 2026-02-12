/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllCaisse = () => {
  return Axios.get("/cashregister");
};

let addFund = (uuid, amount) => {
  return Axios.put(`/addfund/${uuid}/${amount}`);
};

let getHistoriqueOpen = () => {
  return Axios.get("/gethistoriqueopen");
};

let getHistoriqueClose = () => {
  return Axios.get("/gethistoriqueclose");
};

let getCashiersCashRegister = (id) => {
  return Axios.get("/getcashierscashregister/" + id);
};

let getUserByID = (id) => {
  return Axios.get("/getuserbyid/" + id);
};

let getSolde = (id) => {
  return Axios.get("/get-solde/" + id);
};

let getCashRegisterCashier = (id) => {
  return Axios.get("/getcashregistercashier/" + id);
};

let countProducts = () => {
  return Axios.get("/stock-pharmacie/count-products/");
};

let addCashRegister = (credentials) => {
  return Axios.post("/cashregister", credentials);
};

let updateCashRegister = (credentials, uuid) => {
  return Axios.put("/cashregister/" + uuid, credentials);
};

let updateAffectCashier = (credentials, uuid) => {
  return Axios.put("/affectcashier/" + uuid, credentials);
};

// let updateAffectCashier = (cash) => {
//   return Axios.put("/affectcashier/" + cash.uuid, cash);
// };

let cashRegisterTransfert = (credentials) => {
  return Axios.post("/cashregistertransfert", credentials);
};

let getCashRegisterTransfert = () => {
  return Axios.get("/cashregistertransfert");
};

let getApprover = () => {
  return Axios.get("/getapprover");
};

let affectCashier = (credentials) => {
  return Axios.post("/affectcashier", credentials);
};

let getAllCashiersCashRegister = () => {
  return Axios.get("/affectcashier");
};

let getCashiers = () => {
  return Axios.get("/caissiers");
};

let openCloseCashRegister = (credentials) => {
  return Axios.post("/openclosecashregister", credentials);
};

 let chooseCashRegister = (cashRegisterID, cashierID) => {
  return Axios.put(`/choosecashregister/${cashRegisterID}/${cashierID}`, { cashRegisterID });
 };


export const caisseService = {
  getAllCaisse,
  getAllCashiersCashRegister,
  updateAffectCashier,
  updateCashRegister,
  countProducts,
  chooseCashRegister,
  getCashRegisterTransfert,
  cashRegisterTransfert,
  getApprover,
  getCashRegisterCashier,
  getHistoriqueOpen,
  getHistoriqueClose,
  getSolde,
  addFund,
  addCashRegister,
  openCloseCashRegister,
  affectCashier,
  getCashiers,
  getCashiersCashRegister,
  getUserByID,
};
