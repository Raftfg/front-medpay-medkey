/**Import des modules néccessaires */
import Axios from './caller.services'



// let getPatient = (id) => {
//     return Axios.get('/patients/'+id)
// }


let requestEspece = (credentials, payementId) => {
    return Axios.post(`/especepayement/${payementId}`, credentials);
}


export const especeService = {
    requestEspece,

}