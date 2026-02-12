/* Import des modules nécessaires */
import Axios from "./caller.services";

let getDestock = () => {
  return Axios.get("/destocks");
};

let getAllusersDestock = () => {
  return Axios.get("/users-destockers");
};

export const destockageService  = {

  getDestock,

  getAllusersDestock

};
