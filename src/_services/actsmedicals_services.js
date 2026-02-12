/**Import des modules néccessaires */
import Axios from './caller.services'

let getAllActes = () => {
    return Axios.get('/actmedical')
}

let getActe = (id) => {
    return Axios.get('/actmedical/'+id)
}

let getActes = (actmedical) => {
    return Axios.get('/actmedical/'+actmedical.id,actmedical)
}

let addActe = (credentials) => {
    return Axios.post('/actmedical', credentials)
}

let updateActe = (actmedical) => {
    return Axios.put('/actmedical/'+actmedical.id,actmedical )
}

let deleteActe = (id) => {
    return Axios.delete('/actmedical/'+id)
}

export const actsService = {
    getAllActes,
    getActe,
    getActes,
    addActe,
    updateActe,
    deleteActe,
}
