/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllSaleProducts = () => {
    return Axios.get("/sale_products");
};

let getSaleProduct = (uuid) => {
    return Axios.get("/sale_products/" + uuid);
};

let getSaleProducts = (saleProduct) => {
    return Axios.get("/sale_products/" + saleProduct.uuid, sale);
};

let addSaleProduct = (data) => {
    return Axios.post("/sale_products", data);
};

let updateSaleProduct = (saleProduct) => {
    return Axios.put("/sale_products/" + saleProduct.uuid, sale);
};

let deleteSaleProduct = (uuid) => {
    return Axios.delete("/sale_products/" + uuid);
};

export const saleProductService = {
    getAllSaleProducts,
    getSaleProduct,
    getSaleProducts,
    addSaleProduct,
    updateSaleProduct,
    deleteSaleProduct,
};