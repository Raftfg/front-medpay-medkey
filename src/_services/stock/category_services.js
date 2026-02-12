/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllCategories = () => {
    return Axios.get("/categories");
};

let getCategory = (uuid) => {
    return Axios.get("/categories/" + uuid);
};

let getCategories = (category) => {
    return Axios.get("/categories/" + category.uuid, category);
};

let addCategory = (data) => {
    return Axios.post("/categories", data);
};

let updateCategory = (category) => {
    return Axios.put("/categories/" + category.uuid, category);
};

let deleteCategory = (uuid) => {
    return Axios.delete("/categories/" + uuid);
};

export const categoryService = {
    getAllCategories,
    getCategory,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
};