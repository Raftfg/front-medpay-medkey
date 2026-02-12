/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllSupplies = () => {
    return Axios.get("/supplies");
};

let getSupply = (uuid) => {
    return Axios.get("/supplies/" + uuid);
};

let getProducts = (uuid) => {
    return Axios.get("/supply/" + uuid + "/products");
};

let getSupplies = (supply) => {
    return Axios.get("/supplies/" + supply.uuid, supply);
};

let addSupply = (data) => {
    return Axios.post("/supplies", data);
};

let updateSupply = (supply) => {
    return Axios.put("/supplies/" + supply.uuid, supply);
};

let deleteSupply = (uuid) => {
    return Axios.delete("/supplies/" + uuid);
};

export const supplyService = {
    getAllSupplies,
    getSupply,
    getProducts,
    getSupplies,
    addSupply,
    updateSupply,
    deleteSupply,
};