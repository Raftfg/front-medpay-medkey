<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <sidebarPharmacy />
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
import sidebarPharmacy from "./Sidebar-pharmacy";
import Footer from "../../../layout/partials/Footer";

export default {
  name: "layoutPharmacy",
  components: {
    Header,
    sidebarPharmacy,
    Footer
  }
}
</script>