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

// @import "../node_modules/bootstrap/dist/css/bootstrap.css";
// @import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

//@import "../node_modules/@flaticon/flaticon-uicons/css/all/all";
</style>
