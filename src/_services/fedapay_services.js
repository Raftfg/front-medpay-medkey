/**Import des modules néccessaires */
import Axios from './caller.services'



// let getPatient = (id) => {
//     return Axios.get('/patients/'+id)
// }


let requestFedapay= (credentials, payementId) => {
    return Axios.post(`/fedapay/${payementId}`, credentials);
}




export const fedapayService = {
    requestFedapay,

}