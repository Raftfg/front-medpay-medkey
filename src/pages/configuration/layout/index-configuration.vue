<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <sidebarConfiguration />
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view></router-view>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "../../../layout/partials/Header";
import sidebarConfiguration from "./Sidebar-configuration.vue";
import Footer from "../../../layout/partials/Footer";

export default {
  name: "layoutConfiguration",
  components: {
    Header,
    sidebarConfiguration,
    Footer
  }
}
</script>