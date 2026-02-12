/**Import des modules néccessaires */
import Axios from './caller.services'


// let addRemboursement = (formData, patientId) => {
//     return Axios.post('/process-refund/{patientId}/' + patientId, formData);
// };
let getAllRemboursements = () => {
    return Axios.get("/list-remboursements");
};

let processRefund = (formData, patientId) => {
    return Axios.post(`/process-refund/${patientId}`, formData);
};

let getRefundedInvoices = (invoiceReference, startDate, endDate) => {
    return Axios.get(`/get-refunded-invoices/${invoiceReference}/${startDate}/${endDate}`);
};

let getFacturesPayeesNonDestockees = (invoiceReference) => {
    return Axios.get(`/remboursement/${invoiceReference}`);
};

let generateFactureWithCaissierName = (factureId) => {
    return Axios.get(`/generate-facture/${factureId}`);
};

let updatePercentage = (invoiceId, percentage) => {
    return Axios.patch(`/update-percentage/${invoiceId}/${percentage}`);
};

let updateFactureRemboursement = (factureId) => {
    return Axios.put(`/update-facture/${factureId}`);
};


let getPatientName = (movmentId) => {
    return Axios.get(`/get-patient-name/${movmentId}`);
};

let getShowEligiblePatients = () => {
    return Axios.get("/eligible-patients");
};

let getPaymentDetails = (patientId) => {
    return Axios.get(`/payment-details/${patientId}`);
};


export const remboursementService = {
    processRefund,
    getShowEligiblePatients,
    getAllRemboursements,
    getPaymentDetails,
    getRefundedInvoices,
    getPatientName,
    updatePercentage,
    getFacturesPayeesNonDestockees,
    updateFactureRemboursement,
    generateFactureWithCaissierName
};
