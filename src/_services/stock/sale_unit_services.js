/**Import des modules néccessaires */
import Axios from "../caller.services";

let getSaleUnit = (uuid) => {
    return Axios.get("/sale_units/" + uuid);
};

let getSaleUnits = () => {
    return Axios.get("/sale_units");
};

let addSaleUnit = (data) => {
    return Axios.post("/sale_units", data);
};

let updateSaleUnit = (saleUnit) => {
    return Axios.put("/sale_units/" + saleUnit.uuid, saleUnit);
};

let deleteSaleUnit = (uuid) => {
    return Axios.delete("/sale_units/" + uuid);
};

export const saleUnitService = {
    getSaleUnit,
    getSaleUnits,
    addSaleUnit,
    updateSaleUnit,
    deleteSaleUnit,
};