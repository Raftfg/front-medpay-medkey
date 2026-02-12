/**Import des modules néccessaires */
import Axios from './caller.services'




let getCount = () => {
    return Axios.get('/patientcount')
}



export const countService = {
    getCount

}