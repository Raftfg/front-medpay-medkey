/**Import des modules néccessaires */
import Axios from "../caller.services";

let destock = (formData) => {
    return Axios.post("/destock/products", formData);
};

let getProductsMovment = (movmentid) => {
    return Axios.get("/movement/" + movmentid + "/products");
};

export const pharmacyService = {
    getProductsMovment,
    destock
}