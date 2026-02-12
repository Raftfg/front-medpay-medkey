/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllTypeProducts = () => {
    return Axios.get("/type_products");
};

let getCategories = (uuid) => {
    return Axios.get("/type_product/" + uuid + "/categories");
};

let getTypeProduct = (uuid) => {
    return Axios.get("/type_products/" + uuid);
};

let getTypeProducts = (type_product) => {
    return Axios.get("/type_products/" + type_product.uuid, type_product);
};

let addTypeProduct = (data) => {
    return Axios.post("/type_products", data);
};

let updateTypeProduct = (type_product) => {
    return Axios.put("/type_products/" + type_product.uuid, type_product);
};

let deleteTypeProduct = (uuid) => {
    return Axios.delete("/type_products/" + uuid);
};

export const typeProductService = {
    getAllTypeProducts,
    getCategories,
    getTypeProduct,
    getTypeProducts,
    addTypeProduct,
    updateTypeProduct,
    deleteTypeProduct,
};