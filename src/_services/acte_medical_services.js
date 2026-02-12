/**Import des modules néccessaires */
import Axios from './caller.services'



let getActesMedicalsALL = () => {
    return Axios.get("/actmedical");
  };

let getacteMedical = (id) => {
    return Axios.get('/actmedical/'+id)
}
export const acteMedicalService = {
    getacteMedical,
    getActesMedicalsALL

}