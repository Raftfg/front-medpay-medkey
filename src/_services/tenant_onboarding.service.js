import Axios from "./caller.services";

// API publique (plateforme) pour l'inscription des tenants
export const registerTenant = (payload) => {
  return Axios.post("/public/tenants/register", payload);
};

export const getTenantStatus = (uuid) => {
  return Axios.get(`/public/tenants/${uuid}/status`);
};

// API tenant (protégée) pour le Setup Wizard
export const getWizardState = () => {
  return Axios.get("/onboarding/wizard");
};

export const saveWizardHospitalInfo = (data) => {
  return Axios.post("/onboarding/wizard/hospital-info", data);
};

export const saveWizardLanguage = (data) => {
  return Axios.post("/onboarding/wizard/language", data);
};

export const completeWizard = () => {
  return Axios.post("/onboarding/wizard/complete");
};

