/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllSuppliers = () => {
    return Axios.get("/suppliers");
};

let getSupplier = (uuid) => {
    return Axios.get("/suppliers/" + uuid);
};

let addSupplier = (data) => {
    return Axios.post("/suppliers", data);
};

let updateSupplier = (supplier) => {
    return Axios.put("/suppliers/" + supplier.uuid, supplier);
};

let deleteSupplier = (uuid) => {
    return Axios.delete("/suppliers/" + uuid);
};

export const supplierService = {
    getAllSuppliers,
    getSupplier,
    addSupplier,
    updateSupplier,
    deleteSupplier,
};