/**Import des modules néccessaires */
import Axios from './caller.services'

let getAllModePayement= () => {
    return Axios.get('/modepayement')
}

let getModePayement = (id) => {
    return Axios.get('/modepayement/'+id)
}


export const modePayementService = {
    getAllModePayement,
    getModePayement,

}