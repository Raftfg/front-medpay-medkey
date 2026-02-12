/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllSales = () => {
    return Axios.get("/supplies");
};

let getSale = (uuid) => {
    return Axios.get("/supplies/" + uuid);
};

let getProducts = (uuid) => {
    return Axios.get("/sale/" + uuid + "/products");
};

let getSales = (sale) => {
    return Axios.get("/supplies/" + sale.uuid, sale);
};

let addSale = (data) => {
    return Axios.post("/supplies", data);
};

let updateSale = (sale) => {
    return Axios.put("/supplies/" + sale.uuid, sale);
};

let deleteSale = (uuid) => {
    return Axios.delete("/supplies/" + uuid);
};

export const saleService = {
    getAllSales,
    getSale,
    getProducts,
    getSales,
    addSale,
    updateSale,
    deleteSale,
};