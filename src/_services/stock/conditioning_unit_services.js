/**Import des modules néccessaires */
import Axios from "../caller.services";

let getConditioningUnit = (uuid) => {
    return Axios.get("/conditioning_units/" + uuid);
};

let getConditioningUnits = () => {
    return Axios.get("/conditioning_units");
};

let addConditioningUnit = (data) => {
    return Axios.post("/conditioning_units", data);
};

let updateConditioningUnit = (conditioningUnit) => {
    return Axios.put("/conditioning_units/" + conditioningUnit.uuid, conditioningUnit);
};

let deleteConditioningUnit = (uuid) => {
    return Axios.delete("/conditioning_units/" + uuid);
};

export const conditioningUnitService = {
    getConditioningUnit,
    getConditioningUnits,
    addConditioningUnit,
    updateConditioningUnit,
    deleteConditioningUnit,
};