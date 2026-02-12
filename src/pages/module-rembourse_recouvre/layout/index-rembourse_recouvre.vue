<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <sidebarRembourse_recouvre />
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
import sidebarRembourse_recouvre from "./Sidebar-rembourse_recouvre";
import Footer from "../../../layout/partials/Footer";

export default {
  name: "layoutRembourse_recouvre",
  components: {
    Header,
    sidebarRembourse_recouvre,
    Footer
  }
}
</script>