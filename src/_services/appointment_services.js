import Axios from "./caller.services";

const listAppointments = (params) => {
  return Axios.get("/appointments", { params });
};

const createAppointment = (data) => {
  return Axios.post("/appointments", data);
};

const cancelAppointment = (id, reason = "") => {
  return Axios.delete(`/appointments/${id}`, {
    data: { reason },
  });
};

const getAvailableSlots = (params) => {
  return Axios.get("/appointments/available-slots", { params });
};

const getDoctorPlanning = (params) => {
  return Axios.get("/appointments/planning", { params });
};

const getDoctorsByService = (params) => {
  console.log("[appointmentService] getDoctorsByService appelé avec params:", params);
  return Axios.get("/appointments/doctors-by-service", { params });
};

const getOptimizationSuggestions = (params) => {
  return Axios.get("/appointments/optimization/suggestions", { params });
};

const sendReminders = (appointmentId) => {
  return Axios.post(`/appointments/${appointmentId}/send-reminders`);
};

export const appointmentService = {
  listAppointments,
  createAppointment,
  cancelAppointment,
  getAvailableSlots,
  getDoctorPlanning,
  getDoctorsByService,
  getOptimizationSuggestions,
  sendReminders,
};

