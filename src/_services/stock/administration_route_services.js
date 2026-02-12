/**Import des modules néccessaires */
import Axios from "../caller.services";

let getAdministrationRoute = (uuid) => {
    return Axios.get("/administration_routes/" + uuid);
};

let getAdministrationRoutes = () => {
    return Axios.get("/administration_routes");
};

let addAdministrationRoute = (data) => {
    return Axios.post("/administration_routes", data);
};

let updateAdministrationRoute = (administrationRoute) => {
    return Axios.put("/administration_routes/" + administrationRoute.uuid, administrationRoute);
};

let deleteAdministrationRoute = (uuid) => {
    return Axios.delete("/administration_routes/" + uuid);
};

export const administrationRouteService = {
    getAdministrationRoute,
    getAdministrationRoutes,
    addAdministrationRoute,
    updateAdministrationRoute,
    deleteAdministrationRoute,
};