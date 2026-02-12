/**Import des modules néccessaires */
import Axios from "./caller.services";

// nombre patient
let getPatientSats = () => {
    return Axios.get("report/patients/statics");
};
// nombre patient
let getServicesSats = () => {
    return Axios.get("report/services/statics");
};

let getCount = () => {
    return Axios.get("/patients/count");
};

let getCountHospitalizedPatients = () => {
    return Axios.get("/count-hospitalized-patients");
};

//Stock Methods Start
// Count distinct drugs in stock
let getCountDrugsInStock = () => {
    return Axios.get("/stock-products/count-distinct-drugs-in-all-stocks");
};
let getDrugsInStock = () => {
    return Axios.get("/drugs-available");
};
let getDrugsInASpecificStock = (stockUuid) => {
    return Axios.get("/stock/" + stockUuid + "/drugs");
};

let getConsumablesInASpecificStock = (stockUuid) => {
    return Axios.get("/stock/" + stockUuid + "/consumables");
};

let getNotebooksInASpecificStock = (stockUuid) => {
    return Axios.get("/stock/" + stockUuid + "/notebooks_and_cards");
};

let showDrugInStock = (uuid) => {
    return Axios.get("/stock_products/" + uuid);
};

// Count distinct consumables in stock
let getCountConsumablesInStock = () => {
    return Axios.get("/stock-products/count-distinct-consumables-in-all-stocks");
};
let getConsumablesInStock = () => {
    return Axios.get("/consumables-available");
};

// Count distinct notebooks and cards in stock
let getCountNotebookAndCardsInStock = () => {
    return Axios.get(
        "/stock-products/count-distinct-notebooks-and-cards-in-all-stocks"
    );
};
let getNotebooksInStock = () => {
    return Axios.get("/notebooks-available");
};

// Count distinct drugs out of stock
let getCountDrugsOutOfStock = () => {
    return Axios.get("/stock-products/get-out-of-stock-drugs");
};

// Count distinct consumables out of stock
let getCountConsumablesOutOfStock = () => {
    return Axios.get("/stock-products/get-out-of-stock-consumables");
};

// Count distinct notebooks and cards out of stock
let getCountNotebookAndCardsOutOfStock = () => {
    return Axios.get("/stock-products/get-out-of-stock-notebook-and-cards");
};

// Count expire drugs in stock
let getCountExpiredDrugsInStock = () => {
    return Axios.get("/stock-products/get-expire-drugs");
};
//Stock Methods End

//Facturation et caisses
let getDailyStatistics = () => {
    return Axios.get("/getdailystatistics");
};

//get report by cash register
let generateCashReport = (cashRegisterId, date) => {
    return Axios.get("/generatecashreport/" + cashRegisterId + "/" + date);
};

let getBillsByCashier = (filters) => {
    return Axios.get("/getbillsbycashier", { params: filters });
};

//get rapport bills by periode or status
let getRreportbillsPeriod = (filters) => {
    return Axios.get("/reportbillsperiod", { params: filters });
};

let getRreportProdcutDestock = (filters) => {
    return Axios.get("/user-destocked-product-on-date", { params: filters });
};

//End get report by cash register

let countProducts = () => {
    return Axios.get("/stock-pharmacie/count-products");
};

export const rapport_statistiqueService = {
    //Patient services
    getPatientSats,
    getServicesSats,
    getBillsByCashier,
    getRreportbillsPeriod,
    getRreportProdcutDestock,
    getCount,
    getCountHospitalizedPatients,
    getConsumablesInASpecificStock,
    getNotebooksInASpecificStock,

    //Report Cash Register
    generateCashReport,
    //Stock Methods Start
    //Stock Methods Start
    getCountDrugsInStock,
    getDrugsInStock,
    showDrugInStock,
    getDailyStatistics,
    countProducts,
    getCountConsumablesInStock,
    getConsumablesInStock,
    getCountNotebookAndCardsInStock,
    getNotebooksInStock,
    getCountDrugsOutOfStock,
    getCountConsumablesOutOfStock,
    getCountNotebookAndCardsOutOfStock,
    getCountExpiredDrugsInStock,
    getDrugsInASpecificStock,
    //Stock Methods End
}; //Stock Methods End