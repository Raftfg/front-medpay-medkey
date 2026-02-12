/**Import des modules néccessaires */
import Axios from './caller.services'



// let getPatient = (id) => {
//     return Axios.get('/patients/'+id)
// }


let requestPayement = (credentials) => {
    return Axios.post('/payement', credentials) 
}


let gettransactionKikiapay = (transaction_id) => {
    return Axios.get("/kkiapay/" + transaction_id);
  };

export const payementService = {
    requestPayement,
    gettransactionKikiapay

}