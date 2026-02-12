/**Import des modules néccessaires */
import Axios from './caller.services'




let getMontant = () => {
    return Axios.get('/recette')
}



export const recetteService = {
    getMontant

}