<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <sidebarGRH />
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
import sidebarGRH from "./Sidebar-grh";
import Footer from "../../../layout/partials/Footer";

export default {
  name: "layoutGRH",
  components: {
    Header,
    sidebarGRH,
    Footer
  }
}
</script>