/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllProducts = () => {
    return Axios.get("/products");
};

let getProduct = (uuid) => {
    return Axios.get("/products/" + uuid);
};

let getSales = (uuid) => {
    return Axios.get("/product/" + uuid + "/sales");
};
let getSupplies = (uuid) => {
    return Axios.get("/product/" + uuid + "/supplies");
};

let getProducts = (product) => {
    return Axios.get("/products/" + product.uuid, product);
};

let addProduct = (data) => {
    return Axios.post("/products", data);
};

let updateProduct = (product) => {
    return Axios.put("/products/" + product.uuid, product);
};

let deleteProduct = (uuid) => {
    return Axios.delete("/products/" + uuid);
};

export const productService = {
    getAllProducts,
    getProduct,
    getSales,
    getSupplies,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};