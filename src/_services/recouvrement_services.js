/**Import des modules néccessaires */
import Axios from './caller.services'

let addRecouvrement = (formData,reference) => {
    return Axios.post('/addRecouvrement/'+ reference, formData)
}

let getAllRecouvrements = () => {
    return Axios.get("/recouvrements");
  };
  
export const recouvrementService = {
    addRecouvrement,
    getAllRecouvrements
}