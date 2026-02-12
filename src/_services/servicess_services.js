/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllServices = () => {
  return Axios.get("/services");
};

let getService = (id) => {
  return Axios.get("/services/" + id);
};

let getServices = (service) => {
  return Axios.get("/services/" + service.id, service);
};

let addServices = (credentials) => {
  return Axios.post("/services", credentials);
};

let updateService = (service) => {
  return Axios.put("/services/" + service.uuid, service);
};

let deleteService = (uuid) => {
  return Axios.delete("/services/" + uuid);
};

// const getPaymentsByService = (serviceId) => {
//   return Axios.get(`/services/${serviceId}/payment`);
// };

export const serviceService = {
  getAllServices,
  getService,
  getServices,
  addServices,
  updateService,
  deleteService,
};
