/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllEspece = () => {
  return Axios.get("/factures/especes");
};

let getAllMomos = () => {
  return Axios.get("/factures/momos");
};

let getAllFedapay = () => {
  return Axios.get("/factures/fedapay");
};

let getAllFatures = (filters) => {
  return Axios.get("/factures", { params: filters });
};

let getBillsImpaye = () => {
  return Axios.get("/getbillsimpaye");
};

let getListMovments = () => {
  return Axios.get("/search-movments");
};


let getActMovment = (movmentid) => {
  return Axios.get("/getactsmovment/" + movmentid);
};

let getProductDetailByUuidLot = (uuid) => {
  return Axios.get("/product/lot/" + uuid + "/details");
};


let getListProductByreference = (reference) => {
  return Axios.get("/getlistproductbyreference/" + reference);
};



let getLotProductByUUID = (uuid) => {
  return Axios.get("/product/" + uuid + "/lots/in-stock");
};

let payementFacture = (cashRegister, reference, modePayementsId, partialAmount = null) => {

  return Axios.get(`/payementfacture/${cashRegister}/${reference}/${modePayementsId}/${partialAmount}`);

};

let listBillsByMovment = (movmentid) => {
  return Axios.get("/listbillsbymovment/" + movmentid);
};


let listBillsForsaleProduct = (formData) => {
  return Axios.post("/listbillsforsaleproduct", formData);
};

let destockProduct = (formData) => {
  return Axios.post("/destock/products/by-lot-uuid", formData);
};



let getInsuranceDetailsByIpp = (ipp) => {
  return Axios.get("/getinsurancedetailsbyIpp/" + ipp);
};

let getActe = (id) => {
  return Axios.get("/getact/" + id);
};

let getPatientInfo = (movmentid) => {
  return Axios.get("/patientmovment/" + movmentid);
};


let getAllRapportGeneral = () => {
  return Axios.get("/rapportgeneral");
};

let getRecent = () => {
  return Axios.get("/listfact");
};
let getListMovment = () => {
  return Axios.get("/listmovment");
};

let searchMovments = (formData) => {
  return Axios.post("/search-movments", formData);
};

let getFacture = (reference) => {
  return Axios.get("/factures/" + reference);
};

let getGenerateCodeQR = (id) => {
  return Axios.get("/facture/codeqr/" + id);
};

// let requestFacture = (payementId, factures) => {
//   return Axios.post(`/facture/${payementId}`, { factures });
// };

let gettransactionKikiapay = (transaction_id) => {
  return Axios.get("/kkiapay/" + transaction_id);
};
let requestMomo = (credentials) => {
  return Axios.post("/mtn", credentials);
}

let requestFacture = (credentials) => {
  return Axios.post("/factures", credentials);
};

let addCommune = (credentials) => {
  return Axios.post("/commune", credentials);
};

let filtreDate = (formData) => {
  return Axios.post("/rapports/filtrer", formData);
};

let getUserCentre = (caissierId) => {
  return Axios.get("/rapport/caissier/" + caissierId);
};
const getUserCentr = (hopital) => {
  return Axios.get("/rapporthopital/" + hopital);
};
const getUserDepart = (departe) => {
  return Axios.get("/rapportdeparte/" + departe);
};
const getUserCom = (com) => {
  return Axios.get("/rapportcom/" + com);
};
const getUserAron = (aron) => {
  return Axios.get("/rapportaron/" + aron);
};
const getUserQuar = (quart) => {
  return Axios.get("/rapportquart/" + quart);
};

let getFacturesToday = () => {
  return Axios.get("/rapport/users");
};

let getFacturesTerminalToday = () => {
  return Axios.get('/rapport/terminal')
}

let getFactureTerminal = (terminalId) => {
  return Axios.get('/rapport/' + terminalId)
}

let getDailyStatistics = () => {
  return Axios.get('/getdailystatistics/')
}

let getDetailFacture = (reference) => {
  return Axios.get('/getdetailfacture/' + reference)
}


let getCashRegisterCashierCurrent = (caissierId) => {
  return Axios.get('/getcashregistercashiercurrent/' + caissierId)
}


let getHistoricalCurrent = (CashRegisterID) => {
  return Axios.get('/gethistoricalcurrent/' + CashRegisterID)
}

let getPostPdf = () => {
  return Axios.get('/getpostpdf', { responseType: 'blob' });
}


export const factureService = {
  getBillsImpaye,
  getPostPdf,
  getLotProductByUUID,
  getDailyStatistics,
  destockProduct,
  getListProductByreference,
  listBillsByMovment,
  requestFacture,
  getProductDetailByUuidLot,
  payementFacture,
  listBillsForsaleProduct,
  gettransactionKikiapay,
  getInsuranceDetailsByIpp,
  requestMomo,
  searchMovments,
  getCashRegisterCashierCurrent,
  getHistoricalCurrent,
  getListMovments,
  getListMovment,
  getPatientInfo,
  getActe,
  getActMovment,
  getFacturesTerminalToday,
  getFactureTerminal,
  getUserDepart,
  getUserCom,
  getUserAron,
  getUserQuar,
  getAllRapportGeneral,
  getAllFatures,
  getFacture,
  getUserCentr,
  getGenerateCodeQR,
  filtreDate,
  getRecent,
  getAllEspece,
  getAllMomos,
  getAllFedapay,
  getUserCentre,
  getFacturesToday,
    getPostPdf,
    getDetailFacture,
    getLotProductByUUID,
    getDailyStatistics,
    destockProduct,
    getListProductByreference,
    listBillsByMovment,
    requestFacture,
    getProductDetailByUuidLot,
    payementFacture,
    listBillsForsaleProduct,
    gettransactionKikiapay,
    getInsuranceDetailsByIpp,
    requestMomo,
    searchMovments,
    getCashRegisterCashierCurrent,
    getHistoricalCurrent,
    getListMovments,
    getListMovment,
    getPatientInfo,
    getActe,
    getActMovment,
    getFacturesTerminalToday,
    getFactureTerminal,
    getUserDepart,
    getUserCom,
    getUserAron,
    getUserQuar,
    getAllRapportGeneral,
    getAllFatures,
    getFacture,
    getUserCentr,
    getGenerateCodeQR,
    filtreDate,
    getRecent,
    getAllEspece,
    getAllMomos,
    getAllFedapay,
    getUserCentre,
    getFacturesToday,

  getUserDepart,
  getUserCom,
  getUserAron,
  getUserQuar,
  requestFacture,
  getAllRapportGeneral,

}









