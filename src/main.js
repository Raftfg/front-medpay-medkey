// import Vue from "vue";
// import App from "./App.vue";
// import router from "./router";
// import BootstrapVue from "bootstrap-vue";
// import VueSweetalert2 from "vue-sweetalert2";
// import Toast, { POSITION } from "vue-toastification";
// import "vue-toastification/dist/index.css";

// Vue.use(BootstrapVue);
// Vue.use(VueSweetalert2);
// Vue.use(Toast);
// let inactivityTimeout;

// Vue.config.productionTip = false;

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount("#app");

// main.js

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import VueSweetalert2 from "vue-sweetalert2";
import Axios from "./_services/caller.services";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);
Vue.use(Toast);
Vue.config.productionTip = false;

let inactivityTimeout;

// Fonction pour déconnecter l'utilisateur en utilisant Axios
const logout = () => {
  return Axios.post("logout");
};

function resetInactivityTimeout() {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    logout()
      .then(() => {
        router.push({ name: 'login' }); // Rediriger vers la page de connexion
      })
      .catch(error => {
        console.error("Erreur lors de la déconnexion :", error);
      });
  }, 900000); // 900000 ms = 15 minutes
}

// Écoutez les événements d'activité sur la fenêtre
window.addEventListener('mousemove', resetInactivityTimeout);
window.addEventListener('keypress', resetInactivityTimeout);

// Initialisez le timeout au chargement de la page
resetInactivityTimeout();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
