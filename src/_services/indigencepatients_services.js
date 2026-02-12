/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllIndigencespatients = () => {
  return Axios.get("/indigencespatients");
};

let getIndigencespatients = (id) => {
  return Axios.get("/indigencespatients/" + id);
};

let getPourcentage = (id) => {
  return Axios.get("/pourcentagepa/" + id);
};

let getIndigencespatient = (indigencespatient) => {
  return Axios.get(
    "/indigencespatients/" + indigencespatient.id,
    indigencespatient
  );
};

let addIndigencespatients = (credentials) => {
  return Axios.post("/indigencespatients", credentials);
};

let updateIndigencespatient = (indigencespatient) => {
  return Axios.put(
    "/indigencespatients/" + indigencespatient.id,
    indigencespatient
  );
};

let deleteIndigencespatient = (id) => {
  return Axios.delete("/indigencespatients/" + id);
};

export const IndigencespatientService = {
  getAllIndigencespatients,
  getIndigencespatients,
  getIndigencespatient,
  addIndigencespatients,
  updateIndigencespatient,
  deleteIndigencespatient,
  getPourcentage,
};
