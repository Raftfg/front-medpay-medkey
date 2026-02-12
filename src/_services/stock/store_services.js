/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllStores = () => {
    return Axios.get("/stores");
};

let getStocks = (uuid) => {
    return Axios.get("/store/" + uuid + "/stocks");
};

let getSupplies = (uuid) => {
    return Axios.get("/store/" + uuid + "/supplies");
};

let getStockTransfers = (uuid) => {
    return Axios.get("/store/" + uuid + "/stock_transfers");
};

let getStore = (uuid) => {
    return Axios.get("/stores/" + uuid);
};

let getStores = (store) => {
    return Axios.get("/stores/" + store.uuid, store);
};

let addStore = (data) => {
    return Axios.post("/stores", data);
};

let updateStore = (store) => {
    return Axios.put("/stores/" + store.uuid, store);
};

let deleteStore = (uuid) => {
    return Axios.delete("/stores/" + uuid);
};

export const storeService = {
    getAllStores,
    getStocks,
    getStore,
    getStores,
    addStore,
    updateStore,
    deleteStore,
    getSupplies,
    getStockTransfers
};