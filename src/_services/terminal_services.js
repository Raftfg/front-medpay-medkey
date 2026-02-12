/**Import des modules néccessaires */
import Axios from "./caller.services";

let getAllterminals = () => {
  return Axios.get("/terminals");
};

let getTerminal = (id) => {
  return Axios.get("/terminals/" + id);
};

let getTerminals = (terminal) => {
  return Axios.get("/terminals/" + terminal.id, terminal);
};

let addTerminal = (credentials) => {
  return Axios.post("/terminals", credentials);
};

let updateTerminal = (terminal) => {
  return Axios.put("/terminals/" + terminal.id, terminal);
};

let deleteTerminal = (id) => {
  return Axios.delete("/terminals/" + id);
};

export const terminalService = {
  getAllterminals,
  getTerminal,
  getTerminals,
  addTerminal,
  updateTerminal,
  deleteTerminal,
};
