/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllStockTransferProducts = () => {
    return Axios.get("/stock_transfer_products");
};

let getStockTransferProduct = (uuid) => {
    return Axios.get("/stock_transfer_products/" + uuid);
};

let getStockTransferProducts = (supplyProduct) => {
    return Axios.get("/stock_transfer_products/" + supplyProduct.uuid, supply);
};

let addStockTransferProduct = (data) => {
    return Axios.post("/stock_transfer_products", data);
};

let updateStockTransferProduct = (supplyProduct) => {
    return Axios.put("/stock_transfer_products/" + supplyProduct.uuid, supply);
};

let deleteStockTransferProduct = (uuid) => {
    return Axios.delete("/stock_transfer_products/" + uuid);
};

export const supplyProductService = {
    getAllStockTransferProducts,
    getStockTransferProduct,
    getStockTransferProducts,
    addStockTransferProduct,
    updateStockTransferProduct,
    deleteStockTransferProduct,
};