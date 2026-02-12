/**Import des modules nécessaires */
import Axios from "./caller.services";

let getAllTypeVacations = (params) => {
  return Axios.get("/type_vacations", { params });
};

export const typeVacationService = {
  getAllTypeVacations,
};

