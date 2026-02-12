/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllStocks = () => {
    return Axios.get("/stocks");
};

//get all drugs of a given stock
let getAllProducts = (uuid) => {
    return Axios.get("/stock/" + uuid + "/products");
};

//get all drugs of a given stock
let getAllProductsAvailable = (uuid) => {
    return Axios.get("/stock/" + uuid + "/products-available");
};

//get all drugs of a given stock
let getAllDrugs = (uuid) => {
    return Axios.get("/stock/" + uuid + "/drugs");
};

//get all consumables of a given stock
let getAllConsumables = (uuid) => {
    return Axios.get("/stock/" + uuid + "/consumables");
};

//get all notebooks and cards of a given stock
let getAllNotebooksAndCards = (uuid) => {
    return Axios.get("/stock/" + uuid + "/notebooks_and_cards");
};

let getStock = (uuid) => {
    return Axios.get("/stocks/" + uuid);
};

let getProductQuantity = (productIdentifier, stockIdentifier) => {
    return Axios.get("/product/" + productIdentifier + "/quantity-in-stock/" + stockIdentifier);
};

let getStocks = (store) => {
    return Axios.get("/stocks/" + store.uuid, store);
};

let addStock = (data) => {
    return Axios.post("/stocks", data);
};

let updateStock = (store) => {
    return Axios.put("/stocks/" + store.uuid, store);
};

let deleteStock = (uuid) => {
    return Axios.delete("/stocks/" + uuid);
};

export const stockService = {
    getAllStocks,
    getAllDrugs,
    getProductQuantity,
    getAllConsumables,
    getAllNotebooksAndCards,
    getAllProducts,
    getAllProductsAvailable,
    getStock,
    getStocks,
    addStock,
    updateStock,
    deleteStock,
};