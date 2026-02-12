/**Import des modules néccessaires */
import Axios from "../caller.services";

//get all drugs in the database
let getAllDrugs = () => {
    return Axios.get("/product/drugs");
};
//get all drugs in the database
let getAllAvailableDrugs = () => {
    return Axios.get("/drugs/available");
};

//get the product formatted
let getProductFormatted = (typeIdentifiant, identifiant) => {
    return Axios.get("/product-formatted/" + typeIdentifiant + "/" + identifiant);
};

//get all consumables in the database
let getAllConsumables = () => {
    return Axios.get("/product/consumables");
};

//get all notebooks and cards in the database
let getAllNotebooksAndCards = () => {
    return Axios.get("/product/notebooks_and_cards");
};

//get all products in the database
let getAllProductSpecifications = () => {
    return Axios.get("/products");
};

let getProductSpecification = (uuid) => {
    return Axios.get("/products/" + uuid);
};
let getProductLocations = (uuid) => {
    return Axios.get("/product/" + uuid + "/locations");
};

let getSupplyProducts = (uuid) => {
    return Axios.get("/product/" + uuid + "/supply-products");
};

let getProductSpecifications = (product) => {
    return Axios.get("/products/" + product.uuid, product);
};

let addProductSpecification = (data) => {
    return Axios.post("/products", data);
};

let updateProductSpecification = (product) => {
    return Axios.put("/products/" + product.uuid, product);
};

let deleteProductSpecification = (uuid) => {
    return Axios.delete("/products/" + uuid);
};

export const productSpecificationService = {
    getAllProductSpecifications,
    getProductFormatted,
    getProductLocations,
    getAllNotebooksAndCards,
    getAllConsumables,
    getSupplyProducts,
    getAllDrugs,
    getAllAvailableDrugs,
    getProductSpecification,
    getProductSpecifications,
    addProductSpecification,
    updateProductSpecification,
    deleteProductSpecification,
};
