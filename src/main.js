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
import $ from 'jquery';

window.$ = window.jQuery = $;
window.Swiper = require("@/assets/flex-it/js/vendors/swiper-bundle.min.js");
window.WOW = require("@/assets/flex-it/js/vendors/wow.min.js").WOW;

// Plugins requis par le template Flex-IT (animations, compteurs, tilt)
require("@/assets/flex-it/js/vendors/appear.min.js");
require("@/assets/flex-it/js/vendors/jquery.countTo.js");
const VanillaTilt = require("@/assets/flex-it/js/vendors/vanilla-tilt.min.js");
window.VanillaTilt = VanillaTilt && (VanillaTilt.default || VanillaTilt);

// Import template's main.js for sticky header, WOW, countTo, tilt, etc.
require("@/assets/flex-it/js/main.js");

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

import i18n from './i18n';

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

