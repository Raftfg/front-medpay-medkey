/**Import des modules néccessaires */
import Axios from "./caller.services";


let getPourcentagePatient = (id) => {
  return Axios.get("/pourcentagepatient/" + id);
};

// let getPatients = (patient) => {
//   return Axios.get("/patients/" + patient.id, patient);
// };


export const pourcentagePatient = {
  getPourcentagePatient,

};
