/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllSupplyProducts = () => {
    return Axios.get("/supply_products");
};

let getSupplyProduct = (uuid) => {
    return Axios.get("/supply_products/" + uuid);
};

let getSupplyProducts = (supplyProduct) => {
    return Axios.get("/supply_products/" + supplyProduct.uuid, supply);
};

let addSupplyProduct = (data) => {
    return Axios.post("/supply_products", data);
};

let updateSupplyProduct = (supplyProduct) => {
    return Axios.put("/supply_products/" + supplyProduct.uuid, supply);
};

let deleteSupplyProduct = (uuid) => {
    return Axios.delete("/supply_products/" + uuid);
};

export const supplyProductService = {
    getAllSupplyProducts,
    getSupplyProduct,
    getSupplyProducts,
    addSupplyProduct,
    updateSupplyProduct,
    deleteSupplyProduct,
};