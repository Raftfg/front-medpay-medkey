/**Import des modules néccessaires */
import Axios from "./caller.services";
let getAllMovments = (q) => {
  return Axios.get("/get-all/movments?q="+q);
};


let getActiveMovments = (params) => {
  return Axios.get("/movments",{params});
};

let getActiveConsultaionMovments = (params) => {
  return Axios.get("consultation/movments",{params});
};


let getServiceByCode = (code) => {
  return Axios.get("/services-by-code/" + code);
};

///Imageries

let addImagerieRecords = (params,config) => {
  return Axios.post("/imagerie_records",  params ,config );
};

let getImagerieRecords = (params) => {
  return Axios.get("/imagerie_records",{params});
};


/***Laboratoire ***/
let addLaboratoireRecords = (params) => {
  return Axios.post("/laboratoire_records",  params  );
};
let getLaboratoireRecords = (params) => {
  return Axios.get("/laboratoire_records", {params});
};



/** chiruregie  */
let addChirurgieRecords = (params) => {
  return Axios.post("/chirurgie_records",  params  );
};
let getChirurgieRecords = (params) => {
  return Axios.get("/chirurgie_records",  {params});
};


/** infirmerie  */
let addInfirmerieRecords = (params) => {
  return Axios.post("/infirmerie_records",  params  );
};

let getInfirmerieRecord = (params) => {
  return Axios.get("/infirmerie/record",   {params}  );
};




///Urgessns
let addUrgencesRecords = (params) => {
  return Axios.post("/urgences_records",  params  );
};

let getUrgencesCategories = () => {
  return Axios.get("/urgences/categories");
};

let getUrgencesGravites = (params) => {
  return Axios.get("/urgences/gravites", {params});
};

let getUrgenceRecord = (params) => {
  return Axios.get("/urgences/record",   {params}  );
};



/** maternite  */
let addMaterniteRecords = (params) => {
  return Axios.post("/maternite_records",  params  );
};

let getMaterniteRecord = (params) => {
  return Axios.get("/maternite/record",   {params}  );
};



/** pediatrie  */
let addPediatrieRecords = (params) => {
  return Axios.post("/pediatrie_records",  params  );
};

let getPediatrieRecord = (params) => {
  return Axios.get("/pediatrie/record",   {params}  );
};


export const medicalServices_services = {
  getServiceByCode,

  addUrgencesRecords,
  getUrgencesCategories,
  getUrgencesGravites,
  getUrgenceRecord,

  addInfirmerieRecords,
  getInfirmerieRecord,

  addChirurgieRecords,
  getChirurgieRecords,

  addImagerieRecords,
  getImagerieRecords,

  addLaboratoireRecords,
  getLaboratoireRecords,

  addMaterniteRecords,
  getMaterniteRecord,

  addPediatrieRecords,
  getPediatrieRecord

};
