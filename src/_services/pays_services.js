/**Import des modules néccessaires */
import Axios from './caller.services'

let getAllpays = () => {
    return Axios.get('/pays')
}

let getPays = (id) => {
    return Axios.get('/pays/'+id)
}

let getpays = (pays) => {
    return Axios.get('/pays/'+pays.id,pays)
}

let addPays = (credentials) => {
    return Axios.post('/pays', credentials)
}

let updatePays = (pays) => {
    return Axios.put('/pays/'+pays.id,pays )
}

let deletePays = (id) => {
    return Axios.delete('/pays/'+id)
}

export const paysService = {
    getAllpays,
    getPays,
    getpays,
    addPays,
    updatePays,
    deletePays,
}