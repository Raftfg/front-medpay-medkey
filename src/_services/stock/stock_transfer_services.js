/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAllStockTransfrransfers = () => {
    return Axios.get("/stock_transfers");
};

let getStockTransfer = (uuid) => {
    return Axios.get("/stock_transfers/" + uuid);
};

let getProducts = (uuid) => {
    return Axios.get("/stockTransfer/" + uuid + "/products");
};

// let getStockTransfers(supply) => {
//     return Axios.get("/stock_transfers/" + stockTransfer.uuid, stockTransfer);
// };

let addStockTransfer = (data) => {
    return Axios.post("/stock_transfers", data);
};

let updateStockTransfer = (stockTransfer) => {
    return Axios.put("/stock_transfers/" + stockTransfer.uuid, stockTransfer);
};

let deleteStockTransfer = (uuid) => {
    return Axios.delete("/stock_transfers/" + uuid);
};

export const stockTransferService = {
    getAllStockTransfrransfers,
    getStockTransfer,
    getProducts,
    // getStockTransfrransfers,
    addStockTransfer,
    updateStockTransfer,
    deleteStockTransfer,
};