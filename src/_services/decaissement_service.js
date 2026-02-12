/**Import des modules néccessaires */
import Axios from './caller.services'




let getdecaisse = () => {
    return Axios.get('/getDecaissement')
}

let getdecaissement = () => {
    return Axios.get('/getgrapheDecaissement')
}


export const DecaisseService = {
    getdecaisse ,
    getdecaissement,
}