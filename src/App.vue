<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import { useRecaptchaProvider } from "vue-recaptcha";

export default {
  name: "app",
};
// useRecaptchaProvider();
</script>

<style lang="scss">
@import "../node_modules/@mdi/font/css/materialdesignicons.min.css";
@import "../node_modules/flag-icon-css/css/flag-icon.min.css";
@import "../node_modules/font-awesome/css/font-awesome.min.css";
@import "../node_modules/simple-line-icons/css/simple-line-icons.css";
@import "../node_modules/ti-icons/css/themify-icons.css";
@import "../node_modules/sweetalert2/dist/sweetalert2.min.css";
@import "../node_modules/vue-snotify/styles/material.css";
@import "../node_modules/codemirror/lib/codemirror.css";
@import "../node_modules/fullcalendar/dist/fullcalendar.css";
@import "../node_modules/c3/c3.min.css";
@import "../node_modules/chartist/dist/chartist.min.css";
@import "./assets/scss/style";

/* FIX MENU HORIZONTAL ALIGNMENT - TRIDENT APPROACH */
#nav-medkey-list {
  display: table !important;
  width: auto !important;
  white-space: nowrap !important;
  list-style: none !important;
}

#nav-medkey-list .menu-item {
  display: table-cell !important;
  white-space: nowrap !important;
  float: none !important;
}

.menu-link, .menu-link *, .word, .char {
  white-space: nowrap !important;
  display: inline !important;
  float: none !important;
}

/* SUPPRESSION PUCES (POINTS) */
#nav-medkey-list .menu-link::before,
#nav-medkey-list .menu-item::before {
  content: none !important;
  display: none !important;
}

.menu-link {
  padding: 0 10px !important;
  min-width: max-content !important;
}

@media (max-width: 1400px) {
  .menu-link {
    font-size: 13px !important;
    padding: 0 5px !important;
  }
}
</style>
